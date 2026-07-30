"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Motion-Primitives-style custom cursor.
 * Disabled on coarse pointers (touch). One small dot + larger
 * spring-followed ring with mix-blend-difference for legibility.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 25, stiffness: 250, mass: 0.5 });
  const ringY = useSpring(y, { damping: 25, stiffness: 250, mass: 0.5 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onEnter = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [data-cursor="hover"]')) setHover(true);
    };
    const onLeave = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [data-cursor="hover"]')) setHover(false);
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseover", onEnter, true);
    document.addEventListener("mouseout", onLeave, true);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onEnter, true);
      document.removeEventListener("mouseout", onLeave, true);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[300] h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[300] rounded-full border border-white/60 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hover ? 48 : 28,
          height: hover ? 48 : 28,
          transition: "width 220ms ease, height 220ms ease",
        }}
      />
    </>
  );
}
