"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { site } from "@/lib/site";
import { useRichMotion } from "@/lib/useMedia";
import { ButtonLink } from "@/components/ui/Button";
import { Bubbles, LightRays } from "@/components/animations/OceanEffects";

const EASE = [0.22, 1, 0.36, 1] as const;
const LINES: { words: string[]; accent?: string[] }[] = [
  { words: ["From", "the", "beach", "line"] },
  { words: ["to", "the", "blue", "beyond."], accent: ["blue", "beyond."] },
];

/**
 * "Enter the Blue" — layered hero. Each layer travels at its own speed on scroll
 * (and, on desktop, with the pointer), so the scene reads as depth.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const k = reduce ? 0 : 1;
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", `${30 * k}%`]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.05 + 0.2 * k]);
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", `${-60 * k}%`]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", `${-22 * k}%`]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const waveY = useTransform(scrollYProgress, [0, 1], ["0%", `${-35 * k}%`]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  // Pointer parallax (desktop only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const bgPX = useTransform(sx, (v) => v * -18);
  const bgPY = useTransform(sy, (v) => v * -12);
  const ghostPX = useTransform(sx, (v) => v * 36);
  const raysPX = useTransform(sx, (v) => v * 10);

  let wi = 0;

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      onPointerMove={(e) => {
        if (!rich) return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-abyss text-white"
    >
      {/* L0 — photograph */}
      <motion.div aria-hidden style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -z-30 will-change-transform">
        <motion.div style={{ x: bgPX, y: bgPY }} className="absolute -inset-8">
          <div className="absolute inset-0 animate-drift">
            <Image src="/images/hero-underwater-light.jpg" alt="" fill preload sizes="100vw" quality={85} className="object-cover object-[50%_30%]" />
          </div>
        </motion.div>
      </motion.div>

      {/* L1 — colour grade + atmospheric orbs */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-b from-abyss/75 via-atlantic/30 to-abyss/95" />
      <div aria-hidden className="absolute -left-[15%] top-[10%] -z-20 size-[55vw] animate-orb rounded-full bg-violet/35 orb-soft" />
      <div aria-hidden className="absolute -right-[10%] bottom-[5%] -z-20 size-[45vw] animate-orb rounded-full bg-ocean/40 orb-soft [animation-delay:-9s]" />

      {/* L2 — light rays */}
      <motion.div aria-hidden style={{ x: raysPX }} className="absolute inset-0 -z-10">
        <LightRays className="opacity-90" />
      </motion.div>
      <div aria-hidden className="caustics absolute inset-0 -z-10 opacity-80" />

      {/* L3 — ghost typography, travels fastest */}
      <motion.p
        aria-hidden
        style={{ y: ghostY, x: ghostPX }}
        className="text-outline pointer-events-none absolute right-[-4vw] top-[16%] -z-10 select-none font-display text-[34vw] font-extrabold leading-none tracking-[-0.06em] text-biolum/[0.13] lg:top-[8%]"
      >
        BLUE
      </motion.p>

      {/* L4 — particles */}
      <Bubbles className="-z-10" />

      {/* L5 — content */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-x relative w-full pb-28 pt-32 md:pb-44">
        <motion.p
          className="eyebrow mb-8 flex items-center gap-3 text-cyan"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        >
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-cyan" />
          </span>
          Planet Ocean Foundation — Kovalam, Kerala
        </motion.p>

        <h1 id="hero-title" className="display-2xl max-w-[12ch]" aria-label={site.tagline}>
          {LINES.map((line, li) => (
            <span key={li} aria-hidden className="block">
              {line.words.map((w) => {
                const i = wi++;
                return (
                  <span key={`${li}-${w}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                    <motion.span
                      className={line.accent?.includes(w) ? "inline-block text-gradient-cyan" : "inline-block"}
                      initial={{ y: "108%", rotate: 6 }}
                      animate={{ y: "0%", rotate: 0 }}
                      transition={{ duration: 1.3, ease: EASE, delay: 0.75 + i * 0.075 }}
                    >
                      {w}
                    </motion.span>
                    {" "}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.45 }}
          >
            <p lang="ml" className="text-xl text-biolum md:text-2xl">
              {site.taglineMl}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-[1.06rem]">{site.heroDescription}</p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.6 }}
          >
            <ButtonLink href="/programmes" magnetic>
              Explore Our Programmes
            </ButtonLink>
            <ButtonLink href="/get-involved" variant="ghost-light" icon="up-right" magnetic>
              Get Involved
            </ButtonLink>
          </motion.div>
        </div>
      </motion.div>

      {/* HUD */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="container-x flex items-end justify-between pb-24 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/55">
          <span>Kovalam · Alappuzha · Lakshadweep</span>
          <a href="#introduction" className="pointer-events-auto flex flex-col items-center gap-3 text-white/70 transition-colors hover:text-white">
            Enter the blue
            <span className="relative block h-12 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_var(--ease-tide)_infinite] bg-cyan" />
            </span>
          </a>
          <span>16 active programmes</span>
        </div>
      </motion.div>

      {/* L6 — foreground surface: moves fastest, hands off to the next section */}
      <motion.div aria-hidden style={{ y: waveY }} className="pointer-events-none absolute inset-x-0 top-[calc(100%-69px)] z-20 md:top-[calc(100%-119px)]">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-[70px] w-full md:h-[120px]">
          <path fill="var(--color-pearl)" opacity="0.25" d="M0 70c120-30 260-52 420-40s300 60 470 58 300-50 380-58 120 6 170 14v96H0z" />
          <path fill="var(--color-pearl)" d="M0 100c160-36 300-44 460-28s280 48 460 42 300-46 400-48 90 6 120 10v64H0z" />
        </svg>
        <div className="-mt-px h-48 bg-pearl" />
      </motion.div>
      <motion.div aria-hidden style={{ opacity: veil }} className="pointer-events-none absolute inset-0 z-[5] bg-abyss" />
    </section>
  );
}
