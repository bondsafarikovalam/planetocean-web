import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatNewsDate, newsIntro, newsItems, newsKindLabel, newsKinds } from "@/data/news";
import { landmarkEvents } from "@/data/events";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { NewsFeed, kindChip } from "@/components/news/NewsFeed";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ScrollWords, TextReveal } from "@/components/animations/TextReveal";
import { Tilt } from "@/components/animations/Interactive";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
  description: newsIntro,
  alternates: { canonical: "/news" },
  openGraph: { title: "News | Planet Ocean Foundation", images: ["/images/hero-underwater-light.jpg"] },
};

export default function NewsPage() {
  const [lead, ...others] = newsItems;
  const secondary = others.slice(0, 2);

  return (
    <>
      <PageHero
        index="N"
        eyebrow="Newsroom"
        title="News from the foundation."
        accent={["foundation."]}
        ghost="News"
        image="/images/hero-underwater-light.jpg"
        next="abyss"
        tint="ocean"
      >
        <ol className="mt-12 grid max-w-4xl grid-cols-2 gap-2 md:grid-cols-4">
          {newsKinds.map((k, i) => (
            <li key={k.id} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10 backdrop-blur-md">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cyan">0{i + 1}</p>
              <p className="mt-2 font-display text-lg font-bold leading-tight">{k.label}</p>
              <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
                {newsItems.filter((n) => n.kind === k.id).length} updates
              </p>
            </li>
          ))}
        </ol>
      </PageHero>

      <section aria-label="About the newsroom" className="relative overflow-hidden bg-abyss pb-20 pt-10 text-white md:pb-24">
        <div aria-hidden className="absolute -right-40 top-0 size-[40rem] animate-orb rounded-full bg-ocean/25 orb-soft" />

        {/* headline ticker */}
        <div aria-hidden className="relative overflow-hidden border-y border-white/10 py-4">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-white/60">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-10">
                {newsItems.map((n) => (
                  <span key={n.id + k} className="flex items-center gap-10">
                    <span>
                      <span className="text-cyan">{formatNewsDate(n.date)}</span> — {n.title}
                    </span>
                    <span className="size-1.5 rounded-full bg-coral" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="container-x relative mt-16 grid gap-12 md:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow text-cyan">{newsItems.length} updates</p>
            <p className="mt-6 font-mono text-xs uppercase leading-loose tracking-[0.16em] text-white/55">
              {newsKinds.map((k) => k.label).join(" · ")}
            </p>
          </Reveal>
          <ScrollWords text={newsIntro} dim="text-white/15" className="font-display text-3xl font-bold leading-[1.15] tracking-tight md:text-5xl lg:col-span-9" />
        </div>
      </section>

      <section aria-labelledby="latest-title" className="relative overflow-hidden bg-pearl py-20 md:py-28">
        <div aria-hidden className="absolute -left-40 top-20 size-[36rem] rounded-full bg-cyan/15 orb-soft" />
        <div className="container-x relative">
          <div className="flex items-center justify-between border-b border-ink/10 pb-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft">
            <span>01 — Latest</span>
            <span className="hidden sm:inline">Updated {formatNewsDate(lead.date)}</span>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <article className="group relative lg:col-span-7">
              <Tilt className="rounded-[2.5rem]">
                <MaskReveal className="relative aspect-[4/3] rounded-[2.5rem] bg-atlantic">
                  <Image
                    src={lead.image}
                    alt={lead.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition-transform duration-[1.6s] ease-tide group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-abyss/10 to-transparent" />
                  <span className={cn("absolute left-5 top-5 rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]", kindChip[lead.kind])}>
                    {newsKindLabel[lead.kind]}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-10">
                    <time dateTime={lead.date} className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan">
                      {formatNewsDate(lead.date)}
                    </time>
                    <h2 id="latest-title" className="display-lg mt-3 max-w-xl">
                      <Link href={lead.href} className="after:absolute after:inset-0 after:content-['']">
                        {lead.title}
                      </Link>
                    </h2>
                    <p className="mt-4 hidden max-w-lg leading-relaxed text-white/75 md:block">{lead.summary}</p>
                  </div>
                  <span
                    aria-hidden
                    className="absolute right-5 top-5 inline-flex size-12 scale-75 items-center justify-center rounded-full bg-cyan text-abyss opacity-0 transition-all duration-500 ease-tide group-hover:scale-100 group-hover:opacity-100"
                  >
                    <ArrowUpRight className="size-5" />
                  </span>
                </MaskReveal>
              </Tilt>
            </article>

            <RevealGroup className="flex flex-col gap-8 lg:col-span-5">
              {secondary.map((n, i) => (
                <RevealItem key={n.id} className={cn("group relative", i > 0 && "border-t border-ink/10 pt-8")}>
                  <article className="grid grid-cols-[7rem_1fr] gap-5 sm:grid-cols-[9rem_1fr]">
                    <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-atlantic">
                      <Image src={n.image} alt={n.imageAlt} fill sizes="144px" className="object-cover transition-transform duration-[1.6s] ease-tide group-hover:scale-110" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={cn("rounded-full px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em]", kindChip[n.kind])}>{newsKindLabel[n.kind]}</span>
                        <time dateTime={n.date} className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink-soft">
                          {formatNewsDate(n.date)}
                        </time>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-bold leading-tight tracking-tight text-ink transition-colors duration-500 group-hover:text-ocean-ink md:text-2xl">
                        <Link href={n.href} className="after:absolute after:inset-0 after:content-['']">
                          {n.title}
                        </Link>
                      </h3>
                      <p className="mt-2 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-soft">{n.summary}</p>
                    </div>
                  </article>
                </RevealItem>
              ))}
              <RevealItem className="border-t border-ink/10 pt-8">
                <ButtonLink href={lead.href} variant="dark" magnetic>
                  {lead.cta}
                </ButtonLink>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      <section aria-labelledby="feed-title" className="bg-softmist py-20 md:py-28">
        <div className="container-x">
          <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-ocean-ink">02 — All updates</p>
              <TextReveal id="feed-title" text="Every update, month by month." accent={["month", "by", "month."]} accentClassName="text-gradient-ocean" className="display-lg mt-5 text-ink" />
            </div>
            <Reveal className="text-lg leading-relaxed text-ink-soft lg:col-span-5">
              <p>Filter by announcements, programme updates, stories from the journal — or ways to join the work.</p>
            </Reveal>
          </div>
          <NewsFeed items={newsItems} />
        </div>
      </section>

      <section aria-labelledby="archive-title" className="grain relative overflow-hidden bg-abyss py-20 text-white md:py-28">
        <div aria-hidden className="absolute -left-40 -top-40 size-[40rem] animate-orb rounded-full bg-violet/30 orb-soft" />
        <div className="container-x relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-cyan">03 — From the archive</p>
              <TextReveal id="archive-title" text="The firsts that made headlines." accent={["made", "headlines."]} className="display-lg mt-5" />
            </div>
            <Reveal className="lg:col-span-5 lg:text-right">
              <ButtonLink href="/events" variant="ghost-light" magnetic>
                All landmark events
              </ButtonLink>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {landmarkEvents.map((e) => (
              <RevealItem key={e.id}>
                <article className="group relative">
                  <Tilt className="rounded-[2rem]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-atlantic">
                      <Image src={e.image} alt={e.imageAlt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.6s] ease-tide group-hover:scale-110" />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-abyss/0 to-abyss/10" />
                      <span className="absolute left-4 top-4 rounded-full bg-[#ffd36e] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-abyss">{e.label}</span>
                      <span
                        aria-hidden
                        className="absolute bottom-5 right-5 inline-flex size-12 scale-75 items-center justify-center rounded-full bg-cyan text-abyss opacity-0 transition-all duration-500 ease-tide group-hover:scale-100 group-hover:opacity-100"
                      >
                        <ArrowUpRight className="size-5" />
                      </span>
                    </div>
                  </Tilt>
                  <h3 className="mt-6 font-display text-2xl font-bold leading-tight tracking-tight md:text-[1.6rem]">
                    <Link href={`/events#${e.id}`} className="after:absolute after:inset-0 after:content-['']">
                      {e.title}
                    </Link>
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/65">{e.description}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="tech-grid mt-20 flex flex-col gap-6 rounded-[2rem] bg-white/[0.04] p-7 ring-1 ring-white/10 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="eyebrow text-cyan">Media enquiries</p>
              <p className="mt-3 max-w-xl font-display text-2xl font-bold leading-snug tracking-tight md:text-3xl">Writing about ocean conservation in Kerala? Talk to our team.</p>
            </div>
            <ButtonLink href="/contact" magnetic className="shrink-0">
              Contact the team
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <FinalCTA title="Have news from the water? Start a conversation." cta="Start a Conversation" />
    </>
  );
}
