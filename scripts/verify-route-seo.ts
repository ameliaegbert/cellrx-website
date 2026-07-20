import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderRouteAwareHtml } from "../server/seo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const template = fs.readFileSync(path.resolve(__dirname, "../client/index.html"), "utf-8");

function assertIncludes(actual: string, expected: string, label: string) {
  if (!actual.includes(expected)) {
    throw new Error(`${label}: expected output to include ${expected}`);
  }
}

const about = renderRouteAwareHtml(template, "/about");
if (about.status !== 200) throw new Error("About route should return HTTP 200");
assertIncludes(about.html, '<link rel="canonical" href="https://cellrx.bio/about" />', "About canonical");
assertIncludes(about.html, "About CellRX Regenerative Medicine", "About title");
assertIncludes(about.html, 'data-seo-fallback="true"', "Crawlable fallback");
assertIncludes(about.html, '"MedicalClinic"', "Structured data");

const blogPost = renderRouteAwareHtml(template, "/blog/first-cellrx-consultation");
if (blogPost.status !== 200) throw new Error("Known blog route should return HTTP 200");
assertIncludes(
  blogPost.html,
  '<link rel="canonical" href="https://cellrx.bio/blog/first-cellrx-consultation" />',
  "Blog canonical",
);
assertIncludes(blogPost.html, '<meta property="og:type" content="article" />', "Article Open Graph type");

const dashboard = renderRouteAwareHtml(template, "/dashboard");
assertIncludes(dashboard.html, '<meta name="robots" content="noindex, nofollow" />', "Dashboard noindex");

const missing = renderRouteAwareHtml(template, "/this-route-does-not-exist");
if (missing.status !== 404) throw new Error("Unknown route should return HTTP 404");
assertIncludes(missing.html, '<meta name="robots" content="noindex, nofollow" />', "Missing route noindex");

console.log("Route SEO verification passed.");
