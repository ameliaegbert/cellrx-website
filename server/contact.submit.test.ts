import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  notifyOwner: vi.fn(),
  enqueueNurtureSequence: vi.fn(),
  ghlApiKey: "test-ghl-key" as string | undefined,
  ghlLocationId: "test-location" as string | undefined,
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: mocks.notifyOwner,
}));

vi.mock("./nurture", () => ({
  enqueueNurtureSequence: mocks.enqueueNurtureSequence,
}));

vi.mock("./_core/env", () => ({
  ENV: {
    get ghlApiKey() {
      return mocks.ghlApiKey;
    },
    get ghlLocationId() {
      return mocks.ghlLocationId;
    },
    ownerOpenId: "owner-open-id",
  },
}));

import { getLeadTag } from "./routers/contact";
import { appRouter } from "./routers";

const originalFetch = globalThis.fetch;

const stemInput = {
  firstName: "Amelia",
  lastName: "Test",
  email: "amelia@example.com",
  phone: "+13855550123",
  interest: "stem-cell-injection" as const,
  message: "Please contact me",
  hearAbout: "Search",
};

function successfulFetch(contactId = "contact-123") {
  return vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);

    if (url.endsWith("/contacts/upsert")) {
      return new Response(JSON.stringify({ contact: { id: contactId } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.endsWith("/conversations/messages")) {
      return new Response(JSON.stringify({ messageId: "message-123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    throw new Error(`Unexpected fetch URL: ${url}`);
  });
}

beforeEach(() => {
  mocks.ghlApiKey = "test-ghl-key";
  mocks.ghlLocationId = "test-location";
  mocks.notifyOwner.mockReset().mockResolvedValue(undefined);
  mocks.enqueueNurtureSequence.mockReset().mockResolvedValue({ id: 1 });
  globalThis.fetch = successfulFetch() as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("getLeadTag", () => {
  it("maps black label interest to the black label routing tag", () => {
    expect(getLeadTag("black-label")).toBe("Black Label Prospect");
  });

  it.each([
    "stem-cell-injection",
    "stem-cell-iv",
    "general",
    "other",
  ])("maps %s to the stem cell routing tag", (interest) => {
    expect(getLeadTag(interest)).toBe("Stem Cell Prospect");
  });
});

describe("contact.submit", () => {
  it("upserts a tagged HighLevel contact and returns confirmed CRM success", async () => {
    const fetchMock = successfulFetch("contact-abc");
    globalThis.fetch = fetchMock as typeof fetch;

    const caller = appRouter.createCaller({ user: null } as never);
    const result = await caller.contact.submit(stemInput);

    expect(result).toEqual({
      success: true,
      ghlSubmitted: true,
      tag: "Stem Cell Prospect",
    });

    const upsertCall = fetchMock.mock.calls.find(([url]) => String(url).endsWith("/contacts/upsert"));
    expect(upsertCall).toBeDefined();

    const request = upsertCall?.[1] as RequestInit;
    expect(request.method).toBe("POST");
    expect(request.headers).toMatchObject({
      "Content-Type": "application/json",
      Authorization: "Bearer test-ghl-key",
      Version: "2021-07-28",
    });

    expect(JSON.parse(String(request.body))).toEqual({
      firstName: "Amelia",
      lastName: "Test",
      email: "amelia@example.com",
      phone: "+13855550123",
      locationId: "test-location",
      tags: ["Stem Cell Prospect"],
      source: "CellRX Website",
    });

    expect(mocks.notifyOwner).toHaveBeenCalledTimes(1);
    expect(mocks.enqueueNurtureSequence).toHaveBeenCalledWith({
      ghlContactId: "contact-abc",
      phone: "+13855550123",
      firstName: "Amelia",
      email: "amelia@example.com",
      sequenceType: "stem-cell",
    });
  });

  it("does not call the website's former task or opportunity endpoints", async () => {
    const fetchMock = successfulFetch();
    globalThis.fetch = fetchMock as typeof fetch;

    const caller = appRouter.createCaller({ user: null } as never);
    await caller.contact.submit(stemInput);

    const urls = fetchMock.mock.calls.map(([url]) => String(url));
    expect(urls).not.toContain("https://services.leadconnectorhq.com/opportunities/");
    expect(urls.some((url) => /\/contacts\/[^/]+\/tasks\/$/.test(url))).toBe(false);
  });

  it("throws when the HighLevel key is missing instead of returning false success", async () => {
    mocks.ghlApiKey = undefined;
    globalThis.fetch = vi.fn() as typeof fetch;

    const caller = appRouter.createCaller({ user: null } as never);

    await expect(caller.contact.submit(stemInput)).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
      message: "Your request could not be added to our scheduling system. Please call us at 385-707-2373.",
    });

    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(mocks.notifyOwner).toHaveBeenCalledTimes(1);
  });

  it("throws when HighLevel rejects the contact upsert", async () => {
    globalThis.fetch = vi.fn(async () => new Response("invalid payload", { status: 422 })) as typeof fetch;

    const caller = appRouter.createCaller({ user: null } as never);

    await expect(caller.contact.submit(stemInput)).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
    });

    expect(mocks.notifyOwner).toHaveBeenCalledTimes(1);
    expect(mocks.enqueueNurtureSequence).not.toHaveBeenCalled();
  });

  it("throws when HighLevel returns no contact ID", async () => {
    globalThis.fetch = vi.fn(async () => new Response(JSON.stringify({ contact: {} }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;

    const caller = appRouter.createCaller({ user: null } as never);

    await expect(caller.contact.submit(stemInput)).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
    });

    expect(mocks.notifyOwner).toHaveBeenCalledTimes(1);
    expect(mocks.enqueueNurtureSequence).not.toHaveBeenCalled();
  });

  it("throws on a HighLevel network failure", async () => {
    globalThis.fetch = vi.fn(async () => {
      throw new Error("network unavailable");
    }) as typeof fetch;

    const caller = appRouter.createCaller({ user: null } as never);

    await expect(caller.contact.submit(stemInput)).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
    });

    expect(mocks.notifyOwner).toHaveBeenCalledTimes(1);
  });

  it("keeps owner notification failure non-fatal after confirmed CRM ingestion", async () => {
    mocks.notifyOwner.mockRejectedValueOnce(new Error("notification unavailable"));

    const caller = appRouter.createCaller({ user: null } as never);
    const result = await caller.contact.submit(stemInput);

    expect(result.ghlSubmitted).toBe(true);
  });

  it("applies the black label tag and nurture sequence for a black label submission", async () => {
    const fetchMock = successfulFetch("contact-black-label");
    globalThis.fetch = fetchMock as typeof fetch;

    const caller = appRouter.createCaller({ user: null } as never);
    const result = await caller.contact.submit({
      ...stemInput,
      interest: "black-label",
    });

    expect(result.tag).toBe("Black Label Prospect");
    expect(mocks.enqueueNurtureSequence).toHaveBeenCalledWith(expect.objectContaining({
      sequenceType: "black-label",
      ghlContactId: "contact-black-label",
    }));

    const upsertCall = fetchMock.mock.calls.find(([url]) => String(url).endsWith("/contacts/upsert"));
    const request = upsertCall?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toMatchObject({
      tags: ["Black Label Prospect"],
    });
  });
});
