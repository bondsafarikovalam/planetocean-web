"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { categories, programmesIn, type Category, type CategoryId } from "@/data/programmes";
import { TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";
import { SCROLL_MOTION_QUERY } from "@/lib/useMedia";
import { scrollToY } from "@/lib/smoothScroll";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Theme = { bg: string; text: string; sub: string; chip: string; accent: string; dark: boolean };
export const worldTheme: Record<CategoryId, Theme> = {
  shore: { bg: "bg-world-shore", text: "text-ink", sub: "text-ink-soft", chip: "bg-white/70 ring-ink/10 text-ink hover:bg-ink hover:text-white", accent: "text-coral-ink", dark: false },
  surface: { bg: "bg-world-surface", text: "text-ink", sub: "text-ink/70", chip: "bg-white/60 ring-ink/10 text-ink hover:bg-ink hover:text-white", accent: "text-ocean-ink", dark: false },
  reef: { bg: "bg-world-reef", text: "text-white", sub: "text-white/80", chip: "bg-white/10 ring-white/20 text-white hover:bg-white hover:text-abyss", accent: "text-biolum", dark: true },
  blue: { bg: "bg-world-blue", text: "text-white", sub: "text-white/70", chip: "bg-white/[0.06] ring-white/15 text-white hover:bg-white hover:text-abyss", accent: "text-cyan", dark: true },
};

/** Section 04 — the four ocean worlds as a pinned horizontal descent on every screen size (stacked panels under reduced motion). */
export function OceanWorlds() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [pinned, setPinned] = useState(false);
  const stRef = useRef<ScrollTrigger | null>(null);

  /** When pinned, panels sit side by side — translate their x offset into a scroll position. */
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const st = stRef.current;
    const panel = document.getElementById(id);
    if (!st || !panel || !track.current) return;
    e.preventDefault();
    const max = track.current.scrollWidth - window.innerWidth;
    const ratio = Math.min(1, panel.offsetLeft / max);
    scrollToY(st.start + (st.end - st.start) * ratio);
  };

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(SCROLL_MOTION_QUERY, () => {
      setPinned(true);
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          scrub: 0.8,
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (st) => {
            const p = st.progress * (categories.length + 0.6) - 0.6;
            setActive(Math.max(-1, Math.min(categories.length - 1, Math.floor(p + 0.5))));
          },
        },
      });
      el.querySelectorAll<HTMLElement>("[data-world-img]").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -10, scale: 1.12 },
          {
            xPercent: 10,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: img.closest("[data-world]"), containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
        );
      });
      el.querySelectorAll<HTMLElement>("[data-world-ghost]").forEach((g) => {
        gsap.fromTo(
          g,
          { xPercent: 30 },
          {
            xPercent: -30,
            ease: "none",
            scrollTrigger: { trigger: g.closest("[data-world]"), containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
        );
      });
      stRef.current = tween.scrollTrigger ?? null;
      return () => {
        stRef.current = null;
        setPinned(false);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} aria-labelledby="worlds-title" className="relative overflow-hidden bg-abyss">
      <div ref={track} className={cn("flex lg:h-screen lg:w-max lg:flex-row", pinned ? "h-[100svh] w-max flex-row" : "flex-col")}>
        {/* Intro panel */}
        <div className={cn("relative flex shrink-0 flex-col justify-center overflow-hidden bg-pearl px-5 py-20 sm:px-8 lg:h-full lg:w-[44vw] lg:px-14", pinned && "h-full w-screen")}>
          <div aria-hidden className="absolute -bottom-40 -left-20 size-[30rem] rounded-full bg-cyan/20 orb-soft" />
          <p className="eyebrow relative text-ocean-ink">04 — Explore the four ocean worlds</p>
          <TextReveal id="worlds-title" as="h2" text="Where the work happens." className="display-xl relative mt-6 text-ink" accent={["happens."]} accentClassName="text-gradient-ocean" />
          <p className="relative mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
            Our programmes are organised by depth — from the tideline, to the surface, down to the reef and out into the wider blue economy.
          </p>
          <ol className="relative mt-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.id}>
                <a
                  href={`#world-${c.id}`}
                  onClick={(e) => goTo(e, `world-${c.id}`)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-ink hover:text-white"
                >
                  <span className="font-mono text-xs text-ocean-ink">0{c.index}</span> {c.name}
                </a>
              </li>
            ))}
          </ol>
          <p className={cn("relative mt-12 items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-soft lg:flex", pinned ? "flex" : "hidden")}>
            <span className="h-px w-10 bg-ink/30" /> Scroll to descend
          </p>
        </div>

        {categories.map((c) => (
          <WorldPanel key={c.id} c={c} pinned={pinned} />
        ))}
      </div>

      {pinned && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-5 z-20 lg:bottom-8">
          <div className="mx-auto flex w-fit max-w-[calc(100vw-2rem)] items-center gap-1 rounded-full bg-abyss/85 p-1.5 ring-1 ring-white/10">
            {categories.map((c, i) => (
              <span
                key={c.id}
                className={cn(
                  "whitespace-nowrap rounded-full px-2.5 py-1.5 font-mono text-[0.58rem] uppercase lg:px-4 lg:text-[0.65rem] tracking-[0.16em] transition-all duration-500",
                  i === active ? "bg-cyan text-abyss" : i < active ? "text-white/70" : "text-white/35",
                )}
              >
                {c.name}
                <span className="hidden lg:inline"> · {c.id === "blue" ? "∞" : c.depth.split(" · ")[0]}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function WorldPanel({ c, pinned }: { c: Category; pinned: boolean }) {
  const t = worldTheme[c.id];
  const list = programmesIn(c.id);
  const fullBleed = t.dark;
  const label = c.id === "blue" ? "Climate & Blue Economy" : c.name;

  return (
    <article
      id={`world-${c.id}`}
      data-world
      aria-labelledby={`world-${c.id}-title`}
      className={cn("relative flex shrink-0 scroll-mt-0 overflow-hidden lg:h-full lg:w-screen", pinned && "h-full w-screen", t.bg, t.text)}
    >
      {fullBleed ? (
        <div className="absolute inset-0 overflow-hidden">
          <div data-world-img className="absolute -inset-x-[12%] inset-y-0">
            <Image src={c.image} alt={c.imageAlt} fill sizes="100vw" className="object-cover" />
          </div>
          <div
            aria-hidden
            className={cn(
              "absolute inset-0",
              c.id === "reef" ? "bg-gradient-to-r from-ocean/95 via-[#0757a8]/75 to-abyss/30" : "bg-gradient-to-r from-abyss via-abyss/85 to-violet/30",
            )}
          />
        </div>
      ) : null}

      <span
        data-world-ghost
        aria-hidden
        className={cn(
          "text-outline pointer-events-none absolute -bottom-[6vw] right-[4vw] select-none font-display text-[42vw] font-extrabold leading-none tracking-[-0.06em] lg:text-[30vw]",
          t.dark ? "text-white/10" : "text-ink/[0.07]",
        )}
      >
        0{c.index}
      </span>

      <div className={cn("container-x relative grid w-full items-center lg:grid-cols-12 lg:gap-12 lg:py-0", pinned ? "content-center gap-6 pb-16 pt-20" : "gap-12 py-20")}>
        <div className={cn("lg:col-span-6", !fullBleed && "lg:order-1")}>
          <p className={cn("eyebrow flex items-center gap-3", t.accent)}>
            <span className="font-mono">0{c.index} / 04</span>
            <span className={cn("h-px w-10", t.dark ? "bg-white/40" : "bg-ink/30")} />
            {c.depth}
          </p>
          <h3 id={`world-${c.id}-title`} className="display-2xl mt-4 lg:mt-6">
            {c.name}
          </h3>
          {c.id === "blue" && <p className={cn("mt-3 font-display text-xl font-semibold", t.sub)}>Climate &amp; blue economy</p>}
          <p className={cn("mt-4 max-w-md text-base leading-relaxed md:text-lg lg:mt-6", t.sub)}>{c.summary}</p>

          <ul className="mt-5 flex max-w-xl flex-wrap gap-1.5 lg:mt-8 lg:gap-2">
            {list.map((p) => (
              <li key={p.number}>
                <Link
                  href={`/programmes#programme-${p.number}`}
                  className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ring-1 lg:px-3.5 lg:py-2 lg:text-sm transition-colors duration-300", t.chip)}
                >
                  <span className="font-mono text-xs opacity-60">{p.number}</span>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={`/programmes?category=${c.id}`}
            className={cn(
              "group mt-6 inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 font-semibold transition-colors lg:mt-10",
              t.dark ? "bg-white text-abyss hover:bg-cyan" : "bg-abyss text-white hover:bg-ocean",
            )}
          >
            Explore {label} programmes
            <span className={cn("inline-flex size-9 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45", t.dark ? "bg-abyss text-cyan" : "bg-cyan text-abyss")}>
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </Link>
        </div>

        {!fullBleed && (
          <div className={cn("relative lg:order-2 lg:col-span-6", pinned && "max-lg:mx-auto max-lg:w-[min(58vw,30svh)]")}>
            <div
              className={cn(
                "relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden shadow-[0_60px_120px_-50px_rgb(3_21_29/0.55)] lg:max-h-[72vh]",
                c.id === "shore" ? "rounded-t-full rounded-b-[2.5rem]" : "rounded-full lg:aspect-square",
              )}
            >
              <div data-world-img className="absolute -inset-x-[12%] inset-y-0">
                <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              <div aria-hidden className={cn("absolute inset-0 mix-blend-soft-light", c.id === "shore" ? "bg-coral/40" : "bg-cyan/30")} />
            </div>
            <span className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full sm:inline-block bg-white/85 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink">
              {list.length} programmes · {c.depth}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
