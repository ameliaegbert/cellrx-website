/**
 * Google API helper — shared JWT auth client for Search Console & Analytics
 * Uses the service account credentials stored in ENV.
 */
import { google } from "googleapis";
import { ENV } from "./_core/env";

/** Create a JWT auth client scoped to the given Google APIs */
export function getGoogleAuth(scopes: string[]) {
  const privateKey = ENV.googleServiceAccountPrivateKey.replace(/\\n/g, "\n");
  return new google.auth.JWT({
    email: ENV.googleServiceAccountEmail,
    key: privateKey,
    scopes,
  });
}

/** Search Console auth client — uses OAuth2 refresh token (service accounts can't be added as GSC users via UI) */
export function getSearchConsoleAuth() {
  const oauth2Client = new google.auth.OAuth2(
    ENV.googleOAuthClientId,
    ENV.googleOAuthClientSecret,
  );
  oauth2Client.setCredentials({
    refresh_token: ENV.googleOAuthRefreshToken,
  });
  return oauth2Client;
}

/** Analytics auth client */
export function getAnalyticsAuth() {
  return getGoogleAuth(["https://www.googleapis.com/auth/analytics.readonly"]);
}
// refreshed: 20260609222029
