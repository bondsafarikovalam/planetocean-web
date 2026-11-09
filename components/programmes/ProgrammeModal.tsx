"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { categoryById, type Programme } from "@/data/programmes";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { cn } from "@/lib/utils";
import { zoneTheme } from "./zoneTheme";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProgrammeModalProps {
  programme: Programme | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  position?: { index: number; total: number };
}

/** Larger view of a programme. Shows only supplied content — no invented detail. */
export function ProgrammeModal({ programme, onClose, onPrev, onNext, position }: ProgrammeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = programme !== null;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && onNext) onNext();
      else if (e.key === "ArrowLeft" && onPrev) onPrev();
      else if (e.key === "Tab" && dialogRef.current) {
        const items = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [open, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {programme && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            aria-label="Close programme details"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-abyss/75 backdrop-blur-md"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="programme-modal-title"
            className="relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem] md:flex-row"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={programme.number}
                className="flex min-h-0 w-full flex-col md:flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="relative aspect-[16/10] shrink-0 md:aspect-auto md:w-[46%]">
                  <Image src={programme.image} alt={programme.imageAlt} fill sizes="(min-width: 768px) 46vw, 100vw" className="object-cover" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-abyss/10 to-transparent" />
                  <span aria-hidden className="absolute bottom-4 left-6 font-display text-[6rem] font-extrabold leading-none tracking-tighter text-white md:text-[9rem]">
                    {programme.number}
                  </span>
                  <PhotoNote className="absolute left-4 top-4" />
                </div>

                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-7 md:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", zoneTheme[programme.category].chip)}>
                      {categoryById[programme.category].filterLabel}
                    </span>
                    <span className="text-xs font-medium text-ink-soft">{categoryById[programme.category].depth}</span>
                    {programme.inDevelopment && (
                      <span className="rounded-full bg-[#f2c66d] px-3 py-1 text-xs font-bold text-abyss">In development</span>
                    )}
                  </div>
                  <p className="mt-6 text-sm font-semibold text-teal-ink">Programme {programme.number}</p>
                  <h2 id="programme-modal-title" className="mt-1 font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
                    {programme.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-ink-soft">{programme.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
                    {programme.tags.map((t) => (
                      <li key={t} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink ring-1 ring-ink/10">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                      href={`/get-involved?interest=${programme.number}#enquiry`}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-abyss px-6 text-sm font-semibold text-white transition-colors hover:bg-teal"
                    >
                      Enquire about this programme <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                    {position && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={onPrev}
                          disabled={!onPrev}
                          className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-ink/15 transition-colors hover:bg-mist disabled:opacity-30"
                          aria-label="Previous programme"
                        >
                          <ArrowLeft className="size-4" aria-hidden />
                        </button>
                        <span className="min-w-14 text-center text-xs tabular-nums text-ink-soft">
                          {position.index + 1} / {position.total}
                        </span>
                        <button
                          type="button"
                          onClick={onNext}
                          disabled={!onNext}
                          className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-ink/15 transition-colors hover:bg-mist disabled:opacity-30"
                          aria-label="Next programme"
                        >
                          <ArrowRight className="size-4" aria-hidden />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              data-autofocus
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg backdrop-blur transition-transform hover:rotate-90"
            >
              <X className="size-5" aria-hidden />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
