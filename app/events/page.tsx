import type { Metadata } from "next";
import Image from "next/image";
import { eventsIntro, landmarkEvents } from "@/data/events";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MaskReveal, Reveal } from "@/components/animations/Reveal";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Landmark Events",
  description:
    "India's first underwater wedding, the world's first underwater CEO conference and the world's first underwater audio release of a Malayalam film — conversations moved beneath the surface.",
  alternates: { canonical: "/events" },
  openGraph: { title: "Landmark Events | Planet Ocean Foundation", images: ["/images/events-hero.jpg"] },
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Landmark events"
        title="Firsts, held beneath the surface."
        intro={eventsIntro}
        image="/images/events-hero.jpg"
        waveColor="var(--color-abyss)"
      />

      <section aria-label="The three landmark events" className="relative bg-abyss pb-24 pt-10 text-white md:pb-36">
        <div className="container-x space-y-28 md:space-y-40">
          {landmarkEvents.map((e, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={e.id} id={e.id} className="relative grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={cn("relative lg:col-span-7", flip && "lg:order-2")}>
                  <MaskReveal from={flip ? "right" : "left"} className="relative aspect-[4/3] rounded-[2rem] lg:aspect-[5/4]">
                    <Image src={e.image} alt={e.imageAlt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/60 via-transparent to-abyss/20" />
                  </MaskReveal>
                  <PhotoNote className="absolute bottom-5 left-5">Representative image — event photography to follow</PhotoNote>
                  <span
                    aria-hidden
                    className={cn(
                      "text-outline pointer-events-none absolute -top-10 font-display text-[7rem] font-extrabold leading-none text-aqua/40 md:-top-16 md:text-[11rem]",
                      flip ? "-left-2 lg:-left-10" : "-right-2 lg:-right-10",
                    )}
                  >
                    0{i + 1}
                  </span>
                </div>

                <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
                  <Reveal>
                    <p
                      className={cn(
                        "inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]",
                        e.label === "India's first" ? "bg-sand text-abyss" : "bg-aqua text-abyss",
                      )}
                    >
                      {e.label}
                    </p>
                    <h2 className="display-md mt-6">
                      <span className="sr-only">{e.label}: </span>
                      {e.title}
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-white/75 md:text-xl">{e.description}</p>
                    <div aria-hidden className="mt-10 h-px w-24 bg-gradient-to-r from-aqua to-transparent" />
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <FinalCTA title="Bring the ocean into your next conversation." cta="Start a Conversation" />
    </>
  );
}
