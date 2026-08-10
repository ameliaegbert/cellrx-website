/*
 * CellRX Blog Page — Editorial Dark Luxury
 * Educational content, research articles, longevity insights
 * Article cards now link to /blog/:slug for full individual post pages
 */

import { useEffect } from "react";
import { useSEO, PAGE_SEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

const INJECTION_IMG = "/manus-storage/service_injection_opt_c744419a_a1cec12d.webp";
const IV_IMG = "/manus-storage/service_iv_opt_42742b15_4d88b573.webp";
const CLINIC_IMG = "/manus-storage/clinic_interior_opt_d513ed06_f900112b.webp";
const PHYSICIAN_IMG = "/manus-storage/clinic_interior_opt_d513ed06_f900112b.webp";
const BG_DARK_IMG = "/manus-storage/background_dark_opt_b4ede28a_fed4916f.webp";

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up, .fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const articles = [
  {
    img: INJECTION_IMG,
    category: "Stem Cell Injection",
    slug: "stem-cell-injection-joint-repair",
    title: "How Stem Cell Injection Therapy Is Changing the Future of Joint Repair",
    excerpt: "For decades, patients with chronic joint pain faced a difficult choice: manage symptoms indefinitely or undergo invasive surgery. Stem cell injection therapy is offering a third path that supports the body's natural processes rather than simply masking symptoms.",
    date: "March 15, 2026",
    readTime: "8 min read",
    author: "CellRX Medical Team",
    serviceLink: "/services",
    serviceLabel: "Learn About Stem Cell Injection"
  },
  {
    img: IV_IMG,
    category: "Stem Cell IV Therapy",
    slug: "iv-stem-cell-therapy-science",
    title: "The Science of Systemic Regeneration: What Happens During IV Stem Cell Therapy",
    excerpt: "When regenerative biologics are delivered intravenously, they interact with areas of inflammation and cellular stress, initiating biological signals that may support immune function and cognitive performance. Individual results may vary.",
    date: "February 28, 2026",
    readTime: "10 min read",
    author: "CellRX Medical Team",
    serviceLink: "/services",
    serviceLabel: "Learn About IV Therapy"
  },
  {
    img: CLINIC_IMG,
    category: "Black Label",
    slug: "top-performers-concierge-medicine",
    title: "Why the World's Top Performers Choose Proactive Concierge Medicine",
    excerpt: "The most sophisticated approach to health is not reactive — it is proactive. Black Label Concierge Medicine is built for individuals who understand that quarterly biomarker monitoring, personalized protocols, and direct physician access are not luxuries — they are leverage.",
    date: "February 10, 2026",
    readTime: "6 min read",
    author: "CellRX Medical Team",
    serviceLink: "/black-label",
    serviceLabel: "Explore Black Label"
  },
  {
    img: PHYSICIAN_IMG,
    category: "Patient Education",
    slug: "first-cellrx-consultation",
    title: "What to Expect at Your First CellRX Consultation",
    excerpt: "Your first consultation at CellRX is a comprehensive, unhurried conversation about your health history, goals, and concerns. Here's what you can expect from the moment you walk through our doors to the moment you leave with a personalized plan.",
    date: "January 22, 2026",
    readTime: "5 min read",
    author: "CellRX Medical Team",
    serviceLink: "/contact",
    serviceLabel: "Book Your Consultation"
  },
  {
    img: BG_DARK_IMG,
    category: "Research",
    slug: "chain-of-custody-stem-cells",
    title: "Chain of Custody: Why the Source of Your Stem Cells Matters More Than You Think",
    excerpt: "Not all stem cell products are created equal. The difference between a diluted, replicated biologic and a full-concentration, ethically sourced product from a healthy local birth is the difference between compromised quality and the highest available standard of care.",
    date: "January 8, 2026",
    readTime: "12 min read",
    author: "CellRX Medical Team",
    serviceLink: "/services",
    serviceLabel: "Our Chain-of-Custody Standard"
  },
  {
    img: INJECTION_IMG,
    category: "Longevity & Optimization",
    slug: "quarterly-labs-longevity",
    title: "Quarterly Labs and Longevity: How Biomarker Monitoring Changes Everything",
    excerpt: "Most people only see a doctor when something is wrong. The most successful longevity strategies are built on the opposite principle: continuous monitoring, early intervention, and personalized protocols that evolve with your biology — not against it.",
    date: "December 20, 2025",
    readTime: "7 min read",
    author: "CellRX Medical Team",
    serviceLink: "/black-label",
    serviceLabel: "Explore Quarterly Lab Panels"
  },
  {
    img: IV_IMG,
    category: "Athlete Performance",
    slug: "regenerative-medicine-athletes",
    title: "Regenerative Medicine for Elite Athletes: Accelerating Recovery Without Compromise",
    excerpt: "Elite athletes push their bodies to the limit — and the recovery demands are equally extreme. Regenerative therapies are becoming an important tool in the performance medicine toolkit, supporting recovery, promoting a healthy inflammatory response, and supporting career longevity. Individual results may vary.",
    serviceLink: "/services",
    serviceLabel: "Explore Athlete Protocols",
    date: "December 15, 2025",
    readTime: "9 min read",
    author: "CellRX Medical Team"
  }
  ,
  // ─── New articles — Aug/Sep/Oct 2026 drip schedule ───────────────────────
  {
    img: INJECTION_IMG,
    category: "Stem Cell Therapy",
    slug: "mesenchymal-stem-cell-therapy-patient-guide",
    title: "What Is Mesenchymal Stem Cell Therapy? A Patient's Guide",
    excerpt: "Mesenchymal stem cell therapy uses adult stem cells to help modulate inflammation and support tissue repair. Most non-FDA-approved uses remain investigational — here is what the current evidence shows and what to ask before treatment.",
    date: "August 11, 2026",
    readTime: "10 min read",
    author: "Dr. Jacob Egbert, MD",
    serviceLink: "/services",
    serviceLabel: "View Stem Cell Services"
  },
  {
    img: CLINIC_IMG,
    category: "Peptide Therapy",
    slug: "peptide-therapy-101-patient-guide",
    title: "Peptide Therapy 101: What Patients Should Know Before Their Consultation",
    excerpt: "Peptide therapy uses short chains of amino acids — the body's natural signaling molecules — to influence tissue repair, metabolism, or hormone signaling. Regulatory status varies widely; here is what to understand before your consultation.",
    date: "August 18, 2026",
    readTime: "9 min read",
    author: "Dr. Jacob Egbert, MD",
    serviceLink: "/health-optimization",
    serviceLabel: "Health Optimization"
  },
  {
    img: INJECTION_IMG,
    category: "Stem Cell Therapy",
    slug: "stem-cell-therapy-vs-prp-differences",
    title: "Stem Cell Therapy vs. PRP: What Are the Differences?",
    excerpt: "Stem cell therapy and PRP are both regenerative biologics but work through different mechanisms and have different evidence bases. Understanding the distinction helps patients ask better questions.",
    date: "September 1, 2026",
    readTime: "9 min read",
    author: "Dr. Jacob Egbert, MD",
    serviceLink: "/services",
    serviceLabel: "View Regenerative Services"
  },
  {
    img: PHYSICIAN_IMG,
    category: "Patient Education",
    slug: "prepare-first-regenerative-medicine-consultation",
    title: "How to Prepare for Your First Regenerative Medicine Consultation",
    excerpt: "A regenerative medicine consultation is a clinical conversation, not a sales presentation. Knowing what to bring, what to ask, and what red flags to watch for helps you make an informed decision.",
    date: "September 8, 2026",
    readTime: "8 min read",
    author: "Dr. Jacob Egbert, MD",
    serviceLink: "/contact",
    serviceLabel: "Book a Consultation"
  },
  {
    img: IV_IMG,
    category: "Longevity Medicine",
    slug: "nad-iv-therapy-longevity-medicine",
    title: "What Is NAD+ IV Therapy and How Is It Used in Longevity Medicine?",
    excerpt: "NAD+ IV therapy delivers a coenzyme central to cellular energy production directly into the bloodstream. The science is legitimate — but clinical evidence for anti-aging benefits in humans is still developing.",
    date: "October 6, 2026",
    readTime: "9 min read",
    author: "Dr. Jacob Egbert, MD",
    serviceLink: "/longevity-programs",
    serviceLabel: "Longevity Programs"
  },
  {
    img: BG_DARK_IMG,
    category: "Health Optimization",
    slug: "understanding-biomarker-testing-labs",
    title: "Understanding Biomarker Testing: What Your Labs Actually Tell You",
    excerpt: "Biomarker testing can offer valuable insight into your health — but results are most useful when interpreted in context, not as standalone numbers. Learn what the key markers measure and what questions to ask.",
    date: "October 13, 2026",
    readTime: "10 min read",
    author: "Dr. Jacob Egbert, MD",
    serviceLink: "/black-label",
    serviceLabel: "Quarterly Lab Panels"
  }
];

export default function Blog() {
  useSEO(PAGE_SEO.blog);
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Header */}
      <section
        className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden"
        style={{ backgroundImage: `url(${BG_DARK_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/88" />
        <div className="container relative z-10">
          <p className="section-label mb-4">Knowledge & Research</p>
          <h1
            className="text-[#F6F5EC]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            INSIGHTS &<br />
            <span className="text-[#FBB217]">EDUCATION</span>
          </h1>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="mb-8 fade-up">
            <p className="section-label mb-2">Featured Article</p>
          </div>
          <Link href={`/blog/${articles[0].slug}`}>
            <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/5 overflow-hidden cursor-pointer fade-in">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={articles[0].img}
                  alt={articles[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                  width="800"
                  height="600"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#051229]/50" />
              </div>
              <div className="bg-[#030d1e] p-10 flex flex-col justify-center">
                <span className="section-label mb-4">{articles[0].category}</span>
                <h2
                  className="text-white mb-4 group-hover:text-[#FBB217] transition-colors"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 3vw, 40px)" }}
                >
                  {articles[0].title}
                </h2>
                <p className="text-[#D6D7D9]/60 text-sm leading-relaxed mb-6">{articles[0].excerpt}</p>
                <div className="flex items-center gap-6 text-white/30 text-xs mb-6">
                  <span className="flex items-center gap-1.5"><Calendar size={12} />{articles[0].date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} />{articles[0].readTime}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-[#6DB3F2] text-sm font-semibold group/btn w-fit">
                    Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  {articles[0].serviceLink && (
                    <span
                      className="text-[#FBB217] text-xs tracking-widest uppercase hover:underline"
                      onClick={(e) => { e.preventDefault(); window.location.href = articles[0].serviceLink!; }}
                    >
                      {articles[0].serviceLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article, i) => (
              <Link key={i} href={`/blog/${article.slug}`}>
                <div
                  className="group border border-white/5 overflow-hidden cursor-pointer fade-up h-full"
                  style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.img}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030d1e] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#0047BB] text-white text-xs px-3 py-1 tracking-widest uppercase">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#030d1e] p-6">
                    <h3
                      className="text-white mb-3 group-hover:text-[#FBB217] transition-colors leading-snug"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px" }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-[#D6D7D9]/60 text-xs leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-white/30 text-xs pt-4 border-t border-white/5">
                      <span className="flex items-center gap-1.5"><Calendar size={11} />{article.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={11} />{article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-[#6DB3F2] text-xs font-semibold">
                      Read Article <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-[#030d1e] border-t border-white/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center fade-up">
            <p className="section-label mb-4">Stay Informed</p>
            <h2
              className="text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              REGENERATIVE INSIGHTS<br />DELIVERED TO YOU
            </h2>
            <p className="text-[#D6D7D9]/60 text-sm mb-8 leading-relaxed">
              Subscribe to receive the latest research, clinical insights, and health optimization strategies from the CellRX medical team.
            </p>
            <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-[#051229] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#0047BB] transition-colors"
              />
              <button
                className="btn-primary rounded-none whitespace-nowrap"
                onClick={() => toast.success("Subscribed successfully!")}
              >
                Subscribe
              </button>
            </div>
            <p className="text-white/20 text-xs mt-4">No spam. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0047BB]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2
                className="text-[#F6F5EC]"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 3vw, 44px)" }}
              >
                READY TO EXPERIENCE REGENERATIVE MEDICINE?
              </h2>
              <p className="text-white/70 mt-1">Book a private consultation with our medical team.</p>
            </div>
            <Link href="/contact">
              <button className="bg-white text-[#0047BB] font-bold text-xs tracking-widest uppercase px-10 py-4 hover:bg-[#F6F5EC] transition-colors whitespace-nowrap">
                Book Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
