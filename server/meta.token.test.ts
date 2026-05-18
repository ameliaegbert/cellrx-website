import { describe, it, expect } from "vitest";

/**
 * Validates that the META_ACCESS_TOKEN env var is set and works
 * against the Meta Graph API to fetch Instagram account info.
 */
describe("Meta Access Token", () => {
  it("should be set in environment", () => {
    expect(process.env.META_ACCESS_TOKEN).toBeTruthy();
    expect(process.env.META_ACCESS_TOKEN!.length).toBeGreaterThan(20);
  });

  it("should return valid Instagram account data from Graph API", async () => {
    const token = process.env.META_ACCESS_TOKEN;
    // The token is a user token for Amelia Yokel — access the IG account directly by known ID
    const IG_ID = '17841476254543340';
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${IG_ID}?fields=id,username,followers_count,media_count&access_token=${token}`
    );
    expect(res.status).toBe(200);
    const data = await res.json() as any;
    expect(data.id).toBe(IG_ID);
    expect(data.username).toBeTruthy();
    expect(typeof data.followers_count).toBe("number");
    expect(data.followers_count).toBeGreaterThan(0);
  }, 15000);
});
