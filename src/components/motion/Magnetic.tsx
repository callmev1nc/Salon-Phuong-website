"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { useIsCoarsePointer } from "@/lib/use-coarse-pointer";

export interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
  /** Max displacement in px. */
  radius?: number;
}

/**
 * Magnetic wrapper: the element drifts toward the cursor while hovered and
 * springs back on leave. Disabled on coarse pointers and reduced-motion.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  radius = 24,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const coarse = useIsCoarsePointer();
  const disabled = !!reduce || coarse;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.1 });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-radius, Math.min(radius, relX * strength)));
    y.set(Math.max(-radius, Math.min(radius, relY * strength)));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
