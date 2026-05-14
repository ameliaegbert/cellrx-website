/**
 * Integration test: dashboard.revenue procedure
 * Validates that the GHL invoices and payments endpoints return usable data
 * with the current API key and correct query parameters.
 */

import { describe, it, expect } from "vitest";

const GHL_BASE = "https://services.leadconnectorhq.com";
const KEY = process.env.GHL_API_KEY ?? "";
const LOC = process.env.GHL_LOCATION_ID ?? "nANRD9sxSutEDIdeosHo";
const HEADERS = { Authorization: `Bearer ${KEY}`, Version: "2021-07-28" };

describe("GHL Revenue Scopes", () => {
  it("GHL_API_KEY is set", () => {
    expect(KEY).toBeTruthy();
    expect(KEY.startsWith("pit-")).toBe(true);
  });

  it("invoices endpoint returns 200 with altId params", async () => {
    const r = await fetch(
      `${GHL_BASE}/invoices/?altId=${LOC}&altType=location&limit=10&offset=0`,
      { headers: HEADERS }
    );
    expect(r.status).toBe(200);
    const body = await r.json() as { invoices?: unknown[] };
    expect(Array.isArray(body.invoices)).toBe(true);
  }, 15000);

  it("payments/transactions endpoint returns 200 with altId params", async () => {
    const r = await fetch(
      `${GHL_BASE}/payments/transactions/?altId=${LOC}&altType=location&limit=10`,
      { headers: HEADERS }
    );
    expect(r.status).toBe(200);
    const body = await r.json() as { data?: unknown[] };
    expect(Array.isArray(body.data)).toBe(true);
  }, 15000);
});
