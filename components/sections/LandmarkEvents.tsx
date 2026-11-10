"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { eventsIntro, landmarkEvents } from "@/data/events";
import { MaskReveal, Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { cn } from "@/lib/utils";
import { SCROLL_MOTION_QUERY } from "@/lib/useMedia";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const labelStyle = (label: string) => (label === "India's first" ? "bg-coral text-abyss" : "bg-cyan text-abyss");

/**
 * Section 06 — "Firsts, held beneath the surface."
 * Pinned stage on every screen size; each event opens through an expanding porthole while titles crossfade.
 * Reduced motion: stacked editorial panels.
 */
export function LandmarkEvents({ showHeader = true, showLink = true }: { showHeader?: boolean; showLink?: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(SCROLL_MOTION_QUERY, () => setPinned(true));
    return () => mm.revert();
  }, []);

  useLayoutEffect(() => {
    if (!pinned || !stage.current) return;
    const ctx = gsap.context(() => {
      const imgs = gsap.utils.toArray<HTMLElement>("[data-ev-img]");
      const texts = gsap.utils.toArray<HTMLElement>("[data-ev-text]");
      const ghosts = gsap.utils.toArray<HTMLElement>("[data-ev-ghost]");
      gsap.set(imgs.slice(1), { clipPath: "circle(0% at 70% 50%)" });
      gsap.set(texts.slice(1), { autoAlpha: 0, y: 60 });
      gsap.set(ghosts.slice(1), { autoAlpha: 0, xPercent: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: stage.current,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${window.innerHeight * (landmarkEvents.length - 0.2)}`,
          invalidateOnRefresh: true,
          onUpdate: (st) => setActive(Math.min(landmarkEvents.length - 1, Math.floor(st.progress * landmarkEvents.length * 0.999))),
        },
      });
      imgs.forEach((img, i) => {
        gsap.to(img.querySelector("img"), {
          scale: 1.15,
          ease: "none",
          scrollTrigger: { trigger: stage.current, start: "top top", end: () => `+=${window.innerHeight * landmarkEvents.length}`, scrub: true },
        });
        if (i === 0) return;
        tl.to(texts[i - 1], { autoAlpha: 0, y: -60, duration: 0.4 }, i)
          .to(ghosts[i - 1], { autoAlpha: 0, xPercent: -20, duration: 0.5 }, i)
          .to(img, { clipPath: "circle(150% at 70% 50%)", duration: 1 }, i)
          .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.5 }, i + 0.45)
          .to(ghosts[i], { autoAlpha: 1, xPercent: 0, duration: 0.6 }, i + 0.3);
      });
      tl.to({}, { duration: 0.3 });
    }, stage);
    return () => ctx.revert();
  }, [pinned]);

  return (
    <section aria-labelledby={showHeader ? "events-title" : undefined} aria-label={showHeader ? undefined : "The three landmark events"} className="relative bg-abyss text-white">
      {showHeader && (
        <div className="grain relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-36">
          <div aria-hidden className="absolute -left-40 top-0 size-[40rem] animate-orb rounded-full bg-violet/30 orb-soft" />
          <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-cyan">06 — Landmark events</p>
              <TextReveal id="events-title" text="Firsts, held beneath the surface." className="display-xl mt-5" accent={["beneath", "the", "surface."]} />
            </div>
            <Reveal className="lg:col-span-4">
              <p className="text-lg leading-relaxed text-white/70">{eventsIntro}</p>
            </Reveal>
          </div>
        </div>
      )}

      {pinned ? (
        <div ref={stage} className="relative h-[100svh] overflow-hidden">
          {landmarkEvents.map((e, i) => (
            <div key={e.id} data-ev-img className="absolute inset-0" style={{ zIndex: i }}>
              <Image src={e.image} alt={e.imageAlt} fill sizes="100vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/70 to-abyss/20 lg:bg-gradient-to-r lg:to-abyss/10" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-abyss/40" />
            </div>
          ))}

          {landmarkEvents.map((e) => (
            <p
              key={e.id}
              data-ev-ghost
              aria-hidden
              className="text-outline pointer-events-none absolute right-[4vw] top-[14svh] z-10 select-none whitespace-nowrap text-right font-display text-[17vw] lg:text-[9vw] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-biolum/30"
            >
              {e.label.split(" ")[0]}
              <br />
              {e.label.split(" ")[1]}
            </p>
          ))}

          <div className="container-x relative z-20 flex h-full items-end pb-24 lg:pb-[12vh]">
            <div className="relative h-[58svh] w-full max-w-2xl lg:h-[46vh]">
              {landmarkEvents.map((e, i) => (
                <article key={e.id} id={e.id} data-ev-text className="absolute inset-x-0 bottom-0">
                  <p className={cn("inline-flex rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.18em]", labelStyle(e.label))}>{e.label}</p>
                  <h3 className="display-lg mt-5 lg:mt-6">
                    <span className="sr-only">{e.label}: </span>
                    {e.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-xl lg:mt-6">{e.description}</p>
                  <p aria-hidden className="mt-6 font-mono lg:mt-8 text-xs uppercase tracking-[0.2em] text-white/45">
                    0{i + 1} / 0{landmarkEvents.length}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div aria-hidden className="absolute inset-x-5 bottom-8 z-20 flex items-center justify-end gap-4 sm:inset-x-auto sm:right-8 lg:bottom-10 lg:right-[3.5rem]">
            <PhotoNote className="hidden sm:inline-flex">Representative imagery</PhotoNote>
            <div className="flex gap-2">
              {landmarkEvents.map((e, i) => (
                <span key={e.id} className="relative h-1 w-10 overflow-hidden sm:w-14 rounded-full bg-white/20">
                  <span className={cn("absolute inset-0 origin-left rounded-full bg-cyan transition-transform duration-700 ease-tide", i <= active ? "scale-x-100" : "scale-x-0")} />
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ol className="container-x space-y-20 pb-8 md:space-y-28">
          {landmarkEvents.map((e, i) => (
            <li key={e.id}>
              <article id={e.id} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <div className={cn("relative md:col-span-7", i % 2 === 1 && "md:order-2")}>
                  <MaskReveal from={i % 2 ? "right" : "left"} className="relative aspect-[4/3] rounded-[2rem]">
                    <Image src={e.image} alt={e.imageAlt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/70 to-transparent" />
                  </MaskReveal>
                  <PhotoNote className="absolute bottom-4 left-4">Representative image</PhotoNote>
                  <span aria-hidden className="text-outline absolute -top-8 right-4 font-display text-8xl font-extrabold text-biolum/40">
                    0{i + 1}
                  </span>
                </div>
                <Reveal className={cn("md:col-span-5", i % 2 === 1 && "md:order-1")}>
                  <p className={cn("inline-flex rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.18em]", labelStyle(e.label))}>{e.label}</p>
                  <h3 className="display-md mt-5">
                    <span className="sr-only">{e.label}: </span>
                    {e.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-white/75">{e.description}</p>
                </Reveal>
              </article>
            </li>
          ))}
        </ol>
      )}

      {showLink && (
        <div className="flex justify-center pb-24 pt-16 md:pb-32">
          <ButtonLink href="/events" variant="ghost-light">
            Explore the landmark events
          </ButtonLink>
        </div>
      )}
    </section>
  );
}
