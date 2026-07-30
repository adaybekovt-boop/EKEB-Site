"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useDeviceTier } from "@/lib/device-tier";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  /** Optional custom formatter — overrides decimals when provided */
  format?: (n: number) => string;
  /** Delay (ms) before count begins after entering viewport. */
  startDelay?: number;
}

/**
 * Motion-Primitives-style count-up that triggers when the element
 * enters the viewport. Spring physics, not linear lerp.
 *
 * Perf: on low-tier devices or reduced-motion users we skip the
 * spring entirely and render the final value as a static string —
 * no per-frame motion-value subscriptions, no useTransform churn.
 */
export function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.6,
  className,
  format,
  startDelay = 0,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();
  const { tier } = useDeviceTier();

  const skipAnimation = reduced || tier === "low";

  const mv = useMotionValue(0);
  const spring = useSpring(mv, {
    stiffness: 60,
    damping: 18,
    mass: 1,
    restDelta: 0.001,
  });
  const display = useTransform(spring, (v) => {
    const body = format ? format(v) : v.toFixed(decimals);
    return `${prefix}${body}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return;
    if (skipAnimation) {
      // Jump straight to final — no spring work
      mv.jump(value);
      return;
    }
    if (startDelay > 0) {
      const t = setTimeout(() => mv.set(value), startDelay);
      return () => clearTimeout(t);
    }
    mv.set(value);
  }, [inView, mv, value, startDelay, skipAnimation]);

  // Static render path — single string, no motion subscription
  if (skipAnimation) {
    const body = format ? format(value) : value.toFixed(decimals);
    return (
      <span ref={ref} className={className}>
        {`${prefix}${body}${suffix}`}
      </span>
    );
  }

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}
