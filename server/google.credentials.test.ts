/**
 * Validates that GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 * are correctly set and can authenticate against Google APIs.
 */
import { describe, it, expect } from "vitest";
import { google } from "googleapis";

describe("Google Service Account credentials", () => {
  it("should have GOOGLE_SERVICE_ACCOUNT_EMAIL set", () => {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    expect(email).toBeTruthy();
    expect(email).toContain("@");
  });

  it("should have GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY set", () => {
    const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    expect(key).toBeTruthy();
    expect(key).toContain("BEGIN PRIVATE KEY");
  });

  it("should be able to create a JWT auth client with the credentials", async () => {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
    const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!;
    const privateKey = rawKey.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: [
        "https://www.googleapis.com/auth/webmasters.readonly",
        "https://www.googleapis.com/auth/analytics.readonly",
      ],
    });

    // Attempt to get an access token — this validates the key format and credentials
    const tokenResponse = await auth.getAccessToken();
    expect(tokenResponse.token).toBeTruthy();
  }, 15000);
});
