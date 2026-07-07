"use client";

import { useEffect, useState } from "react";

/**
 * True on touch / coarse-pointer devices. SSR-safe (false on the server).
 * Used alongside `useReducedMotion()` to disable cursor/magnetic/tilt effects
 * where they'd harm UX on touch.
 */
export function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return coarse;
}
