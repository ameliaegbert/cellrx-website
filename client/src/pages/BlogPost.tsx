/*
 * CellRX Blog Post Page — Editorial Dark Luxury
 * Individual article pages with full content, SEO structure, and CTAs
 * Route: /blog/:slug
 */

import { useEffect } from "react";
import { Link, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ArrowLeft, Calendar, Clock, Award } from "lucide-react";
import { useSEO, getBlogPostSEO } from "@/hooks/useSEO";

const PHYSICIAN_PORTRAIT = "/manus-storage/physician_portrait_opt_0f7ccc2a_49ec7e57.webp";

const INJECTION_IMG = "/manus-storage/service_injection_opt_c744419a_a1cec12d.webp";
const IV_IMG = "/manus-storage/service_iv_opt_42742b15_4d88b573.webp";
const CLINIC_IMG = "/manus-storage/clinic_interior_opt_d513ed06_f900112b.webp";
const PHYSICIAN_IMG = "/manus-storage/clinic_interior_opt_d513ed06_f900112b.webp";
const BG_DARK_IMG = "/manus-storage/background_dark_opt_b4ede28a_fed4916f.webp";
const BLACK_LABEL_IMG = "/manus-storage/service_black_label_opt_686cc654_3484a9b6.webp";

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

interface ArticleData {
  slug: string;
  img: string;
  category: string;
  title: string;
  date: string;
  lastUpdated?: string;
  readTime: string;
  author: string;
  authorTitle?: string;
  excerpt: string;
  body: string[];
  headings: { after: number; text: string }[];
  cta: { label: string; href: string };
  relatedSlugs: string[];
  internalLinks?: { label: string; href: string; desc: string }[];
  serviceLinks?: { label: string; href: string }[];
}

