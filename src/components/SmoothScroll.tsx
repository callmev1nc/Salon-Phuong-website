"use client";

import type { ReactNode } from "react";
import { LenisProvider } from "@/lib/lenis";

/**
 * Mounts Lenis smooth scroll and exposes stop/start via context so the
 * lightbox and mobile menu can lock scrolling. Disabled entirely under
 * reduced-motion (see lib/lenis.tsx).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>;
}

export default SmoothScroll;
