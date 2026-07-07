"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { MagneticButton } from "@/components/motion/MagneticButton";

export interface ClickToCallProps {
  /** Which of the two salon numbers to dial. */
  index?: 0 | 1;
  /** Show the phone number alongside the label. */
  showNumber?: boolean;
  label?: string;
  className?: string;
}

/**
 * Reusable magnetic Call pill. Dials the salon (E.164 tel: href).
 * Used in hero, final CTA, contact — anywhere a call action is needed.
 */
export function ClickToCall({
  index = 0,
  showNumber = false,
  label,
  className,
}: ClickToCallProps) {
  const num = siteConfig.phone[index];
  return (
    <MagneticButton
      href={`tel:+84${num.replace(/^0/, "")}`}
      ariaLabel={`${label ?? "Call"} ${num}`}
      className={className}
    >
      <Phone size={14} strokeWidth={1.75} />
      <span>{label ?? num}</span>
      {showNumber && label && <span className="opacity-70">{num}</span>}
    </MagneticButton>
  );
}

export default ClickToCall;
