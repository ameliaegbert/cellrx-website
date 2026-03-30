/*
 * CellRX Navbar — Editorial Dark Luxury
 * Sticky nav with transparent-to-solid scroll behavior
 * Logo: CELL (black) RX (blue) — uses brand logo image
 * Nav links: white, gold hover
 * CTA: CellRX Blue button
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367412750/C7tmEBqytWZc3WMCpXZgAW/logo_actual_31b74e80.webp";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Black Label", href: "/black-label" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#051229]/95 backdrop-blur-md shadow-2xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <img
              src={LOGO_URL}
              alt="CellRX"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-medium tracking-widest uppercase transition-colors duration-200 ${
                  location === link.href
                    ? "text-[#C9A84C]"
                    : "text-white/80 hover:text-[#C9A84C]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:3857072373"
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              <Phone size={14} />
              <span className="text-xs tracking-wide">385-707-2373</span>
            </a>
            <Link href="/contact">
              <button className="btn-primary rounded-none text-xs">
                Book Consultation
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#051229]/98 backdrop-blur-md border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-widest uppercase transition-colors ${
                location === link.href ? "text-[#C9A84C]" : "text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact">
            <button className="btn-primary rounded-none w-full mt-2 text-xs">
              Book Consultation
            </button>
          </Link>
          <a
            href="tel:3857072373"
            className="flex items-center gap-2 text-white/50 text-sm"
          >
            <Phone size={14} />
            385-707-2373
          </a>
        </div>
      </div>
    </nav>
  );
}
