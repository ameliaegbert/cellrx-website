/**
 * CellRX FAQ Page — Dedicated Q&A for AI Search Engines & Patients
 * 20 questions covering: pricing, safety, procedures, sourcing, Black Label, longevity
 * Structured for AI citation: answer-first, 40–80 words each
 * FAQPage JSON-LD schema injected via useFAQSchema hook
 */

import { useEffect, useState } from "react";
import { useSEO, PAGE_SEO, useBreadcrumb, useFAQSchema } from "@/hooks/useSEO";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Plus, Minus, ArrowRight } from "lucide-react";

const FAQ_CATEGORIES = [
  {
    category: "Pricing & Costs",
    faqs: [
      {
        q: "How much does stem cell therapy cost at CellRX?",
        a: "Stem cell injection therapy starts at $2,500 and IV therapy starts at $4,000. All protocols are priced at $1,250 per CC, ranging from 1 CC to a maximum of 10 CC. Your Medical Director determines the optimal dose during your private consultation based on your condition and goals. You will always know your exact investment before any commitment is made.",
      },
      {
        q: "How much does CellRX Black Label Concierge Medicine cost?",
        a: "Black Label membership pricing is custom and discussed privately during your consultation — because your protocol is not generic, and neither is your investment. Pricing reflects the level of physician access, the comprehensiveness of your quarterly panels, and any add-on services included in your personalized plan. There is no obligation to join after your consultation.",
      },
      {
        q: "Does insurance cover stem cell therapy at CellRX?",
        a: "Stem cell therapy is not covered by insurance and is considered an elective regenerative procedure. CellRX is a cash-pay practice. All pricing is transparent and discussed in full before any treatment begins. Many patients consider it a high-value investment in avoiding surgery, reducing chronic medication costs, and restoring quality of life.",
      },
    ],
  },
  {
    category: "Safety & Sourcing",
    faqs: [
      {
        q: "Are CellRX stem cells safe?",
        a: "Yes. CellRX biologics are sourced exclusively from healthy, consented local births. They are rigorously screened, never diluted, and never replicated — ensuring maximum therapeutic concentration and full ethical compliance. Our Medical Director serves simultaneously as Medical Director of the stem cell source company, providing unbroken chain-of-custody oversight from procurement to administration.",
      },
      {
        q: "Where do CellRX stem cells come from?",
        a: "CellRX biologics are sourced exclusively from healthy, consented local births — specifically from umbilical cord tissue (Wharton's Jelly). This source provides a high concentration of mesenchymal stem cells. Our Medical Director oversees both the clinic and the source company, ensuring full chain-of-custody documentation and the highest ethical and quality standards in the industry.",
      },
      {
        q: "What makes CellRX stem cells different from other clinics?",
        a: "Most clinics purchase biologics through third-party distributors — products that have changed hands multiple times with no verifiable chain of custody. At CellRX, our Medical Director, Dr. Jacob Egbert, serves simultaneously as Medical Director of our stem cell source company. This dual role ensures every vial has been under direct physician oversight from ethical procurement to administration. Never diluted. Never replicated.",
      },
      {
        q: "Are there any side effects from stem cell therapy?",
        a: "Stem cell therapy at CellRX is generally well-tolerated. Some patients experience mild soreness or inflammation at the injection site for 24–48 hours after treatment — this is a normal part of the regenerative process. Systemic reactions are rare. All treatments are administered by our Medical Director, who monitors every patient and provides personalized aftercare guidance.",
      },
    ],
  },
  {
    category: "Procedures & Results",
    faqs: [
      {
        q: "What is the difference between stem cell injection and IV therapy?",
        a: "Stem cell injection delivers concentrated biologics directly to a specific site of tissue damage — ideal for joint pain, tendon injuries, and localized conditions. IV therapy delivers biologics systemically through the bloodstream, targeting whole-body inflammation, cellular aging, energy, and cognitive performance. Many patients combine both approaches for comprehensive results.",
      },
      {
        q: "How long does a stem cell procedure take at CellRX?",
        a: "Most treatments are completed in under 60 minutes in our private clinic. There is no general anesthesia, no hospital stay, and no surgical incision. The vast majority of patients return to normal activities the same day. We provide personalized aftercare guidance to support healing and optimize your results.",
      },
      {
        q: "When will I see results from stem cell therapy?",
        a: "Many patients report initial improvements in pain and inflammation within two to four weeks. The more significant structural repair — rebuilding of cartilage and connective tissue — continues to unfold over three to six months. Results represent genuine biological repair that tends to be durable at one and two-year follow-up, not a temporary mask.",
      },
      {
        q: "What conditions can stem cell therapy treat at CellRX?",
        a: "Common conditions treated include knee osteoarthritis, hip osteoarthritis, rotator cuff tears and tendinopathy, Achilles tendinopathy, plantar fasciitis, degenerative disc disease, chronic systemic inflammation, post-COVID syndrome, chronic fatigue, and cognitive decline. Your consultation with Dr. Egbert will determine whether your specific condition makes you a strong candidate.",
      },
      {
        q: "What is the maximum stem cell dose available at CellRX?",
        a: "CellRX offers protocols up to 10 CC — the maximum dose available. Dosing is determined by your physician based on your condition and goals, priced at $1,250 per CC. Higher doses are typically recommended for systemic conditions, advanced joint degeneration, or comprehensive longevity protocols. Your Medical Director will recommend the optimal dose during your consultation.",
      },
    ],
  },
  {
    category: "Black Label & Concierge Medicine",
    faqs: [
      {
        q: "What is included in CellRX Black Label Concierge Medicine?",
        a: "Black Label includes quarterly comprehensive laboratory panels, personalized longevity protocols, direct physician access (secure messaging and same-week appointments), priority scheduling, and unlimited consultations. Stem cell treatments are available as a premium add-on. Spouse enrollment is also available. Membership is limited by design to ensure every member receives the full attention and resources they deserve.",
      },
      {
        q: "Who is Black Label Concierge Medicine designed for?",
        a: "Black Label is designed for high-performing individuals — executives, entrepreneurs, athletes, and professionals — who understand that proactive health investment is leverage, not luxury. It is for those who are not satisfied with the reactive model of conventional healthcare and who want a physician who knows their biology intimately and monitors it continuously.",
      },
      {
        q: "Can my spouse join Black Label Concierge Medicine?",
        a: "Yes. Spouse enrollment is available for Black Label members. Pricing for dual enrollment is discussed during your private consultation. Both members receive the same level of physician access, quarterly laboratory panels, and personalized protocol design. This is one of the most popular options for high-achieving couples who prioritize their health together.",
      },
    ],
  },
  {
    category: "Longevity & Health Optimization",
    faqs: [
      {
        q: "What is health optimization at CellRX?",
        a: "CellRX Health Optimization is a physician-directed program that uses comprehensive biomarker testing, hormone balancing, and personalized supplementation to help you perform at your biological peak. Dr. Jacob Egbert designs each protocol around your unique lab results — targeting energy, cognitive clarity, metabolic function, and resilience. It treats declining performance as a solvable problem, not an inevitable outcome.",
      },
      {
        q: "What longevity programs does CellRX offer?",
        a: "CellRX Longevity Programs combine regenerative stem cell biologics, NAD+ therapy, peptide protocols, hormone optimization, and advanced diagnostics to extend your healthspan. Dr. Egbert builds each protocol around your biomarkers, targeting cellular repair, mitochondrial function, and systemic resilience. These programs are designed for individuals who refuse to accept biological decline as inevitable.",
      },
      {
        q: "Does CellRX offer NAD+ therapy?",
        a: "Yes. NAD+ therapy is available as part of CellRX Longevity Programs. NAD+ (nicotinamide adenine dinucleotide) is a coenzyme essential for cellular energy production and DNA repair. Levels decline with age. Replenishing NAD+ through IV infusion supports mitochondrial function, cognitive clarity, and cellular resilience. It is often combined with stem cell therapy for comprehensive regenerative benefit.",
      },
    ],
  },
  {
    category: "Consultations & Location",
    faqs: [
      {
        q: "Where is CellRX located?",
        a: "CellRX is located at 3098 Executive Parkway, Suite 100, Lehi, Utah 84043. We serve patients throughout the Salt Lake City metro area, Utah Valley, and beyond. Many patients travel from out of state for our physician-directed stem cell protocols. Call 385-707-2373 or book online to schedule your private consultation.",
      },
      {
        q: "What happens at a CellRX consultation?",
        a: "Your consultation is a private, one-on-one conversation with Dr. Jacob Egbert. He will review your health history, current concerns, and goals. If you are a candidate for treatment, he will recommend a specific protocol and dosing plan. You will know exactly what you are investing before any commitment is made. There is no pressure and no obligation.",
      },
    ],
  },
];

