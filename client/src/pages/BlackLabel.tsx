/*
 * CellRX Concierge Medicine / Black Label Page — StoryBrand + Luxury Psychology
 * Brand Colors: #051229 Navy | #0047BB Blue | #FBB217 Amber | #F6F5EC Cream | #D6D7D9 Silver
 * Copy Framework: StoryBrand — You are the hero. We are the guide. Here is the plan. Here is what's at stake.
 * Psychology: Identity-based selling, scarcity, exclusivity, premium anchoring, social proof
 * Pricing: Custom / plan-specific — never disclosed publicly
 */

import { useEffect, useState } from "react";
import { useSEO, PAGE_SEO, useBreadcrumb, useFAQSchema } from "@/hooks/useSEO";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { CheckCircle2, Crown, Zap, Shield, FlaskConical, Plus, Minus, Lock, ArrowRight } from "lucide-react";

const BLACK_LABEL_FAQS = [
  {
    q: "What is included in CellRX Black Label Concierge Medicine?",
    a: "Black Label includes quarterly comprehensive laboratory panels, personalized longevity protocols, direct physician access (secure messaging and same-week appointments), priority scheduling, and unlimited consultations. Stem cell treatments are available as a premium add-on. Spouse enrollment is also available. Membership is limited by design to ensure every member receives the full attention and resources they deserve."
  },
  {
    q: "How much does Black Label Concierge Medicine cost?",
    a: "Black Label membership pricing is custom and discussed privately during your consultation — because your protocol is not generic, and neither is your investment. Pricing reflects the level of physician access, the comprehensiveness of your quarterly panels, and any add-on services included in your personalized plan."
  },
  {
    q: "Who is Black Label Concierge Medicine designed for?",
    a: "Black Label is designed for high-performing individuals — executives, entrepreneurs, athletes, and professionals — who understand that proactive health investment is leverage, not luxury. It is for those who are not satisfied with the reactive model of conventional healthcare and who want a physician who knows their biology intimately and monitors it continuously."
  },
  {
    q: "What does a quarterly lab panel include at CellRX?",
    a: "A comprehensive quarterly lab panel at CellRX goes far beyond the standard annual physical. It includes a full metabolic panel, complete blood count, lipid panel with particle sizing, inflammatory markers, hormone panel, insulin and glucose metabolism markers, nutrient status, and longevity biomarkers including biological age assessments."
  },
  {
    q: "Is stem cell therapy included in Black Label membership?",
    a: "Stem cell treatments are available as a premium add-on to Black Label membership. Injection therapy starts at $2,500 and IV therapy starts at $4,000, priced at $1,250 per CC. Black Label members receive priority scheduling and physician-directed protocol design for all regenerative treatments."
  },
];

