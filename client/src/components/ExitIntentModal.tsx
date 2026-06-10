/*
 * ExitIntentModal — CellRX
 * Fires when the user's cursor moves above the viewport (desktop) or after 45s of inactivity (mobile)
 * Captures phone number only — 1-field form for maximum conversion
 * Shows once per session (sessionStorage flag)
 * Wired to GHL CRM via the same contact.submit tRPC mutation
 */

import { useState, useEffect, useCallback } from "react";
import { X, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const SESSION_KEY = "cellrx_exit_shown";

export default function ExitIntentModal() {
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => setError("Something went wrong. Please call us at 385-707-2373."),
  });

  const show = useCallback(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(true);
  }, []);

  // Desktop: mouse leaves viewport through the top (exit intent)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) show();
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [show]);

  // Mobile / fallback: show after 45 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(show, 45_000);
    return () => clearTimeout(timer);
  }, [show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    submitContact.mutate({
      firstName: "Exit Intent Lead",
      lastName: "",
      email: "",
      phone: phone.trim(),
      interest: "general",
      message: "Exit intent capture",
      hearAbout: "",
    });
  };

  const handleClose = () => setVisible(false);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(5, 18, 41, 0.92)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative w-full max-w-md border border-white/10 bg-[#030d1e] p-8 md:p-10"
        style={{ boxShadow: "0 0 60px rgba(0,71,187,0.25)" }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle2 size={40} className="text-[#6DB3F2] mx-auto mb-4" />
            <h3
              className="text-white mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "32px" }}
            >
              WE'LL BE IN TOUCH
            </h3>
            <p className="text-[#D6D7D9]/60 text-sm leading-relaxed">
              A member of our team will reach out within 24 hours to schedule your private consultation.
            </p>
          </div>
        ) : (
          <>
            {/* Gold rule accent */}
            <div className="w-8 h-0.5 bg-[#FBB217] mb-6" />

            <p className="text-[#FBB217] text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Before You Go
            </p>
            <h3
              className="text-white mb-3 leading-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 5vw, 40px)" }}
            >
              GET A FREE<br />
              <span className="text-[#0047BB]">CONSULTATION</span>
            </h3>
            <p className="text-[#D6D7D9]/60 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
              Leave your number and we'll reach out within 24 hours to answer your questions — no pressure, no obligation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="w-full bg-[#051229] border border-white/10 text-white text-sm pl-10 pr-4 py-4 focus:outline-none focus:border-[#0047BB] transition-colors placeholder-white/20"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitContact.isPending}
                className="btn-primary rounded-none w-full flex items-center justify-center gap-2 disabled:opacity-60 py-4"
              >
                {submitContact.isPending ? (
                  <><Loader2 size={14} className="animate-spin" /> Sending...</>
                ) : (
                  "Get My Free Consultation"
                )}
              </button>
            </form>

            <p className="text-[#D6D7D9]/30 text-xs text-center mt-4" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
              We respect your privacy. No spam, ever.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
