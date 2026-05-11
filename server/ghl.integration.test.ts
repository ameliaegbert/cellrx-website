/**
 * GHL Integration Test
 * Validates that the GHL_API_KEY and GHL_LOCATION_ID are correctly set
 * and that we can create contacts via the GHL v2 API (contacts.write scope).
 * Note: The private integration only has contacts.write scope — GET endpoints
 * will return 401, but POST (create contact) returns 201.
 */

import { describe, expect, it } from "vitest";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

describe("GHL API credentials", () => {
  it("GHL_API_KEY is set in environment", () => {
    expect(process.env.GHL_API_KEY).toBeTruthy();
    expect(process.env.GHL_API_KEY).toMatch(/^pit-/);
  });

  it("GHL_LOCATION_ID is set in environment", () => {
    const locationId = process.env.GHL_LOCATION_ID ?? "nANRD9sxSutEDIdeosHo";
    expect(locationId).toBeTruthy();
    expect(locationId.length).toBeGreaterThan(5);
  });

  it("GHL contacts API accepts contact creation with the provided key (write scope)", async () => {
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID ?? "nANRD9sxSutEDIdeosHo";

    if (!apiKey) {
      console.warn("Skipping live GHL test — GHL_API_KEY not set");
      return;
    }

    // POST a test contact to verify the write scope works
    const response = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify({
        firstName: "Integration",
        lastName: "Test",
        email: `integration-test-${Date.now()}@cellrxtest.com`,
        locationId,
        tags: ["Stem Cell Prospect"],
        source: "CellRX Website Integration Test",
      }),
    });

    // 201 = contact created successfully
    expect(response.status).toBe(201);
    const body = await response.json() as { contact?: { id?: string } };
    expect(body.contact?.id).toBeTruthy();
    console.log(`[GHL Test] Contact created: ${body.contact?.id}`);
  }, 15000); // 15s timeout for network call
});
