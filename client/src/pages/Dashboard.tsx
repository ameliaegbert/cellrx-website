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
import { useEffect } from "react";
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
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: string;
}) {
  return (
    <div className="bg-card border border-dashed border-border rounded-lg p-6 flex flex-col items-center text-center gap-3">
      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-1 max-w-xs">{description}</p>
      </div>
      {action && (
        <span className="text-xs text-primary flex items-center gap-1 cursor-default">
          <ExternalLink className="h-3 w-3" />
          {action}
        </span>
      )}
    </div>
  );
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

  const isLoading =
    summaryQ.isLoading || leadTrendQ.isLoading || appointmentsQ.isLoading || nurtureQ.isLoading || pipelineQ.isLoading;

  const lastUpdated = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const s = summaryQ.data;
  const appt = appointmentsQ.data;
  const nurture = nurtureQ.data;
  const pipeline = pipelineQ.data ?? [];
  const leadTrend = leadTrendQ.data ?? [];

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

        {/* ── Connect Panels ── */}
        <div>
          <SectionHeader
            title="Connect More Data Sources"
            sub="Activate these panels to get the full picture"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ConnectCard
              icon={DollarSign}
              title="Revenue & Invoices"
              description="Add invoices.readonly + payments/transactions.readonly scopes to your GHL private integration."
              action="GHL Settings → Private Integrations"
            />
            <ConnectCard
              icon={BarChart2}
              title="Google Ads"
              description="Connect your Google Ads Manager account to see spend, clicks, and conversions."
              action="Requires Google Ads OAuth"
            />
            <ConnectCard
              icon={BarChart2}
              title="Meta Ads"
              description="Connect your Meta Business Manager to see Facebook and Instagram ad performance."
              action="Requires Meta Business OAuth"
            />
            <ConnectCard
              icon={Share2}
              title="Social Media"
              description="Connect Instagram, TikTok, YouTube, and Facebook to track followers, reach, and engagement."
              action="Requires platform API access"
            />
          </div>
        </div>

        {/* ── Heatmap Panel ── */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <SectionHeader
                title="Website Heatmap"
                sub="Click maps, scroll depth, and session recordings via Microsoft Clarity"
              />
              <div className="mt-2">
                  <a
                    href={`https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/dashboard`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Clarity Dashboard
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">
                    Heatmap tracking is active on cellrx.bio
                  </p>
                </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
