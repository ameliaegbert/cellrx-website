/*
 * CellRX Services Page — Editorial Dark Luxury
 * Detailed treatment protocols, pricing, process steps
 */

import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, ArrowRight, Clock, Shield, Star } from "lucide-react";

const INJECTION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_injection_3f039e48.webp";
const IV_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_iv_9142a5f3.webp";
const CLINIC_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/clinic_interior_31c757cf.webp";

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

export default function Services() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Header */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ backgroundImage: `url(${CLINIC_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/85" />
        <div className="container relative z-10">
          <p className="section-label mb-4">Our Treatments</p>
          <h1
            className="text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            PRECISION<br />
            <span className="text-[#0047BB]">REGENERATIVE</span><br />
            PROTOCOLS
          </h1>
        </div>
      </section>

      {/* Service 1: Stem Cell Injection */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative fade-in">
              <img
                src={INJECTION_IMG}
                alt="Stem Cell Injection"
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span
                  className="text-[#C9A84C]/20"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "80px", lineHeight: 1 }}
                >
                  01
                </span>
              </div>
            </div>
            <div className="fade-up">
              <p className="section-label mb-4">Targeted Joint Repair</p>
              <h2
                className="text-white mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                STEM CELL INJECTION
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-white/60 leading-relaxed mb-6">
                Our Stem Cell Injection therapy delivers a concentrated dose of regenerative biologics directly into the affected joint or tissue. This targeted approach gives your body the precise biologic signals it needs to repair damaged tissue, reduce chronic inflammation, and restore function — without surgery.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Ideal for patients dealing with knee, hip, shoulder, or spine conditions, this protocol has helped hundreds of patients avoid invasive procedures and return to the activities they love.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Repairs damaged tissue at the root cause",
                  "Reduces chronic joint inflammation",
                  "Restores mobility and range of motion",
                  "Avoids surgery and long recovery",
                  "Minimally invasive — under 60 minutes",
                  "Long-lasting regenerative effects",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#0047BB] shrink-0" />
                    <span className="text-white/60 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between p-6 border border-white/10 bg-[#030d1e] mb-6">
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Investment</p>
                  <p className="text-[#C9A84C] text-xl font-semibold">Starting at $2,500</p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <Clock size={16} className="text-[#C9A84C] mx-auto mb-1" />
                    <p className="text-white/40 text-xs">Under 60 min</p>
                  </div>
                  <div className="text-center">
                    <Shield size={16} className="text-[#C9A84C] mx-auto mb-1" />
                    <p className="text-white/40 text-xs">Minimally invasive</p>
                  </div>
                </div>
              </div>

              <Link href="/contact">
                <button className="btn-primary rounded-none">
                  Book This Treatment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: IV Therapy */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 fade-up">
              <p className="section-label mb-4">Full-Body Regeneration</p>
              <h2
                className="text-white mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                STEM CELL IV THERAPY
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-white/60 leading-relaxed mb-6">
                Our Stem Cell IV Therapy delivers a powerful infusion of regenerative biologics directly into the bloodstream, allowing them to travel throughout the body and target areas of inflammation, cellular damage, and metabolic dysfunction.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                This systemic approach is ideal for patients seeking whole-body optimization — from enhanced energy and cognitive clarity to accelerated recovery and immune support. It's the treatment of choice for high-performance individuals who demand more from their health.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Supports whole-body cellular repair",
                  "Reduces systemic inflammation",
                  "Restores energy and cognitive performance",
                  "Accelerates athletic recovery",
                  "Supports immune system function",
                  "Promotes long-term longevity",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#0047BB] shrink-0" />
                    <span className="text-white/60 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between p-6 border border-white/10 bg-[#051229] mb-6">
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Investment</p>
                  <p className="text-[#C9A84C] text-xl font-semibold">Starting at $4,000</p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <Clock size={16} className="text-[#C9A84C] mx-auto mb-1" />
                    <p className="text-white/40 text-xs">Under 60 min</p>
                  </div>
                  <div className="text-center">
                    <Star size={16} className="text-[#C9A84C] mx-auto mb-1" />
                    <p className="text-white/40 text-xs">Systemic benefits</p>
                  </div>
                </div>
              </div>

              <Link href="/contact">
                <button className="btn-primary rounded-none">
                  Book This Treatment
                </button>
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative fade-in">
              <img
                src={IV_IMG}
                alt="Stem Cell IV Therapy"
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span
                  className="text-[#C9A84C]/20"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "80px", lineHeight: 1 }}
                >
                  02
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="text-center mb-16 fade-up">
            <p className="section-label mb-4">The Process</p>
            <h2
              className="text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              YOUR JOURNEY TO RENEWAL
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "A private consultation with our medical director to assess your health history, goals, and candidacy for regenerative therapy." },
              { step: "02", title: "Custom Protocol", desc: "We design a personalized treatment protocol based on your unique biology, condition, and desired outcomes." },
              { step: "03", title: "Treatment", desc: "Your procedure is performed in our state-of-the-art clinic by expert clinicians in a comfortable, discreet environment." },
              { step: "04", title: "Follow-Up Care", desc: "Ongoing monitoring and support to track your progress and optimize your results over time." },
            ].map((step, i) => (
              <div key={i} className="relative fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <p
                  className="text-[#C9A84C]/15 mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "80px", lineHeight: 1 }}
                >
                  {step.step}
                </p>
                <h4
                  className="text-white mb-3"
                  style={{ fontFamily: "'Tenor Sans', serif", fontSize: "18px" }}
                >
                  {step.title}
                </h4>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                {i < 3 && (
                  <ArrowRight
                    size={20}
                    className="text-[#C9A84C]/30 absolute top-8 -right-4 hidden md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Black Label CTA */}
      <section className="py-20 bg-[#0047BB]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-white/70 text-xs tracking-widest uppercase mb-2">Premium Membership</p>
              <h2
                className="text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 4vw, 52px)" }}
              >
                EXPLORE BLACK LABEL
              </h2>
              <p className="text-white/70 mt-2 max-w-lg">
                For those who demand the ultimate in concierge regenerative care. Unlimited access, personalized protocols, and priority service.
              </p>
            </div>
            <Link href="/black-label">
              <button className="bg-white text-[#0047BB] font-bold text-xs tracking-widest uppercase px-10 py-4 hover:bg-[#F6F5EC] transition-colors whitespace-nowrap">
                Learn About Black Label
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
