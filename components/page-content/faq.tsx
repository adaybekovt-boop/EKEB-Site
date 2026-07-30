"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface FAQItem {
  q: string;
  a: string;
}

export function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left py-5 md:py-7 px-1 flex items-start justify-between gap-6 group"
              aria-expanded={isOpen}
            >
              <span
                className={
                  "text-[15px] md:text-lg font-medium tracking-tight transition-colors duration-500 " +
                  (isOpen
                    ? "text-foreground"
                    : "text-foreground/85 group-hover:text-foreground")
                }
              >
                {it.q}
              </span>
              <span
                className={
                  "shrink-0 h-7 w-7 rounded-full border flex items-center justify-center transition-all duration-500 " +
                  (isOpen
                    ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] rotate-45"
                    : "border-white/[0.1] text-[var(--muted)] group-hover:border-white/[0.2] group-hover:text-foreground")
                }
              >
                <Plus className="w-4 h-4" strokeWidth={1.5} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="text-[14px] md:text-[15px] text-[var(--muted)] leading-relaxed max-w-3xl pb-6 md:pb-8 pr-12">
                    {it.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
