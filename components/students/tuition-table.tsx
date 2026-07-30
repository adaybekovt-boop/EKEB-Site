"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface TuitionRow {
  code: string;
  name: string;
  duration: string;
  price9: string;
  price11: string;
}

export function TuitionTable({ rows }: { rows: TuitionRow[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      {/* Header — only on md+ */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-[11.5px] uppercase tracking-wider text-[var(--muted)] border-b border-white/[0.06]">
        <div className="col-span-5">Специальность</div>
        <div className="col-span-2">Срок</div>
        <div className="col-span-2 text-right">База 9 кл.</div>
        <div className="col-span-3 text-right">База 11 кл.</div>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {rows.map((r, i) => (
          <motion.div
            key={r.code}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
            className="grid grid-cols-12 gap-3 md:gap-4 px-5 md:px-6 py-5 hover:bg-white/[0.02] transition-colors"
          >
            <div className="col-span-12 md:col-span-5">
              <div className="text-[10.5px] font-mono text-[var(--accent)] mb-1">
                {r.code}
              </div>
              <div className="text-[14px] md:text-[15px] font-medium tracking-tight leading-snug">
                {r.name}
              </div>
            </div>
            <div className="col-span-4 md:col-span-2 text-[13px] text-[var(--muted)] md:pt-1">
              <span className="md:hidden text-[11px] uppercase tracking-wider block mb-0.5">
                Срок
              </span>
              {r.duration}
            </div>
            <div className="col-span-4 md:col-span-2 md:text-right text-[14px] text-foreground/85 md:pt-1">
              <span className="md:hidden text-[11px] uppercase tracking-wider text-[var(--muted)] block mb-0.5">
                База 9 кл.
              </span>
              {r.price9}
            </div>
            <div className="col-span-4 md:col-span-3 md:text-right text-[14px] text-foreground md:pt-1">
              <span className="md:hidden text-[11px] uppercase tracking-wider text-[var(--muted)] block mb-0.5">
                База 11 кл.
              </span>
              {r.price11}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
