/*
 * CellRX Footer — Editorial Dark Luxury
 * Deep navy background, gold accents, clean editorial layout
 * Social: YouTube, TikTok, Instagram, Facebook, LinkedIn
 */

import { Link } from "wouter";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/cellrx_logo_white_c7e5a738.png";

// TikTok icon (not in lucide-react, using SVG)
function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/>
    </svg>
  );
}

const socialLinks = [
  { href: "https://www.youtube.com/@CellRxbio", label: "YouTube", icon: <Youtube size={15} /> },
  { href: "https://www.tiktok.com/@cellrx.bio", label: "TikTok", icon: <TikTokIcon size={15} /> },
  { href: "https://www.instagram.com/cellrx.bio/", label: "Instagram", icon: <Instagram size={15} /> },
  { href: "https://www.facebook.com/p/CellRx-61582063796150/", label: "Facebook", icon: <Facebook size={15} /> },
  { href: "https://www.linkedin.com/company/113543963/", label: "LinkedIn", icon: <Linkedin size={15} /> },
];

export default function Footer() {
  return (
    <footer className="bg-[#030d1e] border-t border-white/5">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={LOGO_URL} alt="CellRX" className="h-8 w-auto mb-6" />
            <p className="text-white/50 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
              Concierge regenerative medicine and stem cell therapy for elite performers, athletes, and discerning individuals who demand the best in health optimization.
            </p>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#FBB217] hover:border-[#FBB217] transition-colors"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>Services</h4>
            <ul className="space-y-3">
              {[
                { label: "Stem Cell Injection", href: "/services" },
                { label: "Stem Cell IV Therapy", href: "/services" },
                { label: "Concierge Medicine", href: "/black-label" },
                { label: "Health Optimization", href: "/health-optimization" },
                { label: "Longevity Programs", href: "/longevity-programs" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/50 text-sm hover:text-[#FBB217] transition-colors" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Team", href: "/about" },
                { label: "Blog & Research", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/50 text-sm hover:text-[#FBB217] transition-colors" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#FBB217] mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                  3098 Executive Parkway, Suite 100<br />
                  Lehi, UT 84043
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[#FBB217] shrink-0" />
                <a href="tel:3857072373" className="text-white/50 text-sm hover:text-white transition-colors" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                  385-707-2373
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[#FBB217] shrink-0" />
                <a href="mailto:info@cellrx.bio" className="text-white/50 text-sm hover:text-white transition-colors" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                  info@cellrx.bio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wide" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
            © 2026 CellRX. All rights reserved.
          </p>
          <div className="flex gap-6 flex-wrap justify-center md:justify-end">
            {[
              { label: "Privacy Policy", href: "/contact" },
              { label: "Terms of Service", href: "/contact" },
              { label: "FDA Disclaimer", href: "/contact" },
              { label: "Sitemap", href: "/sitemap" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-white/30 text-xs hover:text-white/60 transition-colors" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* FDA Disclaimer */}
        <p className="mt-6 text-white/20 text-xs leading-relaxed max-w-3xl" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
          <strong className="text-white/30">FDA Disclaimer:</strong> The statements on this website have not been evaluated by the Food and Drug Administration. These products and services are not intended to diagnose, treat, cure, or prevent any disease. Results may vary. Consult your physician before beginning any treatment program.
        </p>
      </div>
    </footer>
  );
}
