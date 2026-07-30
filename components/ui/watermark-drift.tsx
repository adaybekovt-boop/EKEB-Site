"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useDeviceTier } from "@/lib/device-tier";

/**
 * Giant footer watermark with subtle scroll-linked horizontal drift.
 *
 * Perf:
 * - Low-tier or reduced-motion users get a static render (no scroll
 *   listener, no useTransform — just a plain div).
 * - On mid/high we only subscribe to scroll progress when the
 *   watermark is actually in the viewport. Footer is below 100% of
 *   page on every entry, so this keeps the listener idle for the
 *   entire user journey above it.
 * - translate3d + will-change isolates this into its own composite
 *   layer so the giant text node never re-rasterises on drift.
 */
export function WatermarkDrift({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "20% 0px 20% 0px" });
  const reduced = useReducedMotion();
  const { tier } = useDeviceTier();
  const skip = reduced || tier === "low";

  if (skip) {
    return (
      <div className="mt-16 -mb-4 overflow-hidden pointer-events-none">
        <div className="text-[clamp(5rem,18vw,16rem)] font-medium tracking-[-0.06em] leading-[0.85] text-white/[0.03] select-none whitespace-nowrap">
          {text}
        </div>
      </div>
    );
  }

  return <DriftingWatermark text={text} parentRef={ref} inView={inView} />;
}

function DriftingWatermark({
  text,
  parentRef,
  inView,
}: {
  text: string;
  parentRef: React.RefObject<HTMLDivElement>;
  inView: boolean;
}) {
  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div
      ref={parentRef}
      className="mt-16 -mb-4 overflow-hidden pointer-events-none"
    >
      <motion.div
        style={{
          x: inView ? x : "0%",
          willChange: inView ? "transform" : "auto",
          transform: "translateZ(0)",
        }}
        className="text-[clamp(5rem,18vw,16rem)] font-medium tracking-[-0.06em] leading-[0.85] text-white/[0.03] select-none whitespace-nowrap"
      >
        {text}
      </motion.div>
    </div>
  );
}
