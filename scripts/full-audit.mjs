/**
 * Full PageSpeed Insights audit for cellrx.bio
 * Runs both mobile and desktop, all categories
 */
import { readFileSync } from "fs";

const API_KEY = process.env.PAGESPEED_API_KEY;
const URL = "https://www.cellrx.bio";
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

async function runAudit(strategy) {
  const params = new URLSearchParams({
    url: URL,
    key: API_KEY,
    strategy,
  });
  CATEGORIES.forEach((c) => params.append("category", c));

  const res = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PageSpeed API error (${strategy}): ${err}`);
  }
  return res.json();
}

function scoreLabel(score) {
  if (score === null || score === undefined) return "N/A";
  const s = Math.round(score * 100);
  if (s >= 90) return `${s} ✅`;
  if (s >= 50) return `${s} ⚠️`;
  return `${s} ❌`;
}

function extractAudits(data) {
  const audits = data.lighthouseResult.audits;
  const categories = data.lighthouseResult.categories;

  const results = {
    scores: {},
    failed: [],
    warnings: [],
    passed: [],
    metrics: {},
  };

  // Category scores
  for (const [key, cat] of Object.entries(categories)) {
    results.scores[key] = cat.score;
  }

  // Core Web Vitals & metrics
  const metricIds = [
    "first-contentful-paint",
    "largest-contentful-paint",
    "total-blocking-time",
    "cumulative-layout-shift",
    "speed-index",
    "interactive",
    "first-meaningful-paint",
  ];
  for (const id of metricIds) {
    if (audits[id]) {
      results.metrics[id] = {
        displayValue: audits[id].displayValue,
        score: audits[id].score,
        numericValue: audits[id].numericValue,
      };
    }
  }

  // Opportunities and diagnostics
  for (const [id, audit] of Object.entries(audits)) {
    if (metricIds.includes(id)) continue;
    if (audit.scoreDisplayMode === "informative") continue;
    if (audit.scoreDisplayMode === "notApplicable") continue;

    const entry = {
      id,
      title: audit.title,
      description: audit.description,
      score: audit.score,
      displayValue: audit.displayValue,
      details: audit.details,
    };

    if (audit.score === null) continue;
    if (audit.score < 0.5) results.failed.push(entry);
    else if (audit.score < 0.9) results.warnings.push(entry);
    else results.passed.push(entry);
  }

  return results;
}

const [mobileData, desktopData] = await Promise.all([
  runAudit("mobile"),
  runAudit("desktop"),
]);

const mobile = extractAudits(mobileData);
const desktop = extractAudits(desktopData);

console.log("\n========================================");
console.log("  CELLRX.BIO — FULL LIGHTHOUSE AUDIT");
console.log("========================================\n");

console.log("CATEGORY SCORES");
console.log("─────────────────────────────────────");
const cats = ["performance", "accessibility", "best-practices", "seo"];
const catLabels = {
  performance: "Performance",
  accessibility: "Accessibility",
  "best-practices": "Best Practices",
  seo: "SEO",
};
for (const c of cats) {
  const m = scoreLabel(mobile.scores[c]);
  const d = scoreLabel(desktop.scores[c]);
  console.log(`  ${catLabels[c].padEnd(18)} Mobile: ${m.padEnd(12)} Desktop: ${d}`);
}

console.log("\nCORE WEB VITALS (MOBILE)");
console.log("─────────────────────────────────────");
const cwv = [
  ["first-contentful-paint", "FCP"],
  ["largest-contentful-paint", "LCP"],
  ["total-blocking-time", "TBT"],
  ["cumulative-layout-shift", "CLS"],
  ["speed-index", "Speed Index"],
  ["interactive", "Time to Interactive"],
];
for (const [id, label] of cwv) {
  const m = mobile.metrics[id];
  const d = desktop.metrics[id];
  if (m) {
    const mLabel = scoreLabel(m.score);
    const dLabel = d ? scoreLabel(d.score) : "N/A";
    console.log(`  ${label.padEnd(22)} Mobile: ${(m.displayValue || "").padEnd(14)} ${mLabel.padEnd(12)} Desktop: ${d?.displayValue || "N/A"} ${dLabel}`);
  }
}

console.log("\n❌ FAILED AUDITS (MOBILE) — Must Fix");
console.log("─────────────────────────────────────");
for (const a of mobile.failed) {
  console.log(`\n  [${a.id}]`);
  console.log(`  Title: ${a.title}`);
  if (a.displayValue) console.log(`  Value: ${a.displayValue}`);
  console.log(`  Fix: ${a.description?.split(".")[0]}`);
}

console.log("\n⚠️  WARNING AUDITS (MOBILE) — Should Fix");
console.log("─────────────────────────────────────");
for (const a of mobile.warnings) {
  console.log(`\n  [${a.id}]`);
  console.log(`  Title: ${a.title}`);
  if (a.displayValue) console.log(`  Value: ${a.displayValue}`);
}

console.log("\n❌ FAILED AUDITS (DESKTOP) — Must Fix");
console.log("─────────────────────────────────────");
for (const a of desktop.failed) {
  console.log(`\n  [${a.id}]`);
  console.log(`  Title: ${a.title}`);
  if (a.displayValue) console.log(`  Value: ${a.displayValue}`);
}

console.log("\n⚠️  WARNING AUDITS (DESKTOP) — Should Fix");
console.log("─────────────────────────────────────");
for (const a of desktop.warnings) {
  console.log(`\n  [${a.id}]`);
  console.log(`  Title: ${a.title}`);
  if (a.displayValue) console.log(`  Value: ${a.displayValue}`);
}

// Save raw JSON for deeper analysis
import { writeFileSync } from "fs";
writeFileSync("/tmp/audit-mobile.json", JSON.stringify(mobileData, null, 2));
writeFileSync("/tmp/audit-desktop.json", JSON.stringify(desktopData, null, 2));
console.log("\n✅ Raw JSON saved to /tmp/audit-mobile.json and /tmp/audit-desktop.json");
