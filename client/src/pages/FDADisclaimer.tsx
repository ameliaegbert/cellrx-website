/*
 * CellRX FDA Disclaimer Page
 */

import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

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

export default function FDADisclaimer() {
  useSEO({
    title: "FDA Disclaimer — CellRX Regenerative Medicine",
    description: "CellRX FDA Disclaimer. Important regulatory information about our regenerative medicine services.",
    canonical: "https://cellrx.bio/fda-disclaimer",
    ogImage: "https://cellrx.bio/og-image.jpg",
  });
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#051229]">
      <Navbar />

      {/* Header */}
      <section className="pt-28 md:pt-40 pb-16 bg-[#030d1e] border-b border-white/5">
        <div className="container">
          <p className="section-label mb-4">Legal</p>
          <h1
            className="text-[#F6F5EC]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 80px)" }}
          >
            FDA DISCLAIMER
          </h1>
          <p className="text-[#D6D7D9]/50 text-sm mt-4" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
            Last updated: June 1, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-[#051229]">
        <div className="container max-w-3xl">
          <div
            className="space-y-10"
            style={{ fontFamily: "'Libre Franklin', sans-serif", color: "#D6D7D9", lineHeight: "1.8" }}
          >
            {/* Primary disclaimer box */}
            <div className="fade-up p-8 border border-[#FBB217]/20 bg-[#030d1e]">
              <p className="text-[#FBB217] text-xs tracking-widest uppercase font-semibold mb-4">Important Notice</p>
              <p className="text-white text-base leading-relaxed">
                The statements made on this website have not been evaluated by the Food and Drug Administration (FDA). The products and services offered by CellRX Regenerative Medicine are not intended to diagnose, treat, cure, or prevent any disease. Results may vary from person to person. Individual results are not guaranteed and may vary based on age, health status, and other factors.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Regulatory Status of Stem Cell Therapies</h2>
              <p className="mb-4">
                Stem cell therapies, including the use of mesenchymal stem cells (MSCs) and other biologics, are an evolving area of medicine. The FDA regulates human cells, tissues, and cellular and tissue-based products (HCT/Ps) under 21 CFR Part 1271. CellRX operates in compliance with applicable federal and state regulations governing the practice of medicine and the use of biologics.
              </p>
              <p>
                Patients are encouraged to consult with their primary care physician and to independently research the current regulatory and scientific status of any treatment before proceeding. CellRX's Medical Director is available to discuss the evidence base and regulatory framework for any treatment offered at our clinic during your private consultation.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Not a Substitute for Medical Care</h2>
              <p>
                The information provided on this website is for general informational purposes only and is not intended to replace or substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition or treatment. Never disregard professional medical advice or delay seeking it because of something you have read on this website.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Testimonials and Results</h2>
              <p>
                Patient testimonials and case studies presented on this website reflect the individual experiences of those patients and are not necessarily representative of what any other patient may experience. Testimonials are not intended to make claims that our products or services can be used to diagnose, treat, cure, mitigate, or prevent any disease. Results are not guaranteed and may vary significantly.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Research and Scientific Claims</h2>
              <p>
                References to scientific studies, clinical research, and published literature on this website are provided for informational purposes only. CellRX does not claim that its services replicate the exact protocols used in referenced studies. The field of regenerative medicine is rapidly evolving, and the evidence base continues to develop. Patients should discuss the current state of the evidence with their physician.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Contact</h2>
              <p>
                If you have questions about the regulatory status of any treatment or service offered at CellRX, please contact us:
              </p>
              <div className="mt-4 p-6 border border-white/5 bg-[#030d1e]">
                <p className="text-white font-semibold mb-1">CellRX Regenerative Medicine</p>
                <p className="text-[#D6D7D9]/70 text-sm">3098 Executive Parkway, Suite 100, Lehi, UT 84043</p>
                <p className="text-[#D6D7D9]/70 text-sm">
                  <a href="tel:3857072373" className="hover:text-white transition-colors">385-707-2373</a>
                </p>
                <p className="text-[#D6D7D9]/70 text-sm">
                  <a href="mailto:info@cellrx.bio" className="text-[#0047BB] hover:text-[#FBB217] transition-colors">info@cellrx.bio</a>
                </p>
              </div>
            </div>

            <div className="fade-up pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-4 text-sm">
                <Link href="/privacy" className="text-[#0047BB] hover:text-[#FBB217] transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-[#0047BB] hover:text-[#FBB217] transition-colors">Terms of Service</Link>
                <Link href="/contact" className="text-[#0047BB] hover:text-[#FBB217] transition-colors">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
