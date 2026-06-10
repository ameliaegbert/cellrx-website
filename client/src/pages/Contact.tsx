/*
 * CellRX Contact Page — Editorial Dark Luxury
 * Consultation booking form wired to GHL CRM via tRPC
 * Form reduced to 3 fields (Name, Phone, Treatment Interest) for higher conversion
 * Calendar widget removed — booking link is texted after opt-in
 */

import { useEffect, useState } from "react";
import { useSEO, PAGE_SEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, CheckCircle2, Loader2, AlertCircle, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";

const CLINIC_IMG = "/manus-storage/clinic_interior_opt_d513ed06.webp";

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

type InterestValue = "stem-cell-injection" | "stem-cell-iv" | "black-label" | "general" | "other";

const testimonials = [
  {
    quote: "I had been dealing with chronic knee pain for 6 years. After one stem cell injection at CellRX, I was back on the golf course in three weeks. The difference is night and day.",
    author: "Michael T.",
    detail: "Stem Cell Injection Patient",
    stars: 5,
  },
  {
    quote: "The level of care here is unlike anything I've experienced. Dr. Egbert took the time to understand my goals and designed a protocol specifically for me. I feel 15 years younger.",
    author: "Sandra K.",
    detail: "Black Label Member",
    stars: 5,
  },
];

export default function Contact() {
  useSEO(PAGE_SEO.contact);
  useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    phone: "",
    interest: "" as InterestValue | "",
  });

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setErrorMessage("");
    },
    onError: (error) => {
      console.error("[Contact] Submission error:", error);
      setErrorMessage("We encountered an issue submitting your request. Please try calling us directly at 385-707-2373.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!form.interest) {
      setErrorMessage("Please select a treatment or service you're interested in.");
      return;
    }
    if (!form.firstName.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!form.phone.trim()) {
      setErrorMessage("Please enter your phone number so we can reach you.");
      return;
    }

    submitContact.mutate({
      firstName: form.firstName,
      lastName: "",
      email: "",
      phone: form.phone,
      interest: form.interest as InterestValue,
      message: "",
      hearAbout: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Header */}
      <section
        className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden"
        style={{ backgroundImage: `url(${CLINIC_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#051229]/85" />
        <div className="container relative z-10">
          <p className="section-label mb-4">Get In Touch</p>
          <h1
            className="text-[#F6F5EC]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            BEGIN YOUR<br />
            <span className="text-[#0047BB]">TRANSFORMATION</span>
          </h1>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-[#030d1e] border-b border-white/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 border border-white/5 bg-[#051229] fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={12} className="text-[#FBB217] fill-[#FBB217]" />
                  ))}
                </div>
                <p className="text-[#D6D7D9]/80 text-sm leading-relaxed mb-4 italic" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                  "{t.quote}"
                </p>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.author}</p>
                <p className="text-[#D6D7D9]/40 text-xs">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#051229]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 fade-up">
              <p className="section-label mb-4">Contact Information</p>
              <h2
                className="text-white mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 4vw, 48px)" }}
              >
                WE'RE HERE<br />TO HELP
              </h2>
              <div className="gold-rule mb-8" />

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#FBB217]/30 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-[#FBB217]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">Location</p>
                    <p className="text-[#D6D7D9]/60 text-sm leading-relaxed">
                      3098 Executive Parkway, Suite 100<br />
                      Lehi, UT 84043
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#FBB217]/30 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-[#FBB217]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">Phone</p>
                    <a href="tel:3857072373" className="text-[#D6D7D9]/60 text-sm hover:text-white transition-colors">
                      385-707-2373
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#FBB217]/30 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-[#FBB217]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">Email</p>
                    <a href="mailto:info@cellrx.bio" className="text-[#D6D7D9]/60 text-sm hover:text-white transition-colors">
                      info@cellrx.bio
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#FBB217]/30 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-[#FBB217]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">Hours</p>
                    <p className="text-[#D6D7D9]/60 text-sm leading-relaxed">
                      Monday – Friday: 9:00 AM – 5:00 PM<br />
                      Saturday: By appointment<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div className="mt-12 p-6 border border-white/5 bg-[#030d1e]">
                <h3
                  className="text-white mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px" }}
                >
                  What to Expect
                </h3>
                <div className="space-y-3">
                  {[
                    "A private, confidential consultation",
                    "Thorough review of your health history",
                    "Personalized treatment recommendations",
                    "Transparent pricing with no hidden fees",
                    "Response within 24 business hours",
                    "Ask about our referral program",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[#6DB3F2] shrink-0" />
                      <span className="text-[#D6D7D9]/70 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 fade-up" style={{ transitionDelay: "0.15s" }}>
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 border border-white/5 bg-[#030d1e]">
                  <CheckCircle2 size={48} className="text-[#6DB3F2] mb-6" />
                  <h3
                    className="text-white mb-4"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "40px" }}
                  >
                    REQUEST RECEIVED
                  </h3>
                  <p className="text-[#D6D7D9]/70 max-w-md leading-relaxed">
                    Thank you for reaching out to CellRX. A member of our team will contact you within 24 business hours to schedule your private consultation.
                  </p>
                </div>
              ) : (
                <div className="border border-white/5 bg-[#030d1e] p-8 md:p-10">
                  <h2
                    className="text-white mb-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 3vw, 40px)" }}
                  >
                    REQUEST YOUR CONSULTATION
                  </h2>
                  <p className="text-[#D6D7D9]/50 text-sm mb-8" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                    Takes 30 seconds. We'll reach out within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[#D6D7D9]/60 text-xs tracking-widest uppercase mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full bg-[#051229] border border-white/10 text-white text-sm px-4 py-4 focus:outline-none focus:border-[#0047BB] transition-colors placeholder-white/20"
                        placeholder="First and last name"
                      />
                    </div>

                    <div>
                      <label className="block text-[#D6D7D9]/60 text-xs tracking-widest uppercase mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-[#051229] border border-white/10 text-white text-sm px-4 py-4 focus:outline-none focus:border-[#0047BB] transition-colors placeholder-white/20"
                        placeholder="(385) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-[#D6D7D9]/60 text-xs tracking-widest uppercase mb-2">I'm Interested In *</label>
                      <select
                        name="interest"
                        required
                        value={form.interest}
                        onChange={handleChange}
                        className="w-full bg-[#051229] border border-white/10 text-white text-sm px-4 py-4 focus:outline-none focus:border-[#0047BB] transition-colors"
                      >
                        <option value="" disabled>Select a treatment or service</option>
                        <option value="stem-cell-injection">Stem Cell Injection</option>
                        <option value="stem-cell-iv">Stem Cell IV Therapy</option>
                        <option value="black-label">Black Label Concierge Medicine</option>
                        <option value="general">General Consultation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {errorMessage && (
                      <div className="flex items-start gap-3 p-4 border border-red-500/30 bg-red-500/10">
                        <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                        <p className="text-red-400 text-sm">{errorMessage}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitContact.isPending}
                      className="btn-primary rounded-none w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed py-4 text-base"
                    >
                      {submitContact.isPending ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Request My Private Consultation"
                      )}
                    </button>

                    <p className="text-[#D6D7D9]/40 text-xs text-center leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                      Your information is kept strictly confidential. We will never share your personal data with third parties.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVING UTAH ─── */}
      <section className="py-16 bg-[#030d1e] border-t border-white/5">
        <div className="container">
          <div className="text-center mb-10 fade-up">
            <p className="section-label mb-4">Service Area</p>
            <h2 className="text-[#F6F5EC]" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              SERVING PATIENTS ACROSS UTAH
            </h2>
            <p className="text-[#D6D7D9]/60 text-sm max-w-2xl mx-auto mt-4 leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
              CellRX is conveniently located in Lehi, Utah — at the heart of the Wasatch Front — making it easily accessible for patients from Salt Lake City, Provo, Orem, and surrounding communities. We also welcome patients traveling from out of state.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
            {[
              "Lehi", "Salt Lake City", "Provo", "Orem", "Sandy", "Draper",
              "American Fork", "Pleasant Grove", "Lindon", "Murray", "Ogden", "Park City",
            ].map((city, i) => (
              <div key={i} className="bg-[#051229] border border-white/5 py-3 px-4 text-center">
                <p className="text-[#D6D7D9]/70 text-xs tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>{city}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#D6D7D9]/40 text-xs mt-6" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
            3098 Executive Parkway, Suite 100, Lehi, Utah 84043 &middot; (385) 707-2373 &middot; info@cellrx.bio
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
