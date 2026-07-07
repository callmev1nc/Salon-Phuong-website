"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

interface CursorVariant {
  variant: "default" | "media" | "drag" | "link";
  label: string;
}

/**
 * Custom blend cursor: a lagging ring + an instant dot, both `mix-blend-difference`
 * so they self-invert over any background. Hover targets opt in with a
 * `data-cursor` attribute ("media" | "drag" | "link") and optional
 * `data-cursor-label`. Hidden entirely on touch + reduced-motion.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>({
    variant: "default",
    label: "",
  });
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]") as
        | HTMLElement
        | null;
      if (el) {
        setVariant({
          variant: (el.dataset.cursor as CursorVariant["variant"]) || "link",
          label: el.dataset.cursorLabel || "",
        });
      } else {
        // Treat native interactive elements as a subtle "link" state.
        const interactive = (e.target as HTMLElement)?.closest?.(
          "a, button, [role='button']"
        );
        setVariant(
          interactive
            ? { variant: "link", label: "" }
            : { variant: "default", label: "" }
        );
      }
    };
    const down = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  const isMedia = variant.variant === "media";
  const ringSize = isMedia ? 96 : variant.variant === "link" ? 56 : 36;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-cursor mix-blend-difference"
      aria-hidden
    >
      {/* Lagging ring */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-white"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: down ? 0.6 : 1,
          scale: down ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {isMedia && (
          <span className="micro-label text-white">
            {variant.label || "View"}
          </span>
        )}
      </motion.div>
      {/* Instant dot */}
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-white"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: isMedia ? 0 : 6, height: isMedia ? 0 : 6 }}
      />
    </div>
  );
}

export default Cursor;