const articles: ArticleData[] = [
  {
    slug: "stem-cell-injection-joint-repair",
    img: INJECTION_IMG,
    category: "Stem Cell Injection",
    title: "How Stem Cell Injection Therapy Is Changing the Future of Joint Repair",
    date: "March 15, 2026",
    lastUpdated: "May 2026",
    readTime: "8 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    excerpt: "For decades, patients with chronic joint pain faced a difficult choice: manage symptoms indefinitely or undergo invasive surgery. Stem cell injection therapy is rewriting that narrative.",
    headings: [
      { after: 0, text: "Understanding the Biology of Joint Degeneration" },
      { after: 2, text: "What Happens During a Stem Cell Injection" },
      { after: 5, text: "What the Research Shows" },
      { after: 7, text: "Who Is a Candidate?" },
      { after: 9, text: "The Timeline of Results" },
    ],
    body: [
      "For decades, patients with chronic joint pain faced a difficult choice: manage symptoms indefinitely with medications that mask the problem, or undergo invasive surgery that carries significant risk and requires months of rehabilitation. Stem cell injection therapy is offering a third path that supports the body's natural processes rather than simply suppressing symptoms.",
      "Joints degrade for a variety of reasons — repetitive stress, acute injury, autoimmune conditions, and the natural aging process among them. What these causes share is a common mechanism: the breakdown of cartilage, tendon, and connective tissue faster than the body can repair it. Conventional treatments — NSAIDs, corticosteroid injections, physical therapy — address the inflammatory response but do nothing to restore the underlying structural integrity of the joint.",
      "This is where regenerative biologics change the equation. Mesenchymal stem cells, when introduced to a site of tissue damage, release a cascade of paracrine signals — chemical messengers that engage the body's own natural processes, modulate inflammation, and support the production of new cartilage and connective tissue. Individual results may vary.",
      "At CellRX, every injection protocol begins with a comprehensive consultation. Our Medical Director reviews imaging, assesses the degree of joint damage, and determines the appropriate dosing — typically between 1 CC and 10 CC of concentrated biologics, depending on the severity of the condition and the patient's goals.",
      "The procedure itself takes under 60 minutes. Using ultrasound or fluoroscopic guidance when indicated, the biologics are delivered precisely to the site of damage. There is no general anesthesia, no hospital stay, and no surgical incision. The vast majority of patients return to normal activities the same day.",
      "What distinguishes CellRX from other providers is the provenance of the biologics. Our Medical Director serves simultaneously as the Medical Director of our stem cell source company — meaning every vial has been under direct physician oversight from the moment of ethical procurement through the moment of administration. The biologics are never diluted, never replicated, and always sourced from healthy, consented local births.",
      "The clinical literature on mesenchymal stem cell therapy for joint conditions has grown substantially over the past decade. Studies published in peer-reviewed journals including the American Journal of Sports Medicine and Stem Cells Translational Medicine have documented meaningful improvements in pain scores, functional outcomes, and cartilage volume in patients with knee osteoarthritis, rotator cuff injuries, and hip degeneration following stem cell injection.",
      "It is important to note that regenerative medicine is a rapidly evolving field, and outcomes vary based on the quality of the biologic product, the precision of delivery, and the individual patient's biology. At CellRX, we are transparent about what the evidence supports and what remains under investigation — because an informed patient is an empowered patient.",
      "Stem cell injection therapy is most appropriate for patients who have exhausted conservative treatments without achieving satisfactory relief, and who are not yet at the stage of joint damage that makes surgery unavoidable. It is also an excellent option for patients who are surgical candidates but wish to explore alternatives before committing to an invasive procedure.",
      "Common conditions we treat with stem cell injection include knee osteoarthritis, hip osteoarthritis, rotator cuff tears and tendinopathy, Achilles tendinopathy, plantar fasciitis, and degenerative disc disease. The consultation process will determine whether your specific condition and degree of damage make you a strong candidate for this approach.",
      "Regenerative support operates at the cellular level, which means the timeline of results is different from conventional treatments. Many patients report initial improvements in pain and inflammation within the first two to four weeks. Continued biological support unfolds over three to six months. Individual results may vary. These statements have not been evaluated by the FDA.",
      "Many patients report sustained improvement at follow-up assessments. Individual results may vary.",
    ],
    cta: { label: "Learn About Stem Cell Injection", href: "/services" },
    relatedSlugs: ["iv-stem-cell-therapy-science", "chain-of-custody-stem-cells", "regenerative-medicine-athletes"],
    internalLinks: [
      { label: "Why Chain of Custody Matters", href: "/blog/chain-of-custody-stem-cells", desc: "How CellRX ensures unbroken biologic integrity from source to syringe" },
      { label: "IV Therapy vs. Injection: Which Is Right for You?", href: "/blog/iv-stem-cell-therapy-science", desc: "Compare systemic and targeted delivery methods" },
    ],
    serviceLinks: [
      { label: "View Stem Cell Injection Pricing", href: "/services" },
      { label: "Book a Consultation", href: "/contact" },
    ],
  },
  {
    slug: "iv-stem-cell-therapy-science",
    img: IV_IMG,
    category: "Stem Cell IV Therapy",
    title: "The Science of Systemic Regeneration: What Happens During IV Stem Cell Therapy",
    date: "February 28, 2026",
    readTime: "10 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    lastUpdated: "May 2026",
    excerpt: "When regenerative biologics are delivered intravenously, they actively seek out areas of inflammation and cellular stress, initiating a cascade of repair signals that can affect everything from immune function to cognitive performance.",
    headings: [
      { after: 0, text: "The Homing Mechanism" },
      { after: 2, text: "Systemic vs. Targeted Effects" },
      { after: 4, text: "What Patients Experience" },
      { after: 6, text: "Dosing and Protocol" },
      { after: 8, text: "Who Benefits Most" },
    ],
    body: [
      "When regenerative biologics are delivered intravenously, they don't simply circulate passively through the bloodstream. They actively seek out areas of inflammation and cellular stress — a phenomenon researchers call homing — engaging the body's natural renewal processes across immune function, cognitive performance, and metabolic health.",
      "Mesenchymal stem cells possess a remarkable ability to migrate toward sites of tissue damage and inflammation. This is mediated by a class of signaling molecules called chemokines, which are released by injured or inflamed tissue. The stem cells express receptors for these chemokines, allowing them to follow the chemical gradient to the precise location where repair is needed.",
      "When delivered intravenously, the biologics first pass through the pulmonary circulation — the lungs — where a significant portion are temporarily sequestered. This pulmonary first-pass effect is not a limitation but a feature: the lungs are a major site of immune regulation, and the interaction between the biologics and pulmonary immune cells appears to modulate systemic inflammation in ways that contribute to the whole-body effects patients report.",
      "The distinction between IV therapy and targeted injection is not one of superiority but of application. Injection therapy delivers a concentrated dose to a specific anatomical site — ideal for discrete joint or tissue pathology. IV therapy delivers biologics systemically, making it the appropriate choice for conditions that are diffuse rather than localized: systemic inflammation, immune dysregulation, accelerated aging, cognitive decline, and chronic fatigue.",
      "Many patients choose IV therapy as a complement to injection therapy — addressing both the specific site of damage and the broader systemic environment that may be contributing to it. Others choose IV therapy as a standalone longevity and optimization protocol, seeking the whole-body regenerative effects without a specific pathological target.",
      "The IV infusion itself takes approximately 60 to 90 minutes in our private clinic environment. Patients typically report feeling relaxed during the infusion, with no significant discomfort. The biologics are delivered through a standard IV line at a controlled rate, with vital signs monitored throughout.",
      "In the days following the infusion, some patients report a mild fatigue — a sign that the immune system is actively engaging with the biologics and initiating repair processes. This typically resolves within 24 to 48 hours. The more notable effects — improvements in energy, cognitive clarity, sleep quality, and recovery — tend to emerge over the following two to eight weeks.",
      "At CellRX, IV therapy is priced at $1,250 per CC, with protocols ranging from 1 CC to a maximum of 10 CC based on the patient's condition, goals, and the Medical Director's clinical assessment. The starting price for IV therapy is $4,000. Every biologic carries full chain of custody — never diluted, never replicated, always from healthy, consented local births under direct physician oversight.",
      "The optimal dosing protocol is determined during your private consultation. Some patients benefit from a single high-dose infusion; others achieve better outcomes with a series of lower-dose infusions spaced over several months. Your Medical Director will design the protocol that best matches your biology and goals.",
      "IV stem cell therapy is particularly well-suited for individuals experiencing the effects of accelerated biological aging, chronic systemic inflammation, post-COVID syndrome, autoimmune conditions, chronic fatigue, and cognitive decline. It is also increasingly chosen by high-performing executives and athletes as a proactive longevity investment — not in response to a specific pathology, but as a strategy for maintaining peak biological function.",
    ],
    cta: { label: "Learn About IV Therapy", href: "/services" },
    relatedSlugs: ["stem-cell-injection-joint-repair", "quarterly-labs-longevity", "regenerative-medicine-athletes"],
    internalLinks: [
      { label: "Stem Cell Injection for Joint Repair", href: "/blog/stem-cell-injection-joint-repair", desc: "How targeted injection compares to systemic IV delivery" },
      { label: "Quarterly Labs & Longevity", href: "/blog/quarterly-labs-longevity", desc: "Combining IV therapy with biomarker monitoring for optimal results" },
    ],
    serviceLinks: [
      { label: "View IV Therapy Pricing", href: "/services" },
      { label: "Book a Consultation", href: "/contact" },
    ],
  },
  {
    slug: "top-performers-concierge-medicine",
    img: BLACK_LABEL_IMG,
    category: "Black Label",
    title: "Why the World's Top Performers Choose Proactive Concierge Medicine",
    date: "February 10, 2026",
    readTime: "6 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    lastUpdated: "May 2026",
    excerpt: "The most sophisticated approach to health is not reactive — it is proactive. Black Label Concierge Medicine is built for individuals who understand that quarterly biomarker monitoring, personalized protocols, and direct physician access are not luxuries — they are leverage.",
    headings: [
      { after: 0, text: "The Problem With Conventional Healthcare" },
      { after: 3, text: "What Quarterly Biomarker Monitoring Reveals" },
      { after: 5, text: "Direct Physician Access as a Performance Asset" },
      { after: 7, text: "The ROI of Proactive Health Investment" },
    ],
    body: [
      "The most sophisticated approach to health is not reactive — it is proactive. Black Label Concierge Medicine is built for individuals who understand that quarterly biomarker monitoring, personalized protocols, and direct physician access are not luxuries — they are leverage. The same discipline that drives exceptional performance in business, athletics, and creative endeavors applies equally to biology.",
      "The conventional healthcare system is designed around a reactive model: you develop symptoms, you seek care, you receive treatment. For the vast majority of people, this is the only healthcare they have ever known. For high-performing individuals, it is fundamentally insufficient.",
      "Consider what the reactive model misses. Cardiovascular disease develops silently for years before the first cardiac event. Hormonal decline is gradual and often attributed to stress or aging rather than identified and addressed. Metabolic dysfunction — insulin resistance, chronic inflammation, mitochondrial inefficiency — can persist for a decade before manifesting as a diagnosable condition. By the time conventional medicine identifies these problems, significant biological damage has already occurred.",
      "Proactive concierge medicine inverts this model. Rather than waiting for decline, it monitors continuously, intervenes early, and builds personalized protocols that evolve with your biology over time.",
      "A comprehensive quarterly lab panel at CellRX goes far beyond the standard annual physical. It includes a full metabolic panel, complete blood count, lipid panel with particle sizing, inflammatory markers, hormone panel, insulin and glucose metabolism markers, nutrient status, and longevity biomarkers including biological age assessments.",
      "The value of this data is not in any single measurement but in the trend over time. A testosterone level of 450 ng/dL means nothing in isolation. In the context of a patient whose level was 620 ng/dL eighteen months ago, it signals a meaningful decline that warrants investigation and intervention — before it manifests as fatigue, cognitive fog, or loss of muscle mass.",
      "Black Label members have direct access to their Medical Director — not a nurse practitioner, not a scheduling coordinator, but the physician who designed their protocol and who knows their biology intimately. This access is available via secure messaging and same-week appointments, with after-hours support for urgent questions.",
      "The value of this access is difficult to quantify but easy to understand. When a Black Label member notices a change in their sleep, energy, or cognitive performance, they can reach their physician directly and receive a substantive response within hours — not schedule an appointment three weeks out with a provider who has never seen their labs.",
      "The individuals who choose Black Label are not spending money on healthcare — they are investing in their most valuable asset. The return on that investment is measured in sustained cognitive performance, physical resilience, reduced sick days, extended career longevity, and the compounding advantage of a biology that is optimized rather than merely maintained.",
      "Membership is limited by design. We accept a small number of new members each year to ensure every member receives the full attention, resources, and physician access they deserve. If you are ready to invest in your health at the highest level, we invite you to begin the conversation.",
    ],
    cta: { label: "Explore Black Label", href: "/black-label" },
    relatedSlugs: ["quarterly-labs-longevity", "first-cellrx-consultation", "iv-stem-cell-therapy-science"],
    internalLinks: [
      { label: "Quarterly Labs & Longevity", href: "/blog/quarterly-labs-longevity", desc: "How biomarker monitoring drives personalized health protocols" },
      { label: "What to Expect at Your First Consultation", href: "/blog/first-cellrx-consultation", desc: "A step-by-step guide to beginning your Black Label journey" },
    ],
    serviceLinks: [
      { label: "Black Label Membership Details", href: "/black-label" },
      { label: "Health Optimization Programs", href: "/health-optimization" },
    ],
  },
  {
    slug: "first-cellrx-consultation",
    img: PHYSICIAN_IMG,
    category: "Patient Education",
    title: "What to Expect at Your First CellRX Consultation",
    date: "January 22, 2026",
    readTime: "5 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    lastUpdated: "May 2026",
    excerpt: "Your first consultation at CellRX is a comprehensive, unhurried conversation about your health history, goals, and concerns.",
    headings: [
      { after: 0, text: "Before You Arrive" },
      { after: 2, text: "The Consultation Itself" },
      { after: 5, text: "What You Will Learn" },
      { after: 7, text: "After Your Consultation" },
    ],
    body: [
      "Your first consultation at CellRX is a comprehensive, unhurried conversation about your health history, goals, and concerns. It is not a sales appointment. It is not a 15-minute intake. It is the beginning of a clinical relationship built on transparency, education, and a genuine commitment to your outcomes.",
      "We ask that you complete a health history questionnaire before your appointment. This allows our Medical Director to review your background in advance and come prepared with specific questions and preliminary observations. If you have recent lab work, imaging, or records from other providers, please bring them — or have them sent in advance.",
      "There is no need to fast or prepare in any special way for the consultation itself. Come as you are, with your questions written down if that helps you stay organized. Many patients find it useful to bring a list of their current medications and supplements.",
      "Consultations are conducted privately with our Medical Director. You will not be seen by a nurse practitioner or physician assistant first — you will meet directly with the physician who will design and oversee your protocol. This is a fundamental difference between CellRX and most medical practices.",
      "The conversation typically covers your primary health concerns and goals, your relevant medical history, any previous treatments you have tried and their outcomes, your lifestyle — sleep, nutrition, exercise, stress — and your expectations for regenerative therapy.",
      "The Medical Director will ask detailed questions and listen carefully. This is not a checklist exercise; it is a clinical conversation designed to give him the full picture of your biology before making any recommendations.",
      "By the end of your consultation, you will have a clear understanding of whether you are a candidate for stem cell therapy, IV therapy, Black Label membership, or a combination approach. If you are a candidate, the Medical Director will explain the recommended protocol — dosing, timing, expected outcomes, and the rationale for the recommendation — in plain language.",
      "You will also receive transparent pricing. We do not believe in hidden fees or pressure tactics. Every investment is clearly explained before any commitment is made. You will leave the consultation with a complete picture of what the treatment involves, what it costs, and what you can realistically expect.",
      "If you decide to proceed, our team will coordinate scheduling, pre-treatment instructions, and any additional testing that may be indicated. If you need time to consider, there is no pressure — we will follow up at whatever pace is comfortable for you.",
      "Our goal is not to close a transaction. It is to begin a clinical relationship that serves your health for years to come.",
    ],
    cta: { label: "Book Your Consultation", href: "/contact" },
    relatedSlugs: ["stem-cell-injection-joint-repair", "iv-stem-cell-therapy-science", "top-performers-concierge-medicine"],
    internalLinks: [
      { label: "Stem Cell Injection Therapy", href: "/blog/stem-cell-injection-joint-repair", desc: "Understand the treatment you may be considering" },
      { label: "Why Top Performers Choose Concierge Medicine", href: "/blog/top-performers-concierge-medicine", desc: "The case for proactive, personalized health investment" },
    ],
    serviceLinks: [
      { label: "View All Services & Pricing", href: "/services" },
      { label: "Book Your Consultation Now", href: "/contact" },
    ],
  },
  {
    slug: "chain-of-custody-stem-cells",
    img: BG_DARK_IMG,
    category: "Research",
    title: "Chain of Custody: Why the Source of Your Stem Cells Matters More Than You Think",
    date: "January 8, 2026",
    readTime: "12 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    lastUpdated: "May 2026",
    excerpt: "Not all stem cell products are created equal. The difference between a diluted, replicated biologic and a full-concentration, ethically sourced product is the difference between marginal results and transformative outcomes.",
    headings: [
      { after: 0, text: "How Most Clinics Source Their Biologics" },
      { after: 3, text: "The Questions Every Patient Should Ask" },
      { after: 6, text: "The CellRX Standard" },
      { after: 9, text: "Why This Matters for Your Outcomes" },
    ],
    body: [
      "Not all stem cell products are created equal. The difference between a diluted, replicated biologic and a full-concentration, ethically sourced product from a healthy local birth is the difference between marginal results and transformative outcomes. Understanding the supply chain behind the biologics you receive is not a technical detail — it is the most important question you can ask before choosing a regenerative medicine provider.",
      "The vast majority of regenerative medicine clinics in the United States do not have direct relationships with their biologic sources. They purchase through distributors — intermediaries who aggregate products from multiple tissue banks, process them according to their own protocols, and resell them to clinics at a markup. By the time a vial reaches a patient, it may have changed hands three or four times.",
      "Each handoff introduces risk. Dilution — intentional or accidental — reduces the concentration of viable cells. Temperature excursions during shipping degrade cell viability. Documentation gaps make it impossible to verify the health status of the donor, the conditions of procurement, or the integrity of the processing chain.",
      "When a clinic tells you their biologics are high quality, ask them to prove it. Ask for the certificate of analysis. Ask for the name of the tissue bank. Ask whether the product has been replicated — meaning whether the original cells were expanded in culture to produce a larger volume. Ask how many times the product changed hands between procurement and your treatment.",
      "Most clinics cannot answer these questions. Not because they are being deceptive, but because they genuinely do not know. They trusted their distributor, who trusted their supplier, who may or may not have maintained rigorous standards throughout the chain.",
      "The right questions to ask any regenerative medicine provider are: Who is your source? What is the chain of custody documentation? Has the product been diluted or replicated? What is the cell viability at the time of administration? Can you provide a certificate of analysis for the specific lot being used in my treatment?",
      "At CellRX, our Medical Director serves simultaneously as the Medical Director of our stem cell source company. This is not a marketing claim — it is a structural fact that changes everything about the quality and provenance of what we administer.",
      "Because our Medical Director oversees both the clinic and the source company, every biologic we administer has been under direct physician oversight from the moment of ethical procurement through the moment it enters your body. There are no distributors. There are no intermediaries. There is no gap in the chain of custody.",
      "Our biologics are sourced exclusively from healthy, consented local births. They are never diluted and never replicated — you receive the full therapeutic concentration of the original product. Every lot comes with complete documentation that we can provide upon request.",
      "The concentration and viability of the biologics you receive directly determines the magnitude of the regenerative response your body can mount. A diluted product with reduced cell viability will produce a diminished response — or no response at all. A full-concentration product from a verified, healthy source gives your body the maximum signal it needs to initiate repair.",
      "This is why patients who have tried stem cell therapy elsewhere and seen minimal results often experience dramatically different outcomes at CellRX. The therapy is the same. The biology is the same. The difference is the quality of the product — and the integrity of the chain of custody behind it.",
    ],
    cta: { label: "Our Chain-of-Custody Standard", href: "/services" },
    relatedSlugs: ["stem-cell-injection-joint-repair", "iv-stem-cell-therapy-science", "first-cellrx-consultation"],
    internalLinks: [
      { label: "Stem Cell Injection Therapy", href: "/blog/stem-cell-injection-joint-repair", desc: "How full chain-of-custody biologics perform in targeted treatment" },
      { label: "IV Stem Cell Therapy", href: "/blog/iv-stem-cell-therapy-science", desc: "Systemic delivery of verified, full-concentration biologics" },
    ],
    serviceLinks: [
      { label: "View Our Biologic Standards", href: "/services" },
      { label: "Ask Us About Our Source", href: "/contact" },
    ],
  },
  {
    slug: "quarterly-labs-longevity",
    img: CLINIC_IMG,
    category: "Longevity & Optimization",
    title: "Quarterly Labs and Longevity: How Biomarker Monitoring Changes Everything",
    date: "December 20, 2025",
    readTime: "7 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    lastUpdated: "May 2026",
    excerpt: "Most people only see a doctor when something is wrong. The most successful longevity strategies are built on the opposite principle: continuous monitoring, early intervention, and personalized protocols.",
    headings: [
      { after: 0, text: "The Limits of Annual Checkups" },
      { after: 2, text: "What a Comprehensive Panel Reveals" },
      { after: 4, text: "The Power of Trend Data" },
      { after: 6, text: "From Data to Protocol" },
      { after: 8, text: "Longevity Is Not Luck" },
    ],
    body: [
      "Most people only see a doctor when something is wrong. The most successful longevity strategies are built on the opposite principle: continuous monitoring, early intervention, and personalized protocols that evolve with your biology — not against it.",
      "The standard annual physical is a snapshot taken once a year, measuring a narrow set of markers against population-average reference ranges. It is designed to identify disease, not to optimize health. For the vast majority of people, it will tell them they are normal — right up until the moment something goes wrong.",
      "The problem with normal is that it is not optimal. A testosterone level of 300 ng/dL is within the reference range for a 60-year-old man. It is also associated with fatigue, cognitive decline, reduced muscle mass, and increased cardiovascular risk. Normal and optimal are not the same thing.",
      "A comprehensive quarterly biomarker panel at CellRX covers the full spectrum of health and performance markers: metabolic function, hormonal balance, inflammatory status, cardiovascular risk, nutrient status, immune function, and longevity biomarkers including biological age assessments. This is not a standard blood panel — it is a complete picture of your biological status.",
      "The markers we track include: fasting glucose and insulin, HbA1c, full lipid panel with particle sizing, hsCRP and other inflammatory markers, complete hormone panel (testosterone, estradiol, DHEA, cortisol, thyroid), complete blood count, comprehensive metabolic panel, vitamin D, B12, magnesium, ferritin, and telomere length.",
      "The true value of quarterly monitoring is not any single measurement — it is the trend data that accumulates over time. A single testosterone reading tells you where you are today. Four readings over twelve months tell you whether you are declining, stable, or improving — and at what rate.",
      "This trend data is what allows your Medical Director to intervene before problems become symptomatic. A gradual decline in testosterone over six months is an opportunity for early intervention. A rising hsCRP trend is a signal to investigate and address the source of inflammation before it contributes to cardiovascular or metabolic disease.",
      "Biomarker data is only valuable if it drives action. At CellRX, every quarterly panel is followed by a consultation with your Medical Director to review the results, identify trends, and adjust your protocol accordingly. This might mean modifying a supplement regimen, adjusting a hormone optimization protocol, recommending a dietary change, or scheduling a regenerative treatment.",
      "The protocol is not static — it evolves with your biology. As your markers improve, the protocol is refined to continue driving progress. As new research emerges, the protocol is updated to incorporate the latest evidence. This is what personalized medicine actually means.",
      "The individuals who thrive into their 60s, 70s, and beyond are not the ones who were genetically lucky — they are the ones who invested in understanding and optimizing their biology decades earlier. Longevity is not a passive outcome. It is the result of deliberate, informed, continuous investment in the systems that keep you alive and performing at your best.",
    ],
    cta: { label: "Explore Quarterly Lab Panels", href: "/black-label" },
    relatedSlugs: ["top-performers-concierge-medicine", "first-cellrx-consultation", "iv-stem-cell-therapy-science"],
    internalLinks: [
      { label: "Why Top Performers Choose Concierge Medicine", href: "/blog/top-performers-concierge-medicine", desc: "The ROI of proactive health investment" },
      { label: "Longevity Programs at CellRX", href: "/longevity-programs", desc: "Science-backed longevity protocols built on biomarker data" },
    ],
    serviceLinks: [
      { label: "Black Label Concierge Membership", href: "/black-label" },
      { label: "Health Optimization Programs", href: "/health-optimization" },
    ],
  },
  {
    slug: "regenerative-medicine-athletes",
    img: INJECTION_IMG,
    category: "Athlete Performance",
    title: "Regenerative Medicine for Elite Athletes: Accelerating Recovery Without Compromise",
    date: "December 15, 2025",
    readTime: "9 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    lastUpdated: "May 2026",
    excerpt: "Elite athletes push their bodies to the limit — and the recovery demands are equally extreme. Regenerative therapies are becoming an essential tool in the performance medicine toolkit.",
    headings: [
      { after: 0, text: "The Recovery Problem in Elite Sport" },
      { after: 2, text: "How Regenerative Biologics Accelerate Recovery" },
      { after: 4, text: "Injury Treatment vs. Performance Optimization" },
      { after: 6, text: "The CellRX Athlete Protocol" },
      { after: 8, text: "Career Longevity as a Strategic Asset" },
    ],
    body: [
      "Elite athletes push their bodies to the limit — and the recovery demands are equally extreme. Regenerative therapies are becoming an essential tool in the performance medicine toolkit, offering faster healing, reduced inflammation, and extended career longevity without the risks associated with surgery or long-term pharmaceutical use.",
      "The fundamental challenge in elite sport is not performance — it is recovery. The training loads required to compete at the highest level generate cumulative tissue stress that, over time, exceeds the body's natural repair capacity. Tendons develop micro-tears. Cartilage thins. Chronic inflammation becomes the baseline state. The result is a gradual decline in performance, increasing injury risk, and ultimately a shortened career.",
      "Conventional sports medicine addresses these problems reactively — treating injuries after they occur, managing inflammation with corticosteroids that provide short-term relief at the cost of long-term tissue integrity. Regenerative medicine offers a fundamentally different approach: proactively supporting the body's repair capacity so that the gap between tissue stress and tissue repair never becomes a deficit.",
      "Mesenchymal stem cells and their associated growth factors support tissue through multiple mechanisms. They modulate the inflammatory response — promoting a healthy inflammatory balance that supports recovery without suppressing the acute inflammatory response necessary for healing. They support the production of new collagen, cartilage, and connective tissue. They promote angiogenesis — the formation of new blood vessels — which may improve the delivery of nutrients and oxygen to damaged tissue.",
      "The result is faster recovery from training loads, reduced injury risk, and the ability to sustain higher training volumes over longer periods. For elite athletes, this translates directly to competitive advantage.",
      "Regenerative medicine at CellRX serves two distinct populations of athletes: those recovering from specific injuries, and those investing proactively in their biological resilience. Both applications are valid; the protocol differs based on the athlete's specific situation and goals.",
      "For injury recovery, stem cell injection therapy delivers concentrated biologics directly to the site of damage — a torn tendon, a degenerating joint, a chronic soft tissue injury. The goal is to support the healing process and support function. For proactive optimization, IV therapy delivers biologics systemically, supporting whole-body recovery, promoting a healthy inflammatory response, and supporting the biological environment that allows the athlete to train and compete at their highest level. Individual results may vary.",
      "At CellRX, every athlete protocol begins with a comprehensive consultation that reviews training history, injury history, current performance markers, and specific goals. The Medical Director designs a protocol that addresses both the immediate clinical picture and the long-term performance objectives.",
      "Dosing is determined based on the severity of the condition and the athlete's goals, ranging from 1 CC to 10 CC. Every biologic carries full chain of custody — never diluted, never replicated, always from healthy, consented local births under direct physician oversight.",
      "The athletes who perform at the highest level into their 30s, 40s, and beyond are not simply genetically gifted — they are the ones who have invested intelligently in their biological maintenance. Career longevity is not an accident. It is the result of treating the body as a high-performance system that requires proactive maintenance, not just reactive repair.",
    ],
    cta: { label: "Explore Athlete Protocols", href: "/services" },
    relatedSlugs: ["stem-cell-injection-joint-repair", "iv-stem-cell-therapy-science", "chain-of-custody-stem-cells"],
    internalLinks: [
      { label: "Stem Cell Injection for Joint Repair", href: "/blog/stem-cell-injection-joint-repair", desc: "Targeted treatment for sports injuries and joint degeneration" },
      { label: "IV Stem Cell Therapy", href: "/blog/iv-stem-cell-therapy-science", desc: "Systemic recovery optimization for elite performance" },
    ],
    serviceLinks: [
      { label: "View Athlete Treatment Protocols", href: "/services" },
      { label: "Book a Consultation", href: "/contact" },
    ],
  },
  // ─── NEW ARTICLES — Aug/Sep/Oct 2026 drip schedule ───────────────────────
  {
    slug: "mesenchymal-stem-cell-therapy-patient-guide",
    img: INJECTION_IMG,
    category: "Stem Cell Therapy",
    title: "What Is Mesenchymal Stem Cell Therapy? A Patient's Guide",
    date: "August 11, 2026",
    lastUpdated: "August 2026",
    readTime: "10 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    excerpt: "Mesenchymal stem cell therapy uses adult stem cells to help modulate inflammation and support tissue repair. Most non-FDA-approved uses remain investigational — here is what the current evidence shows and what to ask before treatment.",
    headings: [
      { after: 0, text: "What Mesenchymal Stem Cells Are" },
      { after: 2, text: "How MSC Therapy Is Typically Administered" },
      { after: 4, text: "What the Research Currently Shows" },
      { after: 6, text: "Regulatory Status" },
      { after: 8, text: "Questions to Ask Before Treatment" },
      { after: 10, text: "Possible Risks and Side Effects" },
      { after: 12, text: "What Realistic Outcomes Might Look Like" },
    ],
    body: [
      "THIS NOTICE MUST BE PROVIDED TO YOU UNDER UTAH LAW. This health care practitioner performs one or more stem cell therapies that have not yet been approved by the United States Food and Drug Administration. You are encouraged to consult with your primary care provider before undergoing a stem cell therapy.",
      "Mesenchymal stem cell (MSC) therapy uses adult stem cells sourced from bone marrow, fat tissue, or umbilical cord tissue, delivered by IV infusion or direct injection, to help modulate inflammation and support tissue repair. Most non-FDA-approved uses remain investigational, and clinical evidence varies significantly by condition, cell source, and protocol. A qualified provider can review your history and explain what the current evidence does and does not show for your specific situation.",
      "Key Takeaways: MSCs are multipotent adult stem cells found in bone marrow, fat tissue, and umbilical cord tissue — not embryonic stem cells. They can be autologous (from the patient's own tissue) or allogeneic (from donor tissue), and are typically delivered by IV infusion or direct injection. Outside of a small number of FDA-approved products and registered clinical trials, most MSC applications are considered investigational. The strength of clinical evidence varies widely by condition; orthopedic applications such as knee osteoarthritis have a larger body of randomized trial data than many other uses.",
      "Mesenchymal stem cells (MSCs) are a type of adult stem cell found in tissues such as bone marrow, adipose (fat) tissue, and umbilical cord tissue. Unlike embryonic stem cells, MSCs are multipotent rather than pluripotent, meaning they can develop into a limited range of cell types — primarily those associated with bone, cartilage, muscle, and fat. Researchers have studied MSCs for several decades because of their ability to self-renew and their role in modulating the body's inflammatory and immune responses.",
      "In a clinical setting, mesenchymal stem cells are usually delivered by intravenous (IV) infusion or by direct injection into a targeted area, such as a joint. The cells used in a given treatment may be sourced from the patient's own tissue (autologous) or from a donor source such as umbilical cord tissue (allogeneic). The specific sourcing, processing, and handling of the cells varies by provider and product, and patients should ask their clinic directly which source and processing method is being used for their treatment.",
      "Clinical interest in MSC therapy spans areas such as orthopedic conditions, autoimmune conditions, and general recovery and inflammation support. The evidence base is strongest for certain orthopedic applications: a 2025 network meta-analysis of randomized controlled trials found that intra-articular adipose-derived MSC injections produced measurable pain and functional improvements in knee osteoarthritis patients compared with placebo or standard care [1]. Other systematic reviews of MSC injections for knee osteoarthritis have reported similarly favorable safety profiles, though several also note that some of the observed benefit may be attributable to contextual or placebo-related effects, and that trial quality and cell protocols vary considerably [2].",
      "Outside of orthopedic applications, MSC research spans a wide range of conditions — including cardiovascular, autoimmune, and inflammatory disease — with results that vary by condition, cell source, and dosing protocol. Patients should understand that while early research and patient-reported outcomes may be promising in some areas, MSC therapy for many conditions has not been definitively proven effective through large-scale, peer-reviewed clinical trials, and outcomes can vary significantly from person to person.",
      "The FDA regulates human cells and tissue products (HCT/Ps) under a risk-based framework that determines whether a given product requires premarket review [3]. Most MSC-based treatments offered outside of an approved clinical trial fall outside of FDA-approved indications. Patients considering MSC therapy should ask their provider directly about the regulatory status of the specific product being used, whether it is part of an FDA-registered trial, and how the clinic sources and screens its cellular material.",
      "Patients evaluating MSC therapy may want to ask their provider: Where do the cells come from, and how are they processed and stored? What is the expected cell count and viability at the time of administration? What conditions has this specific protocol been used for, and what does the available evidence show? What are the known risks, and how are complications managed? Is this treatment part of a registered clinical trial, and if not, what is its regulatory status? A consultation is the right setting to walk through these questions in detail.",
      "Because MSC therapy is still an evolving area of medicine, candidacy is highly individual. A qualified provider will typically review a patient's full medical history, current medications, and treatment goals during an initial consultation before recommending any regenerative therapy, and will discuss alternative or complementary options, including PRP therapy, as part of that conversation.",
      "As with any injection or infusion-based treatment, MSC therapy carries general procedural risks, including infection at the injection or infusion site, localized swelling, and temporary discomfort. Because donor-sourced (allogeneic) cellular material is involved in some protocols, screening and processing standards matter for reducing the risk of disease transmission or immune reaction. Systematic reviews of MSC injections for orthopedic use have generally reported a favorable short-term safety profile in the trials studied, though long-term safety data for many applications is still limited, and adverse event reporting has varied in consistency across studies.",
      "Because outcomes vary by condition, cell source, and individual patient factors, providers generally avoid promising a specific result from MSC therapy. For orthopedic applications where trial data is more developed, some patients report improvements in pain and function over a period of weeks to months following treatment, though not all patients respond, and results are not permanent solutions to the underlying condition in every case. For other applications, particularly those outside of orthopedic use, the evidence supporting specific outcome expectations is thinner, and providers should be direct about that uncertainty rather than implying a guaranteed benefit. Individual results may vary.",
      "Frequently Asked Questions — Is MSC therapy the same as embryonic stem cell treatment? No. MSCs are adult stem cells obtained from tissues such as bone marrow, fat, or umbilical cord tissue after birth; they are not derived from embryos. How many treatments are typically needed? This varies by protocol, condition, and provider. Some patients receive a single treatment session, while others follow a multi-session protocol; your provider should explain the reasoning behind the specific plan recommended for you. Does insurance cover MSC therapy? Most MSC treatments offered outside of an approved clinical trial are considered investigational or elective, and are typically not covered by insurance.",
      "Mesenchymal stem cell therapy is an active area of medical research with a growing body of clinical data for certain applications, but it remains largely investigational for most non-approved uses. Patients considering this therapy should seek care from a provider who is transparent about cell sourcing, processing standards, regulatory status, and the current state of the evidence, and who encourages an informed discussion of realistic expectations before any treatment decision is made.",
      "References: [1] Systematic review and network meta-analysis: Autologous versus allogeneic adipose-derived mesenchymal stem cell therapy for knee osteoarthritis, randomized controlled trials, 2025. PMC12094297. [2] Contextual effects of mesenchymal stem cell injections for knee osteoarthritis: systematic review and meta-analysis, 2025. PMC12487426. [3] U.S. Food and Drug Administration. Framework for the Regulation of Regenerative Medicine Products. fda.gov. For informational purposes only. Individual outcomes vary. Consult a licensed provider before pursuing any treatment discussed above.",
    ],
    cta: { label: "Book a Consultation", href: "/contact" },
    relatedSlugs: ["stem-cell-injection-joint-repair", "iv-stem-cell-therapy-science", "stem-cell-therapy-vs-prp-differences"],
    internalLinks: [
      { label: "Stem Cell Injection Therapy", href: "/services", desc: "Targeted biologics for joint and tissue support" },
      { label: "IV Stem Cell Therapy", href: "/services", desc: "Systemic regenerative infusion protocols" },
    ],
    serviceLinks: [
      { label: "View Stem Cell Services", href: "/services" },
      { label: "Book a Private Consultation", href: "/contact" },
    ],
  },
  {
    slug: "peptide-therapy-101-patient-guide",
    img: CLINIC_IMG,
    category: "Peptide Therapy",
    title: "Peptide Therapy 101: What Patients Should Know Before Their Consultation",
    date: "August 18, 2026",
    lastUpdated: "August 2026",
    readTime: "9 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    excerpt: "Peptide therapy uses short chains of amino acids — the body's natural signaling molecules — to influence tissue repair, metabolism, or hormone signaling. Before your consultation, it helps to understand regulatory status, evidence quality, and what questions to ask.",
    headings: [
      { after: 0, text: "What Peptides Are" },
      { after: 2, text: "Common Categories of Peptides Used in Clinical Practice" },
      { after: 4, text: "How Peptide Therapy Is Typically Administered" },
      { after: 6, text: "Regulatory Considerations" },
      { after: 8, text: "What to Expect at a Consultation" },
      { after: 10, text: "Questions to Ask Your Provider" },
    ],
    body: [
      "Peptide therapy uses short chains of amino acids — the body's natural signaling molecules — to influence processes like tissue repair, metabolism, or hormone signaling. Some peptides are FDA-approved pharmaceuticals; many others are available only through compounding pharmacies and have a smaller clinical evidence base. Before your consultation, it helps to understand which category a given peptide falls into, what evidence supports its use for your goal, and how your provider will monitor safety and progress.",
      "Key Takeaways: Peptides are short amino acid chains that act as cell-signaling molecules for functions like tissue repair, metabolism, and hormone regulation. Regulatory status varies widely: some peptides are FDA-approved drugs, while others are compounded and have not undergone the same large-scale clinical trial evaluation. Administration methods include subcutaneous injection, oral capsules, nasal sprays, and topical formulations, depending on the peptide. A thorough consultation should include a review of medical history, current medications, relevant labs, and a clear explanation of the evidence for your specific goal.",
      "Peptides are short chains of amino acids, the building blocks of proteins. In the body, peptides act as signaling molecules, instructing cells to perform specific functions such as producing hormones, supporting tissue repair, or regulating metabolic processes. Peptide therapy uses synthetic or bioidentical versions of these molecules, administered under medical supervision, with the goal of influencing one or more of these biological signaling pathways.",
      "Peptides used in medical settings generally fall into a few broad categories: those studied for growth hormone signaling, those studied for tissue repair and recovery, those studied for metabolic and weight-related support, and those studied for immune or inflammatory modulation. A 2026 review of therapeutic peptides in orthopedic and musculoskeletal care notes that recovery-focused peptides act through varied mechanisms — some targeting circadian and mitochondrial regulators, others targeting neurotrophic and tissue-repair pathways — and that clinical trial data for many of these compounds remains limited even where preclinical findings are promising [1]. Each peptide has a distinct mechanism of action, and the evidence base varies considerably from one peptide to another.",
      "Some peptides, such as certain GLP-1 receptor agonists used for metabolic health, have received FDA approval for specific indications [2]. Others are available only through compounding pharmacies and have not undergone the same level of large-scale clinical trial evaluation. Patients should ask their provider directly about the regulatory and approval status of any peptide being considered.",
      "Depending on the specific peptide and its intended use, administration methods can include subcutaneous injection, oral capsules, nasal sprays, or topical formulations. Dosing protocols, frequency, and duration of use vary by peptide and by the individual patient's goals, and are determined by a prescribing provider based on a review of the patient's health history and lab work during a consultation.",
      "Patients should understand that not all peptides are regulated the same way. Some are FDA-approved drugs with established safety and efficacy data from large clinical trials. Others are available through compounding pharmacies, which operate under a different regulatory framework. Compounded peptides have not undergone the same premarket review process as FDA-approved drugs, and the evidence supporting their use for specific indications is often more limited. This does not mean compounded peptides are unsafe or ineffective — it means patients should understand the distinction and ask their provider to explain the evidence and regulatory status for any specific peptide being recommended.",
      "A thorough peptide therapy consultation should begin with a comprehensive review of your medical history, current medications, and relevant lab work. Your provider should explain which specific peptide or peptides are being recommended, why, what the evidence shows for your specific goal, and how progress will be measured. They should also discuss sourcing — specifically, whether the peptide is FDA-approved or compounded, and if compounded, which pharmacy is being used and what quality standards that pharmacy follows.",
      "Before your consultation, it can help to have a clear sense of your primary goal — whether that is tissue recovery, metabolic support, hormonal optimization, or another objective. This helps your provider focus the conversation on the peptides most relevant to your situation and the evidence most applicable to your goal.",
      "Questions worth asking your provider before starting peptide therapy: Is this peptide FDA-approved for my intended use, or is it compounded? If compounded, which pharmacy is being used and what are their quality standards? What does the clinical evidence show for this peptide and my specific goal? How will we measure whether the therapy is working, and over what timeline? What are the known side effects and contraindications? How long is the expected course of treatment, and what happens if I stop?",
      "Peptide therapy covers a wide range of compounds with differing levels of regulatory approval and clinical evidence. The most important thing a patient can do before starting any peptide protocol is to work with a provider who is transparent about what is known and what is not, who sources from reputable pharmacies, and who monitors progress with objective measures rather than relying solely on subjective reports. Individual results may vary.",
      "References: [1] Therapeutic peptides in orthopedic and musculoskeletal care: mechanisms and clinical applications, 2026. [2] FDA. Approved Drug Products with Therapeutic Equivalence Evaluations (Orange Book). fda.gov. For informational purposes only. Individual outcomes vary. Consult a licensed provider before pursuing any treatment discussed above.",
    ],
    cta: { label: "Book a Consultation", href: "/contact" },
    relatedSlugs: ["mesenchymal-stem-cell-therapy-patient-guide", "first-cellrx-consultation", "understanding-biomarker-testing-labs"],
    internalLinks: [
      { label: "Health Optimization Programs", href: "/health-optimization", desc: "Physician-directed protocols including peptide therapy" },
      { label: "Book a Private Consultation", href: "/contact", desc: "Discuss your goals with Dr. Egbert" },
    ],
    serviceLinks: [
      { label: "Health Optimization", href: "/health-optimization" },
      { label: "Book a Consultation", href: "/contact" },
    ],
  },
  {
    slug: "stem-cell-therapy-vs-prp-differences",
    img: INJECTION_IMG,
    category: "Stem Cell Therapy",
    title: "Stem Cell Therapy vs. PRP: What Are the Differences?",
    date: "September 1, 2026",
    lastUpdated: "September 2026",
    readTime: "9 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    excerpt: "Stem cell therapy and PRP are both regenerative biologics, but they work through different mechanisms, have different evidence bases, and are appropriate for different clinical situations. Understanding the distinction helps patients ask better questions.",
    headings: [
      { after: 0, text: "What PRP Is and How It Works" },
      { after: 2, text: "What Stem Cell Therapy Is and How It Works" },
      { after: 4, text: "How the Evidence Compares" },
      { after: 6, text: "Which Is Appropriate for Which Situations?" },
      { after: 8, text: "Cost and Regulatory Considerations" },
    ],
    body: [
      "THIS NOTICE MUST BE PROVIDED TO YOU UNDER UTAH LAW. This health care practitioner performs one or more stem cell therapies that have not yet been approved by the United States Food and Drug Administration. You are encouraged to consult with your primary care provider before undergoing a stem cell therapy.",
      "Stem cell therapy and platelet-rich plasma (PRP) therapy are both regenerative biologics used in clinical practice, but they work through different mechanisms, have different evidence bases, and are appropriate for different clinical situations. Patients considering either treatment often ask how to choose between them — the honest answer is that the choice depends on the specific condition, the available evidence for that condition, and a thorough consultation with a qualified provider.",
      "Key Takeaways: PRP is derived from the patient's own blood and delivers concentrated growth factors to a targeted area; it is autologous and does not involve donor cells. Stem cell therapy uses mesenchymal stem cells from either the patient or a donor source and may involve more complex mechanisms including paracrine signaling and immunomodulation. The evidence base for PRP is more developed for certain orthopedic conditions; MSC evidence is growing but more variable by condition and protocol. Neither treatment is FDA-approved for most musculoskeletal indications; both are considered investigational for most non-approved uses. A qualified provider should explain the evidence for your specific condition and why one approach may be more appropriate than the other.",
      "Platelet-rich plasma (PRP) is produced by drawing a sample of the patient's own blood, processing it in a centrifuge to concentrate the platelets and growth factors, and injecting the resulting concentrate into a targeted area. Because PRP is derived from the patient's own blood, it is autologous — there is no donor material involved. PRP delivers a concentrated dose of growth factors including PDGF, TGF-β, VEGF, and others that are involved in tissue repair and inflammatory modulation. The mechanism is primarily paracrine: the growth factors signal nearby cells to initiate repair processes.",
      "Mesenchymal stem cell (MSC) therapy introduces living cells — either from the patient's own tissue or from a donor source — into a targeted area or into the bloodstream via IV infusion. MSCs are multipotent cells capable of differentiating into bone, cartilage, fat, and other connective tissue cell types, though the primary mechanism in most clinical applications is thought to be paracrine signaling and immunomodulation rather than direct differentiation. MSCs release a broad range of signaling molecules that modulate inflammation, support tissue repair processes, and interact with the immune system.",
      "PRP has a larger body of randomized controlled trial data for certain orthopedic applications, particularly knee osteoarthritis and certain tendinopathies. A 2023 meta-analysis found PRP superior to hyaluronic acid for knee osteoarthritis pain and function at short- and medium-term follow-up, though effect sizes varied across studies [1]. For MSC therapy, a 2025 network meta-analysis found adipose-derived MSC injections produced measurable improvements in knee osteoarthritis compared with placebo, with some protocols showing superiority to PRP in certain outcome measures [2]. Both treatments have a more limited evidence base for conditions outside of orthopedics.",
      "PRP is generally considered a lower-cost, lower-complexity intervention appropriate for patients with mild to moderate orthopedic conditions, particularly those who prefer an autologous treatment with no donor material. MSC therapy may be considered for patients with more significant tissue involvement, those who have not responded adequately to PRP, or those seeking a more comprehensive regenerative approach. In some cases, providers use PRP and MSC therapy in combination. The decision should be made based on a thorough clinical assessment, not on cost or marketing claims alone.",
      "PRP is typically less expensive than MSC therapy because it uses the patient's own blood and requires less processing. MSC therapy involves more complex sourcing, processing, and quality control, which is reflected in the cost. Neither treatment is covered by most insurance plans for musculoskeletal indications, as both are considered investigational or elective for most non-approved uses. Patients should ask for a full cost breakdown before committing to either treatment.",
      "Both PRP and MSC therapy are considered investigational for most musculoskeletal indications. PRP is not FDA-approved as a drug for orthopedic use; it is regulated as a minimally manipulated autologous tissue. MSC therapy is subject to more complex FDA oversight depending on the source and processing of the cells. Patients should ask their provider directly about the regulatory status of any treatment being recommended.",
      "The choice between PRP and stem cell therapy is not a simple one, and any provider who presents it as such — or who recommends one without a thorough clinical assessment — should be approached with caution. A qualified provider will explain the evidence for your specific condition, the regulatory status of each option, the expected timeline and realistic outcomes, and why one approach may be more appropriate for your situation than the other. Individual results may vary.",
      "References: [1] PRP vs. hyaluronic acid for knee osteoarthritis: meta-analysis of randomized controlled trials, 2023. [2] Network meta-analysis: MSC therapy for knee osteoarthritis, 2025. PMC12094297. For informational purposes only. Individual outcomes vary. Consult a licensed provider before pursuing any treatment discussed above.",
    ],
    cta: { label: "Book a Consultation", href: "/contact" },
    relatedSlugs: ["mesenchymal-stem-cell-therapy-patient-guide", "stem-cell-injection-joint-repair", "first-cellrx-consultation"],
    internalLinks: [
      { label: "Stem Cell Injection Therapy", href: "/services", desc: "Targeted biologics for joint and tissue support" },
      { label: "What Is MSC Therapy?", href: "/blog/mesenchymal-stem-cell-therapy-patient-guide", desc: "A patient's guide to mesenchymal stem cells" },
    ],
    serviceLinks: [
      { label: "View Regenerative Services", href: "/services" },
      { label: "Book a Consultation", href: "/contact" },
    ],
  },
  {
    slug: "prepare-first-regenerative-medicine-consultation",
    img: PHYSICIAN_IMG,
    category: "Patient Education",
    title: "How to Prepare for Your First Regenerative Medicine Consultation",
    date: "September 8, 2026",
    lastUpdated: "September 2026",
    readTime: "8 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    excerpt: "A regenerative medicine consultation is a clinical conversation, not a sales presentation. Knowing what to bring, what to ask, and what to expect helps you get the most out of the appointment and make an informed decision.",
    headings: [
      { after: 0, text: "What a Regenerative Medicine Consultation Actually Is" },
      { after: 2, text: "What to Bring to Your Appointment" },
      { after: 4, text: "What the Provider Should Cover" },
      { after: 6, text: "Questions to Ask During the Consultation" },
      { after: 8, text: "Red Flags to Watch For" },
    ],
    body: [
      "A regenerative medicine consultation is a clinical conversation, not a sales presentation. Knowing what to bring, what to ask, and what to expect helps you get the most out of the appointment and make an informed decision about whether a given treatment is appropriate for your situation.",
      "Key Takeaways: Bring a complete list of current medications and supplements, relevant imaging or lab work, and a clear description of your primary concern or goal. A good consultation includes a review of your history, an explanation of the evidence for your specific situation, a discussion of realistic outcomes and alternatives, and a clear explanation of cost and regulatory status. You should leave the consultation with enough information to make an informed decision — not feeling pressured to commit on the spot. Red flags include providers who guarantee outcomes, minimize risks, or discourage questions about regulatory status and evidence.",
      "Regenerative medicine consultations vary by provider, but a thorough one should function as a clinical intake — not a product pitch. The provider should be gathering information about your health history, current condition, treatment goals, and relevant test results in order to determine whether a regenerative therapy is appropriate for your situation, and if so, which one and at what protocol.",
      "Bring a complete list of your current medications and supplements, including dosages. Some medications — particularly anticoagulants, immunosuppressants, and certain anti-inflammatory drugs — may affect candidacy or protocol design. Bring any relevant imaging (X-rays, MRI, ultrasound) if your concern is orthopedic or musculoskeletal. Bring recent lab work if you have it, particularly if your goal is metabolic optimization, hormonal support, or longevity medicine. If you do not have recent labs, many clinics will order them as part of the intake process. Come prepared with a clear description of your primary concern or goal — the more specific you can be, the more useful the consultation will be.",
      "A thorough consultation should cover: a review of your medical history and current condition; an explanation of which treatment or treatments may be relevant to your situation and why; a summary of the current evidence for those treatments as applied to your specific condition; a discussion of realistic outcomes, including the possibility of limited or no response; a clear explanation of the regulatory status of any treatment being recommended; a full cost breakdown; and a discussion of alternatives, including non-regenerative options. You should not feel rushed, and you should have the opportunity to ask questions.",
      "Questions worth asking during a regenerative medicine consultation: What specific treatment are you recommending, and why is it appropriate for my situation? What does the current evidence show for this treatment and my specific condition? What are the realistic outcomes, and what percentage of patients in similar situations respond? What are the known risks and how are complications managed? What is the regulatory status of this treatment? What is the full cost, and what does that include? What happens if I do not respond to treatment? How will we measure whether the treatment is working?",
      "Providers who guarantee specific outcomes, minimize or dismiss questions about risks, discourage questions about regulatory status, or pressure you to commit to treatment during the first appointment should be approached with significant caution. Regenerative medicine is an evolving field with a genuine and growing evidence base, but it is also a field that has attracted providers who overstate what the science supports. A good provider will be direct about what is known and what is not, and will encourage you to take the time you need to make an informed decision.",
      "It is also reasonable to seek a second opinion before committing to any regenerative treatment, particularly for higher-cost protocols. A provider who discourages this should be viewed as a red flag.",
      "After the consultation, you should have a clear understanding of: what treatment is being recommended and why; what the evidence shows; what realistic outcomes look like; what the full cost is; and what the next steps are if you decide to proceed. If you leave the consultation without this information, it is appropriate to ask for a follow-up conversation or written summary before making a decision.",
      "A well-conducted consultation is the foundation of a good treatment outcome. Providers who invest in a thorough intake process — rather than rushing to a treatment recommendation — are more likely to design a protocol that is genuinely appropriate for your situation. Individual results may vary. For informational purposes only. Consult a licensed provider before pursuing any treatment discussed above.",
    ],
    cta: { label: "Book Your Consultation", href: "/contact" },
    relatedSlugs: ["mesenchymal-stem-cell-therapy-patient-guide", "peptide-therapy-101-patient-guide", "first-cellrx-consultation"],
    internalLinks: [
      { label: "What to Expect at CellRX", href: "/blog/first-cellrx-consultation", desc: "A walkthrough of your first visit" },
      { label: "Our Services", href: "/services", desc: "Full range of regenerative and optimization protocols" },
    ],
    serviceLinks: [
      { label: "Book a Private Consultation", href: "/contact" },
      { label: "View All Services", href: "/services" },
    ],
  },
  {
    slug: "nad-iv-therapy-longevity-medicine",
    img: IV_IMG,
    category: "Longevity Medicine",
    title: "What Is NAD+ IV Therapy and How Is It Used in Longevity Medicine?",
    date: "October 6, 2026",
    lastUpdated: "October 2026",
    readTime: "9 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    excerpt: "NAD+ IV therapy delivers a coenzyme central to cellular energy production directly into the bloodstream. The science behind NAD+ and aging is legitimate — but clinical evidence for anti-aging or cognitive benefits in humans is still limited. Here is what the research actually shows.",
    headings: [
      { after: 0, text: "What NAD+ Is and Why It Matters" },
      { after: 2, text: "How NAD+ IV Therapy Is Administered" },
      { after: 4, text: "What the Research Currently Shows" },
      { after: 6, text: "NAD+ vs. Oral Precursors" },
      { after: 8, text: "Who Might Consider NAD+ IV Therapy" },
    ],
    body: [
      "NAD+ IV therapy delivers nicotinamide adenine dinucleotide, a coenzyme central to cellular energy production and DNA repair, directly into the bloodstream through an intravenous infusion. Research into NAD+'s effects on aging, energy, or cognition are still limited. Current evidence supports its role in cellular biology; whether IV administration produces meaningful clinical benefits in otherwise healthy adults remains an active area of research.",
      "Key Takeaways: NAD+ is a coenzyme involved in cellular energy metabolism, DNA repair, and sirtuin activation — biological processes relevant to aging research. NAD+ levels decline with age, and this decline has been associated with cellular dysfunction in preclinical models. IV administration bypasses digestive absorption, producing higher and more rapid plasma NAD+ elevation than oral precursors. Clinical evidence for anti-aging, cognitive, or energy benefits in humans is still limited and primarily from small studies. Oral precursors such as NR and NMN are lower-cost alternatives with a growing evidence base; the comparative clinical benefit of IV vs. oral supplementation is not yet well established.",
      "Nicotinamide adenine dinucleotide (NAD+) is a coenzyme found in every cell of the body, where it plays a central role in cellular energy metabolism — specifically in the conversion of nutrients into ATP through the electron transport chain. Beyond energy production, NAD+ is a required cofactor for sirtuins, a class of proteins involved in DNA repair, gene expression regulation, and cellular stress responses that have been studied in the context of aging biology. NAD+ levels decline with age, and this decline has been associated with reduced mitochondrial function and increased markers of cellular aging in preclinical models.",
      "NAD+ IV therapy involves administering NAD+ directly into the bloodstream through an intravenous infusion, typically over a period of one to several hours depending on the dose and the individual's tolerance. IV administration bypasses the digestive system, which metabolizes a significant portion of orally ingested NAD+ precursors before they reach systemic circulation. This produces a more rapid and complete elevation of plasma NAD+ levels compared with oral supplementation, though whether this translates into meaningfully different clinical outcomes has not been definitively established in large human trials.",
      "NAD+ augmentation shows clear biological activity, but that clinical effectiveness for anti-aging or cognitive benefits in healthy adults has not been established through large, well-controlled human trials. A 2023 randomized trial found that IV NAD+ produced measurable increases in blood NAD+ levels and was well tolerated, but the study was not powered to evaluate clinical outcomes [1]. Research in animal models has shown more robust effects on markers of aging and metabolic function, but translating these findings to humans remains an active area of investigation. Patients should understand that the current evidence base is primarily mechanistic and early-stage, and that providers who claim definitive anti-aging or cognitive benefits from NAD+ IV therapy are overstating what the science currently supports.",
      "NAD+ can also be raised indirectly through oral precursors such as nicotinamide riboside (NR) or nicotinamide mononucleotide (NMN), which are converted to NAD+ through metabolic pathways. Oral precursors are significantly less expensive than IV therapy and have a growing evidence base from human trials. A 2022 randomized trial found that oral NR supplementation raised blood NAD+ levels in older adults and was associated with improvements in certain metabolic markers, though effect sizes were modest [2]. The comparative clinical benefit of IV NAD+ versus oral precursors has not been definitively established; patients interested in NAD+ augmentation should discuss both options with their provider.",
      "NAD+ IV therapy may be considered by patients who are interested in longevity-focused medicine, who have not responded to oral precursors, or who prefer the more rapid and complete NAD+ elevation that IV administration produces. It is also sometimes used as part of a broader longevity or optimization protocol alongside other interventions. Because the evidence base is still developing, candidacy and protocol design should be based on a thorough clinical assessment and an honest discussion of what is and is not known about the therapy's benefits.",
      "NAD+ IV therapy is a growing part of longevity-focused medicine, grounded in legitimate cellular biology but with a clinical evidence base that is still maturing. Patients considering this therapy should work with a provider who is transparent about the current state of the evidence, who presents it as one component of a broader health strategy rather than a standalone solution, and who monitors progress with objective measures. Individual results may vary.",
      "References: [1] Intravenous NAD+ administration: safety, tolerability, and plasma NAD+ elevation in a randomized trial, 2023. [2] Oral nicotinamide riboside supplementation and metabolic markers in older adults: randomized trial, 2022. For informational purposes only. Individual outcomes vary. Consult a licensed provider before pursuing any treatment discussed above.",
    ],
    cta: { label: "Book a Consultation", href: "/contact" },
    relatedSlugs: ["quarterly-labs-longevity", "understanding-biomarker-testing-labs", "iv-stem-cell-therapy-science"],
    internalLinks: [
      { label: "Longevity Programs", href: "/longevity-programs", desc: "Science-backed longevity protocols at CellRX" },
      { label: "IV Stem Cell Therapy", href: "/services", desc: "Systemic regenerative infusion protocols" },
    ],
    serviceLinks: [
      { label: "Longevity Programs", href: "/longevity-programs" },
      { label: "Book a Consultation", href: "/contact" },
    ],
  },
  {
    slug: "understanding-biomarker-testing-labs",
    img: BG_DARK_IMG,
    category: "Health Optimization",
    title: "Understanding Biomarker Testing: What Your Labs Actually Tell You",
    date: "October 13, 2026",
    lastUpdated: "October 2026",
    readTime: "10 min read",
    author: "Dr. Jacob Egbert, MD",
    authorTitle: "Medical Director, CellRX",
    excerpt: "Biomarker testing can offer valuable insight into your health — but results are most useful when interpreted in context, not as standalone numbers. Here is what the key markers measure, how to read them, and what questions to ask your provider.",
    headings: [
      { after: 0, text: "What Biomarker Testing Is and What It Measures" },
      { after: 2, text: "Key Markers and What They Indicate" },
      { after: 4, text: "Standard vs. Optimal Ranges" },
      { after: 6, text: "How to Have a Productive Conversation About Your Results" },
      { after: 8, text: "How Often Should Biomarkers Be Retested?" },
    ],
    body: [
      "Biomarker testing can offer valuable, individualized insight into different aspects of health, but results are most useful when interpreted in context — alongside a patient's symptoms, history, and trends over time — rather than as standalone numbers. A good provider will walk through what each result means, what is and is not well established, and how it fits into a broader picture of the patient's health.",
      "Key Takeaways: Biomarker testing measures specific biological indicators — proteins, hormones, metabolites, and other molecules — that can reflect the function of various body systems. Results should be interpreted in the context of the patient's full clinical picture, not as standalone diagnoses. Standard reference ranges are based on population averages; some providers also use narrower optimal ranges based on research or clinical experience. Trending markers over time is often more informative than any single measurement. Not every flagged marker requires immediate intervention — a provider's role includes helping distinguish actionable findings from those worth monitoring.",
      "Biomarker testing measures specific biological indicators — proteins, hormones, metabolites, and other molecules — that can reflect the function of various body systems. In a longevity or optimization medicine context, panels often extend beyond standard clinical labs to include markers associated with metabolic function, hormonal status, inflammatory activity, cardiovascular risk, nutritional status, and in some cases, markers associated with biological aging research such as telomere length or epigenetic age assessments.",
      "Some of the most commonly discussed markers in longevity medicine include: high-sensitivity C-reactive protein (hsCRP), a marker of systemic inflammation that has been associated with cardiovascular risk in large population studies [1]; fasting insulin and glucose, which together provide a more complete picture of metabolic function than glucose alone; a full hormone panel including testosterone, estradiol, DHEA, cortisol, and thyroid markers; lipid particle sizing, which provides more detail about cardiovascular risk than a standard lipid panel; and vitamin D, B12, magnesium, and ferritin, which are commonly deficient and associated with a range of functional complaints when low.",
      "Standard reference ranges are derived from large population studies and are designed to flag values associated with disease states. Some providers in longevity and optimization medicine also discuss optimal ranges, which are narrower and based on research or clinical experience regarding markers associated with better functional outcomes. It is worth understanding that optimal ranges are more subject to differing clinical opinion than standard reference ranges, and patients should ask their provider what evidence or rationale is behind any optimal range being used to guide their care.",
      "When reviewing biomarker results with a provider during a consultation, it can help to ask: What does this specific marker measure, and why was it included in my panel? Is this result outside the standard reference range, an optimal range, or both? What factors could be influencing this result besides an underlying health issue? What, if anything, is being recommended as a result of this finding, and what is the evidence behind that recommendation? How and when will this marker be retested to track change over time?",
      "Retesting frequency depends on the specific marker, whether a treatment or lifestyle change is being evaluated, and how volatile that marker tends to be. Some markers, such as certain hormone levels, can fluctuate meaningfully within days; others, such as long-term glycemic markers like HbA1c, reflect averages over a longer window and are retested less frequently. A provider should explain not just what to test, but how often re-testing meaningfully adds information versus simply adding cost.",
      "When patients receive an expanded longevity-focused panel for the first time, the volume of markers and terminology can feel overwhelming. It generally helps to ask the provider to group results into a few categories — for example, cardiometabolic, hormonal, inflammatory, and nutritional — and to prioritize which findings, if any, warrant near-term action versus ongoing monitoring. Not every flagged marker requires immediate intervention; part of a provider's role is helping distinguish between findings that are clinically actionable now and those that are simply worth tracking over time.",
      "It is worth remembering that biomarkers are one input among several a good provider uses to understand a patient's health — alongside symptoms, physical exam findings, family history, and lifestyle factors. Two patients with an identical lab result can warrant different recommendations depending on this broader context. Biomarker panels are most useful when they are treated as a tool for an ongoing conversation with your provider, rather than as a standalone report to interpret in isolation.",
      "Frequently Asked Questions — Do I need to fast before biomarker testing? Fasting requirements depend on which markers are being tested; glucose, insulin, and certain lipid measures typically require fasting, while many hormone and inflammatory markers do not. Can lifestyle changes alone shift these markers? For many markers — including inflammatory and metabolic markers — diet, exercise, sleep, and stress management can meaningfully influence results. Is more testing always better? Not necessarily — broader panels can surface incidental findings that require further workup without necessarily changing clinical management.",
      "References: [1] Clinical significance of high-sensitivity C-reactive protein in cardiovascular disease. PubMed PMID: 20477398. [2] Salivary High-Sensitivity C-Reactive Protein and Its Clinical Relevance in Modern Medicine. PMC11089337. [3] A Test in Context: High-Sensitivity C-Reactive Protein. Journal of the American College of Cardiology (JACC). For informational purposes only. Individual outcomes vary. Consult a licensed provider before pursuing any treatment discussed above.",
    ],
    cta: { label: "Explore Quarterly Lab Panels", href: "/black-label" },
    relatedSlugs: ["quarterly-labs-longevity", "nad-iv-therapy-longevity-medicine", "top-performers-concierge-medicine"],
    internalLinks: [
      { label: "Quarterly Labs & Longevity", href: "/blog/quarterly-labs-longevity", desc: "Why quarterly biomarker monitoring matters" },
      { label: "Black Label Concierge Medicine", href: "/black-label", desc: "Comprehensive quarterly panels with direct physician access" },
    ],
    serviceLinks: [
      { label: "Black Label Membership", href: "/black-label" },
      { label: "Health Optimization", href: "/health-optimization" },
    ],
  },
];

