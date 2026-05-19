/**
 * Google Analytics 4 tRPC Router
 * Provides website traffic data for the executive dashboard.
 * Uses OAuth2 refresh token (amelia@cellrx.bio) via the GA4 Data REST API.
 *
 * NOTE: Uses the REST API directly instead of @google-analytics/data gRPC client
 * because the gRPC client does not support googleapis OAuth2Client auth objects.
 */

import { adminProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";
import { google } from "googleapis";

const GA_PROPERTY_ID = ENV.gaPropertyId;
const GA4_REST_BASE = "https://analyticsdata.googleapis.com/v1beta";

function getOAuth2Client() {
  const client = new google.auth.OAuth2(
    ENV.googleOAuthClientId,
    ENV.googleOAuthClientSecret,
  );
  client.setCredentials({ refresh_token: ENV.googleOAuthRefreshToken });
  return client;
}

async function ga4Request(endpoint: string, body: object) {
  const auth = getOAuth2Client();
  const { token } = await auth.getAccessToken();
  if (!token) throw new Error("Failed to get GA4 access token");

  const res = await fetch(`${GA4_REST_BASE}/properties/${GA_PROPERTY_ID}${endpoint}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GA4 API error ${res.status}: ${err}`);
  }

  return res.json() as Promise<any>;
}

function formatDate(d: Date) {
  return d.toISOString().split("T")[0];
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export const analyticsRouter = router({
  /**
   * Traffic overview — sessions, users, pageviews, bounce rate
   * for the last 28 days vs prior 28 days
   */
  overview: adminProcedure.query(async () => {
    if (!GA_PROPERTY_ID) {
      return { configured: false, message: "GA_PROPERTY_ID not set" };
    }

    const endDate = formatDate(new Date());
    const startDate28 = formatDate(daysAgo(28));
    const startDatePrev = formatDate(daysAgo(56));
    const endDatePrev = formatDate(daysAgo(29));

    const [currentRes, previousRes, topPagesRes, trafficSourceRes] = await Promise.all([
      // Current 28-day totals
      ga4Request(":runReport", {
        dateRanges: [{ startDate: startDate28, endDate }],
        metrics: [
          { name: "sessions" },
          { name: "totalUsers" },
          { name: "screenPageViews" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
        ],
      }),
      // Previous 28-day totals
      ga4Request(":runReport", {
        dateRanges: [{ startDate: startDatePrev, endDate: endDatePrev }],
        metrics: [
          { name: "sessions" },
          { name: "totalUsers" },
          { name: "screenPageViews" },
          { name: "bounceRate" },
        ],
      }),
      // Top pages by sessions
      ga4Request(":runReport", {
        dateRanges: [{ startDate: startDate28, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "sessions" }, { name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 10,
      }),
      // Traffic by channel
      ga4Request(":runReport", {
        dateRanges: [{ startDate: startDate28, endDate }],
        dimensions: [{ name: "sessionDefaultChannelGrouping" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 8,
      }),
    ]);

    const curRow = currentRes?.rows?.[0]?.metricValues ?? [];
    const prevRow = previousRes?.rows?.[0]?.metricValues ?? [];

    const getVal = (row: any[], idx: number) => parseFloat(row[idx]?.value ?? "0");
    const delta = (a: number, b: number) =>
      b === 0 ? null : Math.round(((a - b) / b) * 100);

    const cur = {
      sessions: Math.round(getVal(curRow, 0)),
      users: Math.round(getVal(curRow, 1)),
      pageviews: Math.round(getVal(curRow, 2)),
      bounceRate: parseFloat((getVal(curRow, 3) * 100).toFixed(1)),
      avgSessionDuration: Math.round(getVal(curRow, 4)),
    };

    const prev = {
      sessions: Math.round(getVal(prevRow, 0)),
      users: Math.round(getVal(prevRow, 1)),
      pageviews: Math.round(getVal(prevRow, 2)),
      bounceRate: parseFloat((getVal(prevRow, 3) * 100).toFixed(1)),
    };

    const topPages = (topPagesRes?.rows ?? []).map((r: any) => ({
      page: r.dimensionValues?.[0]?.value ?? "",
      sessions: Math.round(parseFloat(r.metricValues?.[0]?.value ?? "0")),
      pageviews: Math.round(parseFloat(r.metricValues?.[1]?.value ?? "0")),
    }));

    const trafficSources = (trafficSourceRes?.rows ?? []).map((r: any) => ({
      channel: r.dimensionValues?.[0]?.value ?? "",
      sessions: Math.round(parseFloat(r.metricValues?.[0]?.value ?? "0")),
    }));

    return {
      configured: true,
      period: { start: startDate28, end: endDate },
      current: cur,
      delta: {
        sessions: delta(cur.sessions, prev.sessions),
        users: delta(cur.users, prev.users),
        pageviews: delta(cur.pageviews, prev.pageviews),
        bounceRate: delta(prev.bounceRate, cur.bounceRate), // inverted: lower is better
      },
      topPages,
      trafficSources,
    };
  }),

  /**
   * Daily sessions trend for the last 28 days
   */
  sessionTrend: adminProcedure.query(async () => {
    if (!GA_PROPERTY_ID) {
      return [];
    }

    const endDate = formatDate(new Date());
    const startDate = formatDate(daysAgo(28));

    const res = await ga4Request(":runReport", {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "sessions" }, { name: "totalUsers" }],
      orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
    });

    return (res?.rows ?? []).map((r: any) => ({
      date: r.dimensionValues?.[0]?.value ?? "",
      sessions: Math.round(parseFloat(r.metricValues?.[0]?.value ?? "0")),
      users: Math.round(parseFloat(r.metricValues?.[1]?.value ?? "0")),
    }));
  }),
});
