"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Counts from 0 to `to` when scrolled into view; renders the final value on the server. */
export function CountUp({ to, pad = 2, className }: { to: number; pad?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);
  const [armed, setArmed] = useState(false);

  // Reset to 0 only after hydration so SSR shows the real number.
  useEffect(() => {
    if (!reduce) {
      setValue(0);
      setArmed(true);
    }
  }, [reduce]);

  useEffect(() => {
    if (!armed || !inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [armed, inView, to]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{to}</span>
      <span aria-hidden>{String(value).padStart(pad, "0")}</span>
    </span>
  );
}
