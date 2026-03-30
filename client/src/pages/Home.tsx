/*
 * CellRX Home Page — Editorial Dark Luxury
 * Sections: Hero, Trust Bar, Services, Why CellRX, Physician, Testimonials, FAQ, CTA
 * Colors: Navy #051229, Blue #0047BB, Gold #C9A84C, Cream #F6F5EC
 * Fonts: Bebas Neue (display), Tenor Sans (sub), Inter (body)
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, Shield, Award, Clock, Star, ArrowRight, CheckCircle2, Plus, Minus } from "lucide-react";

// CDN URLs
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/clinic_interior_31c757cf.webp";
const INJECTION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_injection_3f039e48.webp";
const IV_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_iv_9142a5f3.webp";
const BLACK_LABEL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_black_label_1c68d442.webp";
const CLINIC_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/clinic_interior_31c757cf.webp";
const PHYSICIAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/team_photo_3d1739e6.webp";
const BG_DARK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/background_dark_fb24a343.webp";

// Scroll animation hook
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up, .fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Counter animation
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const faqs = [
  {
    q: "What makes CellRX regenerative treatments different from traditional pain or inflammation therapies?",
    a: "CellRX therapies work by activating your body's own healing mechanisms rather than simply masking symptoms. By delivering biologic signals directly to tissues or systemically, these treatments reduce inflammation and support real repair at the cellular level, helping you regain function and feel better long-term."
  },
  {
    q: "Are stem cell and regenerative treatments safe?",
    a: "Yes. At CellRX, we use ethically sourced, rigorously screened biologic products and follow strict protocols to ensure safety and compatibility. All regenerative treatments are administered by expert clinicians who tailor the approach to your unique needs. Minor soreness or temporary swelling can occur, but serious side effects are rare when performed in a controlled, clinical environment."
  },
  {
    q: "When will I start to feel results?",
    a: "Many patients notice early improvements in pain, mobility, or energy within the first few weeks. Because regenerative healing happens at the cellular level, full benefits often continue to develop over several months as your body rebuilds and restores function."
  },
  {
    q: "How long does a regenerative procedure take and what's the recovery like?",
    a: "Under an hour. Most treatments are minimally invasive and completed in a single clinic visit. Recovery is typically gentle — most people resume normal activities quickly with little downtime. We'll provide personalized aftercare guidance to help support healing and maximize outcomes."
  },
  {
    q: "Am I a good candidate for CellRX regenerative therapy?",
    a: "Regenerative treatments can benefit a wide range of individuals dealing with joint pain, chronic inflammation, slow recovery, or performance limitations, especially those seeking non-surgical alternatives. A consultation with our team helps determine the best approach for your goals and medical history."
  },
  {
    q: "What makes the Black Label Membership different from standard care?",
    a: "Black Label goes far beyond traditional treatment plans. As a member, you receive concierge-level access to our most advanced regenerative therapies, priority scheduling, direct communication with your medical team, and optimization protocols built uniquely around your biology and goals."
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
        <span className="text-white font-medium text-base leading-snug" style={{ fontFamily: "'Tenor Sans', serif" }}>
          {q}
        </span>
        <span className="text-[#C9A84C] shrink-0">
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-6" : "max-h-0"}`}>
        <p className="text-white/60 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function Home() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background: dark navy with subtle texture */}
        <div className="absolute inset-0 bg-[#051229]" />
        {/* Right side: physician image */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 overflow-hidden">
          <img
            src={PHYSICIAN_IMG}
            alt="CellRX Medical Director"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#051229] via-[#051229]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051229] via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 pt-32 pb-24">
          <div className="max-w-xl">
            <p className="section-label mb-6 fade-up">Concierge Regenerative Medicine</p>
            <h1
              className="text-white leading-none mb-6 fade-up"
              style={{ fontSize: "clamp(60px, 8vw, 110px)", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em", transitionDelay: "0.1s" }}
            >
              TRANSFORM<br />
              <span className="text-[#0047BB]">YOUR</span><br />
              HEALTH
            </h1>
            <p
              className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg fade-up"
              style={{ transitionDelay: "0.2s" }}
            >
              Precision stem cell therapy and concierge wellness programs designed for elite performers who refuse to accept decline.
            </p>
            <div className="flex flex-wrap gap-4 fade-up" style={{ transitionDelay: "0.3s" }}>
              <Link href="/contact">
                <button className="btn-primary rounded-none">
                  Book Your Consultation
                </button>
              </Link>
              <Link href="/services">
                <button className="btn-outline rounded-none">
                  Explore Services
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-[#030d1e] border-y border-white/5 py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Shield size={20} className="text-[#C9A84C]" />, label: "Ethically Sourced", sub: "Rigorously screened biologics" },
              { icon: <Award size={20} className="text-[#C9A84C]" />, label: "Expert Clinicians", sub: "Specialized regenerative team" },
              { icon: <Clock size={20} className="text-[#C9A84C]" />, label: "Under 60 Minutes", sub: "Minimally invasive procedures" },
              { icon: <Star size={20} className="text-[#C9A84C]" />, label: "White-Glove Service", sub: "Concierge care at every step" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                {item.icon}
                <p className="text-white text-sm font-semibold tracking-wide">{item.label}</p>
                <p className="text-white/40 text-xs">{item.sub}</p>
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
              { value: 3, suffix: "", label: "Treatment Protocols" },
            ].map((stat, i) => (
              <div key={i} className="fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div
                  className="text-white mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 6vw, 72px)", letterSpacing: "0.02em", lineHeight: 1 }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="gold-rule mx-auto mb-3" />
                <p className="text-white/50 text-xs tracking-widest uppercase">{stat.label}</p>
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
            <h2 className="text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)" }}>
              PRECISION REGENERATIVE PROTOCOLS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: INJECTION_IMG,
                label: "01",
                title: "STEM CELL INJECTION",
                sub: "Targeted Joint Repair",
                desc: "A targeted regenerative treatment that gives your joint the precise biologic signals it needs to repair tissue, reduce inflammation, and restore function.",
                price: "Starting at $2,500",
                features: ["Repairs damaged tissue at the root", "Reduces inflammation and joint pain", "Restores mobility, avoids surgery"],
                href: "/services"
              },
              {
                img: IV_IMG,
                label: "02",
                title: "STEM CELL IV THERAPY",
                sub: "Full-Body Regeneration",
                desc: "A full-body regenerative infusion that delivers powerful biologic signals through the bloodstream to reduce inflammation, accelerate repair, and restore vitality.",
                price: "Starting at $4,000",
                features: ["Supports whole-body repair", "Reduces systemic inflammation", "Restores energy and performance"],
                href: "/services"
              },
              {
                img: BLACK_LABEL_IMG,
                label: "03",
                title: "BLACK LABEL",
                sub: "Concierge Wellness",
                desc: "For the refined, high-performance individual who desires a team dedicated to excellence and longevity. Concierge-level access to advanced regenerative therapies.",
                price: "Investment plan specific",
                features: ["Concierge access to advanced treatments", "Personalized protocols for your goals", "Priority scheduling & exclusive benefits"],
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
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030d1e] via-[#030d1e]/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[#C9A84C]/30"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", lineHeight: 1 }}
                    >
                      {service.label}
                    </span>
                  </div>
                </div>
                <div className="bg-[#0a1628] p-8 border border-white/5 border-t-0">
                  <p className="section-label mb-2">{service.sub}</p>
                  <h3
                    className="text-white mb-4"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px", letterSpacing: "0.05em" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{service.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-white/60 text-xs">
                        <CheckCircle2 size={13} className="text-[#0047BB] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-[#C9A84C] text-sm font-semibold">{service.price}</span>
                    <Link href={service.href}>
                      <button className="flex items-center gap-2 text-white/60 text-xs hover:text-[#C9A84C] transition-colors group/btn">
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

      {/* ─── WHY CELLRX ─── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundImage: `url(${CLINIC_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/85" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="section-label mb-4">Why CellRX</p>
              <h2
                className="text-white mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)" }}
              >
                THE ULTIMATE IN<br />
                <span className="text-[#C9A84C]">LUXURY HEALTHCARE</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                CellRX was founded on a singular belief: that the most discerning individuals deserve medical care that matches their standards. We combine cutting-edge regenerative science with the discretion, precision, and white-glove service of a private members' club.
              </p>
              <Link href="/about">
                <button className="btn-primary rounded-none">
                  Our Story
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 fade-in">
              {[
                { title: "Discreet & Private", desc: "Treatment spaces designed for complete peace of mind and confidentiality." },
                { title: "World-Class Experts", desc: "Access to medical experts specializing in regenerative and longevity medicine." },
                { title: "White-Glove Service", desc: "Seamless, attentive service at every step of your experience." },
                { title: "Precision Care", desc: "Unmatched attention to detail, ensuring precision in every aspect of your care." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-card p-6"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="gold-rule mb-4" />
                  <h4
                    className="text-white mb-2"
                    style={{ fontFamily: "'Tenor Sans', serif", fontSize: "16px" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHYSICIAN SECTION ─── */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative fade-in">
              <div className="relative">
                <img
                  src={PHYSICIAN_IMG}
                  alt="CellRX Medical Director"
                  className="w-full max-w-md mx-auto object-cover"
                  style={{ aspectRatio: "3/4", objectFit: "cover" }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#051229] to-transparent" />
              </div>
              {/* Credential badge */}
              <div className="absolute top-8 -right-4 bg-[#0047BB] p-4 max-w-[160px] hidden lg:block">
                <p className="text-white text-xs font-bold tracking-wide uppercase leading-tight">Board Certified</p>
                <p className="text-white/70 text-xs mt-1">Regenerative Medicine</p>
              </div>
            </div>

            <div className="fade-up">
              <p className="section-label mb-4">Meet Our Medical Director</p>
              <h2
                className="text-white mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 60px)" }}
              >
                EXPERT CARE YOU<br />CAN TRUST
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-white/60 leading-relaxed mb-6">
                Our medical director brings years of specialized experience in regenerative medicine, combining the latest advances in stem cell science with a deep commitment to patient outcomes. Every protocol at CellRX is designed with precision, safety, and efficacy as the non-negotiable standard.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                We believe that exceptional healthcare begins with exceptional expertise. Our team is trained in the most advanced regenerative techniques, ensuring that every patient receives care that is not only cutting-edge but also deeply personalized.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Board Certified", sub: "Regenerative Medicine" },
                  { label: "10+ Years", sub: "Clinical Experience" },
                  { label: "500+ Patients", sub: "Successfully Treated" },
                ].map((cred, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[#C9A84C] text-sm font-semibold">{cred.label}</p>
                    <p className="text-white/40 text-xs mt-1">{cred.sub}</p>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <button className="btn-outline rounded-none">
                  Meet the Full Team
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
              className="text-white"
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
                quote: "After two years of knee pain that was threatening my career, CellRX gave me my life back. Within three months of the stem cell injection, I was back to full training. The level of care and attention was unlike anything I've experienced in traditional medicine.",
                treatment: "Stem Cell Injection"
              },
              {
                name: "Sarah T.",
                role: "CEO & Entrepreneur",
                stars: 5,
                quote: "The Black Label membership has completely transformed how I manage my health. Having a dedicated medical team that proactively monitors and optimizes my biology means I can focus entirely on my business and family. The ROI on my health has been extraordinary.",
                treatment: "Black Label Membership"
              },
              {
                name: "David L.",
                role: "Executive, Age 58",
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
                    <Star key={j} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{t.role}</p>
                  <p className="text-[#0047BB] text-xs mt-1">{t.treatment}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 fade-up">
            <Link href="/testimonials">
              <button className="btn-outline rounded-none">
                View All Testimonials
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
                className="text-white mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 52px)" }}
              >
                YOUR QUESTIONS<br />ANSWERED
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                We believe an informed patient is an empowered patient. Find answers to the most common questions about our treatments and protocols.
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
        <div className="absolute inset-0 bg-[#051229]/88" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4 fade-up">Begin Your Journey</p>
          <h2
            className="text-white mb-6 fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 80px)", transitionDelay: "0.1s" }}
          >
            SECURE YOUR PLACE IN<br />
            <span className="text-[#C9A84C]">OUR ELITE HEALTH PROGRAM</span>
          </h2>
          <p
            className="text-white/60 max-w-xl mx-auto mb-10 leading-relaxed fade-up"
            style={{ transitionDelay: "0.2s" }}
          >
            Our team is available to answer your questions and guide you through our exclusive health programs. Book a private consultation today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center fade-up" style={{ transitionDelay: "0.3s" }}>
            <Link href="/contact">
              <button className="btn-primary rounded-none">
                Book Your Consultation
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
