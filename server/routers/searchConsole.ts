/**
 * Google Search Console tRPC Router
 * Provides organic search performance data for the executive dashboard.
 * Uses service account credentials — no user OAuth required.
 */

import { adminProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";
import { google } from "googleapis";
import { getSearchConsoleAuth } from "../googleApi";

const SITE_URL = ENV.gscSiteUrl || "sc-domain:cellrx.bio";

function formatDate(d: Date) {
  return d.toISOString().split("T")[0];
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export const searchConsoleRouter = router({
  /**
   * Overall performance summary — clicks, impressions, CTR, avg position
   * for the last 28 days vs the prior 28 days
   */
  performance: adminProcedure.query(async () => {
    const auth = getSearchConsoleAuth();
    const webmasters = google.webmasters({ version: "v3", auth });

    const endDate = formatDate(daysAgo(3)); // GSC has ~3 day lag
    const startDate28 = formatDate(daysAgo(31));
    const startDatePrev = formatDate(daysAgo(59));
    const endDatePrev = formatDate(daysAgo(32));

    const [current, previous, topQueries, topPages] = await Promise.all([
      // Current 28-day totals
      webmasters.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: startDate28,
          endDate,
          dimensions: [],
          rowLimit: 1,
        },
      }),
      // Previous 28-day totals (for delta)
      webmasters.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: startDatePrev,
          endDate: endDatePrev,
          dimensions: [],
          rowLimit: 1,
        },
      }),
      // Top queries by clicks
      webmasters.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: startDate28,
          endDate,
          dimensions: ["query"],
          rowLimit: 10,
          dimensionFilterGroups: [],
        },
      }),
      // Top pages by clicks
      webmasters.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: startDate28,
          endDate,
          dimensions: ["page"],
          rowLimit: 10,
        },
      }),
    ]);

    const cur = current.data.rows?.[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    const prev = previous.data.rows?.[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };

    const delta = (a: number, b: number) =>
      b === 0 ? null : Math.round(((a - b) / b) * 100);

    return {
      period: { start: startDate28, end: endDate },
      current: {
        clicks: Math.round(cur.clicks ?? 0),
        impressions: Math.round(cur.impressions ?? 0),
        ctr: parseFloat(((cur.ctr ?? 0) * 100).toFixed(1)),
        position: parseFloat((cur.position ?? 0).toFixed(1)),
      },
      delta: {
        clicks: delta(cur.clicks ?? 0, prev.clicks ?? 0),
        impressions: delta(cur.impressions ?? 0, prev.impressions ?? 0),
        ctr: delta(cur.ctr ?? 0, prev.ctr ?? 0),
        position: delta(prev.position ?? 0, cur.position ?? 0), // inverted: lower is better
      },
      topQueries: (topQueries.data.rows ?? []).slice(0, 10).map(r => ({
        query: r.keys?.[0] ?? "",
        clicks: Math.round(r.clicks ?? 0),
        impressions: Math.round(r.impressions ?? 0),
        ctr: parseFloat(((r.ctr ?? 0) * 100).toFixed(1)),
        position: parseFloat((r.position ?? 0).toFixed(1)),
      })),
      topPages: (topPages.data.rows ?? []).slice(0, 10).map(r => ({
        page: r.keys?.[0] ?? "",
        clicks: Math.round(r.clicks ?? 0),
        impressions: Math.round(r.impressions ?? 0),
        ctr: parseFloat(((r.ctr ?? 0) * 100).toFixed(1)),
        position: parseFloat((r.position ?? 0).toFixed(1)),
      })),
    };
  }),

  /**
   * Daily click trend for the last 28 days (for sparkline chart)
   */
  clickTrend: adminProcedure.query(async () => {
    const auth = getSearchConsoleAuth();
    const webmasters = google.webmasters({ version: "v3", auth });

    const endDate = formatDate(daysAgo(3));
    const startDate = formatDate(daysAgo(31));

    const res = await webmasters.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["date"],
        rowLimit: 28,
      },
    });

    return (res.data.rows ?? []).map(r => ({
      date: r.keys?.[0] ?? "",
      clicks: Math.round(r.clicks ?? 0),
      impressions: Math.round(r.impressions ?? 0),
    }));
  }),
});
