/*
 * CellRX About Page — Merged About + Team
 * Brand Colors: #051229 Navy | #0047BB Blue | #FBB217 Amber | #F6F5EC Cream | #36454F Charcoal | #D6D7D9 Silver
 * Typography: Bebas Neue (titles) | DM Sans (subtitles) | Libre Franklin (body)
 * Team photos: uniform 3/4 aspect ratio, object-position top to preserve faces
 */

import { useEffect } from "react";
import { useSEO, PAGE_SEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, BookOpen, Users, Lock, ArrowRight } from "lucide-react";

const PHYSICIAN_IMG = "/manus-storage/physician_portrait_opt_0f7ccc2a.webp";
const CLINIC_IMG = "/manus-storage/clinic_interior_opt_d513ed06.webp";
const INJECTION_IMG = "/manus-storage/haps12_about_opt_c1f69158.webp";
const AMELIA_IMG = "/manus-storage/amelia_egbert_opt_0e0c389f.webp";
const SAMANTHA_IMG = "/manus-storage/samantha_buker_opt_c69cab89.webp";
const DAVID_IMG = "/manus-storage/david_fajardo_opt_4507be8d.webp";

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

export default function About() {
  useSEO(PAGE_SEO.about);
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Page Header */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ backgroundImage: `url(${CLINIC_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/88" />
        <div className="container relative z-10">
          <p className="section-label mb-4">About CellRX</p>
          <h1
            className="text-[#F6F5EC]"
            style={{ fontFamily: TITLE_FONT, fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            WHERE SCIENCE MEETS<br />
            <span className="text-[#FBB217]">EXCEPTIONAL CARE.</span>
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="section-label mb-4">Our Mission</p>
              <h2
                className="text-[#F6F5EC] mb-6"
                style={{ fontFamily: TITLE_FONT, fontSize: "clamp(36px, 4vw, 52px)" }}
              >
                REDEFINING WHAT<br />HEALTHCARE CAN BE
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-[#D6D7D9] leading-relaxed mb-6" style={{ fontFamily: BODY_FONT }}>
                CellRX was founded on a singular belief: that the most discerning individuals deserve medical care that matches their standards. We exist at the intersection of cutting-edge regenerative science and the discretion, precision, and white-glove service of a private members' club.
              </p>
              <p className="text-[#D6D7D9] leading-relaxed mb-8" style={{ fontFamily: BODY_FONT }}>
                Our clinic is located in Lehi, Utah, and serves patients from across the United States who are seeking non-surgical alternatives to chronic pain, accelerated recovery, and proactive longevity optimization. Every protocol we administer is evidence-based, ethically sourced, and tailored to the individual — with a level of provenance and transparency that no other clinic can match.
              </p>
              <div className="space-y-3">
                {[
                  "Evidence-based regenerative protocols",
                  "Full chain-of-custody biologics — never diluted, never replicated",
                  "Ethically sourced from healthy, consented local births",
                  "Personalized treatment plans for each patient",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={15} className="text-[#FBB217] shrink-0" />
                    <span className="text-[#D6D7D9] text-sm" style={{ fontFamily: BODY_FONT }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative fade-in">
              <img
                src={INJECTION_IMG}
                alt="Dr. Jacob Egbert administering stem cell injection therapy at CellRX clinic in Lehi, Utah"
                className="w-full"
                style={{ display: "block", width: "100%", height: "auto" }}
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#0047BB] p-6 max-w-[200px] hidden lg:block">
                <p className="text-white" style={{ fontFamily: TITLE_FONT, fontSize: "36px", lineHeight: 1 }}>10+</p>
                <p className="text-white/90 text-xs tracking-wide uppercase mt-1" style={{ fontFamily: SUBTITLE_FONT }}>Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Director */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="text-center mb-16 fade-up">
            <p className="section-label mb-4">Medical Leadership</p>
            <h2 className="text-[#F6F5EC]" style={{ fontFamily: TITLE_FONT, fontSize: "clamp(36px, 4vw, 56px)" }}>
              DR. JACOB EGBERT
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 fade-in">
              <div className="relative">
                <img
                  src={PHYSICIAN_IMG}
                  alt="Dr. Jacob Egbert, Medical Director of CellRX Regenerative Medicine and stem cell source company"
                  className="w-full block"
                  style={{ aspectRatio: "2/3", objectFit: "cover", objectPosition: "50% 0%", display: "block" }}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="900"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#030d1e] to-transparent h-16" />
                <div className="absolute top-6 -right-4 bg-[#0047BB] px-4 py-3 hidden lg:block">
                  <p className="text-white text-xs font-bold tracking-wide uppercase leading-tight" style={{ fontFamily: SUBTITLE_FONT }}>Medical Director</p>
                  <p className="text-white/70 text-xs mt-0.5" style={{ fontFamily: BODY_FONT }}>Clinic &amp; Source Company</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 fade-up">
              <p className="text-[#FBB217] text-sm tracking-widest uppercase mb-6" style={{ fontFamily: SUBTITLE_FONT, fontWeight: 600 }}>
                Medical Director — Regenerative Medicine Specialist
              </p>
              <div className="gold-rule mb-6" />
              <p className="text-[#D6D7D9] leading-relaxed mb-6" style={{ fontFamily: BODY_FONT }}>
                Dr. Egbert occupies a position of authority that is genuinely unique in the field of regenerative medicine. He serves simultaneously as the Medical Director of CellRX and as the Medical Director of our stem cell source company — giving him direct, unbroken oversight of every biologic we administer, from the moment of ethical procurement through the moment it enters your body.
              </p>
              <p className="text-[#D6D7D9] leading-relaxed mb-6" style={{ fontFamily: BODY_FONT }}>
                This dual role is not a marketing distinction. It is a structural guarantee. When you receive treatment at CellRX, you are not trusting a distributor's documentation. You are trusting a physician who personally ensures the purity, concentration, and provenance of every vial — because he is the one who oversaw its creation.
              </p>
              <p className="text-[#D6D7D9] leading-relaxed mb-8" style={{ fontFamily: BODY_FONT }}>
                With over a decade of clinical experience in regenerative and functional medicine, Dr. Egbert has helped hundreds of patients avoid surgery, recover faster, and invest in a biology that performs at the level they demand.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Lock size={18} className="text-[#FBB217]" />, title: "Dual Medical Director", sub: "Clinic & Source Company" },
                  { icon: <BookOpen size={18} className="text-[#FBB217]" />, title: "Regenerative Medicine", sub: "Specialized Clinical Training" },
                  { icon: <Users size={18} className="text-[#FBB217]" />, title: "500+ Patients", sub: "Successfully Treated" },
                  { icon: <CheckCircle2 size={18} className="text-[#FBB217]" />, title: "10+ Years", sub: "Clinical Experience" },
                ].map((cred, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-white/10 bg-[#051229]">
                    {cred.icon}
                    <div>
                      <p className="text-[#F6F5EC] text-sm font-semibold" style={{ fontFamily: SUBTITLE_FONT }}>{cred.title}</p>
                      <p className="text-[#D6D7D9] text-xs mt-0.5" style={{ fontFamily: BODY_FONT }}>{cred.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <button className="btn-primary rounded-none flex items-center gap-2">
                  Schedule a Consultation <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Chain of Custody Banner */}
      <section className="py-20 bg-[#0047BB]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <Lock size={40} className="text-white shrink-0 mt-1" />
            <div>
              <h3 className="text-white mb-3" style={{ fontFamily: TITLE_FONT, fontSize: "clamp(28px, 3vw, 40px)" }}>
                THE CHAIN-OF-CUSTODY ADVANTAGE
              </h3>
              <p className="text-white leading-relaxed max-w-3xl" style={{ fontFamily: BODY_FONT, opacity: 0.92 }}>
                Most regenerative clinics source their biologics through third-party distributors — meaning the product has changed hands multiple times before it reaches you, with no verifiable chain of custody, and no guarantee it hasn't been diluted or compromised. At CellRX, Dr. Egbert's role as Medical Director of our source company means every biologic we administer has been under direct physician oversight from procurement to administration. Never diluted. Never replicated. Always from healthy, consented local births.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="text-center mb-16 fade-up">
            <p className="section-label mb-4">Our Values</p>
            <h2 className="text-[#F6F5EC]" style={{ fontFamily: TITLE_FONT, fontSize: "clamp(36px, 4vw, 56px)" }}>
              THE CELLRX STANDARD
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Provenance & Purity", desc: "Full chain-of-custody oversight from source to syringe. Every biologic we administer is traceable, uncompromised, and verified by our own Medical Director." },
              { num: "02", title: "Patient Safety", desc: "Safety is our absolute priority. All biologics are ethically sourced, rigorously screened, and administered by expert clinicians in a controlled clinical environment." },
              { num: "03", title: "Personalization", desc: "No two patients are the same. Every treatment protocol is built around your unique biology, goals, and medical history — not a template." },
              { num: "04", title: "Discretion", desc: "We understand that privacy matters. Our clinic is designed to provide a discreet, confidential experience at every step of your care." },
            ].map((val, i) => (
              <div
                key={i}
                className="p-6 border border-white/5 bg-[#030d1e] fade-up"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <p className="text-[#FBB217] mb-4" style={{ fontFamily: TITLE_FONT, fontSize: "64px", lineHeight: 1, opacity: 0.7 }}>{val.num}</p>
                <h3 className="text-[#F6F5EC] mb-3" style={{ fontFamily: SUBTITLE_FONT, fontSize: "17px", fontWeight: 600 }}>{val.title}</h3>
                <p className="text-[#D6D7D9] text-sm leading-relaxed" style={{ fontFamily: BODY_FONT }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE TEAM ─── */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="mb-16 fade-up">
            <p className="section-label mb-4">Our People</p>
            <h2 className="text-[#F6F5EC]" style={{ fontFamily: TITLE_FONT, fontSize: "clamp(36px, 4vw, 56px)" }}>
              THE TEAM BEHIND<br />
              <span className="text-[#FBB217]">YOUR RESULTS</span>
            </h2>
            <p className="text-[#D6D7D9]/70 mt-4 max-w-xl leading-relaxed" style={{ fontFamily: BODY_FONT }}>
              CellRX is built on a small, intentional team of exceptional individuals — each selected for their expertise, their standards, and their belief that the most discerning clients deserve nothing less than the best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Amelia Egbert */}
            <div className="fade-up">
              <div className="w-full mb-6 overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src={AMELIA_IMG}
                  alt="Amelia Egbert, Chief Operating Officer at CellRX Regenerative Medicine"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 12%" }}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                />
              </div>
              <div className="gold-rule mb-4" />
              <h3 className="text-[#F6F5EC] mb-1" style={{ fontFamily: TITLE_FONT, fontSize: "28px" }}>AMELIA EGBERT</h3>
              <p className="text-[#FBB217] text-xs tracking-widest uppercase mb-4" style={{ fontFamily: SUBTITLE_FONT, fontWeight: 600 }}>Chief Operating Officer</p>
              <p className="text-[#D6D7D9]/70 text-sm leading-relaxed" style={{ fontFamily: BODY_FONT }}>
                Amelia oversees all clinical operations at CellRX, ensuring that every patient interaction reflects the white-glove standard the practice is known for. From intake to follow-up, she is the architect of the seamless, discreet experience that distinguishes CellRX from every other clinic in the space.
              </p>
            </div>

            {/* Samantha Buker */}
            <div className="fade-up" style={{ transitionDelay: "0.1s" }}>
              <div className="w-full mb-6 overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src={SAMANTHA_IMG}
                  alt="Samantha Buker, Executive Assistant at CellRX Regenerative Medicine"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 45%" }}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                />
              </div>
              <div className="gold-rule mb-4" />
              <h3 className="text-[#F6F5EC] mb-1" style={{ fontFamily: TITLE_FONT, fontSize: "28px" }}>SAMANTHA BUKER</h3>
              <p className="text-[#FBB217] text-xs tracking-widest uppercase mb-4" style={{ fontFamily: SUBTITLE_FONT, fontWeight: 600 }}>Executive Assistant</p>
              <p className="text-[#D6D7D9]/70 text-sm leading-relaxed" style={{ fontFamily: BODY_FONT }}>
                Samantha ensures that every detail of the CellRX patient experience is handled with precision and care. From scheduling to coordination, she is the first point of contact for many of our clients and sets the tone for the exceptional service that defines our practice.
              </p>
            </div>

            {/* David Fajardo */}
            <div className="fade-up" style={{ transitionDelay: "0.2s" }}>
              <div className="w-full mb-6 overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src={DAVID_IMG}
                  alt="David Fajardo, Director of Social Media at CellRX Regenerative Medicine"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 10%" }}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                />
              </div>
              <div className="gold-rule mb-4" />
              <h3 className="text-[#F6F5EC] mb-1" style={{ fontFamily: TITLE_FONT, fontSize: "28px" }}>DAVID FAJARDO</h3>
              <p className="text-[#FBB217] text-xs tracking-widest uppercase mb-4" style={{ fontFamily: SUBTITLE_FONT, fontWeight: 600 }}>Director of Social Media</p>
              <p className="text-[#D6D7D9]/70 text-sm leading-relaxed" style={{ fontFamily: BODY_FONT }}>
                David leads CellRX's digital presence, crafting the stories and content that bring our mission to life across every platform. His work ensures that the CellRX brand communicates with the same precision and authority that defines our clinical practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Banner */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundImage: `url(${CLINIC_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/90" />
        <div className="container relative z-10">
          <div className="max-w-2xl fade-up">
            <p className="section-label mb-4">Our Culture</p>
            <h2
              className="text-[#F6F5EC] mb-6"
              style={{ fontFamily: TITLE_FONT, fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              EXCLUSIVE BY DESIGN.<br />
              <span className="text-[#FBB217]">EXCEPTIONAL BY STANDARD.</span>
            </h2>
            <p className="text-[#D6D7D9]/80 leading-relaxed mb-8" style={{ fontFamily: BODY_FONT }}>
              We are not a volume practice. We are a precision practice. Every member of the CellRX team is selected because they share the same belief: that the most discerning individuals deserve medical care that matches their standards — and that delivering that level of care requires a team that holds itself to the same standard.
            </p>
            <Link href="/contact">
              <button className="btn-primary rounded-none">Begin Your Consultation</button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
