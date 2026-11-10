"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Bubbles, LightRays } from "@/components/animations/OceanEffects";
import { TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface PageHeroProps {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string[];
  ghost?: string;
  intro?: React.ReactNode;
  image: string;
  imagePosition?: string;
  /** Colour of the section that follows (the surface edge blends into it). */
  next?: "pearl" | "abyss" | "softmist";
  tint?: "ocean" | "violet" | "coral";
  children?: React.ReactNode;
}

const nextFill = { pearl: "var(--color-pearl)", abyss: "var(--color-abyss)", softmist: "var(--color-softmist)" };
const tints = { ocean: "bg-ocean/40", violet: "bg-violet/45", coral: "bg-coral/30" };

/** Cinematic, layered header for inner pages. */
export function PageHero({ index, eyebrow, title, accent = [], ghost, intro, image, imagePosition, next = "pearl", tint = "ocean", children }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const k = reduce ? 0 : 1;
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", `${28 * k}%`]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.08 + 0.14 * k]);
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", `${-70 * k}%`]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", `${-18 * k}%`]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-abyss text-white">
      <motion.div aria-hidden style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -z-30">
        <Image src={image} alt="" fill preload sizes="100vw" className={cn("object-cover", imagePosition)} />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-b from-abyss/85 via-abyss/45 to-abyss/90" />
      <div aria-hidden className={cn("absolute -right-[10%] -top-[20%] -z-20 size-[60vw] animate-orb rounded-full orb-soft", tints[tint])} />
      <LightRays className="-z-10 opacity-60" />
      <Bubbles count={12} className="-z-10" />

      {ghost && (
        <motion.p
          aria-hidden
          style={{ y: ghostY }}
          className="text-outline pointer-events-none absolute -right-[2vw] top-[18%] -z-10 select-none whitespace-nowrap font-display text-[24vw] font-extrabold uppercase leading-none tracking-[-0.06em] text-biolum/[0.14]"
        >
          {ghost}
        </motion.p>
      )}

      <motion.div style={{ y: contentY, opacity: fade }} className="container-x relative w-full pb-32 pt-32 md:pb-32">
        <motion.div
          className="mb-10 flex items-center justify-between border-b border-white/15 pb-5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/60"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        >
          <span className="text-cyan">
            {index} — {eyebrow}
          </span>
          <span className="hidden sm:inline">Planet Ocean Foundation · Kovalam, Kerala</span>
        </motion.div>
        <TextReveal as="h1" onMount delay={0.6} text={title} accent={accent} className="display-xl max-w-6xl" />
        {intro && (
          <motion.div
            className="mt-10 max-w-2xl text-lg leading-relaxed text-white/80 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.2 }}
          >
            {intro}
          </motion.div>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1.35 }}>
            {children}
          </motion.div>
        )}
      </motion.div>

      <svg aria-hidden viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-px z-10 block h-[60px] w-full md:h-[100px]">
        <path fill={nextFill[next]} opacity="0.3" d="M0 64c96-20 192-44 320-38 140 7 220 52 360 54 150 2 230-46 380-54 144-8 260 30 380 50v44H0z" />
        <path fill={nextFill[next]} d="M0 86c120-26 230-40 360-28 136 12 220 46 360 46s240-40 380-46c130-6 240 16 340 30v32H0z" />
      </svg>
    </section>
  );
}
