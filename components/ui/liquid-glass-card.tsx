"use client";

import { useRef, ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
 * Liquid Glass card — Apple-style frosted surface with:
 *   • backdrop blur + saturation
 *   • specular highlight that follows cursor
 *   • gradient hairline edge (the "liquid rim")
 *   • magnetic 3D tilt (subtle, never disorienting)
 *   • inner darkening overlay so text stays readable
 *   • optional SVG refraction (gated by data-tier="high")
 * ───────────────────────────────────────────────────────────── */

const card = tv({
  base: [
    "relative overflow-hidden rounded-3xl",
    "border border-white/[0.08]",
    "transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "hover:border-white/[0.18]",
    "will-change-transform",
  ],
  variants: {
    intensity: {
      soft: "bg-white/[0.025] backdrop-blur-[16px] backdrop-saturate-[1.4]",
      medium: "bg-white/[0.035] backdrop-blur-[24px] backdrop-saturate-[1.6]",
      strong: "bg-white/[0.05] backdrop-blur-[36px] backdrop-saturate-[1.9]",
    },
    glow: {
      none: "",
      indigo:
        "shadow-[0_20px_60px_-30px_rgba(97,120,245,0.55),0_0_0_1px_rgba(255,255,255,0.04)_inset]",
      gold: "shadow-[0_20px_60px_-30px_rgba(212,165,116,0.55),0_0_0_1px_rgba(255,255,255,0.04)_inset]",
    },
  },
  defaultVariants: { intensity: "medium", glow: "indigo" },
});

type CardVariants = VariantProps<typeof card>;

interface LiquidGlassCardProps extends CardVariants {
  children: ReactNode;
  className?: string;
  /** Apply SVG refraction filter (desktop + high tier only) */
  refract?: boolean;
  /** Disable magnetic tilt (e.g. for active state) */
  noTilt?: boolean;
  onClick?: () => void;
}

export function LiquidGlassCard({
  children,
  className,
  intensity,
  glow,
  refract = false,
  noTilt = false,
  onClick,
}: LiquidGlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Cursor-relative position (-1..1)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Springs make the tilt feel like glass, not paper
  const rx = useSpring(useTransform(my, [-1, 1], [4, -4]), {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });
  const ry = useSpring(useTransform(mx, [-1, 1], [-4, 4]), {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });

  // Specular highlight position in % (0..100)
  const sx = useTransform(mx, [-1, 1], [0, 100]);
  const sy = useTransform(my, [-1, 1], [0, 100]);

  const highlight = useMotionTemplate`radial-gradient(420px circle at ${sx}% ${sy}%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.025) 30%, transparent 60%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noTilt) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={
        noTilt
          ? undefined
          : { rotateX: rx, rotateY: ry, transformPerspective: 1200 }
      }
      className={cn(card({ intensity, glow }), className)}
    >
      {/* Inner darkening for text readability (recipe says glass over busy bg needs this) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[1] bg-gradient-to-b from-[var(--background)]/55 via-[var(--background)]/30 to-[var(--background)]/65"
      />

      {/* Specular highlight — follows cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90 mix-blend-screen"
        style={{ background: highlight }}
      />

      {/* Liquid rim — gradient hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(212,165,116,0.16))",
          WebkitMaskImage:
            "linear-gradient(#000, #000), linear-gradient(#000, #000)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />

      {/* Optional refraction — only on high tier desktops */}
      {refract && (
        <div
          aria-hidden
          className="liquid-refract pointer-events-none absolute inset-0"
        />
      )}

      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}
