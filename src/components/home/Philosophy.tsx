"use client";

import { Fragment, type ReactNode } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { fadeUp, maskLine, staggerLines, viewportOnce } from "@/lib/motion";

/** Split "doing *HAIR* now" → [doing, <em>HAIR</em>, now]. */
function renderLine(line: string): ReactNode {
  const parts = line.split(/(\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="font-serif italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Philosophy() {
  const t = useTranslations("home");
  const lines = t.raw("philosophySlogan") as string[];

  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="micro-label mb-10 text-gray-400"
        >
          {t("philosophyEyebrow")}
        </motion.p>

        <motion.h2
          variants={staggerLines}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-[20ch] font-serif text-3xl font-medium leading-[1.15] lg:leading-[1.3] text-black sm:text-4xl lg:text-[3.4rem]"
        >
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
              <motion.span variants={maskLine} className="block">
                {renderLine(line)}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 max-w-xl text-base leading-relaxed text-gray-500"
        >
          {t("philosophyBody")}
        </motion.p>
      </div>
    </section>
  );
}

export default Philosophy;
