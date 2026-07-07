"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { customerGalleryImages } from "@/data/gallery";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { useIsCoarsePointer } from "@/lib/use-coarse-pointer";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

export function HorizontalGallery() {
  const t = useTranslations();
  const reduce = useReducedMotionSafe();
  const coarse = useIsCoarsePointer();
  const native = !!reduce || coarse;

  const items = customerGalleryImages;

  if (native) {
    return <NativeStrip items={items} />;
  }
  return <PinnedStrip items={items} />;
}

/* ------------------------------------------------------------------ */
/* Native horizontal scroller (mobile / reduced-motion)               */
/* ------------------------------------------------------------------ */
function NativeStrip({ items }: { items: { src: string }[] }) {
  const t = useTranslations();
  return (
    <section className="bg-black py-20 text-white lg:py-28">
      <Header />
      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 lg:px-10">
        {items.map((img, i) => (
          <figure
            key={`${i}-${img.src}`}
            className="relative h-[60vh] w-[78vw] shrink-0 snap-center overflow-hidden sm:w-[420px]"
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes="(max-width: 640px) 78vw, 420px"
              className="grayscale-img object-cover"
            />
          </figure>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-[1600px] px-5 lg:px-10">
        <Link
          href="/gallery"
          className="micro-label border-b border-white/40 pb-1"
        >
          {t("home.galleryLink")}
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-driven pinned film-strip (desktop, motion)                  */
/* ------------------------------------------------------------------ */
function PinnedStrip({ items }: { items: { src: string }[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [travel, setTravel] = useState(0);

  // Rule #1: measure in an isomorphic layout effect, set travel + mounted in
  // ONE commit so the tall outer height never paints before the stage exists.
  useIsomorphicLayoutEffect(() => {
    function measure() {
      const track = trackRef.current;
      if (!track || typeof window === "undefined") return;
      const next = Math.max(0, track.scrollWidth - window.innerWidth);
      setTravel(next);
      setMounted(true);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Function-form transform reads the latest travel via a ref each tick.
  const travelRef = useRef(travel);
  travelRef.current = travel;
  const xRaw = useTransform(scrollYProgress, (v) => v * -travelRef.current);
  const x = useSpring(xRaw, { stiffness: 90, damping: 22, mass: 0.4 });

  // Velocity → track skew (one layer), clamped ±6°.
  const velocity = useVelocity(scrollYProgress);
  const skewRaw = useTransform(velocity, [-3, 0, 3], [-6, 0, 6], { clamp: true });
  const skew = useSpring(skewRaw, { stiffness: 200, damping: 24 });

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ height: mounted ? `calc(100svh + ${travel}px)` : "100svh" }}
    >
      <div className="sticky top-0 flex h-[100svh] min-h-[520px] flex-col justify-center overflow-hidden">
        <div className="px-5 lg:px-10">
          <Header />
        </div>

        <motion.div
          ref={trackRef}
          style={{ x, skewY: skew }}
          className="mt-8 flex gap-4 will-change-transform"
        >
          {items.map((img, i) => (
            <motion.figure
              key={`${i}-${img.src}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-5% 0px" }}
              className="relative h-[58vh] w-[78vw] shrink-0 overflow-hidden sm:w-[440px]"
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="(max-width: 640px) 78vw, 440px"
                className="grayscale-img object-cover"
              />
              <span className="micro-label absolute bottom-4 left-4 text-white/70">
                {String(i + 1).padStart(3, "0")}
              </span>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* Section heading (shared) */
function Header() {
  const t = useTranslations();
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mx-auto flex w-full max-w-[1600px] items-end justify-between gap-6"
    >
      <div>
        <p className="micro-label mb-4 text-white/50">
          {t("home.galleryEyebrow")}
        </p>
        <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
          {t("home.galleryTitle")}
        </h2>
      </div>
      <Link
        href="/gallery"
        className="micro-label hidden shrink-0 border-b border-white/40 pb-1 sm:inline-block"
      >
        {t("home.galleryLink")}
      </Link>
    </motion.div>
  );
}

export default HorizontalGallery;
