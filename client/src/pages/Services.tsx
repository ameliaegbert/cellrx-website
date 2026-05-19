/*
 * CellRX Services Page — Editorial Dark Luxury
 * Brand Colors: #051229 Navy | #0047BB Blue | #FBB217 Amber | #F6F5EC Cream | #36454F Charcoal | #D6D7D9 Silver
 * Copy: Luxury sales psychology — authority, exclusivity, chain-of-custody differentiator, transparent pricing
 */

import { useEffect, useState } from "react";
import { useSEO, PAGE_SEO, useBreadcrumb, useFAQSchema } from "@/hooks/useSEO";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { CheckCircle2, ArrowRight, Clock, Shield, Lock, Plus, Minus } from "lucide-react";

const SERVICE_FAQS = [
  {
    q: "How much does stem cell therapy cost at CellRX?",
    a: "Stem cell injection therapy starts at $2,500 and IV therapy starts at $4,000. All protocols are priced at $1,250 per CC, ranging from 1 CC to a maximum of 10 CC. Your Medical Director determines the optimal dose during your private consultation based on your condition and goals."
  },
  {
    q: "What is the difference between stem cell injection and IV therapy?",
    a: "Stem cell injection delivers concentrated biologics directly to a specific site of tissue damage — ideal for joint pain, tendon injuries, and localized conditions. IV therapy delivers biologics systemically through the bloodstream, targeting whole-body inflammation, cellular aging, energy, and cognitive performance. Many patients combine both approaches for comprehensive results."
  },
  {
    q: "How long does a stem cell procedure take?",
    a: "Most treatments are completed in under 60 minutes in our private clinic. There is no general anesthesia, no hospital stay, and no surgical incision. The vast majority of patients return to normal activities the same day."
  },
  {
    q: "When will I see results from stem cell therapy?",
    a: "Many patients report initial improvements in pain and inflammation within two to four weeks. The more significant structural repair — rebuilding of cartilage and connective tissue — continues to unfold over three to six months. Results are not a temporary mask; they represent genuine biological repair that tends to be durable at one and two-year follow-up."
  },
  {
    q: "Are CellRX stem cells safe and ethically sourced?",
    a: "Yes. CellRX biologics are sourced exclusively from healthy, consented local births. They are never diluted and never replicated, ensuring maximum therapeutic concentration and full ethical compliance. Our Medical Director serves simultaneously as Medical Director of the stem cell source company, providing unbroken chain-of-custody oversight from procurement to administration."
  },
  {
    q: "What conditions can be treated with stem cell therapy at CellRX?",
    a: "Common conditions treated include knee osteoarthritis, hip osteoarthritis, rotator cuff tears and tendinopathy, Achilles tendinopathy, plantar fasciitis, degenerative disc disease, chronic systemic inflammation, post-COVID syndrome, chronic fatigue, and cognitive decline. Your consultation will determine whether your specific condition makes you a strong candidate."
  },
];

