import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { categories, programmeByNumber, programmes, programmesIn, type CategoryId } from "@/data/programmes";
import { operatingWaters } from "@/data/navigation";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Planet Ocean Foundation is the conservation and social-impact arm of the Bond Group of Companies, working from Kovalam across the waters of Kovalam, Alappuzha and Lakshadweep.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | Planet Ocean Foundation", images: ["/images/about-hero.jpg"] },
};

/** Each strand of work, described only with supplied programme content. */
const strands: { id: CategoryId; title: string; body: string; refs: string[] }[] = [
  {
    id: "shore",
    title: "Shoreline activities",
    body:
      "Regular beach clean-ups bring together volunteers, students, fishing communities and Bond staff. Waste is sorted and logged so we can track what washes up and where it comes from. We also support beaches working towards Blue Flag — through environmental education, clean-ups and water-safety readiness.",
    refs: ["01", "11"],
  },
  {
    id: "reef",
    title: "Underwater conservation",
    body:
      "Certified divers remove plastic, fishing gear and debris from reefs and the seabed, and our dive teams locate, cut free and recover ghost nets. Habitat protection and marine-life observation take place across Kovalam and Lakshadweep, under PADI AWARE, Shark Guardian and Green Fins standards and programmes.",
    refs: ["02", "03", "04", "13", "14", "15"],
  },
  {
    id: "surface",
    title: "Ocean education & life at the surface",
    body:
      "Ocean literacy sessions for schools, colleges and coastal communities are delivered in Malayalam and English. Ocean Ambassadors lead conservation in their own schools, villages and dive groups, and Malayalam podcasts carry the conversation to fishermen, families and students. At the surface, Blue Boat Certification sets standards for responsible boat operations, and a safer alternative to the thermocol ponthuvallam rafts used by fishermen is in development.",
    refs: ["05", "06", "10", "12", "16"],
  },
  {
    id: "blue",
    title: "Climate & blue economy",
    body:
      "Bond IMTA RAS grows fish, shellfish and seaweed together in a recirculating system. Carbon Neutral World measures, reduces and offsets emissions — starting with our own operations — and we have developed carbon-neutral strategies for the Diocese of Alleppey.",
    refs: ["07", "08", "09"],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Foundation"
        title={
          <>
            Our sea, <span className="text-aqua">our responsibility.</span>
          </>
        }
        intro={
          <>
            <span lang="ml" className="mb-4 block text-seafoam">
              {site.taglineMl}
            </span>
            Planet Ocean Foundation is the conservation and social-impact arm of the Bond Group of Companies.
          </>
        }
        image="/images/about-hero.jpg"
      />

      {/* Mission & purpose */}
      <section aria-labelledby="mission-title" className="bg-mist py-20 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Mission & purpose" title={<span id="mission-title">From the beach line to the blue beyond.</span>} />
          </div>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-ink-soft lg:col-span-7 lg:pt-14 md:text-xl">
            <p>
              <strong className="font-semibold text-ink">
                Planet Ocean Foundation is the conservation and social-impact arm of the Bond Group of Companies.
              </strong>{" "}
              We clean beaches and reefs, pull ghost nets off the seabed, teach ocean literacy in Malayalam and English, and
              help communities and institutions move towards carbon neutrality.
            </p>
            <p>
              Our base is Kovalam, Thiruvananthapuram. Our work reaches across Kerala&apos;s coastal regions and the waters of
              Kovalam, Alappuzha and Lakshadweep — through {programmes.length} active programmes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Approach: four depths */}
      <section aria-labelledby="approach-title" className="bg-abyss py-20 text-white md:py-32">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            eyebrow="Our conservation approach"
            title={<span id="approach-title">We organise the work by depth.</span>}
            intro="Every programme sits in one of four zones — so it is always clear where the work happens and who it reaches."
          />
          <RevealGroup as="ol" className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <RevealItem as="li" key={c.id} className="relative bg-abyss p-8 transition-colors duration-500 hover:bg-midnight">
                <span className="font-display text-6xl font-extrabold text-aqua/80">0{c.index}</span>
                <h3 className="mt-6 font-display text-2xl font-bold">{c.filterLabel}</h3>
                <p className="mt-1 text-sm text-seafoam/70">{c.depth}</p>
                <p className="mt-4 text-white/70">{c.summary}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  {programmesIn(c.id).length} programmes
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* The four strands, editorial alternating */}
      <section aria-label="What we do" className="bg-mist py-20 md:py-32">
        <div className="container-x space-y-24 md:space-y-32">
          {strands.map((s, i) => {
            const flip = i % 2 === 1;
            const img = s.id === "surface" ? "/images/prog-05-ocean-literacy.jpg" : s.id === "reef" ? "/images/about-turtle.jpg" : s.id === "shore" ? "/images/prog-01-beach-cleanup.jpg" : "/images/prog-07-imta-ras.jpg";
            const alt =
              s.id === "surface"
                ? "Students listening to a teacher in a classroom"
                : s.id === "reef"
                  ? "Green sea turtle swimming in open blue water"
                  : s.id === "shore"
                    ? "Volunteers collecting litter on a beach"
                    : "School of silver fish in blue water";
            return (
              <article key={s.id} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={`relative lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
                  <MaskReveal from={flip ? "right" : "left"} className="relative aspect-[5/4] rounded-[2rem]">
                    <Image src={img} alt={alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                  </MaskReveal>
                  <PhotoNote className="absolute left-4 top-4" />
                </div>
                <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
                  <Reveal>
                    <p className="eyebrow text-teal-ink">
                      {s.id === "blue" ? "Blue" : categories.find((c) => c.id === s.id)?.filterLabel} · {categories.find((c) => c.id === s.id)?.depth}
                    </p>
                    <h2 className="display-md mt-4 text-ink">{s.title}</h2>
                    <p className="mt-6 text-lg leading-relaxed text-ink-soft">{s.body}</p>
                    <ul className="mt-8 flex flex-wrap gap-2">
                      {s.refs.map((n) => {
                        const p = programmeByNumber(n);
                        if (!p) return null;
                        return (
                          <li key={n}>
                            <Link
                              href={`/programmes#programme-${n}`}
                              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-ink/10 transition-colors hover:bg-abyss hover:text-white"
                            >
                              <span className="tabular-nums text-teal-ink">{n}</span> {p.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Operating waters */}
      <section aria-labelledby="waters-title" className="relative isolate overflow-hidden bg-midnight py-20 text-white md:py-32">
        <ParallaxImage src="/images/about-coast.jpg" alt="" className="!absolute inset-0 -z-20 opacity-40" strength={60} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-abyss via-abyss/85 to-abyss/40" />
        <div className="container-x">
          <SectionHeading
            tone="dark"
            eyebrow="Where we work"
            title={<span id="waters-title">Kovalam · Alappuzha · Lakshadweep</span>}
            intro="Based in Kovalam, Thiruvananthapuram, our teams work across Kerala's coastal regions and surrounding waters."
          />
          <RevealGroup as="ul" className="mt-14 grid gap-5 md:grid-cols-3">
            {operatingWaters.map((w) => (
              <RevealItem
                as="li"
                key={w.name}
                className="rounded-[1.75rem] border border-white/10 bg-abyss/50 p-8 backdrop-blur-md transition-colors duration-500 hover:border-aqua/40"
              >
                <MapPin className="size-5 text-aqua" aria-hidden />
                <h3 className="mt-6 font-display text-3xl font-bold">{w.name}</h3>
                <p className="mt-1 text-seafoam/75">{w.region}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/45">{w.note}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Relationship with Bond Group */}
      <section aria-labelledby="bond-title" className="bg-sand py-20 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Bond Group of Companies" title={<span id="bond-title">The CSR wing of Bond Group.</span>} />
          </div>
          <Reveal delay={0.1} className="lg:col-span-7 lg:pt-14">
            <p className="text-lg leading-relaxed text-ink-soft md:text-xl">
              Planet Ocean Foundation is the CSR wing of the Bond Group of Companies. Bond&apos;s people are part of the work
              itself:
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Bond staff join our beach clean-ups alongside volunteers, students and fishing communities.",
                "Conservation dives across Kovalam and Lakshadweep are carried out with Bond's dive teams and local communities.",
                "Bond's own teams follow Green Fins environmental standards for dive and snorkel operations.",
                "Carbon Neutral World starts with our own operations before extending to institutions and communities.",
                "Bond's dive professionals planned and supported India's first underwater wedding.",
              ].map((t) => (
                <li key={t} className="flex gap-4 rounded-2xl bg-mist/70 p-5 text-ink">
                  <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-teal" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              href="/get-involved?interest=csr#enquiry"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-ink"
            >
              <span className="link-underline">Explore CSR partnership</span>
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
