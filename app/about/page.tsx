import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { AboutStrands, type Strand } from "@/components/sections/AboutStrands";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ScrollWords, TextReveal } from "@/components/animations/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { categories, programmes, programmesIn } from "@/data/programmes";
import { operatingWaters } from "@/data/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Planet Ocean Foundation is the conservation and social-impact arm of the Bond Group of Companies, working from Kovalam across the waters of Kovalam, Alappuzha and Lakshadweep.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | Planet Ocean Foundation", images: ["/images/about-hero.jpg"] },
};

/** Each strand of work, described only with supplied programme content. */
const strands: Strand[] = [
  {
    id: "shore",
    title: "Shoreline activities",
    body: "Regular beach clean-ups bring together volunteers, students, fishing communities and Bond staff. Waste is sorted and logged so we can track what washes up and where it comes from. We also support beaches working towards Blue Flag — through environmental education, clean-ups and water-safety readiness.",
    refs: ["01", "11"],
    image: "/images/prog-01-beach-cleanup.jpg",
    alt: "Volunteers collecting litter on a beach",
  },
  {
    id: "reef",
    title: "Underwater conservation",
    body: "Certified divers remove plastic, fishing gear and debris from reefs and the seabed, and our dive teams locate, cut free and recover ghost nets. Habitat protection and marine-life observation take place across Kovalam and Lakshadweep, under PADI AWARE, Shark Guardian and Green Fins standards and programmes.",
    refs: ["02", "03", "04", "13", "14", "15"],
    image: "/images/about-turtle.jpg",
    alt: "Green sea turtle swimming in open blue water",
  },
  {
    id: "surface",
    title: "Ocean education & life at the surface",
    body: "Ocean literacy sessions for schools, colleges and coastal communities are delivered in Malayalam and English. Ocean Ambassadors lead conservation in their own schools, villages and dive groups, and Malayalam podcasts carry the conversation to fishermen, families and students. At the surface, Blue Boat Certification sets standards for responsible boat operations, and a safer alternative to the thermocol ponthuvallam rafts used by fishermen is in development.",
    refs: ["05", "06", "10", "12", "16"],
    image: "/images/prog-05-ocean-literacy.jpg",
    alt: "Students listening to a teacher in a classroom",
  },
  {
    id: "blue",
    title: "Climate & blue economy",
    body: "Bond IMTA RAS grows fish, shellfish and seaweed together in a recirculating system. Carbon Neutral World measures, reduces and offsets emissions — starting with our own operations — and we have developed carbon-neutral strategies for the Diocese of Alleppey.",
    refs: ["07", "08", "09"],
    image: "/images/prog-07-imta-ras.jpg",
    alt: "School of silver fish in blue water",
  },
];

const waterImages: Record<string, { src: string; alt: string }> = {
  Kovalam: { src: "/images/about-coast.jpg", alt: "Waves on a rocky tropical coastline" },
  Alappuzha: { src: "/images/prog-09-alleppey.jpg", alt: "Houseboat on a palm-fringed backwater" },
  Lakshadweep: { src: "/images/prog-04-conservation.jpg", alt: "Sea turtle beneath the ocean surface" },
};

const depthBand: Record<string, string> = {
  shore: "bg-[linear-gradient(90deg,#f5fafa,#ffe9e2)] text-ink",
  surface: "bg-[linear-gradient(90deg,#e4fbf9,#9fe9e6)] text-ink",
  reef: "bg-[linear-gradient(90deg,#0878e8,#0757a8)] text-white",
  blue: "bg-[linear-gradient(90deg,#062c40,#2b2580)] text-white",
};

