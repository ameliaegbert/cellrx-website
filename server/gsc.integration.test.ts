/**
 * Integration test: Google Search Console API access via OAuth2
 * Validates that the OAuth2 refresh token can query the Search Console API
 * for the cellrx.bio domain property.
 */
import { describe, it, expect } from "vitest";
import { google } from "googleapis";

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.GOOGLE_OAUTH_REFRESH_TOKEN!;
const SITE_URL = "sc-domain:cellrx.bio";

describe("Google Search Console API (OAuth2)", () => {
  it("should have OAuth2 credentials set", () => {
    expect(CLIENT_ID).toBeTruthy();
    expect(CLIENT_SECRET).toBeTruthy();
    expect(REFRESH_TOKEN).toBeTruthy();
  });

  it("should be able to authenticate and query Search Console", async () => {
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const webmasters = google.webmasters({ version: "v3", auth: oauth2Client });

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 10);

    const res = await webmasters.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        dimensions: [],
        rowLimit: 1,
      },
    });

    expect(res.status).toBe(200);
    expect(typeof res.data).toBe("object");
  }, 20000);
});
