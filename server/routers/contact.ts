/**
 * CellRX Contact Router
 * Handles contact form submissions → GoHighLevel CRM
 * Tags leads as "Stem Cell Prospect" or "Black Label Prospect" based on service interest
 */

import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";
import { notifyOwner } from "../_core/notification";

const GHL_API_BASE = "https://rest.gohighlevel.com/v1";

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

/** Submit a contact to GoHighLevel CRM */
async function createGHLContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  hearAbout: string;
}) {
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
    customField: [
      {
        id: "interest",
        field_value: interestLabel,
      },
      {
        id: "hearAbout",
        field_value: data.hearAbout || "Not specified",
      },
      {
        id: "message",
        field_value: data.message || "No message provided",
      },
    ],
  };

  try {
    const response = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
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
      // Submit to GHL CRM
      const ghlResult = await createGHLContact(input);

      // Notify the clinic owner of the new lead
      const tag = getLeadTag(input.interest);
      const interestLabel = getInterestLabel(input.interest);
      try {
        await notifyOwner({
          title: `New CellRX Lead: ${input.firstName} ${input.lastName}`,
          content: `**Pipeline:** ${tag}\n**Interest:** ${interestLabel}\n**Email:** ${input.email}\n**Phone:** ${input.phone || "Not provided"}\n**Source:** ${input.hearAbout || "Not specified"}\n**Message:** ${input.message || "None"}`,
        });
      } catch (notifyError) {
        // Non-fatal — log but don't fail the submission
        console.warn("[Contact] Owner notification failed:", notifyError);
      }

      return {
        success: true,
        ghlSubmitted: ghlResult.success,
        tag,
      };
    }),
});
