import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MotionConfig } from "motion/react";
import { Inter, Playfair_Display } from "next/font/google";
import { routing } from "@/i18n/routing";
import { GlobalShell } from "@/components/GlobalShell";

// Load fonts via next/font (no CSS @import), expose as CSS vars consumed by Tailwind.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const host = "https://hair-salon-phuong.vercel.app";

  return {
    metadataBase: new URL(host),
    title: {
      default: t("title"),
      template: `%s — ${t("title")}`,
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      images: ["/images/logo/logo.png"],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: `${host}/`,
        vi: `${host}/vi`,
        "x-default": `${host}/`,
      },
    },
  };
}

// Blocking script: tag the pointer type before first paint so the custom cursor
// (or its absence) is correct with no flash, and degrades to native cursor without JS.
const finePointerScript = `
(function(){try{
  var fine = window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(fine){document.documentElement.classList.add('fine-pointer');}
}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale — next-intl middleware normally handles this, but guard SSR too.
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: finePointerScript }} />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <NextIntlClientProvider messages={messages}>
            <GlobalShell>{children}</GlobalShell>
          </NextIntlClientProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
