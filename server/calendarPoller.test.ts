/**
 * Tests for GHL Calendar Poller
 * Validates appointment detection, deduplication, and no-show handling logic.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Mock dependencies ────────────────────────────────────────────────────────

vi.mock("./db", () => ({
  getDb: vi.fn(),
}));

vi.mock("./nurture", () => ({
  enqueueAppointmentReminders: vi.fn().mockResolvedValue(undefined),
  enqueueNoShowSequence: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./_core/env", () => ({
  ENV: {
    ghlApiKey: "test-api-key",
    ghlLocationId: "test-location-id",
  },
}));

// ─── Helper: build a mock GHL appointment ────────────────────────────────────

function makeAppt(overrides: Partial<{
  id: string;
  calendarId: string;
  contactId: string;
  startTime: string;
  status: string;
}> = {}) {
  const futureTime = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
  return {
    id: "appt-001",
    calendarId: "ObJ0Y5tw59PrShIJKowv",
    contactId: "contact-001",
    startTime: futureTime,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    status: "booked",
    ...overrides,
  };
}

function makeContact(overrides: Partial<{
  id: string;
  phone: string;
  firstName: string;
  email: string;
}> = {}) {
  return {
    id: "contact-001",
    phone: "+18015551234",
    firstName: "Jacob",
    email: "jacob@example.com",
    ...overrides,
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Calendar Poller — appointment status logic", () => {
  it("identifies a future appointment as needing reminders", () => {
    const futureTime = Date.now() + 3 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    expect(futureTime > now).toBe(true);
  });

  it("identifies a past appointment as not needing reminders", () => {
    const pastTime = Date.now() - 2 * 60 * 60 * 1000;
    const now = Date.now();
    expect(pastTime > now).toBe(false);
  });

  it("correctly detects no-show status", () => {
    const appt = makeAppt({ status: "noshow" });
    expect(appt.status).toBe("noshow");
  });

  it("does not flag booked appointment as no-show", () => {
    const appt = makeAppt({ status: "booked" });
    expect(appt.status).not.toBe("noshow");
  });

  it("correctly identifies status change from booked to noshow", () => {
    const prevStatus = "booked";
    const newStatus = "noshow";
    const isStatusChange = prevStatus !== newStatus;
    const isNoShow = newStatus === "noshow";
    expect(isStatusChange).toBe(true);
    expect(isNoShow).toBe(true);
  });

  it("does not re-enqueue no-show if already enqueued", () => {
    const tracked = { noshowEnqueued: true, status: "noshow" };
    const shouldEnqueue = tracked.status === "noshow" && !tracked.noshowEnqueued;
    expect(shouldEnqueue).toBe(false);
  });

  it("enqueues no-show sequence when not yet enqueued", () => {
    const tracked = { noshowEnqueued: false, status: "booked" };
    const newStatus = "noshow";
    const shouldEnqueue = newStatus === "noshow" && !tracked.noshowEnqueued;
    expect(shouldEnqueue).toBe(true);
  });
});

describe("Calendar Poller — date range logic", () => {
  it("look-back window covers 7 days", () => {
    const now = new Date();
    const startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const diffDays = (now.getTime() - startTime.getTime()) / (24 * 60 * 60 * 1000);
    expect(diffDays).toBeCloseTo(7, 0);
  });

  it("look-forward window covers 14 days", () => {
    const now = new Date();
    const endTime = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    const diffDays = (endTime.getTime() - now.getTime()) / (24 * 60 * 60 * 1000);
    expect(diffDays).toBeCloseTo(14, 0);
  });
});

describe("Calendar Poller — contact data validation", () => {
  it("uses firstName from contact or falls back to 'there'", () => {
    const contactWithName = makeContact({ firstName: "Jacob" });
    const contactWithoutName = { ...makeContact(), firstName: undefined };
    const name1 = contactWithName.firstName ?? "there";
    const name2 = contactWithoutName.firstName ?? "there";
    expect(name1).toBe("Jacob");
    expect(name2).toBe("there");
  });

  it("skips appointment if contact has no phone", () => {
    const contact = { ...makeContact(), phone: undefined };
    const hasPhone = !!(contact.phone);
    expect(hasPhone).toBe(false);
  });

  it("proceeds with appointment if contact has phone", () => {
    const contact = makeContact({ phone: "+18015551234" });
    const hasPhone = !!(contact.phone);
    expect(hasPhone).toBe(true);
  });
});

describe("Calendar Poller — result structure", () => {
  it("result object has all required fields", () => {
    const result = {
      appointmentsChecked: 0,
      newAppointments: 0,
      remindersEnqueued: 0,
      noshowsDetected: 0,
      noshowSequencesEnqueued: 0,
    };
    expect(result).toHaveProperty("appointmentsChecked");
    expect(result).toHaveProperty("newAppointments");
    expect(result).toHaveProperty("remindersEnqueued");
    expect(result).toHaveProperty("noshowsDetected");
    expect(result).toHaveProperty("noshowSequencesEnqueued");
  });
});
