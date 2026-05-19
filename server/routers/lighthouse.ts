/**
 * Google Lighthouse / PageSpeed Insights tRPC Router
 *
 * Uses the Google PageSpeed Insights API v5 (free, no API key required for basic use).
 * Returns Core Web Vitals, Lighthouse category scores, and top actionable audits
 * for both mobile and desktop strategies.
 *
 * API docs: https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed
 *
 * Results are cached for 1 hour to avoid hammering the API.
 */

import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";

const PSI_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const SITE_URL = "https://www.cellrx.bio";

// 1-hour in-memory cache per strategy
const cache: Record<string, { data: LighthouseResult; fetchedAt: number }> = {};
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export interface CoreWebVital {
  id: string;
  title: string;
  displayValue: string;
  score: number | null; // 0-1
  numericValue: number | null;
  unit: string;
}

export interface LighthouseAudit {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue: string;
  impact: "high" | "medium" | "low";
}

export interface LighthouseResult {
  strategy: "mobile" | "desktop";
  url: string;
  fetchTime: string;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  coreWebVitals: CoreWebVital[];
  topAudits: LighthouseAudit[];
  fetchedAt: number;
}

function scoreToGrade(score: number): "good" | "needs-improvement" | "poor" {
  if (score >= 0.9) return "good";
  if (score >= 0.5) return "needs-improvement";
  return "poor";
}

function auditImpact(score: number | null): "high" | "medium" | "low" {
  if (score === null || score < 0.5) return "high";
  if (score < 0.9) return "medium";
  return "low";
}

async function fetchLighthouse(strategy: "mobile" | "desktop"): Promise<LighthouseResult> {
  // Return cache if fresh
  if (cache[strategy] && Date.now() - cache[strategy].fetchedAt < CACHE_TTL_MS) {
    return cache[strategy].data;
  }

  const categories = "performance,accessibility,best-practices,seo";
  const apiKey = ENV.pagespeedApiKey;
  const keyParam = apiKey ? `&key=${apiKey}` : "";
  const url = `${PSI_API}?url=${encodeURIComponent(SITE_URL)}&strategy=${strategy}&category=${categories}${keyParam}`;

  const res = await fetch(url, {
    headers: { "Accept": "application/json" },
    signal: AbortSignal.timeout(90_000), // PSI can be slow
  });

  if (!res.ok) {
    throw new Error(`PageSpeed Insights API error: ${res.status} ${await res.text()}`);
  }

  const json = await res.json() as any;
  const lhr = json.lighthouseResult;
  const cats = lhr.categories;
  const audits = lhr.audits;

  // Category scores (0-1)
  const scores = {
    performance: Math.round((cats.performance?.score ?? 0) * 100),
    accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
    bestPractices: Math.round((cats["best-practices"]?.score ?? 0) * 100),
    seo: Math.round((cats.seo?.score ?? 0) * 100),
  };

  // Core Web Vitals
  const cwvIds = [
    { id: "first-contentful-paint", title: "FCP", unit: "s" },
    { id: "largest-contentful-paint", title: "LCP", unit: "s" },
    { id: "total-blocking-time", title: "TBT", unit: "ms" },
    { id: "cumulative-layout-shift", title: "CLS", unit: "" },
    { id: "speed-index", title: "Speed Index", unit: "s" },
    { id: "interactive", title: "TTI", unit: "s" },
  ];

  const coreWebVitals: CoreWebVital[] = cwvIds.map(({ id, title, unit }) => {
    const audit = audits[id];
    return {
      id,
      title,
      displayValue: audit?.displayValue ?? "—",
      score: audit?.score ?? null,
      numericValue: audit?.numericValue ?? null,
      unit,
    };
  });

  // Top actionable audits — filter to those with score < 0.9 and that have savings
  const actionableAuditIds = [
    "render-blocking-resources",
    "unused-css-rules",
    "unused-javascript",
    "uses-optimized-images",
    "uses-webp-images",
    "uses-responsive-images",
    "efficient-animated-content",
    "uses-text-compression",
    "uses-long-cache-ttl",
    "dom-size",
    "bootup-time",
    "mainthread-work-breakdown",
    "font-display",
    "third-party-summary",
    "largest-contentful-paint-element",
    "layout-shift-elements",
    "meta-description",
    "document-title",
    "link-text",
    "image-alt",
    "structured-data",
  ];

  const topAudits: LighthouseAudit[] = actionableAuditIds
    .map(id => {
      const audit = audits[id];
      if (!audit) return null;
      if (audit.score === null || audit.score >= 1) return null; // already passing
      return {
        id,
        title: audit.title,
        description: audit.description?.replace(/\[.*?\]\(.*?\)/g, "").trim() ?? "",
        score: audit.score,
        displayValue: audit.displayValue ?? "",
        impact: auditImpact(audit.score),
      } as LighthouseAudit;
    })
    .filter(Boolean)
    .sort((a, b) => (a!.score ?? 0) - (b!.score ?? 0)) // worst first
    .slice(0, 10) as LighthouseAudit[];

  const result: LighthouseResult = {
    strategy,
    url: SITE_URL,
    fetchTime: lhr.fetchTime,
    scores,
    coreWebVitals,
    topAudits,
    fetchedAt: Date.now(),
  };

  cache[strategy] = { data: result, fetchedAt: Date.now() };
  return result;
}

export const lighthouseRouter = router({
  /**
   * Run a Lighthouse audit for cellrx.bio.
   * strategy: "mobile" (default) or "desktop"
   * Results are cached for 1 hour.
   */
  audit: adminProcedure
    .input(z.object({ strategy: z.enum(["mobile", "desktop"]).default("mobile") }))
    .query(async ({ input }) => {
      return fetchLighthouse(input.strategy);
    }),

  /**
   * Run both mobile and desktop audits in parallel.
   */
  both: adminProcedure.query(async () => {
    const [mobile, desktop] = await Promise.all([
      fetchLighthouse("mobile"),
      fetchLighthouse("desktop"),
    ]);
    return { mobile, desktop };
  }),
});
