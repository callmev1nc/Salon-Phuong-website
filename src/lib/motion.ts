import type { Variants } from "motion/react";

/** House easing — expo-out. The single feel of the whole site. */
export const EASE = [0.16, 1, 0.3, 1] as const;
/** Dramatic in/out wipe easing. */
export const EASE_INOUT = [0.83, 0, 0.17, 1] as const;

/** All durations live in the 0.6–1.2s band — slow enough to feel cinematic. */
export const DUR = { fast: 0.6, base: 0.8, slow: 1.1, reveal: 1.2 } as const;

/** Stagger deltas between siblings. */
export const STAGGER = { fast: 0.06, base: 0.09, slow: 0.12 } as const;

/** Parent container: stagger children line-by-line. */
export const staggerLines = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.slow, delayChildren: 0.05 } },
} satisfies Variants;

/** Parent container: stagger a grid of tiles. */
export const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.fast } },
} satisfies Variants;

/** A single masked line rising from behind an overflow-hidden mask. */
export const maskLine = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DUR.slow, ease: EASE } },
} satisfies Variants;

/** Body/eyebrow fade-up. */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
} satisfies Variants;

/** Image clip wipe — wrapper insets to reveal. */
export const clipUp = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  show: { clipPath: "inset(0% 0 0 0)", transition: { duration: DUR.reveal, ease: EASE } },
} satisfies Variants;

/** Shared whileInView viewport config — fire once, slightly before fully in view. */
export const viewportOnce = { once: true, margin: "-12% 0px" } as const;
