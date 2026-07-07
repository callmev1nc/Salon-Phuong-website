"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { customerGalleryImages, galleryCategories } from "@/data/gallery";
import type { GalleryItem } from "@/data/gallery";
import { Tilt } from "@/components/motion/Tilt";
import { Lightbox } from "./Lightbox";
import { EASE } from "@/lib/motion";

export function GalleryGrid() {
  const t = useTranslations("gallery");
  const [filter, setFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Dedupe is already applied in customerGalleryImages (excludes shop too).
  const filtered: GalleryItem[] =
    filter === "all"
      ? customerGalleryImages
      : customerGalleryImages.filter((i) => i.category === filter);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-16 z-sticky -mx-5 mb-10 border-y border-black/10 bg-white/90 px-5 py-4 backdrop-blur-sm lg:top-20 lg:-mx-10 lg:px-10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2">
          {galleryCategories.map((cat) => {
            const active = filter === cat.id;
            const label = t(cat.labelKey.replace("gallery.", ""));
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className="relative rounded-full px-4 py-2 text-sm transition-colors"
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-black"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span
                  className={`relative ${
                    active ? "text-white" : "text-gray-500 hover:text-black"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
          <span className="micro-label ml-auto text-gray-400">
            {t("count", { count: filtered.length })}
          </span>
        </div>
      </div>

      {/* Masonry grid (CSS grid + row-spans). Plain fade on filter change. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          style={{ gridAutoRows: "8.5rem", gridAutoFlow: "dense" }}
        >
          {filtered.map((img, i) => {
            const span = i % 5 === 0 ? "row-span-2" : "";
            const tilt = i % 4 === 0; // featured tiles
            const tile = (
              <button
                onClick={() => setLightboxIndex(i)}
                data-cursor="media"
                data-cursor-label="View"
                className={`group relative block h-full w-full overflow-hidden bg-gray-100 ${span}`}
              >
                <Image
                  src={img.src}
                  alt={img.caption ?? ""}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="grayscale-img object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </button>
            );
            return (
              <div key={`${i}-${img.src}`} className={span}>
                {tilt ? <Tilt max={6}>{tile}</Tilt> : tile}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}

export default GalleryGrid;
