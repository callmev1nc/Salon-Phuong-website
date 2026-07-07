"use client";

import { useTranslations, useLocale } from "next-intl";
import { PageHeader } from "@/components/Layout/PageHeader";
import { FAQAccordion } from "@/components/FAQAccordion";
import GoogleMap from "@/components/GoogleMap";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ClickToCall } from "@/components/ClickToCall";
import { siteConfig } from "@/data/site-config";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { motion } from "motion/react";

export default function ContactPage() {
  const t = useTranslations();
  const tc = useTranslations("contact");
  const locale = useLocale();
  const address = locale === "vi" ? siteConfig.address.fullVi : siteConfig.address.full;
  const days = locale === "vi" ? siteConfig.hours.noteVi : siteConfig.hours.note;
  const times = locale === "vi" ? siteConfig.hours.weekdaysVi : siteConfig.hours.weekdays;

  return (
    <>
      <PageHeader eyebrow={tc("eyebrow")} title={tc("title")} subtitle={tc("subtitle")} />

      {/* Giant contact block */}
      <section className="bg-white pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          {/* Phones */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="border-t border-black/10 py-10"
          >
            <p className="micro-label mb-5 text-gray-400">{tc("phone")}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-12">
              {siteConfig.phone.map((num) => (
                <a
                  key={num}
                  href={`tel:+84${num.replace(/^0/, "")}`}
                  data-cursor="link"
                  className="font-serif text-4xl font-medium transition-opacity hover:opacity-60 sm:text-5xl lg:text-6xl"
                >
                  {num}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Address */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-10 border-t border-black/10 py-10 sm:grid-cols-3"
          >
            <div>
              <p className="micro-label mb-3 text-gray-400">{tc("address")}</p>
              <p className="text-lg leading-relaxed">{address}</p>
              <a
                href={siteConfig.social.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="micro-label mt-3 inline-block border-b border-black pb-0.5"
              >
                {tc("getDirections")}
              </a>
            </div>
            <div>
              <p className="micro-label mb-3 text-gray-400">{tc("hours")}</p>
              <p className="text-lg">{days}</p>
              <p className="font-serif text-2xl">{times}</p>
            </div>
            <div>
              <p className="micro-label mb-3 text-gray-400">{tc("followUs")}</p>
              <div className="flex flex-wrap gap-3">
                <MagneticButton
                  href={`https://zalo.me/${siteConfig.zalo}`}
                  external
                  className="border border-black px-5 py-3 text-xs uppercase tracking-[0.18em]"
                >
                  {t("common.zalo")}
                </MagneticButton>
                <MagneticButton
                  href={siteConfig.social.facebook}
                  external
                  className="border border-black px-5 py-3 text-xs uppercase tracking-[0.18em]"
                >
                  Facebook
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Booking note + call */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col items-start gap-6 border-t border-b border-black/10 py-10 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="max-w-md text-gray-500">{tc("bookingNote")}</p>
            <ClickToCall
              index={0}
              showNumber
              label={tc("callNow")}
              className="bg-black px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-gray-50 py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <div className="grayscale h-80 w-full overflow-hidden border border-black/10 sm:h-96">
            <GoogleMap />
          </div>
        </div>
      </section>

      {/* Full FAQ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <h2 className="mb-10 font-serif text-3xl font-medium sm:text-4xl lg:text-5xl">
            {tc("faqTitle")}
          </h2>
          <FAQAccordion />
        </div>
      </section>
    </>
  );
}
