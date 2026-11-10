import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProgrammeDirectory } from "@/components/programmes/ProgrammeDirectory";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { categories, programmes, programmesIn, type CategoryId } from "@/data/programmes";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "All 16 Planet Ocean Foundation programmes — shore, surface, reef, and climate & blue economy — from beach and underwater clean-ups to ghost-net removal, ocean literacy and carbon neutrality.",
  alternates: { canonical: "/programmes" },
  openGraph: { title: "Programmes | Planet Ocean Foundation", images: ["/images/programmes-hero.jpg"] },
};

type Props = { searchParams: Promise<{ category?: string | string[] }> };

export default async function ProgrammesPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const raw = Array.isArray(category) ? category[0] : category;
  const initial: "all" | CategoryId = categories.some((c) => c.id === raw) ? (raw as CategoryId) : "all";

  return (
    <>
      <PageHero
        index="P"
        eyebrow={`${programmes.length} active programmes`}
        title="Programmes, by where the work happens."
        accent={["where", "the", "work", "happens."]}
        ghost="Depth"
        intro="Our work spans the shoreline, the surface, the seabed and the wider blue economy."
        image="/images/programmes-hero.jpg"
        next="pearl"
        tint="violet"
      >
        <ol className="mt-12 grid max-w-4xl grid-cols-2 gap-2 md:grid-cols-4">
          {categories.map((c) => (
            <li key={c.id} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10 backdrop-blur-md">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cyan">0{c.index}</p>
              <p className="mt-2 font-display text-lg font-bold leading-tight">{c.filterLabel}</p>
              {c.id !== "blue" && <p className="text-xs text-white/60">{c.depth}</p>}
              <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/45">{programmesIn(c.id).length} programmes</p>
            </li>
          ))}
        </ol>
      </PageHero>

      <div className="bg-pearl pt-6">
        <ProgrammeDirectory key={initial} initialFilter={initial} />
      </div>

      <FinalCTA title="Want to support a programme?" cta="Start a Conversation" />
    </>
  );
}
