/**
 * Clinical Evidence Ledger: crawler-facing metadata must be specific, patient-first,
 * and consistent with each page's visible title, sources, and regulatory context.
 */
export type OpenGraphType = "website" | "article";

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: OpenGraphType;
  keywords?: string;
}

export interface ServerSEOPage extends SEOProps {
  heading: string;
  summary: string;
  noindex?: boolean;
}

export const SITE_URL = "https://cellrx.bio";
export const SITE_NAME = "CellRX Regenerative Medicine";
export const DEFAULT_OG_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/physician_portrait_d5fe25e9.webp";

const genericKeywords =
  "CellRX Regenerative Medicine, Lehi Utah, physician-directed consultation, regenerative medicine";

function page(
  canonical: string,
  title: string,
  description: string,
  heading: string,
  summary: string,
  keywords = genericKeywords,
  ogType: OpenGraphType = "website",
): ServerSEOPage {
  return { canonical, title, description, heading, summary, keywords, ogType };
}

/**
 * These are intentionally descriptive, not outcome promises. Clinical, safety,
 * efficacy, pricing, and regulatory statements belong in the approved content
 * workflow and should not be introduced through metadata alone.
 */
export const PAGE_SEO = {
  home: page(
    "/",
    "CellRX Regenerative Medicine | Lehi, Utah",
    "Learn about CellRX's private, physician-directed consultations and regenerative-medicine services in Lehi, Utah.",
    "CellRX Regenerative Medicine in Lehi, Utah",
    "CellRX offers private, physician-directed consultations for people seeking information about regenerative medicine, health optimization, and concierge care.",
  ),
  about: page(
    "/about/",
    "About CellRX Regenerative Medicine | Lehi, Utah",
    "Meet the CellRX team and learn about the clinic's approach to private, physician-directed consultations in Lehi, Utah.",
    "About CellRX Regenerative Medicine",
    "Learn about the people, location, and consultation approach behind CellRX Regenerative Medicine.",
  ),
  drEgbert: page(
    "/about/dr-egbert/",
    "Dr. Jacob Egbert | CellRX Regenerative Medicine",
    "Learn about Dr. Jacob Egbert and his role at CellRX Regenerative Medicine in Lehi, Utah.",
    "Dr. Jacob Egbert",
    "Read the CellRX physician profile and learn about the clinic's approach to patient consultations.",
  ),
  services: page(
    "/services/",
    "Regenerative Medicine Services | CellRX, Lehi, Utah",
    "Explore CellRX service options, the consultation process, and questions to discuss with a qualified clinician.",
    "Regenerative Medicine Services",
    "Explore CellRX service options and use a private consultation to discuss suitability, evidence, risks, alternatives, and next steps with a qualified clinician.",
  ),
  blackLabel: page(
    "/black-label/",
    "Black Label Concierge Medicine | CellRX",
    "Learn about CellRX's private concierge-care membership and its consultation-focused health-planning experience.",
    "Black Label Concierge Medicine",
    "CellRX Black Label is a private concierge-care membership designed around physician-led consultation and ongoing health-planning conversations.",
  ),
  contact: page(
    "/contact/",
    "Request a Private Consultation | CellRX, Lehi, Utah",
    "Contact CellRX Regenerative Medicine in Lehi, Utah to request a private consultation and learn what to expect before your visit.",
    "Request a Private Consultation",
    "Contact CellRX to request a private consultation, ask logistical questions, and learn what to expect before your visit.",
  ),
  blog: page(
    "/blog/",
    "Regenerative Medicine & Patient Education | CellRX",
    "Read CellRX's patient-education articles about regenerative medicine, health optimization, and preparing for a clinician conversation.",
    "Regenerative Medicine & Patient Education",
    "Read general educational articles from CellRX and discuss any personal health questions with a qualified healthcare professional.",
  ),
  testimonials: page(
    "/testimonials/",
    "Patient Experiences | CellRX Regenerative Medicine",
    "Read patient experiences shared with CellRX, together with important information about individual variability and results.",
    "Patient Experiences",
    "Individual patient experiences are personal and may not predict another person's experience or outcome.",
  ),
  healthOptimization: page(
    "/health-optimization/",
    "Health Optimization Programs | CellRX",
    "Learn about CellRX's health-optimization consultation options in Lehi, Utah.",
    "Health Optimization Programs",
    "Explore CellRX health-optimization consultation options and discuss your questions with a qualified clinician.",
  ),
  longevityPrograms: page(
    "/longevity-programs/",
    "Longevity Programs | CellRX",
    "Learn about CellRX's consultation-focused longevity programs in Lehi, Utah.",
    "Longevity Programs",
    "Explore CellRX longevity-program consultation options and discuss individual goals with a qualified clinician.",
  ),
  faq: page(
    "/faq/",
    "Frequently Asked Questions | CellRX Regenerative Medicine",
    "Find general questions about CellRX, private consultations, logistics, and patient education in Lehi, Utah.",
    "Frequently Asked Questions",
    "Review general information about CellRX and bring questions about your individual circumstances to a qualified clinician.",
  ),
  sitemap: page(
    "/sitemap/",
    "Site Map | CellRX Regenerative Medicine",
    "Browse the public pages and patient-education resources available on the CellRX website.",
    "CellRX Site Map",
    "Browse the public CellRX website and patient-education resources.",
  ),
  privacy: page(
    "/privacy/",
    "Privacy Policy | CellRX Regenerative Medicine",
    "Read the CellRX Regenerative Medicine privacy policy.",
    "Privacy Policy",
    "Read the CellRX privacy policy and contact the clinic with questions about how information is handled.",
  ),
  terms: page(
    "/terms/",
    "Terms of Service | CellRX Regenerative Medicine",
    "Read the CellRX Regenerative Medicine terms of service.",
    "Terms of Service",
    "Read the CellRX terms of service.",
  ),
  fdaDisclaimer: {
    ...page(
      "/fda-disclaimer/",
      "FDA Disclaimer | CellRX Regenerative Medicine",
      "Read CellRX's FDA disclaimer and information about discussing services with a qualified healthcare professional.",
      "FDA Disclaimer",
      "Review CellRX's FDA disclaimer and discuss any questions about services, evidence, risks, and regulatory status with a qualified healthcare professional.",
    ),
    noindex: true,
  },
} as const;

