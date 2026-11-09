import { MapPin, Waves, LayoutGrid } from "lucide-react";
import { CountUp } from "@/components/animations/CountUp";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { programmes } from "@/data/programmes";
import { operatingWaters } from "@/data/navigation";

/** Verified organisational facts only — no invented impact numbers. */
export function ImpactStats() {
  return (
    <section aria-labelledby="facts-title" className="grain relative overflow-hidden bg-midnight py-20 text-white md:py-28">
      <div aria-hidden className="caustics absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua/50 to-transparent" />
      <div className="container-x relative">
        <h2 id="facts-title" className="eyebrow flex items-center gap-3 text-aqua">
          <span aria-hidden className="h-px w-8 bg-aqua" />
          The Foundation at a glance
        </h2>

        <RevealGroup as="dl" className="mt-12 grid gap-5 md:grid-cols-3">
          <RevealItem className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-colors duration-500 hover:border-aqua/40 md:p-10">
            <dt className="flex items-center gap-2 text-sm font-medium text-seafoam/80">
              <MapPin className="size-4 text-aqua" aria-hidden /> Base
            </dt>
            <dd className="mt-8">
              <span className="block font-display text-5xl font-bold tracking-tight md:text-6xl">Kovalam</span>
              <span className="mt-3 block text-white/65">Thiruvananthapuram, Kerala</span>
            </dd>
            <Ring />
          </RevealItem>

          <RevealItem className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-colors duration-500 hover:border-aqua/40 md:p-10">
            <dt className="flex items-center gap-2 text-sm font-medium text-seafoam/80">
              <Waves className="size-4 text-aqua" aria-hidden /> Operating waters
            </dt>
            <dd className="mt-8">
              <CountUp to={operatingWaters.length} className="block font-display text-6xl font-bold tracking-tight text-aqua md:text-7xl" />
              <span className="mt-3 block text-white/65">{operatingWaters.map((w) => w.name).join(" · ")}</span>
            </dd>
            <Ring />
          </RevealItem>

          <RevealItem className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-colors duration-500 hover:border-aqua/40 md:p-10">
            <dt className="flex items-center gap-2 text-sm font-medium text-seafoam/80">
              <LayoutGrid className="size-4 text-aqua" aria-hidden /> Active programmes
            </dt>
            <dd className="mt-8">
              <CountUp to={programmes.length} className="block font-display text-6xl font-bold tracking-tight text-aqua md:text-7xl" />
              <span className="mt-3 block text-white/65">Across shore, surface, reef and blue</span>
            </dd>
            <Ring />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

function Ring() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className="pointer-events-none absolute -bottom-20 -right-20 size-56 text-aqua/15 transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-110 group-hover:rotate-12"
    >
      {[90, 70, 50, 30].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}
