"use client";

import { Link } from "@/i18n/routing";
import { Magnetic } from "./Magnetic";
import type { ReactNode } from "react";

export interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  ariaLabel?: string;
  /** Open in a new tab (external links). */
  external?: boolean;
  onClick?: () => void;
}

/**
 * Magnetic CTA. Routes through the locale-aware Link for internal paths;
 * falls back to a plain <a> for tel:/mailto:/http(s) anchors.
 */
export function MagneticButton({
  children,
  href,
  className,
  ariaLabel,
  external,
  onClick,
}: MagneticButtonProps) {
  const isExternal =
    /^(tel:|mailto:|https?:|\/\/|#)/.test(href) || external;

  const inner = (
    <span
      className={`inline-flex items-center justify-center gap-2 ${className ?? ""}`}
    >
      {children}
    </span>
  );

  const content = isExternal ? (
    <a
      href={href}
      aria-label={ariaLabel}
      target={external && /^https?:/.test(href) ? "_blank" : undefined}
      rel={external && /^https?:/.test(href) ? "noopener noreferrer" : undefined}
      onClick={onClick}
    >
      {inner}
    </a>
  ) : (
    <Link href={href} aria-label={ariaLabel} onClick={onClick}>
      {inner}
    </Link>
  );

  return <Magnetic strength={0.4} radius={18}>{content}</Magnetic>;
}

export default MagneticButton;
