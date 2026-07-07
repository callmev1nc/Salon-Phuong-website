"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { services } from "@/data/services";
import { EASE, staggerGrid, fadeUp, viewportOnce } from "@/lib/motion";

export function ServiceAccordionSection() {
  const t = useTranslations("services");
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-black/10">
      <motion.ul variants={staggerGrid} initial="hidden" whileInView="show" viewport={viewportOnce}>
        {services.map((cat, i) => {
          const isOpen = open === i;
          return (
            <motion.li key={cat.id} variants={fadeUp} className="border-b border-black/10">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-6 py-8 text-left"
              >
                <span className="micro-label w-10 shrink-0 text-gray-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-serif text-2xl font-medium leading-tight sm:text-3xl lg:text-4xl">
                  {t(`categories.${cat.id}`)}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="shrink-0"
                >
                  <Plus size={24} strokeWidth={1.25} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ul className="ml-16 pb-8">
                      {cat.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center justify-between border-t border-black/5 py-3 text-sm first:border-t-0"
                        >
                          <span className="text-gray-600">
                            {t(`items.${item.id}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </motion.ul>

      <p className="micro-label mt-10 text-gray-400">{t("contactForPrice")}</p>
    </div>
  );
}

export default ServiceAccordionSection;
