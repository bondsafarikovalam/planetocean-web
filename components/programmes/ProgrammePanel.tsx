import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryById, type Programme } from "@/data/programmes";
import { MaskReveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

/** Split image/content programme panel used in the directory. Shows the complete original content. */
export function ProgrammePanel({ p, flip, dark, highlight }: { p: Programme; flip?: boolean; dark?: boolean; highlight?: boolean }) {
  const cat = categoryById[p.category];
  return (
    <article
      id={`programme-${p.number}`}
      aria-labelledby={`programme-${p.number}-title`}
      className={cn(
        "group relative grid scroll-mt-40 gap-6 overflow-hidden rounded-[2rem] p-3 transition-shadow duration-700 sm:p-4 md:grid-cols-12 md:gap-8",
        dark ? "bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-md" : "bg-white/80 shadow-[0_30px_70px_-45px_rgb(3_21_29/0.45)] ring-1 ring-ink/5",
        highlight && "ring-4 ring-cyan",
      )}
    >
      <MaskReveal from={flip ? "right" : "left"} className={cn("relative aspect-[16/11] rounded-[1.5rem] md:col-span-5 md:aspect-auto md:min-h-[20rem]", flip && "md:order-2")}>
        <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1280px) 26vw, (min-width: 768px) 38vw, 100vw" className="object-cover transition-transform duration-[1.6s] ease-tide group-hover:scale-110" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-transparent" />
        <span aria-hidden className="absolute bottom-2 left-5 font-display text-[5.5rem] font-extrabold leading-none tracking-[-0.06em] text-white">
          {p.number}
        </span>
        {p.inDevelopment && (
          <span className="absolute left-4 top-4 rounded-full bg-[#ffd36e] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-abyss">In development</span>
        )}
      </MaskReveal>

      <div className={cn("flex flex-col px-3 pb-4 md:col-span-7 md:px-2 md:py-6", flip && "md:order-1 md:pl-6")}>
        <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.16em]", dark ? "text-biolum/80" : "text-ocean-ink")}>
          <span>
            <span className="sr-only">Programme number </span>No. {p.number}
          </span>
          <span aria-hidden className={cn("h-px w-6", dark ? "bg-white/30" : "bg-ink/20")} />
          <span>{cat.filterLabel}</span>
          <span aria-hidden>·</span>
          <span>{cat.depth}</span>
        </p>
        <h3 id={`programme-${p.number}-title`} className={cn("mt-3 font-display text-[1.75rem] font-extrabold leading-[1.05] tracking-tight md:text-[2.25rem]", dark ? "text-white" : "text-ink")}>
          {p.title}
        </h3>
        <p className={cn("mt-4 max-w-2xl text-[1.05rem] leading-relaxed", dark ? "text-white/78" : "text-ink-soft")}>{p.description}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-7">
          <ul className="flex flex-wrap gap-2" aria-label="Tags">
            {p.tags.map((t) => (
              <li key={t} className={cn("rounded-full px-3 py-1 text-xs font-medium ring-1", dark ? "bg-white/10 text-white ring-white/15" : "bg-softmist text-ink ring-ink/5")}>
                {t}
              </li>
            ))}
          </ul>
          <Link
            href={`/get-involved?interest=${p.number}#enquiry`}
            className={cn(
              "group/l inline-flex items-center gap-2 rounded-full py-1.5 pl-4 pr-1.5 text-sm font-semibold transition-colors",
              dark ? "bg-white text-abyss hover:bg-cyan" : "bg-abyss text-white hover:bg-ocean",
            )}
            aria-label={`Enquire about programme ${p.number}: ${p.title}`}
          >
            Enquire
            <span className={cn("inline-flex size-7 items-center justify-center rounded-full transition-transform duration-500 group-hover/l:rotate-45", dark ? "bg-abyss text-cyan" : "bg-cyan text-abyss")}>
              <ArrowUpRight className="size-3.5" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
