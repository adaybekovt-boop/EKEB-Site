"use client";

import { motion } from "motion/react";
import { Children, cloneElement, isValidElement, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
  transition?: { type?: string; bounce?: number; duration?: number };
}

/**
 * Motion-Primitives–style AnimatedBackground.
 * Wrap a row of buttons; whichever has data-id matching the active
 * state gets a shared `layoutId` highlight that morphs between them.
 */
export function AnimatedBackground({
  children,
  defaultValue,
  className,
  transition = { type: "spring", bounce: 0.2, duration: 0.5 },
}: AnimatedBackgroundProps) {
  const [active, setActive] = useState<string | null>(defaultValue ?? null);

  const items = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child;
    const id =
      (child.props as any)?.["data-id"] ?? String(index);
    const isActive = active === id;
    return cloneElement(child as any, {
      onMouseEnter: () => setActive(id),
      onMouseLeave: () => setActive(defaultValue ?? null),
      "data-state": isActive ? "active" : "inactive",
      children: (
        <>
          {isActive && (
            <motion.div
              layoutId="bg-hover"
              className={cn(
                "absolute inset-0 -z-0 rounded-full bg-white/[0.06] border border-white/[0.08]",
                className
              )}
              transition={transition}
            />
          )}
          <span className="relative z-10">{(child.props as any).children}</span>
        </>
      ),
    } as any);
  });

  return <>{items}</>;
}
