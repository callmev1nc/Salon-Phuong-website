/**
 * Before/After transformation pairs.
 *
 * ⚠️ The owner has not yet supplied real before/after photos. Until they do,
 * we ship a single-photo WIPE-REVEAL variant on existing gallery shots so the
 * feature exists and is wired end-to-end. Drop matching `NN-before.jpg` /
 * `NN-after.jpg` pairs into /public/images/before-after/ and flip
 * `hasBeforeAfterPairs` to true — no component code needs to change.
 *
 * When `hasBeforeAfterPairs` is true, `pairs` must reference one `before` and
 * one `after` per entry.
 */
export interface BeforeAfterPair {
  before: string;
  after: string;
}

// Flip to true once real pairs are in /public/images/before-after/.
export const hasBeforeAfterPairs = false;

// Fallback (single-photo wipe-reveal): before/after point to the SAME image —
// the slider then reveals the full image against a blurred/bw version of itself.
export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    before: "/images/customers/476237842_1045473420927395_8834375606442426673_n.jpg",
    after: "/images/customers/476237842_1045473420927395_8834375606442426673_n.jpg",
  },
  {
    before: "/images/customers/476897030_1048446403963430_2463695709518587982_n.jpg",
    after: "/images/customers/476897030_1048446403963430_2463695709518587982_n.jpg",
  },
];
