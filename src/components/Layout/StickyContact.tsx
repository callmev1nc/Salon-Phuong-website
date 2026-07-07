"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site-config";
import { Magnetic } from "@/components/motion/Magnetic";

/**
 * Persistent contact affordances.
 * - Desktop (lg+): a magnetic Zalo bubble floating bottom-right.
 * - Mobile: a 2-up Call / Zalo sticky bar pinned to the bottom (replaces the
 *   old call-only bar).
 * Magnetic effects auto-disable under reduced-motion; the links always remain.
 */
export function StickyContact() {
  const t = useTranslations();
  const zaloHref = `https://zalo.me/${siteConfig.zalo}`;
  const callHref = `tel:+84${siteConfig.phone[0].replace(/^0/, "")}`;

  return (
    <>
      {/* Desktop Zalo bubble */}
      <div className="fixed bottom-6 right-6 z-sticky hidden lg:block">
        <Magnetic strength={0.5} radius={16}>
          <a
            href={zaloHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("common.zalo")}
            data-cursor="link"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition-colors hover:bg-gray-800"
          >
            <MessageCircle size={22} strokeWidth={1.5} />
          </a>
        </Magnetic>
      </div>

      {/* Mobile Call / Zalo bar */}
      <div className="fixed inset-x-0 bottom-0 z-sticky grid grid-cols-2 border-t border-black/10 bg-white lg:hidden">
        <a
          href={callHref}
          className="flex items-center justify-center gap-2 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white"
          style={{ backgroundColor: "#000" }}
        >
          <Phone size={16} strokeWidth={1.75} />
          {t("common.call")}
        </a>
        <a
          href={zaloHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-l border-white/20 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white"
          style={{ backgroundColor: "#111" }}
        >
          <MessageCircle size={16} strokeWidth={1.75} />
          {t("common.zalo")}
        </a>
      </div>
    </>
  );
}

export default StickyContact;
