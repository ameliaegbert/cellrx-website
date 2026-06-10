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
  MousePointerClick,
  Scroll,
  Zap,
  Monitor,
  Smartphone,
  Tablet,
  Search,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNoIndex } from "@/hooks/useSEO";
import PanelErrorBoundary from "@/components/PanelErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";

// ─── Clarity injection ───────────────────────────────────────────────────────
// Clarity is loaded globally in index.html — no need to load it again here
const CLARITY_PROJECT_ID = "wr6mdwhjnk"; // Microsoft Clarity — CellRX project (used for dashboard links only)

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
  useNoIndex(); // Prevent search engines from indexing the admin dashboard

  const summaryQ = trpc.dashboard.summary.useQuery(undefined, { refetchInterval: 5 * 60 * 1000 });
  const leadTrendQ = trpc.dashboard.leadTrend.useQuery(undefined, { refetchInterval: 5 * 60 * 1000 });
  const appointmentsQ = trpc.dashboard.appointments.useQuery(undefined, { refetchInterval: 5 * 60 * 1000 });
  const nurtureQ = trpc.dashboard.nurtureStatus.useQuery(undefined, { refetchInterval: 5 * 60 * 1000 });
  const pipelineQ = trpc.dashboard.pipeline.useQuery(undefined, { refetchInterval: 5 * 60 * 1000 });
  const socialQ = trpc.dashboard.socialStats.useQuery(undefined, { refetchInterval: 30 * 60 * 1000 });
  const clarityQ = trpc.clarity.metrics.useQuery(undefined, { refetchInterval: 6 * 60 * 60 * 1000 }); // 6h cache matches API limit
  const gscQ = trpc.searchConsole.performance.useQuery(undefined, { refetchInterval: 60 * 60 * 1000 });
  const gsc = gscQ.data;

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

        {/* ── SEO Quick Stats ── */}
        <div id="seo-summary">
          <div className="flex items-center gap-2 mb-3">
            <Search className="h-4 w-4 text-[#4285F4]" />
            <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>SEO Performance</h2>
            <span className="text-xs text-muted-foreground">— organic search · last 28 days</span>
            <a href="/dashboard/seo" className="ml-auto text-xs text-primary hover:underline flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" /> Full Report
            </a>
          </div>
          {gscQ.isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0,1,2,3].map(i => <div key={i} className="bg-card border border-border rounded-lg p-5 h-24 animate-pulse" />)}
            </div>
          ) : gscQ.error || !gsc ? (
            <div className="bg-card border border-border rounded-lg p-4 text-xs text-muted-foreground">
              Search Console data unavailable — <a href="/dashboard/seo" className="text-primary hover:underline">check SEO page for details</a>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2"><MousePointerClick className="h-4 w-4 text-[#4285F4]" /><p className="text-xs text-muted-foreground">Clicks</p></div>
                <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{gsc.current.clicks.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">organic search</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2"><Eye className="h-4 w-4 text-[#4285F4]" /><p className="text-xs text-muted-foreground">Impressions</p></div>
                <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{gsc.current.impressions.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">search appearances</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2"><ArrowUpRight className="h-4 w-4 text-[#4285F4]" /><p className="text-xs text-muted-foreground">Avg CTR</p></div>
                <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{gsc.current.ctr}%</p>
                <p className="text-xs text-muted-foreground mt-1">click-through rate</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2"><Search className="h-4 w-4 text-[#4285F4]" /><p className="text-xs text-muted-foreground">Avg Position</p></div>
                <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>#{gsc.current.position}</p>
                <p className="text-xs text-muted-foreground mt-1">lower is better</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Social Stats ── */}
        <div id="social">
          <SectionHeader
            title="Social Media"
            sub="TikTok and YouTube — live public stats"
          />
          {socialQ.isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[0,1,2].map(i => (
                    <div key={i}>
                      <Skeleton className="h-7 w-16 mb-1" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[0,1,2].map(i => (
                    <div key={i}>
                      <Skeleton className="h-7 w-16 mb-1" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[0,1,2].map(i => <Skeleton key={i} className="h-8 w-full" />)}
                </div>
              </div>
            </div>
          ) : (
          <PanelErrorBoundary title="Social stats failed to load">
          {socialQ.error ? (
            <div className="bg-card border border-destructive/30 rounded-lg p-6 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive/70 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Social stats unavailable</p>
                <p className="text-xs text-muted-foreground mt-0.5">{(socialQ.error as unknown as Error).message}</p>
              </div>
            </div>
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
                    {/* Channel stats row */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          {(socialQ.data.youtube.subscribers ?? 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">Subscribers</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          {(socialQ.data.youtube.totalViews ?? 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">Total Views</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          {(socialQ.data.youtube.videoCount ?? 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">Videos</p>
                      </div>
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

              {/* Instagram — live when META_ACCESS_TOKEN is set */}
              {socialQ.data?.instagram ? (
                <div className="bg-card border border-border rounded-lg p-5 space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {socialQ.data.instagram.profilePicture && (
                        <img
                          src={socialQ.data.instagram.profilePicture}
                          alt="Instagram profile"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">Instagram</p>
                          <span className="text-xs text-muted-foreground">@{socialQ.data.instagram.username}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                          <span className="text-xs text-green-400">Live</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 max-w-md truncate">{socialQ.data.instagram.biography}</p>
                      </div>
                    </div>
                    <a
                      href={`https://www.instagram.com/${socialQ.data.instagram.username}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1 shrink-0"
                    >
                      <ExternalLink className="h-3 w-3" /> View Profile
                    </a>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {[
                      { label: 'Followers', value: socialQ.data.instagram.followers.toLocaleString() },
                      { label: 'Posts', value: socialQ.data.instagram.mediaCount.toLocaleString() },
                      { label: '30d Reach', value: socialQ.data.instagram.reach30d.toLocaleString() },
                      { label: 'Profile Views', value: socialQ.data.instagram.profileViews30d.toLocaleString() },
                      { label: 'Link Clicks', value: socialQ.data.instagram.websiteClicks30d.toLocaleString() },
                      { label: 'Top Post Likes', value: (socialQ.data.instagram.topPosts[0]?.likeCount ?? 0).toLocaleString() },
                    ].map(s => (
                      <div key={s.label}>
                        <p className="text-xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{s.value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* 30-day Reach Sparkline */}
                  {socialQ.data.instagram.reachSeries && socialQ.data.instagram.reachSeries.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">Daily Reach — Last 30 Days</p>
                      <ResponsiveContainer width="100%" height={80}>
                        <AreaChart data={socialQ.data.instagram.reachSeries} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="igReachGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#E1306C" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#E1306C" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" hide />
                          <YAxis hide />
                          <Tooltip
                            contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px', fontSize: '11px' }}
                            formatter={(v: number) => [v.toLocaleString(), 'Reach']}
                            labelFormatter={(l: string) => l}
                          />
                          <Area type="monotone" dataKey="value" stroke="#E1306C" strokeWidth={1.5} fill="url(#igReachGrad)" dot={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Top posts */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Top Posts by Engagement</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {socialQ.data.instagram.topPosts.map((post, i) => (
                        <a
                          key={post.id}
                          href={post.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 p-2 rounded border border-border hover:bg-muted/30 transition-colors"
                        >
                          <span className="text-xs text-muted-foreground shrink-0 w-4 mt-0.5">{i + 1}.</span>
                          <div className="min-w-0">
                            <p className="text-xs text-foreground line-clamp-2">{post.caption || '(No caption)'}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-muted-foreground">♥ {post.likeCount}</span>
                              <span className="text-xs text-muted-foreground">💬 {post.commentsCount}</span>
                              <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
          </PanelErrorBoundary>
          )}
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

        {/* ── Financials — Private Page Link ── */}
        <div id="revenue" className="bg-card border border-amber-500/20 rounded-lg p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <DollarSign className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">Revenue &amp; Invoices</p>
                  <span className="text-[10px] font-semibold bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded-full">PRIVATE PAGE</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 max-w-md">
                  Financial data has been moved to a separate private page. Open it in a new tab to keep it out of shared meeting views.
                </p>
              </div>
            </div>
            <a
              href="/dashboard/financials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-2 rounded-lg transition-colors shrink-0"
            >
              <ExternalLink className="h-3 w-3" />
              Open Financials
            </a>
          </div>
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


        {/* ── Heatmap / CRO Panel ── */}
        <div id="heatmap" className="bg-card border border-border rounded-lg p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <SectionHeader
              title="CRO & Heatmap"
              sub="Live session behavior from Microsoft Clarity · last 24 hours"
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                Live
              </div>
              <a
                href={`https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/dashboard`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline shrink-0"
              >
                <ExternalLink className="h-3 w-3" />
                Open Clarity
              </a>
            </div>
          </div>

          {clarityQ.isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[0,1,2,3].map(i => <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />)}
            </div>
          ) : clarityQ.error || !(clarityQ.data as any)?.configured ? (
            <div className="text-xs text-muted-foreground bg-muted rounded-lg p-4">
              Clarity metrics unavailable. Check CLARITY_API_KEY in secrets.
            </div>
          ) : (() => {
            const c = clarityQ.data as any;
            const deviceIcon = (d: string) => {
              if (d?.toLowerCase().includes('mobile') || d?.toLowerCase().includes('phone')) return <Smartphone className="h-3 w-3" />;
              if (d?.toLowerCase().includes('tablet')) return <Tablet className="h-3 w-3" />;
              return <Monitor className="h-3 w-3" />;
            };
            return (
              <div className="space-y-5">
                {/* KPI row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: Users, label: 'Sessions', value: c.sessions?.toLocaleString() ?? '—', sub: `${c.botSessions?.toLocaleString() ?? 0} bots filtered` },
                    { icon: Scroll, label: 'Scroll Depth', value: `${c.scrollDepth ?? 0}%`, sub: `${c.pagesPerSession ?? 0} pages/session` },
                    { icon: MousePointerClick, label: 'Rage Clicks', value: c.rageClicks?.toLocaleString() ?? '—', sub: `${c.deadClicks?.toLocaleString() ?? 0} dead clicks` },
                    { icon: Zap, label: 'Engagement', value: (() => { const s = c.engagementTimeSec ?? 0; return s >= 60 ? `${Math.floor(s/60)}m ${s%60}s` : `${s}s`; })(), sub: `${c.quickbackClicks ?? 0} quickbacks` },
                  ].map((kpi, i) => (
                    <div key={i} className="bg-muted rounded-lg p-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">{kpi.label}</span>
                        <kpi.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{kpi.value}</div>
                      <div className="text-xs text-muted-foreground">{kpi.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Device breakdown + quick links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Device breakdown */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Sessions by Device</p>
                    {(c.byDevice ?? []).slice(0, 4).map((d: any, i: number) => {
                      const total = (c.byDevice ?? []).reduce((acc: number, x: any) => acc + x.sessions, 0);
                      const pct = total > 0 ? Math.round((d.sessions / total) * 100) : 0;
                      return (
                        <div key={i} className="space-y-0.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 text-foreground">{deviceIcon(d.device)}{d.device}</span>
                            <span className="text-muted-foreground">{d.sessions.toLocaleString()} ({pct}%)</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-[#0078D4]" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                    {(c.byDevice ?? []).length === 0 && <p className="text-xs text-muted-foreground">No device data yet</p>}
                  </div>

                  {/* Quick-access tiles */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Deep Dive</p>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { label: 'Heatmaps', desc: 'Click & scroll maps', path: 'heatmaps' },
                        { label: 'Session Recordings', desc: 'Watch real visitor sessions', path: 'recordings' },
                        { label: 'Insights', desc: 'Friction & behavior analysis', path: 'insights' },
                      ].map(tile => (
                        <a
                          key={tile.path}
                          href={`https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/${tile.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between bg-muted hover:bg-muted/70 rounded-lg px-4 py-2.5 transition-colors border border-border hover:border-primary/40"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">{tile.label}</p>
                            <p className="text-xs text-muted-foreground">{tile.desc}</p>
                          </div>
                          <ExternalLink className="h-3.5 w-3.5 text-primary shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

      </div>
    </DashboardLayout>
  );
}
