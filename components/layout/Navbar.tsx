"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow,padding] duration-500 ease-[var(--ease-tide)]",
          scrolled
            ? "bg-abyss/80 py-3 shadow-[0_1px_0_rgb(255_255_255/0.06),0_20px_40px_-24px_rgb(0_0_0/0.6)] backdrop-blur-xl"
            : "bg-gradient-to-b from-abyss/60 to-transparent py-5",
        )}
      >
        <nav aria-label="Main" className="container-x flex items-center justify-between gap-6">
          <Logo />

          <ul className="hidden items-center gap-1 xl:flex">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative block rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors duration-300",
                      active ? "text-white" : "text-white/70 hover:text-white",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="relative">
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-1 left-0 h-px bg-aqua transition-all duration-500 ease-[var(--ease-tide)]",
                          active ? "w-0" : "w-0 group-hover:w-full group-focus-visible:w-full",
                        )}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/get-involved"
              className="group hidden items-center gap-2 rounded-full bg-aqua px-5 py-2.5 text-sm font-semibold text-abyss transition-colors duration-300 hover:bg-seafoam sm:inline-flex"
            >
              Get Involved
              <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 xl:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}
