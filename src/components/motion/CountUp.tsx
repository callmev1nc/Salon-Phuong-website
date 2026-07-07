"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { EASE } from "@/lib/motion";

export interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  /** Decimal places to render. */
  decimals?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

/**
 * Counts a number up from `from` to `to` when it scrolls into view.
 * Reduced-motion renders the final value immediately.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  className,
  suffix = "",
  prefix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) =>
    `${prefix}${v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`
  );

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, { duration, ease: EASE });
    return () => controls.stop();
  }, [inView, reduce, to, duration, count]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}

export default CountUp;
