import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/Layout/PageHeader";
import { ServiceAccordionSection } from "@/components/services/ServiceAccordionSection";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { customerGalleryImages } from "@/data/gallery";

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-white pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <ServiceAccordionSection />
        </div>
      </section>

      {/* Full-bleed hair-image band */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <ImageReveal
          src={customerGalleryImages[12]?.src ?? customerGalleryImages[0].src}
          alt=""
          fill
          sizes="100vw"
          className="h-full w-full"
        />
      </div>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <p className="max-w-2xl font-serif text-2xl font-medium leading-snug sm:text-3xl">
            {t("subtitle")}
          </p>
        </div>
      </section>
    </>
  );
}
