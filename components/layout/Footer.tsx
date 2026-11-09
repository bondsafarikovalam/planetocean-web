import Link from "next/link";
import { MapPin } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { categories, programmes } from "@/data/programmes";
import { site } from "@/lib/site";
import { WaveEdge } from "@/components/animations/OceanEffects";
import { Logo } from "./Logo";

const socialPlaceholders = ["Instagram", "Facebook", "YouTube", "LinkedIn"];

export function Footer() {
  return (
    <footer className="relative bg-abyss text-white">
      <WaveEdge className="absolute -top-[59px] left-0 text-abyss sm:-top-[89px]" />
      <div className="container-x relative pb-10 pt-16 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm font-display text-2xl font-semibold leading-snug tracking-tight">{site.tagline}</p>
            <p lang="ml" className="mt-3 text-lg text-seafoam">
              {site.taglineMl}
            </p>
            <p className="mt-6 text-sm text-white/60">{site.descriptor}.</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="eyebrow text-aqua">Explore</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {mainNav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link-underline text-white/75 hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow text-aqua">Programmes</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link href={`/programmes?category=${c.id}`} className="link-underline text-white/75 hover:text-white">
                      {c.filterLabel}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/programmes" className="link-underline text-white/75 hover:text-white">
                    All {programmes.length} programmes
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="eyebrow text-aqua">Contact</h2>
              <address className="mt-5 space-y-4 text-sm not-italic text-white/75">
                <p className="flex gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-aqua" aria-hidden />
                  <span>
                    Planet Ocean Foundation
                    <br />
                    Kovalam, Thiruvananthapuram,
                    <br />
                    Kerala, India
                  </span>
                </p>
                <p className="text-white/50">Email and phone details will be published here.</p>
                <Link href="/contact" className="link-underline inline-block font-semibold text-white">
                  Send an enquiry →
                </Link>
              </address>
              <div className="mt-8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Social</h3>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Social channels (coming soon)">
                  {socialPlaceholders.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45"
                      title={`${s} — coming soon`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-white/35">Channels coming soon.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.descriptor}.
          </p>
          <p>Photography: representative images via Unsplash.</p>
        </div>
      </div>
    </footer>
  );
}
