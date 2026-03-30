/*
 * CellRX Footer — Editorial Dark Luxury
 * Deep navy background, gold accents, clean editorial layout
 */

import { Link } from "wouter";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/cellrx_logo_white_c7e5a738.png";

export default function Footer() {
  return (
    <footer className="bg-[#030d1e] border-t border-white/5">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={LOGO_URL} alt="CellRX" className="h-8 w-auto mb-6" />
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Concierge regenerative medicine and stem cell therapy for elite performers, athletes, and discerning individuals who demand the best in health optimization.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { label: "Stem Cell Injection", href: "/services" },
                { label: "Stem Cell IV Therapy", href: "/services" },
                { label: "Black Label Membership", href: "/black-label" },
                { label: "Health Optimization", href: "/services" },
                { label: "Longevity Programs", href: "/services" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/50 text-sm hover:text-[#C9A84C] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Team", href: "/about" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Blog & Research", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/50 text-sm hover:text-[#C9A84C] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#C9A84C] mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm leading-relaxed">
                  3098 Executive Parkway, Suite 100<br />
                  Lehi, UT 84043
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[#C9A84C] shrink-0" />
                <a href="tel:3857072373" className="text-white/50 text-sm hover:text-white transition-colors">
                  385-707-2373
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[#C9A84C] shrink-0" />
                <a href="mailto:info@cellrx.bio" className="text-white/50 text-sm hover:text-white transition-colors">
                  info@cellrx.bio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wide">
            © 2026 CellRX. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "FDA Disclaimer"].map((item) => (
              <Link key={item} href="/contact" className="text-white/30 text-xs hover:text-white/60 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* FDA Disclaimer */}
        <p className="mt-6 text-white/20 text-xs leading-relaxed max-w-3xl">
          <strong className="text-white/30">FDA Disclaimer:</strong> The statements on this website have not been evaluated by the Food and Drug Administration. These products and services are not intended to diagnose, treat, cure, or prevent any disease. Results may vary. Consult your physician before beginning any treatment program.
        </p>
      </div>
    </footer>
  );
}
