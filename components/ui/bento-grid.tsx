"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className,
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg"
      ? "md:col-span-2 md:row-span-2"
      : size === "md"
      ? "md:col-span-1 md:row-span-2"
      : "md:col-span-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative rounded-2xl border border-white/[0.08] bg-[var(--elevated)]/60 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white/[0.16]",
        sizeClass,
        className
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      />
      <div className="relative p-6 md:p-8 h-full flex flex-col">{children}</div>
    </motion.div>
  );
}
