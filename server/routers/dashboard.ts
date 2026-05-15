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

// Stage name map for the Patient Pipeline
const STAGE_NAMES: Record<string, string> = {
  "4a0028de-ef0d-4381-9f43-401437202651": "New Lead",
  "b2c3d4e5-f6a7-8901-bcde-f01234567890": "Consultation Booked",
  "c3d4e5f6-a7b8-9012-cdef-012345678901": "Post-Consult Nurture",
  "d4e5f6a7-b8c9-0123-def0-123456789012": "Closed Won",
  "e5f6a7b8-c9d0-1234-ef01-234567890123": "Closed Lost",
  "f6a7b8c9-d0e1-2345-f012-345678901234": "Purgatory",
  "a7b8c9d0-e1f2-3456-0123-456789012345": "Applicant",
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
});
