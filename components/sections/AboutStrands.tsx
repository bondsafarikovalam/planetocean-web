"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories, programmeByNumber, type CategoryId } from "@/data/programmes";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { cn } from "@/lib/utils";

export interface Strand {
  id: CategoryId;
  title: string;
  body: string;
  refs: string[];
  image: string;
  alt: string;
}

/** Scrollytelling: a sticky image frame changes as each strand of work scrolls into focus. */
export function AboutStrands({ strands }: { strands: Strand[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(Number((en.target as HTMLElement).dataset.idx));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const s = strands[active];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-24 h-[calc(100vh-8rem)]">
          <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-atlantic">
            <AnimatePresence initial={false}>
              <motion.div
                key={s.id}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={s.image} alt={s.alt} fill sizes="45vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
            <PhotoNote className="absolute left-5 top-5 z-10" />
            <div className="absolute inset-x-6 bottom-6 z-10 flex items-end justify-between text-white">
              <p className="font-display text-7xl font-extrabold leading-none tracking-[-0.05em]">0{active + 1}</p>
              <div className="flex gap-1.5">
                {strands.map((x, i) => (
                  <span key={x.id} className={cn("h-1 rounded-full transition-all duration-500", i === active ? "w-10 bg-cyan" : "w-4 bg-white/40")} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-20 lg:col-span-6 lg:space-y-0">
        {strands.map((st, i) => {
          const cat = categories.find((c) => c.id === st.id)!;
          return (
            <article
              key={st.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-idx={i}
              className={cn("transition-opacity duration-700 lg:flex lg:min-h-[85vh] lg:flex-col lg:justify-center", i === active ? "lg:opacity-100" : "lg:opacity-30")}
            >
              <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-[2rem] lg:hidden">
                <Image src={st.image} alt={st.alt} fill sizes="100vw" className="object-cover" />
                <PhotoNote className="absolute left-4 top-4" />
              </div>
              <p className="eyebrow text-ocean-ink">
                0{i + 1} · {st.id === "blue" ? "Blue" : cat.filterLabel} · {cat.depth}
              </p>
              <h2 className="display-lg mt-4 text-ink">{st.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">{st.body}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {st.refs.map((n) => {
                  const p = programmeByNumber(n);
                  if (!p) return null;
                  return (
                    <li key={n}>
                      <Link
                        href={`/programmes#programme-${n}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-ink/10 transition-colors hover:bg-abyss hover:text-white"
                      >
                        <span className="font-mono text-xs text-ocean-ink">{n}</span> {p.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
