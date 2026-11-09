import type { CategoryId } from "@/data/programmes";

/** Per-category accents for programme cards. */
export const zoneTheme: Record<CategoryId, { dot: string; chip: string; tint: string; bar: string }> = {
  shore: {
    dot: "bg-[#c9b48a]",
    chip: "bg-sand text-ink",
    tint: "from-[#c9b48a]/45",
    bar: "bg-[#c9b48a]",
  },
  surface: {
    dot: "bg-seafoam",
    chip: "bg-seafoam text-ink",
    tint: "from-seafoam/40",
    bar: "bg-seafoam",
  },
  reef: {
    dot: "bg-aqua",
    chip: "bg-teal text-white",
    tint: "from-teal/55",
    bar: "bg-aqua",
  },
  blue: {
    dot: "bg-midnight",
    chip: "bg-abyss text-white",
    tint: "from-abyss/70",
    bar: "bg-midnight",
  },
};
