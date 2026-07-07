import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { StorySequence } from "@/components/home/StorySequence";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { HorizontalGallery } from "@/components/Gallery/HorizontalGallery";
import { ReviewsMarquee } from "@/components/home/ReviewsMarquee";
import { Hours } from "@/components/home/Hours";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FAQAccordion } from "@/components/FAQAccordion";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <>
      <Hero />
      <Philosophy />
      <StorySequence />
      <ServicesPreview />
      <HorizontalGallery />
      <ReviewsMarquee />
      <Hours />

      {/* FAQ preview */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="micro-label mb-5 text-gray-400">{t("faqEyebrow")}</p>
              <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
                {t("faqTitle")}
              </h2>
            </div>
            <Link
              href="/contact"
              className="micro-label hidden border-b border-black pb-1 sm:inline-block"
            >
              {t("faqLink")}
            </Link>
          </div>
          <FAQAccordion limit={3} />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
