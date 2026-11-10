"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline scroll-progress bar at the top of the viewport. (The side depth gauge was removed on request.) */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: progress }}
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-cyan via-ocean to-violet"
    />
  );
}
