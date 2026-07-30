"use client";

import { ReactNode } from "react";

export function Marquee({
  items,
  accent = false,
  speed,
}: {
  items: ReactNode[];
  accent?: boolean;
  speed?: "slow" | "normal" | "fast";
}) {
  return (
    <div className="group overflow-hidden py-8 md:py-12 border-y border-white/[0.06] bg-[var(--background)]/40 backdrop-blur-sm [contain:layout_paint]">
      <div
        className="flex gap-10 md:gap-16 animate-marquee whitespace-nowrap will-change-transform [transform:translateZ(0)] [backface-visibility:hidden] [animation-play-state:running] group-hover:[animation-play-state:paused]"
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className={
              "flex items-center gap-10 md:gap-16 text-2xl md:text-5xl font-medium tracking-tighter transition-opacity duration-500 group-hover:opacity-60 hover:!opacity-100 " +
              (accent ? "text-[var(--accent)]" : "text-[var(--muted)]")
            }
          >
            <span>{item}</span>
            <span className="text-white/15">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function MarqueeRow({ children }: { children: ReactNode }) {
  return (
    <div className="group overflow-hidden py-6 [contain:layout_paint]">
      <div className="flex gap-12 animate-marquee whitespace-nowrap will-change-transform [transform:translateZ(0)] [backface-visibility:hidden] [animation-play-state:running] group-hover:[animation-play-state:paused]">
        {children}
        {children}
      </div>
    </div>
  );
}
