"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useAnimationFrame,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Aceternity-style moving-border button — a SVG rect path sampled
 * over time gives the "snake" highlight that travels the border.
 */
export function MovingBorder({
  duration = 3500,
  rx = "30%",
  ry = "30%",
  children,
  className,
}: {
  duration?: number;
  rx?: string;
  ry?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const t = (time % duration) / duration;
      progress.set(t * length);
    }
  });

  const x = useMotionTemplate`${useMotionValue(0)}px`;
  const y = useMotionTemplate`${useMotionValue(0)}px`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          ref={pathRef}
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          x,
          y,
          transform: useMotionTemplate`translate(0px, 0px)`,
        }}
        className={cn("absolute h-20 w-20", className)}
      >
        <Trail progress={progress} pathRef={pathRef}>
          {children}
        </Trail>
      </motion.div>
    </>
  );
}

function Trail({
  progress,
  pathRef,
  children,
}: {
  progress: any;
  pathRef: React.RefObject<SVGRectElement>;
  children?: React.ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useAnimationFrame(() => {
    const length = pathRef.current?.getTotalLength();
    if (!length) return;
    const point = pathRef.current?.getPointAtLength(progress.get());
    if (point) {
      x.set(point.x);
      y.set(point.y);
    }
  });

  const transform = useMotionTemplate`translate(${x}px, ${y}px) translate(-50%, -50%)`;

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform,
      }}
    >
      {children ?? (
        <div className="h-20 w-20 rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_60%)] opacity-80" />
      )}
    </motion.div>
  );
}

/** Border-wrapped button that hosts MovingBorder under the surface. */
export function GlowBorderButton({
  children,
  className,
  duration = 3500,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full p-px bg-[var(--elevated)]",
        className
      )}
    >
      <div className="absolute inset-0">
        <MovingBorder duration={duration} rx="30%" ry="30%" />
      </div>
      <div className="relative z-10 flex items-center gap-2 rounded-full bg-[var(--background)]/85 px-6 py-3 text-sm font-medium tracking-tight text-foreground backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}
