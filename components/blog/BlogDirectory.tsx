"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProgrammeFilters, type FilterOption } from "@/components/programmes/ProgrammeFilters";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogTopics, type BlogPost } from "@/data/blog";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Topic filter + animated grid of journal cards. */
export function BlogDirectory({ posts }: { posts: BlogPost[] }) {
  const [topic, setTopic] = useState("all");

  const options: FilterOption[] = useMemo(
    () => [
      { id: "all", label: "All", count: posts.length },
      ...blogTopics
        .map((t) => ({ id: t.id, label: t.label, count: posts.filter((p) => p.topic === t.id).length }))
        .filter((o) => o.count > 0),
    ],
    [posts],
  );

  const visible = topic === "all" ? posts : posts.filter((p) => p.topic === topic);

  return (
    <>
      <ProgrammeFilters options={options} value={topic} onChange={setTopic} label="Filter stories by topic" layoutId="blog-filter" />
      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "story" : "stories"} shown
      </p>
      <motion.ul layout className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((post, i) => (
            <motion.li
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3 } }}
              transition={{ duration: 0.85, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <BlogCard post={post} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
