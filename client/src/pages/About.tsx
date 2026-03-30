/*
 * CellRX About Page — Editorial Dark Luxury
 * Physician credentials, team, mission, clinical approach
 */

import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Award, BookOpen, Users } from "lucide-react";

const PHYSICIAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/team_photo_3d1739e6.webp";
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

export default function About() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Page Header */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ backgroundImage: `url(${CLINIC_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/85" />
        <div className="container relative z-10">
          <p className="section-label mb-4">About CellRX</p>
          <h1
            className="text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            BUILT ON SCIENCE.<br />
            <span className="text-[#C9A84C]">DRIVEN BY RESULTS.</span>
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
                className="text-white mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 52px)" }}
              >
                REDEFINING WHAT<br />HEALTHCARE CAN BE
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-white/60 leading-relaxed mb-6">
                CellRX was founded on a singular belief: that the most discerning individuals deserve medical care that matches their standards. We exist at the intersection of cutting-edge regenerative science and the discretion, precision, and white-glove service of a private members' club.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Our clinic is located in Lehi, Utah, and serves patients from across the United States who are seeking non-surgical alternatives to chronic pain, accelerated recovery, and proactive longevity optimization. Every protocol we administer is evidence-based, ethically sourced, and tailored to the individual.
              </p>
              <div className="space-y-3">
                {[
                  "Evidence-based regenerative protocols",
                  "Ethically sourced, rigorously screened biologics",
                  "Personalized treatment plans for each patient",
                  "Strict safety and quality standards",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={15} className="text-[#0047BB] shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative fade-in">
              <img
                src={CLINIC_IMG}
                alt="CellRX Clinic"
                className="w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#0047BB] p-6 max-w-[200px] hidden lg:block">
                <p
                  className="text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", lineHeight: 1 }}
                >
                  10+
                </p>
                <p className="text-white/70 text-xs tracking-wide uppercase mt-1">Years of Excellence</p>
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
            <h2
              className="text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              OUR MEDICAL DIRECTOR
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 fade-in">
              <div className="relative">
                <img
                  src={PHYSICIAN_IMG}
                  alt="CellRX Medical Director"
                  className="w-full object-cover"
                  style={{ aspectRatio: "3/4", objectFit: "cover" }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#030d1e] to-transparent h-1/3" />
              </div>
            </div>

            <div className="lg:col-span-3 fade-up">
              <h3
                className="text-white mb-1"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "40px" }}
              >
                MEDICAL DIRECTOR
              </h3>
              <p className="text-[#C9A84C] text-sm tracking-widest uppercase mb-6">Regenerative Medicine Specialist</p>
              <div className="gold-rule mb-6" />

              <p className="text-white/60 leading-relaxed mb-6">
                Our Medical Director brings a comprehensive background in regenerative and functional medicine, with specialized training in stem cell therapies, platelet-rich plasma protocols, and advanced longevity interventions. With over a decade of clinical experience, they have helped hundreds of patients avoid surgery, recover faster, and optimize their long-term health.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Their philosophy is simple: every patient deserves a treatment plan built around their unique biology, goals, and lifestyle. This commitment to personalization, combined with rigorous scientific standards, defines the CellRX approach.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Award size={18} className="text-[#C9A84C]" />, title: "Board Certified", sub: "Regenerative Medicine" },
                  { icon: <BookOpen size={18} className="text-[#C9A84C]" />, title: "Published Research", sub: "Stem Cell Protocols" },
                  { icon: <Users size={18} className="text-[#C9A84C]" />, title: "500+ Patients", sub: "Successfully Treated" },
                  { icon: <CheckCircle2 size={18} className="text-[#C9A84C]" />, title: "10+ Years", sub: "Clinical Experience" },
                ].map((cred, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-white/5 bg-white/2">
                    {cred.icon}
                    <div>
                      <p className="text-white text-sm font-semibold">{cred.title}</p>
                      <p className="text-white/40 text-xs mt-0.5">{cred.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <button className="btn-primary rounded-none">
                  Schedule a Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="text-center mb-16 fade-up">
            <p className="section-label mb-4">Our Values</p>
            <h2
              className="text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              THE CELLRX STANDARD
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Scientific Rigor", desc: "Every protocol is grounded in peer-reviewed research and clinical evidence. We never compromise on the science." },
              { num: "02", title: "Patient Safety", desc: "Safety is our absolute priority. All biologics are ethically sourced, rigorously screened, and administered by expert clinicians." },
              { num: "03", title: "Personalization", desc: "No two patients are the same. Every treatment plan is built around your unique biology, goals, and medical history." },
              { num: "04", title: "Discretion", desc: "We understand that privacy matters. Our clinic is designed to provide a discreet, confidential experience at every step." },
            ].map((val, i) => (
              <div
                key={i}
                className="p-8 border border-white/5 bg-[#030d1e] fade-up"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <p
                  className="text-[#C9A84C]/20 mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "64px", lineHeight: 1 }}
                >
                  {val.num}
                </p>
                <h4
                  className="text-white mb-3"
                  style={{ fontFamily: "'Tenor Sans', serif", fontSize: "18px" }}
                >
                  {val.title}
                </h4>
                <p className="text-white/50 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0047BB]">
        <div className="container text-center">
          <h2
            className="text-white mb-4 fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            READY TO EXPERIENCE THE CELLRX DIFFERENCE?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto fade-up" style={{ transitionDelay: "0.1s" }}>
            Book a private consultation with our medical team and discover what precision regenerative medicine can do for you.
          </p>
          <Link href="/contact">
            <button className="bg-white text-[#0047BB] font-bold text-xs tracking-widest uppercase px-10 py-4 hover:bg-[#F6F5EC] transition-colors fade-up" style={{ transitionDelay: "0.2s" }}>
              Book Consultation
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
