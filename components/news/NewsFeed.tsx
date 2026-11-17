"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ProgrammeFilters, type FilterOption } from "@/components/programmes/ProgrammeFilters";
import { formatMonth, formatNewsDate, newsKindLabel, newsKinds, type NewsItem, type NewsKind } from "@/data/news";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export const kindChip: Record<NewsKind, string> = {
  announcement: "bg-cyan text-abyss",
  programme: "bg-ocean text-white",
  journal: "bg-violet text-white",
  involved: "bg-coral text-abyss",
};

/** Filterable news timeline, grouped by month, in the sticky glass-bar style of the programme directory. */
export function NewsFeed({ items }: { items: NewsItem[] }) {
  const [kind, setKind] = useState("all");

  const options: FilterOption[] = useMemo(
    () => [
      { id: "all", label: "All", count: items.length },
      ...newsKinds.map((k) => ({ id: k.id, label: k.label, count: items.filter((n) => n.kind === k.id).length })).filter((o) => o.count > 0),
    ],
    [items],
  );

  const visible = kind === "all" ? items : items.filter((n) => n.kind === kind);

  const months = useMemo(() => {
    const groups: { month: string; items: NewsItem[] }[] = [];
    for (const n of visible) {
      const m = formatMonth(n.date);
      const last = groups[groups.length - 1];
      if (last?.month === m) last.items.push(n);
      else groups.push({ month: m, items: [n] });
    }
    return groups;
  }, [visible]);

  return (
    <div>
      <div className="sticky top-3 z-30">
        <div className="flex flex-col gap-3 rounded-[1.75rem] bg-white/70 p-2 shadow-[0_20px_50px_-30px_rgb(3_21_29/0.5)] ring-1 ring-ink/5 backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:rounded-full">
          <ProgrammeFilters options={options} value={kind} onChange={setKind} label="Filter news by type" layoutId="news-filter" />
          <p className="px-4 pb-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-soft md:pb-0" aria-live="polite">
            Showing <strong className="font-semibold text-ink">{visible.length}</strong> of {items.length} updates
          </p>
        </div>
      </div>

      <div className="mt-14 space-y-16">
        <AnimatePresence mode="popLayout" initial={false}>
          {months.map((g) => (
            <motion.section
              key={g.month}
              layout="position"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
              transition={{ duration: 0.7, ease: EASE }}
              aria-label={g.month}
              className="grid gap-6 lg:grid-cols-12"
            >
              <header className="lg:col-span-3">
                <div className="lg:sticky lg:top-32">
                  <p className="eyebrow text-ocean-ink">{g.month}</p>
                  <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-soft">
                    {g.items.length} {g.items.length === 1 ? "update" : "updates"}
                  </p>
                </div>
              </header>
              <ol className="relative space-y-4 lg:col-span-9">
                <span aria-hidden className="absolute bottom-6 left-[1.1rem] top-6 hidden w-px bg-gradient-to-b from-ocean/40 via-violet/30 to-transparent md:block" />
                <AnimatePresence mode="popLayout" initial={false}>
                  {g.items.map((n, i) => (
                    <motion.li
                      key={n.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                      transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
                    >
                      <NewsRow item={n} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ol>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NewsRow({ item: n }: { item: NewsItem }) {
  return (
    <article className="group relative flex gap-5 md:pl-12">
      <span aria-hidden className="absolute left-[0.8rem] top-9 hidden size-[0.6rem] rounded-full bg-pearl ring-2 ring-ocean transition-all duration-500 group-hover:bg-cyan group-hover:ring-cyan md:block" />
      <div className="flex w-full flex-col gap-5 rounded-[1.75rem] bg-white p-4 ring-1 ring-ink/5 transition-all duration-500 ease-tide group-hover:-translate-y-0.5 group-hover:shadow-[0_30px_60px_-40px_rgb(3_21_29/0.55)] sm:flex-row sm:items-center sm:p-5">
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[1.25rem] bg-atlantic sm:aspect-square sm:w-32 md:w-40">
          <Image src={n.image} alt={n.imageAlt} fill sizes="(min-width: 640px) 160px, 100vw" className="object-cover transition-transform duration-[1.6s] ease-tide group-hover:scale-110" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn("rounded-full px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em]", kindChip[n.kind])}>{newsKindLabel[n.kind]}</span>
            <time dateTime={n.date} className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-soft">
              {formatNewsDate(n.date)}
            </time>
          </div>
          <h3 className="mt-3 font-display text-xl font-bold leading-tight tracking-tight text-ink md:text-2xl">
            <Link href={n.href} className="after:absolute after:inset-0 after:content-['']">
              {n.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 leading-relaxed text-ink-soft">{n.summary}</p>
        </div>
        <span
          aria-hidden
          className="hidden size-11 shrink-0 items-center justify-center self-center rounded-full bg-softmist text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-cyan group-hover:text-abyss sm:inline-flex"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </article>
  );
}
