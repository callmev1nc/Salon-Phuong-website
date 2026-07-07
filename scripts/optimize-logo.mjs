// One-off asset pass: shrink the 2.2MB logo into optimized webp variants
// (header/footer) + a compact PNG kept for OpenGraph image meta.
// Run: node scripts/optimize-logo.mjs
import sharp from "sharp";
import { renameSync, statSync } from "node:fs";

const src = "public/images/logo/logo.png";
const before = statSync(src).size;
console.log(`source: ${(before / 1024).toFixed(0)} KB`);

// Variants first (they only read the source).
await sharp(src).resize(160, 160, { fit: "cover" }).webp({ quality: 85 }).toFile("public/images/logo/logo@2x.webp");
await sharp(src).resize(80, 80, { fit: "cover" }).webp({ quality: 85 }).toFile("public/images/logo/logo@1x.webp");

// Compact PNG for OG — write to temp, then replace the source.
await sharp(src).resize(256, 256, { fit: "cover" }).png({ quality: 85, compressionLevel: 9 }).toFile("public/images/logo/logo.tmp.png");
renameSync("public/images/logo/logo.tmp.png", src);

const after = statSync("public/images/logo/logo.png").size;
const w1 = statSync("public/images/logo/logo@1x.webp").size;
const w2 = statSync("public/images/logo/logo@2x.webp").size;
console.log(`logo.png: ${(after / 1024).toFixed(0)} KB (was ${(before / 1024).toFixed(0)} KB)`);
console.log(`logo@1x.webp: ${(w1 / 1024).toFixed(0)} KB`);
console.log(`logo@2x.webp: ${(w2 / 1024).toFixed(0)} KB`);
