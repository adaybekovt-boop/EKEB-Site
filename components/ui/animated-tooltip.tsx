"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

interface Person {
  id: number;
  name: string;
  designation: string;
  image?: string;
}

/**
 * Aceternity-style avatar stack with floating tooltips. Uses springs
 * for the tooltip rotation/translate so it feels light, not stiff.
 */
export function AnimatedTooltip({ items }: { items: Person[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-100, 100], [-20, 20]), {
    stiffness: 100,
    damping: 5,
  });
  const translateX = useSpring(useTransform(x, [-100, 100], [-30, 30]), {
    stiffness: 100,
    damping: 5,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const half = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - half);
  };

  return (
    <div className="flex flex-row items-center -space-x-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative"
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence mode="popLayout">
            {hovered === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 14,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX,
                  rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center rounded-md border border-white/[0.1] bg-[var(--elevated)]/95 backdrop-blur-md px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-1/4 bg-gradient-to-r from-transparent via-[var(--accent-warm)] to-transparent" />
                <p className="relative z-30 text-[13px] font-medium text-foreground">
                  {item.name}
                </p>
                <p className="text-[11px] text-[var(--muted)]">
                  {item.designation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            onMouseMove={handleMouseMove}
            className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/[0.12] bg-[var(--elevated)] transition-transform duration-500 group-hover:scale-110 group-hover:z-30"
            style={
              item.image
                ? undefined
                : {
                    backgroundImage: `linear-gradient(${
                      120 + item.id * 47
                    }deg, hsl(${(item.id * 67) % 360} 55% 55%) 0%, hsl(${
                      (item.id * 67 + 140) % 360
                    } 45% 35%) 100%)`,
                  }
            }
          >
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.name}
                draggable={false}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
                className="absolute inset-0 h-full w-full object-cover select-none"
              />
            ) : null}
            <div className="absolute inset-0 flex items-center justify-center text-[14px] font-medium text-white/90 mix-blend-overlay">
              {item.name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
