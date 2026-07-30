"use client";

import { ReactNode, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Aceternity-style spotlight card — light follows cursor, fades on
 * leave. Cheaper than LiquidGlassCard, no 3D tilt.
 */
export function CardSpotlight({
  children,
  className,
  color = "#6178f5",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const [active, setActive] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(540px circle at ${mx}px ${my}px, ${color}33, transparent 50%)`;

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className={cn(
        "group/spot relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[var(--elevated)]/30 backdrop-blur-md p-6",
        className
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background, opacity: active ? 1 : 0 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
