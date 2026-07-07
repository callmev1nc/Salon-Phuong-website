"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { EASE, staggerGrid, fadeUp, viewportOnce } from "@/lib/motion";

export function FAQAccordion({ limit }: { limit?: number }) {
  const t = useTranslations();
  const [open, setOpen] = useState<number | null>(0);

  const all = t.raw("faq.items") as { q: string; a: string }[];
  const items = limit ? all.slice(0, limit) : all;

  return (
    <motion.ul
      variants={staggerGrid}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.li key={i} variants={fadeUp} className="border-b border-black/10">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-6 py-6 text-left"
            >
              <span className="micro-label w-8 shrink-0 text-gray-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-serif text-xl font-medium leading-snug sm:text-2xl">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="shrink-0 text-black"
              >
                <Plus size={22} strokeWidth={1.25} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-14 pr-4 leading-relaxed text-gray-500">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

export default FAQAccordion;
