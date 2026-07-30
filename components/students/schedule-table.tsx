"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface BellRow {
  code: string;
  label: string;
  time: string;
  kind?: "lesson" | "break";
  hint?: string;
}

export function BellsTable({ rows }: { rows: BellRow[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      <div className="grid grid-cols-[60px_1fr_120px] md:grid-cols-[80px_1fr_180px] px-4 md:px-6 py-3 border-b border-white/[0.06] text-[11px] uppercase tracking-wider text-[var(--muted)] font-mono">
        <span>№</span>
        <span>Занятие</span>
        <span className="text-right">Время</span>
      </div>
      <div className="divide-y divide-white/[0.05]">
        {rows.map((row, i) => {
          const isBreak = row.kind === "break";
          return (
            <motion.div
              key={row.code}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
              className={
                "grid grid-cols-[60px_1fr_120px] md:grid-cols-[80px_1fr_180px] items-center px-4 md:px-6 py-4 md:py-5 transition-colors duration-300 " +
                (isBreak
                  ? "bg-[var(--background)]/40 text-[var(--muted)]"
                  : "hover:bg-white/[0.02]")
              }
            >
              <span
                className={
                  "font-mono text-[12px] " +
                  (isBreak ? "text-[var(--muted)]/60" : "text-[var(--accent)]")
                }
              >
                {row.code}
              </span>
              <div className="min-w-0">
                <div
                  className={
                    "text-[14px] md:text-[15px] tracking-tight " +
                    (isBreak ? "text-[var(--muted)]" : "text-foreground")
                  }
                >
                  {row.label}
                </div>
                {row.hint && (
                  <div className="text-[12px] text-[var(--muted)] mt-0.5">
                    {row.hint}
                  </div>
                )}
              </div>
              <span
                className={
                  "text-right font-mono text-[13px] md:text-[14px] tabular-nums " +
                  (isBreak ? "text-[var(--muted)]/70" : "text-foreground/85")
                }
              >
                {row.time}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export interface LegendItem {
  color: "indigo" | "warm" | "muted" | "ok";
  label: string;
}

export function Legend({ items }: { items: LegendItem[] }) {
  const colorMap: Record<LegendItem["color"], string> = {
    indigo: "bg-[var(--accent)]",
    warm: "bg-[var(--accent-warm)]",
    muted: "bg-white/30",
    ok: "bg-emerald-400",
  };
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-[var(--muted)]">
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${colorMap[it.color]}`} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

export interface ExamRow {
  date: string;
  subject: string;
  course: string;
  time: string;
  room: string;
  kind?: "exam" | "consult" | "defense";
}

export function ExamTable({ rows }: { rows: ExamRow[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-x-auto">
      <div className="min-w-[720px]">
        <div className="grid grid-cols-[110px_1fr_120px_140px_120px] px-5 py-3 border-b border-white/[0.06] text-[11px] uppercase tracking-wider text-[var(--muted)] font-mono">
          <span>Дата</span>
          <span>Предмет</span>
          <span>Курс</span>
          <span>Время</span>
          <span className="text-right">Кабинет</span>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {rows.map((r, i) => (
            <motion.div
              key={`${r.date}-${r.subject}`}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.45, delay: i * 0.03, ease: EASE }}
              className="grid grid-cols-[110px_1fr_120px_140px_120px] items-center px-5 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <span className="font-mono text-[12.5px] text-[var(--accent)]">
                {r.date}
              </span>
              <div className="min-w-0">
                <div className="text-[14px] tracking-tight">{r.subject}</div>
                {r.kind && (
                  <div className="text-[11px] text-[var(--muted)] mt-0.5">
                    {r.kind === "consult"
                      ? "Консультация"
                      : r.kind === "defense"
                      ? "Защита"
                      : "Экзамен"}
                  </div>
                )}
              </div>
              <span className="text-[13px] text-foreground/85">{r.course}</span>
              <span className="font-mono text-[13px] text-foreground/85 tabular-nums">
                {r.time}
              </span>
              <span className="text-right font-mono text-[13px] text-[var(--accent-warm)] tabular-nums">
                {r.room}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export interface CalendarBand {
  month: string;
  events: { kind: "lessons" | "session" | "break" | "practice" | "defense"; label: string; days?: string }[];
}

const bandColor: Record<CalendarBand["events"][number]["kind"], string> = {
  lessons: "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30",
  session: "bg-[var(--accent-warm)]/15 text-[var(--accent-warm)] border-[var(--accent-warm)]/30",
  break: "bg-white/[0.04] text-[var(--muted)] border-white/[0.1]",
  practice: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
  defense: "bg-rose-400/10 text-rose-300 border-rose-400/30",
};

export function CalendarGrid({ bands }: { bands: CalendarBand[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {bands.map((b, i) => (
        <motion.div
          key={b.month}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.55, delay: i * 0.04, ease: EASE }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
        >
          <div className="flex items-baseline justify-between mb-3">
            <h4 className="text-[15px] font-medium tracking-tight">{b.month}</h4>
            <span className="font-mono text-[11px] text-[var(--muted)]">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="space-y-1.5">
            {b.events.map((ev, idx) => (
              <div
                key={`${ev.label}-${idx}`}
                className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-[12.5px] ${bandColor[ev.kind]}`}
              >
                <span className="truncate">{ev.label}</span>
                {ev.days && (
                  <span className="font-mono text-[11px] opacity-75 shrink-0">
                    {ev.days}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function AppMockup({
  title,
  children,
  variant = "indigo",
}: {
  title: string;
  children: ReactNode;
  variant?: "indigo" | "warm";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative rounded-2xl border border-white/[0.08] bg-[var(--elevated)] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-0 opacity-60"
        style={{
          background:
            variant === "warm"
              ? "radial-gradient(ellipse at 100% 0%, rgba(212,165,116,0.18) 0%, transparent 60%)"
              : "radial-gradient(ellipse at 0% 0%, rgba(97,120,245,0.18) 0%, transparent 60%)",
        }}
      />
      <div className="relative flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-[11.5px] font-mono text-[var(--muted)]">
          smartnation.ekeb.kz · {title}
        </span>
      </div>
      <div className="relative p-5 md:p-6">{children}</div>
    </motion.div>
  );
}
