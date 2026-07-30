"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface TimelineNode {
  year: string;
  title: string;
  body: string;
  accent?: "indigo" | "warm";
}

export function Timeline({ items }: { items: TimelineNode[] }) {
  return (
    <div className="relative">
      {/* central vertical line */}
      <div
        aria-hidden
        className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.12) 8%, rgba(255,255,255,0.12) 92%, transparent 100%)",
        }}
      />

      <div className="space-y-10 md:space-y-16">
        {items.map((it, i) => {
          const right = i % 2 === 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.75, ease: EASE }}
              className={`relative flex items-start gap-5 md:gap-12 ${
                right ? "md:flex-row-reverse md:text-right" : ""
              }`}
            >
              {/* dot on line */}
              <div className="absolute left-[15px] md:left-1/2 top-2 -translate-x-1/2 z-10">
                <div className="relative h-3 w-3">
                  <span
                    className={
                      "absolute inset-0 rounded-full idle-glow " +
                      (it.accent === "warm"
                        ? "bg-[var(--accent-warm)]/30"
                        : "bg-[var(--accent)]/30")
                    }
                  />
                  <span
                    className={
                      "absolute inset-[3px] rounded-full " +
                      (it.accent === "warm"
                        ? "bg-[var(--accent-warm)]"
                        : "bg-[var(--accent)]")
                    }
                  />
                </div>
              </div>

              {/* spacer column on desktop */}
              <div className="hidden md:block md:w-1/2" />

              <div className="pl-10 md:pl-0 md:w-1/2 md:px-6">
                <div
                  className={
                    "text-3xl md:text-5xl font-medium tracking-tighter mb-2 leading-none " +
                    (it.accent === "warm" ? "gradient-warm" : "gradient-text")
                  }
                >
                  {it.year}
                </div>
                <h3 className="text-lg md:text-2xl font-medium tracking-tight mb-2 leading-snug">
                  {it.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[var(--muted)] leading-relaxed max-w-md md:max-w-none md:inline-block">
                  {it.body}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
