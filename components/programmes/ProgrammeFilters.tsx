"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  label: string;
  count: number;
  hint?: string;
}

/** Category filter with an animated active indicator. */
export function ProgrammeFilters({ options, value, onChange }: { options: FilterOption[]; value: string; onChange: (id: string) => void }) {
  return (
    <div
      role="group"
      aria-label="Filter programmes by category"
      className="scrollbar-none -mx-5 flex gap-1.5 overflow-x-auto px-5 sm:mx-0 sm:inline-flex sm:flex-wrap sm:rounded-full sm:bg-white sm:p-1.5 sm:shadow-[0_10px_40px_-20px_rgb(6_31_43/0.35)] sm:ring-1 sm:ring-ink/5"
    >
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            title={o.hint}
            className={cn(
              "relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-300",
              active ? "text-white" : "bg-white text-ink ring-1 ring-ink/10 hover:text-teal sm:bg-transparent sm:ring-0",
            )}
          >
            {active && (
              <motion.span layoutId="programme-filter" className="absolute inset-0 -z-0 rounded-full bg-abyss" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
            )}
            <span className="relative">{o.label}</span>
            <span className={cn("relative rounded-full px-1.5 py-0.5 text-[0.7rem] tabular-nums", active ? "bg-aqua text-abyss" : "bg-ink/5 text-ink-soft")}>{o.count}</span>
          </button>
        );
      })}
    </div>
  );
}
