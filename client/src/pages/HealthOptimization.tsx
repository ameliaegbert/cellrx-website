/*
 * CellRX Health Optimization Page — Editorial Dark Luxury
 * Brand Colors: #051229 Navy | #0047BB Blue | #FBB217 Amber | #F6F5EC Cream | #D6D7D9 Silver
 * Route: /health-optimization
 */

import { useEffect } from "react";
import { useSEO, PAGE_SEO, useBreadcrumb } from "@/hooks/useSEO";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { CheckCircle2, Activity, Brain, Zap, Shield, Heart, TrendingUp } from "lucide-react";

const CLINIC_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/clinic_interior_31c757cf.webp";
const IV_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_iv_9142a5f3.webp";
const PHYSICIAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/physician_portrait_d5fe25e9.webp";

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

const pillars = [
  {
    icon: <Activity size={22} className="text-[#FBB217]" />,
    title: "Metabolic Optimization",
    desc: "Comprehensive assessment and correction of insulin sensitivity, mitochondrial function, and metabolic efficiency. Most high performers are running on a compromised metabolic engine without knowing it.",
  },
  {
    icon: <Brain size={22} className="text-[#FBB217]" />,
    title: "Cognitive Performance",
    desc: "Targeted protocols to optimize neurotransmitter balance, reduce neuroinflammation, and support the biological conditions that sustain focus, memory, and executive function under pressure.",
  },
  {
    icon: <Zap size={22} className="text-[#FBB217]" />,
    title: "Energy & Recovery",
    desc: "Addressing the root causes of fatigue — mitochondrial dysfunction, adrenal dysregulation, nutrient deficiencies, and chronic inflammation — rather than masking symptoms with stimulants.",
  },
  {
    icon: <Shield size={22} className="text-[#FBB217]" />,
    title: "Immune Resilience",
    desc: "Strengthening the immune system's capacity to respond appropriately to threats while reducing the chronic, low-grade inflammation that silently degrades performance and accelerates aging.",
  },
  {
    icon: <Heart size={22} className="text-[#FBB217]" />,
    title: "Cardiovascular Health",
    desc: "Advanced cardiovascular risk assessment and optimization — going far beyond standard cholesterol panels to address the inflammatory, metabolic, and structural factors that drive cardiovascular disease.",
  },
  {
    icon: <TrendingUp size={22} className="text-[#FBB217]" />,
    title: "Hormonal Balance",
    desc: "Comprehensive hormonal assessment and optimization for both men and women — addressing the gradual declines that conventional medicine normalizes but that directly impact quality of life and performance.",
  },
];

const biomarkers = [
  "Fasting glucose, insulin, and HbA1c",
  "Full lipid panel with particle sizing (LDL-P, HDL-P)",
  "Inflammatory markers: hsCRP, homocysteine, fibrinogen",
  "Complete hormone panel: testosterone, estradiol, DHEA, cortisol, thyroid",
  "Mitochondrial function markers",
  "Nutrient status: vitamin D, B12, magnesium, ferritin, zinc",
  "Complete blood count and comprehensive metabolic panel",
  "Biological age and telomere length assessment",
];

const outcomes = [
  "Sustained energy without stimulant dependency",
  "Improved cognitive clarity and working memory",
  "Enhanced physical performance and recovery",
  "Reduced chronic pain and systemic inflammation",
  "Better sleep quality and restorative rest",
  "Optimized body composition",
  "Reduced cardiovascular and metabolic risk",
  "Measurable improvement in biological age markers",
];

