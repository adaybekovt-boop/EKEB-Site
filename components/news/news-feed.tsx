"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Calendar } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export type NewsTag =
  | "Приёмная"
  | "WorldSkills"
  | "Выпускники"
  | "Партнёры"
  | "День открытых дверей"
  | "Лаборатории";

export interface NewsItem {
  id: string;
  date: string; // ISO
  tag: NewsTag;
  title: string;
  excerpt: string;
  href?: string;
  accent?: "indigo" | "warm";
}

const FILTERS: { label: string; value: NewsTag | "all" }[] = [
  { label: "Все", value: "all" },
  { label: "Приёмная", value: "Приёмная" },
  { label: "WorldSkills", value: "WorldSkills" },
  { label: "Выпускники", value: "Выпускники" },
  { label: "Партнёры", value: "Партнёры" },
  { label: "День открытых дверей", value: "День открытых дверей" },
  { label: "Лаборатории", value: "Лаборатории" },
];

const PAGE_SIZE = 6;

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function NewsFeed({ items }: { items: NewsItem[] }) {
  const [active, setActive] = useState<NewsTag | "all">("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const list = active === "all" ? items : items.filter((n) => n.tag === active);
    return [...list].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [items, active]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
        {FILTERS.map((f) => {
          const isActive = active === f.value;
          return (
            <button
              key={f.value}
              onClick={() => {
                setActive(f.value);
                setVisible(PAGE_SIZE);
              }}
              className={
                "rounded-full border px-4 py-2 text-[13px] tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
                (isActive
                  ? "border-white/30 bg-foreground text-background shadow-[0_4px_20px_-4px_rgba(255,255,255,0.2)]"
                  : "border-white/[0.08] bg-white/[0.02] text-foreground/85 hover:border-white/[0.18] hover:bg-white/[0.04]")
              }
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((n, i) => (
            <NewsCard key={n.id} item={n} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 text-center text-[var(--muted)]">
          В этой категории пока нет новостей.
        </div>
      )}

      {hasMore && (
        <div className="mt-10 md:mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-white/15 px-7 py-3 text-[13.5px] font-medium tracking-tight hover:bg-white/[0.05] hover:border-white/25 transition-colors duration-300"
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </div>
  );
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const warm = item.accent === "warm";
  const Tag: any = item.href ? "a" : "article";
  const props = item.href ? { href: item.href } : {};

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.05, ease: EASE }}
    >
      <Tag
        {...props}
        className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] h-full"
      >
        {/* Cover */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
          <div
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            style={{
              background: warm
                ? "radial-gradient(circle at 30% 30%, rgba(212,165,116,0.45) 0%, transparent 60%), linear-gradient(135deg, #1c1f29 0%, #0e1019 100%)"
                : "radial-gradient(circle at 30% 30%, rgba(97,120,245,0.45) 0%, transparent 60%), linear-gradient(135deg, #15182a 0%, #0e1019 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 28px)",
            }}
          />
          <div className="absolute top-4 left-4">
            <span
              className={
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight backdrop-blur-md border " +
                (warm
                  ? "border-[var(--accent-warm)]/30 bg-[var(--accent-warm)]/10 text-[var(--accent-warm)]"
                  : "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]")
              }
            >
              {item.tag}
            </span>
          </div>
          {item.href && (
            <ArrowUpRight
              className="absolute top-4 right-4 w-4 h-4 text-foreground/70 opacity-0 group-hover:opacity-100 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500"
              strokeWidth={1.5}
            />
          )}
        </div>

        <div className="p-5 md:p-6">
          <div className="flex items-center gap-1.5 text-[11.5px] text-[var(--muted)] mb-3">
            <Calendar className="w-3 h-3" strokeWidth={1.75} />
            {formatDate(item.date)}
          </div>
          <h3 className="text-[16px] md:text-lg font-medium tracking-tight leading-snug mb-2 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-[13px] text-[var(--muted)] leading-relaxed line-clamp-2">
            {item.excerpt}
          </p>
        </div>
      </Tag>
    </motion.div>
  );
}
