"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories, programmes, programmesIn, type CategoryId } from "@/data/programmes";
import { worldTheme } from "@/components/sections/OceanWorlds";
import { ProgrammeFilters, type FilterOption } from "./ProgrammeFilters";
import { ProgrammePanel } from "./ProgrammePanel";
import { cn } from "@/lib/utils";
import { scrollToY } from "@/lib/smoothScroll";

type Filter = "all" | CategoryId;
const isFilter = (v: string): v is Filter => v === "all" || categories.some((c) => c.id === v);

/**
 * The full programme directory as a descent through four "world" bands.
 * Filtering shows one world at a time; "All" shows every programme.
 */
export function ProgrammeDirectory({ initialFilter = "all" }: { initialFilter?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [highlight, setHighlight] = useState<string | null>(null);
  const top = useRef<HTMLDivElement>(null);

  const visible = filter === "all" ? categories : categories.filter((c) => c.id === filter);
  const shown = filter === "all" ? programmes.length : programmesIn(filter).length;

  const options: FilterOption[] = [
    { id: "all", label: "All", count: programmes.length },
    ...categories.map((c) => ({ id: c.id, label: c.filterLabel, count: programmesIn(c.id).length, hint: c.depth })),
  ];

  const change = (id: string) => {
    if (!isFilter(id) || id === filter) return;
    setFilter(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", id);
    url.hash = "";
    window.history.replaceState(null, "", url);
    const y = (top.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 16;
    if (window.scrollY > y) scrollToY(y);
  };

  // Deep links: /programmes#programme-NN
  useEffect(() => {
    const m = window.location.hash.match(/^#programme-(\d{2})$/);
    if (!m) return;
    const target = programmes.find((p) => p.number === m[1]);
    if (!target) return;
    if (filter !== "all" && target.category !== filter) setFilter("all");
    setHighlight(target.number);
    const t1 = window.setTimeout(() => document.getElementById(`programme-${target.number}`)?.scrollIntoView({ block: "start" }), 120);
    const t2 = window.setTimeout(() => setHighlight(null), 3000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={top}>
      <div className="sticky top-3 z-30 px-3 sm:px-5">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-3 rounded-[1.75rem] bg-white/70 p-2 shadow-[0_20px_50px_-30px_rgb(3_21_29/0.5)] ring-1 ring-ink/5 backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:rounded-full">
          <ProgrammeFilters options={options} value={filter} onChange={change} />
          <p className="px-4 pb-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-soft md:pb-0" aria-live="polite">
            Showing <strong className="font-semibold text-ink">{shown}</strong> of {programmes.length} programmes
          </p>
        </div>
      </div>

      <div className="-mt-[4.5rem]">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((c) => {
            const t = worldTheme[c.id];
            const list = programmesIn(c.id);
            return (
              <motion.section
                key={c.id}
                layout="position"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40, transition: { duration: 0.25 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                aria-labelledby={`band-${c.id}`}
                className={cn("relative overflow-clip pb-24 pt-32 md:pb-32 md:pt-32", t.bg, t.text)}
              >
                <span
                  aria-hidden
                  className={cn(
                    "text-outline pointer-events-none absolute -right-[3vw] top-20 select-none font-display text-[30vw] font-extrabold leading-none tracking-[-0.06em]",
                    t.dark ? "text-white/[0.07]" : "text-ink/[0.05]",
                  )}
                >
                  0{c.index}
                </span>
                <div className="container-x relative grid gap-12 lg:grid-cols-12">
                  <header className="lg:col-span-4">
                    <div className="lg:sticky lg:top-32">
                      <p className={cn("eyebrow", t.accent)}>
                        World 0{c.index} / 04 · {c.depth}
                      </p>
                      <h2 id={`band-${c.id}`} className="display-xl mt-4">
                        {c.id === "blue" ? "Blue" : c.name}
                      </h2>
                      {c.id === "blue" && <p className={cn("mt-2 font-display text-xl font-semibold", t.sub)}>Climate &amp; Blue Economy</p>}
                      <p className={cn("mt-5 max-w-xs text-lg leading-relaxed", t.sub)}>{c.summary}</p>
                      <div className="mt-8 flex items-center gap-4">
                        <div className={cn("relative size-20 overflow-hidden rounded-full ring-4", t.dark ? "ring-white/10" : "ring-white")}>
                          <Image src={c.image} alt="" fill sizes="80px" className="object-cover" />
                        </div>
                        <p className={cn("font-mono text-xs uppercase tracking-[0.16em]", t.sub)}>
                          {list.length} programmes
                          <br />
                          in this world
                        </p>
                      </div>
                    </div>
                  </header>
                  <div className="space-y-5 lg:col-span-8">
                    {list.map((p, i) => (
                      <ProgrammePanel key={p.number} p={p} flip={i % 2 === 1} dark={t.dark} highlight={highlight === p.number} />
                    ))}
                  </div>
                </div>
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
