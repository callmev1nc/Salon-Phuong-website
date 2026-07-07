"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

interface LenisContextValue {
  lenis: Lenis | null;
  /** Lock/unlock smooth scroll (used by lightbox + mobile menu). */
  setLocked: (locked: boolean) => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  setLocked: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafId = useRef<number | null>(null);
  // Respect the OS reduced-motion setting — Lenis disabled entirely if set.
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) return;

    const instance = new Lenis({
      // NEVER set wrapper/content — it breaks position:sticky + useScroll.
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(instance);

    const raf = (time: number) => {
      instance.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    rafId.current = requestAnimationFrame(raf);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      instance.destroy();
      setLenis(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocked = useCallback(
    (locked: boolean) => {
      if (!lenis) return;
      if (locked) lenis.stop();
      else lenis.start();
    },
    [lenis]
  );

  return (
    <LenisContext.Provider value={{ lenis, setLocked }}>
      {children}
    </LenisContext.Provider>
  );
}
