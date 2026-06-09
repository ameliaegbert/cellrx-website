/*
 * CellRX — SEO & Analytics Dashboard
 * Google Search Console + Google Analytics 4 panels
 * Private page: /dashboard/seo
 */

import { trpc } from "@/lib/trpc";
import { RefreshCw, ExternalLink, TrendingUp, TrendingDown, Minus, Search, BarChart2, Globe, MousePointerClick, Eye, Clock, ArrowUpRight } from "lucide-react";
import { useNoIndex } from "@/hooks/useSEO";
import DashboardLayout from "@/components/DashboardLayout";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend
} from "recharts";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function formatDuration(secs: number) {
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return `${m}m ${s}s`;
}

function DeltaBadge({ value, inverted = false }: { value: number | null; inverted?: boolean }) {
  if (value === null) return <span className="text-xs text-muted-foreground">—</span>;
  const positive = inverted ? value < 0 : value > 0;
  const neutral = value === 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${
      neutral ? "text-muted-foreground" : positive ? "text-green-400" : "text-red-400"
    }`}>
      {neutral ? <Minus className="h-3 w-3" /> : positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {Math.abs(value)}%
    </span>
  );
}

function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-foreground tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {title}
      </h2>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

function KPICard({ icon: Icon, label, value, delta, deltaInverted = false, sub }: {
  icon: React.ElementType;
  label: string;
  value: string;
  delta?: number | null;
  deltaInverted?: boolean;
  sub?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        {value}
      </div>
      <div className="flex items-center gap-2">
        {delta !== undefined && <DeltaBadge value={delta ?? null} inverted={deltaInverted} />}
        {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
      </div>
    </div>
  );
}

const CHANNEL_COLORS: Record<string, string> = {
  "Organic Search": "#0047BB",
  "Direct": "#FBB217",
  "Organic Social": "#E1306C",
  "Referral": "#22c55e",
  "Email": "#a855f7",
  "Paid Search": "#f97316",
  "Paid Social": "#06b6d4",
  "Unassigned": "#6b7280",
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardSEO() {
  useNoIndex();

  const gscPerf = trpc.searchConsole.performance.useQuery(undefined, { refetchInterval: 60 * 60 * 1000 });
  const gscTrend = trpc.searchConsole.clickTrend.useQuery(undefined, { refetchInterval: 60 * 60 * 1000 });
  const gaOverview = trpc.analytics.overview.useQuery(undefined, { refetchInterval: 60 * 60 * 1000 });
  const gaTrend = trpc.analytics.sessionTrend.useQuery(undefined, { refetchInterval: 60 * 60 * 1000 });

  const isLoading = gscPerf.isLoading || gaOverview.isLoading;
  const lastUpdated = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const gsc = gscPerf.data;
  const ga = gaOverview.data as any;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">

        {/* ── Header ── */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>
              SEO & ANALYTICS
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Google Search Console · Google Analytics 4 · Last 28 days
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Acellrx.bio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" /> Search Console
            </a>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
              <span>Updated {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: Google Search Console                                  */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-4 w-4 text-[#4285F4]" />
            <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Google Search Console
            </h2>
            <span className="text-xs text-muted-foreground">— organic search performance</span>
          </div>

          {gscPerf.isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0,1,2,3].map(i => (
                <div key={i} className="bg-card border border-border rounded-lg p-5 h-28 animate-pulse" />
              ))}
            </div>
          ) : gscPerf.error ? (
            <div className="bg-card border border-destructive/30 rounded-lg p-6 text-sm text-red-400">
              Failed to load Search Console data. Make sure the service account has been added to Search Console as a Full user.
              <br /><span className="text-xs text-muted-foreground mt-1 block">Error: {(gscPerf.error as any).message}</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* KPI row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KPICard
                  icon={MousePointerClick}
                  label="Total Clicks"
                  value={formatNum(gsc?.current.clicks ?? 0)}
                  delta={gsc?.delta.clicks}
                  sub="vs prior 28d"
                />
                <KPICard
                  icon={Eye}
                  label="Impressions"
                  value={formatNum(gsc?.current.impressions ?? 0)}
                  delta={gsc?.delta.impressions}
                  sub="vs prior 28d"
                />
                <KPICard
                  icon={ArrowUpRight}
                  label="Avg CTR"
                  value={`${gsc?.current.ctr ?? 0}%`}
                  delta={gsc?.delta.ctr}
                  sub="click-through rate"
                />
                <KPICard
                  icon={Search}
                  label="Avg Position"
                  value={`#${gsc?.current.position ?? "—"}`}
                  delta={gsc?.delta.position}
                  deltaInverted
                  sub="lower is better"
                />
              </div>

              {/* Click trend sparkline */}
              {(gscTrend.data ?? []).length > 0 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <SectionHeader title="Daily Clicks — Last 28 Days" sub="Organic search clicks from Google" />
                  <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={gscTrend.data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                      <defs>
                        <linearGradient id="gscGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4285F4" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#4285F4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#D6D7D9" }} tickLine={false} axisLine={false} interval={6} />
                      <YAxis tick={{ fontSize: 10, fill: "#D6D7D9" }} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ background: "#0a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, fontSize: 12 }}
                        formatter={(v: number, name: string) => [v, name === "clicks" ? "Clicks" : "Impressions"]}
                      />
                      <Area type="monotone" dataKey="clicks" stroke="#4285F4" strokeWidth={2} fill="url(#gscGrad)" dot={false} activeDot={{ r: 4, fill: "#FBB217" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Top queries + top pages */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top queries */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <SectionHeader title="Top Queries" sub="Keywords driving the most clicks" />
                  <div className="space-y-0">
                    <div className="grid grid-cols-4 gap-2 pb-2 border-b border-border">
                      <span className="text-xs font-medium text-muted-foreground col-span-2">Query</span>
                      <span className="text-xs font-medium text-muted-foreground text-right">Clicks</span>
                      <span className="text-xs font-medium text-muted-foreground text-right">Pos.</span>
                    </div>
                    {(gsc?.topQueries ?? []).map((q, i) => (
                      <div key={i} className="grid grid-cols-4 gap-2 py-2 border-b border-border/50 last:border-0 items-center">
                        <span className="text-sm text-foreground col-span-2 truncate" title={q.query}>{q.query}</span>
                        <span className="text-sm font-medium text-foreground text-right">{formatNum(q.clicks)}</span>
                        <span className={`text-sm font-medium text-right ${q.position <= 3 ? "text-green-400" : q.position <= 10 ? "text-amber-400" : "text-muted-foreground"}`}>
                          {q.position}
                        </span>
                      </div>
                    ))}
                    {(gsc?.topQueries ?? []).length === 0 && (
                      <p className="text-sm text-muted-foreground py-4 text-center">No query data yet</p>
                    )}
                  </div>
                </div>

                {/* Top pages */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <SectionHeader title="Top Pages" sub="Pages with the most organic clicks" />
                  <div className="space-y-0">
                    <div className="grid grid-cols-4 gap-2 pb-2 border-b border-border">
                      <span className="text-xs font-medium text-muted-foreground col-span-2">Page</span>
                      <span className="text-xs font-medium text-muted-foreground text-right">Clicks</span>
                      <span className="text-xs font-medium text-muted-foreground text-right">CTR</span>
                    </div>
                    {(gsc?.topPages ?? []).map((p, i) => {
                      const path = p.page.replace(/^https?:\/\/[^/]+/, "") || "/";
                      return (
                        <div key={i} className="grid grid-cols-4 gap-2 py-2 border-b border-border/50 last:border-0 items-center">
                          <span className="text-sm text-foreground col-span-2 truncate" title={path}>{path}</span>
                          <span className="text-sm font-medium text-foreground text-right">{formatNum(p.clicks)}</span>
                          <span className="text-sm font-medium text-muted-foreground text-right">{p.ctr}%</span>
                        </div>
                      );
                    })}
                    {(gsc?.topPages ?? []).length === 0 && (
                      <p className="text-sm text-muted-foreground py-4 text-center">No page data yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: Google Analytics 4                                     */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="h-4 w-4 text-[#F9AB00]" />
            <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Google Analytics 4
            </h2>
            <span className="text-xs text-muted-foreground">— website traffic & behavior</span>
          </div>

          {ga?.configured === false ? (
            <div className="bg-card border border-amber-500/20 rounded-lg p-6 space-y-3">
              <p className="text-sm font-medium text-amber-400">GA4 Property ID Required</p>
              <p className="text-xs text-muted-foreground max-w-lg">
                To activate Google Analytics data, please provide your GA4 Property ID (a numeric ID like <code className="bg-muted px-1 rounded">123456789</code>).
                You can find it in Google Analytics → Admin → Property Settings → Property ID.
              </p>
              <p className="text-xs text-muted-foreground">
                Also make sure the service account <code className="bg-muted px-1 rounded">cellrx-dashboard@cellrx.iam.gserviceaccount.com</code> has been added as a Viewer in GA4 Admin → Property Access Management.
              </p>
              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" /> Open Google Analytics
              </a>
            </div>
          ) : gaOverview.isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0,1,2,3].map(i => (
                <div key={i} className="bg-card border border-border rounded-lg p-5 h-28 animate-pulse" />
              ))}
            </div>
          ) : gaOverview.error ? (
            <div className="bg-card border border-destructive/30 rounded-lg p-6 text-sm text-red-400">
              Failed to load Analytics data.
              <br /><span className="text-xs text-muted-foreground mt-1 block">Error: {(gaOverview.error as any).message}</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* KPI row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KPICard
                  icon={Globe}
                  label="Sessions"
                  value={formatNum(ga?.current.sessions ?? 0)}
                  delta={ga?.delta.sessions}
                  sub="vs prior 28d"
                />
                <KPICard
                  icon={TrendingUp}
                  label="Users"
                  value={formatNum(ga?.current.users ?? 0)}
                  delta={ga?.delta.users}
                  sub="vs prior 28d"
                />
                <KPICard
                  icon={Eye}
                  label="Pageviews"
                  value={formatNum(ga?.current.pageviews ?? 0)}
                  delta={ga?.delta.pageviews}
                  sub="vs prior 28d"
                />
                <KPICard
                  icon={Clock}
                  label="Avg Session"
                  value={formatDuration(ga?.current.avgSessionDuration ?? 0)}
                  sub={`${ga?.current.bounceRate ?? 0}% bounce rate`}
                />
              </div>

              {/* Session trend + traffic sources */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Session trend */}
                <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
                  <SectionHeader title="Daily Sessions — Last 28 Days" />
                  {(gaTrend.data ?? []).length > 0 ? (
                    <ResponsiveContainer width="100%" height={160}>
                      <AreaChart data={gaTrend.data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                        <defs>
                          <linearGradient id="gaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F9AB00" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#F9AB00" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#D6D7D9" }} tickLine={false} axisLine={false} interval={6} />
                        <YAxis tick={{ fontSize: 10, fill: "#D6D7D9" }} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{ background: "#0a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, fontSize: 12 }}
                          formatter={(v: number, name: string) => [v, name === "sessions" ? "Sessions" : "Users"]}
                        />
                        <Area type="monotone" dataKey="sessions" stroke="#F9AB00" strokeWidth={2} fill="url(#gaGrad)" dot={false} activeDot={{ r: 4, fill: "#FBB217" }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
                      {gaTrend.isLoading ? "Loading..." : "No trend data yet"}
                    </div>
                  )}
                </div>

                {/* Traffic sources */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <SectionHeader title="Traffic Sources" sub="Sessions by channel" />
                  {(ga?.trafficSources ?? []).length > 0 ? (
                    <div className="space-y-2">
                      {ga.trafficSources.map((s: any, i: number) => {
                        const total = ga.trafficSources.reduce((acc: number, x: any) => acc + x.sessions, 0);
                        const pct = total > 0 ? Math.round((s.sessions / total) * 100) : 0;
                        const color = CHANNEL_COLORS[s.channel] ?? "#6b7280";
                        return (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-foreground truncate">{s.channel}</span>
                              <span className="text-muted-foreground ml-2 shrink-0">{formatNum(s.sessions)} ({pct}%)</span>
                            </div>
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No source data yet</p>
                  )}
                </div>
              </div>

              {/* Top pages */}
              <div className="bg-card border border-border rounded-lg p-6">
                <SectionHeader title="Top Pages" sub="Most visited pages in the last 28 days" />
                <div className="space-y-0">
                  <div className="grid grid-cols-4 gap-2 pb-2 border-b border-border">
                    <span className="text-xs font-medium text-muted-foreground col-span-2">Page</span>
                    <span className="text-xs font-medium text-muted-foreground text-right">Sessions</span>
                    <span className="text-xs font-medium text-muted-foreground text-right">Pageviews</span>
                  </div>
                  {(ga?.topPages ?? []).map((p: any, i: number) => (
                    <div key={i} className="grid grid-cols-4 gap-2 py-2 border-b border-border/50 last:border-0 items-center">
                      <span className="text-sm text-foreground col-span-2 truncate" title={p.page}>{p.page || "/"}</span>
                      <span className="text-sm font-medium text-foreground text-right">{formatNum(p.sessions)}</span>
                      <span className="text-sm text-muted-foreground text-right">{formatNum(p.pageviews)}</span>
                    </div>
                  ))}
                  {(ga?.topPages ?? []).length === 0 && (
                    <p className="text-sm text-muted-foreground py-4 text-center">No page data yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
