/**
 * CellRX Nurture Sequences
 * Server-side scheduled SMS follow-up system using GHL Conversations API.
 *
 * 4 sequences:
 *   1. stem-cell   — 5-step SMS nurture for stem cell prospects (days 1, 2, 3, 5, 7)
 *   2. black-label — 5-step SMS nurture for Black Label prospects (days 1, 2, 3, 5, 7)
 *   3. appt-remind — appointment confirmation + 48hr + 2hr reminders
 *   4. no-show     — post-consultation no-show re-engagement (days 1, 3, 7)
 *
 * The /api/scheduled/nurture heartbeat runs hourly and sends any due messages.
 */

import { getDb } from "./db";
import { nurtureQueue, InsertNurtureQueueRow } from "../drizzle/schema";
import { and, eq, isNull, lte } from "drizzle-orm";
import { ENV } from "./_core/env";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

// ─── Sequence definitions ────────────────────────────────────────────────────

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/** Returns delay in ms from sequence start for each step */
const STEM_CELL_DELAYS = [
  1 * DAY,   // Day 1
  2 * DAY,   // Day 2
  3 * DAY,   // Day 3
  5 * DAY,   // Day 5
  7 * DAY,   // Day 7
];

const BLACK_LABEL_DELAYS = [
  1 * DAY,
  2 * DAY,
  3 * DAY,
  5 * DAY,
  7 * DAY,
];

const APPT_REMIND_DELAYS: number[] = []; // dynamic — calculated from appointment time
const NO_SHOW_DELAYS = [
  1 * DAY,
  3 * DAY,
  7 * DAY,
];

/** SMS copy for each sequence step */
function getStemCellMessage(step: number, firstName: string): string {
  const BOOKING_LINK = "https://api.leadconnectorhq.com/widget/booking/ObJ0Y5tw59PrShIJKowv";
  const msgs: Record<number, string> = {
    1: `Hi ${firstName}, it's Samantha from CellRX. I wanted to follow up on your interest in our stem cell therapies. Do you have any questions I can answer for you? We'd love to help you take the next step. Book your complimentary consultation here: ${BOOKING_LINK}`,
    2: `Hi ${firstName} — Samantha again from CellRX. I wanted to share something that might be helpful: our stem cell biologics are never diluted and never replicated, and our Medical Director personally oversees every vial from source to treatment. That's a standard no other clinic in Utah can match. If you're ready to learn more, I'm here: ${BOOKING_LINK}`,
    3: `${firstName}, most of our patients tell us they wish they hadn't waited so long. Whether it's chronic joint pain, fatigue, or just wanting to feel like yourself again — our regenerative protocols are designed to address the root cause, not just the symptoms. Happy to answer any questions: ${BOOKING_LINK}`,
    4: `Hi ${firstName} — just a quick note from CellRX. We have a limited number of consultation slots available this week with Dr. Egbert. If you've been considering stem cell therapy, now is a great time to get your questions answered. Reserve your spot: ${BOOKING_LINK}`,
    5: `${firstName}, this will be my last follow-up — I don't want to crowd your inbox. If you ever decide you're ready to explore what stem cell therapy could do for you, we're here. No pressure, no hard sell — just a conversation with a physician who genuinely cares about your outcomes. ${BOOKING_LINK}`,
  };
  return msgs[step] ?? msgs[5];
}

function getBlackLabelMessage(step: number, firstName: string): string {
  const BOOKING_LINK = "https://api.leadconnectorhq.com/widget/booking/ObJ0Y5tw59PrShIJKowv";
  const msgs: Record<number, string> = {
    1: `Hi ${firstName}, it's Samantha from CellRX. Thank you for your interest in our Black Label Concierge Medicine program. This is our most exclusive offering — a true health partnership with Dr. Egbert, not just a treatment. I'd love to tell you more. Book a private call here: ${BOOKING_LINK}`,
    2: `${firstName} — Samantha from CellRX. Black Label members receive quarterly biomarker panels, personalized longevity protocols, direct physician access, and priority scheduling. It's designed for people who refuse to leave their health to chance. Would you like to learn more? ${BOOKING_LINK}`,
    3: `Hi ${firstName}. I wanted to share that Black Label membership is intentionally limited — we cap enrollment to ensure every member receives the full attention and resources they deserve. If you're considering it, I'd encourage you not to wait too long. Let's talk: ${BOOKING_LINK}`,
    4: `${firstName}, Dr. Egbert has a few private consultation slots available this week for prospective Black Label members. This is a no-obligation conversation — just an opportunity to see if the program is the right fit for your goals. Reserve your time: ${BOOKING_LINK}`,
    5: `${firstName} — last note from me. If Black Label isn't the right fit right now, that's completely fine. But if you ever want to explore what a true health partnership looks like, we'll be here. Wishing you the best. — Samantha, CellRX`,
  };
  return msgs[step] ?? msgs[5];
}

