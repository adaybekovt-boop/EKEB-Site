"use client";

import { ReactNode, cloneElement, isValidElement, ReactElement } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface FeatureItem {
  /** JSX icon, e.g. <Layers />. Styling is applied automatically. */
  icon?: ReactNode;
  code?: string;
  title: string;
  body: ReactNode;
  href?: string;
  tags?: string[];
}

export function FeatureCard({
  item,
  index = 0,
  highlight = false,
}: {
  item: FeatureItem;
  index?: number;
  highlight?: boolean;
}) {
  const iconNode =
    item.icon && isValidElement(item.icon)
      ? cloneElement(item.icon as ReactElement<{ className?: string; strokeWidth?: number }>, {
          className: "w-5 h-5",
          strokeWidth: 1.5,
        })
      : null;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
      className={
        "group relative rounded-2xl border p-6 md:p-7 h-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
        (highlight
          ? "border-white/[0.16] bg-[var(--elevated)]"
          : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16]")
      }
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      />

      <div className="flex items-start justify-between gap-4 mb-5">
        {iconNode ? (
          <div className="h-11 w-11 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[var(--accent)] shrink-0 group-hover:bg-white/[0.04] transition">
            {iconNode}
          </div>
        ) : item.code ? (
          <span className="text-[11px] font-mono text-[var(--accent)] mt-1">
            {item.code}
          </span>
        ) : null}
        {item.href && (
          <ArrowUpRight
            className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] -translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500"
            strokeWidth={1.5}
          />
        )}
      </div>

      <h3 className="text-base md:text-lg font-medium tracking-tight mb-2 leading-snug">
        {item.title}
      </h3>
      <div className="text-[13.5px] text-[var(--muted)] leading-relaxed">
        {item.body}
      </div>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {item.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[11px] rounded-full border border-white/[0.08] bg-white/[0.02] text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}

export function FeatureGrid({
  items,
  cols = 3,
}: {
  items: FeatureItem[];
  cols?: 2 | 3 | 4;
}) {
  const colClass =
    cols === 2
      ? "sm:grid-cols-2"
      : cols === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-3 md:gap-4`}>
      {items.map((item, i) => (
        <FeatureCard key={i} item={item} index={i} />
      ))}
    </div>
  );
}
