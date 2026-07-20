import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  resolveSEOPage,
  toAbsoluteUrl,
} from "../shared/seo";

const DEFAULT_ROBOTS =
  "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonForScript(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

function replaceMeta(
  html: string,
  selector: RegExp,
  replacement: string,
): string {
  return selector.test(html) ? html.replace(selector, replacement) : html;
}

function buildSchema(canonicalUrl: string, title: string, description: string) {
  const organizationId = `${SITE_URL}/#organization`;
  const physicianId = `${SITE_URL}/#physician`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": organizationId,
        name: SITE_NAME,
        alternateName: "CellRX",
        url: SITE_URL,
        logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/logo_white_rx_blue_4d9c1e4e.png",
        image: DEFAULT_OG_IMAGE,
        telephone: "+1-385-707-2373",
        email: "info@cellrx.bio",
        address: {
          "@type": "PostalAddress",
          streetAddress: "3098 Executive Parkway, Suite 100",
          addressLocality: "Lehi",
          addressRegion: "UT",
          postalCode: "84043",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 40.3916,
          longitude: -111.8508,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
          },
        ],
        sameAs: [
          "https://www.youtube.com/@CellRxbio",
          "https://www.tiktok.com/@cellrx.bio",
          "https://www.instagram.com/cellrx.bio/",
          "https://www.facebook.com/p/CellRx-61582063796150/",
          "https://www.linkedin.com/company/113543963/",
        ],
      },
      {
        "@type": "Physician",
        "@id": physicianId,
        name: "Dr. Jacob Egbert",
        jobTitle: "Medical Director",
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": organizationId },
      },
    ],
  };
}

function buildFallbackMarkup(
  canonicalUrl: string,
  heading: string,
  summary: string,
  isNotFound: boolean,
): string {
  const nav = [
    ["About", "/about"],
    ["Services", "/services"],
    ["Concierge Medicine", "/black-label"],
    ["Patient Education", "/blog"],
    ["Contact", "/contact"],
  ]
    .map(([label, href]) => `<a href="${href}">${label}</a>`)
    .join("<span aria-hidden=\"true\"> · </span>");

  const nextStep = isNotFound
    ? "Please return to the CellRX homepage or contact the clinic for assistance."
    : "For information specific to your circumstances, discuss potential benefits, risks, alternatives, and eligibility with a qualified healthcare professional.";

  return `<div id="root"><main data-seo-fallback="true" aria-label="CellRX page content" style="max-width:960px;margin:0 auto;padding:2.5rem 1.25rem;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.65;color:#f6f5ec;background:#051229;min-height:100vh"><header><p style="margin:0 0 .5rem;color:#fbb217;font-size:.875rem;letter-spacing:.08em;text-transform:uppercase">CellRX Regenerative Medicine · Lehi, Utah</p><p style="margin:0 0 1.5rem">${nav}</p></header><section><h1 style="font-size:clamp(2rem,5vw,3.5rem);line-height:1.05;margin:0 0 1rem">${escapeHtml(heading)}</h1><p style="font-size:1.125rem;margin:0 0 1rem">${escapeHtml(summary)}</p><p style="margin:0 0 1.5rem">${escapeHtml(nextStep)}</p><p><a href="/contact" style="display:inline-block;padding:.75rem 1rem;border-radius:.4rem;background:#fbb217;color:#051229;font-weight:700;text-decoration:none">Request a Private Consultation</a></p></section><footer style="margin-top:3rem;padding-top:1.25rem;border-top:1px solid rgba(246,245,236,.25)"><p>3098 Executive Parkway, Suite 100, Lehi, UT 84043 · <a href="tel:3857072373">385-707-2373</a> · <a href="mailto:info@cellrx.bio">info@cellrx.bio</a></p><p><a href="/fda-disclaimer">FDA Disclaimer</a> · <a href="/privacy">Privacy Policy</a> · <a href="${escapeHtml(canonicalUrl)}">Canonical URL</a></p></footer></main></div>`;
}

/**
 * Uses one source of truth for crawlable metadata and non-JavaScript fallback
 * content. The React application replaces the fallback after it loads.
 */
export function renderRouteAwareHtml(template: string, pathname: string): {
  html: string;
  status: number;
} {
  const { page, found } = resolveSEOPage(pathname);
  const canonicalUrl = toAbsoluteUrl(page.canonical ?? pathname);
  const title = page.title.includes("CellRX") ? page.title : `${page.title} | ${SITE_NAME}`;
  const ogImage = toAbsoluteUrl(page.ogImage ?? DEFAULT_OG_IMAGE);
  const robots = page.noindex ? "noindex, nofollow" : DEFAULT_ROBOTS;
  const schema = jsonForScript(buildSchema(canonicalUrl, title, page.description));

  let html = template;
  html = replaceMeta(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = replaceMeta(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/i,
    page.keywords
      ? `<meta name="keywords" content="${escapeHtml(page.keywords)}" />`
      : "",
  );
  html = replaceMeta(
    html,
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/i,
    `<meta name="robots" content="${robots}" />`,
  );
  html = replaceMeta(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:type" content="${page.ogType ?? "website"}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,
  );
  html = replaceMeta(
    html,
    /<script\s+id="route-schema"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="route-schema" type="application/ld+json">${schema}</script>`,
  );
  html = html.replace(
    /<div\s+id="root"><\/div>/i,
    buildFallbackMarkup(canonicalUrl, page.heading, page.summary, !found),
  );

  return { html, status: found ? 200 : 404 };
}
