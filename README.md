# Planet Ocean Foundation — website

The CSR wing of the Bond Group of Companies · Kovalam, Thiruvananthapuram, Kerala.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion, GSAP ScrollTrigger and Lucide.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Requires Node 20.9+ (Node 22 recommended). Tailwind is pinned to **4.3.3**: 4.3.4 and later
depend on an ESM-only `magic-string`, which needs Node ≥ 22.12. Upgrade Tailwind once Node is upgraded.

## Configuration (`.env.local`, see `.env.example`)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production URL, used for the sitemap, robots and Open Graph URLs. |
| `NEXT_PUBLIC_ENQUIRY_ENDPOINT` | URL that accepts the enquiry form as a JSON POST. When unset, the form validates input and then clearly says that **nothing was sent or stored**. |

## Content: where to edit

| What | File |
|---|---|
| All 16 programmes (numbers, titles, descriptions, tags, categories, images) | `data/programmes.ts` |
| Landmark events | `data/events.ts` |
| Navigation, Get Involved paths, operating waters | `data/navigation.ts` |
| Taglines, descriptions, SEO defaults | `lib/site.ts` |

Programme content is approved source copy. Don't shorten, renumber or merge it.

## Design system & motion

- **Tokens** live in `app/globals.css` (`@theme`): Abyss, Deep Atlantic, Electric Ocean, Glacial Cyan,
  Bioluminescent Aqua, Deep Violet, Coral, Pearl, Soft Mist, plus per-world backgrounds (`bg-world-*`).
- **Motion helpers** in `components/animations/`: `TextReveal`/`ScrollWords` (masked + scroll-lit type),
  `Parallax`/`ParallaxFrame` (depth layers), `Tilt`/`Magnetic` (pointer interactions), `Reveal`/`MaskReveal`.
- **GSAP** is used only for the two pinned sequences: the horizontal *Four Ocean Worlds* (`OceanWorlds.tsx`)
  and the home *Landmark Events* stage (`LandmarkEvents.tsx`).
- Heavy effects (pinning, parallax, tilt, magnetic) run only on large screens with a fine pointer and
  no reduced-motion preference (`lib/useMedia.ts`); elsewhere layouts fall back to stacked panels.
- The side "depth gauge" was removed on request; only the thin top progress bar remains.

## Photography

All images in `public/images` are **representative Unsplash photos** (see `public/images/CREDITS.md`)
and are labelled "Representative image" on the site. To use the Foundation's own photos, replace the
files and keep the same names, or update the paths in `data/*.ts`.

## Still to supply

Email, phone and social media links aren't shown yet: the site says they will be published.
Add them in `components/layout/Footer.tsx` and `app/contact/page.tsx` once they are confirmed.
