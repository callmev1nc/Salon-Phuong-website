"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { customerGalleryImages } from "@/data/gallery";
import { useIsCoarsePointer } from "@/lib/use-coarse-pointer";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

const FRAMES = [0, 9, 18, 27]
  .map((i) => customerGalleryImages[i]?.src)
  .filter(Boolean) as string[];

export function StorySequence() {
  const t = useTranslations();
  const coarse = useIsCoarsePointer();

  const steps = t.raw("story.steps") as { kicker: string; text: string }[];
  const n = Math.min(FRAMES.length, steps.length);

  // Only touch / coarse-pointer devices use the native swipe strip. Desktop
  // users always get the full carousel with arrows + pips (one whole photo per
  // view), regardless of their reduced-motion setting — reduced-motion just
  // disables autoplay and snaps instantly instead of springing.
  if (coarse) {
    return <NativeStrip steps={steps} n={n} />;
  }
  return <DesktopCarousel steps={steps} n={n} />;
}

/* ------------------------------------------------------------------ */
/* Desktop carousel (fine pointer) — arrows + pips + drag + autoplay  */
/* ------------------------------------------------------------------ */
function DesktopCarousel({
  steps,
  n,
}: {
  steps: { kicker: string; text: string }[];
  n: number;
}) {
  const t = useTranslations();
  const reduce = useReducedMotionSafe();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [panelWidth, setPanelWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dragStartX = useRef(0);
  const dragOffset = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useIsomorphicLayoutEffect(() => {
    function measure() {
      if (sectionRef.current) {
        setPanelWidth(sectionRef.current.offsetWidth);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useMotionValue(0);

  // Move to a target x: spring normally, a gentle eased slide under
  // reduced-motion (no bouncy spring, but still a smooth slide so the
  // owner-requested auto-slide reads well).
  const moveTo = useCallback(
    (target: number) => {
      if (reduce) {
        animate(x, target, { duration: 0.5, ease: "easeInOut" });
      } else {
        animate(x, target, {
          type: "spring",
          stiffness: 90,
          damping: 22,
          mass: 0.4,
        });
      }
    },
    [reduce, x]
  );

  useEffect(() => {
    if (panelWidth === 0) return;
    moveTo(-active * panelWidth);
  }, [active, panelWidth, moveTo]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % n);
    }, 5000);
  }, [n]);

  useEffect(() => {
    // Auto-slide (owner request) — pauses while the user is interacting.
    if (!dragging && !hovered) {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [dragging, hovered, startTimer]);

  function goTo(i: number) {
    setActive(((i % n) + n) % n);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  }

  function goNext() {
    goTo(active + 1);
  }
  function goPrev() {
    goTo(active - 1);
  }

  function onPointerDown(e: React.PointerEvent) {
    if (!sectionRef.current) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragStartX.current = e.clientX;
    dragOffset.current = 0;
    setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging || e.buttons !== 1 || !sectionRef.current) return;
    dragOffset.current = e.clientX - dragStartX.current;
    x.set(-active * panelWidth + dragOffset.current);
  }

  function onPointerUp() {
    setDragging(false);
    const threshold = panelWidth * 0.15;
    if (dragOffset.current > threshold) {
      goPrev();
    } else if (dragOffset.current < -threshold) {
      goNext();
    } else {
      moveTo(-active * panelWidth);
    }
    dragOffset.current = 0;
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-black"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="flex h-full will-change-transform"
        style={{ x }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        data-cursor="drag"
        data-cursor-label="Drag"
      >
        {Array.from({ length: n }).map((_, i) => (
          <div key={i} className="relative h-full min-w-full">
            <Image
              src={FRAMES[i]}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
            <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-24 lg:px-10">
              <div className="mx-auto w-full max-w-[1600px]">
                <p className="micro-label mb-6 text-white/50">
                  {t("home.storyEyebrow")}
                </p>
                <h2 className="max-w-[16ch] font-serif text-3xl font-medium leading-[1.1] text-white sm:text-4xl lg:text-6xl">
                  <span className="mr-4 align-middle text-white/30">
                    {steps[i].kicker}
                  </span>
                  <span className="align-middle">{steps[i].text}</span>
                </h2>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Previous step"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Next step"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {Array.from({ length: n }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to step ${i + 1}`}
            aria-current={active === i ? "true" : undefined}
            className="h-1 w-12 rounded-full transition-colors duration-500"
            style={{
              backgroundColor:
                active === i ? "#fff" : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Native horizontal scroller (touch / coarse-pointer only)           */
/* ------------------------------------------------------------------ */
function NativeStrip({
  steps,
  n,
}: {
  steps: { kicker: string; text: string }[];
  n: number;
}) {
  const t = useTranslations();
  return (
    <section className="h-[100svh] bg-black text-white">
      <div className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto">
        {Array.from({ length: n }).map((_, i) => (
          <div
            key={i}
            className="relative flex h-full w-full shrink-0 snap-center flex-col justify-end overflow-hidden pb-24 pl-5 lg:pl-10"
          >
            <Image
              src={FRAMES[i]}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
            <div className="relative z-10">
              <p className="micro-label mb-6 text-white/50">
                {t("home.storyEyebrow")}
              </p>
              <h2 className="max-w-[16ch] font-serif text-3xl font-medium leading-[1.1] text-white sm:text-4xl lg:text-6xl">
                <span className="mr-4 align-middle text-white/30">
                  {steps[i].kicker}
                </span>
                <span className="align-middle">{steps[i].text}</span>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StorySequence;
