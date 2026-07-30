"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Motion-Primitives-style TextLoop — cycles through a list of strings
 * with a slide+fade transition.
 */
export function TextLoop({
  items,
  interval = 2400,
  className,
}: {
  items: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [interval, items.length]);

  return (
    <span className={cn("relative inline-block overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={items[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
