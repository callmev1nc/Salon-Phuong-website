"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { services } from "@/data/services";
import { customerGalleryImages } from "@/data/gallery";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { useIsCoarsePointer } from "@/lib/use-coarse-pointer";

// One preview frame per category (varied customer work).
const PREVIEW = services.map((_, i) => customerGalleryImages[i * 3]?.src).filter(
  Boolean
);

export function ServicesPreview() {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const coarse = useIsCoarsePointer();
  const [active, setActive] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 28, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 250, damping: 28, mass: 0.3 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  const showThumb = active !== null && !reduce && !coarse;

  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="micro-label mb-5 text-gray-400"
            >
              {t("home.servicesEyebrow")}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="max-w-[12ch] font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl"
            >
              {t("home.servicesTitle")}
            </motion.h2>
          </div>
          <Link
            href="/services"
            className="micro-label hidden shrink-0 border-b border-black pb-1 sm:inline-block"
          >
            {t("home.servicesLink")}
          </Link>
        </div>

        <div
          ref={ref}
          className="relative border-t border-black/10"
          onPointerMove={onMove}
        >
          <ul>
            {services.map((cat, i) => (
              <li key={cat.id} className="border-b border-black/10">
                <Link
                  href="/services"
                  className="group flex items-center gap-6 py-7 sm:py-9"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  <span className="micro-label w-10 shrink-0 text-gray-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-serif text-3xl font-medium leading-none transition-all duration-500 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                    {t(`services.categories.${cat.id}`)}
                  </span>
                  <span className="hidden text-sm text-gray-400 sm:block">
                    {String(cat.items.length).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    className="shrink-0 text-black transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    size={26}
                    strokeWidth={1.25}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Cursor-following preview (desktop + motion only) */}
          {showThumb && PREVIEW[active!] && (
            <motion.div
              className="pointer-events-none absolute left-0 top-0 z-20 hidden h-56 w-44 overflow-hidden lg:block"
              style={{ x: sx, y: sy, translateX: "60px", translateY: "-110px" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              key={active}
            >
              <Image
                src={PREVIEW[active!]}
                alt=""
                fill
                sizes="176px"
                className="grayscale-img object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
