/*
 * CellRX Home Page — Editorial Dark Luxury
 * Brand Colors: #051229 Navy | #0047BB Blue | #FBB217 Amber | #F6F5EC Cream | #36454F Charcoal | #D6D7D9 Silver
 * Fonts: Bebas Neue (display), DM Sans (sub), Inter (body)
 * Copy: Luxury sales psychology — exclusivity, authority, transformation, scarcity
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, Shield, Zap, Clock, Star, ArrowRight, CheckCircle2, Plus, Minus } from "lucide-react";
import { useSEO, PAGE_SEO } from "@/hooks/useSEO";

// CDN URLs
const INJECTION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_injection_3f039e48.webp";
const IV_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_iv_9142a5f3.webp";
const BLACK_LABEL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_black_label_1c68d442.webp";
const CLINIC_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/clinic_interior_31c757cf.webp";
const PHYSICIAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/physician_portrait_d5fe25e9.webp";
const HERO_CROP_A = "/hero_crop_a.jpg";
const CONSULTATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/consultation_photo_de51af6c.webp";
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

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / (2000 / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const faqs = [
  {
    q: "What makes CellRX stem cells different from what other clinics offer?",
    a: "Most clinics purchase stem cells through third-party distributors — meaning the product has often changed hands multiple times, may have been diluted, and comes with no verifiable chain of custody. At CellRX, our Medical Director serves as the Medical Director of our stem cell source company. This means we have direct, unbroken oversight from the moment of ethical procurement to the moment of your treatment. Our biologics are never diluted, never replicated, and always sourced from healthy, consented local births — giving you the highest concentration and the most transparent provenance available anywhere."
  },
  {
    q: "How is stem cell therapy priced at CellRX?",
    a: "Stem cell injection therapy starts at $2,500, and IV therapy starts at $4,000. Protocols are priced at $1,250 per CC, with dosing ranging from 1 CC to a maximum of 10 CC based on your condition and goals. Your consultation will determine the optimal dose for your specific needs — and you will always know exactly what you are investing before any commitment is made."
  },
  {
    q: "Are stem cell and regenerative treatments safe?",
    a: "Yes. At CellRX, we use ethically sourced, rigorously screened biologic products with full chain-of-custody documentation. All treatments are administered by expert clinicians who tailor every protocol to your unique biology. Our biologics are sourced exclusively from healthy local births and are never diluted or replicated — ensuring the highest purity and safety standards in the industry."
  },
  {
    q: "When will I start to notice results?",
    a: "Many patients report meaningful improvements in pain, mobility, energy, and cognitive clarity within the first few weeks. Because regenerative healing operates at the cellular level, the full arc of benefit often continues to unfold over three to six months as your body rebuilds and restores function. The results are not a temporary mask — they represent genuine biological repair."
  },
  {
    q: "How long does a procedure take, and what is the recovery like?",
    a: "Most treatments are completed in under 60 minutes in our private clinic environment. Recovery is minimal — the vast majority of patients resume their normal activities the same day. We provide personalized aftercare guidance to support healing and ensure your results are optimized."
  },
  {
    q: "What is included in Black Label Concierge Medicine?",
    a: "Black Label is our most comprehensive concierge health partnership. Membership pricing is custom and discussed privately during your consultation — because your protocol is not generic, and neither is your investment. It includes quarterly laboratory panels, personalized longevity protocols, direct physician access, priority scheduling, and unlimited consultations. Stem cell treatments are available as a premium add-on. Spouse enrollment is also available. Membership is limited by design to ensure every member receives the full attention and resources they deserve."
  }
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full flex items-center justify-between py-6 text-left gap-4"
        onClick={() => setOpen(!open)}
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

export default function Home() {
  useSEO(PAGE_SEO.home);
  useScrollAnimation();
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* ─── HERO ─── */}
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.10) translateY(2%); }
          100% { transform: scale(1.0)  translateY(0%); }
        }
        .hero-ken-burns {
          animation: kenBurns 14s ease-out forwards;
          will-change: transform;
        }
        .hero-img-base {
          transform: scale(1.10) translateY(2%);
        }
      `}</style>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Full-bleed background: Option A 16:9 crop with Ken Burns on load */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={HERO_CROP_A}
            alt="Dr. Egbert performing stem cell injection"
            className={`w-full h-full ${heroLoaded ? 'hero-ken-burns' : 'hero-img-base'}`}
            style={{ objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
            onLoad={() => setHeroLoaded(true)}
            fetchPriority="high"
            decoding="async"
            width="1920"
            height="1080"
          />
          {/* Dark overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#051229]/90 via-[#051229]/60 to-[#051229]/20" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#051229] to-transparent" />
        </div>

        <div className="container relative z-10 pt-32 pb-24">
          <div className="max-w-xl">
            <p className="section-label mb-6 fade-up">Concierge Regenerative Medicine</p>
            <h1
              className="text-[#F6F5EC] leading-none mb-6 fade-up"
              style={{ fontSize: "clamp(60px, 8vw, 110px)", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em", transitionDelay: "0.1s" }}
            >
              RECLAIM<br />
              <span className="text-[#0047BB]">YOUR</span><br />
              VITALITY
            </h1>
            <p
              className="text-[#D6D7D9] text-lg leading-relaxed mb-10 max-w-lg fade-up"
              style={{ transitionDelay: "0.2s" }}
            >
              The most advanced stem cell therapies available — sourced with full chain of custody, never diluted, and administered by the physician who oversees their creation.
            </p>
            <div className="flex flex-wrap gap-4 fade-up" style={{ transitionDelay: "0.3s" }}>
              <Link href="/contact">
                <button className="btn-primary rounded-none">
                  Book Your Private Consultation
                </button>
              </Link>
              <Link href="/services">
                <button className="btn-outline rounded-none">
                  Explore Treatments
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-[#030d1e] border-y border-white/5 py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Shield size={20} className="text-[#FBB217]" />, label: "Full Chain of Custody", sub: "Unbroken oversight from source to syringe" },
              { icon: <Zap size={20} className="text-[#FBB217]" />, label: "Never Diluted", sub: "Maximum concentration, every time" },
              { icon: <Clock size={20} className="text-[#FBB217]" />, label: "Under 60 Minutes", sub: "Minimally invasive, same-day return" },
              { icon: <Star size={20} className="text-[#FBB217]" />, label: "White-Glove Service", sub: "Concierge care at every step" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                {item.icon}
                <p className="text-[#F6F5EC] text-sm font-semibold tracking-wide">{item.label}</p>
                <p className="text-[#D6D7D9]/60 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 500, suffix: "+", label: "Patients Treated" },
              { value: 10, suffix: "+", label: "Years of Excellence" },
              { value: 98, suffix: "%", label: "Patient Satisfaction" },
              { value: 10, suffix: " CC", label: "Maximum Dose Available" },
            ].map((stat, i) => (
              <div key={i} className="fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div
                  className="text-[#F6F5EC] mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 6vw, 72px)", letterSpacing: "0.02em", lineHeight: 1 }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="gold-rule mx-auto mb-3" />
                <p className="text-[#D6D7D9]/60 text-xs tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="mb-16 fade-up">
            <p className="section-label mb-4">Our Treatments</p>
            <h2 className="text-[#F6F5EC]" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)" }}>
              PRECISION REGENERATIVE PROTOCOLS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: INJECTION_IMG,
                label: "01",
                title: "STEM CELL INJECTION",
                sub: "Targeted Joint & Tissue Repair",
                desc: "Precision-dosed regenerative biologics delivered directly to the site of damage — giving your body the exact signals it needs to repair tissue, eliminate chronic inflammation, and restore function without surgery.",
                price: "Starting at $2,500",
                features: ["Addresses root cause, not symptoms", "Eliminates chronic inflammation", "Restores mobility — avoids surgery"],
                href: "/services"
              },
              {
                img: IV_IMG,
                label: "02",
                title: "STEM CELL IV THERAPY",
                sub: "Systemic Regeneration & Optimization",
                desc: "A full-body regenerative infusion that delivers concentrated biologics through the bloodstream — targeting inflammation, accelerating cellular repair, and restoring the energy and clarity of a younger biology.",
                price: "Starting at $4,000",
                features: ["Whole-body cellular restoration", "Elevates energy and cognitive performance", "Accelerates recovery, extends longevity"],
                href: "/services"
              },
              {
                img: BLACK_LABEL_IMG,
                label: "03",
                title: "BLACK LABEL",
                sub: "Concierge Health Partnership",
                desc: "For those who refuse to leave their health to chance. An all-encompassing annual membership that delivers proactive optimization, quarterly labs, and direct physician access — with stem cell treatments available as a premium add-on.",
                price: "Membership Is By Invitation",
                features: ["Quarterly biomarker & lab panels", "Personalized longevity protocols", "Stem cell treatments available as add-on"],
                href: "/black-label"
              }
            ].map((service, i) => (
              <div
                key={i}
                className="group relative overflow-hidden fade-up"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030d1e] via-[#030d1e]/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[#FBB217]/25"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", lineHeight: 1 }}
                    >
                      {service.label}
                    </span>
                  </div>
                </div>
                <div className="bg-[#0a1628] p-8 border border-white/5 border-t-0">
                  <p className="section-label mb-2">{service.sub}</p>
                  <h3
                    className="text-[#F6F5EC] mb-4"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px", letterSpacing: "0.05em" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[#D6D7D9]/70 text-sm leading-relaxed mb-6">{service.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-[#D6D7D9]/70 text-xs">
                        <CheckCircle2 size={13} className="text-[#0047BB] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-[#FBB217] text-sm font-semibold">{service.price}</span>
                    <Link href={service.href}>
                      <button className="flex items-center gap-2 text-[#D6D7D9]/60 text-xs hover:text-[#FBB217] transition-colors group/btn">
                        Learn More <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE CELLRX DIFFERENCE ─── */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Consultation Photo */}
            <div className="relative fade-in order-2 lg:order-1">
              <img
                src={CONSULTATION_IMG}
                alt="CellRX physician in consultation"
                className="w-full"
                style={{ aspectRatio: '3/4', objectFit: 'cover', objectPosition: '50% 20%', display: 'block' }}
                loading="lazy"
                decoding="async"
                width="600"
                height="800"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#030d1e] to-transparent" />
            </div>
            <div className="order-1 lg:order-2">
            <div className="fade-up">
              <p className="section-label mb-4">The CellRX Difference</p>
              <h2
                className="text-[#F6F5EC] mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)" }}
              >
                THE STANDARD<br />
                <span className="text-[#FBB217]">OTHERS CANNOT MATCH</span>
              </h2>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-8">
                Most regenerative clinics purchase biologics through distributors — products that have changed hands multiple times, with no verifiable chain of custody. At CellRX, our Medical Director is also the Medical Director of our stem cell source company. That means every vial we administer has been under our direct oversight from the moment of ethical procurement. Never diluted. Never replicated. Always from healthy, consented local births.
              </p>
              <Link href="/about">
                <button className="btn-primary rounded-none">
                  Our Approach
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 fade-in mt-8">
              {[
                { title: "Full Chain of Custody", desc: "Direct oversight from source to syringe. No distributors. No unknowns. Complete transparency." },
                { title: "Maximum Concentration", desc: "Our biologics are never diluted or replicated — you receive the full therapeutic dose every time." },
                { title: "Ethically Sourced", desc: "Exclusively from healthy, consented local births. The highest ethical and quality standards in the industry." },
                { title: "Physician-Directed", desc: "Your treatment is designed and overseen by the same physician who directs the source company. Accountability at every level." },
              ].map((item, i) => (
                <div key={i} className="glass-card p-6">
                  <div className="gold-rule mb-4" />
                  <h4 className="text-[#F6F5EC] mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px" }}>
                    {item.title}
                  </h4>
                  <p className="text-[#D6D7D9]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHYSICIAN SECTION ─── */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative fade-in">
              <img
                src={PHYSICIAN_IMG}
                alt="Dr. Jacob Egbert, Medical Director of CellRX Regenerative Medicine"
                className="w-full max-w-md mx-auto block"
                style={{ aspectRatio: "2/3", objectFit: "cover", objectPosition: "50% 0%" }}
                loading="lazy"
                decoding="async"
                width="600"
                height="900"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#051229] to-transparent" />
              {/* Authority badge */}
              <div className="absolute top-8 -right-4 bg-[#0047BB] p-4 max-w-[180px] hidden lg:block">
                <p className="text-white text-xs font-bold tracking-wide uppercase leading-tight">Medical Director</p>
                <p className="text-white/70 text-xs mt-1">Stem Cell Source Company</p>
              </div>
            </div>

            <div className="fade-up">
              <p className="section-label mb-4">Meet Our Medical Director</p>
              <h2
                className="text-[#F6F5EC] mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 60px)" }}
              >
                AUTHORITY THAT<br />GOES ALL THE WAY
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-6">
                Our Medical Director occupies a position no other clinic can claim: he serves simultaneously as the Medical Director of CellRX and as the Medical Director of our stem cell source company. This dual role means he has direct, unbroken oversight of every biologic we administer — from the moment of ethical procurement through the moment it enters your body.
              </p>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-8">
                When you choose CellRX, you are not trusting a distributor's word. You are trusting a physician who personally guarantees the purity, concentration, and provenance of every treatment he provides.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Dual Director", sub: "Clinic & Source Company" },
                  { label: "10+ Years", sub: "Clinical Experience" },
                  { label: "500+ Patients", sub: "Successfully Treated" },
                ].map((cred, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[#FBB217] text-sm font-semibold">{cred.label}</p>
                    <p className="text-[#D6D7D9]/50 text-xs mt-1">{cred.sub}</p>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <button className="btn-outline rounded-none">
                  Learn More About Our Team
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="text-center mb-16 fade-up">
            <p className="section-label mb-4">Patient Outcomes</p>
            <h2
              className="text-[#F6F5EC]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)" }}
            >
              REAL RESULTS, REAL PEOPLE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Michael R.",
                role: "Professional Athlete",
                stars: 5,
                quote: "After two years of knee pain that was threatening my career, CellRX gave me my life back. Within three months of the stem cell injection, I was back to full training. The level of care was unlike anything I've experienced in traditional medicine.",
                treatment: "Stem Cell Injection"
              },
              {
                name: "Sarah T.",
                role: "CEO & Entrepreneur",
                stars: 5,
                quote: "The Black Label membership has completely transformed how I manage my health. Having a dedicated physician who proactively monitors and optimizes my biology means I can focus entirely on what matters. The ROI on my health has been extraordinary.",
                treatment: "Black Label Concierge Medicine"
              },
              {
                name: "David L.",
                role: "Executive",
                stars: 5,
                quote: "I was skeptical at first, but the results from the IV therapy have been remarkable. My energy levels, cognitive clarity, and recovery from workouts have all improved dramatically. The team at CellRX is professional, discreet, and genuinely invested in my outcomes.",
                treatment: "Stem Cell IV Therapy"
              }
            ].map((t, i) => (
              <div
                key={i}
                className="glass-card p-8 fade-up"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} className="text-[#FBB217] fill-[#FBB217]" />
                  ))}
                </div>
                <p className="text-[#D6D7D9]/80 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-[#F6F5EC] font-semibold text-sm">{t.name}</p>
                  <p className="text-[#D6D7D9]/50 text-xs mt-0.5">{t.role}</p>
                  <p className="text-[#0047BB] text-xs mt-1">{t.treatment}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 fade-up">
            <Link href="/testimonials">
              <button className="btn-outline rounded-none">
                View All Patient Stories
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="fade-up">
              <p className="section-label mb-4">FAQ</p>
              <h2
                className="text-[#F6F5EC] mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 52px)" }}
              >
                YOUR QUESTIONS<br />ANSWERED
              </h2>
              <p className="text-[#D6D7D9]/60 text-sm leading-relaxed mb-8">
                We believe an informed patient is an empowered patient. Find answers to the most common questions about our treatments, protocols, and what sets CellRX apart.
              </p>
              <Link href="/contact">
                <button className="btn-primary rounded-none text-xs">
                  Ask a Question
                </button>
              </Link>
            </div>
            <div className="lg:col-span-2 fade-up" style={{ transitionDelay: "0.1s" }}>
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundImage: `url(${BG_DARK_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/90" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4 fade-up">Your Next Level Awaits</p>
          <h2
            className="text-[#F6F5EC] mb-6 fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 80px)", transitionDelay: "0.1s" }}
          >
            THE PEOPLE WHO PERFORM<br />
            <span className="text-[#FBB217]">AT THE HIGHEST LEVEL INVEST IN THEIR BIOLOGY</span>
          </h2>
          <p
            className="text-[#D6D7D9]/70 max-w-xl mx-auto mb-10 leading-relaxed fade-up"
            style={{ transitionDelay: "0.2s" }}
          >
            A private consultation is the first step. Our Medical Director will review your history, assess your goals, and design a protocol built entirely around your biology. No templates. No shortcuts.
          </p>
          <div className="flex flex-wrap gap-4 justify-center fade-up" style={{ transitionDelay: "0.3s" }}>
            <Link href="/contact">
              <button className="btn-primary rounded-none">
                Book Your Private Consultation
              </button>
            </Link>
            <a href="tel:3857072373">
              <button className="btn-outline rounded-none">
                Call 385-707-2373
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
