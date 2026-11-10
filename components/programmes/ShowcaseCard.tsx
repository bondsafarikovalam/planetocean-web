import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryById, type Programme } from "@/data/programmes";
import { Tilt } from "@/components/animations/Interactive";
import { cn } from "@/lib/utils";

const chip: Record<Programme["category"], string> = {
  shore: "bg-coral text-abyss",
  surface: "bg-biolum text-abyss",
  reef: "bg-ocean text-white",
  blue: "bg-violet text-white",
};

/** Image-led programme card with pointer tilt. Full description + tags always visible. */
export function ShowcaseCard({
  p,
  aspect = "aspect-[4/3]",
  className,
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  p: Programme;
  aspect?: string;
  className?: string;
  sizes?: string;
}) {
  const cat = categoryById[p.category];
  return (
    <article id={`showcase-${p.number}`} className={cn("group relative", className)}>
      <Tilt className="rounded-[2rem]">
        <div className={cn("relative overflow-hidden rounded-[2rem] bg-atlantic", aspect)}>
          <Image src={p.image} alt={p.imageAlt} fill sizes={sizes} className="object-cover transition-transform duration-[1.6s] ease-tide group-hover:scale-110" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-abyss/0 to-abyss/10" />
          <span aria-hidden className="absolute bottom-3 left-6 font-display text-[5.5rem] font-extrabold leading-none tracking-[-0.06em] text-white transition-transform duration-700 ease-tide group-hover:-translate-y-2 md:text-[7rem]">
            {p.number}
          </span>
          <span className={cn("absolute right-4 top-4 rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]", chip[p.category])}>
            {cat.filterLabel}
          </span>
          {p.inDevelopment && (
            <span className="absolute left-4 top-4 rounded-full bg-[#ffd36e] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-abyss">In development</span>
          )}
          <span aria-hidden className="absolute bottom-6 right-6 inline-flex size-12 scale-75 items-center justify-center rounded-full bg-cyan text-abyss opacity-0 transition-all duration-500 ease-tide group-hover:scale-100 group-hover:opacity-100">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </Tilt>
      <div className="mt-6 pr-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
          No. {p.number} · {cat.depth}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-ink md:text-[1.7rem]">
          <Link href={`/programmes#programme-${p.number}`} className="after:absolute after:inset-0 after:content-['']">
            {p.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-ink-soft">{p.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full bg-softmist px-3 py-1 text-xs font-medium text-ink ring-1 ring-ink/5">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
