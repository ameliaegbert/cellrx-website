/*
 * CellRX Privacy Policy Page
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

export default function Privacy() {
  useSEO({
    title: "Privacy Policy — CellRX Regenerative Medicine",
    description: "CellRX Privacy Policy. Learn how we collect, use, and protect your personal information.",
    canonical: "https://cellrx.bio/privacy",
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
            PRIVACY POLICY
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
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>1. Introduction</h2>
              <p>
                CellRX Regenerative Medicine ("CellRX," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at cellrx.bio or contact us to inquire about our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>2. Information We Collect</h2>
              <p className="mb-4">We may collect the following categories of personal information:</p>
              <ul className="space-y-2 list-disc pl-6 text-[#D6D7D9]/80">
                <li><strong className="text-white">Contact Information:</strong> Name, email address, phone number, and mailing address when you submit a consultation request or contact form.</li>
                <li><strong className="text-white">Health Information:</strong> Information you voluntarily provide about your health history, conditions, or treatment goals when requesting a consultation. This information is treated as protected health information and handled in accordance with applicable law.</li>
                <li><strong className="text-white">Usage Data:</strong> IP address, browser type, pages visited, time spent on pages, and referring URLs, collected automatically through cookies and analytics tools (Google Analytics, Microsoft Clarity).</li>
                <li><strong className="text-white">Communications:</strong> Records of your correspondence with us, including emails and phone call notes.</li>
              </ul>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="space-y-2 list-disc pl-6 text-[#D6D7D9]/80">
                <li>Respond to your consultation requests and inquiries</li>
                <li>Schedule and manage appointments</li>
                <li>Provide and improve our services</li>
                <li>Send you information about treatments, promotions, and updates (with your consent)</li>
                <li>Analyze website usage to improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>4. How We Share Your Information</h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-[#D6D7D9]/80">
                <li><strong className="text-white">Service Providers:</strong> Trusted third-party vendors who assist us in operating our website and conducting our business (e.g., CRM software, email platforms), subject to confidentiality agreements.</li>
                <li><strong className="text-white">Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
                <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with appropriate notice to you.</li>
              </ul>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>5. Cookies and Tracking Technologies</h2>
              <p>
                Our website uses cookies and similar tracking technologies to enhance your experience and analyze site traffic. We use Google Analytics and Microsoft Clarity to understand how visitors interact with our site. You may disable cookies through your browser settings; however, some features of the site may not function properly as a result.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>6. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>7. Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the right to:</p>
              <ul className="space-y-2 list-disc pl-6 text-[#D6D7D9]/80">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at <a href="mailto:info@cellrx.bio" className="text-[#0047BB] hover:text-[#FBB217] transition-colors">info@cellrx.bio</a>.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>8. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a minor, please contact us immediately.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated effective date. Your continued use of our website after any changes constitutes your acceptance of the revised policy.
              </p>
            </div>

            <div className="fade-up">
              <h2 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>10. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy, please contact us:
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
                <Link href="/terms" className="text-[#0047BB] hover:text-[#FBB217] transition-colors">Terms of Service</Link>
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
