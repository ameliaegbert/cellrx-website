/**
 * CellRX Contact Router
 * Handles contact form submissions → GoHighLevel CRM
 * Tags leads as "Stem Cell Prospect" or "Black Label Prospect" based on service interest
 * Creates a follow-up task assigned to Samantha Buker (GHL user: 2hbeJA839rk6Md45RgXk)
 * Sends SMS greeting immediately upon contact creation
 * Notifies info@cellrx.bio via GHL email on every new lead
 */

import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";
import { notifyOwner } from "../_core/notification";
import { enqueueNurtureSequence } from "../nurture";

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const SAMANTHA_USER_ID = "2hbeJA839rk6Md45RgXk";
const NOTIFY_EMAIL = "info@cellrx.bio";

/** Map form interest values to GHL pipeline tags */
function getLeadTag(interest: string): string {
  if (interest === "black-label") {
    return "Black Label Prospect";
  }
  return "Stem Cell Prospect";
}

/** Map form interest values to a human-readable label */
function getInterestLabel(interest: string): string {
  const map: Record<string, string> = {
    "stem-cell-injection": "Stem Cell Injection",
    "stem-cell-iv": "Stem Cell IV Therapy",
    "black-label": "Black Label Concierge Medicine",
    "general": "General Consultation",
    "other": "Other",
  };
  return map[interest] ?? interest;
}

/** Build the SMS greeting message based on prospect type */
function buildSmsGreeting(firstName: string, isBlackLabel: boolean): string {
  if (isBlackLabel) {
    return `Hi ${firstName} — this is an automated text from CellRX. Please save this number — it is the direct line for Samantha, Dr. Jacob Egbert's personal assistant. Thank you for your interest in our Black Label Concierge Medicine program. Samantha will be reaching out to you personally. Our team is available Monday–Friday, 10am–5pm MT. If you are contacting us outside of business hours, we will be in touch on the next business day. The next step is booking your complimentary consultation — you can book directly here: https://api.leadconnectorhq.com/widget/booking/ObJ0Y5tw59PrShIJKowv`;
  }
  return `Hi ${firstName} — this is an automated text from CellRX. Please save this number — it is the direct line for Samantha, Dr. Jacob Egbert's personal assistant. Thank you for reaching out about our regenerative stem cell therapies. Samantha will be in touch with you shortly. Our team is available Monday–Friday, 10am–5pm MT. If you are contacting us outside of business hours, we will respond on the next business day. The next step is booking your complimentary consultation — you can book directly here: https://api.leadconnectorhq.com/widget/booking/ObJ0Y5tw59PrShIJKowv`;
}

/** Submit a contact to GoHighLevel CRM */
async function createGHLContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  hearAbout: string;
}): Promise<{ success: boolean; contactId?: string; tag?: string; reason?: string; status?: number }> {
  const apiKey = ENV.ghlApiKey;
  const locationId = ENV.ghlLocationId;

  if (!apiKey) {
    console.warn("[GHL] GHL_API_KEY not set — skipping CRM submission");
    return { success: false, reason: "api_key_missing" };
  }

  const tag = getLeadTag(data.interest);
  const interestLabel = getInterestLabel(data.interest);

  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email || undefined,
    phone: data.phone || undefined,
    locationId,
    tags: [tag],
    source: "CellRX Website",
    customFields: [
      { id: "interest", field_value: interestLabel },
      { id: "hearAbout", field_value: data.hearAbout || "Not specified" },
      { id: "message", field_value: data.message || "No message provided" },
    ],
  };

  try {
    const response = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[GHL] Contact creation failed: ${response.status} ${errorText}`);
      return { success: false, reason: "ghl_error", status: response.status };
    }

    const result = await response.json() as { contact?: { id?: string } };
    const contactId = result?.contact?.id;
    console.log(`[GHL] Contact created successfully: ${contactId} — tagged as "${tag}"`);
    return { success: true, contactId, tag };
  } catch (error) {
    console.error("[GHL] Network error submitting contact:", error);
    return { success: false, reason: "network_error" };
  }
}

/** Create a follow-up task assigned to Samantha Buker in GHL */
async function createFollowUpTask(contactId: string, firstName: string, lastName: string, tag: string): Promise<void> {
  const apiKey = ENV.ghlApiKey;
  if (!apiKey || !contactId) return;

  // Due date: 24 hours from now
  const dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const taskPayload = {
    title: `Follow up with ${firstName} ${lastName} — ${tag}`,
    body: `New lead from CellRX website. Interest: ${tag}. Please contact ${firstName} to schedule a consultation.`,
    assignedTo: SAMANTHA_USER_ID,
    dueDate,
    completed: false,
  };

  try {
    const response = await fetch(`${GHL_API_BASE}/contacts/${contactId}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify(taskPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`[GHL] Task creation failed: ${response.status} ${errorText}`);
    } else {
      console.log(`[GHL] Follow-up task created for ${firstName} ${lastName}, assigned to Samantha`);
    }
  } catch (error) {
    console.warn("[GHL] Error creating follow-up task:", error);
  }
}

