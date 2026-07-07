import { useTranslations } from "next-intl";
import { HorizontalGallery } from "@/components/Gallery/HorizontalGallery";
import { GalleryGrid } from "@/components/Gallery/GalleryGrid";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PageHeader } from "@/components/Layout/PageHeader";

export default function GalleryPage() {
  const t = useTranslations("gallery");

  return (
    <>
      <HorizontalGallery />

      <section className="bg-white pb-24 lg:pb-32">
        <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <GalleryGrid />
        </div>
      </section>

      <BeforeAfterSlider />
    </>
  );
}
