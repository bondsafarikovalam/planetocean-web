import Image from "next/image";
import { eventsIntro, landmarkEvents } from "@/data/events";
import { MaskReveal, Reveal } from "@/components/animations/Reveal";
import { Bubbles } from "@/components/animations/OceanEffects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { cn } from "@/lib/utils";

/** Homepage teaser: all three landmark events in an editorial three-up. */
export function LandmarkEvents() {
  return (
    <section aria-labelledby="events-title" className="grain relative overflow-hidden bg-abyss py-24 text-white md:py-36">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgb(8_126_139/0.35),transparent_55%)]" />
      <Bubbles count={12} />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            tone="dark"
            eyebrow="Landmark events"
            title={<span id="events-title">Firsts, held beneath the surface.</span>}
          />
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-seafoam/80">{eventsIntro}</p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {landmarkEvents.map((e, i) => (
            <li key={e.id} className={cn(i === 1 && "md:mt-20", i === 2 && "md:mt-10")}>
              <article className="group">
                <div className="relative">
                  <MaskReveal delay={i * 0.12} className="relative aspect-[4/5] rounded-[1.75rem]">
                    <Image
                      src={e.image}
                      alt={e.imageAlt}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-tide)] group-hover:scale-105"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent" />
                  </MaskReveal>
                  <PhotoNote className="absolute right-4 top-4" />
                  <p
                    className={cn(
                      "absolute left-5 top-5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em]",
                      e.label === "India's first" ? "bg-sand text-abyss" : "bg-aqua text-abyss",
                    )}
                  >
                    {e.label}
                  </p>
                  <span aria-hidden className="text-outline absolute bottom-3 right-5 font-display text-8xl font-extrabold leading-none text-seafoam/60">
                    0{i + 1}
                  </span>
                </div>
                <Reveal delay={0.15 + i * 0.1}>
                  <h3 className="mt-7 font-display text-2xl font-bold leading-tight tracking-tight md:text-[1.75rem]">
                    <span className="sr-only">{e.label}: </span>
                    {e.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/70">{e.description}</p>
                </Reveal>
              </article>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16 flex justify-center">
          <ButtonLink href="/events" variant="ghost-light">
            Explore the landmark events
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
