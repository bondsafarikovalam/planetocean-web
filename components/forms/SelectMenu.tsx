"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption = { value: string; label: string; prefix?: string };
export type SelectGroup = { label: string; dot?: string; options: SelectOption[] };

/**
 * Custom, accessible single-select (WAI-ARIA select-only combobox + listbox).
 * Trigger button opens a panel with a filter box, grouped options and keyboard support:
 * ↑/↓ move, Home/End jump, Enter selects, Esc closes, typing filters.
 */
export function SelectMenu({
  id,
  name,
  value,
  onChange,
  onBlur,
  groups,
  placeholder = "Choose one…",
  invalid,
  describedBy,
  className,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  groups: SelectGroup[];
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}) {
  const uid = useId();
  const listId = `${uid}-list`;
  const optId = (v: string) => `${uid}-opt-${v}`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const selected = useMemo(() => groups.flatMap((g) => g.options).find((o) => o.value === value), [groups, value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({ ...g, options: g.options.filter((o) => `${o.prefix ?? ""} ${o.label} ${g.label}`.toLowerCase().includes(q)) }))
      .filter((g) => g.options.length);
  }, [groups, query]);
  const flat = useMemo(() => filtered.flatMap((g) => g.options), [filtered]);

  /** `dismissed`: closed without choosing — report it as a blur so validation can run. */
  const close = (refocus = true, dismissed = true) => {
    setOpen(false);
    setQuery("");
    if (dismissed) onBlur?.();
    if (refocus) trigger.current?.focus();
  };
  const choose = (v: string) => {
    onChange(v);
    close(true, false);
  };
  const openMenu = () => {
    setActiveValue(value || groups[0]?.options[0]?.value || null);
    setOpen(true);
  };

  // Focus the filter box on open; keep the active option in view.
  useEffect(() => {
    if (open) search.current?.focus();
  }, [open]);
  useEffect(() => {
    if (!open || !activeValue) return;
    document.getElementById(optId(activeValue))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeValue]);

  // Click outside closes.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const move = (delta: number | "start" | "end") => {
    if (!flat.length) return;
    const i = flat.findIndex((o) => o.value === activeValue);
    const next =
      delta === "start" ? 0 : delta === "end" ? flat.length - 1 : i < 0 ? 0 : Math.min(flat.length - 1, Math.max(0, i + delta));
    setActiveValue(flat[next].value);
  };

  const onPanelKey = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        move(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        move(-1);
        break;
      case "Home":
        e.preventDefault();
        move("start");
        break;
      case "End":
        e.preventDefault();
        move("end");
        break;
      case "Enter":
        e.preventDefault();
        if (activeValue && flat.some((o) => o.value === activeValue)) choose(activeValue);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
    }
  };

  return (
    <div ref={root} className={cn("relative mt-2", className)}>
      <input type="hidden" name={name} value={value} />

      <button
        ref={trigger}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            e.preventDefault();
            openMenu();
          }
        }}
        className={cn(
          "group flex w-full items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left text-base transition-[border-color,box-shadow] duration-200",
          open ? "border-brand ring-4 ring-brand/10" : "border-line hover:border-ink/25",
          invalid && !open && "border-red-500/70 ring-2 ring-red-500/20",
        )}
      >
        {selected ? (
          <span className="flex min-w-0 flex-1 items-center gap-2.5 text-ink">
            {selected.prefix && (
              <span className="shrink-0 rounded-md bg-tint px-1.5 py-0.5 font-mono text-[0.7rem] font-medium text-brand">{selected.prefix}</span>
            )}
            <span className="truncate">{selected.label}</span>
          </span>
        ) : (
          <span className="flex-1 text-muted">{placeholder}</span>
        )}
        <span
          aria-hidden
          className={cn(
            "inline-flex size-7 shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-300",
            open ? "rotate-180 bg-brand text-white" : "bg-tint text-ink group-hover:bg-softmist",
          )}
        >
          <ChevronDown className="size-4" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onPanelKey}
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 origin-top overflow-hidden rounded-2xl bg-white shadow-[0_30px_70px_-20px_rgb(3_21_29/0.35)] ring-1 ring-ink/10"
          >
            {/* Filter */}
            <div className="flex items-center gap-2.5 border-b border-line px-4">
              <Search className="size-4 shrink-0 text-muted" aria-hidden />
              <input
                ref={search}
                role="combobox"
                aria-expanded
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={activeValue && flat.some((o) => o.value === activeValue) ? optId(activeValue) : undefined}
                aria-label="Filter options"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveValue(null);
                }}
                placeholder="Search programmes or ways to help…"
                className="h-12 min-w-0 flex-1 bg-transparent text-[0.95rem] text-ink placeholder:text-muted/60 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    search.current?.focus();
                  }}
                  className="inline-flex size-6 items-center justify-center rounded-full text-muted hover:bg-tint hover:text-ink"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Options */}
            <ul ref={list} id={listId} role="listbox" aria-labelledby={id} data-lenis-prevent className="max-h-[min(22rem,55vh)] overflow-y-auto overscroll-contain p-2">
              {filtered.map((g) => (
                <li key={g.label} role="presentation" className="pb-1">
                  <p
                    role="presentation"
                    className="sticky top-0 z-10 flex items-center gap-2 bg-white/95 px-3 pb-1.5 pt-3 font-mono text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted"
                  >
                    {g.dot && <span className={cn("size-1.5 rounded-full", g.dot)} />}
                    {g.label}
                  </p>
                  <ul role="group" aria-label={g.label}>
                    {g.options.map((o) => {
                      const isSel = o.value === value;
                      const isActive = o.value === activeValue;
                      return (
                        <li
                          key={o.value}
                          id={optId(o.value)}
                          role="option"
                          aria-selected={isSel}
                          onPointerMove={() => setActiveValue(o.value)}
                          onClick={() => choose(o.value)}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] transition-colors duration-150",
                            isActive ? "bg-tint text-ink" : "text-ink/85",
                            isSel && "font-semibold text-ink",
                          )}
                        >
                          {o.prefix ? (
                            <span
                              className={cn(
                                "w-7 shrink-0 rounded-md py-0.5 text-center font-mono text-[0.68rem] font-medium",
                                isSel ? "bg-brand text-white" : "bg-softmist text-brand",
                              )}
                            >
                              {o.prefix}
                            </span>
                          ) : (
                            <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", isSel ? "bg-brand" : "bg-ink/20")} />
                          )}
                          <span className="flex-1">{o.label}</span>
                          {isSel && <Check className="size-4 shrink-0 text-brand" aria-hidden />}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
              {!flat.length && <li className="px-3 py-6 text-center text-sm text-muted">No matches for “{query}”.</li>}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
