"use client";

import { useRef } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { beforeAfterPairs, hasBeforeAfterPairs } from "@/data/before-after";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { fadeUp, viewportOnce, EASE } from "@/lib/motion";

export function BeforeAfterSlider() {
  const t = useTranslations("gallery");
  const reduce = useReducedMotionSafe();
  const containerRef = useRef<HTMLDivElement>(null);

  // Wipe-reveal variant: same image, "before" is treated (dark + blurred),
  // "after" is the clean photo. Swaps to true pairs with no code change.
  const pair = beforeAfterPairs[0];

  const pos = useMotionValue(50);
  const clipRight = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleLeft = useTransform(pos, (v) => `${v}%`);

  function onPointerDown(e: React.PointerEvent) {
    if (reduce || !containerRef.current) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    update(e.clientX);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (reduce || !containerRef.current) return;
    if (e.buttons !== 1) return;
    update(e.clientX);
  }
  function update(clientX: number) {
    const rect = containerRef.current!.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    pos.set(Math.max(2, Math.min(98, pct)));
  }
  function reset() {
    if (reduce) return;
    animate(pos, 50, { duration: 0.45, ease: EASE });
  }

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-10"
        >
          <p className="micro-label mb-5 text-gray-400">
            {t("beforeAfterEyebrow")}
          </p>
          <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            {t("beforeAfterTitle")}
          </h2>
          <p className="mt-3 max-w-md text-sm text-gray-500">
            {t("beforeAfterSubtitle")}
          </p>
        </motion.div>

        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={reset}
          onPointerLeave={reset}
          data-cursor="drag"
          data-cursor-label="Drag"
          className="relative aspect-[16/10] w-full select-none overflow-hidden bg-gray-100 sm:aspect-[16/7]"
        >
          {/* Before (treated) */}
          <Image
            src={pair.before}
            alt=""
            fill
            sizes="100vw"
            className="grayscale-img object-cover brightness-[0.45] blur-[1px]"
            priority
          />
          {/* After (clean) — clipped to the wipe position */}
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: reduce ? "inset(0 50% 0 0)" : clipRight }}
          >
            <Image
              src={pair.after}
              alt=""
              fill
              sizes="100vw"
              className="grayscale-img object-cover"
              priority
            />
          </motion.div>

          {/* Handle */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-px bg-white"
            style={{ left: reduce ? "50%" : handleLeft }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white/10 text-xs uppercase tracking-widest text-white backdrop-blur-sm">
              ⇄
            </span>
          </motion.div>
        </div>

        {!hasBeforeAfterPairs && (
          <p className="micro-label mt-5 text-gray-300">
            Live wipe-reveal — real before/after pairs coming soon.
          </p>
        )}
      </div>
    </section>
  );
}

export default BeforeAfterSlider;
