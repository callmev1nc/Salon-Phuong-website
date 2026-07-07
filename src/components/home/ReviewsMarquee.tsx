"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Marquee } from "@/components/motion/Marquee";
import { CountUp } from "@/components/motion/CountUp";
import { fadeUp, viewportOnce, EASE } from "@/lib/motion";
import { Link } from "@/i18n/routing";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          strokeWidth={0}
          fill={i < n ? "currentColor" : "none"}
          className={i < n ? "text-black" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

export function ReviewsMarquee() {
  const t = useTranslations();
  const reviews = t.raw("reviews.reviews") as {
    name: string;
    text: string;
    rating: number;
  }[];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % reviews.length),
      4500
    );
    return () => clearInterval(id);
  }, [reviews.length]);

  // Split reviews across two opposite-direction rows.
  const half = Math.ceil(reviews.length / 2);
  const rowA = reviews.slice(0, half);
  const rowB = reviews.slice(half);

  const Chip = ({ r }: { r: (typeof reviews)[number] }) => (
    <div className="mx-3 flex w-[300px] shrink-0 flex-col gap-3 border border-black/10 p-6">
      <Stars n={r.rating} />
      <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
        &ldquo;{r.text}&rdquo;
      </p>
      <p className="micro-label text-black">{r.name}</p>
    </div>
  );

  return (
    <section className="overflow-hidden bg-gray-50 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto mb-14 max-w-[1600px] px-5 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="micro-label mb-5 text-gray-400">
              {t("reviews.eyebrow")}
            </p>
            <h2 className="max-w-[14ch] font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              {t("reviews.title")}
            </h2>
          </div>
          <div className="flex items-baseline gap-3">
            <CountUp
              to={4.9}
              decimals={1}
              className="font-serif text-5xl font-medium lg:text-6xl"
            />
            <div className="flex flex-col">
              <Stars />
              <span className="micro-label mt-1 text-gray-400">
                {t("reviews.ratingLabel")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dual marquee */}
      <Marquee duration={32} direction="left" className="mb-3">
        {rowA.map((r, i) => (
          <Chip key={`a-${i}`} r={r} />
        ))}
      </Marquee>
      <Marquee duration={38} direction="right">
        {rowB.map((r, i) => (
          <Chip key={`b-${i}`} r={r} />
        ))}
      </Marquee>

      {/* Rotating pull-quote */}
      <div className="mx-auto mt-16 max-w-3xl px-5 text-center lg:px-10">
        <div className="relative min-h-[8rem] sm:min-h-[7rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="font-serif text-2xl font-medium italic leading-snug text-black sm:text-3xl">
                &ldquo;{reviews[active]?.text}&rdquo;
              </p>
              <footer className="micro-label mt-5 text-gray-400">
                {reviews[active]?.name}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <Link
          href="/reviews"
          className="micro-label mt-8 inline-block border-b border-black pb-1"
        >
          {t("reviews.title")}
        </Link>
      </div>
    </section>
  );
}

export default ReviewsMarquee;
