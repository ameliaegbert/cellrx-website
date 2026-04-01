/*
 * CellRX Black Label Page — Editorial Dark Luxury
 * Brand Colors: #051229 Navy | #0047BB Blue | #FBB217 Amber | #F6F5EC Cream | #36454F Charcoal | #D6D7D9 Silver
 * Copy: Luxury sales psychology — exclusivity, scarcity, identity-based selling, premium anchoring
 * Pricing: $28,000/year | +$20,000 spouse add-on | Stem cells available as premium add-on
 */

import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Crown, Zap, Shield, Clock, FlaskConical, Plus } from "lucide-react";

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
          <p className="section-label mb-4 fade-up">Exclusive Annual Membership</p>
          <h1
            className="text-[#F6F5EC] fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 8vw, 120px)", lineHeight: 0.9, transitionDelay: "0.1s" }}
          >
            BLACK<br />
            <span className="text-[#FBB217]">LABEL</span>
          </h1>
          <p
            className="text-[#D6D7D9]/80 text-lg max-w-xl mt-6 leading-relaxed fade-up"
            style={{ transitionDelay: "0.2s" }}
          >
            For the individual who understands that health is not a cost — it is the highest-return investment they will ever make.
          </p>
        </div>
      </section>

      {/* What is Black Label */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="section-label mb-4">The Pinnacle of Concierge Care</p>
              <h2
                className="text-[#F6F5EC] mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                HEALTH OPTIMIZATION<br />
                <span className="text-[#FBB217]">AT THE HIGHEST LEVEL</span>
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-6">
    The CellRX Investment Plan is not a subscription. It is a partnership. A year-round commitment between you and a medical team that is proactively invested in your biology, your performance, and your longevity — not just your symptoms.
              </p>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-8">
                As an Investment Plan member, you receive quarterly laboratory panels, personalized optimization protocols, direct physician access, and priority scheduling — all designed around your unique biology and goals. Stem cell treatments are available as a premium add-on, giving you the flexibility to integrate the most advanced regenerative therapies at the pace and intensity that serves you best.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 fade-in">
              {[
                { icon: <Crown size={20} className="text-[#FBB217]" />, title: "Concierge Access", desc: "Direct line to your physician, priority scheduling, and after-hours support." },
                { icon: <FlaskConical size={20} className="text-[#FBB217]" />, title: "Quarterly Lab Panels", desc: "Comprehensive biomarker testing four times per year to stay ahead of decline." },
                { icon: <Zap size={20} className="text-[#FBB217]" />, title: "Personalized Protocols", desc: "Longevity and optimization strategies built entirely around your biology." },
                { icon: <Shield size={20} className="text-[#FBB217]" />, title: "Proactive Medicine", desc: "We don't wait for problems to appear. We prevent them before they begin." },
              ].map((item, i) => (
                <div key={i} className="p-6 border border-[#FBB217]/20 bg-[#030d1e]">
                  <div className="mb-3">{item.icon}</div>
                  <h4
                    className="text-[#F6F5EC] mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-[#D6D7D9]/60 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="text-center mb-16 fade-up">
            <p className="section-label mb-4">Membership Investment</p>
            <h2
              className="text-[#F6F5EC]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              TRANSPARENT. COMPREHENSIVE. WORTH IT.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Individual */}
            <div className="col-span-1 md:col-span-1 p-8 border border-[#FBB217]/30 bg-[#051229] fade-up">
              <p className="text-[#FBB217] text-xs tracking-widest uppercase mb-4">Individual Investment Plan</p>
              <div className="mb-2">
                <span className="text-[#F6F5EC] text-4xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>$28,000</span>
                <span className="text-[#D6D7D9]/50 text-sm ml-2">/ year</span>
              </div>
              <div className="gold-rule mb-6" />
              <ul className="space-y-3 mb-8">
                {[
                  "Quarterly biomarker & hormone lab panels",
                  "Unlimited consultations with your physician",
                  "Personalized longevity & optimization protocols",
                  "Direct physician access via secure messaging",
                  "Priority scheduling — same-week guaranteed",
                  "Annual health optimization review",
                  "Exclusive member events & education",
                  "Concierge specialist referral coordination",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#FBB217] shrink-0 mt-0.5" />
                    <span className="text-[#D6D7D9]/70 text-sm">{b}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <button className="btn-primary rounded-none w-full">Apply for Your Investment Plan</button>
              </Link>
            </div>

            {/* Spouse Add-On */}
            <div className="p-8 border border-white/10 bg-[#030d1e] fade-up" style={{ transitionDelay: "0.1s" }}>
              <p className="text-[#D6D7D9]/60 text-xs tracking-widest uppercase mb-4">Spouse Investment Add-On</p>
              <div className="mb-2">
                <span className="text-[#F6F5EC] text-4xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>+$20,000</span>
                <span className="text-[#D6D7D9]/50 text-sm ml-2">/ year</span>
              </div>
              <div className="gold-rule mb-6" />
              <p className="text-[#D6D7D9]/70 text-sm leading-relaxed mb-6">
                Extend the full Investment Plan experience to your spouse or partner. They receive all the same benefits — quarterly labs, personalized protocols, direct physician access, and priority scheduling — at a significant value relative to individual enrollment.
              </p>
              <p className="text-[#D6D7D9]/50 text-xs leading-relaxed">
                Available exclusively to existing Investment Plan members. Requires active individual membership.
              </p>
            </div>

            {/* Stem Cell Add-On */}
            <div className="p-8 border border-[#0047BB]/30 bg-[#030d1e] fade-up" style={{ transitionDelay: "0.2s" }}>
              <div className="flex items-center gap-2 mb-4">
                <Plus size={14} className="text-[#0047BB]" />
                <p className="text-[#0047BB] text-xs tracking-widest uppercase">Premium Add-On</p>
              </div>
              <div className="mb-2">
                <span className="text-[#F6F5EC] text-4xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>$1,250</span>
                <span className="text-[#D6D7D9]/50 text-sm ml-2">per CC</span>
              </div>
              <div className="gold-rule mb-6" />
              <p className="text-[#D6D7D9]/70 text-sm leading-relaxed mb-6">
                Stem cell treatments — both injection and IV therapy — are available as a premium add-on to your Black Label membership. Protocols range from 1 to 10 CC, with dosing determined by your physician based on your goals and biology.
              </p>
              <p className="text-[#D6D7D9]/50 text-xs leading-relaxed">
                Every biologic carries full chain of custody. Never diluted. Never replicated. Sourced from healthy, consented local births.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="text-center mb-16 fade-up">
            <p className="section-label mb-4">Everything Included</p>
            <h2
              className="text-[#F6F5EC]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              YOUR INVESTMENT PLAN AT A GLANCE
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Quarterly comprehensive biomarker & hormone lab panels",
              "Unlimited consultations with your dedicated Medical Director",
              "Personalized longevity, nutrition, and optimization protocols",
              "Priority scheduling — same-week appointments guaranteed",
              "Direct physician access via secure messaging",
              "Exclusive member events and health education sessions",
              "Concierge coordination for specialist referrals",
              "Annual health optimization review and goal-setting session",
              "Stem cell injection and IV therapy available as premium add-ons",
              "Spouse add-on available for $20,000 per year",
              "Discounts on additional regenerative treatments",
              "Access to the most advanced protocols as they become available",
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 border border-white/5 bg-[#030d1e] fade-up"
                style={{ transitionDelay: `${(i % 6) * 0.08}s` }}
              >
                <CheckCircle2 size={15} className="text-[#FBB217] shrink-0 mt-0.5" />
                <span className="text-[#D6D7D9]/70 text-sm leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="fade-up">
              <p className="section-label mb-4">Ideal For</p>
              <h2
                className="text-[#F6F5EC] mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 4vw, 48px)" }}
              >
                IS THE INVESTMENT PLAN<br />RIGHT FOR YOU?
              </h2>
              <p className="text-[#D6D7D9]/60 text-sm leading-relaxed">
                The CellRX Investment Plan is designed for high-achieving individuals who understand that health is their most valuable asset — and who are unwilling to leave it to chance or reactive care.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 fade-in">
              {[
                { title: "C-Suite Executives", desc: "Who need to perform at peak cognitive and physical capacity, day after day, year after year." },
                { title: "Professional Athletes", desc: "Seeking accelerated recovery, injury prevention, and the longevity to extend their career on their terms." },
                { title: "High-Net-Worth Individuals", desc: "Who demand the same standard of excellence in their healthcare as in every other area of their life." },
                { title: "Longevity-Focused Individuals", desc: "Who are proactively investing in their health span — not waiting for decline to make the first move." },
              ].map((profile, i) => (
                <div key={i} className="p-6 border border-[#FBB217]/15 bg-[#051229]">
                  <div className="gold-rule mb-4" />
                  <h4
                    className="text-[#F6F5EC] mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px" }}
                  >
                    {profile.title}
                  </h4>
                  <p className="text-[#D6D7D9]/60 text-sm leading-relaxed">{profile.desc}</p>
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
        <div className="absolute inset-0 bg-[#051229]/92" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4 fade-up">Begin Your Investment</p>
          <h2
            className="text-[#F6F5EC] mb-6 fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 80px)", transitionDelay: "0.1s" }}
          >
            YOUR INVESTMENT PLAN<br />
            <span className="text-[#FBB217]">IS LIMITED BY DESIGN</span>
          </h2>
          <p
            className="text-[#D6D7D9]/70 max-w-xl mx-auto mb-10 leading-relaxed fade-up"
            style={{ transitionDelay: "0.2s" }}
          >
            We deliberately limit the Investment Plan to ensure every member receives the full attention, resources, and physician access they deserve. If you are ready to invest in your health at the highest level, we invite you to begin the conversation.
          </p>
          <p
            className="text-[#FBB217]/80 text-xs tracking-widest uppercase max-w-md mx-auto mb-8 fade-up"
            style={{ transitionDelay: "0.25s" }}
          >
            Referral programs are available — ask about our referral program during your private consultation.
          </p>
          <Link href="/contact">
            <button className="btn-amber rounded-none fade-up" style={{ transitionDelay: "0.3s" }}>
              Inquire About Your Investment Plan
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
