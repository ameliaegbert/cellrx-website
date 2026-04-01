/*
 * CellRX Team Page — Editorial Dark Luxury
 * Brand Colors: #051229 Navy | #0047BB Blue | #FBB217 Amber | #F6F5EC Cream | #36454F Charcoal | #D6D7D9 Silver
 * Typography: Bebas Neue (titles) | DM Sans (subtitles) | Libre Franklin (body)
 * Note: Jason Skeesick excluded. Amelia is COO.
 */

import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const PHYSICIAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/physician_portrait_d5fe25e9.webp";
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

const teamMembers = [
  {
    name: "Jacob Haps",
    title: "Medical Director",
    subtitle: "Regenerative Medicine Specialist",
    img: PHYSICIAN_IMG,
    bio: "Jacob serves as the Medical Director of CellRX and simultaneously as the Medical Director of our stem cell source company — a dual role that gives him direct, unbroken oversight of every biologic administered at our clinic. With over a decade of clinical experience in regenerative and functional medicine, he has helped hundreds of patients avoid surgery, recover faster, and invest in a biology that performs at the level they demand. His commitment to full chain-of-custody biologics and personalized protocols sets the standard for what regenerative medicine can and should be.",
    credentials: [
      "Dual Medical Director — Clinic & Source Company",
      "Regenerative & Functional Medicine Specialist",
      "10+ Years of Clinical Experience",
      "500+ Patients Successfully Treated",
    ],
    featured: true,
  },
  {
    name: "Amelia",
    title: "Chief Operating Officer",
    subtitle: "Operations & Patient Experience",
    img: null,
    bio: "Amelia oversees all clinical operations at CellRX, ensuring that every patient interaction reflects the white-glove standard the practice is known for. From intake to follow-up, she is the architect of the seamless, discreet experience that distinguishes CellRX from every other clinic in the space.",
    credentials: [
      "Chief Operating Officer",
      "Patient Experience & Concierge Operations",
      "Clinical Workflow Optimization",
    ],
    featured: false,
  },
];

