"use client";

import { cn } from "@/lib/utils";

interface SoftGradientBackdropProps {
  className?: string;
}

/**
 * A deliberately low-detail, brand-colour backdrop for content-heavy areas.
 * Its motion cycle is twice as long as the prior fallback, keeping it calm.
 */
export function SoftGradientBackdrop({ className }: SoftGradientBackdropProps) {
  return (
    <div
      aria-hidden
      className={cn("soft-gradient-backdrop pointer-events-none", className)}
    >
      <div className="soft-gradient-backdrop__blur">
        <span className="soft-gradient-backdrop__orb soft-gradient-backdrop__orb--indigo" />
        <span className="soft-gradient-backdrop__orb soft-gradient-backdrop__orb--violet" />
        <span className="soft-gradient-backdrop__orb soft-gradient-backdrop__orb--gold" />
        <span className="soft-gradient-backdrop__orb soft-gradient-backdrop__orb--blue" />
      </div>
      <div className="soft-gradient-backdrop__veil" />
    </div>
  );
}
