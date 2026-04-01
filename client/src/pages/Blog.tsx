/*
 * CellRX Blog Page — Editorial Dark Luxury
 * Educational content, research articles, longevity insights
 */

import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

const INJECTION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_injection_3f039e48.webp";
const IV_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_iv_9142a5f3.webp";
const CLINIC_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/clinic_interior_31c757cf.webp";
const PHYSICIAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/team_photo_3d1739e6.webp";
const BG_DARK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/background_dark_fb24a343.webp";

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
    title: "How Stem Cell Injection Therapy Is Changing the Future of Joint Repair",
    excerpt: "For decades, patients with chronic joint pain faced a difficult choice: manage symptoms indefinitely or undergo invasive surgery. Stem cell injection therapy is rewriting that narrative, offering a third path that addresses the root cause of damage rather than the symptoms.",
    date: "March 15, 2026",
    readTime: "8 min read",
    author: "CellRX Medical Team",
    serviceLink: "/services",
    serviceLabel: "Learn About Stem Cell Injection"
  },
  {
    img: IV_IMG,
    category: "Stem Cell IV Therapy",
    title: "The Science of Systemic Regeneration: What Happens During IV Stem Cell Therapy",
    excerpt: "When regenerative biologics are delivered intravenously, they don't simply circulate passively. They actively seek out areas of inflammation and cellular stress, initiating a cascade of repair signals that can affect everything from immune function to cognitive performance.",
    date: "February 28, 2026",
    readTime: "10 min read",
    author: "CellRX Medical Team",
    serviceLink: "/services",
    serviceLabel: "Learn About IV Therapy"
  },
  {
    img: CLINIC_IMG,
    category: "Investment Plan",
    title: "Why the World's Top Performers Choose Proactive Concierge Medicine",
    excerpt: "The most sophisticated approach to health is not reactive — it is proactive. The CellRX Investment Plan is built for individuals who understand that quarterly biomarker monitoring, personalized protocols, and direct physician access are not luxuries — they are leverage.",
    date: "February 10, 2026",
    readTime: "6 min read",
    author: "CellRX Medical Team",
    serviceLink: "/black-label",
    serviceLabel: "Explore the Investment Plan"
  },
  {
    img: PHYSICIAN_IMG,
    category: "Patient Education",
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
    title: "Chain of Custody: Why the Source of Your Stem Cells Matters More Than You Think",
    excerpt: "Not all stem cell products are created equal. The difference between a diluted, replicated biologic and a full-concentration, ethically sourced product from a healthy local birth is the difference between marginal results and transformative outcomes. Here's what to ask.",
    date: "January 8, 2026",
    readTime: "12 min read",
    author: "CellRX Medical Team",
    serviceLink: "/services",
    serviceLabel: "Our Chain-of-Custody Standard"
  },
  {
    img: INJECTION_IMG,
    category: "Longevity & Optimization",
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
    title: "Regenerative Medicine for Elite Athletes: Accelerating Recovery Without Compromise",
    excerpt: "Elite athletes push their bodies to the limit — and the recovery demands are equally extreme. Regenerative therapies are becoming an essential tool in the performance medicine toolkit, offering faster healing, reduced inflammation, and extended career longevity.",
    serviceLink: "/services",
    serviceLabel: "Explore Athlete Protocols",
    date: "December 15, 2025",
    readTime: "9 min read",
    author: "CellRX Medical Team"
  }
];

export default function Blog() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Header */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
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
          <div
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/5 overflow-hidden cursor-pointer fade-in"
            onClick={() => toast.info("Full article coming soon")}
          >
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src={articles[0].img}
                alt={articles[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                <button className="flex items-center gap-2 text-[#0047BB] text-sm font-semibold group/btn w-fit">
                  Read Article <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
                {articles[0].serviceLink && (
                  <Link href={articles[0].serviceLink} className="text-[#FBB217] text-xs tracking-widest uppercase hover:underline">
                    {articles[0].serviceLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article, i) => (
              <div
                key={i}
                className="group border border-white/5 overflow-hidden cursor-pointer fade-up"
                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
                onClick={() => toast.info("Full article coming soon")}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                  {article.serviceLink && (
                    <Link
                      href={article.serviceLink}
                      className="inline-flex items-center gap-1.5 mt-4 text-[#FBB217] text-xs tracking-widest uppercase hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {article.serviceLabel} <ArrowRight size={10} />
                    </Link>
                  )}
                </div>
              </div>
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
