import type { MetadataRoute } from "next";
import { mainNav } from "@/data/navigation";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return mainNav.map((n) => ({
    url: `${site.url}${n.href === "/" ? "" : n.href}`,
    changeFrequency: "monthly",
    priority: n.href === "/" ? 1 : n.href === "/programmes" ? 0.9 : 0.7,
  }));
}
