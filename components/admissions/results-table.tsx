"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDownUp } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface ResultsRow {
  code: string;
  program: string;
  qualification: string;
  seats: { grant: number; paid: number };
  cutoff: Record<string, number>; // year -> score
  applicants: Record<string, number>; // year -> applications
}

export function ResultsTable({
  rows,
  years,
}: {
  rows: ResultsRow[];
  years: string[];
}) {
  const [filter, setFilter] = useState<string>("all");
  const [year, setYear] = useState<string>(years[years.length - 1]);

  const visible = useMemo(
    () => (filter === "all" ? rows : rows.filter((r) => r.code === filter)),
    [filter, rows]
  );

  return (
    <div className="rounded-3xl border border-white/[0.08] overflow-hidden bg-white/[0.015]">
      {/* Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-5 border-b border-white/[0.06]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider mr-1">
            Специальность
          </span>
          <FilterChip
            label="Все"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          {rows.map((r) => (
            <FilterChip
              key={r.code}
              label={r.code}
              active={filter === r.code}
              onClick={() => setFilter(r.code)}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Год
          </span>
          <div className="flex gap-1">
            {years.map((y) => (
              <FilterChip
                key={y}
                label={y}
                active={year === y}
                onClick={() => setYear(y)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Header row — desktop only */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider border-b border-white/[0.06]">
        <div className="col-span-5 flex items-center gap-1.5">
          Специальность <ArrowDownUp className="w-3 h-3 opacity-50" strokeWidth={1.75} />
        </div>
        <div className="col-span-2">Мест (грант)</div>
        <div className="col-span-2">Мест (платно)</div>
        <div className="col-span-1">Заявок</div>
        <div className="col-span-2 text-right">Проходной</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={filter + year}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="divide-y divide-white/[0.04]"
        >
          {visible.map((r, i) => {
            const cutoff = r.cutoff[year];
            const apps = r.applicants[year];
            return (
              <motion.li
                key={r.code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
                className="group grid grid-cols-12 gap-3 md:gap-4 px-5 md:px-6 py-4 md:py-5 hover:bg-white/[0.02] transition-colors"
              >
                {/* Mobile-stacked / desktop-row */}
                <div className="col-span-12 md:col-span-5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-mono text-[var(--accent)]">
                      {r.code}
                    </span>
                    <h4 className="text-[14.5px] md:text-base font-medium tracking-tight">
                      {r.program}
                    </h4>
                  </div>
                  <div className="text-[12px] text-[var(--muted)] mt-0.5">
                    {r.qualification}
                  </div>
                </div>
                <Stat label="Грант" value={r.seats.grant} className="col-span-4 md:col-span-2" />
                <Stat label="Платно" value={r.seats.paid} className="col-span-4 md:col-span-2" />
                <Stat
                  label="Заявок"
                  value={apps ?? "—"}
                  className="col-span-4 md:col-span-1"
                />
                <div className="col-span-12 md:col-span-2 md:text-right">
                  <div className="md:hidden text-[11px] font-mono text-[var(--muted)] mb-1 uppercase tracking-wider">
                    Проходной балл
                  </div>
                  <div className="inline-flex items-center gap-2 md:justify-end">
                    <span className="text-xl md:text-2xl font-medium tracking-tighter gradient-text leading-none">
                      {cutoff ?? "—"}
                    </span>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

function Stat({
  label,
  value,
  className = "",
}: {
  label: string;
  value: number | string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="md:hidden text-[11px] font-mono text-[var(--muted)] mb-1 uppercase tracking-wider">
        {label}
      </div>
      <div className="text-[14px] md:text-[15px] font-mono text-foreground/90">
        {value}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-1.5 text-[12px] font-mono rounded-full border transition-all duration-300 " +
        (active
          ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
          : "border-white/[0.08] bg-white/[0.02] text-[var(--muted)] hover:text-foreground hover:border-white/[0.16]")
      }
    >
      {label}
    </button>
  );
}
