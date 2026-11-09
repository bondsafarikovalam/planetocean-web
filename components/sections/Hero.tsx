"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Bubbles, LightRays } from "@/components/animations/OceanEffects";

const EASE = [0.22, 1, 0.36, 1] as const;

const lines: { words: string[]; accent?: boolean }[] = [
  { words: ["From", "the", "beach", "line"] },
  { words: ["to", "the", "blue", "beyond."], accent: true },
];

const depthMarks = ["0 m", "5 m", "40 m", "Blue"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const gaugeFill = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);

  let wordIndex = 0;

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-abyss text-white"
    >
      {/* Background photograph with parallax + slow drift */}
      <motion.div aria-hidden style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-20 will-change-transform">
        <div className="absolute inset-0 animate-drift">
          <Image
            src="/images/hero-underwater-light.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-[50%_35%]"
          />
        </div>
      </motion.div>

      {/* Navy grade + vignette for legibility */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-abyss/70 via-midnight/35 to-abyss" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_80%,rgb(6_31_43/0.85),transparent_65%)]" />
      <LightRays className="-z-10 opacity-80" />
      <div aria-hidden className="caustics absolute inset-0 -z-10 opacity-70" />
      <Bubbles className="-z-10" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-x relative w-full pb-28 pt-36 md:pb-32">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <motion.p
              className="eyebrow mb-7 flex items-center gap-3 text-aqua"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            >
              <span aria-hidden className="h-px w-10 bg-aqua" />
              Planet Ocean Foundation · Kovalam, Kerala
            </motion.p>

            <h1 id="hero-title" className="display-xl max-w-[14ch] text-white">
              {lines.map((line, li) => (
                <span key={li} className="block">
                  {line.words.map((w) => {
                    const i = wordIndex++;
                    return (
                      <span key={`${li}-${w}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                        <motion.span
                          className={
                            line.accent && (w === "blue" || w === "beyond.")
                              ? "inline-block bg-gradient-to-r from-aqua via-seafoam to-aqua bg-clip-text text-transparent"
                              : "inline-block"
                          }
                          initial={{ y: "110%" }}
                          animate={{ y: "0%" }}
                          transition={{ duration: 1.1, ease: EASE, delay: 0.3 + i * 0.07 }}
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

            <motion.p
              lang="ml"
              className="mt-7 text-xl text-seafoam md:text-2xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
            >
              {site.taglineMl}
            </motion.p>

            <motion.p
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
            >
              {site.heroDescription}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
            >
              <ButtonLink href="/programmes">Explore Our Programmes</ButtonLink>
              <ButtonLink href="/get-involved" variant="ghost-light" icon="up-right">
                Get Involved
              </ButtonLink>
            </motion.div>
          </div>

          {/* Depth gauge — the site's signature motif */}
          <motion.div
            aria-hidden
            className="hidden justify-end lg:col-span-3 lg:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
          >
            <div className="flex h-72 items-stretch gap-4">
              <div className="flex flex-col justify-between text-right text-xs font-medium tracking-widest text-white/55">
                {depthMarks.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="relative w-px bg-white/20">
                <motion.div style={{ height: gaugeFill }} className="absolute inset-x-0 top-0 bg-gradient-to-b from-seafoam to-aqua" />
                {depthMarks.map((d, i) => (
                  <span
                    key={d}
                    className="absolute -left-[3px] size-[7px] rounded-full border border-aqua bg-abyss"
                    style={{ top: `calc(${(i / (depthMarks.length - 1)) * 100}% - 3px)` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#introduction"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        Descend
        <span className="relative block h-12 w-px overflow-hidden bg-white/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_var(--ease-tide)_infinite] bg-aqua" />
        </span>
      </motion.a>

      {/* Operating waters strip */}
      <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/10 md:block">
        <div className="container-x flex items-center justify-between py-4 text-xs text-white/55">
          <span>Kovalam · Alappuzha · Lakshadweep</span>
          <span className="w-24" />
          <span>16 active programmes</span>
        </div>
      </div>
    </section>
  );
}
