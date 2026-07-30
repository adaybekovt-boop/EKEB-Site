"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PartnerTags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {items.map((p, i) => (
        <motion.span
          key={p}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55, delay: i * 0.04, ease: EASE }}
          className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-[13px] text-foreground/85"
        >
          {p}
        </motion.span>
      ))}
    </div>
  );
}
