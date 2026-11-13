import type { Metadata } from "next";
import Image from "next/image";
import { Clock } from "lucide-react";
import { blogIntro, blogPosts, formatDate, topicLabel } from "@/data/blog";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BlogDirectory } from "@/components/blog/BlogDirectory";
import { topicChip } from "@/components/blog/BlogCard";
import { MaskReveal, Reveal } from "@/components/animations/Reveal";
import { ScrollWords, TextReveal } from "@/components/animations/TextReveal";
import { Tilt } from "@/components/animations/Interactive";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: blogIntro,
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog | Planet Ocean Foundation", images: ["/images/intro-reef-fish.jpg"] },
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted.find((p) => p.featured) ?? sorted[0];
  const rest = sorted.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <PageHero
        index="J"
        eyebrow="Blog"
        title="Notes from the water."
        accent={["water."]}
        ghost="Journal"
        image="/images/intro-reef-fish.jpg"
        next="abyss"
        tint="violet"
      />

      <section aria-label="About the journal" className="relative overflow-hidden bg-abyss py-20 text-white md:py-24">
        <div aria-hidden className="absolute -right-40 top-0 size-[40rem] animate-orb rounded-full bg-ocean/25 orb-soft" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow text-cyan">{blogPosts.length} stories</p>
            <p className="mt-6 font-mono text-xs uppercase leading-loose tracking-[0.16em] text-white/55">
              Shore · Surface · Reef · Blue · Events
            </p>
          </Reveal>
          <ScrollWords text={blogIntro} dim="text-white/15" className="font-display text-3xl font-bold leading-[1.15] tracking-tight md:text-5xl lg:col-span-9" />
        </div>
      </section>

      <section aria-labelledby="featured-title" className="relative overflow-hidden bg-pearl py-20 md:py-28">
        <div aria-hidden className="absolute -left-40 top-20 size-[36rem] rounded-full bg-cyan/15 orb-soft" />
        <div className="container-x relative">
          <div className="flex items-center justify-between border-b border-ink/10 pb-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft">
            <span>01 — Featured story</span>
            <span className="hidden sm:inline">{topicLabel[featured.topic]}</span>
          </div>

          <article className="group relative mt-14 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Tilt className="rounded-[2.5rem] lg:col-span-7">
              <MaskReveal className="relative aspect-[4/3] rounded-[2.5rem] bg-atlantic lg:aspect-[5/4]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-[1.6s] ease-tide group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/60 via-transparent to-transparent" />
              </MaskReveal>
            </Tilt>
            <div className="lg:col-span-5">
              <Reveal className="flex flex-wrap items-center gap-3">
                <span className={cn("rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]", topicChip[featured.topic])}>{topicLabel[featured.topic]}</span>
                <span className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-soft">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time> · <Clock className="size-3.5" aria-hidden /> {featured.readMinutes} min
                </span>
              </Reveal>
              <TextReveal id="featured-title" as="h2" text={featured.title} accent={featured.accent} accentClassName="text-gradient-ocean" className="display-lg mt-6 text-ink" />
              <Reveal delay={0.15} className="mt-6 text-lg leading-relaxed text-ink-soft">
                <p>{featured.excerpt}</p>
              </Reveal>
              <Reveal delay={0.25} className="mt-10">
                <ButtonLink href={`/blog/${featured.slug}`} variant="dark" magnetic>
                  Read the story
                </ButtonLink>
              </Reveal>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="stories-title" className="bg-softmist py-20 md:py-28">
        <div className="container-x">
          <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-ocean-ink">02 — All stories</p>
              <TextReveal id="stories-title" text="From the tideline to the blue beyond." accent={["blue", "beyond."]} accentClassName="text-gradient-ocean" className="display-lg mt-5 text-ink" />
            </div>
            <Reveal className="text-lg leading-relaxed text-ink-soft lg:col-span-5">
              <p>Filter by depth — or by the landmark events that took the conversation underwater.</p>
            </Reveal>
          </div>
          <BlogDirectory posts={rest} />
        </div>
      </section>

      <FinalCTA title="Have a story from the water? Start a conversation." cta="Start a Conversation" />
    </>
  );
}
