"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface Stat {
  value: string;
  label: string;
  hint?: string;
  warm?: boolean;
}

function Cell({ s, i }: { s: Stat; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
      className="bg-[var(--background)] p-6 md:p-8 hover:bg-[var(--elevated)] transition-colors duration-500"
    >
      <div
        className={
          "text-3xl md:text-5xl font-medium tracking-tighter mb-1.5 leading-none " +
          (s.warm ? "gradient-warm" : "gradient-text")
        }
      >
        {s.value}
      </div>
      <div className="text-[12.5px] md:text-[13px] text-foreground/85 mb-0.5">
        {s.label}
      </div>
      {s.hint && (
        <div className="text-[11px] text-[var(--muted)] leading-snug">
          {s.hint}
        </div>
      )}
    </motion.div>
  );
}

/* Cleaner grid alternative — recommended use */
export function StatGrid({ items }: { items: Stat[] }) {
  const cols =
    items.length <= 2
      ? "grid-cols-2"
      : items.length === 3
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 md:grid-cols-4";

  return (
    <div
      className={`grid ${cols} gap-px rounded-3xl overflow-hidden border border-white/[0.08]`}
      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
    >
      {items.map((s, i) => (
        <Cell key={i} s={s} i={i} />
      ))}
    </div>
  );
}
