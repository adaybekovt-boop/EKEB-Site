"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface Step {
  code?: string;
  title: string;
  body: ReactNode;
  hint?: string;
}

export function StepsList({ steps }: { steps: Step[] }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute left-[19px] md:left-[27px] top-3 bottom-3 w-px"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.1) 5%, rgba(255,255,255,0.1) 95%, transparent 100%)",
        }}
      />
      <div className="space-y-5 md:space-y-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
            className="relative pl-14 md:pl-20"
          >
            <div className="absolute left-0 top-0 h-10 w-10 md:h-14 md:w-14 rounded-full border border-white/[0.1] bg-[var(--background)] flex items-center justify-center font-mono text-[12px] md:text-[13px] text-[var(--accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              {s.code ?? String(i + 1).padStart(2, "0")}
            </div>
            <div className="pt-1.5">
              <h3 className="text-base md:text-xl font-medium tracking-tight mb-1.5 leading-snug">
                {s.title}
              </h3>
              <div className="text-[13.5px] md:text-[15px] text-[var(--muted)] leading-relaxed max-w-2xl">
                {s.body}
              </div>
              {s.hint && (
                <div className="mt-3 text-[12px] text-[var(--accent)] tracking-tight">
                  {s.hint}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
