"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Bubbles } from "@/components/animations/OceanEffects";
import { Logo } from "./Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

function active(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>("a, button");
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
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-abyss text-white xl:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2.5rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 2.75rem) 2.5rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2.5rem)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(8_126_139/0.45),transparent_60%)]" />
          <Bubbles count={10} />

          <div className="container-x relative flex items-center justify-between py-5">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x relative flex flex-1 flex-col justify-center py-10">
            <ul className="space-y-1">
              {mainNav.map((item, i) => {
                const isOn = active(pathname, item.href);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.06, duration: 0.6, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={isOn ? "page" : undefined}
                      className={cn(
                        "group flex items-baseline gap-4 py-2 font-display text-[clamp(2rem,9vw,3.25rem)] font-bold leading-tight tracking-tight transition-colors",
                        isOn ? "text-aqua" : "text-white hover:text-seafoam",
                      )}
                    >
                      <span className="w-8 font-sans text-xs font-medium tabular-nums text-white/40">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            className="container-x relative border-t border-white/10 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p lang="ml" className="text-lg text-seafoam">
              {site.taglineMl}
            </p>
            <p className="mt-2 text-sm text-white/60">{site.base}</p>
            <Link
              href="/get-involved"
              onClick={onClose}
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-aqua px-6 font-semibold text-abyss"
            >
              Get Involved <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
