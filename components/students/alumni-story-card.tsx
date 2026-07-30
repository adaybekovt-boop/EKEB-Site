"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface AlumniStory {
  initials: string;
  name: string;
  year: string;
  role: string;
  quote: string;
  accent: "indigo" | "warm";
}

export function AlumniStoryCard({
  story,
  index,
}: {
  story: AlumniStory;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
      className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-6 md:p-7 transition-all duration-500 h-full"
    >
      <div className="flex items-start gap-4 mb-5">
        <div
          className={
            "h-12 w-12 rounded-2xl flex items-center justify-center font-medium text-[15px] tracking-tight shrink-0 " +
            (story.accent === "warm"
              ? "bg-[var(--accent-warm)]/15 text-[var(--accent-warm)] border border-[var(--accent-warm)]/25"
              : "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/25")
          }
        >
          {story.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[14.5px] font-medium tracking-tight">
            {story.name}
          </div>
          <div className="text-[12px] text-[var(--muted)] mt-0.5">
            {story.year}
          </div>
          <div className="text-[12.5px] text-foreground/80 mt-1.5">
            {story.role}
          </div>
        </div>
      </div>

      <Quote
        className="w-4 h-4 text-[var(--muted)]/50 mb-2"
        strokeWidth={1.5}
      />
      <p className="text-[14px] text-foreground/85 leading-relaxed">
        {story.quote}
      </p>
    </motion.article>
  );
}
