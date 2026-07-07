"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site-config";
import { EASE, staggerLines, maskLine, fadeUp } from "@/lib/motion";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";

export function Hero() {
  const t = useTranslations("home");
  const ref = useRef<HTMLElement>(null);

  // Parallax + dissolve as the hero scrolls out of view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Background: grayscale, ken-burns, parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 14, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src="/images/shop/shop-0.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="grayscale-img object-cover opacity-70"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-center px-5 lg:px-10"
        style={{ y: contentY, opacity }}
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="micro-label mb-6 text-white/70"
          >
            {t("eyebrow")}
          </motion.p>

          <TextReveal
            as="h1"
            text={t("heroTitle")}
            className="max-w-[14ch] font-serif text-[18vw] font-medium leading-[0.9] text-white sm:text-[12vw] lg:text-[9rem]"
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-md text-base text-white/80 sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.45 }}
            className="mt-10"
          >
            <Magnetic strength={0.4} radius={16}>
              <a
                href={`tel:+84${siteConfig.phone[0].replace(/^0/, "")}`}
                data-cursor="link"
                className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-black transition-colors hover:bg-white/85"
              >
                <Phone size={15} strokeWidth={1.75} />
                {t("cta")}
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll prompt */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: EASE }}
        style={{ opacity }}
      >
        <span className="micro-label flex flex-col items-center gap-2 text-white/50">
          {t("scrollPrompt")}
          <motion.span
            className="block h-8 w-px bg-white/40"
            style={{ transformOrigin: "top" }}
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

export default Hero;