function ServiceFAQItem({ q, a }: { q: string; a: string }) {
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

const INJECTION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/CELLRX_HAPS-12_94cc8872.webp";
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
  useSEO(PAGE_SEO.services);
  useBreadcrumb([
    { name: "Home", url: "https://www.cellrx.bio/" },
    { name: "Services", url: "https://www.cellrx.bio/services" },
  ]);
  useFAQSchema(
    SERVICE_FAQS.map((f) => ({ question: f.q, answer: f.a })),
    "services"
  );
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
            className="text-[#F6F5EC]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            PRECISION<br />
            <span className="text-[#0047BB]">REGENERATIVE</span><br />
            PROTOCOLS
          </h1>
        </div>
      </section>

      {/* Provenance Banner */}
      <section className="py-10 bg-[#0047BB]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <Lock size={32} className="text-white shrink-0" />
            <p className="text-white/90 text-sm leading-relaxed">
              <strong className="text-white">Every biologic we administer carries full chain of custody.</strong> Our Medical Director serves simultaneously as the Medical Director of our stem cell source company — meaning your treatment has been under direct physician oversight from the moment of ethical procurement. Never diluted. Never replicated. Sourced exclusively from healthy, consented local births.
            </p>
          </div>
        </div>
      </section>

      {/* Service 1: Stem Cell Injection */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative fade-in">
              <img
                src={INJECTION_IMG}
                alt="Stem cell injection therapy being administered at CellRX clinic"
                className="w-full object-cover"
                style={{ height: '580px', objectFit: 'cover', objectPosition: '50% 20%' }}
                fetchPriority="high"
                decoding="async"
                width="800"
                height="580"
              />
              <div className="absolute top-4 left-4">
                <span
                  className="text-[#FBB217]/20"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "80px", lineHeight: 1 }}
                >
                  01
                </span>
              </div>
            </div>
            <div className="fade-up">
              <p className="section-label mb-4">Targeted Joint & Tissue Repair</p>
              <h2
                className="text-[#F6F5EC] mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                STEM CELL INJECTION
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-6">
                Our Stem Cell Injection therapy delivers a precision-dosed concentration of regenerative biologics directly into the affected joint or tissue. This targeted approach gives your body the exact biologic signals it needs to repair damaged tissue, resolve chronic inflammation, and restore function — without surgery, without lengthy recovery, and without compromise.
              </p>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-8">
                Unlike treatments sourced through distributors, every vial we use has been under our Medical Director's direct oversight from procurement to administration. You receive the full therapeutic dose — never diluted, never replicated — for results that reflect the true potential of regenerative medicine.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Addresses root cause, not symptoms",
                  "Resolves chronic joint inflammation",
                  "Restores mobility and range of motion",
                  "Avoids surgery and extended recovery",
                  "Completed in under 60 minutes",
                  "Full chain-of-custody biologics",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#0047BB] shrink-0" />
                    <span className="text-[#D6D7D9]/70 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 border border-white/10 bg-[#030d1e] mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-[#D6D7D9]/50 text-xs tracking-widest uppercase mb-1">Investment</p>
                    <p className="text-[#FBB217] text-xl font-semibold">Starting at $2,500</p>
                    <p className="text-[#D6D7D9]/40 text-xs mt-1">$1,250 per CC — protocols range from 1–10 CC based on physician assessment</p>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-center">
                      <Clock size={16} className="text-[#FBB217] mx-auto mb-1" />
                      <p className="text-[#D6D7D9]/50 text-xs">Under 60 min</p>
                    </div>
                    <div className="text-center">
                      <Shield size={16} className="text-[#FBB217] mx-auto mb-1" />
                      <p className="text-[#D6D7D9]/50 text-xs">Full chain of custody</p>
                    </div>
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
              <p className="section-label mb-4">Systemic Regeneration & Optimization</p>
              <h2
                className="text-[#F6F5EC] mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                STEM CELL IV THERAPY
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-6">
                Our Stem Cell IV Therapy delivers a concentrated infusion of regenerative biologics directly into the bloodstream — allowing them to travel throughout the body, seek out areas of inflammation and cellular stress, and initiate a cascade of repair that affects everything from immune function to cognitive performance to metabolic efficiency.
              </p>
              <p className="text-[#D6D7D9]/80 leading-relaxed mb-8">
                This is the treatment of choice for high-performance individuals who demand more from their health — those who want to restore the biology of a younger self, accelerate recovery, and maintain the edge that separates exceptional from ordinary.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Whole-body cellular restoration",
                  "Reduces systemic inflammation",
                  "Elevates energy and cognitive clarity",
                  "Accelerates athletic recovery",
                  "Supports immune system resilience",
                  "Promotes long-term longevity",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#0047BB] shrink-0" />
                    <span className="text-[#D6D7D9]/70 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 border border-white/10 bg-[#051229] mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-[#D6D7D9]/50 text-xs tracking-widest uppercase mb-1">Investment</p>
                    <p className="text-[#FBB217] text-xl font-semibold">Starting at $4,000</p>
                    <p className="text-[#D6D7D9]/40 text-xs mt-1">$1,250 per CC — protocols range from 1–10 CC based on physician assessment</p>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-center">
                      <Clock size={16} className="text-[#FBB217] mx-auto mb-1" />
                      <p className="text-[#D6D7D9]/50 text-xs">Under 60 min</p>
                    </div>
                    <div className="text-center">
                      <Shield size={16} className="text-[#FBB217] mx-auto mb-1" />
                      <p className="text-[#D6D7D9]/50 text-xs">Full chain of custody</p>
                    </div>
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
                alt="Stem cell IV therapy infusion at CellRX regenerative medicine clinic"
                className="w-full h-96 object-cover"
                loading="lazy"
                decoding="async"
                width="800"
                height="384"
              />
              <div className="absolute top-4 right-4">
                <span
                  className="text-[#FBB217]/20"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "80px", lineHeight: 1 }}
                >
                  02
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Transparency */}
      <section className="py-16 bg-[#051229] border-y border-white/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center fade-up">
            <p className="section-label mb-4">Transparent Pricing</p>
            <h2
              className="text-[#F6F5EC] mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              NO HIDDEN FEES. NO SURPRISES.
            </h2>
            <p className="text-[#D6D7D9]/70 leading-relaxed mb-8">
              Stem cell injection therapy starts at <strong className="text-[#FBB217]">$2,500</strong> and IV therapy starts at <strong className="text-[#FBB217]">$4,000</strong>. All protocols are priced at $1,250 per CC, ranging from 1 CC to a maximum of 10 CC. Your Medical Director will recommend the optimal dose during your private consultation. You will always know exactly what you are investing — and exactly what you are receiving.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { dose: "1–3 CC", price: "$1,250–$3,750", ideal: "Targeted joint or localized treatment" },
                { dose: "4–6 CC", price: "$5,000–$7,500", ideal: "Moderate systemic or multi-site protocols" },
                { dose: "7–10 CC", price: "$8,750–$12,500", ideal: "Maximum systemic regeneration and optimization" },
              ].map((tier, i) => (
                <div key={i} className="p-6 border border-white/10 bg-[#030d1e] text-center">
                  <p className="text-[#FBB217] font-bold text-lg mb-1">{tier.dose}</p>
                  <p className="text-[#F6F5EC] font-semibold text-sm mb-2">{tier.price}</p>
                  <p className="text-[#D6D7D9]/50 text-xs leading-relaxed">{tier.ideal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-[#030d1e]">
        <div className="container">
          <div className="text-center mb-16 fade-up">
            <p className="section-label mb-4">The Process</p>
            <h2
              className="text-[#F6F5EC]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              YOUR JOURNEY TO RENEWAL
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Private Consultation", desc: "A confidential consultation with our Medical Director to assess your health history, goals, and candidacy for regenerative therapy." },
              { step: "02", title: "Custom Protocol", desc: "Your physician designs a personalized treatment protocol — dose, delivery method, and timing — based entirely on your unique biology and goals." },
              { step: "03", title: "Treatment", desc: "Your procedure is performed in our private clinic by your Medical Director using biologics with full chain-of-custody documentation." },
              { step: "04", title: "Ongoing Optimization", desc: "Continued monitoring, follow-up assessments, and protocol refinements to ensure your results are sustained and built upon over time." },
            ].map((step, i) => (
              <div key={i} className="relative fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <p
                  className="text-[#FBB217] mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "80px", lineHeight: 1 }}
                >
                  {step.step}
                </p>
                <h3
                  className="text-[#F6F5EC] mb-3"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#D6D7D9]/60 text-sm leading-relaxed">{step.desc}</p>
                {i < 3 && (
                  <ArrowRight
                    size={20}
                    className="text-[#FBB217]/60 absolute top-8 -right-4 hidden md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 fade-up">
              <p className="section-label mb-4">Common Questions</p>
              <h2
                className="text-[#F6F5EC]"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                STEM CELL THERAPY FAQ
              </h2>
              <p className="text-[#D6D7D9]/60 text-sm mt-4 leading-relaxed">
                Answers to the most common questions about CellRX stem cell injection and IV therapy — pricing, safety, results, and what to expect.
              </p>
            </div>
            <div className="fade-up">
              {SERVICE_FAQS.map((faq, i) => (
                <ServiceFAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
            <div className="mt-10 text-center fade-up">
              <Link href="/contact">
                <button className="btn-primary rounded-none">Book Your Private Consultation</button>
              </Link>
            </div>
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
                Our concierge health partnership — quarterly labs, personalized longevity protocols, and direct physician access. Stem cell treatments available as a premium add-on.
              </p>
            </div>
            <Link href="/black-label">
              <button className="bg-[#FBB217] text-[#051229] font-bold text-xs tracking-widest uppercase px-10 py-4 hover:bg-[#e8a510] transition-colors whitespace-nowrap">
                Explore Black Label
              </button>
            </Link>
          </div>
        </div>
      </section>

      <BackToTop />
      <Footer />
    </div>
  );
}