function getNoShowMessage(step: number, firstName: string): string {
  const BOOKING_LINK = "https://api.leadconnectorhq.com/widget/booking/ObJ0Y5tw59PrShIJKowv";
  const msgs: Record<number, string> = {
    1: `Hi ${firstName} — Samantha from CellRX. We noticed you weren't able to make your consultation today. Life happens — no worries at all. We'd love to reschedule at a time that works better for you: ${BOOKING_LINK}`,
    2: `${firstName}, just checking in from CellRX. We still have your consultation on file and would love to get you rescheduled. Dr. Egbert has availability this week. It only takes a minute to book: ${BOOKING_LINK}`,
    3: `Hi ${firstName} — one last note from CellRX. If you're still interested in exploring stem cell therapy or our Black Label program, we're here whenever you're ready. No pressure — just know the door is always open: ${BOOKING_LINK}`,
  };
  return msgs[step] ?? msgs[3];
}

function getApptReminderMessage(step: number, firstName: string, appointmentTime: number): string {
  const apptDate = new Date(appointmentTime);
  const dateStr = apptDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "America/Denver" });
  const timeStr = apptDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Denver" });
  const msgs: Record<number, string> = {
    1: `Hi ${firstName} — this is an automated reminder from CellRX. Your consultation with Dr. Egbert is confirmed for ${dateStr} at ${timeStr} MT. We're located at 3098 Executive Parkway, Suite 100, Lehi, UT 84043. Reply STOP to opt out of reminders.`,
    2: `Hi ${firstName} — reminder from CellRX: your consultation is tomorrow, ${dateStr} at ${timeStr} MT. Please arrive 5 minutes early. If you need to reschedule, call us at 385-707-2373. See you soon!`,
    3: `${firstName} — your CellRX consultation with Dr. Egbert is in 2 hours (${timeStr} MT today). We're at 3098 Executive Parkway, Suite 100, Lehi. See you soon! Questions? Call 385-707-2373.`,
  };
  return msgs[step] ?? msgs[1];
}

// ─── Queue helpers ───────────────────────────────────────────────────────────

/** Enqueue a full stem cell or black label nurture sequence for a new lead */
export async function enqueueNurtureSequence(params: {
  ghlContactId: string;
  phone: string;
  firstName: string;
  email?: string;
  sequenceType: "stem-cell" | "black-label";
}): Promise<void> {
  const delays = params.sequenceType === "stem-cell" ? STEM_CELL_DELAYS : BLACK_LABEL_DELAYS;
  const now = Date.now();
  const rows: InsertNurtureQueueRow[] = delays.map((delay, i) => ({
    ghlContactId: params.ghlContactId,
    phone: params.phone,
    firstName: params.firstName,
    email: params.email,
    sequenceType: params.sequenceType,
    stepNumber: i + 1,
    totalSteps: delays.length,
    sendAt: now + delay,
  }));
  const db = await getDb();
  if (!db) { console.warn("[Nurture] DB unavailable, skipping enqueue"); return; }
  await db.insert(nurtureQueue).values(rows);
  console.log(`[Nurture] Enqueued ${rows.length}-step ${params.sequenceType} sequence for ${params.firstName} (${params.ghlContactId})`);
}

/** Enqueue appointment reminder sequence (confirmation + 48hr + 2hr before) */
export async function enqueueAppointmentReminders(params: {
  ghlContactId: string;
  phone: string;
  firstName: string;
  email?: string;
  appointmentTime: number; // UTC ms
}): Promise<void> {
  const { appointmentTime } = params;
  const now = Date.now();

  // Step 1: immediate confirmation (send now + 1 min)
  // Step 2: 48 hours before appointment
  // Step 3: 2 hours before appointment
  const sendTimes = [
    now + 60_000,                        // confirmation — send in 1 minute
    appointmentTime - 48 * HOUR,         // 48hr reminder
    appointmentTime - 2 * HOUR,          // 2hr reminder
  ].filter(t => t > now); // skip any that are already in the past

  if (sendTimes.length === 0) return;

  const rows: InsertNurtureQueueRow[] = sendTimes.map((sendAt, i) => ({
    ghlContactId: params.ghlContactId,
    phone: params.phone,
    firstName: params.firstName,
    email: params.email,
    sequenceType: "appt-remind" as const,
    stepNumber: i + 1,
    totalSteps: sendTimes.length,
    sendAt,
    appointmentTime,
  }));

  const db = await getDb();
  if (!db) { console.warn("[Nurture] DB unavailable, skipping enqueue"); return; }
  await db.insert(nurtureQueue).values(rows);
  console.log(`[Nurture] Enqueued ${rows.length} appointment reminders for ${params.firstName}`);
}

