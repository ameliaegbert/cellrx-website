/*
 * CellRX About Page — Editorial Dark Luxury
 * Brand Colors: #051229 Navy | #0047BB Blue | #FBB217 Amber | #F6F5EC Cream | #36454F Charcoal | #D6D7D9 Silver
 * Key: No board certification. Dual Medical Director role (clinic + source company) is the authority differentiator.
 */

import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, BookOpen, Users, Lock } from "lucide-react";

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
            className="text-[#F6F5EC]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            BUILT ON SCIENCE.<br />
            <span className="text-[#FBB217]">DRIVEN BY RESULTS.</span>
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
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 52px)" }}
              >
                REDEFINING WHAT<br />HEALTHCARE CAN BE
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-6">
                CellRX was founded on a singular belief: that the most discerning individuals deserve medical care that matches their standards. We exist at the intersection of cutting-edge regenerative science and the discretion, precision, and white-glove service of a private members' club.
              </p>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-8">
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
                    <CheckCircle2 size={15} className="text-[#0047BB] shrink-0" />
                    <span className="text-[#D6D7D9]/70 text-sm">{item}</span>
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
              className="text-[#F6F5EC]"
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
                className="text-[#F6F5EC] mb-1"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "40px" }}
              >
                MEDICAL DIRECTOR
              </h3>
              <p className="text-[#FBB217] text-sm tracking-widest uppercase mb-6">Regenerative Medicine Specialist</p>
              <div className="gold-rule mb-6" />

              <p className="text-[#D6D7D9]/80 leading-relaxed mb-6">
                Our Medical Director occupies a position of authority that is genuinely unique in the field of regenerative medicine. He serves simultaneously as the Medical Director of CellRX and as the Medical Director of our stem cell source company — giving him direct, unbroken oversight of every biologic we administer, from the moment of ethical procurement through the moment it enters your body.
              </p>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-6">
                This dual role is not a marketing distinction. It is a structural guarantee. When you receive treatment at CellRX, you are not trusting a distributor's documentation. You are trusting a physician who personally ensures the purity, concentration, and provenance of every vial — because he is the one who oversaw its creation.
              </p>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-8">
                With over a decade of clinical experience in regenerative and functional medicine, he has helped hundreds of patients avoid surgery, recover faster, and invest in a biology that performs at the level they demand.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Lock size={18} className="text-[#FBB217]" />, title: "Dual Medical Director", sub: "Clinic & Source Company" },
                  { icon: <BookOpen size={18} className="text-[#FBB217]" />, title: "Regenerative Medicine", sub: "Specialized Clinical Training" },
                  { icon: <Users size={18} className="text-[#FBB217]" />, title: "500+ Patients", sub: "Successfully Treated" },
                  { icon: <CheckCircle2 size={18} className="text-[#FBB217]" />, title: "10+ Years", sub: "Clinical Experience" },
                ].map((cred, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-white/5 bg-[#051229]">
                    {cred.icon}
                    <div>
                      <p className="text-[#F6F5EC] text-sm font-semibold">{cred.title}</p>
                      <p className="text-[#D6D7D9]/50 text-xs mt-0.5">{cred.sub}</p>
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

      {/* The Chain of Custody Advantage */}
      <section className="py-20 bg-[#0047BB]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <Lock size={40} className="text-white shrink-0 mt-1" />
            <div>
              <h3
                className="text-white mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 3vw, 40px)" }}
              >
                THE CHAIN-OF-CUSTODY ADVANTAGE
              </h3>
              <p className="text-white/80 leading-relaxed max-w-3xl">
                Most regenerative clinics source their biologics through third-party distributors — meaning the product has changed hands multiple times before it reaches you, with no verifiable chain of custody, and no guarantee it hasn't been diluted or compromised. At CellRX, our Medical Director's role as Medical Director of our source company means every biologic we administer has been under direct physician oversight from procurement to administration. Never diluted. Never replicated. Always from healthy, consented local births. This is the standard we hold ourselves to — because it is the standard you deserve.
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
            <h2
              className="text-[#F6F5EC]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
            >
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
                className="p-8 border border-white/5 bg-[#030d1e] fade-up"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <p
                  className="text-[#FBB217]/15 mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "64px", lineHeight: 1 }}
                >
                  {val.num}
                </p>
                <h4
                  className="text-[#F6F5EC] mb-3"
                  style={{ fontFamily: "'Tenor Sans', serif", fontSize: "18px" }}
                >
                  {val.title}
                </h4>
                <p className="text-[#D6D7D9]/60 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#030d1e]">
        <div className="container text-center">
          <h2
            className="text-[#F6F5EC] mb-4 fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            READY TO EXPERIENCE THE CELLRX DIFFERENCE?
          </h2>
          <p className="text-[#D6D7D9]/70 mb-8 max-w-xl mx-auto fade-up" style={{ transitionDelay: "0.1s" }}>
            Book a private consultation with our Medical Director and discover what precision regenerative medicine — with full chain-of-custody biologics — can do for your health and performance.
          </p>
          <Link href="/contact">
            <button className="btn-primary rounded-none fade-up" style={{ transitionDelay: "0.2s" }}>
              Book Your Private Consultation
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
