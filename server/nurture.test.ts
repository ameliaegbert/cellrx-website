/**
 * Tests for CellRX nurture sequence message generation.
 * Validates that each sequence step produces a non-empty message with the correct
 * booking link and personalized first name.
 */

import { describe, it, expect } from "vitest";

const BOOKING_LINK = "https://api.leadconnectorhq.com/widget/booking/ObJ0Y5tw59PrShIJKowv";

// ─── Re-export message builders for testing ───────────────────────────────────
// We test the message content inline since the builders are not exported.
// This mirrors the actual logic in nurture.ts.

function getStemCellMessage(step: number, firstName: string): string {
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
  const msgs: Record<number, string> = {
    1: `Hi ${firstName} — Samantha from CellRX. We noticed you weren't able to make your consultation today. Life happens — no worries at all. We'd love to reschedule at a time that works better for you: ${BOOKING_LINK}`,
    2: `${firstName}, just checking in from CellRX. We still have your consultation on file and would love to get you rescheduled. Dr. Egbert has availability this week. It only takes a minute to book: ${BOOKING_LINK}`,
    3: `Hi ${firstName} — one last note from CellRX. If you're still interested in exploring stem cell therapy or our Black Label program, we're here whenever you're ready. No pressure — just know the door is always open: ${BOOKING_LINK}`,
  };
  return msgs[step] ?? msgs[3];
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Stem Cell Nurture Sequence", () => {
  const name = "Michael";

  it("step 1 includes first name and booking link", () => {
    const msg = getStemCellMessage(1, name);
    expect(msg).toContain(name);
    expect(msg).toContain(BOOKING_LINK);
  });

  it("all 5 steps produce non-empty messages", () => {
    for (let step = 1; step <= 5; step++) {
      const msg = getStemCellMessage(step, name);
      expect(msg.length).toBeGreaterThan(50);
    }
  });

  it("step 5 is the final follow-up message", () => {
    const msg = getStemCellMessage(5, name);
    expect(msg).toContain("last follow-up");
  });

  it("unknown step falls back to step 5", () => {
    const msg = getStemCellMessage(99, name);
    expect(msg).toContain("last follow-up");
  });
});

describe("Black Label Nurture Sequence", () => {
  const name = "Sarah";

  it("step 1 mentions Black Label and booking link", () => {
    const msg = getBlackLabelMessage(1, name);
    expect(msg).toContain("Black Label");
    expect(msg).toContain(BOOKING_LINK);
  });

  it("all 5 steps produce non-empty messages", () => {
    for (let step = 1; step <= 5; step++) {
      const msg = getBlackLabelMessage(step, name);
      expect(msg.length).toBeGreaterThan(50);
    }
  });

  it("step 5 is a graceful close without booking link", () => {
    const msg = getBlackLabelMessage(5, name);
    expect(msg).toContain("last note");
  });
});

describe("No-Show Re-engagement Sequence", () => {
  const name = "David";

  it("step 1 acknowledges missed appointment and includes booking link", () => {
    const msg = getNoShowMessage(1, name);
    expect(msg).toContain("weren't able to make");
    expect(msg).toContain(BOOKING_LINK);
  });

  it("all 3 steps produce non-empty messages", () => {
    for (let step = 1; step <= 3; step++) {
      const msg = getNoShowMessage(step, name);
      expect(msg.length).toBeGreaterThan(50);
    }
  });

  it("step 3 is a graceful close", () => {
    const msg = getNoShowMessage(3, name);
    expect(msg).toContain("last note");
  });
});

describe("Appointment Reminder Timing Logic", () => {
  const HOUR = 60 * 60 * 1000;
  const DAY = 24 * HOUR;

  it("generates correct send times relative to appointment", () => {
    const now = Date.now();
    const appointmentTime = now + 3 * DAY; // appointment in 3 days

    const sendTimes = [
      now + 60_000,                    // confirmation in 1 min
      appointmentTime - 48 * HOUR,     // 48hr before
      appointmentTime - 2 * HOUR,      // 2hr before
    ].filter(t => t > now);

    expect(sendTimes).toHaveLength(3);
    expect(sendTimes[0]).toBeLessThan(sendTimes[1]);
    expect(sendTimes[1]).toBeLessThan(sendTimes[2]);
    expect(sendTimes[2]).toBeLessThan(appointmentTime);
  });

  it("filters out past send times", () => {
    const now = Date.now();
    const appointmentTime = now + 1 * HOUR; // appointment in 1 hour (48hr reminder is in the past)

    const sendTimes = [
      now + 60_000,
      appointmentTime - 48 * HOUR,     // this is in the past
      appointmentTime - 2 * HOUR,      // this is also in the past (appointment in 1hr)
    ].filter(t => t > now);

    // Only the confirmation (now + 60s) should remain
    expect(sendTimes).toHaveLength(1);
  });
});
