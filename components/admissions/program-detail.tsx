"use client";

import { ReactNode, cloneElement, isValidElement, ReactElement, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LucideIcon, ArrowUpRight, Clock, GraduationCap, Users, BookOpen, Briefcase } from "lucide-react";

function renderIcon(icon: ReactNode, className = "w-5 h-5", strokeWidth = 1.5): ReactNode {
  if (icon && isValidElement(icon)) {
    return cloneElement(icon as ReactElement<{ className?: string; strokeWidth?: number }>, {
      className,
      strokeWidth,
    });
  }
  return null;
}
import { DarkCard } from "@/components/ui/dark-card";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface ProgramExam {
  name: string;
  weight?: string;
}

export interface ProgramSeats {
  grant: number;
  paid: number;
}

export interface ProgramTuition {
  /** руб/тенге/etc — числовая стоимость в год */
  value: string;
  hint?: string;
}

export interface ProgramData {
  code: string;
  gosoCode: string;
  title: string;
  qualification: string;
  short: string;
  duration: { base9: string; base11: string };
  exams: ProgramExam[];
  cutoff: { year: string; score: number }[];
  seats: ProgramSeats;
  tuition: ProgramTuition;
  curriculum: string[];
  employers: string[];
  jobs: string[];
  icon?: ReactNode;
  accent?: "indigo" | "warm";
}

