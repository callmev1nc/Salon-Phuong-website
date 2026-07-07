"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { siteConfig } from "@/data/site-config";
import { fadeUp, viewportOnce } from "@/lib/motion";

/** Open/closed in Ho Chi Minh time. Computed in an effect (renders "—" first)
 *  to avoid a hydration mismatch (rule #12). */
function useOpenNow() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    function check() {
      const fmt = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const parts = fmt.format(new Date());
      const [h, m] = parts.split(":").map(Number);
      const mins = h * 60 + m;
      setOpen(mins >= 480 && mins <= 1230); // 08:00 – 20:30
    }
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);
  return open;
}

export function Hours() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const open = useOpenNow();

  const days = locale === "vi" ? siteConfig.hours.noteVi : siteConfig.hours.note;
  const times =
    locale === "vi" ? siteConfig.hours.weekdaysVi : siteConfig.hours.weekdays;

  return (
    <section className="border-y border-black/10 bg-white py-16 lg:py-20">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex items-center gap-5"
        >
          <p className="micro-label text-gray-400">{t("hoursEyebrow")}</p>
          <span
            className={`micro-label flex items-center gap-2 ${
              open === null
                ? "text-gray-300"
                : open
                ? "text-black"
                : "text-gray-400"
            }`}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: open === null ? "#d1d1d1" : open ? "#000" : "#bbb" }}
            />
            {open === null ? "—" : open ? tCommon("openNow") : tCommon("closedNow")}
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex items-baseline gap-4"
        >
          <span className="text-sm text-gray-400">{days}</span>
          <span className="font-serif text-2xl font-medium sm:text-3xl">
            {times}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default Hours;
