"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface SectionProps {
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  /** Width tokens: dense (default), wide (1200), narrow (900) */
  density?: "quiet" | "medium" | "dense";
  /** Optional ambient gradient blob */
  ambient?: "indigo" | "warm" | "split" | "none";
  id?: string;
  className?: string;
}

const densityMap = {
  quiet: "py-24 md:py-40",
  medium: "py-16 md:py-28",
  dense: "py-12 md:py-20",
};

export function ContentSection({
  eyebrow,
  title,
  intro,
  children,
  density = "medium",
  ambient = "none",
  id,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative ${densityMap[density]} overflow-hidden ${className}`}
    >
      {ambient !== "none" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              ambient === "indigo"
                ? "radial-gradient(ellipse at 25% 0%, rgba(97,120,245,0.12) 0%, transparent 55%)"
                : ambient === "warm"
                ? "radial-gradient(ellipse at 80% 0%, rgba(212,165,116,0.10) 0%, transparent 55%)"
                : "radial-gradient(ellipse at 20% 10%, rgba(97,120,245,0.10) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(212,165,116,0.08) 0%, transparent 55%)",
          }}
        />
      )}

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {(eyebrow || title || intro) && (
          <div className="grid grid-cols-12 gap-6 md:gap-8 mb-10 md:mb-16">
            <div className="col-span-12 md:col-span-7">
              {eyebrow && (
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="text-[13px] text-[var(--accent)] mb-3 inline-block"
                >
                  {eyebrow}
                </motion.span>
              )}
              {title && (
                <motion.h2
                  initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.85, ease: EASE }}
                  className="text-[2rem] md:text-5xl font-medium tracking-tighter leading-[1.05]"
                >
                  {title}
                </motion.h2>
              )}
            </div>
            {intro && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="col-span-12 md:col-span-5 md:pt-6"
              >
                <div className="text-[var(--muted)] text-[15px] leading-relaxed max-w-md">
                  {intro}
                </div>
              </motion.div>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
