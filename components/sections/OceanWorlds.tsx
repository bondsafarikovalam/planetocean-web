"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { categories, programmesIn, type CategoryId } from "@/data/programmes";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

type Theme = { bg: string; text: string; sub: string; chip: string; accent: string; dark: boolean };
/** Per-world palette (also used by the programmes directory). */
export const worldTheme: Record<CategoryId, Theme> = {
  shore: { bg: "bg-world-shore", text: "text-ink", sub: "text-ink-soft", chip: "bg-white/70 ring-ink/10 text-ink hover:bg-ink hover:text-white", accent: "text-coral-ink", dark: false },
  surface: { bg: "bg-world-surface", text: "text-ink", sub: "text-ink/70", chip: "bg-white/60 ring-ink/10 text-ink hover:bg-ink hover:text-white", accent: "text-ocean-ink", dark: false },
  reef: { bg: "bg-world-reef", text: "text-white", sub: "text-white/80", chip: "bg-white/10 ring-white/20 text-white hover:bg-white hover:text-abyss", accent: "text-biolum", dark: true },
  blue: { bg: "bg-world-blue", text: "text-white", sub: "text-white/70", chip: "bg-white/[0.06] ring-white/15 text-white hover:bg-white hover:text-abyss", accent: "text-cyan", dark: true },
};

const dot: Record<CategoryId, string> = { shore: "bg-coral", surface: "bg-cyan", reef: "bg-biolum", blue: "bg-violet" };
const EASE = [0.22, 1, 0.36, 1] as const;
/** Seconds each world stays on screen before auto-advancing. */
const AUTO_SECONDS = 6;

/**
 * Section 04 — the four ocean worlds as tabs over one wide image banner.
 * Choosing a tab crossfades the photograph and swaps the story beneath it.
 * Auto-advances every AUTO_SECONDS (the active tab's underline fills as a timer);
 * pauses while the image/story is hovered, during keyboard use, or off-screen.
 */
export function OceanWorlds() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [kbFocus, setKbFocus] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { amount: 0.35 });
  const reduce = useReducedMotion();
  const auto = !reduce;
  const paused = hovered || kbFocus || !inView;
  const next = () => setActive((i) => (i + 1) % categories.length);
  const c = categories[active];
  const list = programmesIn(c.id);
  const label = c.id === "blue" ? "Climate & Blue Economy" : c.name;
  const [depthLine, depthName] = c.depth.split(" · ");

  /** Arrow / Home / End keys move between tabs (WAI-ARIA tabs pattern). */
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = categories.length;
    const next =
      e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      ref={section}
      aria-labelledby="worlds-title"
      onFocusCapture={(e) => setKbFocus((e.target as HTMLElement).matches(":focus-visible"))}
      onBlurCapture={() => setKbFocus(false)}
      className="cv-auto relative overflow-hidden bg-pearl py-20 md:py-28"
    >
      <div aria-hidden className="orb-soft absolute -left-20 top-10 size-[30rem] rounded-full bg-cyan/20" />

      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-ocean-ink">04 — Explore the four ocean worlds</p>
            <TextReveal id="worlds-title" as="h2" text="Where the work happens." className="display-xl mt-5 text-ink" accent={["happens."]} accentClassName="text-gradient-ocean" />
          </div>
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-ink-soft">
              Our programmes are organised by depth — from the tideline, to the surface, down to the reef and out into the wider blue economy.
            </p>
          </Reveal>
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Ocean worlds" className="mt-12 grid grid-cols-4 border-b border-ink/10">
          {categories.map((w, i) => {
            const on = i === active;
            return (
              <button
                key={w.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`world-tab-${w.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls="world-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "group relative flex flex-col items-start gap-1 px-1 pb-4 pt-2 text-left transition-colors duration-300 sm:px-3",
                  on ? "text-ink" : "text-ink/45 hover:text-ink/80",
                )}
              >
                <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em]">
                  <span className={cn("size-1.5 rounded-full transition-opacity", dot[w.id], on ? "opacity-100" : "opacity-40")} />
                  0{w.index}
                  <span className="hidden md:inline">· {w.depth.split(" · ")[0]}</span>
                </span>
                <span className="font-display text-lg font-bold tracking-tight sm:text-2xl md:text-3xl">{w.name}</span>
                {on && (
                  <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden bg-ink/10">
                    <span
                      onAnimationEnd={auto ? next : undefined}
                      className={cn(
                        "block h-full origin-left bg-gradient-to-r from-cyan via-ocean to-violet",
                        auto && "animate-[tabfill_var(--tab-dur)_linear_forwards]",
                      )}
                      style={{ "--tab-dur": `${AUTO_SECONDS}s`, animationPlayState: paused ? "paused" : "running" } as React.CSSProperties}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          id="world-panel"
          role="tabpanel"
          aria-labelledby={`world-tab-${c.id}`}
          aria-live={paused ? "polite" : "off"}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className="mt-8"
        >
          {/* Banner: every photo is mounted, the active one fades in (no load flash on switch) */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-abyss sm:aspect-[16/8] lg:aspect-[21/8]">
            {categories.map((w, i) => (
              <div
                key={w.id}
                aria-hidden={i !== active}
                className={cn(
                  "absolute inset-0 transition-[opacity,transform] duration-[1.1s] ease-tide",
                  i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                )}
              >
                <Image src={w.image} alt={w.imageAlt} fill sizes="(min-width: 1408px) 1300px, 100vw" className="object-cover" />
              </div>
            ))}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-abyss/10 to-transparent" />

            <AnimatePresence mode="wait">
              <motion.p
                key={c.id}
                aria-hidden
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-outline pointer-events-none absolute -bottom-[0.18em] right-4 select-none font-display text-[28vw] font-extrabold leading-none tracking-[-0.06em] text-white/35 sm:text-[18vw] lg:text-[13rem]"
              >
                0{c.index}
              </motion.p>
            </AnimatePresence>

            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-abyss/70 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white sm:bottom-7 sm:left-7">
              <span className={cn("size-1.5 rounded-full", dot[c.id])} />
              {list.length} programmes · {c.depth}
            </span>
          </div>

          {/* Story */}
          <AnimatePresence mode="wait">
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-5">
                <p className={cn("eyebrow flex items-center gap-3", worldTheme[c.id].dark ? "text-ocean-ink" : worldTheme[c.id].accent)}>
                  <span>0{c.index} / 04</span>
                  <span className="h-px w-8 bg-ink/25" />
                  <span>
                    {depthLine}
                    {depthName ? ` · ${depthName}` : ""}
                  </span>
                </p>
                <h3 className="display-lg mt-4 text-ink">{c.name}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">{c.summary}</p>
              </div>

              <div className="flex flex-col justify-between gap-8 lg:col-span-7">
                <ul className="flex flex-wrap gap-2">
                  {list.map((p) => (
                    <li key={p.number}>
                      <Link
                        href={`/programmes#programme-${p.number}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-ink/10 transition-colors duration-300 hover:bg-ink hover:text-white"
                      >
                        <span className="font-mono text-xs opacity-55">{p.number}</span>
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/programmes?category=${c.id}`}
                  className="group inline-flex w-fit items-center gap-3 rounded-full bg-abyss py-2 pl-6 pr-2 font-semibold text-white transition-colors hover:bg-ocean"
                >
                  Explore {label} programmes
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-cyan text-abyss transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
