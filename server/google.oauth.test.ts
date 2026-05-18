/**
 * Integration tests: Google OAuth2 access for Search Console + GA4
 * Validates the combined-scope refresh token works for both APIs.
 */
import { describe, it, expect } from "vitest";
import { google } from "googleapis";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.GOOGLE_OAUTH_REFRESH_TOKEN!;
const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID!;
const SITE_URL = "sc-domain:cellrx.bio";

function getOAuth2Client() {
  const client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
  client.setCredentials({ refresh_token: REFRESH_TOKEN });
  return client;
}

describe("Google OAuth2 Combined Credentials", () => {
  it("should have all required credentials set", () => {
    expect(CLIENT_ID).toBeTruthy();
    expect(CLIENT_SECRET).toBeTruthy();
    expect(REFRESH_TOKEN).toBeTruthy();
    expect(GA_PROPERTY_ID).toBeTruthy();
  });

  it("should query Google Search Console successfully", async () => {
    const auth = getOAuth2Client();
    const webmasters = google.webmasters({ version: "v3", auth });

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

  it("should query Google Analytics 4 successfully", async () => {
    const auth = getOAuth2Client();
    const tokens = await auth.getAccessToken();
    expect(tokens.token).toBeTruthy();

    const analyticsDataClient = new BetaAnalyticsDataClient({
      authClient: auth as any,
    });

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const [res] = await analyticsDataClient.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [{
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      }],
      metrics: [{ name: "sessions" }],
    });

    expect(res).toBeDefined();
    expect(Array.isArray(res.rows) || res.rows === undefined || res.rows === null || res.rowCount !== undefined).toBe(true);
  }, 20000);
});
