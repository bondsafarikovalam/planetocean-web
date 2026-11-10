"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Transparent full-width header that condenses into a floating glass capsule on scroll,
 * and tucks away while scrolling down (returns on scroll up).
 */
export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const last = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    const delta = y - last.current;
    if (Math.abs(delta) > 6) {
      setHidden(y > 600 && delta > 0);
      last.current = y;
    }
  });

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  const activeHref = mainNav.find((n) => isActive(pathname, n.href))?.href ?? null;
  const indicator = hover ?? activeHref;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5"
        initial={false}
        animate={{ y: hidden && !open ? "-130%" : "0%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        onFocusCapture={() => setHidden(false)}
      >
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto flex items-center justify-between gap-4 transition-all duration-700 ease-tide",
            scrolled
              ? "mt-3 max-w-6xl rounded-full bg-abyss/80 py-2 pl-4 pr-2 shadow-[0_20px_60px_-25px_rgb(0_0_0/0.7)] ring-1 ring-white/10 backdrop-blur-md"
              : "mt-0 max-w-[92rem] py-6 pl-2 pr-0 sm:pl-6 sm:pr-4",
          )}
        >
          <Logo compact={scrolled} />

          <ul className="hidden items-center xl:flex" onPointerLeave={() => setHover(null)}>
            {mainNav.map((item) => {
              const active = item.href === activeHref;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onPointerEnter={() => setHover(item.href)}
                    onFocus={() => setHover(item.href)}
                    onBlur={() => setHover(null)}
                    className={cn(
                      "relative block px-4 py-2.5 text-[0.88rem] font-medium tracking-tight transition-colors duration-300",
                      active || hover === item.href ? "text-white" : "text-white/65",
                    )}
                  >
                    {indicator === item.href && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/10"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    {active && <span aria-hidden className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-cyan" />}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/get-involved"
              className="group relative hidden h-11 items-center gap-2 overflow-hidden rounded-full bg-cyan pl-5 pr-2 text-sm font-semibold text-abyss sm:inline-flex"
            >
              <span aria-hidden className="absolute inset-0 translate-y-full rounded-full bg-biolum transition-transform duration-500 ease-tide group-hover:translate-y-0" />
              <span className="relative">Get Involved</span>
              <span className="relative inline-flex size-7 items-center justify-center rounded-full bg-abyss text-cyan transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-3.5" aria-hidden />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group inline-flex h-11 items-center gap-3 rounded-full bg-white/10 pl-4 pr-3.5 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-white/20 xl:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span aria-hidden className="hidden sm:inline">
                Menu
              </span>
              <span aria-hidden className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3/4 self-end bg-current transition-all duration-300 group-hover:w-full" />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>
      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}
