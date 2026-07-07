"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Hydration-safe reduced-motion hook.
 *
 * motion's `useReducedMotion()` can return the real OS value on the client's
 * first render while the server renders `null`/`false` — a hydration mismatch
 * for users with "reduce motion" ON. This returns `false` until mounted, so
 * server and initial-client renders always agree; the real value applies after
 * mount. Use anywhere a component BRANCHES ITS STRUCTURE on reduced-motion.
 */
export function useReducedMotionSafe() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? reduce : false;
}
