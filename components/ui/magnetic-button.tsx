"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const button = tv({
  base: "relative inline-flex items-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
  variants: {
    variant: {
      primary: "bg-foreground text-background hover:bg-white",
      ghost:
        "border border-white/15 text-foreground hover:bg-white/[0.05] hover:border-white/25",
      accent:
        "bg-[var(--accent)] text-white hover:brightness-110 shadow-[0_8px_32px_-8px_rgba(97,120,245,0.6)]",
    },
    size: {
      sm: "px-4 py-2 text-[13px]",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

type ButtonVariants = VariantProps<typeof button>;

interface MagneticButtonProps extends ButtonVariants {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({
  children,
  className,
  variant,
  size,
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 200, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const textX = useTransform(xSpring, (v) => v * 0.5);
  const textY = useTransform(ySpring, (v) => v * 0.5);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: xSpring, y: ySpring }}
      className={cn(button({ variant, size }), className)}
    >
      <motion.span
        style={{ x: textX, y: textY }}
        className="inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {inner}
      </a>
    );
  }
  return inner;
}
