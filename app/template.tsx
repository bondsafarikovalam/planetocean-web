/**
 * Page transition: a deep-ocean curtain lifts off each newly rendered page.
 * Pure CSS (runs before hydration, never blocks content) on a fixed overlay —
 * page content itself is never transformed, so fixed children keep working.
 */
import ScrollToTop from "@/components/layout/ScrollToTop";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden
        className="motion-hide pointer-events-none fixed inset-0 z-[90] origin-top animate-[curtain_0.95s_var(--ease-swell)_0.05s_both] bg-gradient-to-b from-abyss via-atlantic to-ocean"
      />
      <ScrollToTop />
      {children}
    </>
  );
}
