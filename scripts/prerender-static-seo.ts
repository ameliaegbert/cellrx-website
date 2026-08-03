import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderRouteAwareHtml } from "../server/seo";
import { getStaticExportPaths } from "../shared/seo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "dist", "public");
const templatePath = path.join(publicDir, "index.html");

if (!fs.existsSync(templatePath)) {
  throw new Error(
    `Static export requires ${templatePath}. Run the Vite build before this script.`,
  );
}

const template = fs.readFileSync(templatePath, "utf8");
const routes = getStaticExportPaths();

function outputPathFor(pathname: string): string {
  if (pathname === "/") return templatePath;
  return path.join(publicDir, pathname.replace(/^\//, ""), "index.html");
}

for (const pathname of routes) {
  const rendered = renderRouteAwareHtml(template, pathname);
  if (rendered.status !== 200) {
    throw new Error(`Static export rejected ${pathname} with status ${rendered.status}.`);
  }

  const outputPath = outputPathFor(pathname);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, rendered.html, "utf8");
}

const notFound = renderRouteAwareHtml(template, "/page-not-found");
if (notFound.status !== 404) {
  throw new Error("Expected the static 404 document to have status 404.");
}
fs.writeFileSync(path.join(publicDir, "404.html"), notFound.html, "utf8");

// GitHub Pages cannot emit server-side redirects. Preserve the legacy team URL
// without creating a duplicate indexable page.
const legacyTeamHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=/about" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="https://cellrx.bio/about" />
    <title>About CellRX Regenerative Medicine</title>
  </head>
  <body>
    <p>This page has moved to <a href="/about">About CellRX Regenerative Medicine</a>.</p>
  </body>
</html>
`;
const legacyTeamPath = path.join(publicDir, "team", "index.html");
fs.mkdirSync(path.dirname(legacyTeamPath), { recursive: true });
fs.writeFileSync(legacyTeamPath, legacyTeamHtml, "utf8");

console.log(`Static SEO export completed for ${routes.length} public routes plus 404 and legacy /team redirect.`);
