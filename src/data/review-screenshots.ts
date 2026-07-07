/**
 * Real Google review screenshots (kept in COLOR — they're evidence, not styling).
 * Lives at /public/images/reviews/review-NN.png (21 shots).
 * Generated; if you add more, just drop matching files and extend this array.
 */
const TOTAL_REVIEW_SHOTS = 21;

export const reviewScreenshots: string[] = Array.from(
  { length: TOTAL_REVIEW_SHOTS },
  (_, i) => `/images/reviews/review-${String(i + 1).padStart(2, "0")}.png`
);
