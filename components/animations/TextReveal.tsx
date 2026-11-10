"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Tag = "h1" | "h2" | "h3" | "p" | "span";

/**
 * Masked word-by-word reveal. Words slide up from behind a clip mask.
 * `accent` words (matched exactly) receive `accentClassName`.
 */
export function TextReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  accent = [],
  accentClassName = "text-gradient-cyan",
  onMount = false,
  id,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  accent?: string[];
  accentClassName?: string;
  /** Animate on mount instead of when scrolled into view (for heroes). */
  onMount?: boolean;
  id?: string;
}) {
  const words = text.split(" ");
  const MotionTag = motion[Tag];
  const trigger = onMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.4 } };

  return (
    <MotionTag id={id} className={className} aria-label={text} {...trigger}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className={cn("inline-block will-change-transform", accent.includes(w) && accentClassName)}
            variants={{
              hidden: { y: "105%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE, delay: delay + i * stagger } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * Scroll-linked statement: each word brightens as the paragraph scrolls through the viewport.
 */
export function ScrollWords({ text, className, dim = "opacity-20" }: { text: string; className?: string; dim?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  if (reduce) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} dim={dim}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: string;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span aria-hidden className="relative mr-[0.25em] inline-block">
      <span className={dim}>{children}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {children}
      </motion.span>
    </span>
  );
}
