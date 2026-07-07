"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE, EASE_INOUT } from "@/lib/motion";

const SESSION_KEY = "salon-phuong-intro-played";

/**
 * Session-gated intro curtain: a black wipe reveals "PHƯƠNG", holds a beat,
 * then wipes away. Plays once per browser session. Skipped entirely under
 * reduced-motion or if already seen.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), 1700);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-intro flex items-center justify-center bg-black"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: EASE_INOUT }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <motion.h2
              className="font-serif text-6xl font-medium tracking-[0.04em] text-white sm:text-8xl"
              initial={{ letterSpacing: "0.3em", opacity: 0 }}
              animate={{ letterSpacing: "0.04em", opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              PHƯƠNG
            </motion.h2>
            <motion.p
              className="micro-label mt-5 text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Hair Salon — District 10
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Intro;
