"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { clipUp, EASE, DUR, viewportOnce } from "@/lib/motion";

export interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  /** Tailwind classes for the outer frame (sizing/aspect). */
  className?: string;
  /** next/image sizes attribute (provide for correct srcset). */
  sizes?: string;
  priority?: boolean;
  /** Treat as evidence imagery (reviews) — keep full colour, no grayscale. */
  color?: boolean;
  once?: boolean;
}

// Counter-zoom: the image starts 15% larger and settles to 1 as the mask wipes.
const zoomInner: Variants = {
  hidden: { scale: 1.18 },
  show: { scale: 1, transition: { duration: DUR.reveal, ease: EASE } },
};

/**
 * Image clip reveal + counter-zoom: a wrapper wipes open with clipPath inset
 * while the inner next/image scales 1.18→1. Use for every editorial photo.
 * Supports `fill` (parent sizes the frame) or intrinsic width/height.
 */
export function ImageReveal({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  sizes,
  priority,
  color = false,
  once = true,
}: ImageRevealProps) {
  return (
    <motion.div
      className={`${fill ? "relative " : ""}${className ?? ""}`}
      variants={clipUp}
      initial="hidden"
      whileInView="show"
      viewport={once ? viewportOnce : { once: false }}
    >
      <motion.div variants={zoomInner} className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          {...(fill
            ? { fill }
            : { width: width ?? 800, height: height ?? 600 })}
          sizes={sizes}
          priority={priority}
          className={`h-full w-full object-cover ${color ? "" : "grayscale-img"}`}
        />
      </motion.div>
    </motion.div>
  );
}

export default ImageReveal;
