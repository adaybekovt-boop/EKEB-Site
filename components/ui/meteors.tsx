"use client";

import { cn } from "@/lib/utils";

/**
 * Aceternity-style meteor shower — N animated streaks crossing the
 * container. Use inside `relative overflow-hidden`.
 */
export function Meteors({
  number = 18,
  className,
}: {
  number?: number;
  className?: string;
}) {
  const meteors = new Array(number).fill(true);
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {meteors.map((_, i) => (
        <span
          key={i}
          className="absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-full bg-[var(--accent)] animate-meteor"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
            animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`,
            boxShadow: "0 0 8px rgba(97,120,245,0.85)",
          }}
        >
          <span
            aria-hidden
            className="absolute top-1/2 -translate-y-1/2 h-px w-[60px] bg-gradient-to-r from-[var(--accent)] to-transparent"
          />
        </span>
      ))}
    </div>
  );
}