/** Send an SMS greeting to the prospect via GHL */
async function sendSmsGreeting(contactId: string, phone: string, firstName: string, isBlackLabel: boolean): Promise<void> {
  const apiKey = ENV.ghlApiKey;
  const locationId = ENV.ghlLocationId;
  if (!apiKey || !phone || !contactId) return;

  const message = buildSmsGreeting(firstName, isBlackLabel);

  const smsPayload = {
    type: "SMS",
    message,
    contactId,
    locationId,
  };

  try {
    const response = await fetch(`${GHL_API_BASE}/conversations/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify(smsPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`[GHL] SMS send failed: ${response.status} ${errorText}`);
    } else {
      console.log(`[GHL] SMS greeting sent to ${firstName} (${phone})`);
    }
  } catch (error) {
    console.warn("[GHL] Error sending SMS greeting:", error);
  }
}

/** Send an email notification to info@cellrx.bio via GHL */
async function sendLeadEmailNotification(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  hearAbout: string;
  tag: string;
  contactId?: string;
}): Promise<void> {
  const apiKey = ENV.ghlApiKey;
  const locationId = ENV.ghlLocationId;
  if (!apiKey) return;

  const interestLabel = getInterestLabel(data.interest);

  const emailBody = `New lead from CellRX website:\n\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nInterest: ${interestLabel}\nPipeline: ${data.tag}\nHeard About Us: ${data.hearAbout || "Not specified"}\nMessage: ${data.message || "None"}\n\nGHL Contact ID: ${data.contactId || "N/A"}`;

  const emailPayload = {
    type: "Email",
    contactId: data.contactId,
    locationId,
    emailTo: NOTIFY_EMAIL,
    subject: `New CellRX Lead: ${data.firstName} ${data.lastName} — ${data.tag}`,
    message: emailBody,
  };

  try {
    const response = await fetch(`${GHL_API_BASE}/conversations/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`[GHL] Email notification failed: ${response.status} ${errorText}`);
    } else {
      console.log(`[GHL] Lead email notification sent to ${NOTIFY_EMAIL}`);
    }
  } catch (error) {
    console.warn("[GHL] Error sending lead email notification:", error);
  }
}

export const contactRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional().default(""),
        interest: z.enum(["stem-cell-injection", "stem-cell-iv", "black-label", "general", "other"]),
        message: z.string().optional().default(""),
        hearAbout: z.string().optional().default(""),
      })
    )
    .mutation(async ({ input }) => {
      const tag = getLeadTag(input.interest);
      const isBlackLabel = input.interest === "black-label";

      // 1. Submit contact to GHL CRM
      const ghlResult = await createGHLContact(input);

      // 2. If contact created successfully, run follow-up actions
      if (ghlResult.success && ghlResult.contactId) {
        const contactId = ghlResult.contactId;

        // Create follow-up task for Samantha (due in 24 hours)
        await createFollowUpTask(contactId, input.firstName, input.lastName, tag);

        // Send immediate SMS greeting if phone provided
        if (input.phone) {
          await sendSmsGreeting(contactId, input.phone, input.firstName, isBlackLabel);
        }

        // Send email notification to info@cellrx.bio
        await sendLeadEmailNotification({
          ...input,
          tag,
          contactId,
        });

        // Enqueue 5-day nurture SMS sequence (starts Day 1, fires hourly via heartbeat)
        if (input.phone) {
          const sequenceType = isBlackLabel ? "black-label" : "stem-cell";
          await enqueueNurtureSequence({
            ghlContactId: contactId,
            phone: input.phone,
            firstName: input.firstName,
            email: input.email,
            sequenceType,
          });
        }
      }

      // 3. Notify Manus project owner (non-fatal)
      try {
        await notifyOwner({
          title: `New CellRX Lead: ${input.firstName} ${input.lastName}`,
          content: `**Pipeline:** ${tag}\n**Interest:** ${getInterestLabel(input.interest)}\n**Email:** ${input.email}\n**Phone:** ${input.phone || "Not provided"}\n**Source:** ${input.hearAbout || "Not specified"}\n**Message:** ${input.message || "None"}`,
        });
      } catch (notifyError) {
        console.warn("[Contact] Owner notification failed:", notifyError);
      }

      return {
        success: true,
        ghlSubmitted: ghlResult.success,
        tag,
      };
    }),
});
