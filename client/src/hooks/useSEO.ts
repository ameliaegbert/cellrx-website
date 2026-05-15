/**
 * useSEO — Dynamic per-page SEO meta tag management
 * Updates document.title, meta description, canonical URL, and Open Graph tags
 * on every page navigation in the React SPA.
 */

import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  keywords?: string;
}

const DEFAULT_OG_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/physician_portrait_d5fe25e9.webp";

const SITE_NAME = "CellRX";
const BASE_URL = "https://www.cellrx.bio";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  keywords,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : `${BASE_URL}${window.location.pathname}`;

    // Primary
    document.title = fullTitle;
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setCanonical(canonicalUrl);

    // Open Graph
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", ogImage, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:site_name", SITE_NAME, "property");

    // Twitter
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
    setMeta("twitter:card", "summary_large_image");
  }, [title, description, canonical, ogImage, ogType, keywords]);
}

// ─── Breadcrumb structured data hook ─────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function useBreadcrumb(items: BreadcrumbItem[]) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
    const id = "breadcrumb-schema";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [items]);
}

// ─── noindex hook (for admin/internal pages) ──────────────────────────────────
export function useNoIndex() {
  useEffect(() => {
    setMeta("robots", "noindex, nofollow");
    return () => {
      setMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    };
  }, []);
}

// ─── Per-page SEO configs ──────────────────────────────────────────────────

export const PAGE_SEO = {
  home: {
    title: "Concierge Stem Cell Therapy & Regenerative Medicine — Lehi, Utah",
    description:
      "CellRX offers physician-directed stem cell injections and IV therapy in Lehi, Utah. Full chain-of-custody biologics — never diluted, never replicated. Starting at $2,500.",
    canonical: "/",
    keywords:
      "stem cell therapy Utah, stem cell injections Lehi, regenerative medicine Utah, CellRX, Dr. Jacob Egbert",
  },
  about: {
    title: "About CellRX — Dr. Jacob Egbert & Our Medical Team",
    description:
      "Meet Dr. Jacob Egbert, Medical Director of CellRX and the stem cell source company. Learn how our dual-director model ensures unmatched chain-of-custody and patient outcomes.",
    canonical: "/about",
    keywords:
      "Dr. Jacob Egbert, CellRX medical director, stem cell clinic Utah, regenerative medicine physician",
  },
  services: {
    title: "Stem Cell Injection & IV Therapy Services — CellRX",
    description:
      "Explore CellRX's regenerative treatment menu: stem cell injections starting at $2,500 and IV therapy starting at $4,000. Protocols priced at $1,250 per CC.",
    canonical: "/services",
    keywords:
      "stem cell injection cost Utah, stem cell IV therapy, regenerative medicine treatments, stem cell therapy price",
  },
  blackLabel: {
    title: "Black Label Concierge Medicine — CellRX Exclusive Membership",
    description:
      "CellRX Black Label is an exclusive annual health partnership with quarterly labs, personalized longevity protocols, direct physician access, and priority scheduling. Membership is limited.",
    canonical: "/black-label",
    keywords:
      "concierge medicine Utah, longevity membership, Black Label health program, personalized medicine Utah",
  },
  contact: {
    title: "Book a Private Consultation — CellRX Regenerative Medicine",
    description:
      "Schedule your complimentary consultation with Dr. Jacob Egbert at CellRX in Lehi, Utah. Call 385-707-2373 or book online. Same-day response guaranteed.",
    canonical: "/contact",
    keywords: "book stem cell consultation Utah, CellRX contact, regenerative medicine appointment Lehi",
  },
  blog: {
    title: "Stem Cell Therapy & Longevity Research — CellRX Blog",
    description:
      "Expert articles on stem cell therapy, regenerative medicine, longevity protocols, and health optimization from the physicians at CellRX.",
    canonical: "/blog",
    keywords:
      "stem cell therapy blog, regenerative medicine articles, longevity research, health optimization Utah",
  },
  testimonials: {
    title: "Patient Testimonials & Outcomes — CellRX Regenerative Medicine",
    description:
      "Real patient stories from CellRX — stem cell therapy outcomes for joint pain, energy, cognitive clarity, and systemic regeneration. Read what our patients say.",
    canonical: "/testimonials",
    keywords:
      "stem cell therapy reviews Utah, CellRX patient testimonials, regenerative medicine outcomes, stem cell results",
  },
  healthOptimization: {
    title: "Health Optimization Programs — CellRX Concierge Medicine",
    description:
      "CellRX health optimization combines advanced biomarker testing, personalized protocols, and physician-directed interventions to help you perform at your biological peak.",
    canonical: "/health-optimization",
    keywords:
      "health optimization Utah, biomarker testing, functional medicine Utah, personalized health protocols",
  },
  longevityPrograms: {
    title: "Longevity Programs — Science-Backed Anti-Aging at CellRX",
    description:
      "CellRX longevity programs combine regenerative biologics, precision nutrition, hormone optimization, and advanced diagnostics to extend your healthspan.",
    canonical: "/longevity-programs",
    keywords:
      "longevity medicine Utah, anti-aging programs, healthspan optimization, longevity clinic Utah",
  },
  sitemap: {
    title: "Site Map — CellRX Regenerative Medicine",
    description: "A complete directory of all pages on the CellRX website.",
    canonical: "/sitemap",
  },
} as const;

