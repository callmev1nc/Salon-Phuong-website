"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { StickyContact } from "@/components/Layout/StickyContact";
import { ViewTransitions } from "@/components/ViewTransitions";

// Code-split the client-only singletons (rule #12).
const Cursor = dynamic(
  () => import("@/components/Cursor").then((m) => m.Cursor),
  { ssr: false }
);
const Intro = dynamic(
  () => import("@/components/Intro").then((m) => m.Intro),
  { ssr: false }
);

/**
 * The global chrome, mounted once inside NextIntlClientProvider + MotionConfig.
 * SmoothScroll (Lenis) must wrap Header/MobileMenu so they can lock scrolling.
 */
export function GlobalShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <StickyContact />
      <Cursor />
      <Intro />
      <ViewTransitions />
    </SmoothScroll>
  );
}

export default GlobalShell;
