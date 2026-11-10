"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { landmarkEvents, type LandmarkEvent } from "@/data/events";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

/**
 * Full-screen sticky panels sharing one parent, so each new event slides over the last;
 * the covered panel recedes (scale + dim + rounded corners) as it is overtaken.
 */
export function StackedEvents() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section ref={ref} aria-label="The three landmark events" className="relative bg-abyss">
      {landmarkEvents.map((e, i) => (
        <EventPanel key={e.id} e={e} i={i} progress={scrollYProgress} />
      ))}
    </section>
  );
}

function EventPanel({ e, i, progress }: { e: LandmarkEvent; i: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const n = landmarkEvents.length;
  const last = i === n - 1;
  const still = reduce || last;
  // Offsets must stay within [0, 1] for scroll-linked animations.
  const start = Math.min(i / (n - 1), 0.99);
  const range = [start, Math.min(Math.max((i + 1) / (n - 1), start + 0.01), 1)];
  const scale = useTransform(progress, range, still ? [1, 1] : [1, 0.88]);
  const dim = useTransform(progress, range, still ? [0, 0] : [0, 0.75]);
  const radius = useTransform(progress, range, still ? ["0rem", "0rem"] : ["0rem", "3rem"]);
  const imgY = useTransform(progress, [Math.max(0, Math.min((i - 1) / (n - 1), 0.99)), range[1]], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  const india = e.label === "India's first";

  return (
    <motion.article
      id={e.id}
      aria-labelledby={`${e.id}-title`}
      style={{ scale, borderRadius: radius }}
      className="sticky top-0 isolate flex h-[100svh] origin-top items-end overflow-hidden text-white"
    >
      <motion.div style={{ y: imgY }} className="absolute -inset-y-[8%] inset-x-0 -z-20">
        <Image src={e.image} alt={e.imageAlt} fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-abyss via-abyss/55 to-abyss/20" />
      <div aria-hidden className={cn("absolute inset-0 -z-10 bg-gradient-to-r to-transparent", india ? "from-coral/25" : i === 1 ? "from-violet/35" : "from-ocean/35")} />

      <p
        aria-hidden
        className="text-outline pointer-events-none absolute right-[2vw] top-[12vh] select-none text-right font-display text-[16vw] font-extrabold uppercase leading-[0.82] tracking-[-0.05em] text-biolum/25 md:text-[11vw]"
      >
        {e.label.split(" ")[0]}
        <br />
        {e.label.split(" ")[1]}
      </p>

      <div className="container-x relative w-full pb-16 md:pb-24">
        <div className="flex items-center gap-4">
          <span className={cn("inline-flex rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-abyss", india ? "bg-coral" : "bg-cyan")}>{e.label}</span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">
            0{i + 1} / 0{n}
          </span>
        </div>
        <h2 id={`${e.id}-title`} className="sr-only">
          {e.label}: {e.title}
        </h2>
        <TextReveal as="p" text={e.title} className="display-xl mt-6 max-w-5xl font-display" />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-2xl md:leading-snug">{e.description}</p>
        {!e.eventPhoto && <PhotoNote className="mt-10">Representative image — event photography to follow</PhotoNote>}
      </div>
      <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-abyss" />
    </motion.article>
  );
}
