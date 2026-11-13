import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { blogPosts, formatDate, postBySlug, relatedPosts, topicLabel } from "@/data/blog";
import { programmes } from "@/data/programmes";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { BlogCard, topicChip } from "@/components/blog/BlogCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = postBySlug((await params).slug);
  if (!post) return {};
  return {
    title: post.title.replace(/\.$/, ""),
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: `${post.title} | Planet Ocean Foundation`, publishedTime: post.date, images: [post.image] },
  };
}

const tintFor = { shore: "coral", surface: "ocean", reef: "ocean", blue: "violet", events: "violet" } as const;

export default async function BlogPostPage({ params }: Params) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();

  const index = String(blogPosts.indexOf(post) + 1).padStart(2, "0");
  const linked = (post.programmes ?? []).map((slug) => programmes.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  const related = relatedPosts(post);

  return (
    <>
      <PageHero
        index={index}
        eyebrow={`Blog · ${topicLabel[post.topic]}`}
        title={post.title}
        accent={post.accent}
        image={post.image}
        tint={tintFor[post.topic]}
        intro={post.excerpt}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/70">
          <span className={cn("rounded-full px-3 py-1 text-[0.65rem]", topicChip[post.topic])}>{topicLabel[post.topic]}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden /> {post.readMinutes} min read
          </span>
        </div>
      </PageHero>

      <section aria-label="Article" className="relative overflow-hidden bg-pearl py-16 md:py-24">
        <div aria-hidden className="absolute -right-40 top-40 size-[36rem] rounded-full bg-cyan/15 orb-soft" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="space-y-8 lg:sticky lg:top-28">
              <Link href="/blog" className="group inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-white ring-1 ring-ink/10 transition-transform duration-500 ease-tide group-hover:-translate-x-1">
                  <ArrowLeft className="size-4" aria-hidden />
                </span>
                All stories
              </Link>
              <dl className="hidden space-y-5 border-t border-ink/10 pt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] lg:block">
                <div>
                  <dt className="text-ink-soft/70">Topic</dt>
                  <dd className="mt-1 text-ink">{topicLabel[post.topic]}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft/70">Published</dt>
                  <dd className="mt-1 text-ink">{formatDate(post.date)}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft/70">Reading time</dt>
                  <dd className="mt-1 text-ink">{post.readMinutes} minutes</dd>
                </div>
              </dl>
            </div>
          </aside>

          <article className="max-w-3xl lg:col-span-8">
            <ArticleBody blocks={post.body} />

            {linked.length > 0 && (
              <Reveal className="mt-16 rounded-[2rem] bg-white p-7 ring-1 ring-ink/5 md:p-9">
                <p className="eyebrow text-ocean-ink">Programmes in this story</p>
                <ul className="mt-5 divide-y divide-ink/10">
                  {linked.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/programmes#programme-${p.number}`} className="group flex items-center justify-between gap-4 py-4">
                        <span className="flex items-baseline gap-4">
                          <span className="text-gradient-ocean font-display text-lg font-extrabold">{p.number}</span>
                          <span className="font-display text-lg font-bold tracking-tight text-ink transition-transform duration-500 ease-tide group-hover:translate-x-1">{p.title}</span>
                        </span>
                        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-softmist text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-cyan group-hover:text-abyss">
                          <ArrowUpRight className="size-4" aria-hidden />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="grain relative overflow-hidden bg-abyss py-20 text-white md:py-28">
          <div aria-hidden className="absolute -left-40 -top-40 size-[40rem] animate-orb rounded-full bg-violet/30 orb-soft" />
          <div className="container-x relative">
            <p className="eyebrow text-cyan">Keep reading</p>
            <TextReveal id="related-title" text="More notes from the water." accent={["water."]} className="display-lg mt-5" />
            <RevealGroup className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <RevealItem key={p.slug}>
                  <BlogCard post={p} tone="dark" />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
