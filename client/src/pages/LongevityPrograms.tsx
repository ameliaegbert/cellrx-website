/*
 * CellRX Longevity Programs Page — Editorial Dark Luxury
 * Brand Colors: #051229 Navy | #0047BB Blue | #FBB217 Amber | #F6F5EC Cream | #D6D7D9 Silver
 * Route: /longevity-programs
 */

import { useEffect, useState } from "react";
import { useSEO, PAGE_SEO, useBreadcrumb, useFAQSchema } from "@/hooks/useSEO";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { CheckCircle2, Clock, ArrowRight, Plus, Minus } from "lucide-react";

const LONGEVITY_FAQS = [
  {
    q: "What is a longevity program at CellRX?",
    a: "A CellRX longevity program is a physician-directed protocol designed to extend your healthspan — the years you spend in peak biological function. It combines advanced diagnostics, regenerative biologics, hormone optimization, precision nutrition, and targeted supplementation into a personalized plan that evolves with your biology over time."
  },
  {
    q: "What does a CellRX longevity protocol include?",
    a: "Longevity protocols at CellRX are highly individualized, but typically include comprehensive biomarker testing (40+ markers), hormone optimization, IV stem cell therapy for cellular rejuvenation, NAD+ therapy, peptide protocols, anti-inflammatory interventions, and quarterly monitoring to track biological age and adjust the protocol as your biology responds."
  },
  {
    q: "How does stem cell therapy fit into a longevity program?",
    a: "Stem cell therapy is a cornerstone of CellRX longevity protocols. IV stem cell delivery provides systemic cellular rejuvenation — reducing biological age markers, improving mitochondrial function, reducing chronic inflammation, and restoring the regenerative capacity that declines with age. Many longevity patients receive annual or semi-annual IV therapy as part of their ongoing protocol."
  },
  {
    q: "How do I know if a longevity program is right for me?",
    a: "If you are a high-performing individual who wants to maintain peak function as you age — or if you are experiencing the early signs of biological decline (fatigue, cognitive fog, reduced recovery, hormonal changes) — a longevity program may be appropriate. A private consultation with our Medical Director is the starting point. He will assess your current biological status and determine whether a longevity protocol is the right investment for your goals."
  },
];

function LongevityFAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full flex items-center justify-between py-6 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-white font-medium text-base leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {q}
        </span>
        <span className="text-[#FBB217] shrink-0">
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-6" : "max-h-0"}`}>
        <p className="text-[#D6D7D9] text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

const BG_DARK_IMG = "/manus-storage/background_dark_opt_b4ede28a.webp";
const IV_IMG = "/manus-storage/service_iv_opt_42742b15.webp";
const INJECTION_IMG = "/manus-storage/service_injection_opt_c744419a.webp";
const BLACK_LABEL_IMG = "/manus-storage/service_black_label_opt_686cc654.webp";
const CLINIC_IMG = "/manus-storage/clinic_interior_opt_d513ed06.webp";

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

const programs = [
  {
    img: IV_IMG,
    number: "01",
    title: "CELLULAR RENEWAL PROTOCOL",
    sub: "Systemic Regeneration",
    desc: "A structured series of IV stem cell infusions designed to address the root causes of biological aging: cellular senescence, mitochondrial dysfunction, chronic inflammation, and declining regenerative capacity. This is the flagship longevity protocol for patients seeking whole-body biological renewal.",
    features: [
      "Series of 2–4 IV infusions spaced 4–8 weeks apart",
      "Full biomarker assessment before and after each infusion",
      "Protocol adjusted based on response and lab trends",
      "Complementary lifestyle and supplementation guidance",
    ],
    ideal: "Patients experiencing accelerated biological aging, chronic fatigue, cognitive decline, or post-illness recovery.",
    href: "/services",
  },
  {
    img: INJECTION_IMG,
    number: "02",
    title: "STRUCTURAL LONGEVITY PROGRAM",
    sub: "Musculoskeletal Preservation",
    desc: "A proactive program for preserving joint health, tendon integrity, and musculoskeletal function — the physical infrastructure that determines your ability to remain active, athletic, and independent as you age. Designed for patients who want to prevent the structural decline that limits quality of life in later decades.",
    features: [
      "Comprehensive musculoskeletal assessment",
      "Targeted stem cell injections to high-risk or symptomatic joints",
      "Annual maintenance protocol to sustain structural integrity",
      "Integration with physical performance optimization",
    ],
    ideal: "Active individuals, athletes, and anyone who has experienced joint injuries or early-stage osteoarthritis.",
    href: "/services",
  },
  {
    img: BLACK_LABEL_IMG,
    number: "03",
    title: "BLACK LABEL LONGEVITY PARTNERSHIP",
    sub: "Comprehensive Annual Membership",
    desc: "The most comprehensive longevity program available. An annual concierge medicine partnership that combines quarterly biomarker monitoring, personalized protocols, direct physician access, and stem cell treatments — all under the continuous oversight of a physician who knows your biology intimately.",
    features: [
      "Quarterly comprehensive biomarker panels",
      "Personalized longevity protocols updated each quarter",
      "Direct Medical Director access — secure messaging and same-week appointments",
      "Stem cell treatments available as premium add-on",
      "Spouse enrollment available",
    ],
    ideal: "High-performing executives, entrepreneurs, and individuals who treat their health as a strategic investment.",
    href: "/black-label",
  },
];