// Flatten all FAQs for schema
const ALL_FAQS = FAQ_CATEGORIES.flatMap((cat) => cat.faqs);

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
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
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="text-[#D6D7D9]/80 text-sm leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>{a}</p>
      </div>
    </div>
  );
}

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

export default function FAQ() {
  useSEO(PAGE_SEO.faq);
  useBreadcrumb([
    { name: "Home", url: "https://www.cellrx.bio/" },
    { name: "FAQ", url: "https://www.cellrx.bio/faq" },
  ]);
  useFAQSchema(
    ALL_FAQS.map((f) => ({ question: f.q, answer: f.a })),
    "faq-page"
  );
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-[#030d1e] border-b border-white/5">
        <div className="container">
          <p className="section-label mb-4 fade-up">Common Questions</p>
          <h1
            className="text-[#F6F5EC] fade-up"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 96px)", transitionDelay: "0.1s" }}
          >
            STEM CELL THERAPY<br />
            <span className="text-[#FBB217]">FAQ</span>
          </h1>
          <p
            className="text-[#D6D7D9]/70 text-base leading-relaxed mt-6 max-w-2xl fade-up"
            style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "0.2s" }}
          >
            CellRX answers the most common questions about stem cell therapy, IV therapy, Black Label concierge medicine, pricing, safety, and what to expect at our clinic in Lehi, Utah. If you have a question not answered here, call us at{" "}
            <a href="tel:+13857072373" className="text-[#FBB217] hover:underline">385-707-2373</a>{" "}
            or{" "}
            <Link href="/contact" className="text-[#FBB217] hover:underline">book a private consultation</Link>.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-[#051229]">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-16">
            {FAQ_CATEGORIES.map((cat, ci) => (
              <div key={ci} className="fade-up" style={{ transitionDelay: `${ci * 0.05}s` }}>
                <h2
                  className="text-[#FBB217] text-xs font-semibold tracking-widest uppercase mb-6 pb-3 border-b border-[#FBB217]/20"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {cat.category}
                </h2>
                <div>
                  {cat.faqs.map((faq, fi) => (
                    <FAQItem key={fi} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0047BB]">
        <div className="container text-center">
          <p className="section-label mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>Still Have Questions?</p>
          <h2
            className="text-white mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            SPEAK DIRECTLY WITH<br />DR. JACOB EGBERT
          </h2>
          <p className="text-white/80 text-base max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Your consultation is a private, no-obligation conversation. Ask anything. Get honest answers. Know exactly what you are investing before any commitment is made.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <button
                className="bg-[#FBB217] text-[#051229] font-bold text-xs tracking-widest uppercase px-10 py-4 hover:bg-[#f0a800] transition-colors"
                aria-label="Book a private stem cell consultation at CellRX"
              >
                Book Your Private Consultation
              </button>
            </Link>
            <a href="tel:+13857072373">
              <button className="border border-white text-white font-bold text-xs tracking-widest uppercase px-10 py-4 hover:bg-white hover:text-[#0047BB] transition-colors">
                Call 385-707-2373
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-16 bg-[#030d1e] border-t border-white/5">
        <div className="container">
          <p className="text-[#D6D7D9]/50 text-xs tracking-widest uppercase mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>Explore Further</p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Stem Cell Injection & IV Therapy", href: "/services" },
              { label: "Black Label Concierge Medicine", href: "/black-label" },
              { label: "Health Optimization", href: "/health-optimization" },
              { label: "Longevity Programs", href: "/longevity-programs" },
              { label: "Patient Testimonials", href: "/testimonials" },
              { label: "Blog & Research", href: "/blog" },
            ].map((link, i) => (
              <Link key={i} href={link.href}>
                <button className="flex items-center gap-2 text-[#D6D7D9]/60 text-xs hover:text-[#FBB217] transition-colors border border-white/10 px-4 py-2 hover:border-[#FBB217]/30">
                  {link.label} <ArrowRight size={12} />
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BackToTop />
      <Footer />
    </div>
  );
}
