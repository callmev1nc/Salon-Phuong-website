"use client";

import { motion, type Variants } from "motion/react";
import { maskLine, staggerLines, viewportOnce } from "@/lib/motion";
import type { ReactNode } from "react";

type Tag = "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span" | "li";

const MOTION_TAG = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
  li: motion.li,
} as const;

export interface TextRevealProps {
  /** A single string (split on \n) or an explicit array of lines. */
  text?: string | string[];
  children?: ReactNode;
  as?: Tag;
  className?: string;
  /** Override the per-line animation (default: maskLine — rises behind mask). */
  lineVariant?: Variants;
  /** Stagger between lines (seconds). */
  stagger?: number;
  /** Delay before the first line (seconds). */
  delay?: number;
  once?: boolean;
}

/**
 * Text-mask reveal: each line sits inside an `overflow-hidden` mask and rises
 * from below, staggered. The signature Playfair-headline entrance.
 */
export function TextReveal({
  text,
  children,
  as = "div",
  className,
  lineVariant = maskLine,
  stagger = 0.09,
  delay = 0.05,
  once = true,
}: TextRevealProps) {
  const MotionTag = MOTION_TAG[as];

  const lines: ReactNode[] =
    children != null
      ? Array.isArray(children)
        ? children
        : [children]
      : (typeof text === "string" ? text.split("\n") : text ?? []).map(
          (l) => l as ReactNode
        );

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <MotionTag
      className={className}
      variants={{ ...staggerLines, ...container }}
      initial="hidden"
      whileInView="show"
      viewport={once ? viewportOnce : { once: false }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            variants={lineVariant}
            className="block will-change-transform"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export default TextReveal;
