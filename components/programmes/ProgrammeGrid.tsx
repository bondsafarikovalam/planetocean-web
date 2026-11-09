"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories, categoryById, programmes, type CategoryId, type Programme } from "@/data/programmes";
import { ProgrammeCard } from "./ProgrammeCard";
import { ProgrammeFilters, type FilterOption } from "./ProgrammeFilters";
import { ProgrammeModal } from "./ProgrammeModal";
import { cn } from "@/lib/utils";

type Filter = "all" | CategoryId;

function isFilter(v: unknown): v is Filter {
  return v === "all" || categories.some((c) => c.id === v);
}

export function ProgrammeGrid({ initialFilter = "all" }: { initialFilter?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [openNumber, setOpenNumber] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? programmes : programmes.filter((p) => p.category === filter)),
    [filter],
  );

  const options: FilterOption[] = [
    { id: "all", label: "All", count: programmes.length },
    ...categories.map((c) => ({
      id: c.id,
      label: c.filterLabel,
      count: programmes.filter((p) => p.category === c.id).length,
      hint: c.depth,
    })),
  ];

  const changeFilter = (id: string) => {
    if (!isFilter(id)) return;
    setFilter(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", id);
    url.hash = "";
    window.history.replaceState(null, "", url);
  };

  // Highlight a card when arriving via /programmes#programme-NN
  useEffect(() => {
    const m = window.location.hash.match(/^#programme-(\d{2})$/);
    if (!m) return;
    const target = programmes.find((p) => p.number === m[1]);
    if (!target) return;
    if (filter !== "all" && target.category !== filter) setFilter("all");
    setHighlight(target.number);
    requestAnimationFrame(() => document.getElementById(`programme-${target.number}`)?.scrollIntoView({ block: "center" }));
    const t = window.setTimeout(() => setHighlight(null), 2600);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openIndex = openNumber ? visible.findIndex((p) => p.number === openNumber) : -1;
  const open: Programme | null = openIndex >= 0 ? visible[openIndex] : null;
  const close = useCallback(() => setOpenNumber(null), []);
  const prev = openIndex > 0 ? () => setOpenNumber(visible[openIndex - 1].number) : undefined;
  const next = openIndex >= 0 && openIndex < visible.length - 1 ? () => setOpenNumber(visible[openIndex + 1].number) : undefined;

  const activeCat = filter === "all" ? null : categoryById[filter];

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <ProgrammeFilters options={options} value={filter} onChange={changeFilter} />
        <p className="text-sm text-ink-soft" aria-live="polite">
          Showing <strong className="font-semibold text-ink">{visible.length}</strong> of {programmes.length} programmes
          {activeCat && (
            <>
              {" "}
              · <span className="text-teal-ink">{activeCat.depth}</span>
            </>
          )}
        </p>
      </div>

      <motion.ul layout className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.li
              key={p.number}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn("rounded-[1.75rem]", highlight === p.number && "ring-4 ring-aqua ring-offset-4 ring-offset-mist")}
            >
              <ProgrammeCard programme={p} onOpen={(x) => setOpenNumber(x.number)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <ProgrammeModal
        programme={open}
        onClose={close}
        onPrev={prev}
        onNext={next}
        position={open ? { index: openIndex, total: visible.length } : undefined}
      />
    </div>
  );
}
