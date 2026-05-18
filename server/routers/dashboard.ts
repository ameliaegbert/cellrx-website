/**
 * Dashboard tRPC Router
 * Provides KPI data for the executive dashboard:
 * - Pipeline metrics (leads by stage, conversion rates)
 * - Contact growth (new leads over time)
 * - Appointment metrics (booked, confirmed, no-shows)
 * - Nurture queue status (active sequences)
 * - Revenue placeholder (activates when invoices.readonly scope is added)
 */

import { adminProcedure, router } from "../_core/trpc";
import { callDataApi } from "../_core/dataApi";
import { ENV } from "../_core/env";
import { getDb } from "../db";
import { nurtureQueue, appointmentTracking } from "../../drizzle/schema";
import { gte, sql, and } from "drizzle-orm";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_HEADERS = {
  Authorization: `Bearer ${ENV.ghlApiKey}`,
  Version: "2021-07-28",
  "Content-Type": "application/json",
};

async function ghlGet(path: string) {
  const r = await fetch(`${GHL_BASE}${path}`, { headers: GHL_HEADERS });
  if (!r.ok) {
    const err = await r.text();
    throw new Error(`GHL API ${path} → ${r.status}: ${err}`);
  }
  return r.json();
}

// Stage name map for the Patient Pipeline (NBqu4y9ct8y8sPQZWcPr)
// Stage IDs verified live from GHL API on 2026-05-15
const STAGE_NAMES: Record<string, string> = {
  "4a0028de-ef0d-4381-9f43-401437202651": "New Lead",
  "73279642-0392-4278-9aee-3f23b8545a49": "Consultation Booked",
  "2e681210-c7d7-4ebb-82f0-b7c2c6fb2361": "Post-Consult Nurture",
  "43abb0ac-4a53-4a06-a3a4-afb9dfa36605": "Closed Won",
  "b06eed29-7db3-4da4-8374-1c01190b6b61": "Closed Lost",
  "cbf746c3-6f9c-48b0-9e36-e5b3ca22893c": "Purgatory",
  "7e458773-12c1-4068-8944-9a9cc07e44b0": "Applicant",
};

