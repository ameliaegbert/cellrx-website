import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

/**
 * BackToTop — floating button that appears after 400px scroll.
 * Smooth-scrolls to the top of the page on click.
 * Brand-consistent: amber accent, navy bg, no border-radius (matches CellRX sharp aesthetic).
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-8 right-6 z-50 flex items-center justify-center w-10 h-10 bg-[#FBB217] text-[#051229] shadow-lg hover:bg-[#f5a800] transition-colors"
      style={{ borderRadius: 0 }}
    >
      <ChevronUp size={20} strokeWidth={2.5} />
    </button>
  );
}
