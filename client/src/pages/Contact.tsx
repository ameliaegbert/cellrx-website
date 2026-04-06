/*
 * CellRX Contact Page — Editorial Dark Luxury
 * Consultation booking form, location, contact info
 */

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";

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

export default function Contact() {
  useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    hearAbout: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
                <h4
                  className="text-white mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px" }}
                >
                  What to Expect
                </h4>
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
                      <CheckCircle2 size={13} className="text-[#0047BB] shrink-0" />
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
                  <CheckCircle2 size={48} className="text-[#0047BB] mb-6" />
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#D6D7D9]/60 text-xs tracking-widest uppercase mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full bg-[#030d1e] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#0047BB] transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-[#D6D7D9]/60 text-xs tracking-widest uppercase mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full bg-[#030d1e] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#0047BB] transition-colors"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#D6D7D9]/60 text-xs tracking-widest uppercase mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-[#030d1e] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#0047BB] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[#D6D7D9]/60 text-xs tracking-widest uppercase mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-[#030d1e] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#0047BB] transition-colors"
                        placeholder="(385) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#D6D7D9]/60 text-xs tracking-widest uppercase mb-2">I'm Interested In *</label>
                    <select
                      name="interest"
                      required
                      value={form.interest}
                      onChange={handleChange}
                      className="w-full bg-[#030d1e] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#0047BB] transition-colors"
                    >
                      <option value="" disabled>Select a treatment or service</option>
                      <option value="stem-cell-injection">Stem Cell Injection</option>
                      <option value="stem-cell-iv">Stem Cell IV Therapy</option>
                      <option value="black-label">Black Label Concierge Medicine</option>
                      <option value="general">General Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6D7D9]/60 text-xs tracking-widest uppercase mb-2">How Did You Hear About Us?</label>
                    <select
                      name="hearAbout"
                      value={form.hearAbout}
                      onChange={handleChange}
                      className="w-full bg-[#030d1e] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#0047BB] transition-colors"
                    >
                      <option value="">Select an option</option>
                      <option value="google">Google Search</option>
                      <option value="referral">Patient Referral</option>
                      <option value="social">Social Media</option>
                      <option value="physician">Physician Referral</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6D7D9]/60 text-xs tracking-widest uppercase mb-2">Tell Us About Your Goals</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-[#030d1e] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#0047BB] transition-colors resize-none"
                      placeholder="Briefly describe your health goals, current concerns, or any questions you have..."
                    />
                  </div>

                  <button type="submit" className="btn-primary rounded-none w-full">
                    Request My Private Consultation
                  </button>

                  <p className="text-[#FBB217]/70 text-xs text-center leading-relaxed mb-1">
                    Referral programs are available — ask about our referral program during your consultation.
                  </p>
                  <p className="text-[#D6D7D9]/40 text-xs text-center leading-relaxed">
                    Your information is kept strictly confidential. We will never share your personal data with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
