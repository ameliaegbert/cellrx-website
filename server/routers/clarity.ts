/**
 * Microsoft Clarity CRO tRPC Router
 * Fetches live session behavior metrics from the Clarity Data Export API.
 * 
 * API limits: 10 requests/project/day — data is cached for 6 hours server-side.
 * Available metrics: Traffic, Scroll Depth, Rage Click Count, Dead Click Count,
 *   Engagement Time, Excessive Scroll, Quickback Click, Script Error Count
 */

import { adminProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";

const CLARITY_API_URL = "https://www.clarity.ms/export-data/api/v1/project-live-insights";

// Simple in-memory cache to respect the 10 req/day limit
let clarityCache: { data: ClarityMetrics; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

interface ClarityRow {
  totalSessionCount?: string;
  totalBotSessionCount?: string;
  distantUserCount?: string;
  PagesPerSessionPercentage?: number;
  scrollDepthPercentage?: number;
  engagementTimeInMs?: number;
  rageClickCount?: string;
  deadClickCount?: string;
  excessiveScrollCount?: string;
  quickbackClickCount?: string;
  scriptErrorCount?: string;
  errorClickCount?: string;
  [key: string]: any;
}

interface ClarityMetricEntry {
  metricName: string;
  information: ClarityRow[];
}

interface ClarityMetrics {
  sessions: number;
  botSessions: number;
  users: number;
  pagesPerSession: number;
  scrollDepth: number;
  engagementTimeSec: number;
  rageClicks: number;
  deadClicks: number;
  excessiveScrolls: number;
  quickbackClicks: number;
  scriptErrors: number;
  byDevice: Array<{ device: string; sessions: number; pagesPerSession: number }>;
  byChannel: Array<{ channel: string; sessions: number }>;
  fetchedAt: number;
}

async function fetchClarityMetrics(): Promise<ClarityMetrics> {
  // Return cache if fresh
  if (clarityCache && Date.now() - clarityCache.fetchedAt < CACHE_TTL_MS) {
    return clarityCache.data;
  }

  const apiKey = ENV.clarityApiKey;
  if (!apiKey) throw new Error("CLARITY_API_KEY not set");

  // Fetch traffic by device (gives sessions, pages/session, scroll depth)
  const [trafficRes, channelRes] = await Promise.all([
    fetch(`${CLARITY_API_URL}?numOfDays=1&dimension1=Device`, {
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    }),
    fetch(`${CLARITY_API_URL}?numOfDays=1&dimension1=Channel`, {
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    }),
  ]);

  if (!trafficRes.ok) {
    throw new Error(`Clarity API error: ${trafficRes.status} ${await trafficRes.text()}`);
  }

  const trafficData: ClarityMetricEntry[] = await trafficRes.json();
  const channelData: ClarityMetricEntry[] = channelRes.ok ? await channelRes.json() : [];

  // Aggregate totals from Traffic metric
  const trafficMetric = trafficData.find(m => m.metricName === "Traffic");
  const trafficRows = trafficMetric?.information ?? [];

  let totalSessions = 0;
  let totalBotSessions = 0;
  let totalUsers = 0;
  let weightedPagesPerSession = 0;
  let weightedScrollDepth = 0;
  let weightedEngagement = 0;
  let totalRageClicks = 0;
  let totalDeadClicks = 0;
  let totalExcessiveScrolls = 0;
  let totalQuickbacks = 0;
  let totalScriptErrors = 0;

  const byDevice: Array<{ device: string; sessions: number; pagesPerSession: number }> = [];

  for (const row of trafficRows) {
    const sessions = parseInt(row.totalSessionCount ?? "0", 10);
    totalSessions += sessions;
    totalBotSessions += parseInt(row.totalBotSessionCount ?? "0", 10);
    totalUsers += parseInt(row.distantUserCount ?? "0", 10);
    weightedPagesPerSession += (row.PagesPerSessionPercentage ?? 0) * sessions;
    weightedScrollDepth += (row.scrollDepthPercentage ?? 0) * sessions;
    weightedEngagement += (row.engagementTimeInMs ?? 0) * sessions;
    totalRageClicks += parseInt(row.rageClickCount ?? "0", 10);
    totalDeadClicks += parseInt(row.deadClickCount ?? "0", 10);
    totalExcessiveScrolls += parseInt(row.excessiveScrollCount ?? "0", 10);
    totalQuickbacks += parseInt(row.quickbackClickCount ?? "0", 10);
    totalScriptErrors += parseInt(row.scriptErrorCount ?? "0", 10);

    if (row.Device) {
      byDevice.push({
        device: row.Device,
        sessions,
        pagesPerSession: parseFloat((row.PagesPerSessionPercentage ?? 0).toFixed(2)),
      });
    }
  }

  // Channel breakdown
  const channelMetric = channelData.find(m => m.metricName === "Traffic");
  const byChannel = (channelMetric?.information ?? []).map(row => ({
    channel: row.Channel ?? row.channel ?? "Unknown",
    sessions: parseInt(row.totalSessionCount ?? "0", 10),
  })).filter(c => c.sessions > 0);

  const metrics: ClarityMetrics = {
    sessions: totalSessions,
    botSessions: totalBotSessions,
    users: totalUsers,
    pagesPerSession: totalSessions > 0 ? parseFloat((weightedPagesPerSession / totalSessions).toFixed(2)) : 0,
    scrollDepth: totalSessions > 0 ? parseFloat((weightedScrollDepth / totalSessions).toFixed(1)) : 0,
    engagementTimeSec: totalSessions > 0 ? Math.round(weightedEngagement / totalSessions / 1000) : 0,
    rageClicks: totalRageClicks,
    deadClicks: totalDeadClicks,
    excessiveScrolls: totalExcessiveScrolls,
    quickbackClicks: totalQuickbacks,
    scriptErrors: totalScriptErrors,
    byDevice: byDevice.sort((a, b) => b.sessions - a.sessions),
    byChannel: byChannel.sort((a, b) => b.sessions - a.sessions),
    fetchedAt: Date.now(),
  };

  clarityCache = { data: metrics, fetchedAt: Date.now() };
  return metrics;
}

export const clarityRouter = router({
  /**
   * Live CRO metrics from Clarity — sessions, scroll depth, rage/dead clicks, etc.
   * Cached for 6 hours to respect the 10 req/day API limit.
   */
  metrics: adminProcedure.query(async () => {
    if (!ENV.clarityApiKey) {
      return { configured: false };
    }
    const data = await fetchClarityMetrics();
    return { configured: true, ...data };
  }),
});
