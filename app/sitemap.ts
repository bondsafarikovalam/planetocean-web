import type { MetadataRoute } from "next";
import { mainNav } from "@/data/navigation";
import { blogPosts } from "@/data/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = mainNav.map((n) => ({
    url: `${site.url}${n.href === "/" ? "" : n.href}`,
    changeFrequency: n.href === "/blog" || n.href === "/news" ? "weekly" : "monthly",
    priority: n.href === "/" ? 1 : n.href === "/programmes" ? 0.9 : 0.7,
  }));
  const posts: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