const longevityPrinciples = [
  {
    title: "Measure First",
    desc: "Every longevity program begins with a comprehensive biomarker assessment. You cannot optimize what you do not measure. We establish your biological baseline before designing any intervention.",
  },
  {
    title: "Address Root Causes",
    desc: "Longevity is not achieved by managing symptoms. It requires identifying and addressing the underlying biological mechanisms that drive aging — cellular senescence, inflammation, hormonal decline, mitochondrial dysfunction.",
  },
  {
    title: "Personalize Everything",
    desc: "There is no universal longevity protocol. Your biology is unique. Your protocol must be designed around your specific markers, history, lifestyle, and goals — and it must evolve as your biology changes.",
  },
  {
    title: "Invest Continuously",
    desc: "Longevity is not a one-time treatment. It is a continuous investment in biological maintenance. The compounding returns of sustained optimization are the difference between a long life and a long, high-quality life.",
  },
];

const stats = [
  { value: "3–6", unit: "months", label: "for full regenerative response to unfold" },
  { value: "10", unit: "CC max", label: "highest concentration dose available" },
  { value: "500+", unit: "patients", label: "treated with regenerative biologics" },
  { value: "100%", unit: "chain of custody", label: "from source to syringe, every time" },
];

export default function LongevityPrograms() {
  useSEO(PAGE_SEO.longevityPrograms);
  useFAQSchema(
    LONGEVITY_FAQS.map((f) => ({ question: f.q, answer: f.a })),
    "longevity-programs"
  );
  useBreadcrumb([
    { name: "Home", url: "https://www.cellrx.bio/" },
    { name: "Longevity Programs", url: "https://www.cellrx.bio/longevity-programs" },
  ]);
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden"
        style={{ backgroundImage: `url(${BG_DARK_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/88" />
        <div className="container relative z-10">
          <p className="section-label mb-4 fade-up">Regenerative Longevity</p>
          <h1
            className="text-[#F6F5EC] fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 96px)", transitionDelay: "0.1s" }}
          >
            LONGEVITY<br />
            <span className="text-[#FBB217]">PROGRAMS</span>
          </h1>
          <p
            className="text-[#D6D7D9]/70 max-w-xl mt-6 leading-relaxed fade-up"
            style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "0.2s" }}
          >
            CellRX Longevity Programs in Lehi, Utah combine regenerative stem cell biologics, NAD+ therapy, peptide protocols, hormone optimization, and advanced diagnostics to extend your healthspan — not just your lifespan. Dr. Jacob Egbert builds each protocol around your biomarkers, targeting cellular repair, mitochondrial function, and systemic resilience. These programs are designed for individuals who refuse to accept biological decline as inevitable.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 fade-up" style={{ transitionDelay: "0.3s" }}>
            <Link href="/contact">
              <button className="btn-primary rounded-none">Begin Your Longevity Assessment</button>
            </Link>
            <Link href="/black-label">
              <button className="btn-outline rounded-none">Explore Black Label</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#030d1e] border-y border-white/5 py-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div
                  className="text-[#FBB217] mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "0.02em" }}
                >
                  {stat.value}
                </div>
                <div className="text-[#F6F5EC]/60 text-xs tracking-widest uppercase mb-1">{stat.unit}</div>
                <div className="text-[#D6D7D9]/40 text-xs" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-10 bg-[#030d1e] border-b border-white/5">
        <div className="container">
          <p className="text-[#FBB217] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Key Takeaways</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Combines stem cell biologics, NAD+, peptides, and hormone optimization",
              "Protocols built around your biomarkers — not a generic template",
              "Targets cellular repair, mitochondrial function, and systemic resilience",
              "Advanced diagnostics included — track biological age, not just calendar age",
              "Designed for individuals who refuse to accept biological decline",
              "Physician-directed by Dr. Jacob Egbert — 10+ years in regenerative medicine",
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-[#D6D7D9]/80 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="text-[#FBB217] shrink-0 mt-0.5" aria-hidden="true">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="mb-16 fade-up">
            <p className="section-label mb-4">Our Programs</p>
            <h2
              className="text-[#F6F5EC]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              WHAT LONGEVITY PROGRAMS<br />
              <span className="text-[#0047BB]">DOES CELLRX OFFER?</span>
            </h2>
          </div>

          <div className="space-y-16">
            {programs.map((program, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center fade-up ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={`relative overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <img
                    src={program.img}
                    alt={program.title}
                    className="w-full"
                    style={{ aspectRatio: "16/9", objectFit: "cover" }}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="450"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[#FBB217]/20"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "64px", lineHeight: 1 }}
                    >
                      {program.number}
                    </span>
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="section-label mb-2">{program.sub}</p>
                  <h3
                    className="text-[#F6F5EC] mb-4"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "0.04em" }}
                  >
                    {program.title}
                  </h3>
                  <p className="text-[#D6D7D9]/70 leading-relaxed mb-6" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                    {program.desc}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-[#D6D7D9]/60 text-sm" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                        <CheckCircle2 size={13} className="text-[#6DB3F2] shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-start gap-2 mb-8 p-4 border border-[#FBB217]/20 bg-[#FBB217]/5">
                    <Clock size={13} className="text-[#FBB217] shrink-0 mt-0.5" />
                    <p className="text-[#FBB217]/80 text-xs leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                      <strong className="text-[#FBB217]">Ideal for:</strong> {program.ideal}
                    </p>
                  </div>
                  <Link href={program.href}>
                    <button
                      className="flex items-center gap-2 text-[#D6D7D9]/60 text-sm hover:text-[#FBB217] transition-colors group"
                      aria-label={`View details for ${program.title} longevity program at CellRX`}
                    >
                      View Program Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="mb-16 text-center fade-up">
            <p className="section-label mb-4">Our Approach</p>
            <h2
              className="text-[#F6F5EC]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              HOW DOES LONGEVITY MEDICINE<br />
              <span className="text-[#FBB217]">ACTUALLY WORK?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {longevityPrinciples.map((principle, i) => (
              <div
                key={i}
                className="glass-card p-8 fade-up"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className="text-[#FBB217]/20 mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="gold-rule mb-4" />
                <h3
                  className="text-[#F6F5EC] mb-3"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 600 }}
                >
                  {principle.title}
                </h3>
                <p className="text-[#D6D7D9]/60 text-sm leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundImage: `url(${CLINIC_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/92" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4 fade-up">Your Longevity Journey Starts Here</p>
          <h2
            className="text-[#F6F5EC] mb-6 fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 72px)", transitionDelay: "0.1s" }}
          >
            THE PEOPLE WHO THRIVE<br />
            <span className="text-[#FBB217]">INVEST IN THEIR BIOLOGY EARLY</span>
          </h2>
          <p
            className="text-[#D6D7D9]/70 max-w-xl mx-auto mb-10 leading-relaxed fade-up"
            style={{ fontFamily: "'Libre Franklin', sans-serif", transitionDelay: "0.2s" }}
          >
            A private consultation is the first step. Our Medical Director will review your history, assess your current biological status, and design a longevity protocol built entirely around your biology and goals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center fade-up" style={{ transitionDelay: "0.3s" }}>
            <Link href="/contact">
              <button className="btn-primary rounded-none">Book Your Private Consultation</button>
            </Link>
            <a href="tel:3857072373">
              <button className="btn-outline rounded-none">Call 385-707-2373</button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 fade-up">
              <p className="section-label mb-4">Common Questions</p>
              <h2
                className="text-[#F6F5EC]"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                LONGEVITY PROGRAMS FAQ
              </h2>
              <p className="text-[#D6D7D9]/60 text-sm mt-4 leading-relaxed">
                Answers to the most common questions about CellRX longevity programs — what is included, how stem cell therapy fits in, and how to get started.
              </p>
            </div>
            <div className="fade-up">
              {LONGEVITY_FAQS.map((faq, i) => (
                <LongevityFAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
            <div className="mt-10 text-center fade-up">
              <Link href="/contact">
                <button className="btn-primary rounded-none">Book Your Private Consultation</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
      <Footer />
    </div>
  );
}
