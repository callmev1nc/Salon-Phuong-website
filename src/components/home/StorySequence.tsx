"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useTranslations } from "next-intl";
import { customerGalleryImages } from "@/data/gallery";
import { EASE } from "@/lib/motion";

// Four frames for the consultation → transformation arc.
const FRAMES = [0, 9, 18, 27]
  .map((i) => customerGalleryImages[i]?.src)
  .filter(Boolean) as string[];

export function StorySequence() {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const steps = t.raw("story.steps") as { kicker: string; text: string }[];
  const n = Math.min(FRAMES.length, steps.length);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Discrete active index — SSR-safe (defaults to 0, updates client-side).
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.round(v * (n - 1));
    setActive(Math.max(0, Math.min(n - 1, idx)));
  });

  return (
    <section
      ref={ref}
      className="relative bg-black"
      style={{ height: `${n * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Positioned wrapper so the fill images have a valid containing block. */}
        <div className="absolute inset-0">
          {FRAMES.slice(0, n).map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="100vw"
              className="grayscale-img object-cover opacity-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ opacity: active === i ? 0.55 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        </div>

        {/* Text morph */}
        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-20 lg:px-10">
          <div className="mx-auto w-full max-w-[1600px]">
            <p className="micro-label mb-6 text-white/50">{t("home.storyEyebrow")}</p>
            <div className="relative min-h-[5.5em] sm:min-h-[4.5em] lg:min-h-[6rem]">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="max-w-[16ch] font-serif text-3xl font-medium leading-[1.1] text-white sm:text-4xl lg:text-6xl"
                >
                  <span className="mr-4 align-middle text-white/30">
                    {steps[active]?.kicker}
                  </span>
                  <span className="align-middle">{steps[active]?.text}</span>
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Progress pips */}
            <div className="mt-10 flex gap-2">
              {Array.from({ length: n }).map((_, i) => (
                <span
                  key={i}
                  className="h-px flex-1 bg-white/20 transition-colors duration-500"
                  style={{ backgroundColor: active === i ? "#fff" : "rgba(255,255,255,0.2)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StorySequence;
