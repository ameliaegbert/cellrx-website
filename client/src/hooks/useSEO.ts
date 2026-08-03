/**
 * Client-side SEO management.
 * The server now sends matching metadata and crawlable fallback content. This hook
 * keeps metadata correct during client-side navigation after the application loads.
 */

import { useEffect } from "react";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  toAbsoluteUrl,
  type SEOProps,
} from "@shared/seo";

export { PAGE_SEO, getBlogPostSEO } from "@shared/seo";
export type { SEOProps } from "@shared/seo";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(name: string, attr: "name" | "property" = "name") {
  document.querySelector(`meta[${attr}="${name}"]`)?.remove();
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
    const fullTitle = title.includes("CellRX") ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = toAbsoluteUrl(canonical ?? window.location.pathname);
    const ogImageUrl = toAbsoluteUrl(ogImage);

    document.title = fullTitle;
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    else removeMeta("keywords");
    setCanonical(canonicalUrl);

    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", ogImageUrl, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:site_name", SITE_NAME, "property");

    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImageUrl);
    setMeta("twitter:card", "summary_large_image");
  }, [title, description, canonical, ogImage, ogType, keywords]);
}

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

export interface FAQItem {
  question: string;
  answer: string;
}

export function useFAQSchema(faqs: FAQItem[], pageId: string) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}${window.location.pathname}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
    const id = `faq-schema-${pageId}`;
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
  }, [faqs, pageId]);
}

export interface MedicalProcedureData {
  name: string;
  description: string;
  bodyLocation?: string;
  preparation?: string;
  followup?: string;
  howPerformed?: string;
  procedureType?: string;
}

export function useMedicalProcedureSchema(procedures: MedicalProcedureData[], pageId: string) {
  useEffect(() => {
    const schemas = procedures.map((procedure) => ({
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      name: procedure.name,
      description: procedure.description,
      ...(procedure.bodyLocation ? { bodyLocation: procedure.bodyLocation } : {}),
      ...(procedure.preparation ? { preparation: procedure.preparation } : {}),
      ...(procedure.followup ? { followup: procedure.followup } : {}),
      ...(procedure.howPerformed ? { howPerformed: procedure.howPerformed } : {}),
      ...(procedure.procedureType ? { procedureType: procedure.procedureType } : {}),
      performedBy: {
        "@type": "Physician",
        name: "Dr. Jacob Egbert",
        worksFor: { "@id": `${SITE_URL}/#organization` },
      },
      provider: { "@id": `${SITE_URL}/#organization` },
    }));
    const id = `medical-procedure-schema-${pageId}`;
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [procedures, pageId]);
}

export function useNoIndex() {
  useEffect(() => {
    setMeta("robots", "noindex, nofollow");
    return () => {
      setMeta(
        "robots",
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      );
    };
  }, []);
}

