/*
 * CellRX Terms of Service Page
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

export default function Terms() {
  useSEO({
    title: "Terms of Service — CellRX Regenerative Medicine",
    description: "CellRX Terms of Service. Review the terms governing use of our website and services.",
    canonical: "https://cellrx.bio/terms",
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
            TERMS OF SERVICE
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
            className="prose prose-invert prose-sm max-w-none space-y-10"
            style={{ fontFamily: "'Libre Franklin', sans-serif", color: "#D6D7D9", lineHeight: "1.8" }}
          >
            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>1. Acceptance of Terms</h2>
              <p>
                By accessing or using the CellRX Regenerative Medicine website at cellrx.bio ("Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Site. CellRX reserves the right to modify these Terms at any time, and your continued use of the Site constitutes acceptance of any changes.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>2. Not Medical Advice</h2>
              <p>
                The content on this Site is provided for general informational purposes only and does not constitute medical advice, diagnosis, or treatment. Nothing on this Site should be construed as a substitute for professional medical advice from a qualified healthcare provider. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>3. Use of the Site</h2>
              <p className="mb-4">You agree to use this Site only for lawful purposes and in a manner that does not infringe the rights of others. You agree not to:</p>
              <ul className="space-y-2 list-disc pl-6 text-[#D6D7D9]/80">
                <li>Use the Site in any way that violates applicable federal, state, or local laws or regulations</li>
                <li>Transmit any unsolicited or unauthorized advertising or promotional material</li>
                <li>Attempt to gain unauthorized access to any portion of the Site or its related systems</li>
                <li>Use any automated means to access the Site without our express written permission</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
              </ul>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>4. Intellectual Property</h2>
              <p>
                All content on this Site — including text, graphics, logos, images, and software — is the property of CellRX Regenerative Medicine or its content suppliers and is protected by United States and international copyright laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>5. Disclaimer of Warranties</h2>
              <p>
                This Site is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. CellRX does not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, CellRX Regenerative Medicine shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this Site or its content. Our total liability to you for any claim arising from your use of the Site shall not exceed one hundred dollars ($100).
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>7. Third-Party Links</h2>
              <p>
                This Site may contain links to third-party websites. These links are provided for your convenience only. CellRX has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>8. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Utah, without regard to its conflict of law provisions. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Utah County, Utah.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>9. Contact</h2>
              <p>
                Questions about these Terms should be directed to:
              </p>
              <div className="mt-4 p-6 border border-white/5 bg-[#030d1e]">
                <p className="text-white font-semibold mb-1">CellRX Regenerative Medicine</p>
                <p className="text-[#D6D7D9]/70 text-sm">3098 Executive Parkway, Suite 100, Lehi, UT 84043</p>
                <p className="text-[#D6D7D9]/70 text-sm">
                  <a href="mailto:info@cellrx.bio" className="text-[#0047BB] hover:text-[#FBB217] transition-colors">info@cellrx.bio</a>
                </p>
              </div>
            </div>

            <div className="fade-up pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-4 text-sm">
                <Link href="/privacy" className="text-[#0047BB] hover:text-[#FBB217] transition-colors">Privacy Policy</Link>
                <Link href="/fda-disclaimer" className="text-[#0047BB] hover:text-[#FBB217] transition-colors">FDA Disclaimer</Link>
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
