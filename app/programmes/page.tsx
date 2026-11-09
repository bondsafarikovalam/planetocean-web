import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProgrammeGrid } from "@/components/programmes/ProgrammeGrid";
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
        eyebrow={`${programmes.length} active programmes`}
        title="Programmes, by where the work happens."
        intro="Our work spans the shoreline, the surface, the seabed and the wider blue economy."
        image="/images/programmes-hero.jpg"
      >
        <ol className="mt-12 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-4">
          {categories.map((c) => (
            <li key={c.id} className="bg-abyss/50 p-4 backdrop-blur-md">
              <p className="font-display text-lg font-bold">{c.filterLabel}</p>
              {c.id !== "blue" && <p className="text-xs text-seafoam/75">{c.depth}</p>}
              <p className="mt-2 text-xs text-white/50">{programmesIn(c.id).length} programmes</p>
            </li>
          ))}
        </ol>
      </PageHero>

      <section aria-label="Programme directory" className="bg-mist pb-28 pt-10 md:pb-36">
        <div className="container-x">
          <ProgrammeGrid key={initial} initialFilter={initial} />
        </div>
      </section>

      <FinalCTA title="Want to support a programme?" cta="Start a Conversation" />
    </>
  );
}
