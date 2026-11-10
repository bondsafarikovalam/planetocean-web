"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Bubbles, LightRays } from "@/components/animations/OceanEffects";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

/** Section 08 — the final ocean experience: the frame opens from a porthole into a full-bleed sea. */
export function FinalCTA({
  title = "Together, we can protect what lies beneath.",
  cta = "Start a Conversation",
  href = "/contact",
}: {
  title?: string;
  cta?: string;
  href?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["14%", "0%"]);
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? ["0px", "0px"] : ["240px", "0px"]);
  const clip = useTransform([inset, radius], ([i, r]) => `inset(${i} ${i} ${i} ${i} round ${r})`);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.3, 1.05]);

  return (
    <section ref={ref} aria-labelledby="cta-title" className="cv-auto relative isolate overflow-hidden bg-pearl">
      <motion.div style={{ clipPath: clip }} className="relative isolate overflow-hidden bg-abyss py-28 text-white md:py-52">
        <motion.div aria-hidden style={{ scale: imgScale }} className="absolute inset-0 -z-20">
          <Image src="/images/final-cta-horizon.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-abyss/90 via-atlantic/60 to-abyss" />
        <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 size-[50rem] -translate-x-1/2 -translate-y-1/2 animate-orb rounded-full bg-violet/30 orb-soft" />
        <LightRays className="-z-10 opacity-60" />
        <Bubbles count={16} className="-z-10" />

        <div className="container-x relative text-center">
          <Reveal>
            <p className="eyebrow text-cyan">08 — Start a conversation</p>
            <p lang="ml" className="mt-6 text-xl text-biolum md:text-2xl">
              {site.taglineMl}
            </p>
          </Reveal>
          <TextReveal id="cta-title" text={title} className="display-xl mx-auto mt-8 max-w-5xl" accent={["beneath.", "programme?", "conversation."]} />
          <Reveal delay={0.2} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={href} magnetic>
              {cta}
            </ButtonLink>
            <ButtonLink href="/programmes" variant="ghost-light" magnetic>
              See every programme
            </ButtonLink>
          </Reveal>
          <p className="mt-16 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/45">
            {site.name} · {site.base}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
