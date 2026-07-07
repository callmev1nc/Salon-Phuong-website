"use client";

import { useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { useLenis } from "@/lib/lenis";
import LanguageSwitch from "./LanguageSwitch";
import { EASE, staggerLines, maskLine } from "@/lib/motion";

const navLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/services", labelKey: "nav.services" },
  { href: "/gallery", labelKey: "nav.gallery" },
  { href: "/reviews", labelKey: "nav.reviews" },
  { href: "/contact", labelKey: "nav.contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations();
  const pathname = usePathname();
  const { setLocked } = useLenis();

  useEffect(() => {
    setLocked(open);
    if (typeof document !== "undefined") {
      document.body.style.overflow = open ? "hidden" : "";
    }
    return () => {
      setLocked(false);
      if (typeof document !== "undefined") document.body.style.overflow = "";
    };
  }, [open, setLocked]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-menu flex flex-col bg-black text-white"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-5">
            <span className="font-serif text-xl tracking-[0.04em]">PHƯƠNG</span>
            <button
              onClick={onClose}
              aria-label={t("common.close")}
              className="relative z-[121] -mr-2 p-2"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-5">
            <motion.ul
              variants={staggerLines}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href} className="overflow-hidden">
                    <motion.div variants={maskLine}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`block py-1 font-serif text-5xl font-medium leading-tight transition-opacity sm:text-6xl ${
                          active ? "opacity-100" : "opacity-50"
                        }`}
                      >
                        {t(link.labelKey)}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </motion.ul>
          </nav>

          <div className="mx-auto w-full max-w-[1600px] px-5 pb-10 pt-6">
            <p className="micro-label mb-4 text-white/50">{t("contact.phone")}</p>
            <div className="flex flex-col gap-1">
              {siteConfig.phone.map((num) => (
                <a
                  key={num}
                  href={`tel:+84${num.replace(/^0/, "")}`}
                  className="font-serif text-2xl"
                >
                  {num}
                </a>
              ))}
            </div>
            <div className="mt-6 text-white">
              <LanguageSwitch />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
