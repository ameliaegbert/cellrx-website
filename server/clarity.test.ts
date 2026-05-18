/**
 * Integration test: Microsoft Clarity Data Export API
 * Validates the API token and confirms live data access.
 */
import { describe, it, expect } from "vitest";

const CLARITY_API_KEY = process.env.CLARITY_API_KEY!;
const CLARITY_API_URL = "https://www.clarity.ms/export-data/api/v1/project-live-insights";

describe("Microsoft Clarity Data Export API", () => {
  it("should have CLARITY_API_KEY set", () => {
    expect(CLARITY_API_KEY).toBeTruthy();
    expect(CLARITY_API_KEY.length).toBeGreaterThan(20);
  });

  it("should authenticate and return live insights", async () => {
    const res = await fetch(`${CLARITY_API_URL}?numOfDays=1`, {
      headers: {
        "Authorization": `Bearer ${CLARITY_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // 200 = success, 401 = bad token, 403 = no access, 429 = rate limited
    expect([200, 429]).toContain(res.status);

    if (res.status === 200) {
      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
      // Each item should have a metricName field
      if (data.length > 0) {
        expect(data[0]).toHaveProperty("metricName");
      }
    }
  }, 15000);
});
