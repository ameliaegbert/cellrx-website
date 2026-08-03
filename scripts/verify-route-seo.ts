import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getStaticExportPaths, toAbsoluteUrl } from "../shared/seo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../dist/public");

function assertIncludes(actual: string, expected: string, label: string) {
  if (!actual.includes(expected)) {
    throw new Error(`${label}: expected output to include ${expected}`);
  }
}

function artifactPathFor(pathname: string): string {
  if (pathname === "/") return path.join(publicDir, "index.html");
  return path.join(publicDir, pathname.replace(/^\//, ""), "index.html");
}

const routes = getStaticExportPaths();
if (routes.length === 0) throw new Error("No static SEO routes were supplied.");

for (const pathname of routes) {
  const artifactPath = artifactPathFor(pathname);
  if (!fs.existsSync(artifactPath)) {
    throw new Error(`Missing static artifact for ${pathname}: ${artifactPath}`);
  }

  const html = fs.readFileSync(artifactPath, "utf8");
  const canonical = toAbsoluteUrl(pathname);
  assertIncludes(html, `<link rel="canonical" href="${canonical}" />`, `${pathname} canonical`);
  assertIncludes(html, 'data-seo-fallback="true"', `${pathname} crawlable fallback`);
  assertIncludes(html, '"MedicalClinic"', `${pathname} structured data`);
  assertIncludes(html, `<meta property="og:url" content="${canonical}" />`, `${pathname} Open Graph URL`);
}

const article = fs.readFileSync(
  artifactPathFor("/blog/first-cellrx-consultation"),
  "utf8",
);
assertIncludes(article, '<meta property="og:type" content="article" />', "Article Open Graph type");

const notFoundPath = path.join(publicDir, "404.html");
if (!fs.existsSync(notFoundPath)) throw new Error("Missing static 404.html.");
const notFound = fs.readFileSync(notFoundPath, "utf8");
assertIncludes(notFound, '<meta name="robots" content="noindex, nofollow" />', "404 noindex");
assertIncludes(notFound, 'data-seo-fallback="true"', "404 crawlable fallback");

const legacyTeamPath = path.join(publicDir, "team", "index.html");
if (!fs.existsSync(legacyTeamPath)) throw new Error("Missing legacy /team redirect document.");
const legacyTeam = fs.readFileSync(legacyTeamPath, "utf8");
assertIncludes(legacyTeam, 'http-equiv="refresh" content="0; url=/about"', "Legacy team redirect");
assertIncludes(legacyTeam, '<meta name="robots" content="noindex, follow" />', "Legacy team noindex");

console.log(`Static route SEO verification passed for ${routes.length} public routes.`);
