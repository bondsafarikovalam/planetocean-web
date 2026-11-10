"use client";

import { useEffect } from "react";
import { setLenis } from "@/lib/smoothScroll";
import "lenis/dist/lenis.css";

/**
 * Inertia-smoothed wheel / trackpad scrolling (Lenis).
 *
 * Performance: Lenis is imported lazily once the browser is idle after load, so it
 * never competes with first paint or hydration. GSAP is *not* loaded here — the one
 * section that uses ScrollTrigger hooks itself into Lenis when it loads (see
 * `onLenisScroll`). Lenis drives the real window scroll, so Motion's scroll hooks
 * keep working unchanged.
 *
 * Mouse / trackpad devices only; touch keeps native momentum scrolling. Off under reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Only smooth mouse-wheel / trackpad scrolling. Touch devices keep native momentum
    // scrolling, where Lenis adds no smoothing but still costs layout work (measured
    // ~5 s of main-thread time on a throttled mobile home-page load).
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let cancelled = false;
    let destroy: (() => void) | undefined;

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: { offset: -96 }, autoRaf: true });
      setLenis(lenis);
      destroy = () => {
        lenis.destroy();
        setLenis(null);
      };
    };

    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const cic = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = ric(() => void start(), { timeout: 2000 } as IdleRequestOptions);

    return () => {
      cancelled = true;
      cic(handle as number);
      destroy?.();
    };
  }, []);

  return null;
}