const bondPoints = [
  "Bond staff join our beach clean-ups alongside volunteers, students and fishing communities.",
  "Conservation dives across Kovalam and Lakshadweep are carried out with Bond's dive teams and local communities.",
  "Bond's own teams follow Green Fins environmental standards for dive and snorkel operations.",
  "Carbon Neutral World starts with our own operations before extending to institutions and communities.",
  "Bond's dive professionals planned and supported India's first underwater wedding.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="A"
        eyebrow="About the Foundation"
        title="Our sea, our responsibility."
        accent={["responsibility."]}
        ghost="Our sea"
        intro={
          <>
            <span lang="ml" className="mb-4 block text-2xl text-biolum">
              {site.taglineMl}
            </span>
            Planet Ocean Foundation is the conservation and social-impact arm of the Bond Group of Companies.
          </>
        }
        image="/images/about-hero.jpg"
        tint="ocean"
      />

      <section aria-labelledby="mission-title" className="relative overflow-hidden bg-pearl py-24 md:py-36">
        <div aria-hidden className="absolute -left-40 top-20 size-[36rem] rounded-full bg-cyan/15 orb-soft" />
        <div className="container-x relative">
          <div className="flex items-center justify-between border-b border-ink/10 pb-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft">
            <span>01 — Mission &amp; purpose</span>
            <span className="hidden sm:inline">{site.descriptor}</span>
          </div>
          <TextReveal id="mission-title" text="From the beach line to the blue beyond." className="display-xl mt-14 max-w-5xl text-ink" accent={["blue", "beyond."]} accentClassName="text-gradient-ocean" />
          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <ScrollWords
              className="font-display text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[2.1rem] lg:col-span-8"
              dim="text-ink/15"
              text="Planet Ocean Foundation is the conservation and social-impact arm of the Bond Group of Companies. We clean beaches and reefs, pull ghost nets off the seabed, teach ocean literacy in Malayalam and English, and help communities and institutions move towards carbon neutrality."
            />
            <Reveal className="text-lg leading-relaxed text-ink-soft lg:col-span-4 lg:pt-3">
              <p>
                Our base is Kovalam, Thiruvananthapuram. Our work reaches across Kerala&apos;s coastal regions and the waters of Kovalam, Alappuzha and Lakshadweep — through{" "}
                {programmes.length} active programmes.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="bg-abyss py-24 text-white md:py-36">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-cyan">02 — Our conservation approach</p>
              <TextReveal id="approach-title" text="We organise the work by depth." className="display-lg mt-5" accent={["depth."]} />
            </div>
            <Reveal className="text-lg leading-relaxed text-white/70 lg:col-span-5">
              <p>Every programme sits in one of four zones — so it is always clear where the work happens and who it reaches.</p>
            </Reveal>
          </div>
          <RevealGroup as="ol" className="mt-14 overflow-hidden rounded-[2.5rem]">
            {categories.map((c) => (
              <RevealItem
                as="li"
                key={c.id}
                className={cn(
                  "group grid grid-cols-[3.5rem_1fr] items-center gap-x-4 gap-y-2 px-6 py-8 transition-[padding] duration-700 ease-tide hover:py-12 md:grid-cols-[5rem_1.2fr_1fr_1.4fr_8rem] md:px-10",
                  depthBand[c.id],
                )}
              >
                <span className="font-mono text-sm opacity-60">0{c.index}</span>
                <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{c.filterLabel}</h3>
                <p className="col-start-2 font-mono text-xs uppercase tracking-[0.16em] opacity-70 md:col-start-auto">{c.depth}</p>
                <p className="col-start-2 opacity-80 md:col-start-auto">{c.summary}</p>
                <p className="col-start-2 font-mono text-xs uppercase tracking-[0.16em] opacity-60 md:col-start-auto md:text-right">{programmesIn(c.id).length} programmes</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-label="What we do" className="bg-softmist py-24 md:py-32">
        <div className="container-x">
          <p className="eyebrow mb-12 text-ocean-ink">03 — What we do</p>
          <AboutStrands strands={strands} />
        </div>
      </section>

      <section aria-labelledby="waters-title" className="grain relative overflow-hidden bg-atlantic py-24 text-white md:py-36">
        <div aria-hidden className="absolute -right-40 -top-40 size-[40rem] animate-orb rounded-full bg-violet/35 orb-soft" />
        <div className="container-x relative">
          <p className="eyebrow text-cyan">04 — Where we work</p>
          <TextReveal id="waters-title" text="Kovalam · Alappuzha · Lakshadweep" className="display-lg mt-5" />
          <Reveal className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            <p>Based in Kovalam, Thiruvananthapuram, our teams work across Kerala&apos;s coastal regions and surrounding waters.</p>
          </Reveal>
          <ul className="mt-14 border-t border-white/15">
            {operatingWaters.map((w, i) => (
              <li key={w.name} className="group relative overflow-hidden border-b border-white/15">
                <div className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-tide group-hover:scale-y-100">
                  <Image src={waterImages[w.name].src} alt="" fill sizes="100vw" className="object-cover opacity-60" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-abyss/90 to-abyss/30" />
                </div>
                <div className="relative grid grid-cols-[2.5rem_1fr] items-center gap-4 py-8 md:grid-cols-[4rem_1fr_auto] md:py-10">
                  <span className="font-mono text-sm text-cyan">0{i + 1}</span>
                  <h3 className="font-display text-5xl font-extrabold tracking-[-0.04em] transition-transform duration-700 ease-tide group-hover:translate-x-4 md:text-8xl">{w.name}</h3>
                  <p className="col-start-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-white/65 md:col-start-auto">
                    <MapPin className="size-4 text-coral" aria-hidden /> {w.region} · {w.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="bond-title" className="relative overflow-hidden bg-pearl py-24 md:py-36">
        <div aria-hidden className="absolute -bottom-40 -right-40 size-[36rem] rounded-full bg-coral/15 orb-soft" />
        <div className="container-x relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-ocean-ink">05 — Bond Group of Companies</p>
            <TextReveal id="bond-title" text="The CSR wing of Bond Group." className="display-lg mt-5 text-ink" accent={["Bond", "Group."]} accentClassName="text-gradient-ocean" />
            <Reveal className="mt-8 text-lg leading-relaxed text-ink-soft">
              <p>Planet Ocean Foundation is the CSR wing of the Bond Group of Companies. Bond&apos;s people are part of the work itself:</p>
            </Reveal>
            <Reveal className="mt-10">
              <ButtonLink href="/get-involved?interest=csr#enquiry" variant="dark">
                Explore CSR partnership
              </ButtonLink>
            </Reveal>
          </div>
          <RevealGroup as="ol" className="space-y-3 lg:col-span-7">
            {bondPoints.map((t, i) => (
              <RevealItem
                as="li"
                key={t}
                className="group flex gap-6 rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgb(3_21_29/0.5)] md:p-7"
              >
                <span className="text-gradient-ocean font-display text-3xl font-extrabold leading-none">0{i + 1}</span>
                <span className="text-lg leading-relaxed text-ink">{t}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
