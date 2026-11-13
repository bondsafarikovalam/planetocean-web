import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Tilt } from "@/components/animations/Interactive";
import { formatDate, topicLabel, type BlogPost, type BlogTopic } from "@/data/blog";
import { cn } from "@/lib/utils";

export const topicChip: Record<BlogTopic, string> = {
  shore: "bg-coral text-abyss",
  surface: "bg-biolum text-abyss",
  reef: "bg-ocean text-white",
  blue: "bg-violet text-white",
  events: "bg-[#ffd36e] text-abyss",
};

/** Image-led journal card with pointer tilt, matching the programme showcase cards. */
export function BlogCard({
  post,
  tone = "light",
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw",
  className,
}: {
  post: BlogPost;
  tone?: "light" | "dark";
  aspect?: string;
  sizes?: string;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <article className={cn("group relative", className)}>
      <Tilt className="rounded-[2rem]">
        <div className={cn("relative overflow-hidden rounded-[2rem] bg-atlantic", aspect)}>
          <Image src={post.image} alt={post.imageAlt} fill sizes={sizes} className="object-cover transition-transform duration-[1.6s] ease-tide group-hover:scale-110" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-abyss/0 to-abyss/10" />
          <span className={cn("absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]", topicChip[post.topic])}>
            {topicLabel[post.topic]}
          </span>
          <span className="absolute bottom-4 left-5 flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/85">
            <Clock className="size-3.5" aria-hidden /> {post.readMinutes} min read
          </span>
          <span
            aria-hidden
            className="absolute bottom-5 right-5 inline-flex size-12 scale-75 items-center justify-center rounded-full bg-cyan text-abyss opacity-0 transition-all duration-500 ease-tide group-hover:scale-100 group-hover:opacity-100"
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </Tilt>
      <div className="mt-6 pr-4">
        <p className={cn("font-mono text-[0.68rem] uppercase tracking-[0.18em]", dark ? "text-white/50" : "text-ink-soft")}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3 className={cn("mt-2 font-display text-2xl font-bold leading-tight tracking-tight md:text-[1.6rem]", dark ? "text-white" : "text-ink")}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        <p className={cn("mt-3 leading-relaxed", dark ? "text-white/65" : "text-ink-soft")}>{post.excerpt}</p>
      </div>
    </article>
  );
}
