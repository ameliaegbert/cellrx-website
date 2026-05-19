/*
 * CellRX Sitemap Page
 * Human-readable sitemap for users and search engines
 * Brand Colors: #051229 Navy | #0047BB Blue | #FBB217 Amber | #F6F5EC Cream
 */

import { Link } from "wouter";
import { useSEO, PAGE_SEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", href: "/", desc: "CellRX concierge regenerative medicine overview" },
      { label: "About Us", href: "/about", desc: "Our story, mission, and medical team" },
      { label: "Our Team", href: "/team", desc: "Meet Dr. Jacob Egbert and the CellRX team" },
      { label: "Contact", href: "/contact", desc: "Book a consultation or reach our team" },
      { label: "Patient Testimonials", href: "/testimonials", desc: "Real patient outcomes and stories" },
      { label: "FAQ", href: "/faq", desc: "Answers to common questions about stem cell therapy, pricing, safety, and more" },
    ],
  },
  {
    title: "Treatments & Services",
    links: [
      { label: "All Services", href: "/services", desc: "Stem cell injection, IV therapy, and regenerative protocols" },
      { label: "Stem Cell Injection Therapy", href: "/services", desc: "Targeted joint and tissue repair starting at $2,500" },
      { label: "Stem Cell IV Therapy", href: "/services", desc: "Systemic regeneration and optimization starting at $4,000" },
      { label: "Black Label Concierge Medicine", href: "/black-label", desc: "Our most exclusive health partnership program" },
      { label: "Health Optimization", href: "/health-optimization", desc: "Comprehensive biomarker-driven health optimization" },
      { label: "Longevity Programs", href: "/longevity-programs", desc: "Science-backed longevity and anti-aging protocols" },
    ],
  },
  {
    title: "Blog & Research",
    links: [
      { label: "Blog Index", href: "/blog", desc: "All articles on stem cell therapy and regenerative medicine" },
      { label: "How Stem Cell Injection Therapy Is Changing Joint Repair", href: "/blog/stem-cell-injection-joint-repair", desc: "The science behind targeted regenerative biologics for joints" },
      { label: "The Science Behind IV Stem Cell Therapy", href: "/blog/iv-stem-cell-therapy-science", desc: "How systemic delivery unlocks whole-body regeneration" },
      { label: "Why Top Performers Choose Concierge Medicine", href: "/blog/top-performers-concierge-medicine", desc: "The case for personalized, proactive healthcare" },
      { label: "What to Expect at Your First CellRX Consultation", href: "/blog/first-cellrx-consultation", desc: "A step-by-step guide to your first visit" },
      { label: "Why Chain of Custody Matters in Stem Cell Therapy", href: "/blog/chain-of-custody-stem-cells", desc: "The critical difference in biologic sourcing and safety" },
      { label: "Quarterly Lab Work and the Future of Longevity", href: "/blog/quarterly-labs-longevity", desc: "Using biomarker data to build a personalized longevity protocol" },
      { label: "Regenerative Medicine for Athletes and High Performers", href: "/blog/regenerative-medicine-athletes", desc: "How stem cell therapy accelerates recovery and extends careers" },
    ],
  },
];

export default function Sitemap() {
  useSEO(PAGE_SEO.sitemap);
  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 bg-[#030d1e] border-b border-white/5">
        <div className="container">
          <p className="section-label mb-4">Navigation</p>
          <h1
            className="text-[#F6F5EC] mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)" }}
          >
            SITE MAP
          </h1>
          <p className="text-[#D6D7D9]/70 text-base max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            A complete directory of every page on the CellRX website.
          </p>
        </div>
      </section>

      {/* Sitemap sections */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {sections.map((section) => (
              <div key={section.title}>
                <h2
                  className="text-[#FBB217] text-xs font-semibold tracking-widest uppercase mb-6 pb-3 border-b border-white/10"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {section.title}
                </h2>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-start gap-3 hover:text-[#FBB217] transition-colors"
                      >
                        <ArrowRight
                          size={14}
                          className="text-[#6DB3F2] mt-1 shrink-0 group-hover:text-[#FBB217] transition-colors"
                        />
                        <div>
                          <p
                            className="text-[#F6F5EC] text-sm font-medium group-hover:text-[#FBB217] transition-colors"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {link.label}
                          </p>
                          <p
                            className="text-[#D6D7D9]/50 text-xs mt-0.5 leading-relaxed"
                            style={{ fontFamily: "'Libre Franklin', sans-serif" }}
                          >
                            {link.desc}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
