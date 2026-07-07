"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { GalleryItem } from "@/data/gallery";
import { useLenis } from "@/lib/lenis";
import { EASE } from "@/lib/motion";

export interface LightboxProps {
  images: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const t = useTranslations();
  const { setLocked } = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = index !== null;
  const current = open ? images[index] : null;
  const total = images.length;

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      const next = (index + dir + total) % total;
      onNavigate(next);
    },
    [index, total, onNavigate]
  );

  // Keyboard: ←/→ navigate, Esc close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  // Lock scroll + focus the close button while open (focus-trap entry point).
  useEffect(() => {
    setLocked(open);
    if (typeof document !== "undefined") {
      document.body.style.overflow = open ? "hidden" : "";
    }
    if (open) {
      const id = requestAnimationFrame(() => closeRef.current?.focus());
      return () => {
        cancelAnimationFrame(id);
        setLocked(false);
        if (typeof document !== "undefined") document.body.style.overflow = "";
      };
    }
    return () => {
      setLocked(false);
      if (typeof document !== "undefined") document.body.style.overflow = "";
    };
  }, [open, setLocked]);

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-lightbox flex flex-col bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={t("common.viewWork")}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-5 text-white lg:px-10">
            <span className="micro-label text-white/60">
              {String((index ?? 0) + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label={t("common.close")}
              className="text-white transition-opacity hover:opacity-70"
            >
              <X size={26} strokeWidth={1.5} />
            </button>
          </div>

          {/* Stage */}
          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-4"
            onClick={onClose}
          >
            <motion.div
              key={index}
              className="relative h-full w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.caption ?? ""}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="grayscale-img object-contain"
                priority
              />
            </motion.div>

            {/* Prev / next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-white/70 transition-colors hover:text-white lg:left-8"
            >
              <ArrowLeft size={28} strokeWidth={1.25} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/70 transition-colors hover:text-white lg:right-8"
            >
              <ArrowRight size={28} strokeWidth={1.25} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Lightbox;
