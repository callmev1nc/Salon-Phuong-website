// Optimize the boss hero photo to webp.
// Run: node scripts/optimize-hero.mjs
import sharp from "sharp";

const src = "picture/Boss/Screenshot 2026-07-07 215839.png";
const out = "public/images/hero/boss.webp";

await sharp(src).webp({ quality: 82 }).toFile(out);

const { size } = await import("node:fs").then((fs) => fs.statSync(out));
console.log(`boss.webp: ${(size / 1024).toFixed(0)} KB`);
