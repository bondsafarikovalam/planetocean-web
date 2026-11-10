import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryById, featuredProgrammeNumbers, programmeByNumber, programmes, type Programme } from "@/data/programmes";
import { MaskReveal, Reveal } from "@/components/animations/Reveal";
import { Parallax, ParallaxFrame } from "@/components/animations/Parallax";
import { TextReveal } from "@/components/animations/TextReveal";
import { ShowcaseCard } from "@/components/programmes/ShowcaseCard";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoNote } from "@/components/ui/PhotoNote";

/** Section 05 — editorial programme showcase (mixed layouts, all linking into the full directory). */
export function FeaturedProgrammes() {
  const featured = featuredProgrammeNumbers.map((n) => programmeByNumber(n)).filter((p): p is Programme => Boolean(p));
  const [lead, a, b, split, c, d, e] = featured;

  return (
    <section aria-labelledby="featured-title" className="relative bg-pearl py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-ocean-ink">05 — Programme showcase</p>
            <TextReveal id="featured-title" text="A closer look at the work." className="display-xl mt-5 text-ink" accent={["work."]} accentClassName="text-gradient-ocean" />
          </div>
          <Reveal className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-ink-soft">
              {featured.length} of our {programmes.length} programmes, from ghost-net recovery on the seabed to aquaculture and fisher safety.
            </p>
            <ButtonLink href="/programmes" variant="ghost-dark" className="mt-6">
              View all {programmes.length} programmes
            </ButtonLink>
          </Reveal>
        </div>
      </div>

      {/* 1 — Full-width photographic panel */}
      <div className="mt-16 px-3 sm:px-5 md:mt-24">
        <article id={`showcase-${lead.number}`} className="group relative overflow-hidden rounded-[2.5rem] bg-abyss text-white">
          <MaskReveal className="relative h-[55svh] w-full md:h-[80svh] md:min-h-[36rem]">
            <ParallaxFrame src={lead.image} alt={lead.imageAlt} className="absolute inset-0" strength={0.22} />
          </MaskReveal>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-transparent" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ocean/40 to-transparent mix-blend-multiply" />
          <PhotoNote className="absolute right-6 top-6" />
          <span
            aria-hidden
            className="text-outline pointer-events-none absolute -top-[4vw] right-[3vw] select-none font-display text-[36vw] font-extrabold leading-none tracking-[-0.06em] text-biolum/25 md:text-[26vw]"
          >
            {lead.number}
          </span>
          <div className="relative -mt-24 p-4 sm:p-8 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 lg:p-16">
            <div className="max-w-2xl rounded-[2rem] bg-abyss/45 p-6 ring-1 ring-white/10 backdrop-blur-xl sm:p-8">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan">
                No. {lead.number} · {categoryById[lead.category].filterLabel} · {categoryById[lead.category].depth}
              </p>
              <h3 className="mt-3 font-display text-3xl font-extrabold leading-[1.02] tracking-tight md:text-5xl">{lead.title}</h3>
              <p className="mt-4 leading-relaxed text-white/80 md:text-lg">{lead.description}</p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <ul className="flex flex-wrap gap-2" aria-label="Tags">
                  {lead.tags.map((t) => (
                    <li key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/15">
                      {t}
                    </li>
                  ))}
                </ul>
                <Link href={`/programmes#programme-${lead.number}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan after:absolute after:inset-0 after:content-['']">
                  See in directory <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="container-x mt-20 space-y-24 md:mt-32 md:space-y-36">
        {/* 2 — Asymmetric pair */}
        <div className="grid gap-16 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <ShowcaseCard p={a} aspect="aspect-[5/4]" />
          </Reveal>
          <Parallax speed={-0.12} className="md:col-span-5 md:mt-40">
            <Reveal>
              <ShowcaseCard p={b} aspect="aspect-[4/5]" sizes="(min-width: 768px) 35vw, 100vw" />
            </Reveal>
          </Parallax>
        </div>

        {/* 3 — Horizontal editorial split */}
        <article id={`showcase-${split.number}`} className="group relative grid items-center gap-10 rounded-[2.5rem] bg-softmist p-4 sm:p-6 md:grid-cols-12 md:gap-14 md:p-8">
          <MaskReveal from="left" className="relative aspect-[16/11] rounded-[2rem] md:col-span-7">
            <Image src={split.image} alt={split.imageAlt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover transition-transform duration-[1.6s] ease-tide group-hover:scale-105" />
          </MaskReveal>
          <Reveal className="px-2 pb-4 md:col-span-5 md:px-0 md:pb-0 md:pr-6">
            <p aria-hidden className="text-gradient-ocean font-display text-8xl font-extrabold leading-none tracking-[-0.06em]">
              {split.number}
            </p>
            <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
              {categoryById[split.category].filterLabel} · {categoryById[split.category].depth}
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
              <Link href={`/programmes#programme-${split.number}`} className="after:absolute after:inset-0 after:content-['']">
                {split.title}
              </Link>
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{split.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
              {split.tags.map((t) => (
                <li key={t} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink ring-1 ring-ink/5">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </article>

        {/* 4 — Staggered trio */}
        <div className="grid gap-16 md:grid-cols-3 md:gap-8">
          <Reveal>
            <ShowcaseCard p={c} aspect="aspect-[4/5]" sizes="(min-width: 768px) 30vw, 100vw" />
          </Reveal>
          <Parallax speed={-0.1} className="md:mt-28">
            <Reveal delay={0.1}>
              <ShowcaseCard p={d} aspect="aspect-square" sizes="(min-width: 768px) 30vw, 100vw" />
            </Reveal>
          </Parallax>
          <Reveal delay={0.2} className="md:mt-12">
            <ShowcaseCard p={e} aspect="aspect-[4/5]" sizes="(min-width: 768px) 30vw, 100vw" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