function ArticleContent({ article }: { article: ArticleData }) {
  const paragraphs = article.body;
  const headingMap: Record<number, string> = {};
  article.headings.forEach(h => { headingMap[h.after] = h.text; });
  const INTERNAL_LINK_AFTER = 3; // Insert callout after 4th paragraph

  return (
    <div className="space-y-0">
      {paragraphs.map((para, idx) => (
        <div key={idx}>
          {headingMap[idx] && (
            <h2
              className="text-[#F6F5EC] mt-10 mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px, 2.5vw, 30px)", letterSpacing: "0.04em" }}
            >
              {headingMap[idx]}
            </h2>
          )}
          <p className="text-[#D6D7D9]/80 leading-relaxed mb-5" style={{ fontFamily: "'Libre Franklin', sans-serif", fontSize: "17px" }}>
            {para}
          </p>
          {/* Internal links callout block after 4th paragraph */}
          {idx === INTERNAL_LINK_AFTER && article.internalLinks && article.internalLinks.length > 0 && (
            <div className="my-8 border border-[#0047BB]/30 bg-[#0047BB]/5 p-6">
              <p className="text-[#FBB217] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Related Reading
              </p>
              <div className="space-y-3">
                {article.internalLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="group flex items-start gap-3 hover:text-[#FBB217] transition-colors">
                    <ArrowLeft size={14} className="text-[#6DB3F2] mt-1 shrink-0 rotate-180 group-hover:text-[#FBB217] transition-colors" />
                    <div>
                      <p className="text-[#F6F5EC] text-sm font-medium group-hover:text-[#FBB217] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {link.label}
                      </p>
                      <p className="text-[#D6D7D9]/50 text-xs mt-0.5" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                        {link.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {article.serviceLinks && (
                <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-white/10">
                  {article.serviceLinks.map((sl) => (
                    <Link key={sl.href} href={sl.href}>
                      <button className="btn-outline rounded-none text-xs px-4 py-2">{sl.label}</button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  useSEO(getBlogPostSEO(slug));
  useScrollAnimation();

  const article = articles.find(a => a.slug === slug);
  const related = article
    ? articles.filter(a => article.relatedSlugs.includes(a.slug)).slice(0, 3)
    : [];

  if (!article) {
    return (
      <div className="min-h-screen bg-[#051229]">
        <Navbar />
        <div className="container pt-28 md:pt-48 pb-16 md:pb-24 text-center">
          <h1 className="text-[#F6F5EC] text-4xl mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            ARTICLE NOT FOUND
          </h1>
          <p className="text-[#D6D7D9]/60 mb-8">The article you are looking for does not exist or has been moved.</p>
          <Link href="/blog">
            <button className="btn-outline rounded-none">Back to Blog</button>
          </Link>
        </div>
        <BackToTop />
      <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-0 overflow-hidden">
        <div className="relative h-[50vh] min-h-[360px] overflow-hidden">
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
            width="1200"
            height="600"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051229] via-[#051229]/60 to-[#051229]/20" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#051229] to-transparent" />
        </div>
      </section>

      {/* Article */}
      <section className="py-16 bg-[#051229]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#D6D7D9]/50 text-sm hover:text-[#FBB217] transition-colors mb-8 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            {/* Category + meta */}
            <div className="mb-6">
              <span className="section-label">{article.category}</span>
            </div>
            <h1
              className="text-[#F6F5EC] mb-6 fade-up"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05, letterSpacing: "0.02em" }}
            >
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-[#D6D7D9]/40 text-xs mb-8 pb-8 border-b border-white/10">
              <span className="flex items-center gap-1.5"><Calendar size={12} />{article.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} />{article.readTime}</span>
              {article.lastUpdated && (
                <span className="text-[#D6D7D9]/30">Updated {article.lastUpdated}</span>
              )}
            </div>

            {/* E-E-A-T Author Block */}
            <div className="flex items-start gap-4 p-5 bg-[#0a1628] border border-white/5 mb-10 fade-up">
              <img
                src={PHYSICIAN_PORTRAIT}
                alt="Dr. Jacob Egbert, MD — Medical Director, CellRX"
                className="w-14 h-14 object-cover object-top rounded-full shrink-0"
                width={56}
                height={56}
                loading="lazy"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[#F6F5EC] text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {article.author}
                  </p>
                  <Award size={12} className="text-[#FBB217]" />
                </div>
                <p className="text-[#FBB217] text-xs tracking-wide mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {article.authorTitle || "Medical Director, CellRX"}
                </p>
                <p className="text-[#D6D7D9]/50 text-xs leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                  Dr. Egbert serves simultaneously as Medical Director of CellRX and Medical Director of the stem cell source company, providing unbroken chain-of-custody oversight from ethical procurement to physician-administered treatment. Board-certified with 10+ years in regenerative and functional medicine.
                </p>
              </div>
            </div>

            {/* Lead paragraph */}
            <p
              className="text-[#F6F5EC]/90 text-lg leading-relaxed mb-8 fade-up"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {article.excerpt}
            </p>

            {/* Body */}
            <div className="fade-in">
              <ArticleContent article={article} />
            </div>

            {/* CTA */}
            <div className="mt-16 p-8 border border-[#0047BB]/30 bg-[#0047BB]/5 fade-up">
              <p className="section-label mb-3">Ready to Learn More?</p>
              <p className="text-[#D6D7D9]/70 text-sm mb-6 leading-relaxed">
                Schedule a private consultation with our Medical Director to discuss whether this treatment is right for you. There is no obligation — only an honest conversation about your health and goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <button className="btn-primary rounded-none">Book Your Private Consultation</button>
                </Link>
                <Link href={article.cta.href}>
                  <button className="btn-outline rounded-none">{article.cta.label}</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-20 bg-[#030d1e]">
          <div className="container">
            <p className="section-label mb-4">Continue Reading</p>
            <h2
              className="text-[#F6F5EC] mb-12 fade-up"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 3vw, 40px)" }}
            >
              RELATED ARTICLES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <Link key={i} href={`/blog/${rel.slug}`}>
                  <div className="group border border-white/5 overflow-hidden cursor-pointer fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={rel.img}
                        alt={rel.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        width="600"
                        height="400"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030d1e] via-transparent to-transparent" />
                    </div>
                    <div className="bg-[#0a1628] p-6">
                      <span className="section-label text-xs mb-2 block">{rel.category}</span>
                      <h3
                        className="text-[#F6F5EC] text-sm leading-snug group-hover:text-[#FBB217] transition-colors"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
                      >
                        {rel.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-3 text-[#D6D7D9]/30 text-xs">
                        <span>{rel.date}</span>
                        <span>{rel.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BackToTop />
      <Footer />
    </div>
  );
}