export const dashboardRouter = router({
  /**
   * Core KPI summary — the top-level numbers for the dashboard header cards
   */
  summary: adminProcedure.query(async () => {
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    // Fetch contacts (total + recent)
    const [contactsData, oppsData] = await Promise.all([
      ghlGet(`/contacts/?locationId=${ENV.ghlLocationId}&limit=1`),
      ghlGet(`/opportunities/search?location_id=${ENV.ghlLocationId}&limit=100`),
    ]);

    const totalContacts: number = contactsData?.meta?.total ?? 0;

    // Opportunities breakdown
    const opportunities: Array<{
      id: string;
      name: string;
      status: string;
      monetaryValue: number;
      pipelineStageId: string;
      dateAdded: string;
    }> = oppsData?.opportunities ?? [];

    const openOpps = opportunities.filter(o => o.status === "open");
    const wonOpps = opportunities.filter(o => o.status === "won");
    const lostOpps = opportunities.filter(o => o.status === "abandoned" || o.status === "lost");

    // New leads in last 30 days (by dateAdded)
    const newLeads30d = opportunities.filter(o => {
      const added = new Date(o.dateAdded).getTime();
      return added >= thirtyDaysAgo;
    }).length;

    const newLeads7d = opportunities.filter(o => {
      const added = new Date(o.dateAdded).getTime();
      return added >= sevenDaysAgo;
    }).length;

    // Pipeline value
    const totalPipelineValue = openOpps.reduce((sum, o) => sum + (o.monetaryValue || 0), 0);
    const wonValue = wonOpps.reduce((sum, o) => sum + (o.monetaryValue || 0), 0);

    // Conversion rate
    const totalClosed = wonOpps.length + lostOpps.length;
    const conversionRate = totalClosed > 0 ? Math.round((wonOpps.length / totalClosed) * 100) : 0;

    // Stage breakdown
    const stageBreakdown: Record<string, number> = {};
    openOpps.forEach(o => {
      const stageName = STAGE_NAMES[o.pipelineStageId] ?? "Unknown";
      stageBreakdown[stageName] = (stageBreakdown[stageName] || 0) + 1;
    });

    return {
      totalContacts,
      openOpportunities: openOpps.length,
      newLeads30d,
      newLeads7d,
      totalPipelineValue,
      wonValue,
      conversionRate,
      stageBreakdown,
    };
  }),

  /**
   * Lead trend — new opportunities per day for the last 30 days
   */
  leadTrend: adminProcedure.query(async () => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const data = await ghlGet(
      `/opportunities/search?location_id=${ENV.ghlLocationId}&limit=100`
    );

    const opportunities: Array<{ dateAdded: string; status: string }> =
      data?.opportunities ?? [];

    // Build daily counts for last 30 days
    const dailyCounts: Record<string, number> = {};
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      dailyCounts[key] = 0;
    }

    opportunities.forEach(o => {
      const added = new Date(o.dateAdded).getTime();
      if (added >= thirtyDaysAgo) {
        const key = new Date(o.dateAdded).toISOString().split("T")[0];
        if (key in dailyCounts) {
          dailyCounts[key]++;
        }
      }
    });

    return Object.entries(dailyCounts).map(([date, count]) => ({
      date,
      leads: count,
    }));
  }),

  /**
   * Appointment metrics — from the appointment_tracking table
   */
  appointments: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { total: 0, upcoming: 0, noShows: 0, remindersEnqueued: 0 };

    const now = new Date();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const thirtyDaysAgoMs = thirtyDaysAgo.getTime();
    const rows = await db
      .select()
      .from(appointmentTracking)
      .where(gte(appointmentTracking.scheduledAt, thirtyDaysAgoMs));

    const nowMs = now.getTime();
    const total = rows.length;
    const upcoming = rows.filter(r => r.scheduledAt > nowMs && r.status !== "cancelled").length;
    const noShows = rows.filter(r => r.status === "noshow").length;
    const remindersEnqueued = rows.filter(r => r.remindersEnqueued).length;

    return { total, upcoming, noShows, remindersEnqueued };
  }),

  /**
   * Nurture queue status — active SMS sequences in flight
   */
  nurtureStatus: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { activeSequences: 0, pendingMessages: 0, sentLast7d: 0 };

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const sevenDaysAgoMs = sevenDaysAgo.getTime();

    // pending = sentAt is null and failed is false
    const [pendingRows, recentRows] = await Promise.all([
      db
        .select({ count: sql<number>`count(*)` })
        .from(nurtureQueue)
        .where(sql`${nurtureQueue.sentAt} IS NULL AND ${nurtureQueue.failed} = 0`),
      db
        .select({ count: sql<number>`count(*)` })
        .from(nurtureQueue)
        .where(
          sql`${nurtureQueue.sentAt} IS NOT NULL AND ${nurtureQueue.sentAt} >= ${sevenDaysAgoMs}`
        ),
    ]);

    const pendingMessages = Number(pendingRows[0]?.count ?? 0);
    const sentLast7d = Number(recentRows[0]?.count ?? 0);

    // Count unique contacts with pending messages as "active sequences"
    const activeRows = await db
      .select({ ghlContactId: nurtureQueue.ghlContactId })
      .from(nurtureQueue)
      .where(sql`${nurtureQueue.sentAt} IS NULL AND ${nurtureQueue.failed} = 0`);

    const uniqueContacts = new Set(activeRows.map(r => r.ghlContactId)).size;

    return {
      activeSequences: uniqueContacts,
      pendingMessages,
      sentLast7d,
    };
  }),

  /**
   * Revenue & Invoices — live from GHL
   */
  revenue: adminProcedure.query(async () => {
    const loc = ENV.ghlLocationId;

    const [invoicesResp, paymentsResp] = await Promise.all([
      fetch(`${GHL_BASE}/invoices/?altId=${loc}&altType=location&limit=100&offset=0`, { headers: GHL_HEADERS }),
      fetch(`${GHL_BASE}/payments/transactions/?altId=${loc}&altType=location&limit=100`, { headers: GHL_HEADERS }),
    ]);

    if (!invoicesResp.ok) {
      const err = await invoicesResp.text();
      throw new Error(`GHL invoices API → ${invoicesResp.status}: ${err}`);
    }
    if (!paymentsResp.ok) {
      const err = await paymentsResp.text();
      throw new Error(`GHL payments API → ${paymentsResp.status}: ${err}`);
    }

    const [invoicesData, paymentsData] = await Promise.all([
      invoicesResp.json(),
      paymentsResp.json(),
    ]);

    const invoices: Array<{
      _id: string;
      status: string;
      total?: number;
      amountPaid?: number;
      amountDue?: number;
      currency?: string;
      invoiceNumber?: string;
      contactDetails?: { name?: string };
      issueDate?: string;
      dueDate?: string;
    }> = invoicesData?.invoices ?? [];

    const transactions: Array<{
      _id: string;
      amount: number;
      status: string;
      currency?: string;
      contactName?: string;
      entitySourceName?: string;
      createdAt?: string;
    }> = paymentsData?.data ?? [];

    // Invoice stats
    const totalInvoices = invoices.length;
    const paidInvoices = invoices.filter(i => i.status === 'paid').length;
    const sentInvoices = invoices.filter(i => i.status === 'sent').length;
    const overdueInvoices = invoices.filter(i => i.status === 'overdue').length;
    const totalRevenue = invoices
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + (i.amountPaid ?? i.total ?? 0), 0);
    const outstandingRevenue = invoices
      .filter(i => i.status === 'sent' || i.status === 'overdue')
      .reduce((sum, i) => sum + (i.amountDue ?? i.total ?? 0), 0);

    // Recent transactions (last 10)
    const recentTransactions = transactions
      .filter(t => t.status === 'succeeded')
      .slice(0, 10)
      .map(t => ({
        id: t._id,
        amount: t.amount / 100, // GHL stores in cents
        contactName: t.contactName ?? 'Unknown',
        description: t.entitySourceName ?? 'Payment',
        date: t.createdAt ?? '',
      }));

    // Time-segmented revenue from transactions
    const now = Date.now();
    const ms = (days: number) => days * 24 * 60 * 60 * 1000;
    const ytdStart = new Date(new Date().getFullYear(), 0, 1).getTime();

    const revenueInWindow = (from: number) =>
      transactions
        .filter(t => t.status === 'succeeded' && t.createdAt && new Date(t.createdAt).getTime() >= from)
        .reduce((sum, t) => sum + t.amount / 100, 0);

    const revenue30d  = revenueInWindow(now - ms(30));
    const revenue60d  = revenueInWindow(now - ms(60));
    const revenue90d  = revenueInWindow(now - ms(90));
    const revenueYTD  = revenueInWindow(ytdStart);
    // Lifetime = all paid invoices (most reliable for total collected)
    const revenueLifetime = totalRevenue;

    return {
      totalInvoices,
      paidInvoices,
      sentInvoices,
      overdueInvoices,
      totalRevenue,
      outstandingRevenue,
      revenue30d,
      revenue60d,
      revenue90d,
      revenueYTD,
      revenueLifetime,
      recentTransactions,
    };
  }),

  /**
   * Pipeline stage breakdown for the funnel chart
   */
  pipeline: adminProcedure.query(async () => {
    const data = await ghlGet(
      `/opportunities/search?location_id=${ENV.ghlLocationId}&limit=100`
    );

    const opportunities: Array<{
      status: string;
      monetaryValue: number;
      pipelineStageId: string;
      dateAdded: string;
    }> = data?.opportunities ?? [];

    const stages = [
      "New Lead",
      "Consultation Booked",
      "Post-Consult Nurture",
      "Closed Won",
      "Closed Lost",
      "Purgatory",
    ];

    const stageCounts: Record<string, { count: number; value: number }> = {};
    stages.forEach(s => { stageCounts[s] = { count: 0, value: 0 }; });

    opportunities.forEach(o => {
      const stageName = STAGE_NAMES[o.pipelineStageId] ?? "Unknown";
      if (stageName in stageCounts) {
        stageCounts[stageName].count++;
        stageCounts[stageName].value += o.monetaryValue || 0;
      }
    });

    return stages
      .filter(s => s in stageCounts)
      .map(s => ({
        stage: s,
        count: stageCounts[s].count,
        value: stageCounts[s].value,
      }));
  }),

  /**
   * Social stats — TikTok (page scrape) + YouTube (RSS feed) + Instagram (Meta Graph API)
   */
  socialStats: adminProcedure.query(async () => {
    const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

    // ── TikTok ──────────────────────────────────────────────────────────────
    let tiktok: {
      followers: number;
      likes: number;
      videos: number;
      bio: string;
      handle: string;
    } | null = null;

    try {
      const ttRes = await fetch('https://www.tiktok.com/@cellrx.bio', {
        headers: { 'User-Agent': UA, 'Accept': 'text/html', 'Accept-Language': 'en-US,en;q=0.9' },
      });
      if (ttRes.ok) {
        const html = await ttRes.text();
        const dataMatch = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([^<]+)<\/script>/);
        if (dataMatch) {
          const data = JSON.parse(dataMatch[1]);
          const userInfo = data.__DEFAULT_SCOPE__?.['webapp.user-detail']?.userInfo;
          if (userInfo) {
            tiktok = {
              followers: userInfo.stats?.followerCount ?? 0,
              likes: userInfo.stats?.heartCount ?? 0,
              videos: userInfo.stats?.videoCount ?? 0,
              bio: userInfo.user?.signature ?? '',
              handle: '@' + (userInfo.user?.uniqueId ?? 'cellrx.bio'),
            };
          }
        }
        // Fallback: regex extraction
        if (!tiktok) {
          const followers = html.match(/"followerCount":(\d+)/)?.[1];
          if (followers) {
            tiktok = {
              followers: parseInt(followers),
              likes: parseInt(html.match(/"heartCount":(\d+)/)?.[1] ?? '0'),
              videos: parseInt(html.match(/"videoCount":(\d+)/)?.[1] ?? '0'),
              bio: 'Utah\'s #1 Stem Cell Clinic',
              handle: '@cellrx.bio',
            };
          }
        }
      }
    } catch (_) {
      // TikTok scrape failed — return null
    }

    // ── YouTube (Data API + RSS) ────────────────────────────────────────────
    const YT_CHANNEL_ID = 'UCK0H7ZgSBUTeB-xpxiRixEw';
    let youtube: {
      channelName: string;
      subscribers: number;
      subscribersText: string;
      totalViews: number;
      videoCount: number;
      topVideos: Array<{ title: string; videoId: string; views: number; published: string; url: string }>;
    } | null = null;

    try {
      // Fetch channel stats via Manus Data API (subscribers, views, video count)
      const channelData = await callDataApi('Youtube/get_channel_details', {
        query: { id: 'https://www.youtube.com/@CellRxbio', hl: 'en' },
      }) as Record<string, unknown>;

      const stats = (channelData?.stats ?? {}) as Record<string, unknown>;
      const subscribers = typeof stats.subscribers === 'number' ? stats.subscribers : 0;
      const subscribersText = typeof stats.subscribersText === 'string' ? stats.subscribersText : `${subscribers} subscribers`;
      const totalViews = typeof stats.views === 'number' ? stats.views : 0;
      const videoCount = typeof stats.videos === 'number' ? stats.videos : 0;
      const channelName = typeof channelData?.title === 'string' ? channelData.title : 'CellRXbio';

      // Fetch top videos via RSS (free, no auth)
      const rssRes = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`);
      let topVideos: Array<{ title: string; videoId: string; views: number; published: string; url: string }> = [];
      if (rssRes.ok) {
        const xml = await rssRes.text();
        const entries = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g));
        topVideos = entries.slice(0, 15).map(e => ({
          title: e[1].match(/<title>([^<]+)<\/title>/)?.[1] ?? '',
          videoId: e[1].match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? '',
          views: parseInt(e[1].match(/views="(\d+)"/)?.[1] ?? '0'),
          published: e[1].match(/<published>([^<]+)<\/published>/)?.[1]?.split('T')[0] ?? '',
          url: `https://www.youtube.com/watch?v=${e[1].match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? ''}`,
        }));
        topVideos.sort((a, b) => b.views - a.views);
      }

      youtube = { channelName, subscribers, subscribersText, totalViews, videoCount, topVideos };
    } catch (_) {
      // YouTube fetch failed
    }

    // ── Instagram (Meta Graph API) ──────────────────────────────────────────
    const IG_ID = '17841476254543340';
    const META_TOKEN = ENV.metaAccessToken;
    let instagram: {
      username: string;
      followers: number;
      mediaCount: number;
      biography: string;
      website: string;
      profilePicture: string;
      reach30d: number;
      reachSeries: Array<{ date: string; value: number }>;
      profileViews30d: number;
      websiteClicks30d: number;
      topPosts: Array<{
        id: string;
        caption: string;
        mediaType: string;
        likeCount: number;
        commentsCount: number;
        timestamp: string;
        permalink: string;
      }>;
    } | null = null;

    if (META_TOKEN) {
      try {
        const META_BASE = 'https://graph.facebook.com/v19.0';
        const since30d = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);
        const until = Math.floor(Date.now() / 1000);

        // Fetch account info and top media in parallel
        // - media: fetch 25 items so we can filter to VIDEO/REEL only and pick true top 6
        // - insights: reach uses period=day; profile_views + website_clicks need metric_type=total_value separately
        const [accountRes, mediaRes, reachRes, profileViewsRes, websiteClicksRes] = await Promise.all([
          fetch(`${META_BASE}/${IG_ID}?fields=id,username,followers_count,media_count,biography,website,profile_picture_url&access_token=${META_TOKEN}`),
          fetch(`${META_BASE}/${IG_ID}/media?fields=id,caption,media_type,like_count,comments_count,timestamp,permalink&limit=25&access_token=${META_TOKEN}`),
          fetch(`${META_BASE}/${IG_ID}/insights?metric=reach&period=day&since=${since30d}&until=${until}&access_token=${META_TOKEN}`),
          fetch(`${META_BASE}/${IG_ID}/insights?metric=profile_views&period=day&metric_type=total_value&since=${since30d}&until=${until}&access_token=${META_TOKEN}`),
          fetch(`${META_BASE}/${IG_ID}/insights?metric=website_clicks&period=day&metric_type=total_value&since=${since30d}&until=${until}&access_token=${META_TOKEN}`),
        ]);

        if (!accountRes.ok) throw new Error(`IG account fetch failed: ${accountRes.status}`);
        if (!mediaRes.ok) throw new Error(`IG media fetch failed: ${mediaRes.status}`);

        const account = await accountRes.json() as Record<string, unknown>;
        const media = await mediaRes.json() as { data?: unknown[] };

        // Reach: sum daily values over 30 days and build series for sparkline
        let reach30d = 0;
        let reachSeries: Array<{ date: string; value: number }> = [];
        if (reachRes.ok) {
          const reachData = await reachRes.json() as { data?: Array<{ values?: Array<{ value: number; end_time: string }> }> };
          for (const metric of reachData.data ?? []) {
            for (const v of metric.values ?? []) {
              const val = Number(v.value ?? 0);
              reach30d += val;
              reachSeries.push({
                date: String(v.end_time ?? '').split('T')[0],
                value: val,
              });
            }
          }
          // Sort by date ascending
          reachSeries.sort((a, b) => a.date.localeCompare(b.date));
        }

        // Profile views: total_value over 30 days
        let profileViews30d = 0;
        if (profileViewsRes.ok) {
          const pvData = await profileViewsRes.json() as { data?: Array<{ total_value?: { value: number } }> };
          for (const metric of pvData.data ?? []) {
            profileViews30d += Number(metric.total_value?.value ?? 0);
          }
        }

        // Website clicks: total_value over 30 days
        let websiteClicks30d = 0;
        if (websiteClicksRes.ok) {
          const wcData = await websiteClicksRes.json() as { data?: Array<{ total_value?: { value: number } }> };
          for (const metric of wcData.data ?? []) {
            websiteClicks30d += Number(metric.total_value?.value ?? 0);
          }
        }

        // Filter to VIDEO/REEL only, sort by engagement, take top 6
        const rawPosts = (media.data ?? []) as Array<Record<string, unknown>>;
        const topPosts = rawPosts
          .filter(p => ['VIDEO', 'REEL'].includes(String(p.media_type ?? '')))
          .map(p => ({
            id: String(p.id ?? ''),
            caption: String(p.caption ?? '').slice(0, 120),
            mediaType: String(p.media_type ?? 'VIDEO'),
            likeCount: Number(p.like_count ?? 0),
            commentsCount: Number(p.comments_count ?? 0),
            timestamp: String(p.timestamp ?? '').split('T')[0],
            permalink: String(p.permalink ?? ''),
          }))
          .sort((a, b) => (b.likeCount + b.commentsCount) - (a.likeCount + a.commentsCount))
          .slice(0, 6);

        instagram = {
          username: String(account.username ?? 'cellrx.bio'),
          followers: Number(account.followers_count ?? 0),
          mediaCount: Number(account.media_count ?? 0),
          biography: String(account.biography ?? ''),
          website: String(account.website ?? 'https://cellrx.bio'),
          profilePicture: String(account.profile_picture_url ?? ''),
          reach30d,
          reachSeries,
          profileViews30d,
          websiteClicks30d,
          topPosts,
        };
      } catch (err) {
        console.error('[Instagram] fetch failed:', err);
        // Return null — panel will show a graceful error state
      }
    }

    return { tiktok, youtube, instagram };
  }),
});
