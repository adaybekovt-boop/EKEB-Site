"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        background:
          "linear-gradient(90deg, #6178f5 0%, #a8b5ff 50%, #d4a574 100%)",
        boxShadow: "0 0 24px rgba(97,120,245,0.55)",
      }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[200]"
    />
  );
}
