import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, programmesIn, type CategoryId } from "@/data/programmes";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** Visual identity per depth zone — light at the tideline, darkest in the blue. */
export const zoneStyle: Record<CategoryId, { card: string; text: string; sub: string; chip: string; accent: string }> = {
  shore: {
    card: "bg-depth-shore",
    text: "text-ink",
    sub: "text-ink-soft",
    chip: "bg-ink/5 text-ink ring-ink/10",
    accent: "text-teal-ink",
  },
  surface: {
    card: "bg-depth-surface",
    text: "text-ink",
    sub: "text-ink/70",
    chip: "bg-white/50 text-ink ring-ink/10",
    accent: "text-teal-ink",
  },
  reef: {
    card: "bg-depth-reef",
    text: "text-white",
    sub: "text-seafoam/85",
    chip: "bg-white/10 text-white ring-white/15",
    accent: "text-seafoam",
  },
  blue: {
    card: "bg-depth-blue",
    text: "text-white",
    sub: "text-seafoam/75",
    chip: "bg-white/5 text-white ring-white/10",
    accent: "text-aqua",
  },
};

export function ProgrammesPreview() {
  return (
    <section
      aria-labelledby="zones-title"
      className="relative bg-[linear-gradient(180deg,var(--color-mist)_0%,#e6f4f1_35%,#cfeae5_60%,var(--color-mist)_100%)] py-24 md:py-36"
    >
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Four depths"
              title={<span id="zones-title">Where the work happens.</span>}
              intro="Our programmes are organised by depth — from the tideline, to the surface, down to the reef and out into the wider blue economy."
            />
            {/* Depth legend */}
            <Reveal delay={0.2} className="mt-10 hidden lg:block">
              <ol className="relative space-y-6 border-l border-teal/25 pl-6">
                {categories.map((c) => (
                  <li key={c.id} className="relative">
                    <span aria-hidden className="absolute -left-[29px] top-1.5 size-2.5 rounded-full border-2 border-teal bg-mist" />
                    <a href={`#zone-${c.id}`} className="group block">
                      <span className="font-display font-bold text-ink transition-colors group-hover:text-teal">{c.name}</span>
                      <span className="block text-sm text-ink-soft">{c.depth}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>

        <ol className="space-y-6 lg:col-span-8">
          {categories.map((c) => {
            const z = zoneStyle[c.id];
            const list = programmesIn(c.id);
            return (
              <Reveal as="li" key={c.id} amount={0.2}>
                <article
                  id={`zone-${c.id}`}
                  className={cn(
                    "group relative grid scroll-mt-28 overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-40px_rgb(6_31_43/0.5)] md:grid-cols-[1fr_1.1fr]",
                    z.card,
                  )}
                >
                  <div className="relative min-h-60 overflow-hidden md:min-h-full">
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-tide)] group-hover:scale-110"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/60 via-transparent to-transparent" />
                    <span className="absolute bottom-5 left-5 font-display text-7xl font-extrabold leading-none text-white/90 md:text-8xl">
                      0{c.index}
                    </span>
                  </div>

                  <div className={cn("flex flex-col p-7 md:p-10", z.text)}>
                    <p className={cn("eyebrow", z.accent)}>{c.depth}</p>
                    <h3 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
                      {c.id === "blue" ? "Blue" : c.name}
                    </h3>
                    {c.id === "blue" && <p className={cn("mt-1 font-semibold", z.sub)}>Climate &amp; blue economy</p>}
                    <p className={cn("mt-4 leading-relaxed", z.sub)}>{c.summary}</p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {list.map((p) => (
                        <li key={p.number} className={cn("rounded-full px-3 py-1.5 text-xs font-medium ring-1", z.chip)}>
                          <span className="mr-1.5 tabular-nums opacity-60">{p.number}</span>
                          {p.title}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/programmes?category=${c.id}`}
                      className="mt-8 inline-flex items-center gap-2 self-start font-semibold after:absolute after:inset-0 after:content-['']"
                    >
                      <span className="link-underline">
                        Explore {c.id === "blue" ? "Climate & Blue Economy" : c.name} programmes
                      </span>
                      <span className="sr-only"> ({list.length})</span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
