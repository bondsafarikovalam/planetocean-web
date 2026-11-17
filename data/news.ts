/**
 * Newsroom items.
 *
 * CONTENT NOTE: these starter items only re-use approved copy from
 * data/programmes.ts, data/navigation.ts and data/blog.ts — they add no new
 * facts, figures or claims. The DATES are placeholders: confirm each one (and
 * the wording) before publishing. Landmark events are deliberately shown
 * undated on the page (see data/events.ts content rules).
 */

import { blogPosts } from "@/data/blog";
import { involvementPaths } from "@/data/navigation";
import { programmeByNumber } from "@/data/programmes";

export type NewsKind = "announcement" | "programme" | "journal" | "involved";

export interface NewsItem {
  id: string;
  kind: NewsKind;
  title: string;
  summary: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
}

export const newsKinds: { id: NewsKind; label: string }[] = [
  { id: "announcement", label: "Announcements" },
  { id: "programme", label: "Programme updates" },
  { id: "journal", label: "From the journal" },
  { id: "involved", label: "Get involved" },
];

export const newsKindLabel = Object.fromEntries(newsKinds.map((k) => [k.id, k.label])) as Record<NewsKind, string>;

export const newsIntro =
  "Announcements, programme updates and ways to join in — the latest from Planet Ocean Foundation, from the tideline at Kovalam to the blue beyond.";

const programmeItem = (number: string, id: string, title: string, date: string): NewsItem => {
  const p = programmeByNumber(number)!;
  return {
    id,
    kind: "programme",
    title,
    summary: p.description,
    date,
    href: `/programmes#programme-${p.number}`,
    cta: "View the programme",
    image: p.image,
    imageAlt: p.imageAlt,
  };
};

const involveItem = (id: "volunteer" | "csr" | "school", title: string, date: string): NewsItem => {
  const path = involvementPaths.find((p) => p.id === id)!;
  return {
    id: `involve-${id}`,
    kind: "involved",
    title,
    summary: path.description,
    date,
    href: `/get-involved?interest=${id}#enquiry`,
    cta: path.cta,
    image: path.image,
    imageAlt: path.imageAlt,
  };
};

/** Hand-written newsroom items (dates are placeholders — see note above). */
const editorial: NewsItem[] = [
  {
    id: "journal-launch",
    kind: "announcement",
    title: "Our journal is live: notes from the water.",
    summary:
      "Field stories from the shore, the surface, the reef and the blue economy now have a home on this site — what our teams do, and why it matters.",
    date: "2026-11-13",
    href: "/blog",
    cta: "Read the journal",
    image: "/images/intro-reef-fish.jpg",
    imageAlt: "Shoal of reef fish swimming over coral",
  },
  programmeItem("16", "ponthuvallam-in-development", "In development: a safer alternative to the Ponthuvallam.", "2026-11-06"),
  involveItem("volunteer", "Clean-ups are open to volunteers.", "2026-10-28"),
  programmeItem("10", "malayalam-podcasts", "Ocean conservation, in the language people think in.", "2026-10-15"),
  involveItem("school", "Bring Ocean Literacy to your school.", "2026-10-01"),
  involveItem("csr", "Partner with us through CSR.", "2026-09-18"),
];

/** The latest journal posts, surfaced as news. */
const fromJournal: NewsItem[] = [...blogPosts]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3)
  .map((p) => ({
    id: `journal-${p.slug}`,
    kind: "journal",
    title: p.title,
    summary: p.excerpt,
    date: p.date,
    href: `/blog/${p.slug}`,
    cta: "Read the story",
    image: p.image,
    imageAlt: p.imageAlt,
  }));

export const newsItems: NewsItem[] = [...editorial, ...fromJournal].sort((a, b) => b.date.localeCompare(a.date));

export const formatNewsDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

export const formatMonth = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
