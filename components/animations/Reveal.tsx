"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "left" | "right" | "none";

const offset = (d: Direction) =>
  d === "up" ? { y: 28 } : d === "left" ? { x: -36 } : d === "right" ? { x: 36 } : {};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  as?: "div" | "section" | "li" | "article" | "header" | "p" | "span";
  amount?: number;
}

/** Fade + slide in once the element scrolls into view. */
export function Reveal({ children, className, delay = 0, direction = "up", as = "div", amount = 0.25 }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, ...offset(direction) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/** Staggers direct <RevealItem> children into view. */
export function RevealGroup({
  children,
  className,
  as = "div",
  amount = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl";
  amount?: number;
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={groupVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={itemVariants}>
      {children}
    </Comp>
  );
}

/** Wipes an image (or any block) into view with a clip-path mask. */
export function MaskReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
}) {
  const hidden =
    from === "bottom" ? "inset(100% 0% 0% 0%)" : from === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";
  // The observed element must not be clipped itself, or IntersectionObserver never fires.
  return (
    <motion.div className={cn("overflow-hidden", className)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { clipPath: hidden },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.25, ease: EASE, delay } },
        }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{ hidden: { scale: 1.18 }, show: { scale: 1, transition: { duration: 1.6, ease: EASE, delay } } }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