const BLOG_POSTS: Record<string, ServerSEOPage> = {
  "stem-cell-injection-joint-repair": page(
    "/blog/stem-cell-injection-joint-repair/",
    "Joint-Health Patient Education | CellRX",
    "Read CellRX's general patient-education article about discussing joint-health questions with a qualified clinician.",
    "Joint-Health Patient Education",
    "This article is for general information and does not replace individualized medical advice from a qualified clinician.",
    "joint health education, regenerative medicine education, CellRX",
    "article",
  ),
  "iv-stem-cell-therapy-science": page(
    "/blog/iv-stem-cell-therapy-science/",
    "IV Stem Cell Therapy: Biology, Evidence, and Patient Questions | CellRX",
    "Read a physician-reviewed overview of IV stem cell therapy, the current regulatory context, evidence limitations, and questions to discuss with a qualified clinician.",
    "IV Stem Cell Therapy: Biology, Evidence, and Patient Questions",
    "This patient-education guide explains what researchers are studying about IV administration, what remains uncertain, and what to ask before a consultation.",
    "IV stem cell therapy, stem cell evidence, regenerative medicine patient education, CellRX",
    "article",
  ),
  "top-performers-concierge-medicine": page(
    "/blog/top-performers-concierge-medicine/",
    "Concierge Medicine Education | CellRX",
    "Read CellRX's general patient-education article about concierge-care conversations and planning.",
    "Concierge Medicine Education",
    "This article is for general information and does not replace individualized medical advice from a qualified clinician.",
    "concierge medicine education, CellRX",
    "article",
  ),
  "first-cellrx-consultation": page(
    "/blog/first-cellrx-consultation/",
    "Preparing for a CellRX Consultation | CellRX",
    "Read CellRX's guide to preparing for a private consultation in Lehi, Utah.",
    "Preparing for a CellRX Consultation",
    "Learn how to prepare questions and logistical information for a private CellRX consultation.",
    "CellRX consultation, Lehi Utah, appointment preparation",
    "article",
  ),
  "chain-of-custody-stem-cells": page(
    "/blog/chain-of-custody-stem-cells/",
    "Stem Cell Chain of Custody: Sourcing Questions to Ask | CellRX",
    "Learn which sourcing, handling, documentation, safety, and regulatory questions to discuss with a qualified clinician before a regenerative-medicine consultation.",
    "Stem Cell Chain of Custody: Sourcing Questions to Ask",
    "This patient-education guide explains why product documentation matters and which questions can support an informed clinician conversation.",
    "stem cell chain of custody, biologic sourcing questions, regenerative medicine patient education, CellRX",
    "article",
  ),
  "quarterly-labs-longevity": page(
    "/blog/quarterly-labs-longevity/",
    "Health-Planning Education | CellRX",
    "Read CellRX's general patient-education article about health-planning conversations and laboratory questions.",
    "Health-Planning Education",
    "This article is for general information and does not replace individualized medical advice from a qualified clinician.",
    "health planning education, laboratory questions, CellRX",
    "article",
  ),
  "regenerative-medicine-athletes": page(
    "/blog/regenerative-medicine-athletes/",
    "Athlete Health Education | CellRX",
    "Read CellRX's general patient-education article about questions athletes can discuss with a qualified clinician.",
    "Athlete Health Education",
    "This article is for general information and does not replace individualized medical advice from a qualified clinician.",
    "athlete health education, regenerative medicine education, CellRX",
    "article",
  ),
};