/** Enqueue no-show re-engagement sequence */
export async function enqueueNoShowSequence(params: {
  ghlContactId: string;
  phone: string;
  firstName: string;
  email?: string;
}): Promise<void> {
  const now = Date.now();
  const rows: InsertNurtureQueueRow[] = NO_SHOW_DELAYS.map((delay, i) => ({
    ghlContactId: params.ghlContactId,
    phone: params.phone,
    firstName: params.firstName,
    email: params.email,
    sequenceType: "no-show" as const,
    stepNumber: i + 1,
    totalSteps: NO_SHOW_DELAYS.length,
    sendAt: now + delay,
  }));
  const db = await getDb();
  if (!db) { console.warn("[Nurture] DB unavailable, skipping enqueue"); return; }
  await db.insert(nurtureQueue).values(rows);
  console.log(`[Nurture] Enqueued ${rows.length}-step no-show sequence for ${params.firstName}`);
}

// ─── SMS sender ──────────────────────────────────────────────────────────────

async function sendSms(contactId: string, message: string): Promise<boolean> {
  const apiKey = ENV.ghlApiKey;
  const locationId = ENV.ghlLocationId;
  if (!apiKey) return false;

  try {
    const r = await fetch(`${GHL_API_BASE}/conversations/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify({ type: "SMS", message, contactId, locationId }),
    });
    if (!r.ok) {
      const err = await r.text();
      console.warn(`[Nurture] SMS failed for ${contactId}: ${r.status} ${err}`);
      return false;
    }
    return true;
  } catch (e) {
    console.warn(`[Nurture] SMS network error for ${contactId}:`, e);
    return false;
  }
}

// ─── Heartbeat handler ───────────────────────────────────────────────────────

/** Called by the /api/scheduled/nurture heartbeat every hour */
export async function processNurtureQueue(): Promise<{ sent: number; failed: number; skipped: number }> {
  const db = await getDb();
  if (!db) {
    console.warn("[Nurture] Database not available, skipping run");
    return { sent: 0, failed: 0, skipped: 0 };
  }

  const now = Date.now();

  // Fetch all pending rows that are due
  const due = await db
    .select()
    .from(nurtureQueue)
    .where(
      and(
        isNull(nurtureQueue.sentAt),
        eq(nurtureQueue.failed, false),
        lte(nurtureQueue.sendAt, now)
      )
    )
    .limit(50); // process max 50 per run to stay within 2-min timeout

  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const row of due) {
    // Build message based on sequence type and step
    let message: string;
    try {
      switch (row.sequenceType) {
        case "stem-cell":
          message = getStemCellMessage(row.stepNumber, row.firstName);
          break;
        case "black-label":
          message = getBlackLabelMessage(row.stepNumber, row.firstName);
          break;
        case "no-show":
          message = getNoShowMessage(row.stepNumber, row.firstName);
          break;
        case "appt-remind":
          if (!row.appointmentTime) { skipped++; continue; }
          message = getApptReminderMessage(row.stepNumber, row.firstName, row.appointmentTime);
          break;
        default:
          skipped++;
          continue;
      }

      const ok = await sendSms(row.ghlContactId, message);

      if (ok) {
        await db
          .update(nurtureQueue)
          .set({ sentAt: Date.now() })
          .where(eq(nurtureQueue.id, row.id));
        sent++;
        console.log(`[Nurture] ✅ Sent step ${row.stepNumber}/${row.totalSteps} (${row.sequenceType}) to ${row.firstName}`);
      } else {
        await db
          .update(nurtureQueue)
          .set({ failed: true, failReason: "SMS send failed" })
          .where(eq(nurtureQueue.id, row.id));
        failed++;
      }
    } catch (e) {
      console.error(`[Nurture] Error processing row ${row.id}:`, e);
      await db
        .update(nurtureQueue)
        .set({ failed: true, failReason: String(e) })
        .where(eq(nurtureQueue.id, row.id));
      failed++;
    }
  }

  console.log(`[Nurture] Run complete — sent: ${sent}, failed: ${failed}, skipped: ${skipped}`);
  return { sent, failed, skipped };
}
