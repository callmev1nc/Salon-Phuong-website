"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { reviewScreenshots } from "@/data/review-screenshots";
import { Marquee } from "@/components/motion/Marquee";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function ReviewWall() {
  const t = useTranslations();

  return (
    <div className="space-y-16">
      {/* Masonry wall of screenshots (kept in colour — they're evidence) */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="columns-2 gap-4 sm:columns-3 lg:columns-4"
      >
        {reviewScreenshots.map((src, i) => (
          <div
            key={src}
            className="mb-4 break-inside-avoid border border-black/10 bg-gray-50 p-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0 hover:scale-[1.02]"
            style={{ transform: `rotate(${i % 2 === 0 ? -0.8 : 0.8}deg)` }}
          >
            <Image
              src={src}
              alt={`Google review ${i + 1}`}
              width={400}
              height={700}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>

      {/* Slow screenshot marquee */}
      <Marquee duration={60} direction="left">
        {reviewScreenshots.slice(0, 10).map((src, i) => (
          <div
            key={`m-${i}`}
            className="mx-2 w-44 shrink-0 overflow-hidden border border-black/10"
          >
            <Image
              src={src}
              alt=""
              width={200}
              height={350}
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </Marquee>

      <p className="micro-label text-center text-gray-400">
        {t("reviews.subtitle")}
      </p>
    </div>
  );
}

export default ReviewWall;
