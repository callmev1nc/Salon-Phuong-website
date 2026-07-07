"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { useTranslations } from "next-intl";

/**
 * EN / VI toggle. Preserves the current route via the locale-aware router.
 * Uses currentColor + opacity so it inherits its container's text colour and
 * therefore works under the blend header, the opaque header, and the dark menu.
 */
export function LanguageSwitch() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [, startTransition] = useTransition();

  const currentLocale = params.locale as string;
  const targetLocale = currentLocale === "en" ? "vi" : "en";

  function switchLocale() {
    startTransition(() => {
      router.replace(pathname, { locale: targetLocale });
    });
  }

  return (
    <button
      onClick={switchLocale}
      className="micro-label flex items-center gap-1.5 transition-opacity hover:opacity-100"
      aria-label={t("languageSwitch")}
    >
      <span className={currentLocale === "en" ? "opacity-100" : "opacity-40"}>
        EN
      </span>
      <span aria-hidden className="opacity-40">
        /
      </span>
      <span className={currentLocale === "vi" ? "opacity-100" : "opacity-40"}>
        VI
      </span>
    </button>
  );
}

export default LanguageSwitch;