export default function HealthOptimization() {
  useSEO(PAGE_SEO.healthOptimization);
  useBreadcrumb([
    { name: "Home", url: "https://www.cellrx.bio/" },
    { name: "Health Optimization", url: "https://www.cellrx.bio/health-optimization" },
  ]);
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ backgroundImage: `url(${CLINIC_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/85" />
        <div className="container relative z-10">
          <p className="section-label mb-4 fade-up">Personalized Medicine</p>
          <h1
            className="text-[#F6F5EC] fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 96px)", transitionDelay: "0.1s" }}
          >
            HEALTH<br />
            <span className="text-[#0047BB]">OPTIMIZATION</span>
          </h1>
          <p
            className="text-[#D6D7D9]/70 max-w-xl mt-6 leading-relaxed fade-up"
            style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "0.2s" }}
          >
            Most people accept declining energy, cognitive fog, and reduced resilience as inevitable consequences of aging. They are not. They are the measurable, addressable results of biological systems operating below their potential.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in">
              <img
                src={IV_IMG}
                alt="CellRX IV stem cell therapy for health optimization"
                className="w-full"
                style={{ aspectRatio: "4/3", objectFit: "cover" }}
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
            </div>
            <div className="fade-up">
              <p className="section-label mb-4">Our Philosophy</p>
              <h2
                className="text-[#F6F5EC] mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                OPTIMAL IS NOT<br />
                <span className="text-[#FBB217]">THE SAME AS NORMAL</span>
              </h2>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-6" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                The conventional medical system is designed to identify and treat disease. It is not designed to optimize health. A testosterone level of 300 ng/dL is within the reference range for a 60-year-old man. It is also associated with fatigue, cognitive decline, reduced muscle mass, and increased cardiovascular risk. Normal and optimal are not the same thing.
              </p>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-8" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                At CellRX, we begin with a comprehensive biomarker assessment that goes far beyond the standard annual physical. We identify not just what is wrong, but what is suboptimal — and we build personalized protocols to close the gap between where your biology is and where it can be.
              </p>
              <Link href="/contact">
                <button className="btn-primary rounded-none">Schedule Your Assessment</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Six Pillars */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="mb-16 fade-up">
            <p className="section-label mb-4">The Framework</p>
            <h2
              className="text-[#F6F5EC]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              SIX PILLARS OF<br />
              <span className="text-[#0047BB]">BIOLOGICAL OPTIMIZATION</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="glass-card p-8 fade-up"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="mb-4">{pillar.icon}</div>
                <div className="gold-rule mb-4" />
                <h3
                  className="text-[#F6F5EC] mb-3"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600 }}
                >
                  {pillar.title}
                </h3>
                <p className="text-[#D6D7D9]/60 text-sm leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biomarker Panel */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="fade-up">
              <p className="section-label mb-4">Diagnostic Foundation</p>
              <h2
                className="text-[#F6F5EC] mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 3.5vw, 48px)" }}
              >
                WHAT WE MEASURE
              </h2>
              <p className="text-[#D6D7D9]/70 leading-relaxed mb-8" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                Our comprehensive biomarker panel goes far beyond the standard annual physical. Every marker is selected because it provides actionable information about a specific biological system — and because optimizing it produces measurable improvements in how you feel and perform.
              </p>
              <ul className="space-y-3">
                {biomarkers.map((marker, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#D6D7D9]/70 text-sm" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                    <CheckCircle2 size={14} className="text-[#0047BB] shrink-0 mt-0.5" />
                    {marker}
                  </li>
                ))}
              </ul>
            </div>
            <div className="fade-up" style={{ transitionDelay: "0.15s" }}>
              <p className="section-label mb-4">Expected Outcomes</p>
              <h2
                className="text-[#F6F5EC] mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 3.5vw, 48px)" }}
              >
                WHAT YOU GAIN
              </h2>
              <p className="text-[#D6D7D9]/70 leading-relaxed mb-8" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                Health optimization is not about chasing numbers on a lab report. It is about translating biological improvements into real-world performance, resilience, and quality of life. These are the outcomes our patients consistently report.
              </p>
              <ul className="space-y-3">
                {outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#D6D7D9]/70 text-sm" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                    <CheckCircle2 size={14} className="text-[#FBB217] shrink-0 mt-0.5" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Physician Section */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="section-label mb-4">Physician-Directed</p>
              <h2
                className="text-[#F6F5EC] mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 3.5vw, 48px)" }}
              >
                YOUR PROTOCOL IS<br />
                <span className="text-[#FBB217]">NEVER GENERIC</span>
              </h2>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-6" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                Every health optimization protocol at CellRX is designed by our Medical Director based on your specific biomarker profile, health history, lifestyle, and goals. There are no templates. No one-size-fits-all supplements. No generic protocols pulled from a catalog.
              </p>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-8" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                Your protocol evolves with your biology. Quarterly reassessments allow us to track your progress, identify new opportunities for optimization, and adjust your approach as your markers improve. This is what continuous, physician-directed care looks like.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <button className="btn-primary rounded-none">Begin Your Assessment</button>
                </Link>
                <Link href="/black-label">
                  <button className="btn-outline rounded-none">Explore Black Label Membership</button>
                </Link>
              </div>
            </div>
            <div className="relative fade-in">
              <img
                src={PHYSICIAN_IMG}
                alt="Dr. Jacob Egbert — CellRX Medical Director, health optimization specialist"
                className="w-full max-w-md mx-auto block"
                style={{ aspectRatio: "3/4", objectFit: "cover", objectPosition: "50% 0%" }}
                loading="lazy"
                decoding="async"
                width="600"
                height="800"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#051229] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0047BB]">
        <div className="container text-center">
          <p className="text-white/60 text-xs tracking-widest uppercase mb-4 fade-up" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The First Step
          </p>
          <h2
            className="text-white mb-6 fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", transitionDelay: "0.1s" }}
          >
            YOUR BIOLOGY IS WAITING<br />TO BE OPTIMIZED
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-10 leading-relaxed fade-up" style={{ fontFamily: "'Libre Franklin', sans-serif", transitionDelay: "0.2s" }}>
            A private consultation with our Medical Director is the starting point. He will review your history, assess your current markers, and design a protocol built entirely around your biology.
          </p>
          <div className="flex flex-wrap gap-4 justify-center fade-up" style={{ transitionDelay: "0.3s" }}>
            <Link href="/contact">
              <button className="btn-primary rounded-none bg-[#FBB217] text-[#051229] hover:bg-[#FBB217]/90 border-[#FBB217]">
                Book Your Private Consultation
              </button>
            </Link>
            <a href="tel:3857072373">
              <button className="btn-outline rounded-none border-white text-white hover:bg-white hover:text-[#0047BB]">
                Call 385-707-2373
              </button>
            </a>
          </div>
        </div>
      </section>

      <BackToTop />
      <Footer />
    </div>
  );
}
