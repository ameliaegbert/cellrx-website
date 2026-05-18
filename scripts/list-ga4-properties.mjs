/**
 * Lists all GA4 properties accessible to the service account.
 * Run: node scripts/list-ga4-properties.mjs
 */
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "googleapis";
import "dotenv/config";

const EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const RAW_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

if (!EMAIL || !RAW_KEY) {
  console.error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");
  process.exit(1);
}

const privateKey = RAW_KEY.replace(/\\n/g, "\n");

// Use the Admin API to list accessible properties
const auth = new google.auth.JWT({
  email: EMAIL,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
});

const analyticsAdmin = google.analyticsadmin({ version: "v1beta", auth });

try {
  const res = await analyticsAdmin.properties.list({
    filter: "parent:accounts/-",
    pageSize: 50,
  });
  
  const props = res.data.properties ?? [];
  if (props.length === 0) {
    console.log("No properties found. Make sure the service account has been added as a Viewer in GA4.");
    console.log("Service account email:", EMAIL);
  } else {
    console.log(`Found ${props.length} GA4 properties:\n`);
    props.forEach(p => {
      const numericId = p.name?.replace("properties/", "");
      console.log(`  Property ID: ${numericId}`);
      console.log(`  Display Name: ${p.displayName}`);
      console.log(`  Measurement ID: (check GA4 Admin > Data Streams)`);
      console.log();
    });
  }
} catch (err) {
  console.error("Error listing properties:", err.message);
  if (err.message?.includes("permission")) {
    console.log("\nThe service account needs to be added as a Viewer in GA4:");
    console.log("GA4 Admin → Property Access Management → Add users");
    console.log("Email:", EMAIL);
  }
}
