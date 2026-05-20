/*
 * CellRX Testimonials Page — Editorial Dark Luxury
 * Patient stories, outcomes, video testimonials section
 */

import { useEffect } from "react";
import { useSEO, PAGE_SEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Quote } from "lucide-react";

const BG_DARK_IMG = "/manus-storage/background_dark_opt_b4ede28a.webp";

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

const testimonials = [
  {
    name: "Michael R.",
    role: "Professional Athlete",
    age: 34,
    treatment: "Stem Cell Injection",
    stars: 5,
    quote: "After two years of knee pain that was threatening my career, CellRX gave me my life back. Within three months of the stem cell injection, I was back to full training. The level of care and attention was unlike anything I've experienced in traditional medicine. The team genuinely cared about my outcome, not just the procedure.",
    result: "Returned to full athletic training within 3 months"
  },
  {
    name: "Sarah T.",
    role: "CEO & Entrepreneur",
    age: 47,
    treatment: "Investment Plan Membership",
    stars: 5,
    quote: "The Investment Plan membership has completely transformed how I manage my health. Having a dedicated medical team that proactively monitors and optimizes my biology means I can focus entirely on my business and family. My energy levels, cognitive clarity, and resilience have all improved dramatically. The ROI on my health has been extraordinary.",
    result: "Significant improvement in energy, focus, and resilience"
  },
  {
    name: "David L.",
    role: "Executive",
    age: 58,
    treatment: "Stem Cell IV Therapy",
    stars: 5,
    quote: "I was skeptical at first, but the results from the IV therapy have been remarkable. My energy levels, cognitive clarity, and recovery from workouts have all improved dramatically. The team at CellRX is professional, discreet, and genuinely invested in my outcomes. I've recommended them to several colleagues.",
    result: "Dramatic improvement in energy, cognition, and recovery"
  },
  {
    name: "Jennifer M.",
    role: "Former Collegiate Swimmer",
    age: 41,
    treatment: "Stem Cell Injection",
    stars: 5,
    quote: "I had a shoulder injury that had been limiting my quality of life for years. After the stem cell injection at CellRX, the improvement was gradual but steady — and by month four, I had full range of motion back. I avoided surgery entirely. The team was incredibly thorough in explaining every step of the process.",
    result: "Full shoulder mobility restored, surgery avoided"
  },
  {
    name: "Robert K.",
    role: "Real Estate Developer",
    age: 52,
    treatment: "Investment Plan Membership",
    stars: 5,
    quote: "As someone who has always been proactive about health, the Investment Plan is exactly what I was looking for. The personalized protocols, the direct access to the medical team, and the level of sophistication in how they approach longevity medicine is unmatched. This is healthcare the way it should be.",
    result: "Comprehensive health optimization and longevity protocols"
  },
  {
    name: "Amanda P.",
    role: "Fitness Professional",
    age: 38,
    treatment: "Stem Cell IV Therapy",
    stars: 5,
    quote: "As a fitness professional, recovery is everything. The IV therapy has been a game-changer for my training and recovery. I feel like I've turned back the clock by a decade. The clinic itself is beautiful, the staff is exceptional, and the results speak for themselves.",
    result: "Accelerated recovery and improved athletic performance"
  }
];

export default function Testimonials() {
  useSEO(PAGE_SEO.testimonials);
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Header */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ backgroundImage: `url(${BG_DARK_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/88" />
        <div className="container relative z-10">
          <p className="section-label mb-4">Patient Outcomes</p>
          <h1
            className="text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            REAL RESULTS,<br />
            <span className="text-[#FBB217]">REAL PEOPLE</span>
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#030d1e] border-b border-white/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Patients Treated" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "10+", label: "Years of Excellence" },
            ].map((stat, i) => (
              <div key={i} className="fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <p
                  className="text-[#F6F5EC] mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1 }}
                >
                  {stat.value}
                </p>
                <div className="gold-rule mx-auto mb-2" />
                <p className="text-[#D6D7D9]/60 text-xs tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="glass-card p-8 fade-up"
                style={{ transitionDelay: `${(i % 3) * 0.15}s` }}
              >
                <Quote size={28} className="text-[#FBB217]/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={13} className="text-[#FBB217] fill-[#FBB217]" />
                  ))}
                </div>
                <p className="text-[#D6D7D9]/80 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>

                {/* Result callout */}
                <div className="bg-[#0047BB]/10 border border-[#0047BB]/20 px-4 py-2 mb-6">
                  <p className="text-[#6DB3F2] text-xs font-semibold">Result: {t.result}</p>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-[#F6F5EC] font-semibold text-sm">{t.name}</p>
                  <p className="text-[#D6D7D9]/50 text-xs mt-0.5">{t.role}, Age {t.age}</p>
                  <p className="text-[#FBB217] text-xs mt-1">{t.treatment}</p>
                </div>
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
            YOUR TRANSFORMATION STARTS HERE
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto fade-up" style={{ transitionDelay: "0.1s" }}>
            Join hundreds of patients who have reclaimed their vitality, restored their performance, and invested in a biology that works for them. Book your private consultation today.
          </p>
          <Link href="/contact">
            <button className="bg-white text-[#0047BB] font-bold text-xs tracking-widest uppercase px-10 py-4 hover:bg-[#F6F5EC] transition-colors fade-up" style={{ transitionDelay: "0.2s" }}>
              Book Your Consultation
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
