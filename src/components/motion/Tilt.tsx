"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { useIsCoarsePointer } from "@/lib/use-coarse-pointer";

export interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
}

/**
 * 3D pointer-tilt: the element rotates slightly toward the cursor, with
 * perspective on the parent. Disabled on coarse pointers + reduced-motion
 * (renders flat).
 */
export function Tilt({ children, className, max = 8 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const coarse = useIsCoarsePointer();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 18, mass: 0.2 });
  const sy = useSpring(py, { stiffness: 150, damping: 18, mass: 0.2 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  if (reduce || coarse) {
    return (
      <div className={`h-full w-full ${className ?? ""}`}>{children}</div>
    );
  }

  return (
    <div style={{ perspective: 1000 }} className={`h-full w-full ${className ?? ""}`}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Tilt;
