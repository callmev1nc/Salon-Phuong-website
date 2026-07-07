"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/Layout/PageHeader";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Tilt } from "@/components/motion/Tilt";
import GoogleMap from "@/components/GoogleMap";
import { siteConfig } from "@/data/site-config";
import { fadeUp, viewportOnce, staggerLines, maskLine } from "@/lib/motion";
import { motion } from "motion/react";

const shopPhotos = Array.from({ length: 5 }, (_, i) => `/images/shop/shop-${i}.webp`);

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      {/* Portrait + story */}
      <section className="bg-white pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="order-2 space-y-6 text-base leading-relaxed text-gray-600 lg:order-1">
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
              {t("paragraph1")}
            </motion.p>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
              {t("paragraph2")}
            </motion.p>
          </div>
          <div className="order-1 aspect-[4/5] w-full overflow-hidden bg-gray-100 lg:order-2">
            <Tilt max={6}>
              <ImageReveal
                src="/images/about/employee.jpg"
                alt={t("title")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full"
              />
            </Tilt>
          </div>
        </div>
      </section>

      {/* Shop contact sheet */}
      <section className="bg-gray-50 py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {shopPhotos.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden bg-gray-200 ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/5]"
                }`}
              >
                <ImageReveal
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values manifesto */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <motion.h2
            variants={staggerLines}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mb-14 max-w-[12ch] font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl"
          >
            <span className="block overflow-hidden">
              <motion.span variants={maskLine} className="block">
                {t("valuesTitle")}
              </motion.span>
            </span>
          </motion.h2>
          <div className="space-y-px">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="flex items-baseline gap-8 border-t border-black/10 py-8 last:border-b"
              >
                <span className="micro-label w-10 shrink-0 text-gray-400">
                  {String(i).padStart(2, "0")}
                </span>
                <p className="max-w-2xl font-serif text-xl font-medium leading-snug sm:text-2xl">
                  {t(`value${i}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="bg-gray-50 py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mb-3 font-serif text-3xl font-medium sm:text-4xl"
          >
            {t("visitUs")}
          </motion.h2>
          <p className="mb-10 text-gray-500">{t("address")}</p>
          <div className="h-80 w-full overflow-hidden border border-black/10 sm:h-96">
            <GoogleMap />
          </div>
        </div>
      </section>
    </>
  );
}
