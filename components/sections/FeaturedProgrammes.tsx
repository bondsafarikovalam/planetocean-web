import { featuredProgrammeNumbers, programmeByNumber, programmes, type Programme } from "@/data/programmes";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ProgrammeCard } from "@/components/programmes/ProgrammeCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export function FeaturedProgrammes() {
  const featured = featuredProgrammeNumbers
    .map((n) => programmeByNumber(n))
    .filter((p): p is Programme => Boolean(p));
  const [lead, ...rest] = featured;

  return (
    <section aria-labelledby="featured-title" className="bg-mist py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected programmes"
            title={<span id="featured-title">A closer look at the work.</span>}
            intro={`${featured.length} of our ${programmes.length} programmes, from ghost-net recovery on the seabed to aquaculture and fisher safety.`}
          />
          <ButtonLink href="/programmes" variant="ghost-dark" className="shrink-0 self-start md:self-auto">
            View all {programmes.length} programmes
          </ButtonLink>
        </div>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <RevealItem className="md:col-span-2 xl:col-span-3">
            <ProgrammeCard programme={lead} href={`/programmes#programme-${lead.number}`} size="large" />
          </RevealItem>
          {rest.map((p) => (
            <RevealItem key={p.number}>
              <ProgrammeCard programme={p} href={`/programmes#programme-${p.number}`} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