export default function Team() {
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
          <p className="section-label mb-4">Our People</p>
          <h1
            className="text-[#F6F5EC]"
            style={{ fontFamily: TITLE_FONT, fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            THE TEAM BEHIND<br />
            <span className="text-[#FBB217]">YOUR RESULTS</span>
          </h1>
          <p
            className="text-[#D6D7D9]/70 mt-6 max-w-xl leading-relaxed"
            style={{ fontFamily: BODY_FONT }}
          >
            CellRX is built on a small, intentional team of exceptional individuals — each selected for their expertise, their standards, and their belief that the most discerning clients deserve nothing less than the best.
          </p>
        </div>
      </section>

      {/* Featured: Medical Director */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 fade-in">
              <div className="relative">
                <img
                  src={PHYSICIAN_IMG}
                  alt="Jacob Haps — Medical Director"
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: "2/3", display: "block" }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#051229] to-transparent h-16" />
                <div className="absolute top-6 -right-4 bg-[#0047BB] px-4 py-3 hidden lg:block">
                  <p className="text-white text-xs font-bold tracking-wide uppercase leading-tight" style={{ fontFamily: SUBTITLE_FONT }}>
                    Medical Director
                  </p>
                  <p className="text-white/70 text-xs mt-0.5" style={{ fontFamily: BODY_FONT }}>
                    Clinic & Source Company
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 fade-up">
              <p className="section-label mb-3">Medical Leadership</p>
              <h2
                className="text-[#F6F5EC] mb-1"
                style={{ fontFamily: TITLE_FONT, fontSize: "clamp(40px, 5vw, 64px)" }}
              >
                JACOB HAPS
              </h2>
              <p
                className="text-[#FBB217] text-sm tracking-widest uppercase mb-6"
                style={{ fontFamily: SUBTITLE_FONT, fontWeight: 600 }}
              >
                Medical Director — Regenerative Medicine Specialist
              </p>
              <div className="gold-rule mb-6" />

              <p className="text-[#D6D7D9] leading-relaxed mb-6" style={{ fontFamily: BODY_FONT }}>
                Jacob serves as the Medical Director of CellRX and simultaneously as the Medical Director of our stem cell source company — a dual role that gives him direct, unbroken oversight of every biologic administered at our clinic. This is not a marketing distinction. It is a structural guarantee: when you receive treatment at CellRX, you are trusting a physician who personally ensures the purity, concentration, and provenance of every vial — because he is the one who oversaw its creation.
              </p>
              <p className="text-[#D6D7D9] leading-relaxed mb-8" style={{ fontFamily: BODY_FONT }}>
                With over a decade of clinical experience in regenerative and functional medicine, Jacob has helped hundreds of patients avoid surgery, recover faster, and invest in a biology that performs at the level they demand. His commitment to full chain-of-custody biologics, personalized protocols, and never-diluted products sets the standard for what regenerative medicine can and should be.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Dual Medical Director — Clinic & Source Company",
                  "Regenerative & Functional Medicine Specialist",
                  "10+ Years of Clinical Experience",
                  "500+ Patients Successfully Treated",
                  "Full Chain-of-Custody Biologic Oversight",
                  "Personalized Protocol Design",
                ].map((cred, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#FBB217] shrink-0" />
                    <span className="text-[#D6D7D9]/80 text-sm" style={{ fontFamily: BODY_FONT }}>{cred}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <button className="btn-primary rounded-none flex items-center gap-2">
                  Schedule a Consultation
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Operations Team */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="mb-16 fade-up">
            <p className="section-label mb-4">Operations & Experience</p>
            <h2
              className="text-[#F6F5EC]"
              style={{ fontFamily: TITLE_FONT, fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              THE PEOPLE WHO MAKE<br />
              <span className="text-[#FBB217]">IT SEAMLESS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Amelia */}
            <div className="fade-up">
              <div
                className="w-full bg-[#051229] border border-white/10 mb-6 flex items-center justify-center"
                style={{ height: "320px" }}
              >
                <div className="text-center px-8">
                  <div
                    className="w-20 h-20 rounded-full bg-[#0047BB]/20 border border-[#0047BB]/30 flex items-center justify-center mx-auto mb-4"
                  >
                    <span
                      className="text-[#FBB217]"
                      style={{ fontFamily: TITLE_FONT, fontSize: "32px" }}
                    >
                      A
                    </span>
                  </div>
                  <p className="text-[#D6D7D9]/40 text-xs tracking-widest uppercase" style={{ fontFamily: SUBTITLE_FONT }}>
                    Photo Coming Soon
                  </p>
                </div>
              </div>
              <div className="gold-rule mb-4" />
              <h3
                className="text-[#F6F5EC] mb-1"
                style={{ fontFamily: TITLE_FONT, fontSize: "28px" }}
              >
                AMELIA
              </h3>
              <p
                className="text-[#FBB217] text-xs tracking-widest uppercase mb-4"
                style={{ fontFamily: SUBTITLE_FONT, fontWeight: 600 }}
              >
                Chief Operating Officer
              </p>
              <p className="text-[#D6D7D9]/70 text-sm leading-relaxed" style={{ fontFamily: BODY_FONT }}>
                Amelia oversees all clinical operations at CellRX, ensuring that every patient interaction reflects the white-glove standard the practice is known for. From intake to follow-up, she is the architect of the seamless, discreet experience that distinguishes CellRX from every other clinic in the space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Culture / Values */}
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
              SMALL BY DESIGN.<br />
              <span className="text-[#FBB217]">EXCEPTIONAL BY STANDARD.</span>
            </h2>
            <p className="text-[#D6D7D9]/80 leading-relaxed mb-8" style={{ fontFamily: BODY_FONT }}>
              We are not a volume practice. We are a precision practice. Every member of the CellRX team is selected because they share the same belief: that the most discerning individuals deserve medical care that matches their standards — and that delivering that level of care requires a team that holds itself to the same standard.
            </p>
            <Link href="/contact">
              <button className="btn-primary rounded-none">
                Begin Your Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
