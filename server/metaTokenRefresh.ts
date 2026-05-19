/**
 * Meta Access Token Auto-Refresh
 *
 * Meta long-lived tokens last 60 days. This handler is called by a heartbeat
 * job every 45 days to exchange the current token for a fresh 60-day token
 * and persist it back to the META_ACCESS_TOKEN secret via the Forge API.
 *
 * Flow:
 *   1. Heartbeat fires → POST /api/scheduled/meta-token-refresh
 *   2. Handler calls Meta Graph API to exchange current token for new long-lived token
 *   3. Handler updates META_ACCESS_TOKEN secret via Forge API
 *   4. Returns { ok: true, expiresIn } so the platform logs success
 */

import { ENV } from "./_core/env";

const META_GRAPH_BASE = "https://graph.facebook.com/v19.0";

/**
 * Exchange the current META_ACCESS_TOKEN for a fresh long-lived token.
 * Returns the new token and its expiry in seconds.
 */
export async function refreshMetaToken(): Promise<{ accessToken: string; expiresIn: number }> {
  const currentToken = ENV.metaAccessToken;
  const appId = ENV.metaAppId;
  const appSecret = ENV.metaAppSecret;

  if (!currentToken || !appId || !appSecret) {
    throw new Error("META_ACCESS_TOKEN, META_APP_ID, or META_APP_SECRET not set");
  }

  const url = `${META_GRAPH_BASE}/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${currentToken}`;
  const res = await fetch(url);
  const data = await res.json() as any;

  if (!res.ok || data.error) {
    throw new Error(`Meta token exchange failed: ${JSON.stringify(data.error ?? data)}`);
  }

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in ?? 5183999, // ~60 days
  };
}

/**
 * Persist the new token back to the Forge secrets API so the running server
 * and future deployments both pick it up.
 */
async function updateForgeSecret(key: string, value: string): Promise<void> {
  const forgeUrl = ENV.forgeApiUrl;
  const forgeKey = ENV.forgeApiKey;
  const appId = ENV.appId;

  if (!forgeUrl || !forgeKey || !appId) {
    console.warn("[MetaRefresh] Forge API not configured — token refreshed but secret not persisted");
    return;
  }

  // Update the secret via the Forge built-in API
  const res = await fetch(`${forgeUrl}/v1/apps/${appId}/secrets`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${forgeKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, value }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.warn(`[MetaRefresh] Failed to persist secret to Forge: ${res.status} ${body}`);
    // Non-fatal — the in-memory ENV will still have the old token until next deploy
  } else {
    console.log(`[MetaRefresh] Secret ${key} updated successfully in Forge`);
  }
}

/**
 * Full refresh flow: exchange token + persist new token.
 * Called by the /api/scheduled/meta-token-refresh heartbeat handler.
 */
export async function runMetaTokenRefresh(): Promise<{ ok: boolean; expiresIn?: number; error?: string }> {
  try {
    const { accessToken, expiresIn } = await refreshMetaToken();

    // Update the in-process ENV so the running server uses the new token immediately
    process.env.META_ACCESS_TOKEN = accessToken;
    (ENV as any).metaAccessToken = accessToken;

    // Persist to Forge secrets for future deployments
    await updateForgeSecret("META_ACCESS_TOKEN", accessToken);

    const expiryDate = new Date(Date.now() + expiresIn * 1000).toISOString();
    console.log(`[MetaRefresh] Token refreshed successfully. New expiry: ${expiryDate}`);

    return { ok: true, expiresIn };
  } catch (err) {
    console.error("[MetaRefresh] Token refresh failed:", err);
    return { ok: false, error: String(err) };
  }
}
