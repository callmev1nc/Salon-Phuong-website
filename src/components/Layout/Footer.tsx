"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site-config";
import { TextReveal } from "@/components/motion/TextReveal";

const navLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/services", labelKey: "nav.services" },
  { href: "/gallery", labelKey: "nav.gallery" },
  { href: "/reviews", labelKey: "nav.reviews" },
  { href: "/contact", labelKey: "nav.contact" },
] as const;

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10 lg:py-24">
        {/* Index column + contact */}
        <div className="grid grid-cols-2 gap-10 border-b border-white/15 pb-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-2">
            <p className="micro-label mb-5 text-white/50">
              {t("footer.colophon")}
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="micro-label text-white/70 transition-colors hover:text-white"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="micro-label mb-5 text-white/50">
              {t("contact.hours")}
            </p>
            <p className="text-sm leading-relaxed text-white/80">
              {siteConfig.hours.note}
            </p>
            <p className="text-sm text-white/80">
              {siteConfig.hours.weekdays}
            </p>
          </div>

          <div>
            <p className="micro-label mb-5 text-white/50">
              {t("contact.address")}
            </p>
            <p className="text-sm leading-relaxed text-white/80">
              {siteConfig.address.full}
            </p>
            <a
              href={siteConfig.social.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="micro-label mt-3 inline-block text-white/70 underline-offset-4 hover:text-white hover:underline"
            >
              {t("contact.getDirections")}
            </a>
          </div>
        </div>

        {/* Phone numbers as design objects */}
        <div className="flex flex-wrap items-end gap-x-12 gap-y-6 py-12">
          {siteConfig.phone.map((num) => (
            <a
              key={num}
              href={`tel:+84${num.replace(/^0/, "")}`}
              className="group block"
            >
              <span className="micro-label mb-1 block text-white/40">
                {t("contact.phone")}
              </span>
              <span className="font-serif text-3xl leading-none transition-opacity group-hover:opacity-60 sm:text-4xl lg:text-5xl">
                {num}
              </span>
            </a>
          ))}
        </div>

        {/* Giant wordmark */}
        <TextReveal
          as="h2"
          text={["Hair Salon", "Phương"]}
          className="font-serif text-[15vw] font-medium leading-[0.85] tracking-tight lg:text-[12rem]"
        />

        <div className="mt-10 flex flex-col gap-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Facebook
            </a>
            <a
              href={`https://zalo.me/${siteConfig.zalo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Zalo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
