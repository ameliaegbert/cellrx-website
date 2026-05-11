import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock fetch globally for GHL API calls
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock notifyOwner to avoid real HTTP calls
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

const validInput = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  phone: "3855551234",
  interest: "stem-cell-injection" as const,
  message: "I have knee pain",
  hearAbout: "google",
};

describe("contact.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns success when GHL API key is missing (graceful degradation)", async () => {
    // No GHL_API_KEY set — should still succeed without crashing
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit(validInput);

    expect(result.success).toBe(true);
    expect(result.ghlSubmitted).toBe(false); // API key missing
    expect(result.tag).toBe("Stem Cell Prospect");
  });

  it("tags stem cell injection as 'Stem Cell Prospect'", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      ...validInput,
      interest: "stem-cell-injection",
    });

    expect(result.tag).toBe("Stem Cell Prospect");
  });

  it("tags stem cell IV as 'Stem Cell Prospect'", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      ...validInput,
      interest: "stem-cell-iv",
    });

    expect(result.tag).toBe("Stem Cell Prospect");
  });

  it("tags black-label as 'Black Label Prospect'", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      ...validInput,
      interest: "black-label",
    });

    expect(result.tag).toBe("Black Label Prospect");
  });

  it("tags general consultation as 'Stem Cell Prospect'", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      ...validInput,
      interest: "general",
    });

    expect(result.tag).toBe("Stem Cell Prospect");
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        ...validInput,
        email: "not-an-email",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with missing first name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        ...validInput,
        firstName: "",
      })
    ).rejects.toThrow();
  });
});
