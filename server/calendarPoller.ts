/**
 * CellRX GHL Calendar Poller
 *
 * Polls the GHL Calendars API every hour (via the nurture cron) to detect:
 *   1. New appointments → enqueue confirmation + 48hr + 2hr reminders
 *   2. No-show appointments → enqueue 3-step re-engagement sequence
 *
 * Uses the appointment_tracking table to prevent duplicate sequences.
 * No GHL webhook configuration required — fully polling-based.
 */

import { getDb } from "./db";
import { appointmentTracking } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { ENV } from "./_core/env";
import { enqueueAppointmentReminders, enqueueNoShowSequence } from "./nurture";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

// The CellRX consultation calendar ID (embedded on the Contact page)
const CELLRX_CALENDAR_IDS = [
  "ObJ0Y5tw59PrShIJKowv", // Discovery Call With Samantha (primary)
];

// ─── GHL API types ────────────────────────────────────────────────────────────

interface GhlAppointment {
  id: string;
  calendarId: string;
  contactId: string;
  startTime: string;       // ISO 8601
  endTime: string;
  status: string;          // booked | confirmed | cancelled | noshow | showed
  title?: string;
}

interface GhlContact {
  id: string;
  phone?: string;
  firstName?: string;
  email?: string;
}

// ─── GHL API helpers ──────────────────────────────────────────────────────────

async function fetchAppointments(calendarId: string, startTime: string, endTime: string): Promise<GhlAppointment[]> {
  const apiKey = ENV.ghlApiKey;
  if (!apiKey) return [];

  const url = new URL(`${GHL_API_BASE}/calendars/events`);
  url.searchParams.set("calendarId", calendarId);
  url.searchParams.set("locationId", ENV.ghlLocationId);
  url.searchParams.set("startTime", startTime);
  url.searchParams.set("endTime", endTime);

  try {
    const r = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-04-15",
      },
    });

    if (!r.ok) {
      const err = await r.text();
      console.warn(`[CalendarPoller] Failed to fetch appointments for ${calendarId}: ${r.status} ${err}`);
      return [];
    }

    const data = await r.json() as { events?: GhlAppointment[] };
    return data.events ?? [];
  } catch (e) {
    console.warn(`[CalendarPoller] Network error fetching appointments:`, e);
    return [];
  }
}

async function fetchContact(contactId: string): Promise<GhlContact | null> {
  const apiKey = ENV.ghlApiKey;
  if (!apiKey) return null;

  try {
    const r = await fetch(`${GHL_API_BASE}/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
      },
    });

    if (!r.ok) {
      console.warn(`[CalendarPoller] Failed to fetch contact ${contactId}: ${r.status}`);
      return null;
    }

    const data = await r.json() as { contact?: GhlContact };
    return data.contact ?? null;
  } catch (e) {
    console.warn(`[CalendarPoller] Network error fetching contact ${contactId}:`, e);
    return null;
  }
}

// ─── Main polling function ────────────────────────────────────────────────────

export interface CalendarPollResult {
  appointmentsChecked: number;
  newAppointments: number;
  remindersEnqueued: number;
  noshowsDetected: number;
  noshowSequencesEnqueued: number;
}

/**
 * Poll GHL calendars for the past 7 days + next 14 days of appointments.
 * Called by the hourly nurture cron alongside processNurtureQueue().
 */
export async function pollCalendarAppointments(): Promise<CalendarPollResult> {
  const db = await getDb();
  if (!db) {
    console.warn("[CalendarPoller] DB unavailable, skipping poll");
    return { appointmentsChecked: 0, newAppointments: 0, remindersEnqueued: 0, noshowsDetected: 0, noshowSequencesEnqueued: 0 };
  }

  const now = new Date();
  // Look back 7 days (to catch no-shows) and forward 14 days (to enqueue reminders)
  const startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const endTime = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();

  const result: CalendarPollResult = {
    appointmentsChecked: 0,
    newAppointments: 0,
    remindersEnqueued: 0,
    noshowsDetected: 0,
    noshowSequencesEnqueued: 0,
  };

  for (const calendarId of CELLRX_CALENDAR_IDS) {
    const appointments = await fetchAppointments(calendarId, startTime, endTime);
    result.appointmentsChecked += appointments.length;

    for (const appt of appointments) {
      const scheduledAt = new Date(appt.startTime).getTime();

      // Check if we've already seen this appointment
      const existing = await db
        .select()
        .from(appointmentTracking)
        .where(eq(appointmentTracking.ghlAppointmentId, appt.id))
        .limit(1);

      const tracked = existing[0];

      if (!tracked) {
        // New appointment — fetch contact info and enqueue reminders
        result.newAppointments++;

        const contact = await fetchContact(appt.contactId);
        if (!contact || !contact.phone) {
          console.warn(`[CalendarPoller] No phone for contact ${appt.contactId}, skipping`);
          continue;
        }

        const phone = contact.phone;
        const firstName = contact.firstName ?? "there";
        const email = contact.email;

        // Insert tracking row
        await db.insert(appointmentTracking).values({
          ghlAppointmentId: appt.id,
          ghlContactId: appt.contactId,
          ghlCalendarId: calendarId,
          phone,
          firstName,
          email,
          scheduledAt,
          status: appt.status ?? "booked",
          remindersEnqueued: false,
          noshowEnqueued: false,
        });

        // Enqueue appointment reminders (confirmation + 48hr + 2hr)
        // Only if the appointment is in the future
        if (scheduledAt > now.getTime()) {
          await enqueueAppointmentReminders({
            ghlContactId: appt.contactId,
            phone,
            firstName,
            email,
            appointmentTime: scheduledAt,
          });

          await db
            .update(appointmentTracking)
            .set({ remindersEnqueued: true })
            .where(eq(appointmentTracking.ghlAppointmentId, appt.id));

          result.remindersEnqueued++;
          console.log(`[CalendarPoller] ✅ Enqueued reminders for ${firstName} — appt at ${appt.startTime}`);
        }

      } else {
        // Existing appointment — check for status changes (no-show detection)
        const prevStatus = tracked.status;
        const newStatus = appt.status ?? tracked.status;

        // Update status if changed
        if (prevStatus !== newStatus) {
          await db
            .update(appointmentTracking)
            .set({ status: newStatus })
            .where(eq(appointmentTracking.ghlAppointmentId, appt.id));
        }

        // Detect no-show: status changed to "noshow" and we haven't enqueued yet
        if (newStatus === "noshow" && !tracked.noshowEnqueued) {
          result.noshowsDetected++;

          await enqueueNoShowSequence({
            ghlContactId: tracked.ghlContactId,
            phone: tracked.phone,
            firstName: tracked.firstName,
            email: tracked.email ?? undefined,
          });

          await db
            .update(appointmentTracking)
            .set({ noshowEnqueued: true })
            .where(eq(appointmentTracking.ghlAppointmentId, appt.id));

          result.noshowSequencesEnqueued++;
          console.log(`[CalendarPoller] 🔔 No-show detected for ${tracked.firstName} — enqueued re-engagement`);
        }
      }
    }
  }

  console.log(`[CalendarPoller] Poll complete — checked: ${result.appointmentsChecked}, new: ${result.newAppointments}, reminders: ${result.remindersEnqueued}, no-shows: ${result.noshowsDetected}`);
  return result;
}
