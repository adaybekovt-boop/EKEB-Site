"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Building2, MapPin, Briefcase } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export type PartnerIndustry =
  | "IT"
  | "Финансы"
  | "Телеком"
  | "Госсектор"
  | "Розница"
  | "Производство";

export interface Partner {
  id: string;
  name: string;
  industry: PartnerIndustry;
  city: string;
  seats: number;
  tracks: string[];
  /** Two-tone gradient hint */
  accent?: "indigo" | "warm";
}

const FILTERS: { label: string; value: PartnerIndustry | "all" }[] = [
  { label: "Все", value: "all" },
  { label: "IT", value: "IT" },
  { label: "Финансы", value: "Финансы" },
  { label: "Телеком", value: "Телеком" },
  { label: "Госсектор", value: "Госсектор" },
  { label: "Розница", value: "Розница" },
  { label: "Производство", value: "Производство" },
];

function initials(name: string) {
  return name
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function PartnersGrid({ items }: { items: Partner[] }) {
  const [active, setActive] = useState<PartnerIndustry | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((p) => p.industry === active)),
    [items, active]
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    map.set("all", items.length);
    for (const p of items) {
      map.set(p.industry, (map.get(p.industry) ?? 0) + 1);
    }
    return map;
  }, [items]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
        {FILTERS.map((f) => {
          const isActive = active === f.value;
          const count = counts.get(f.value) ?? 0;
          return (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={
                "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
                (isActive
                  ? "border-white/30 bg-foreground text-background shadow-[0_4px_20px_-4px_rgba(255,255,255,0.2)]"
                  : "border-white/[0.08] bg-white/[0.02] text-foreground/85 hover:border-white/[0.18] hover:bg-white/[0.04]")
              }
            >
              <span>{f.label}</span>
              <span
                className={
                  "text-[11px] font-mono " +
                  (isActive ? "text-background/60" : "text-[var(--muted)]")
                }
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <PartnerCard key={p.id} item={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 text-center text-[var(--muted)]">
          В этой отрасли пока нет партнёров.
        </div>
      )}
    </div>
  );
}

function PartnerCard({ item, index }: { item: Partner; index: number }) {
  const warm = item.accent === "warm";
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, delay: Math.min(index, 8) * 0.04, ease: EASE }}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-5 md:p-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      />

      <div className="flex items-start gap-4 mb-4">
        <div
          aria-hidden
          className="relative h-14 w-14 shrink-0 rounded-2xl overflow-hidden border border-white/[0.08]"
        >
          <div
            className="absolute inset-0"
            style={{
              background: warm
                ? "radial-gradient(circle at 30% 25%, rgba(212,165,116,0.45) 0%, transparent 60%), linear-gradient(135deg, #1c1f29 0%, #0e1019 100%)"
                : "radial-gradient(circle at 30% 25%, rgba(97,120,245,0.45) 0%, transparent 60%), linear-gradient(135deg, #15182a 0%, #0e1019 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 18px)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={
                "text-base font-semibold tracking-tight " +
                (warm ? "gradient-warm" : "gradient-text")
              }
            >
              {initials(item.name)}
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[11.5px] text-[var(--accent)] mb-1 tracking-tight">
            {item.industry}
          </div>
          <h3 className="text-[15.5px] md:text-base font-medium tracking-tight leading-snug">
            {item.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-[12px] text-[var(--muted)]">
            <MapPin className="w-3 h-3" strokeWidth={1.75} />
            {item.city}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-1.5 text-[10.5px] text-[var(--muted)] mb-0.5 uppercase tracking-wider">
            <Briefcase className="w-3 h-3" strokeWidth={1.75} />
            Мест практики
          </div>
          <div className="text-base font-medium tracking-tight">{item.seats}</div>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[10.5px] text-[var(--muted)] mb-0.5 uppercase tracking-wider">
            <Building2 className="w-3 h-3" strokeWidth={1.75} />
            Формат
          </div>
          <div className="text-[13px] font-medium tracking-tight">Дуальная</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {item.tracks.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-[11px] rounded-full border border-white/[0.08] bg-white/[0.02] text-foreground/80"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
