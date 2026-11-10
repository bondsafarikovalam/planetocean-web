"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useScrollMotion } from "@/lib/useMedia";
import { cn } from "@/lib/utils";

/**
 * A layer that drifts vertically as it crosses the viewport.
 * `speed` > 0 lags behind the scroll (background feel), < 0 runs ahead (foreground feel).
 * Runs on every screen size; renders static only under reduced motion.
 */
export function Parallax({
  children,
  speed = 0.15,
  className,
  rotate = 0,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useScrollMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const dist = speed * 400;
  const y = useTransform(scrollYProgress, [0, 1], rich ? [-dist, dist] : [0, 0]);
  const r = useTransform(scrollYProgress, [0, 1], rich ? [-rotate, rotate] : [0, 0]);
  return (
    <motion.div ref={ref} style={{ y, rotate: r }} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}

/** Image inside a fixed frame that slides and slowly zooms with scroll. Pass positioning via className. */
export function ParallaxFrame({
  src,
  alt,
  className,
  sizes = "100vw",
  priority,
  strength = 0.18,
  zoom = true,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  strength?: number;
  zoom?: boolean;
  imgClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useScrollMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pct = strength * 100;
  const y = useTransform(scrollYProgress, [0, 1], rich ? [`-${pct / 2}%`, `${pct / 2}%`] : ["0%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], rich && zoom ? [1.12, 1.0] : [1, 1]);
  return (
    <div ref={ref} className={cn("overflow-hidden", className ?? "relative")}>
      <motion.div style={{ y, scale }} className="absolute inset-x-0 -inset-y-[12%] will-change-transform">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imgClassName)} />
      </motion.div>
    </div>
  );
}
