/**
 * CellRX Dashboard — Lighthouse / PageSpeed Panel
 * Shows Google Lighthouse scores, Core Web Vitals, and top actionable recommendations
 * for cellrx.bio using the PageSpeed Insights API v5.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/DashboardLayout";
import { useNoIndex } from "@/hooks/useSEO";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, RefreshCw, Zap, Eye, CheckCircle, Search, AlertTriangle, XCircle, ChevronDown, ChevronUp } from "lucide-react";

// ─── Score gauge ─────────────────────────────────────────────────────────────
function ScoreGauge({ score, label, icon }: { score: number; label: string; icon: React.ReactNode }) {
  const grade = score >= 90 ? "good" : score >= 50 ? "needs-improvement" : "poor";
  const color = grade === "good" ? "#22c55e" : grade === "needs-improvement" ? "#f59e0b" : "#ef4444";
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
          <circle
            cx="36" cy="36" r={radius} fill="none"
            stroke={color} strokeWidth="6"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.8s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{score}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
    </div>
  );
}

// ─── CWV metric card ─────────────────────────────────────────────────────────
function CWVCard({ title, displayValue, score }: { title: string; displayValue: string; score: number | null }) {
  const grade = score === null ? "neutral" : score >= 0.9 ? "good" : score >= 0.5 ? "needs-improvement" : "poor";
  const color = grade === "good" ? "text-green-400" : grade === "needs-improvement" ? "text-amber-400" : grade === "poor" ? "text-red-400" : "text-muted-foreground";
  const bg = grade === "good" ? "border-green-500/20" : grade === "needs-improvement" ? "border-amber-500/20" : grade === "poor" ? "border-red-500/20" : "border-border";

  return (
    <div className={`bg-card border ${bg} rounded-lg p-4 space-y-1`}>
      <p className="text-xs text-muted-foreground uppercase tracking-widest">{title}</p>
      <p className={`text-2xl font-bold ${color}`} style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{displayValue}</p>
      {score !== null && (
        <div className="flex items-center gap-1 text-xs">
          {grade === "good" ? <CheckCircle className="h-3 w-3 text-green-400" /> : grade === "needs-improvement" ? <AlertTriangle className="h-3 w-3 text-amber-400" /> : <XCircle className="h-3 w-3 text-red-400" />}
          <span className={color}>{grade === "good" ? "Good" : grade === "needs-improvement" ? "Needs improvement" : "Poor"}</span>
        </div>
      )}
    </div>
  );
}

// ─── Audit row ───────────────────────────────────────────────────────────────
function AuditRow({ title, description, displayValue, impact }: { title: string; description: string; displayValue: string; impact: string }) {
  const [expanded, setExpanded] = useState(false);
  const impactColor = impact === "high" ? "text-red-400 bg-red-500/10" : impact === "medium" ? "text-amber-400 bg-amber-500/10" : "text-green-400 bg-green-500/10";

  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between py-3 text-left gap-3 hover:bg-muted/30 px-1 rounded transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${impactColor}`}>{impact}</span>
          <span className="text-sm text-foreground truncate">{title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {displayValue && <span className="text-xs text-muted-foreground">{displayValue}</span>}
          {expanded ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
        </div>
      </button>
      {expanded && (
        <div className="px-1 pb-3 text-xs text-muted-foreground leading-relaxed">
          {description || "No additional details available."}
        </div>
      )}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function DashboardLighthouse() {
  useNoIndex();
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");

  const { data, isLoading, error, refetch, isFetching } = trpc.lighthouse.audit.useQuery(
    { strategy },
    { staleTime: 60 * 60 * 1000 } // 1 hour — matches server cache
  );

  const fetchedAgo = data ? Math.round((Date.now() - data.fetchedAt) / 60000) : null;

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
              Lighthouse / PageSpeed
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Google PageSpeed Insights for <span className="text-primary">cellrx.bio</span>
              {fetchedAgo !== null && <span className="ml-2 text-xs">· cached {fetchedAgo < 1 ? "just now" : `${fetchedAgo}m ago`}</span>}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Strategy toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1 gap-1">
              {(["mobile", "desktop"] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStrategy(s)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${strategy === s ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
              {isFetching ? "Running audit…" : "Re-run audit"}
            </button>
            <a
              href={`https://pagespeed.web.dev/report?url=${encodeURIComponent("https://cellrx.bio")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Full report
            </a>
          </div>
        </div>

        {isLoading || isFetching ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0,1,2,3].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[0,1,2,3,4,5].map(i => <Skeleton key={i} className="h-20 rounded-lg" />)}
            </div>
            <p className="text-xs text-muted-foreground text-center animate-pulse">Running Lighthouse audit on cellrx.bio — this takes 15–30 seconds…</p>
          </div>
        ) : error ? (
          <div className="bg-card border border-red-500/20 rounded-lg p-6 text-center space-y-2">
            <XCircle className="h-8 w-8 text-red-400 mx-auto" />
            <p className="text-sm text-foreground font-medium">Audit failed</p>
            <p className="text-xs text-muted-foreground">{error.message}</p>
            <button onClick={() => refetch()} className="text-xs text-primary hover:underline mt-2">Try again</button>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Category scores */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">Category Scores</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
                <ScoreGauge score={data.scores.performance} label="Performance" icon={<Zap className="h-3 w-3" />} />
                <ScoreGauge score={data.scores.accessibility} label="Accessibility" icon={<Eye className="h-3 w-3" />} />
                <ScoreGauge score={data.scores.bestPractices} label="Best Practices" icon={<CheckCircle className="h-3 w-3" />} />
                <ScoreGauge score={data.scores.seo} label="SEO" icon={<Search className="h-3 w-3" />} />
              </div>
              <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-green-500 inline-block" />90–100 Good</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500 inline-block" />50–89 Needs improvement</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500 inline-block" />0–49 Poor</span>
              </div>
            </div>

            {/* Core Web Vitals */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">Core Web Vitals</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {data.coreWebVitals.map(cwv => (
                  <CWVCard key={cwv.id} title={cwv.title} displayValue={cwv.displayValue} score={cwv.score} />
                ))}
              </div>
            </div>

            {/* Top recommendations */}
            {data.topAudits.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Top Recommendations</h2>
                  <span className="text-xs text-muted-foreground">{data.topAudits.length} issues found</span>
                </div>
                <div className="space-y-0">
                  {data.topAudits.map(audit => (
                    <AuditRow
                      key={audit.id}
                      title={audit.title}
                      description={audit.description}
                      displayValue={audit.displayValue}
                      impact={audit.impact}
                    />
                  ))}
                </div>
              </div>
            )}

            {data.topAudits.length === 0 && (
              <div className="bg-card border border-green-500/20 rounded-xl p-6 text-center space-y-2">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto" />
                <p className="text-sm font-medium text-foreground">No critical issues found</p>
                <p className="text-xs text-muted-foreground">cellrx.bio is passing all major Lighthouse audits for {strategy}.</p>
              </div>
            )}

            {/* Footer */}
            <p className="text-xs text-muted-foreground text-center">
              Audited: {new Date(data.fetchTime).toLocaleString()} · Strategy: {data.strategy} · Results cached 1 hour
            </p>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
}