export function ProgramTabs({ items }: { items: ProgramData[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Tabs */}
      <div className="col-span-12 md:col-span-5 flex flex-col gap-2">
        {items.map((p, i) => {
          const pIcon = renderIcon(p.icon, "w-5 h-5", 1.5);
          const isActive = i === active;
          return (
            <button
              key={p.code}
              onClick={() => setActive(i)}
              className={
                "group relative text-left p-5 rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden " +
                (isActive
                  ? "border-white/[0.18] bg-[var(--elevated)]"
                  : "border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.12]")
              }
            >
              <span
                aria-hidden
                className={
                  "absolute left-0 top-0 bottom-0 w-[2px] origin-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
                  (isActive ? "scale-y-100" : "scale-y-0") +
                  (p.accent === "warm" ? " bg-[var(--accent-warm)]" : " bg-[var(--accent)]")
                }
                style={
                  isActive
                    ? {
                        boxShadow:
                          p.accent === "warm"
                            ? "0 0 12px rgba(212,165,116,0.6)"
                            : "0 0 12px rgba(97,120,245,0.6)",
                      }
                    : undefined
                }
              />
              <div className="flex items-center gap-4">
                <div
                  className={
                    "h-10 w-10 shrink-0 rounded-xl border flex items-center justify-center transition-colors duration-500 " +
                    (isActive
                      ? p.accent === "warm"
                        ? "border-white/[0.15] bg-white/[0.04] text-[var(--accent-warm)]"
                        : "border-white/[0.15] bg-white/[0.04] text-[var(--accent)]"
                      : "border-white/[0.08] bg-white/[0.02] text-[var(--muted)] group-hover:text-foreground")
                  }
                >
                  {pIcon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={
                        "text-[11px] font-mono transition-colors " +
                        (isActive
                          ? p.accent === "warm"
                            ? "text-[var(--accent-warm)]"
                            : "text-[var(--accent)]"
                          : "text-[var(--muted)]")
                      }
                    >
                      {p.code}
                    </span>
                    <h3
                      className={
                        "text-base md:text-lg font-medium tracking-tight transition-colors leading-snug " +
                        (isActive ? "text-foreground" : "text-foreground/85 group-hover:text-foreground")
                      }
                    >
                      {p.title}
                    </h3>
                  </div>
                  <div className="text-[12px] mt-0.5 text-[var(--muted)]/80">
                    {p.qualification}
                  </div>
                </div>
                <ArrowUpRight
                  className={
                    "w-4 h-4 transition-all duration-500 " +
                    (isActive
                      ? p.accent === "warm"
                        ? "text-[var(--accent-warm)] opacity-100"
                        : "text-[var(--accent)] opacity-100"
                      : "text-[var(--muted)] -translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0")
                  }
                  strokeWidth={1.75}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail */}
      <div className="col-span-12 md:col-span-7 relative [perspective:1400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.code}
            initial={{ opacity: 0, y: 20, rotateX: 6 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -16, rotateX: -4 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <DarkCard
              glow={current.accent === "warm" ? "gold" : "indigo"}
              className="p-6 sm:p-8 md:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl"
                style={{
                  background:
                    current.accent === "warm"
                      ? "radial-gradient(circle, rgba(212,165,116,0.30) 0%, transparent 60%)"
                      : "radial-gradient(circle, rgba(97,120,245,0.30) 0%, transparent 60%)",
                }}
              />

              <div className="relative flex items-start justify-between mb-6">
                <div
                  className={
                    "h-12 w-12 md:h-14 md:w-14 rounded-2xl border border-white/[0.12] bg-white/[0.04] flex items-center justify-center " +
                    (current.accent === "warm"
                      ? "text-[var(--accent-warm)]"
                      : "text-[var(--accent)]")
                  }
                >
                  {renderIcon(current.icon, "w-5 h-5 md:w-6 md:h-6", 1.5)}
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono text-[var(--muted)]">
                    ГОСО
                  </div>
                  <div className="text-[12.5px] font-mono text-foreground/90">
                    {current.gosoCode}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div
                  className={
                    "text-[12px] mb-1.5 " +
                    (current.accent === "warm"
                      ? "text-[var(--accent-warm)]"
                      : "text-[var(--accent)]")
                  }
                >
                  {current.qualification}
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tighter mb-3 leading-tight">
                  {current.title}
                </h3>
                <p className="text-[var(--muted)] text-[14px] md:text-[15px] leading-relaxed mb-6">
                  {current.short}
                </p>

                {/* Spec grid */}
                <div className="grid grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.08] mb-6">
                  <SpecCell
                    icon={Clock}
                    label="На базе 9 кл."
                    value={current.duration.base9}
                  />
                  <SpecCell
                    icon={Clock}
                    label="На базе 11 кл."
                    value={current.duration.base11}
                  />
                  <SpecCell
                    icon={Users}
                    label="Мест: грант"
                    value={String(current.seats.grant)}
                  />
                  <SpecCell
                    icon={GraduationCap}
                    label="Мест: платно"
                    value={String(current.seats.paid)}
                  />
                </div>

                {/* Exams */}
                <div className="mb-6">
                  <div className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider mb-2.5">
                    Вступительные экзамены
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {current.exams.map((e) => (
                      <span
                        key={e.name}
                        className="px-3 py-1.5 text-[12px] rounded-full border border-white/[0.08] bg-white/[0.025] text-foreground/90"
                      >
                        {e.name}
                        {e.weight && (
                          <span className="text-[var(--muted)] ml-1.5">
                            · {e.weight}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cutoff history */}
                <div className="mb-6">
                  <div className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider mb-2.5">
                    Проходной балл по годам
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {current.cutoff.map((c) => (
                      <div
                        key={c.year}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2"
                      >
                        <div className="text-[10.5px] font-mono text-[var(--muted)]">
                          {c.year}
                        </div>
                        <div
                          className={
                            "text-base font-medium tracking-tight " +
                            (current.accent === "warm"
                              ? "gradient-warm"
                              : "gradient-text")
                          }
                        >
                          {c.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curriculum */}
                <details className="group/d border-t border-white/[0.06] pt-5 mb-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <div className="flex items-center gap-2 text-[12.5px] text-foreground/90">
                      <BookOpen className="w-3.5 h-3.5 text-[var(--muted)]" strokeWidth={1.75} />
                      Учебный план
                    </div>
                    <span className="text-[var(--muted)] text-xs transition-transform group-open/d:rotate-45">
                      +
                    </span>
                  </summary>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[12.5px] text-[var(--muted)]">
                    {current.curriculum.map((c) => (
                      <li key={c} className="flex gap-2 items-baseline leading-snug">
                        <span className="text-[var(--accent)]/60">·</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </details>

                <details className="group/d border-t border-white/[0.06] pt-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <div className="flex items-center gap-2 text-[12.5px] text-foreground/90">
                      <Briefcase className="w-3.5 h-3.5 text-[var(--muted)]" strokeWidth={1.75} />
                      Где работают выпускники
                    </div>
                    <span className="text-[var(--muted)] text-xs transition-transform group-open/d:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="text-[11px] font-mono text-[var(--muted)] mb-1.5">
                        Должности
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {current.jobs.map((j) => (
                          <span
                            key={j}
                            className="px-2.5 py-1 text-[11.5px] rounded-full border border-white/[0.08] bg-white/[0.02] text-foreground/85"
                          >
                            {j}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[var(--muted)] mb-1.5">
                        Партнёры по практике
                      </div>
                      <div className="text-[12.5px] text-[var(--muted)] leading-relaxed">
                        {current.employers.join(" · ")}
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </DarkCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SpecCell({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[var(--background)]/40 backdrop-blur-sm p-4">
      <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-[var(--muted)] uppercase tracking-wider mb-1.5">
        <Icon className="w-3 h-3" strokeWidth={1.75} />
        {label}
      </div>
      <div className="text-[15px] md:text-base font-medium tracking-tight text-foreground">
        {value}
      </div>
    </div>
  );
}
