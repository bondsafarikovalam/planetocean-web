import type { Metadata } from "next";
import { eventsIntro, landmarkEvents } from "@/data/events";
import { PageHero } from "@/components/sections/PageHero";
import { StackedEvents } from "@/components/sections/StackedEvents";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ScrollWords } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";

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
        index="E"
        eyebrow="Landmark events"
        title="Firsts, held beneath the surface."
        accent={["beneath", "the", "surface."]}
        ghost="Firsts"
        image="/images/events-hero.jpg"
        next="abyss"
        tint="violet"
      />

      <section aria-label="About these events" className="relative overflow-hidden bg-abyss py-20 text-white md:py-32">
        <div aria-hidden className="absolute -right-40 top-0 size-[40rem] animate-orb rounded-full bg-ocean/25 orb-soft" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow text-cyan">{landmarkEvents.length} firsts</p>
            <ul className="mt-6 space-y-2 font-mono text-xs uppercase tracking-[0.16em] text-white/55">
              {landmarkEvents.map((e) => (
                <li key={e.id}>
                  <a href={`#${e.id}`} className="link-underline hover:text-white">
                    {e.label} — {e.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <ScrollWords text={eventsIntro} dim="text-white/15" className="font-display text-3xl font-bold leading-[1.15] tracking-tight md:text-5xl lg:col-span-9" />
        </div>
      </section>

      <StackedEvents />

      <FinalCTA title="Bring the ocean into your next conversation." cta="Start a Conversation" />
    </>
  );
}
