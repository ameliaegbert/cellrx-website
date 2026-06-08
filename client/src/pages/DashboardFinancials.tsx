/*
 * CellRX — Financials Dashboard
 * Private page: Revenue & Invoices from GHL
 * Accessible only at /dashboard/financials — not linked from public site
 * Marked noindex to prevent search engine indexing
 */

import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { DollarSign, RefreshCw, ExternalLink, Lock } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNoIndex } from "@/hooks/useSEO";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardFinancials() {
  useNoIndex(); // Prevent search engines from indexing this private page

  const { user, loading } = useAuth();
  const canAccess = !loading && (user?.role === 'admin' || user?.role === 'owner');

  const revenueQ = trpc.dashboard.revenue.useQuery(undefined, {
    refetchInterval: 10 * 60 * 1000,
    enabled: canAccess,
  });
  const [revPeriod, setRevPeriod] = useState<'30d' | '60d' | '90d' | 'ytd' | 'lifetime'>('30d');

  const rev = revenueQ.data;
  const lastUpdated = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Block employees and unauthenticated users from accessing this page directly
  if (!loading && !canAccess) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div className="flex flex-col items-center gap-3 text-center max-w-sm">
            <div className="h-14 w-14 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Lock className="h-7 w-7 text-amber-400" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight">Access Restricted</h2>
            <p className="text-sm text-muted-foreground">
              The Financials dashboard is only accessible to <strong>Owner</strong> and <strong>Admin</strong> accounts.
              Contact your administrator if you believe this is an error.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-12">

        {/* ── Header ── */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="flex items-center gap-2">
              <h1
                className="text-2xl font-bold text-foreground tracking-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
              >
                FINANCIALS
              </h1>
              <span className="flex items-center gap-1 text-[10px] font-semibold bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded-full">
                <Lock className="h-2.5 w-2.5" />
                PRIVATE
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Revenue · Invoices · Payment Transactions — Live from GHL
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className={`h-3 w-3 ${revenueQ.isLoading ? "animate-spin" : ""}`} />
            <span>Updated {lastUpdated}</span>
          </div>
        </div>

        {/* ── Privacy notice ── */}
        <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
          <Lock className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-400">Private Page</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              This page is not linked from the main dashboard and is not visible in public meetings. Only accessible via direct URL to authenticated users.
            </p>
          </div>
        </div>

        {/* ── Revenue & Invoices Panel ── */}
        <div className="bg-card border border-border rounded-lg p-6">
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

              {/* Invoice status breakdown */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/40 rounded-lg p-4 text-center">
                  <p className="text-xl font-bold text-green-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {rev?.paidInvoices ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Paid Invoices</p>
                </div>
                <div className="bg-muted/40 rounded-lg p-4 text-center">
                  <p className="text-xl font-bold text-amber-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {rev?.sentInvoices ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Sent / Pending</p>
                </div>
                <div className="bg-muted/40 rounded-lg p-4 text-center">
                  <p className="text-xl font-bold text-red-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {rev?.overdueInvoices ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Overdue</p>
                </div>
              </div>

              {/* Recent transactions */}
              {rev?.recentTransactions && rev.recentTransactions.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Recent Payments</p>
                  <div className="space-y-2">
                    {rev.recentTransactions.slice(0, 15).map(t => (
                      <div key={t.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
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

        {/* ── GHL Deep Link ── */}
        <div className="flex items-center justify-end">
          <a
            href="https://app.gohighlevel.com/v2/location/nANRD9sxSutEDIdeosHo/payments/invoices"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            Open full Invoices in GHL
          </a>
        </div>

      </div>
    </DashboardLayout>
  );
}