export function normalizePathname(pathname: string): string {
  const withoutQuery = pathname.split("?")[0].split("#")[0] || "/";
  if (withoutQuery === "/") return "/";
  // Normalize multiple slashes but preserve a single trailing slash
  // (Cloudflare adds trailing slashes to all non-root URLs)
  const cleaned = withoutQuery.replace(/\/\/+/g, "/");
  return cleaned.endsWith("/") ? cleaned : cleaned + "/";
}

export function getBlogPostSEO(slug: string): SEOProps {
  const knownPost = BLOG_POSTS[slug];
  if (knownPost) return knownPost;

  return page(
    `/blog/${slug}/`,
    "CellRX Patient Education",
    "Read general patient-education information from CellRX Regenerative Medicine in Lehi, Utah.",
    "CellRX Patient Education",
    "This article is for general information and does not replace individualized medical advice from a qualified clinician.",
    "CellRX patient education, regenerative medicine education",
    "article",
  );
}

export function resolveSEOPage(pathname: string): {
  page: ServerSEOPage;
  found: boolean;
} {
  const normalized = normalizePathname(pathname);
  const routeEntries: Array<[string, ServerSEOPage]> = [
    ["/", PAGE_SEO.home],
    ["/about/", PAGE_SEO.about],
    ["/about/dr-egbert/", PAGE_SEO.drEgbert],
    ["/services/", PAGE_SEO.services],
    ["/black-label/", PAGE_SEO.blackLabel],
    ["/contact/", PAGE_SEO.contact],
    ["/blog/", PAGE_SEO.blog],
    ["/testimonials/", PAGE_SEO.testimonials],
    ["/health-optimization/", PAGE_SEO.healthOptimization],
    ["/longevity-programs/", PAGE_SEO.longevityPrograms],
    ["/sitemap/", PAGE_SEO.sitemap],
    ["/faq/", PAGE_SEO.faq],
    ["/privacy/", PAGE_SEO.privacy],
    ["/terms/", PAGE_SEO.terms],
    ["/fda-disclaimer/", PAGE_SEO.fdaDisclaimer],
  ];

  const exact = routeEntries.find(([route]) => route === normalized);
  if (exact) return { page: exact[1], found: true };

  if (normalized.startsWith("/blog/")) {
    // Strip the leading /blog/ and trailing slash to get the slug
    const slug = normalized.slice("/blog/".length).replace(/\/$/, "");
    if (slug) {
      const knownPost = BLOG_POSTS[slug];
      if (knownPost) return { page: knownPost, found: true };
    }
  }

  if (normalized.startsWith("/dashboard")) {
    return {
      page: {
        canonical: normalized,
        title: "CellRX Dashboard",
        description: "CellRX dashboard.",
        heading: "CellRX Dashboard",
        summary: "This area is not intended for search indexing.",
        noindex: true,
      },
      found: true,
    };
  }

  return {
    page: {
      canonical: normalized,
      title: "Page Not Found | CellRX Regenerative Medicine",
      description: "The requested CellRX page could not be found.",
      heading: "Page Not Found",
      summary: "The page you requested could not be found. Please return to the CellRX homepage or contact the clinic for assistance.",
      noindex: true,
    },
    found: false,
  };
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function getIndexablePaths(): string[] {
  return [
    "/",
    "/about",
    "/about/dr-egbert",
    "/services",
    "/black-label",
    "/health-optimization",
    "/longevity-programs",
    "/contact",
    "/testimonials",
    "/faq",
    "/blog",
    ...Object.values(BLOG_POSTS).map(post => post.canonical as string),
  ];
}

/**
 * Public route manifest for static hosts such as GitHub Pages. This includes
 * informational and legal pages that may be intentionally omitted from the
 * XML sitemap but still require correct direct-request metadata and fallback
 * content.
 */
export function getStaticExportPaths(): string[] {
  const paths = [
    ...Object.values(PAGE_SEO).map(page => page.canonical),
    ...Object.values(BLOG_POSTS).map(page => page.canonical),
  ].filter((pathname): pathname is string => Boolean(pathname));

  return Array.from(new Set(paths.map(normalizePathname)));
}
