/**
 * GHL Webhook Handler
 * Receives events from GoHighLevel and triggers the appropriate nurture sequences.
 *
 * Supported events:
 *   - AppointmentCreate  → enqueueAppointmentReminders
 *   - AppointmentNoShow  → enqueueNoShowSequence
 *
 * Setup in GHL:
 *   Settings → Integrations → Webhooks → Add Webhook
 *   URL: https://cellrx.bio/api/webhooks/ghl
 *   Events: AppointmentCreate, AppointmentNoShow (or AppointmentUpdate with status check)
 */

import { Request, Response } from "express";
import { enqueueAppointmentReminders, enqueueNoShowSequence } from "./nurture";

// GHL sends a webhook secret in the header for verification
// Set GHL_WEBHOOK_SECRET in secrets to enable signature verification
const WEBHOOK_SECRET = process.env.GHL_WEBHOOK_SECRET;

interface GhlAppointmentPayload {
  type: string;
  locationId?: string;
  contactId?: string;
  contact?: {
    id?: string;
    firstName?: string;
    phone?: string;
    email?: string;
  };
  appointment?: {
    id?: string;
    startTime?: string; // ISO 8601
    status?: string;
    title?: string;
  };
  // Some GHL webhook shapes flatten these fields
  firstName?: string;
  phone?: string;
  email?: string;
  startTime?: string;
  status?: string;
}

export async function ghlWebhookHandler(req: Request, res: Response) {
  try {
    // Optional: verify webhook secret if configured
    if (WEBHOOK_SECRET) {
      const signature = req.headers["x-ghl-signature"] as string | undefined;
      if (!signature || signature !== WEBHOOK_SECRET) {
        console.warn("[GHL Webhook] Invalid signature — request rejected");
        return res.status(401).json({ error: "invalid-signature" });
      }
    }

    const body = req.body as GhlAppointmentPayload;
    const eventType = body.type || "";

    console.log(`[GHL Webhook] Received event: ${eventType}`, JSON.stringify(body).slice(0, 300));

    // Extract contact info — GHL uses different shapes depending on event type
    const contactId = body.contactId || body.contact?.id || "";
    const firstName = body.firstName || body.contact?.firstName || "there";
    const phone = body.phone || body.contact?.phone || "";
    const email = body.email || body.contact?.email;

    if (!contactId || !phone) {
      console.warn("[GHL Webhook] Missing contactId or phone — skipping", { contactId, phone });
      return res.json({ ok: true, skipped: "missing-contact-data" });
    }

    if (eventType === "AppointmentCreate" || eventType === "appointmentCreated") {
      // Parse appointment start time
      const startTimeStr = body.startTime || body.appointment?.startTime;
      const appointmentTime = startTimeStr ? new Date(startTimeStr).getTime() : 0;

      if (!appointmentTime || isNaN(appointmentTime)) {
        console.warn("[GHL Webhook] AppointmentCreate missing valid startTime — skipping reminders");
        return res.json({ ok: true, skipped: "invalid-appointment-time" });
      }

      await enqueueAppointmentReminders({
        ghlContactId: contactId,
        phone,
        firstName,
        email,
        appointmentTime,
      });

      console.log(`[GHL Webhook] Appointment reminders enqueued for ${firstName} at ${new Date(appointmentTime).toISOString()}`);
      return res.json({ ok: true, action: "appointment-reminders-enqueued" });
    }

    if (
      eventType === "AppointmentNoShow" ||
      eventType === "appointmentNoShow" ||
      (eventType === "AppointmentUpdate" && (body.status === "noshow" || body.appointment?.status === "noshow"))
    ) {
      await enqueueNoShowSequence({
        ghlContactId: contactId,
        phone,
        firstName,
        email,
      });

      console.log(`[GHL Webhook] No-show re-engagement sequence enqueued for ${firstName}`);
      return res.json({ ok: true, action: "no-show-sequence-enqueued" });
    }

    // Unhandled event type — acknowledge and ignore
    console.log(`[GHL Webhook] Unhandled event type: ${eventType} — acknowledged`);
    return res.json({ ok: true, skipped: `unhandled-event:${eventType}` });

  } catch (e) {
    console.error("[GHL Webhook] Error:", e);
    return res.status(500).json({
      error: String(e),
      context: { url: "/api/webhooks/ghl" },
      timestamp: new Date().toISOString(),
    });
  }
}
