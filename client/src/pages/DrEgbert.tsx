/*
 * Dr. Jacob Egbert — Dedicated Physician Bio Page
 * Route: /about/dr-egbert
 * Purpose: E-E-A-T authority page for AI search engines and Google
 * Brand Colors: #051229 Navy | #0047BB Blue | #FBB217 Amber | #F6F5EC Cream | #D6D7D9 Silver
 */

import { useEffect } from "react";
import { useSEO, useBreadcrumb } from "@/hooks/useSEO";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Award, BookOpen, Stethoscope, ArrowRight, GraduationCap, Building2 } from "lucide-react";

const PHYSICIAN_IMG = "/manus-storage/physician_portrait_opt_0f7ccc2a.webp";
const CLINIC_IMG = "/manus-storage/clinic_interior_opt_d513ed06.webp";

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

export default function DrEgbert() {
  useSEO({
    title: "Dr. Jacob Egbert, MD — Medical Director | CellRX Regenerative Medicine",
    description: "Dr. Jacob Egbert, MD is the Medical Director of CellRX and its stem cell source company. Board-certified in regenerative and functional medicine with 10+ years of clinical experience in Lehi, Utah.",
    canonical: "/about/dr-egbert",
    ogImage: PHYSICIAN_IMG,
    keywords: "Dr. Jacob Egbert, regenerative medicine physician Utah, stem cell doctor Lehi, Medical Director CellRX",
  });

  useBreadcrumb([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Dr. Jacob Egbert", url: "/about/dr-egbert" },
  ]);

  useScrollAnimation();

  // Inject Physician JSON-LD schema
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Dr. Jacob Egbert",
      "honorificPrefix": "Dr.",
      "honorificSuffix": "MD",
      "jobTitle": "Medical Director",
      "description": "Board-certified physician specializing in regenerative medicine, functional medicine, and personalized longevity protocols. Medical Director of CellRX and its stem cell source company.",
      "image": PHYSICIAN_IMG,
      "url": "https://www.cellrx.bio/about/dr-egbert",
      "medicalSpecialty": [
        "Regenerative Medicine",
        "Functional Medicine",
        "Longevity Medicine",
        "Stem Cell Therapy"
      ],
      "worksFor": {
        "@type": "MedicalBusiness",
        "name": "CellRX Regenerative Medicine",
        "url": "https://www.cellrx.bio",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3098 Executive Parkway, Suite 100",
          "addressLocality": "Lehi",
          "addressRegion": "UT",
          "postalCode": "84043",
          "addressCountry": "US"
        }
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Medical Degree",
          "name": "Doctor of Medicine (MD)"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Board Certification",
          "name": "Board-Certified Physician"
        }
      ],
      "knowsAbout": [
        "Stem Cell Therapy",
        "Regenerative Medicine",
        "Functional Medicine",
        "Longevity Protocols",
        "NAD+ Therapy",
        "Peptide Therapy",
        "Biomarker Optimization",
        "Chain of Custody Biologics"
      ],
      "telephone": "+13857072373",
      "email": "info@cellrx.bio",
      "sameAs": [
        "https://www.linkedin.com/company/113543963/"
      ]
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "physician-schema-dr-egbert";
    script.textContent = JSON.stringify(schema);
    const existing = document.getElementById("physician-schema-dr-egbert");
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { document.getElementById("physician-schema-dr-egbert")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Page Header */}
      <section
        className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden"
        style={{ backgroundImage: `url(${CLINIC_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/88" />
        <div className="container relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-white/40" style={{ fontFamily: BODY_FONT }}>
              <li><Link href="/" className="hover:text-[#FBB217] transition-colors">Home</Link></li>
              <li className="text-white/20">/</li>
              <li><Link href="/about" className="hover:text-[#FBB217] transition-colors">About</Link></li>
              <li className="text-white/20">/</li>
              <li className="text-white/60">Dr. Jacob Egbert</li>
            </ol>
          </nav>
          <p className="section-label mb-4">Medical Director</p>
          <h1
            className="text-[#F6F5EC]"
            style={{ fontFamily: TITLE_FONT, fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            DR. JACOB<br />
            <span className="text-[#FBB217]">EGBERT, MD</span>
          </h1>
          <p className="text-[#D6D7D9] text-lg mt-4 max-w-2xl" style={{ fontFamily: BODY_FONT }}>
            Board-certified regenerative medicine physician. Medical Director of CellRX and its stem cell source company — the only physician in Utah with this dual oversight structure.
          </p>
        </div>
      </section>

      {/* Bio + Photo */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Photo */}
            <div className="lg:col-span-2 fade-in">
              <div className="relative">
                <img
                  src={PHYSICIAN_IMG}
                  alt="Dr. Jacob Egbert, MD — Medical Director of CellRX Regenerative Medicine, Lehi Utah"
                  className="w-full block"
                  style={{ aspectRatio: "2/3", objectFit: "cover", objectPosition: "50% 0%" }}
                  loading="eager"
                  decoding="async"
                  width="600"
                  height="900"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#051229] to-transparent h-16" />
                <div className="absolute top-6 -right-4 bg-[#0047BB] px-4 py-3 hidden lg:block">
                  <p className="text-white text-xs font-bold tracking-wide uppercase leading-tight" style={{ fontFamily: SUBTITLE_FONT }}>Medical Director</p>
                  <p className="text-white/70 text-xs mt-0.5" style={{ fontFamily: BODY_FONT }}>Clinic &amp; Source Company</p>
                </div>
              </div>

              {/* Quick credentials card */}
              <div className="mt-8 bg-[#030d1e] border border-white/5 p-6 space-y-4">
                <h3 className="text-[#FBB217] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: SUBTITLE_FONT }}>Credentials at a Glance</h3>
                {[
                  { icon: <GraduationCap size={14} />, label: "Doctor of Medicine (MD)" },
                  { icon: <Award size={14} />, label: "Board-Certified Physician" },
                  { icon: <Stethoscope size={14} />, label: "Regenerative Medicine Specialist" },
                  { icon: <Building2 size={14} />, label: "Medical Director — CellRX" },
                  { icon: <Building2 size={14} />, label: "Medical Director — Stem Cell Source Co." },
                  { icon: <BookOpen size={14} />, label: "10+ Years Clinical Experience" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[#6DB3F2] shrink-0">{item.icon}</span>
                    <span className="text-[#D6D7D9] text-sm" style={{ fontFamily: BODY_FONT }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-3 fade-up">
              <p className="text-[#FBB217] text-sm tracking-widest uppercase mb-6" style={{ fontFamily: SUBTITLE_FONT, fontWeight: 600 }}>
                Regenerative Medicine Specialist · Functional Medicine · Longevity
              </p>
              <div className="gold-rule mb-8" />

              <h2 className="text-[#F6F5EC] mb-4" style={{ fontFamily: TITLE_FONT, fontSize: "clamp(28px, 3vw, 40px)" }}>
                A POSITION OF AUTHORITY THAT IS GENUINELY UNIQUE
              </h2>
              <p className="text-[#D6D7D9] leading-relaxed mb-6" style={{ fontFamily: BODY_FONT }}>
                Dr. Egbert occupies a structural position that no other physician in Utah — and very few in the country — can claim. He serves simultaneously as the Medical Director of CellRX and as the Medical Director of the stem cell source company that supplies CellRX's biologics. This dual role provides unbroken chain-of-custody oversight from the moment of ethical procurement through the moment of administration.
              </p>
              <p className="text-[#D6D7D9] leading-relaxed mb-6" style={{ fontFamily: BODY_FONT }}>
                This is not a marketing distinction. It is a structural guarantee. When you receive treatment at CellRX, you are not trusting a distributor's documentation or a third-party lab's quality assurance. You are trusting a physician who personally ensures the purity, concentration, and provenance of every vial — because he is the one who oversaw its creation.
              </p>
              <p className="text-[#D6D7D9] leading-relaxed mb-8" style={{ fontFamily: BODY_FONT }}>
                With over a decade of clinical experience in regenerative and functional medicine, Dr. Egbert has helped hundreds of patients avoid surgery, recover faster, and invest in a biology that performs at the level they demand. His approach is evidence-based, individualized, and grounded in the belief that the body has a profound capacity to heal — when given the right signals, at the right concentration, at the right time.
              </p>

              <h3 className="text-[#F6F5EC] mb-4" style={{ fontFamily: TITLE_FONT, fontSize: "clamp(22px, 2.5vw, 32px)" }}>
                CLINICAL PHILOSOPHY
              </h3>
              <p className="text-[#D6D7D9] leading-relaxed mb-8" style={{ fontFamily: BODY_FONT }}>
                Dr. Egbert practices medicine from a root-cause perspective. Rather than managing symptoms, he identifies the underlying biological deficits — inflammatory burden, cellular senescence, hormonal imbalance, mitochondrial dysfunction — and addresses them directly with precision-dosed regenerative biologics, biomarker-driven protocols, and personalized supplementation strategies. Every patient receives a protocol designed specifically for their biology, their goals, and their timeline.
              </p>

              <h3 className="text-[#F6F5EC] mb-4" style={{ fontFamily: TITLE_FONT, fontSize: "clamp(22px, 2.5vw, 32px)" }}>
                AREAS OF EXPERTISE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Stem Cell Injection Therapy",
                  "Stem Cell IV Therapy",
                  "Functional Medicine",
                  "Longevity & Anti-Aging Protocols",
                  "NAD+ Therapy",
                  "Peptide Protocols",
                  "Hormone Optimization",
                  "Biomarker-Driven Health Optimization",
                  "Chronic Pain & Joint Repair",
                  "Concierge Medicine",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-[#6DB3F2] shrink-0" />
                    <span className="text-[#D6D7D9] text-sm" style={{ fontFamily: BODY_FONT }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <button
                  className="btn-primary rounded-none"
                  aria-label="Book a private consultation with Dr. Jacob Egbert"
                >
                  Book a Private Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dual Role Matters */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up">
            <p className="section-label mb-4">Chain of Custody</p>
            <h2 className="text-[#F6F5EC]" style={{ fontFamily: TITLE_FONT, fontSize: "clamp(32px, 4vw, 52px)" }}>
              WHY THE DUAL ROLE MATTERS
            </h2>
            <div className="gold-rule mx-auto mt-6 mb-6" />
            <p className="text-[#D6D7D9] leading-relaxed" style={{ fontFamily: BODY_FONT }}>
              Most stem cell clinics purchase biologics through third-party distributors — meaning the product has often changed hands multiple times, may have been diluted, and comes with no verifiable chain of custody. Dr. Egbert's dual role eliminates every link in that chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Ethical Procurement",
                desc: "Biologics are sourced exclusively from healthy, consented local births under Dr. Egbert's direct medical oversight — never purchased from anonymous third-party distributors.",
              },
              {
                step: "02",
                title: "Unbroken Oversight",
                desc: "As Medical Director of the source company, Dr. Egbert personally oversees quality control, concentration verification, and storage protocols for every vial before it reaches CellRX.",
              },
              {
                step: "03",
                title: "Direct Administration",
                desc: "As Medical Director of CellRX, Dr. Egbert administers the biologics himself — the same physician who oversaw their creation is the one delivering your treatment.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#051229] border border-white/5 p-8 fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <p className="text-[#FBB217] text-xs tracking-widest uppercase mb-4" style={{ fontFamily: SUBTITLE_FONT, fontWeight: 600 }}>{item.step}</p>
                <h3 className="text-[#F6F5EC] mb-4" style={{ fontFamily: TITLE_FONT, fontSize: "22px" }}>{item.title}</h3>
                <p className="text-[#D6D7D9] text-sm leading-relaxed" style={{ fontFamily: BODY_FONT }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Outcomes */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="text-center mb-16 fade-up">
            <p className="section-label mb-4">Clinical Outcomes</p>
            <h2 className="text-[#F6F5EC]" style={{ fontFamily: TITLE_FONT, fontSize: "clamp(32px, 4vw, 52px)" }}>
              RESULTS THAT SPEAK
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Patients Treated" },
              { value: "98%", label: "Patient Satisfaction" },
              { value: "10+", label: "Years of Excellence" },
              { value: "10 CC", label: "Maximum Dose Available" },
            ].map((stat, i) => (
              <div key={i} className="fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="text-[#F6F5EC] mb-2" style={{ fontFamily: TITLE_FONT, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div className="gold-rule mx-auto mb-3" />
                <p className="text-[#D6D7D9]/60 text-xs tracking-widest uppercase" style={{ fontFamily: SUBTITLE_FONT }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#030d1e]">
        <div className="container text-center">
          <h2 className="text-[#F6F5EC] mb-4 fade-up" style={{ fontFamily: TITLE_FONT, fontSize: "clamp(32px, 4vw, 52px)" }}>
            READY TO MEET DR. EGBERT?
          </h2>
          <p className="text-[#D6D7D9] mb-8 max-w-xl mx-auto fade-up" style={{ fontFamily: BODY_FONT, transitionDelay: "0.1s" }}>
            Every patient relationship begins with a private, unhurried consultation. Dr. Egbert will review your health history, discuss your goals, and design a protocol built specifically for your biology.
          </p>
          <div className="flex flex-wrap gap-4 justify-center fade-up" style={{ transitionDelay: "0.2s" }}>
            <Link href="/contact">
              <button className="btn-primary rounded-none" aria-label="Book a private consultation with Dr. Jacob Egbert at CellRX">
                Book Your Private Consultation
              </button>
            </Link>
            <Link href="/about">
              <button className="btn-outline rounded-none flex items-center gap-2">
                Meet the Full Team <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
