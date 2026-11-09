import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { categoryById, type Programme } from "@/data/programmes";
import { cn } from "@/lib/utils";
import { zoneTheme } from "./zoneTheme";

interface ProgrammeCardProps {
  programme: Programme;
  /** Opens a detail view (directory). */
  onOpen?: (p: Programme) => void;
  /** Links elsewhere instead (homepage). */
  href?: string;
  size?: "default" | "large";
  className?: string;
  priority?: boolean;
}

/** Shows number, title, complete description, tags, category and image. */
export function ProgrammeCard({ programme: p, onOpen, href, size = "default", className, priority }: ProgrammeCardProps) {
  const cat = categoryById[p.category];
  const theme = zoneTheme[p.category];
  const large = size === "large";
  const label = `Programme ${p.number}: ${p.title}`;

  return (
    <article
      id={`programme-${p.number}`}
      className={cn(
        "group relative flex h-full scroll-mt-32 flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_1px_0_rgb(12_37_48/0.06),0_20px_50px_-30px_rgb(6_31_43/0.35)] ring-1 ring-ink/5 transition-[transform,box-shadow] duration-700 ease-[var(--ease-tide)] hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-40px_rgb(6_31_43/0.55)] focus-within:-translate-y-1.5",
        large && "lg:flex-row",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", large ? "aspect-[4/3] lg:aspect-auto lg:w-[55%]" : "aspect-[16/11]")}>
        <Image
          src={p.image}
          alt={p.imageAlt}
          fill
          priority={priority}
          sizes={large ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-110"
        />
        <div aria-hidden className={cn("absolute inset-0 bg-gradient-to-t via-transparent to-transparent", theme.tint)} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-abyss/0 to-abyss/10" />

        <span
          aria-hidden
          className="absolute bottom-3 left-5 font-display text-[4.5rem] font-extrabold leading-none tracking-tighter text-white transition-transform duration-700 ease-[var(--ease-tide)] group-hover:-translate-y-1 md:text-[5.5rem]"
        >
          {p.number}
        </span>
        <span className={cn("absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", theme.chip)}>
          <span aria-hidden className={cn("size-1.5 rounded-full", p.category === "blue" ? "bg-aqua" : "bg-current opacity-60")} />
          {cat.filterLabel}
        </span>
        {p.inDevelopment && (
          <span className="absolute left-4 top-4 rounded-full bg-[#f2c66d] px-3 py-1 text-xs font-bold text-abyss">In development</span>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col p-6 md:p-7", large && "lg:p-10")}>
        <p className="text-xs font-medium tracking-wide text-ink-soft">
          <span className="sr-only">Programme number </span>
          <span className="font-semibold text-teal-ink">No. {p.number}</span>
          <span aria-hidden> · </span>
          <span className="sr-only">, </span>
          {cat.depth}
        </p>
        <h3 className={cn("mt-2 font-display font-bold leading-tight tracking-tight text-ink", large ? "text-3xl md:text-4xl" : "text-xl md:text-[1.4rem]")}>
          {p.title}
        </h3>
        <p className={cn("mt-3 leading-relaxed text-ink-soft", large ? "text-base md:text-lg" : "text-[0.95rem]")}>{p.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink ring-1 ring-ink/10">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <div className={cn("mb-5 h-px w-full origin-left scale-x-[0.15] transition-transform duration-700 ease-[var(--ease-tide)] group-hover:scale-x-100", theme.bar)} />
          {onOpen ? (
            <button
              type="button"
              onClick={() => onOpen(p)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
              aria-label={`View details — ${label}`}
              aria-haspopup="dialog"
            >
              View programme
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-90">
                <Plus className="size-3.5" aria-hidden />
              </span>
            </button>
          ) : href ? (
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink after:absolute after:inset-0 after:content-['']"
              aria-label={`See ${label} in the programmes directory`}
            >
              See in directory
              <ArrowUpRight
                className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          ) : null}
        </div>
      </div>
      {/* Visible focus ring for the stretched control */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-2 ring-aqua opacity-0 transition-opacity group-has-[:focus-visible]:opacity-100" />
    </article>
  );
}
