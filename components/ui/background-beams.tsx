"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Aceternity-style SVG beam network — looping path strokes that
 * pulse from corner to corner. Pure SVG, no canvas.
 */
const paths = [
  "M-100 100 Q 200 200 400 100 T 900 100",
  "M-100 200 Q 300 300 500 200 T 900 200",
  "M-100 300 Q 250 400 450 300 T 900 300",
  "M-100 400 Q 350 500 550 400 T 900 400",
  "M-100 500 Q 200 600 400 500 T 900 500",
  "M-100 600 Q 300 700 500 600 T 900 600",
];

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        "[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient
            id="beamGrad"
            gradientUnits="userSpaceOnUse"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop stopColor="#6178f5" stopOpacity="0" />
            <stop offset="0.4" stopColor="#6178f5" />
            <stop offset="0.6" stopColor="#d4a574" />
            <stop offset="1" stopColor="#d4a574" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#beamGrad)"
            strokeWidth="1.2"
            strokeOpacity="0.55"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }}
            transition={{
              duration: 6 + (i % 3) * 1.5,
              delay: i * 0.6,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
