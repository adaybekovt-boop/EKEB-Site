"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "flash" | "black" | "wipe-down" | "wipe-right";

interface FrameCutProps {
  active: boolean;
  variant?: Variant;
  className?: string;
  /** Total duration in seconds (max 0.4) */
  duration?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * One intentional cinematic cut. Pinned to the top of the page at
 * z-[200]; pointer-events disabled. Use sparingly — max 1–2 per page.
 */
export function FrameCut({
  active,
  variant = "flash",
  className,
  duration = 0.25,
}: FrameCutProps) {
  const d = Math.min(duration, 0.4);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={`cut-${variant}`}
          aria-hidden
          className={cn(
            "pointer-events-none fixed inset-0 z-[200]",
            className
          )}
        >
          {variant === "flash" && (
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.92, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: d, ease: EASE, times: [0, 0.18, 1] }}
            />
          )}
          {variant === "black" && (
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: d, ease: EASE, times: [0, 0.5, 1] }}
            />
          )}
          {variant === "wipe-down" && (
            <motion.div
              className="absolute inset-0 bg-[var(--background)]"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{
                clipPath: [
                  "inset(0 0 100% 0)",
                  "inset(0 0 0% 0)",
                  "inset(100% 0 0% 0)",
                ],
              }}
              exit={{ clipPath: "inset(100% 0 0% 0)" }}
              transition={{ duration: d, ease: EASE, times: [0, 0.5, 1] }}
            />
          )}
          {variant === "wipe-right" && (
            <motion.div
              className="absolute inset-0 bg-[var(--background)]"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{
                clipPath: [
                  "inset(0 100% 0 0)",
                  "inset(0 0% 0 0)",
                  "inset(0 0 0 100%)",
                ],
              }}
              exit={{ clipPath: "inset(0 0 0 100%)" }}
              transition={{ duration: d, ease: EASE, times: [0, 0.5, 1] }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
