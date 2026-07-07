"use client";

import { motion } from "motion/react";
import { TextReveal } from "@/components/motion/TextReveal";
import { fadeUp, viewportOnce } from "@/lib/motion";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string | string[];
  subtitle?: string;
  /** Override the top padding if a page needs a custom hero offset. */
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
}: PageHeaderProps) {
  return (
    <header className={`px-5 pb-16 pt-32 lg:px-10 lg:pb-24 lg:pt-44 ${className}`}>
      <div className="mx-auto max-w-[1600px]">
        {eyebrow && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="micro-label mb-6 text-gray-400"
          >
            {eyebrow}
          </motion.p>
        )}
        <TextReveal
          as="h1"
          text={title}
          className="max-w-[16ch] font-serif text-5xl font-medium leading-[0.95] sm:text-6xl lg:text-7xl"
        />
        {subtitle && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-6 max-w-xl text-gray-500"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </header>
  );
}

export default PageHeader;
