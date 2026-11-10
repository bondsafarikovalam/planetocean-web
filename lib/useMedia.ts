"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query hook (returns `false` on the server and first paint). */
export function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

/** Media query for scroll-driven motion: every screen size, unless the user asked for reduced motion. */
export const SCROLL_MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

/** True when scroll-driven motion (parallax, pinning) should run — desktop and mobile alike. */
export function useScrollMotion() {
  return useMedia(SCROLL_MOTION_QUERY);
}

/** True when pointer-following effects should run (needs a mouse/trackpad; touch has no hover). */
export function useRichMotion() {
  return useMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
}
