"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface BigCTAProps {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  variant?: "indigo" | "warm";
}

export function BigCTA({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  variant = "indigo",
}: BigCTAProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-32"
    >
      <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] bg-[var(--elevated)] p-8 md:p-16 lg:p-20">
        <div
          aria-hidden
          className="absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl opacity-50"
          style={{
            background:
              variant === "warm"
                ? "radial-gradient(circle, rgba(212,165,116,0.35) 0%, transparent 60%)"
                : "radial-gradient(circle, rgba(97,120,245,0.35) 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full blur-3xl opacity-40"
          style={{
            background:
              variant === "warm"
                ? "radial-gradient(circle, rgba(97,120,245,0.20) 0%, transparent 60%)"
                : "radial-gradient(circle, rgba(212,165,116,0.20) 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />

        <div className="relative max-w-3xl">
          {eyebrow && (
            <span className="text-[13px] text-[var(--accent)] mb-3 inline-block">
              {eyebrow}
            </span>
          )}
          <h3 className="text-[2rem] md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.05] mb-5 md:mb-7">
            {title}
          </h3>
          {body && (
            <p className="text-[15px] md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl mb-7 md:mb-9">
              {body}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            {primary && (
              <MagneticButton href={primary.href}>
                {primary.label} <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            )}
            {secondary && (
              <MagneticButton href={secondary.href} variant="ghost">
                {secondary.label}
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
