"use client";

import {
  motion,
  AnimatePresence,
  type Transition,
  type Variants,
} from "motion/react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SplitBy = "char" | "word" | "line";

interface TextEffectProps {
  children: string;
  per?: SplitBy;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  duration?: number;
  preset?: "fade" | "slide" | "scale" | "blur" | "fade-in-blur";
  trigger?: boolean;
  staggerChildren?: number;
}

const presetVariants: Record<
  NonNullable<TextEffectProps["preset"]>,
  Variants
> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "fade-in-blur": {
    hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

/**
 * Motion Primitives–style TextEffect.
 * Splits a string by char | word | line and applies an entrance preset.
 */
export function TextEffect({
  children,
  per = "word",
  as: Tag = "p",
  className,
  delay = 0,
  duration = 0.6,
  preset = "fade-in-blur",
  trigger = true,
  staggerChildren = 0.03,
}: TextEffectProps) {
  const variants = presetVariants[preset];
  const segments =
    per === "char"
      ? Array.from(children)
      : per === "line"
        ? children.split(/\n/)
        : children.split(/\s+/);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const transition: Transition = {
    duration,
    ease: [0.16, 1, 0.3, 1],
  };

  const M = motion[Tag as keyof typeof motion] as any;

  return (
    <AnimatePresence>
      <M
        initial="hidden"
        animate={trigger ? "visible" : "hidden"}
        variants={containerVariants}
        className={cn("inline-block", className)}
      >
        {segments.map((seg, i) => (
          <motion.span
            key={i}
            variants={variants}
            transition={transition}
            className={cn(
              "inline-block will-change-transform",
              per === "word" && "pr-[0.25em]",
              per === "line" && "block"
            )}
          >
            {seg === " " ? "\u00A0" : seg}
            {per === "word" && i < segments.length - 1 ? "" : ""}
          </motion.span>
        ))}
      </M>
    </AnimatePresence>
  );
}
