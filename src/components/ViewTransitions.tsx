"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

/**
 * Best-effort cross-route fade via the native View Transitions API.
 *
 * Next 14.2 has no first-class View Transitions, so we intercept internal
 * same-origin `<a>` clicks globally and wrap the navigation in
 * `document.startViewTransition` when available. Browsers without it (or under
 * reduced-motion) get a normal navigation. Per-section entrance animations make
 * the landing feel intentional regardless.
 */
export function ViewTransitions() {
  const router = useRouter();

  useEffect(() => {
    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a) return;
      // Only plain left-clicks without modifiers (allow cmd/ctrl new-tab etc).
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const href = a.getAttribute("href") ?? "";
      // Internal same-origin path only (no hash/query/external/special schemes).
      if (
        !href.startsWith("/") ||
        href.startsWith("//") ||
        href.includes("#") ||
        href.includes("?") ||
        a.target === "_blank" ||
        a.hasAttribute("download")
      ) {
        return;
      }

      // Parse locale prefix (as-needed: only non-default locale is prefixed).
      const match = href.match(/^\/(vi)(\/.*)?$/);
      const locale = match ? ("vi" as const) : routing.defaultLocale;
      const pathname = match ? match[2] || "/" : href;

      e.preventDefault();
      const doc = document as Document & {
        startViewTransition: (cb: () => void) => void;
      };
      doc.startViewTransition(() => {
        router.push(pathname, { locale });
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}

export default ViewTransitions;
