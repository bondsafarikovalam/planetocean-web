"use client";

import { useLayoutEffect } from "react";
import { scrollToY } from "@/lib/smoothScroll";

/**
 * Lands every newly navigated page at its hero. Runs in a layout effect so the
 * jump happens before paint (behind the curtain), and forces an instant jump
 * (through Lenis when it is active) so smooth scrolling can't leave the view
 * stranded mid-page. Hash links (e.g. /about#team) are left to the browser.
 */
export default function ScrollToTop() {
  useLayoutEffect(() => {
    if (window.location.hash) return;
    scrollToY(0, { immediate: true });
  }, []);
  return null;
}
