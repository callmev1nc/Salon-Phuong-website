"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import type { Review } from "@/data/reviews";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="flex flex-col gap-5 border-t border-black/15 pt-6"
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            strokeWidth={0}
            fill={i < review.rating ? "currentColor" : "none"}
            className={i < review.rating ? "text-black" : "text-gray-300"}
          />
        ))}
      </div>
      <blockquote className="font-serif text-xl font-medium leading-snug text-black sm:text-2xl">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="micro-label text-gray-500">{review.name}</figcaption>
    </motion.figure>
  );
}

export default ReviewCard;
