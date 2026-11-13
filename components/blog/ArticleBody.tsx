import Image from "next/image";
import { Reveal, MaskReveal } from "@/components/animations/Reveal";
import type { BlogBlock } from "@/data/blog";

/** Renders a post's content blocks with the site's reveal animations. */
export function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <Reveal key={i} as="p" className={i === 0 ? "font-display text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[1.75rem]" : "text-lg leading-relaxed text-ink-soft md:text-[1.15rem]"}>
                {b.text}
              </Reveal>
            );
          case "h2":
            return (
              <Reveal key={i} className="pt-6">
                <h2 className="display-md text-ink">{b.text}</h2>
                <span aria-hidden className="mt-4 block h-[3px] w-14 rounded-full bg-gradient-to-r from-ocean to-violet" />
              </Reveal>
            );
          case "quote":
            return (
              <Reveal key={i} as="div" className="relative overflow-hidden rounded-[2rem] bg-abyss px-8 py-10 text-white md:px-12 md:py-14">
                <div aria-hidden className="absolute -right-20 -top-20 size-72 animate-orb rounded-full bg-violet/40 orb-soft" />
                <span aria-hidden className="text-gradient-cyan absolute left-6 top-2 font-display text-[7rem] font-extrabold leading-none opacity-40 md:left-8">
                  &ldquo;
                </span>
                <blockquote className="relative font-display text-2xl font-bold leading-snug tracking-tight md:text-3xl">{b.text}</blockquote>
              </Reveal>
            );
          case "list":
            return (
              <Reveal key={i} as="div">
                <ul className="space-y-3">
                  {b.items.map((item, j) => (
                    <li key={item} className="flex gap-5 rounded-[1.25rem] bg-white p-5 ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-36px_rgb(3_21_29/0.5)]">
                      <span className="text-gradient-ocean font-display text-xl font-extrabold leading-7">0{j + 1}</span>
                      <span className="text-lg leading-7 text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          case "image":
            return (
              <figure key={i} className="py-2">
                <MaskReveal className="relative aspect-[16/10] rounded-[2rem] bg-atlantic">
                  <Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                </MaskReveal>
                {b.caption && <figcaption className="mt-4 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">{b.caption}</figcaption>}
              </figure>
            );
        }
      })}
    </div>
  );
}
