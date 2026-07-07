"use client";

import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site-config";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function FinalCTA() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden bg-black py-28 text-white sm:py-36 lg:py-44">
      <div className="mx-auto max-w-[1600px] px-5 text-center lg:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="micro-label mb-8 text-white/50"
        >
          {t("finalEyebrow")}
        </motion.p>

        <TextReveal
          as="h2"
          text={t("finalTitle")}
          className="mx-auto font-serif text-[18vw] font-medium leading-[0.9] sm:text-[14vw] lg:text-[10rem]"
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/60"
        >
          {t("finalSubtitle")}
        </motion.p>

        {/* Phone numbers as design objects */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-14"
        >
          {siteConfig.phone.map((num) => (
            <Magnetic key={num} strength={0.3} radius={12}>
              <a
                href={`tel:+84${num.replace(/^0/, "")}`}
                data-cursor="link"
                className="group inline-flex items-center gap-4"
              >
                <Phone
                  size={20}
                  strokeWidth={1.25}
                  className="text-white/40 transition-colors group-hover:text-white"
                />
                <span className="font-serif text-3xl font-medium transition-opacity group-hover:opacity-70 sm:text-4xl lg:text-5xl">
                  {num}
                </span>
              </a>
            </Magnetic>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;