// Blog post SEO
export function getBlogPostSEO(slug: string): SEOProps {
  const posts: Record<string, SEOProps> = {
    "stem-cell-therapy-utah-guide": {
      title: "Complete Guide to Stem Cell Therapy in Utah (2026)",
      description:
        "What to expect, how much it costs, and how to choose the right stem cell clinic in Utah. Expert guidance from CellRX Medical Director Dr. Jacob Egbert.",
      canonical: "/blog/stem-cell-therapy-utah-guide",
      ogType: "article",
      keywords: "stem cell therapy Utah guide, stem cell cost Utah, stem cell clinic Utah",
    },
    "stem-cell-chain-of-custody": {
      title: "Why Chain of Custody Matters in Stem Cell Therapy",
      description:
        "Most clinics can't tell you where their biologics came from. CellRX can — because our Medical Director oversees every step from source to syringe.",
      canonical: "/blog/stem-cell-chain-of-custody",
      ogType: "article",
      keywords: "stem cell chain of custody, biologic sourcing, stem cell safety, CellRX",
    },
    "iv-therapy-vs-injection-stem-cells": {
      title: "Stem Cell IV Therapy vs. Injection: Which Is Right for You?",
      description:
        "Comparing systemic IV delivery and targeted injection for stem cell therapy. Learn which protocol matches your health goals and condition.",
      canonical: "/blog/iv-therapy-vs-injection-stem-cells",
      ogType: "article",
      keywords: "stem cell IV therapy vs injection, systemic stem cell treatment, targeted stem cell therapy",
    },
    "concierge-medicine-longevity": {
      title: "Concierge Medicine and the Future of Longevity",
      description:
        "How personalized, physician-directed medicine is redefining preventive health and longevity — and why the standard of care is no longer enough.",
      canonical: "/blog/concierge-medicine-longevity",
      ogType: "article",
      keywords: "concierge medicine longevity, personalized medicine, preventive health Utah",
    },
    "stem-cell-therapy-joint-pain": {
      title: "Stem Cell Therapy for Joint Pain & Sports Injuries",
      description:
        "How regenerative biologics address the root cause of chronic joint pain, arthritis, and sports injuries — without surgery or long recovery times.",
      canonical: "/blog/stem-cell-therapy-joint-pain",
      ogType: "article",
      keywords: "stem cell therapy joint pain, stem cell arthritis treatment, regenerative medicine sports injury",
    },
    "what-to-expect-stem-cell-treatment": {
      title: "What to Expect During Your Stem Cell Treatment at CellRX",
      description:
        "A step-by-step guide to the CellRX treatment experience — from your first consultation through your procedure and recovery.",
      canonical: "/blog/what-to-expect-stem-cell-treatment",
      ogType: "article",
      keywords: "stem cell treatment process, what to expect stem cell therapy, CellRX consultation",
    },
    "biomarkers-longevity-optimization": {
      title: "Biomarkers, Longevity, and the Science of Optimization",
      description:
        "How advanced biomarker testing enables personalized longevity protocols — and why measuring is the first step to optimizing your biology.",
      canonical: "/blog/biomarkers-longevity-optimization",
      ogType: "article",
      keywords: "biomarkers longevity, health optimization testing, longevity science, personalized medicine",
    },
  };
  return (
    posts[slug] ?? {
      title: "CellRX Blog — Regenerative Medicine & Longevity",
      description:
        "Expert articles on stem cell therapy, regenerative medicine, and longevity from CellRX.",
      canonical: `/blog/${slug}`,
      ogType: "article",
    }
  );
}