function BlackLabelFAQItem({ q, a }: { q: string; a: string }) {
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

const BLACK_LABEL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/service_black_label_1c68d442.webp";
const BG_DARK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/background_dark_fb24a343.webp";
const CLINIC_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/clinic_interior_31c757cf.webp";

const TITLE_FONT = "'Bebas Neue', sans-serif";
const SUBTITLE_FONT = "'DM Sans', sans-serif";
const BODY_FONT = "'Libre Franklin', sans-serif";

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
  useSEO(PAGE_SEO.blackLabel);
  useBreadcrumb([
    { name: "Home", url: "https://www.cellrx.bio/" },
    { name: "Black Label Concierge", url: "https://www.cellrx.bio/black-label" },
  ]);
  useFAQSchema(
    BLACK_LABEL_FAQS.map((f) => ({ question: f.q, answer: f.a })),
    "black-label"
  );
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        className="relative min-h-[80vh] flex items-end overflow-hidden"
        style={{ backgroundImage: `url(${BLACK_LABEL_IMG})`, backgroundSize: "cover", backgroundPosition: "center 30%" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#051229] via-[#051229]/60 to-transparent" />
        <div className="container relative z-10 pb-24 pt-48">
          <p className="section-label mb-4 fade-up">Exclusive Annual Membership</p>
          <h1
            className="text-[#F6F5EC] fade-up"
            style={{ fontFamily: TITLE_FONT, fontSize: "clamp(56px, 8vw, 120px)", lineHeight: 0.9, transitionDelay: "0.1s" }}
          >
            BLACK<br />
            <span className="text-[#FBB217]">LABEL</span>
          </h1>
          <p
            className="text-[#D6D7D9]/80 text-lg max-w-2xl mt-6 leading-relaxed fade-up"
            style={{ transitionDelay: "0.2s", fontFamily: BODY_FONT }}
          >
            CellRX Black Label is an exclusive annual concierge medicine membership in Lehi, Utah for executives, athletes, and high-net-worth individuals who demand proactive, physician-directed healthcare. Membership includes quarterly laboratory panels, personalized longevity protocols, direct access to Dr. Jacob Egbert, priority scheduling, and unlimited consultations. Stem cell treatments are available as a premium add-on. Membership is limited by design. Pricing is custom and determined during a private consultation.
          </p>
          <div className="mt-10 fade-up" style={{ transitionDelay: "0.3s" }}>
            <Link href="/contact">
              <button className="btn-amber rounded-none flex items-center gap-2">
                Begin the Conversation <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-10 bg-[#030d1e] border-b border-white/5">
        <div className="container">
          <p className="text-[#FBB217] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: BODY_FONT }}>Key Takeaways</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Exclusive annual membership — limited enrollment by design",
              "Quarterly comprehensive laboratory panels included",
              "Direct physician access — secure messaging and same-week appointments",
              "Personalized longevity protocols tailored to your biology",
              "Stem cell treatments available as a premium add-on",
              "Pricing is custom and discussed privately during consultation",
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-[#D6D7D9]/80 text-sm" style={{ fontFamily: BODY_FONT }}>
                <span className="text-[#FBB217] shrink-0 mt-0.5" aria-hidden="true">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── THE PROBLEM (StoryBrand: Name the villain) ─── */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="section-label mb-4">The Problem With Conventional Medicine</p>
              <h2
                className="text-[#F6F5EC] mb-6"
                style={{ fontFamily: TITLE_FONT, fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                REACTIVE MEDICINE<br />
                <span className="text-[#FBB217]">IS NOT ENOUGH</span>
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-6" style={{ fontFamily: BODY_FONT }}>
                The conventional healthcare system is designed to respond to problems — not prevent them. You wait for something to go wrong. You get a 15-minute appointment. You receive a prescription. You leave with no real understanding of what is happening inside your body, and no plan for what comes next.
              </p>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-8" style={{ fontFamily: BODY_FONT }}>
                For high-performing individuals, this is not acceptable. Your biology is your most valuable asset. The question is not whether you can afford to invest in it — it is whether you can afford not to.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 fade-in">
              {[
                { icon: <Crown size={20} className="text-[#FBB217]" />, title: "Reactive, Not Proactive", desc: "Conventional medicine waits for decline. Black Label prevents it before it begins." },
                { icon: <FlaskConical size={20} className="text-[#FBB217]" />, title: "No Visibility", desc: "Most patients have never seen a comprehensive biomarker panel. You deserve to know your numbers." },
                { icon: <Zap size={20} className="text-[#FBB217]" />, title: "Generic Protocols", desc: "Cookie-cutter treatment plans ignore your unique biology. Your protocol should be built for you." },
                { icon: <Shield size={20} className="text-[#FBB217]" />, title: "No Access", desc: "When you need your physician, you wait weeks. Black Label members have a direct line." },
              ].map((item, i) => (
                <div key={i} className="p-6 border border-[#FBB217]/20 bg-[#030d1e]">
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="text-[#F6F5EC] mb-2" style={{ fontFamily: SUBTITLE_FONT, fontSize: "15px" }}>{item.title}</h3>
                  <p className="text-[#D6D7D9]/60 text-xs leading-relaxed" style={{ fontFamily: BODY_FONT }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE GUIDE (StoryBrand: We have a plan) ─── */}
      <section className="py-20 bg-[#0047BB]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <Lock size={40} className="text-white shrink-0 mt-1" />
            <div>
              <h3 className="text-white mb-3" style={{ fontFamily: TITLE_FONT, fontSize: "clamp(28px, 3vw, 40px)" }}>
                A DIFFERENT KIND OF PARTNERSHIP
              </h3>
              <p className="text-white leading-relaxed max-w-3xl" style={{ fontFamily: BODY_FONT, opacity: 0.92 }}>
                Black Label is not a subscription. It is a year-round medical partnership — a commitment between you and a physician who is proactively invested in your biology, your performance, and your longevity. Every quarter, we review your biomarkers. Every visit, we refine your protocol. Every day, you have direct access to the physician who knows your body as well as you do. This is the standard of care you have always deserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MEMBERSHIP TIERS ─── */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="text-center mb-16 fade-up">
            <p className="section-label mb-4">Your Partnership</p>
            <h2
              className="text-[#F6F5EC]"
              style={{ fontFamily: TITLE_FONT, fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              EVERYTHING YOUR MEMBERSHIP DELIVERS
            </h2>
            <p className="text-[#D6D7D9]/60 max-w-2xl mx-auto mt-4" style={{ fontFamily: BODY_FONT }}>
              Black Label membership is structured around three pillars of elite health — each designed to work together as a complete system for your biology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {/* Tier 1: Foundation */}
            <div className="p-8 border border-[#FBB217]/30 bg-[#051229] fade-up flex flex-col">
              <div className="mb-6">
                <p className="text-[#FBB217] text-xs tracking-widest uppercase mb-3" style={{ fontFamily: SUBTITLE_FONT }}>Pillar One</p>
                <h3 className="text-[#F6F5EC] mb-2" style={{ fontFamily: TITLE_FONT, fontSize: "32px" }}>VISIBILITY</h3>
                <p className="text-[#D6D7D9]/60 text-sm" style={{ fontFamily: BODY_FONT }}>Know your biology at a level most physicians never offer.</p>
              </div>
              <div className="gold-rule mb-6" />
              <ul className="space-y-3 flex-1">
                {[
                  "Quarterly comprehensive biomarker & hormone lab panels",
                  "Annual full-body health optimization review",
                  "Detailed interpretation of every result — in plain language",
                  "Baseline assessment and goal-setting session at enrollment",
                  "Ongoing tracking of key longevity and performance markers",
                  "Early identification of trends before they become problems",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#FBB217] shrink-0 mt-0.5" />
                    <span className="text-[#D6D7D9]/70 text-sm" style={{ fontFamily: BODY_FONT }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tier 2: Access */}
            <div className="p-8 border border-[#FBB217]/60 bg-[#051229] fade-up flex flex-col relative" style={{ transitionDelay: "0.1s" }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FBB217] px-4 py-1">
                <span className="text-[#051229] text-xs font-bold tracking-widest uppercase" style={{ fontFamily: SUBTITLE_FONT }}>Core Membership</span>
              </div>
              <div className="mb-6 mt-2">
                <p className="text-[#FBB217] text-xs tracking-widest uppercase mb-3" style={{ fontFamily: SUBTITLE_FONT }}>Pillar Two</p>
                <h3 className="text-[#F6F5EC] mb-2" style={{ fontFamily: TITLE_FONT, fontSize: "32px" }}>ACCESS</h3>
                <p className="text-[#D6D7D9]/60 text-sm" style={{ fontFamily: BODY_FONT }}>Your physician, when you need them — not when the system allows it.</p>
              </div>
              <div className="gold-rule mb-6" />
              <ul className="space-y-3 flex-1">
                {[
                  "Unlimited consultations with your dedicated Medical Director",
                  "Direct physician access via secure messaging",
                  "Priority scheduling — same-week appointments guaranteed",
                  "After-hours support for urgent questions",
                  "Concierge coordination for specialist referrals",
                  "Exclusive member events and health education sessions",
                  "Spouse enrollment available — pricing is custom to your plan",
                  "Discounts on additional regenerative treatments",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#FBB217] shrink-0 mt-0.5" />
                    <span className="text-[#D6D7D9]/70 text-sm" style={{ fontFamily: BODY_FONT }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tier 3: Optimization */}
            <div className="p-8 border border-white/10 bg-[#030d1e] fade-up flex flex-col" style={{ transitionDelay: "0.2s" }}>
              <div className="mb-6">
                <p className="text-[#D6D7D9]/60 text-xs tracking-widest uppercase mb-3" style={{ fontFamily: SUBTITLE_FONT }}>Pillar Three</p>
                <h3 className="text-[#F6F5EC] mb-2" style={{ fontFamily: TITLE_FONT, fontSize: "32px" }}>OPTIMIZATION</h3>
                <p className="text-[#D6D7D9]/60 text-sm" style={{ fontFamily: BODY_FONT }}>A living protocol, refined continuously around your biology and goals.</p>
              </div>
              <div className="gold-rule mb-6" />
              <ul className="space-y-3 flex-1">
                {[
                  "Personalized longevity, nutrition, and performance protocols",
                  "Continuous protocol refinement based on lab results",
                  "Hormone optimization and metabolic health strategies",
                  "Sleep, recovery, and cognitive performance guidance",
                  "Access to the most advanced protocols as they become available",
                  "Stem cell injection and IV therapy available as premium add-ons ($1,250/CC)",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#FBB217] shrink-0 mt-0.5" />
                    <span className="text-[#D6D7D9]/70 text-sm" style={{ fontFamily: BODY_FONT }}>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Plus size={13} className="text-[#6DB3F2]" />
                  <p className="text-[#6DB3F2] text-xs tracking-widest uppercase" style={{ fontFamily: SUBTITLE_FONT }}>Stem Cell Add-On</p>
                </div>
                <p className="text-[#D6D7D9]/50 text-xs leading-relaxed" style={{ fontFamily: BODY_FONT }}>
                  Stem cell treatments — both injection and IV — are available as a premium add-on. Protocols range from 1 to 10 CC. Every biologic carries full chain of custody. Never diluted. Never replicated.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing note */}
          <div className="text-center mt-12 fade-up">
            <p className="text-[#D6D7D9]/40 text-sm" style={{ fontFamily: BODY_FONT }}>
              Membership pricing is custom and determined during your private consultation. We do not publish rates publicly — because your protocol is not generic, and neither is your investment.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR (StoryBrand: The hero) ─── */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="fade-up">
              <p className="section-label mb-4">Is This You?</p>
              <h2
                className="text-[#F6F5EC] mb-6"
                style={{ fontFamily: TITLE_FONT, fontSize: "clamp(32px, 4vw, 48px)" }}
              >
                BLACK LABEL IS<br />
                <span className="text-[#FBB217]">BUILT FOR THE EXCEPTIONAL</span>
              </h2>
              <p className="text-[#D6D7D9]/60 text-sm leading-relaxed" style={{ fontFamily: BODY_FONT }}>
                Black Label is not for everyone — and that is by design. It is built for individuals who have already decided that their health is a priority, and who are ready to invest in it at the level it deserves.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 fade-in">
              {[
                { title: "C-Suite Executives", desc: "Who need to perform at peak cognitive and physical capacity, day after day, year after year — and cannot afford to decline." },
                { title: "Professional Athletes", desc: "Seeking accelerated recovery, injury prevention, and the longevity to extend their career entirely on their own terms." },
                { title: "High-Net-Worth Individuals", desc: "Who demand the same standard of excellence in their healthcare as in every other area of their life. No compromises." },
                { title: "Longevity-Focused Individuals", desc: "Who are proactively investing in their health span — not waiting for decline to make the first move." },
              ].map((profile, i) => (
                <div key={i} className="p-6 border border-[#FBB217]/15 bg-[#030d1e]">
                  <div className="gold-rule mb-4" />
                  <h3 className="text-[#F6F5EC] mb-2" style={{ fontFamily: SUBTITLE_FONT, fontSize: "16px", fontWeight: 600 }}>{profile.title}</h3>
                  <p className="text-[#D6D7D9]/60 text-sm leading-relaxed" style={{ fontFamily: BODY_FONT }}>{profile.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STAKES (StoryBrand: What happens if you don't act) ─── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundImage: `url(${CLINIC_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/90" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center fade-up">
            <p className="section-label mb-4">The Cost of Waiting</p>
            <h2
              className="text-[#F6F5EC] mb-6"
              style={{ fontFamily: TITLE_FONT, fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              EVERY YEAR YOU WAIT<br />
              <span className="text-[#FBB217]">IS A YEAR OF COMPOUNDING DECLINE</span>
            </h2>
            <p className="text-[#D6D7D9]/70 leading-relaxed mb-4" style={{ fontFamily: BODY_FONT }}>
              The individuals who thrive into their 60s, 70s, and beyond are not the ones who reacted to decline — they are the ones who invested in prevention decades earlier. Biology does not wait. Inflammation accumulates. Hormones shift. Cellular repair slows. The question is not whether these changes are happening — it is whether you have a physician who is actively working to reverse them.
            </p>
            <p className="text-[#D6D7D9]/70 leading-relaxed" style={{ fontFamily: BODY_FONT }}>
              Black Label exists for the individual who has decided that the answer is yes.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA (StoryBrand: The call to action) ─── */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ backgroundImage: `url(${BG_DARK_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/92" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4 fade-up">Membership Is Limited By Design</p>
          <h2
            className="text-[#F6F5EC] mb-6 fade-up"
            style={{ fontFamily: TITLE_FONT, fontSize: "clamp(40px, 6vw, 80px)", transitionDelay: "0.1s" }}
          >
            WE ACCEPT A SMALL NUMBER<br />
            <span className="text-[#FBB217]">OF NEW MEMBERS EACH YEAR</span>
          </h2>
          <p
            className="text-[#D6D7D9]/70 max-w-xl mx-auto mb-10 leading-relaxed fade-up"
            style={{ transitionDelay: "0.2s", fontFamily: BODY_FONT }}
          >
            We deliberately limit Black Label membership to ensure every member receives the full attention, resources, and physician access they deserve. If you are ready to invest in your health at the highest level, we invite you to begin the conversation.
          </p>
          <p
            className="text-[#FBB217]/80 text-xs tracking-widest uppercase max-w-md mx-auto mb-8 fade-up"
            style={{ transitionDelay: "0.25s", fontFamily: SUBTITLE_FONT }}
          >
            Referral programs available — ask during your private consultation.
          </p>
          <Link href="/contact">
            <button className="btn-amber rounded-none fade-up flex items-center gap-2 mx-auto" style={{ transitionDelay: "0.3s" }}>
              Begin the Conversation <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 fade-up">
              <p className="section-label mb-4">Common Questions</p>
              <h2
                className="text-[#F6F5EC]"
                style={{ fontFamily: TITLE_FONT, fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                BLACK LABEL FAQ
              </h2>
              <p className="text-[#D6D7D9]/60 text-sm mt-4 leading-relaxed">
                Answers to the most common questions about CellRX Black Label Concierge Medicine — what is included, who it is for, and how to get started.
              </p>
            </div>
            <div className="fade-up">
              {BLACK_LABEL_FAQS.map((faq, i) => (
                <BlackLabelFAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
            <div className="mt-10 text-center fade-up">
              <Link href="/contact">
                <button className="btn-amber rounded-none">Begin the Conversation</button>
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
