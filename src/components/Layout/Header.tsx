"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { Magnetic } from "@/components/motion/Magnetic";
import LanguageSwitch from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";

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

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = !scrolled;
  // Rule #3: blend-difference ONLY while transparent; opaque (no blend) once scrolled.
  const chrome = transparent
    ? "text-white mix-blend-difference"
    : "text-black bg-white border-b border-gray-100";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-header">
        <div className={`transition-colors duration-500 ${chrome}`}>
          <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 lg:h-20 lg:px-10">
            {/* Wordmark (text-only — blends cleanly, no image-inversion issues) */}
            <Link
              href="/"
              className="flex items-baseline gap-3"
              aria-label={t("nav.home")}
            >
              <span className="font-serif text-xl font-medium tracking-[0.04em] lg:text-2xl">
                PHƯƠNG
              </span>
              <span className="micro-label hidden opacity-60 sm:inline">
                Hair Salon
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="micro-label relative py-1 opacity-80 transition-opacity hover:opacity-100"
                  >
                    {t(link.labelKey)}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-current"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right cluster: language + call + hamburger */}
            <div className="flex items-center gap-5">
              <LanguageSwitch />
              <Magnetic strength={0.4} radius={14} className="hidden lg:block">
                <a
                  href={`tel:+84${siteConfig.phone[0].replace(/^0/, "")}`}
                  className="micro-label flex items-center gap-2 rounded-full border border-current px-4 py-2 transition-opacity hover:opacity-70"
                >
                  {t("common.call")}
                </a>
              </Magnetic>
              <button
                className="lg:hidden"
                onClick={() => setMenuOpen(true)}
                aria-label={t("common.menu")}
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Header;
