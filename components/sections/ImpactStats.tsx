"use client";

import { motion } from "motion/react";
import { LayoutGrid, MapPin, Waves } from "lucide-react";
import { CountUp } from "@/components/animations/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { categories, programmes, programmesIn } from "@/data/programmes";
import { operatingWaters } from "@/data/navigation";

const barColour: Record<string, string> = {
  shore: "from-coral to-[#ffb3a5]",
  surface: "from-biolum to-cyan",
  reef: "from-cyan to-ocean",
  blue: "from-ocean to-violet",
};

/** Section 03 — instrument-panel snapshot of verified facts only. */
export function ImpactStats() {
  return (
    <section aria-labelledby="facts-title" className="cv-auto grain relative overflow-hidden bg-atlantic py-20 text-white md:py-28">
      <div aria-hidden className="tech-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div aria-hidden className="absolute -right-40 -top-40 size-[44rem] animate-orb rounded-full bg-violet/35 orb-soft" />
      <div aria-hidden className="absolute -bottom-40 -left-40 size-[36rem] animate-orb rounded-full bg-ocean/30 orb-soft [animation-delay:-12s]" />

      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-cyan">03 — Foundation snapshot</p>
            <TextReveal id="facts-title" text="The Foundation at a glance" className="display-lg mt-5 max-w-3xl" accent={["glance"]} />
          </div>
          <Reveal className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/45">
            <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-cyan align-middle" />
            Verified organisational facts
          </Reveal>
        </div>

        <RevealGroup as="dl" className="mt-14 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <RevealItem className="glow-border relative overflow-hidden rounded-[2rem] bg-white/[0.035] p-8 md:p-12 lg:col-span-7 lg:row-span-2">
            <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-biolum/80">
              <LayoutGrid className="size-4 text-cyan" aria-hidden /> Active programmes
            </dt>
            <dd className="mt-6">
              <CountUp to={programmes.length} className="block font-display text-[clamp(7rem,18vw,15rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-gradient-cyan" />
              <span className="mt-6 block max-w-sm text-white/65">Across shore, surface, reef and blue</span>
              <ul className="mt-10 space-y-4" aria-label="Programmes per category">
                {categories.map((c, i) => {
                  const n = programmesIn(c.id).length;
                  return (
                    <li key={c.id} className="grid grid-cols-[8.5rem_1fr_2rem] items-center gap-4 text-sm sm:grid-cols-[11rem_1fr_2rem]">
                      <span className="truncate text-white/75">{c.filterLabel}</span>
                      <span className="relative h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.span
                          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${barColour[c.id]}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(n / programmes.length) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.12 }}
                        />
                      </span>
                      <span className="text-right font-mono tabular-nums text-white">{String(n).padStart(2, "0")}</span>
                    </li>
                  );
                })}
              </ul>
            </dd>
          </RevealItem>

          <RevealItem className="glow-border relative overflow-hidden rounded-[2rem] bg-white/[0.035] p-8 md:p-10 lg:col-span-5">
            <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-biolum/80">
              <MapPin className="size-4 text-coral" aria-hidden /> Base
            </dt>
            <dd className="relative z-10 mt-10">
              <span className="block font-display text-5xl font-extrabold tracking-tight md:text-6xl">Kovalam</span>
              <span className="mt-3 block text-white/65">Thiruvananthapuram, Kerala</span>
            </dd>
            <div aria-hidden className="absolute -right-16 -top-16 size-64">
              {[0, 1.5, 3].map((d) => (
                <span key={d} className="absolute inset-0 animate-sonar rounded-full border border-cyan/50" style={{ animationDelay: `${d}s` }} />
              ))}
              <span className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral shadow-[0_0_20px_4px_rgb(255_128_108/0.7)]" />
            </div>
          </RevealItem>

          <RevealItem className="glow-border relative overflow-hidden rounded-[2rem] bg-white/[0.035] p-8 md:p-10 lg:col-span-5">
            <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-biolum/80">
              <Waves className="size-4 text-cyan" aria-hidden /> Operating waters
            </dt>
            <dd className="mt-6 flex items-end justify-between gap-6">
              <CountUp to={operatingWaters.length} className="block font-display text-7xl font-extrabold leading-none tracking-tight text-cyan md:text-8xl" />
              <ul className="space-y-2 text-right">
                {operatingWaters.map((w) => (
                  <li key={w.name} className="flex items-center justify-end gap-2.5 font-display text-lg font-semibold">
                    {w.name}
                    <span aria-hidden className="size-1.5 rounded-full bg-cyan shadow-[0_0_12px_2px_rgb(66_232_224/0.8)]" />
                  </li>
                ))}
              </ul>
            </dd>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
