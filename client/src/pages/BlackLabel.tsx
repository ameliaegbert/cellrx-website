/*
 * CellRX Black Label Page — Editorial Dark Luxury
 * Premium concierge membership with exclusive benefits
 */

import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Crown, Zap, Shield, Clock } from "lucide-react";

const BLACK_LABEL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_black_label_1c68d442.webp";
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

export default function BlackLabel() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-[70vh] flex items-end overflow-hidden"
        style={{ backgroundImage: `url(${BLACK_LABEL_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#051229] via-[#051229]/50 to-transparent" />
        <div className="container relative z-10 pb-20 pt-40">
          <p className="section-label mb-4 fade-up">Exclusive Membership</p>
          <h1
            className="text-white fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 8vw, 120px)", lineHeight: 0.9, transitionDelay: "0.1s" }}
          >
            BLACK<br />
            <span className="text-[#C9A84C]">LABEL</span>
          </h1>
          <p
            className="text-white/60 text-lg max-w-xl mt-6 leading-relaxed fade-up"
            style={{ transitionDelay: "0.2s" }}
          >
            For the refined, high-performance individual who demands a team dedicated to excellence, longevity, and the relentless pursuit of optimal health.
          </p>
        </div>
      </section>

      {/* What is Black Label */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="section-label mb-4">The Pinnacle of Care</p>
              <h2
                className="text-white mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                CONCIERGE HEALTH<br />
                <span className="text-[#C9A84C]">REDEFINED</span>
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-white/60 leading-relaxed mb-6">
                Black Label is CellRX's most exclusive membership program — a bespoke health optimization experience designed for individuals who refuse to accept anything less than the absolute best. As a Black Label member, you gain direct access to our most advanced regenerative therapies, a dedicated medical team, and protocols built entirely around your biology and goals.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                This is not a subscription. It is a partnership. We become your health allies, proactively monitoring your biomarkers, optimizing your protocols, and ensuring that you are always performing at your peak — physically, cognitively, and metabolically.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 fade-in">
              {[
                { icon: <Crown size={20} className="text-[#C9A84C]" />, title: "Concierge Access", desc: "Direct line to your medical team, priority scheduling, and after-hours support." },
                { icon: <Zap size={20} className="text-[#C9A84C]" />, title: "Advanced Protocols", desc: "Access to our most cutting-edge regenerative and longevity interventions." },
                { icon: <Shield size={20} className="text-[#C9A84C]" />, title: "Proactive Monitoring", desc: "Regular biomarker testing and health assessments to stay ahead of decline." },
                { icon: <Clock size={20} className="text-[#C9A84C]" />, title: "Priority Service", desc: "Same-week appointments, no waiting rooms, and a seamless experience." },
              ].map((item, i) => (
                <div key={i} className="p-6 border border-[#C9A84C]/20 bg-[#030d1e]">
                  <div className="mb-3">{item.icon}</div>
                  <h4
                    className="text-white mb-2"
                    style={{ fontFamily: "'Tenor Sans', serif", fontSize: "15px" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="text-center mb-16 fade-up">
            <p className="section-label mb-4">Membership Benefits</p>
            <h2
              className="text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              EVERYTHING INCLUDED
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Unlimited consultations with your dedicated medical team",
              "Annual stem cell IV therapy infusion",
              "Quarterly stem cell injection treatments",
              "Comprehensive biomarker and hormone panel testing",
              "Personalized longevity and optimization protocols",
              "Priority scheduling — same-week appointments guaranteed",
              "Direct physician access via secure messaging",
              "Exclusive member events and health education",
              "Discounts on additional regenerative treatments",
              "Concierge coordination for specialist referrals",
              "Personalized nutrition and lifestyle optimization guidance",
              "Annual health optimization review and goal-setting session",
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 border border-white/5 bg-[#051229] fade-up"
                style={{ transitionDelay: `${(i % 6) * 0.08}s` }}
              >
                <CheckCircle2 size={15} className="text-[#C9A84C] shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="fade-up">
              <p className="section-label mb-4">Ideal For</p>
              <h2
                className="text-white mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 4vw, 48px)" }}
              >
                IS BLACK LABEL<br />RIGHT FOR YOU?
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Black Label is designed for high-achieving individuals who understand that health is their most valuable asset — and are willing to invest in protecting it.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 fade-in">
              {[
                { title: "C-Suite Executives", desc: "Who need to perform at peak cognitive and physical capacity, day after day." },
                { title: "Professional Athletes", desc: "Seeking accelerated recovery, injury prevention, and longevity in their sport." },
                { title: "High-Net-Worth Individuals", desc: "Who demand the same level of excellence in their healthcare as in every other area of life." },
                { title: "Longevity-Focused Individuals", desc: "Who are proactively investing in their health span, not just their lifespan." },
              ].map((profile, i) => (
                <div key={i} className="p-6 border border-[#C9A84C]/15 bg-[#030d1e]">
                  <div className="gold-rule mb-4" />
                  <h4
                    className="text-white mb-2"
                    style={{ fontFamily: "'Tenor Sans', serif", fontSize: "16px" }}
                  >
                    {profile.title}
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">{profile.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ backgroundImage: `url(${BG_DARK_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/90" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4 fade-up">Apply for Membership</p>
          <h2
            className="text-white mb-6 fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 80px)", transitionDelay: "0.1s" }}
          >
            MEMBERSHIP IS<br />
            <span className="text-[#C9A84C]">BY INVITATION ONLY</span>
          </h2>
          <p
            className="text-white/60 max-w-xl mx-auto mb-10 leading-relaxed fade-up"
            style={{ transitionDelay: "0.2s" }}
          >
            Black Label membership is limited to ensure every member receives the full attention and resources they deserve. Inquire today to begin the application process.
          </p>
          <Link href="/contact">
            <button className="btn-primary rounded-none fade-up" style={{ transitionDelay: "0.3s" }}>
              Inquire About Membership
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
