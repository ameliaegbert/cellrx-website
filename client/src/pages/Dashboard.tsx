/**
 * CellRX Executive Dashboard
 * Clean, minimal KPI view for marketing, sales, and growth metrics.
 *
 * Live data:
 *   - GHL Pipeline (leads by stage, conversion rate, pipeline value)
 *   - Lead trend (new leads per day, last 30 days)
 *   - Appointments (upcoming, no-shows, reminders sent)
 *   - Nurture sequences (active, pending messages, sent last 7 days)
 *
 * Placeholder panels (activate when accounts are connected):
 *   - Ads Performance (Google Ads + Meta Ads)
 *   - Revenue / Invoices (needs invoices.readonly GHL scope)
 *   - Social Media (Instagram, TikTok, YouTube, Facebook)
 *
 * Heatmap: Microsoft Clarity (script injected on mount)
 */

import { trpc } from "@/lib/trpc";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  Users,
  TrendingUp,
  Calendar,
  MessageSquare,
  DollarSign,
  BarChart2,
  Share2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

// ─── Clarity injection ───────────────────────────────────────────────────────
const CLARITY_PROJECT_ID = "wr6mdwhjnk"; // Microsoft Clarity — CellRX project

function useMicrosoftClarity() {
  useEffect(() => {
    if ((window as any).clarity) return; // already loaded

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
    `;
    document.head.appendChild(script);
  }, []);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KPICard({
  icon: Icon,
  label,
  value,
  sub,
  accent = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
        <Icon
          className={`h-4 w-4 ${accent ? "text-amber-400" : "text-muted-foreground"}`}
        />
      </div>
      <div
        className={`text-3xl font-bold tracking-tight ${accent ? "text-amber-400" : "text-foreground"}`}
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {value}
      </div>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-4">
      <h2
        className="text-lg font-semibold text-foreground tracking-tight"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {title}
      </h2>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

function ConnectCard({
  icon: Icon,
  title,
  description,
  action,
  href,
  badge,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: string;
  href?: string;
  badge?: string;
}) {
  const inner = (
    <div className={`bg-card border ${href ? 'border-border hover:border-primary/50 transition-colors cursor-pointer' : 'border-dashed border-border'} rounded-lg p-6 flex flex-col items-center text-center gap-3 h-full`}>
      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm font-medium text-foreground">{title}</p>
          {badge && (
            <span className="text-[10px] font-semibold bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded-full">{badge}</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1 max-w-xs">{description}</p>
      </div>
      {action && (
        <span className="text-xs text-primary flex items-center gap-1">
          <ExternalLink className="h-3 w-3" />
          {action}
        </span>
      )}
    </div>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }
  return inner;
}

const STAGE_COLORS: Record<string, string> = {
  "New Lead": "#0047BB",
  "Consultation Booked": "#FBB217",
  "Post-Consult Nurture": "#36454F",
  "Closed Won": "#22c55e",
  "Closed Lost": "#ef4444",
  "Purgatory": "#6b7280",
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  useMicrosoftClarity();

  const summaryQ = trpc.dashboard.summary.useQuery(undefined, { refetchInterval: 5 * 60 * 1000 });
  const leadTrendQ = trpc.dashboard.leadTrend.useQuery(undefined, { refetchInterval: 5 * 60 * 1000 });
  const appointmentsQ = trpc.dashboard.appointments.useQuery(undefined, { refetchInterval: 5 * 60 * 1000 });
  const nurtureQ = trpc.dashboard.nurtureStatus.useQuery(undefined, { refetchInterval: 5 * 60 * 1000 });
  const pipelineQ = trpc.dashboard.pipeline.useQuery(undefined, { refetchInterval: 5 * 60 * 1000 });
  const revenueQ = trpc.dashboard.revenue.useQuery(undefined, { refetchInterval: 10 * 60 * 1000 });
  const socialQ = trpc.dashboard.socialStats.useQuery(undefined, { refetchInterval: 30 * 60 * 1000 });
  const [revPeriod, setRevPeriod] = useState<'30d' | '60d' | '90d' | 'ytd' | 'lifetime'>('30d');

  const isLoading =
    summaryQ.isLoading || leadTrendQ.isLoading || appointmentsQ.isLoading || nurtureQ.isLoading || pipelineQ.isLoading;

  const lastUpdated = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const s = summaryQ.data;
  const appt = appointmentsQ.data;
  const nurture = nurtureQ.data;
  const pipeline = pipelineQ.data ?? [];
  const leadTrend = leadTrendQ.data ?? [];
  const rev = revenueQ.data;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">

        {/* ── Header ── */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h1
              className="text-2xl font-bold text-foreground tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
            >
              CELLRX DASHBOARD
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Marketing · Sales · Growth
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
            <span>Updated {lastUpdated}</span>
          </div>
        </div>

        {/* ── Top KPI Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard
            icon={Users}
            label="Total Contacts"
            value={s?.totalContacts?.toLocaleString() ?? "—"}
            sub="All time in GHL"
          />
          <KPICard
            icon={TrendingUp}
            label="New Leads (30d)"
            value={s?.newLeads30d ?? "—"}
            sub={`${s?.newLeads7d ?? "—"} this week`}
            accent
          />
          <KPICard
            icon={BarChart2}
            label="Open Pipeline"
            value={s?.openOpportunities ?? "—"}
            sub={`${formatCurrency(s?.totalPipelineValue ?? 0)} potential value`}
          />
          <KPICard
            icon={TrendingUp}
            label="Conversion Rate"
            value={s ? `${s.conversionRate}%` : "—"}
            sub="Won / (Won + Lost)"
            accent={!!s && s.conversionRate > 0}
          />
        </div>

        {/* ── Lead Trend Chart ── */}
        <div className="bg-card border border-border rounded-lg p-6">
          <SectionHeader
            title="New Leads — Last 30 Days"
            sub="Opportunities created in GHL by day"
          />
          {leadTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={leadTrend} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0047BB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0047BB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  tick={{ fontSize: 10, fill: "#D6D7D9" }}
                  tickLine={false}
                  axisLine={false}
                  interval={6}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#D6D7D9" }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0a1a2e",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                  labelFormatter={(v) => `Date: ${v}`}
                  formatter={(v: number) => [v, "New Leads"]}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#0047BB"
                  strokeWidth={2}
                  fill="url(#leadGrad)"
                  dot={false}
                  activeDot={{ r: 4, fill: "#FBB217" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
              {leadTrendQ.isLoading ? "Loading..." : "No data yet"}
            </div>
          )}
        </div>

        {/* ── Pipeline Funnel + Appointments ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Pipeline by Stage */}
          <div className="bg-card border border-border rounded-lg p-6">
            <SectionHeader
              title="Pipeline by Stage"
              sub="Open opportunities in Patient Pipeline"
            />
            {pipeline.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={pipeline}
                  layout="vertical"
                  margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#D6D7D9" }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <YAxis
                    dataKey="stage"
                    type="category"
                    tick={{ fontSize: 10, fill: "#D6D7D9" }}
                    tickLine={false}
                    axisLine={false}
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0a1a2e",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 6,
                      fontSize: 12,
                    }}
                    formatter={(v: number, _: string, props: any) => [
                      `${v} leads · ${formatCurrency(props.payload.value)}`,
                      "Stage",
                    ]}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {pipeline.map((entry) => (
                      <Cell
                        key={entry.stage}
                        fill={STAGE_COLORS[entry.stage] ?? "#36454F"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                {pipelineQ.isLoading ? "Loading..." : "No pipeline data"}
              </div>
            )}
          </div>

          {/* Appointments + Nurture */}
          <div className="flex flex-col gap-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <SectionHeader title="Appointments (30d)" sub="From GHL calendar polling" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {appt?.total ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Total tracked</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {appt?.upcoming ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Upcoming</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {appt?.noShows ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">No-shows</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {appt?.remindersEnqueued ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Reminders sent</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <SectionHeader title="Nurture Sequences" sub="Active SMS follow-up campaigns" />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {nurture?.activeSequences ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Active contacts</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {nurture?.pendingMessages ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Pending msgs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {nurture?.sentLast7d ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Sent (7d)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Revenue & Invoices Panel ── */}
        <div id="revenue" className="bg-card border border-border rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <SectionHeader title="Revenue & Invoices" sub="Live from GHL — invoices and payment transactions" />
            {/* Period selector */}
            <div className="flex gap-1 bg-muted rounded-lg p-1 self-start sm:self-auto">
              {(['30d', '60d', '90d', 'ytd', 'lifetime'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setRevPeriod(p)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    revPeriod === p
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {p === 'ytd' ? 'YTD' : p === 'lifetime' ? 'All Time' : p.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          {revenueQ.isLoading ? (
            <div className="text-sm text-muted-foreground">Loading revenue data...</div>
          ) : revenueQ.error ? (
            <div className="text-sm text-red-400">Failed to load revenue data</div>
          ) : (
            <div className="space-y-6">
              {/* KPI row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-2xl font-bold text-green-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {formatCurrency(
                      revPeriod === '30d' ? (rev?.revenue30d ?? 0)
                      : revPeriod === '60d' ? (rev?.revenue60d ?? 0)
                      : revPeriod === '90d' ? (rev?.revenue90d ?? 0)
                      : revPeriod === 'ytd' ? (rev?.revenueYTD ?? 0)
                      : (rev?.revenueLifetime ?? 0)
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Collected ({revPeriod === 'ytd' ? 'YTD' : revPeriod === 'lifetime' ? 'All Time' : revPeriod.toUpperCase()})
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {formatCurrency(rev?.outstandingRevenue ?? 0)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Outstanding</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {formatCurrency(rev?.totalRevenue ?? 0)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Lifetime collected</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {rev?.totalInvoices ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Invoices ({rev?.paidInvoices ?? 0} paid · {rev?.overdueInvoices ?? 0} overdue)
                  </p>
                </div>
              </div>
              {/* Recent transactions */}
              {rev?.recentTransactions && rev.recentTransactions.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Recent Payments</p>
                  <div className="space-y-2">
                    {rev.recentTransactions.slice(0, 8).map(t => (
                      <div key={t.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">{t.contactName}</p>
                          <p className="text-xs text-muted-foreground">{t.description} · {t.date ? new Date(t.date).toLocaleDateString() : ''}</p>
                        </div>
                        <p className="text-sm font-bold text-green-400">{formatCurrency(t.amount)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Ads Performance ── */}
        <div>
          <SectionHeader
            title="Ads Performance"
            sub="Click a panel to open live reporting in GHL — full spend, clicks, and conversion data"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ConnectCard
              icon={BarChart2}
              title="Google Ads"
              badge="Live in GHL"
              description="Spend, impressions, clicks, conversions, and campaign performance. Opens directly in GHL Ads Reporting."
              action="Open Google Ads Reporting →"
              href="https://app.gohighlevel.com/v2/location/nANRD9sxSutEDIdeosHo/reporting/ads-reporting?platform=google"
            />
            <ConnectCard
              icon={BarChart2}
              title="Meta Ads"
              badge="Live in GHL"
              description="Facebook and Instagram ad performance — spend, reach, leads, and cost per result. Opens directly in GHL Ads Reporting."
              action="Open Meta Ads Reporting →"
              href="https://app.gohighlevel.com/v2/location/nANRD9sxSutEDIdeosHo/reporting/ads-reporting?platform=facebook"
            />
          </div>
        </div>

        {/* ── Social Stats ── */}
        <div id="social">
          <SectionHeader
            title="Social Media"
            sub="TikTok and YouTube — live public stats"
          />
          {socialQ.isLoading ? (
            <div className="text-sm text-muted-foreground">Loading social stats...</div>
          ) : socialQ.error ? (
            <div className="text-sm text-red-400">Failed to load social stats</div>
          ) : (
            <div className="space-y-6">
              {/* Platform cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* TikTok */}
                {socialQ.data?.tiktok ? (
                  <div className="bg-card border border-border rounded-lg p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-[#FBB217]" />
                        <p className="text-sm font-semibold text-foreground">TikTok</p>
                        <span className="text-xs text-muted-foreground">{socialQ.data.tiktok.handle}</span>
                      </div>
                      <a
                        href="https://www.tiktok.com/@cellrx.bio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" /> View Profile
                      </a>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          {socialQ.data.tiktok.followers.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">Followers</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          {socialQ.data.tiktok.likes.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">Total Likes</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          {socialQ.data.tiktok.videos.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">Videos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      <p className="text-xs text-muted-foreground italic">{socialQ.data.tiktok.bio}</p>
                    </div>
                  </div>
                ) : (
                  <ConnectCard icon={Share2} title="TikTok" description="Stats temporarily unavailable." action="View Profile" href="https://www.tiktok.com/@cellrx.bio" />
                )}

                {/* YouTube */}
                {socialQ.data?.youtube ? (
                  <div className="bg-card border border-border rounded-lg p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-red-500" />
                        <p className="text-sm font-semibold text-foreground">YouTube</p>
                        <span className="text-xs text-muted-foreground">@CellRxbio</span>
                      </div>
                      <a
                        href="https://www.youtube.com/@CellRxbio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" /> View Channel
                      </a>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Top Performing Videos</p>
                      <div className="space-y-2">
                        {socialQ.data.youtube.topVideos.slice(0, 5).map((v, i) => (
                          <a
                            key={v.videoId}
                            href={v.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between py-2 border-b border-border last:border-0 hover:bg-muted/30 rounded px-1 transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-xs text-muted-foreground shrink-0 w-4">{i + 1}.</span>
                              <p className="text-sm text-foreground truncate">{v.title}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-2">
                              <span className="text-xs text-muted-foreground">{v.views.toLocaleString()} views</span>
                              <span className="text-xs text-muted-foreground hidden sm:block">{v.published}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <ConnectCard icon={Share2} title="YouTube" description="Stats temporarily unavailable." action="View Channel" href="https://www.youtube.com/@CellRxbio" />
                )}

              </div>

              {/* Instagram + Facebook — pending token */}
              <div className="bg-muted/30 border border-dashed border-border rounded-lg p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Instagram &amp; Facebook Stats</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Followers, reach, and post performance will appear here once the Meta access token is connected.</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a href="https://www.instagram.com/cellrx.bio/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Instagram →</a>
                  <a href="https://www.facebook.com/p/CellRx-61582063796150/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Facebook →</a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Heatmap Panel ── */}
        <div id="heatmap" className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <SectionHeader
              title="Website Heatmap"
              sub="Click maps, scroll depth, and session recordings via Microsoft Clarity"
            />
            <a
              href={`https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/dashboard`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline shrink-0"
            >
              <ExternalLink className="h-3 w-3" />
              Open full Clarity dashboard
            </a>
          </div>

          {/* Quick-access tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Heatmaps', desc: 'Click & hover maps for every page', path: 'heatmaps' },
              { label: 'Session Recordings', desc: 'Watch real visitor sessions', path: 'recordings' },
              { label: 'Insights', desc: 'Dead clicks, rage clicks, scroll depth', path: 'insights' },
            ].map(tile => (
              <a
                key={tile.path}
                href={`https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/${tile.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 bg-muted hover:bg-muted/80 rounded-lg p-4 transition-colors cursor-pointer border border-border hover:border-primary/40"
              >
                <p className="text-sm font-medium text-foreground">{tile.label}</p>
                <p className="text-xs text-muted-foreground">{tile.desc}</p>
                <span className="text-xs text-primary mt-1 flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  Open in Clarity
                </span>
              </a>
            ))}
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Tracking active on cellrx.bio · Project ID: {CLARITY_PROJECT_ID}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
