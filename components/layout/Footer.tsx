import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { mainNav, operatingWaters } from "@/data/navigation";
import { categories, programmes } from "@/data/programmes";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

const socialPlaceholders = ["Instagram", "Facebook", "YouTube", "LinkedIn"];

export function Footer() {
  return (
    <footer className="cv-auto grain relative overflow-hidden bg-trench text-white">
      {/* atmospheric glow */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 size-[40rem] rounded-full bg-violet/25 orb-soft" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 size-[36rem] rounded-full bg-ocean/25 orb-soft" />

      {/* marquee band */}
      <div aria-hidden className="relative overflow-hidden border-y border-white/10 py-5">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-2xl font-bold tracking-tight text-white/80 md:text-3xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12">
              {[site.tagline, ...operatingWaters.map((w) => w.name), `${programmes.length} active programmes`].map((t) => (
                <span key={t + k} className="flex items-center gap-12">
                  {t}
                  <span className="size-2 rounded-full bg-cyan" />
                </span>
              ))}
              <span lang="ml" className="flex items-center gap-12 font-ml text-xl text-biolum md:text-2xl">
                {site.taglineMl}
                <span className="size-2 rounded-full bg-coral" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="container-x relative pb-8 pt-20 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-8 max-w-md font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-3xl">{site.tagline}</p>
            <p lang="ml" className="mt-4 text-lg text-biolum">
              {site.taglineMl}
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-white/50">{site.descriptor}.</p>
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white/[0.06] py-2 pl-5 pr-2 text-sm font-semibold ring-1 ring-white/15 transition-colors hover:bg-white/10"
            >
              Send an enquiry
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-cyan text-abyss transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="eyebrow text-cyan">Explore</h2>
              <ul className="mt-6 space-y-3 text-[0.95rem]">
                {mainNav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link-underline text-white/70 transition-colors hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow text-cyan">Programmes</h2>
              <ul className="mt-6 space-y-3 text-[0.95rem]">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link href={`/programmes?category=${c.id}`} className="link-underline text-white/70 transition-colors hover:text-white">
                      {c.filterLabel}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/programmes" className="link-underline text-white/70 transition-colors hover:text-white">
                    All {programmes.length} programmes
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="eyebrow text-cyan">Contact</h2>
              <address className="mt-6 space-y-4 text-[0.95rem] not-italic text-white/70">
                <p className="flex gap-2.5">
                  <MapPin className="mt-1 size-4 shrink-0 text-coral" aria-hidden />
                  <span>
                    Planet Ocean Foundation
                    <br />
                    Kovalam, Thiruvananthapuram,
                    <br />
                    Kerala, India
                  </span>
                </p>
                <p className="text-sm text-white/45">Email and phone details will be published here.</p>
              </address>
              <div className="mt-8">
                <h3 className="eyebrow text-white/40">Social</h3>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Social channels (coming soon)">
                  {socialPlaceholders.map((s) => (
                    <li key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45" title={`${s} — coming soon`}>
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-white/35">Channels coming soon.</p>
              </div>
            </div>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="@container mt-16">
          <p
            aria-hidden
            className="pointer-events-none select-none whitespace-nowrap bg-gradient-to-b from-white/[0.14] to-white/[0.01] bg-clip-text pb-[0.06em] text-center font-display text-[16cqw] font-extrabold leading-[0.85] tracking-[-0.06em] text-transparent"
          >
            Planet Ocean
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.descriptor}
          </p>
          <p>Photography: representative images via Unsplash</p>
        </div>
      </div>
    </footer>
  );
}
