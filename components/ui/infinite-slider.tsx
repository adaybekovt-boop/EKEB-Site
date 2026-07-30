"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Motion-Primitives–style infinite, smooth, pauseable horizontal marquee.
 * Duplicates children for seamless loop; respects reduced-motion.
 */
export function InfiniteSlider({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className,
}: {
  children: ReactNode;
  /** Pixels per second. */
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const distance = "50%";
  const fromTo =
    direction === "left"
      ? { from: "0%", to: `-${distance}` }
      : { from: `-${distance}`, to: "0%" };

  return (
    <div
      className={cn(
        "group/slider relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <motion.div
        className="flex w-max gap-6"
        initial={{ x: fromTo.from }}
        animate={{ x: fromTo.to }}
        transition={{
          duration: 100 / Math.max(speed, 1),
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          animationPlayState:
            pauseOnHover ? "var(--slider-state, running)" : "running",
        }}
      >
        <div className="flex shrink-0 gap-6">{children}</div>
        <div aria-hidden className="flex shrink-0 gap-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
