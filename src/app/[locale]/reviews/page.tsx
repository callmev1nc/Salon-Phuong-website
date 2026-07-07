import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/Layout/PageHeader";
import { ReviewWall } from "@/components/Reviews/ReviewWall";
import { ReviewCard } from "@/components/Reviews/ReviewCard";
import { CountUp } from "@/components/motion/CountUp";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { siteConfig } from "@/data/site-config";

export default function ReviewsPage() {
  const t = useTranslations("reviews");
  const reviews = t.raw("reviews") as {
    name: string;
    text: string;
    rating: number;
  }[];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      {/* Rating block */}
      <section className="bg-white pb-16">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-8 px-5 sm:flex-row sm:items-end sm:justify-between lg:px-10">
          <div className="flex items-baseline gap-4">
            <CountUp
              to={4.9}
              decimals={1}
              className="font-serif text-7xl font-medium sm:text-8xl lg:text-9xl"
            />
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    strokeWidth={0}
                    fill="currentColor"
                    className="text-black"
                  />
                ))}
              </div>
              <span className="micro-label text-gray-400">
                {t("ratingLabel")}
              </span>
            </div>
          </div>

          <MagneticButton
            href={siteConfig.social.googleReview}
            external
            className="bg-black px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white"
          >
            {t("writeReview")}
          </MagneticButton>
        </div>
      </section>

      {/* Text pull-quotes */}
      <section className="bg-white pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot wall */}
      <section className="bg-gray-50 py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <ReviewWall />
        </div>
      </section>
    </>
  );
}
