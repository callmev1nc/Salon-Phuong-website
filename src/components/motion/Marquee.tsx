"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationControls } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

export interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
  direction?: "left" | "right";
  /** Pause the loop while hovered. */
  pauseOnHover?: boolean;
}

/**
 * Seamless marquee: renders the children twice and translates -50%→0 (or
 * reverse) on a linear infinite loop, so the splice is invisible. Pauses on
 * hover. Disabled (static) under reduced-motion.
 */
export function Marquee({
  children,
  className,
  duration = 28,
  direction = "left",
  pauseOnHover = true,
}: MarqueeProps) {
  const controls = useAnimationControls();
  const reduce = useReducedMotionSafe();
  const paused = useRef(false);

  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  useEffect(() => {
    if (reduce || paused.current) return;
    controls.start({
      x: [from, to],
      transition: { duration, ease: "linear", repeat: Infinity },
    });
  }, [controls, duration, from, to, reduce]);

  function play() {
    paused.current = false;
    if (reduce) return;
    controls.start({
      x: [from, to],
      transition: { duration, ease: "linear", repeat: Infinity },
    });
  }
  function pause() {
    paused.current = true;
    controls.stop();
  }

  if (reduce) {
    return (
      <div className={`overflow-hidden ${className ?? ""}`}>
        <div className="flex w-max">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden ${className ?? ""}`}
      onMouseEnter={pauseOnHover ? pause : undefined}
      onMouseLeave={pauseOnHover ? play : undefined}
    >
      <motion.div className="flex w-max" animate={controls}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default Marquee;
