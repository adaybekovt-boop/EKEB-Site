"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Briefcase,
  Calculator,
  Check,
  ClipboardList,
  Code2,
  Info,
  Scale,
  Sparkles,
  Terminal,
} from "lucide-react";
import { AnimateNumber } from "@/components/ui/animated-blur-number";

const EASE = [0.16, 1, 0.3, 1] as const;

const specialties = [
  { id: "swdev", name: "ПО · Разработчик", shortName: "Разработчик ПО", difficulty: 0.78, icon: Code2 },
  { id: "swqa", name: "ПО · Тестировщик", shortName: "Тестировщик ПО", difficulty: 0.65, icon: Terminal },
  { id: "audit", name: "Учёт и аудит", shortName: "Бухгалтер", difficulty: 0.6, icon: Briefcase },
  { id: "appr", name: "Оценка", shortName: "Техник-оценщик", difficulty: 0.5, icon: ClipboardList },
  { id: "law", name: "Правоведение", shortName: "Юрист", difficulty: 0.7, icon: Scale },
] as const;

const achievementOptions = [
  "Олимпиады",
  "Спортивные разряды",
  "Волонтёрство",
  "Конкурсы проектов",
] as const;

function computeChance(opts: {
  difficulty: number;
  gpa: number;
  grade: 9 | 11;
  achievements: number;
}) {
  const gpaScore = Math.max(0, Math.min(1, (opts.gpa - 3) / 2));
  const gradeBonus = opts.grade === 9 ? 0.05 : 0;
  const achievementBonus = opts.achievements * 0.04;
  const raw = gpaScore * (1 - opts.difficulty * 0.5) + gradeBonus + achievementBonus;
  return Math.max(0.03, Math.min(0.92, raw));
}

function verdictOf(probability: number) {
  if (probability < 0.2) return { label: "Низкие шансы", color: "#d8362a" };
  if (probability < 0.45) return { label: "Ниже среднего", color: "#d4a574" };
  if (probability < 0.7) return { label: "Хорошие шансы", color: "#6178f5" };
  return { label: "Очень высокие", color: "#5dbb63" };
}

export function GrantCalculatorExperience() {
  const [specId, setSpecId] =
    useState<(typeof specialties)[number]["id"]>("swdev");
  const [grade, setGrade] = useState<9 | 11>(11);
  const [gpa, setGpa] = useState(4.2);
  const [achievements, setAchievements] = useState<string[]>([]);

  const specialty = specialties.find((item) => item.id === specId)!;
  const SpecialtyIcon = specialty.icon;
  const chance = useMemo(
    () =>
      computeChance({
        difficulty: specialty.difficulty,
        gpa,
        grade,
        achievements: achievements.length,
      }),
    [specialty.difficulty, gpa, grade, achievements.length]
  );
  const percent = Math.round(chance * 100);
  const verdict = verdictOf(chance);

  const toggleAchievement = (name: string) => {
    setAchievements((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  };

  return (
    <section id="grant" className="relative overflow-hidden py-24 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 25% 12%, rgba(97,120,245,0.09), transparent 48%), radial-gradient(ellipse at 82% 78%, rgba(212,165,116,0.055), transparent 42%)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <header className="mb-10 grid grid-cols-12 gap-6 md:mb-16 md:gap-8">
          <div className="col-span-12 md:col-span-7">
            <span className="mb-3 inline-block text-[13px] text-[var(--accent)]">
              Абитуриенту
            </span>
            <h2 className="text-[2.25rem] font-medium leading-[1.03] tracking-[-0.045em] md:text-6xl">
              Калькулятор шансов
              <span className="block text-[var(--muted)]">на государственный грант.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-7">
            <p className="max-w-md text-[14px] leading-relaxed text-[var(--muted)] md:text-[15px]">
              Быстрая ориентировочная оценка по специальности, базе поступления,
              среднему баллу и достижениям. Итог не является гарантией зачисления.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-12 items-start gap-5 md:gap-7">
          <div className="col-span-12 md:col-span-7">
            <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0e1016]/78 backdrop-blur-md">
              <Step number="01" title="Выберите специальность">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {specialties.map((item, index) => {
                    const Icon = item.icon;
                    const active = item.id === specId;
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSpecId(item.id)}
                        whileTap={{ scale: 0.985 }}
                        className={
                          "group flex min-h-[72px] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-300 " +
                          (active
                            ? "border-[var(--accent)]/55 bg-[var(--accent)]/[0.09]"
                            : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.13] hover:bg-white/[0.035]") +
                          (index === specialties.length - 1
                            ? " sm:col-span-2 sm:max-w-[calc(50%-0.25rem)]"
                            : "")
                        }
                      >
                        <span
                          className={
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors " +
                            (active
                              ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                              : "border-white/[0.08] text-[var(--muted)]")
                          }
                        >
                          <Icon className="h-4 w-4" strokeWidth={1.6} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[14px] font-medium tracking-tight">
                            {item.name}
                          </span>
                          <span className="mt-0.5 block text-[11.5px] text-[var(--muted)]">
                            {item.shortName}
                          </span>
                        </span>
                        {active && (
                          <Check className="ml-auto h-4 w-4 shrink-0 text-[var(--accent)]" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </Step>

              <Step number="02" title="База поступления и средний балл">
                <div className="mb-7 inline-grid grid-cols-2 rounded-xl border border-white/[0.07] bg-black/20 p-1">
                  {([9, 11] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={grade === value}
                      onClick={() => setGrade(value)}
                      className={
                        "min-w-[128px] rounded-lg px-5 py-2.5 text-[13px] transition-colors " +
                        (grade === value
                          ? "bg-white/[0.09] text-white"
                          : "text-[var(--muted)] hover:text-white")
                      }
                    >
                      {value} класс
                    </button>
                  ))}
                </div>

                <div className="flex items-end justify-between gap-5">
                  <label htmlFor="grant-gpa" className="text-[12px] text-[var(--muted)]">
                    Средний балл аттестата
                  </label>
                  <input
                    aria-label="Средний балл аттестата"
                    type="number"
                    min="3"
                    max="5"
                    step="0.1"
                    value={gpa.toFixed(1)}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      if (Number.isFinite(value)) {
                        setGpa(Math.min(5, Math.max(3, value)));
                      }
                    }}
                    className="w-20 rounded-lg border border-white/[0.09] bg-black/20 px-3 py-2 text-center font-mono text-[15px] tabular-nums text-white outline-none transition focus:border-[var(--accent)]/60"
                  />
                </div>
                <input
                  id="grant-gpa"
                  type="range"
                  min="3"
                  max="5"
                  step="0.1"
                  value={gpa}
                  onChange={(event) => setGpa(Number(event.target.value))}
                  className="mt-5 w-full cursor-pointer accent-[var(--accent)]"
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--muted)]">
                  <span>3.0</span>
                  <span>3.5</span>
                  <span>4.0</span>
                  <span>4.5</span>
                  <span>5.0</span>
                </div>
              </Step>

              <Step number="03" title="Дополнительные достижения" last>
                <p className="mb-4 text-[12px] leading-relaxed text-[var(--muted)]">
                  Можно выбрать несколько вариантов. Каждый пункт немного повышает
                  ориентировочную вероятность.
                </p>
                <div className="flex flex-wrap gap-2">
                  {achievementOptions.map((item) => {
                    const active = achievements.includes(item);
                    return (
                      <motion.button
                        key={item}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleAchievement(item)}
                        whileTap={{ scale: 0.97 }}
                        className={
                          "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[12px] transition-colors duration-300 " +
                          (active
                            ? "border-[var(--accent)]/55 bg-[var(--accent)]/[0.1] text-white"
                            : "border-white/[0.08] bg-white/[0.02] text-[var(--muted)] hover:border-white/[0.16] hover:text-white")
                        }
                      >
                        {active ? (
                          <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
                        ) : (
                          <Sparkles className="h-3.5 w-3.5" />
                        )}
                        {item}
                      </motion.button>
                    );
                  })}
                </div>
              </Step>
            </div>
          </div>

          <aside className="col-span-12 self-start md:sticky md:top-28 md:col-span-5">
            <div className="relative min-h-[470px] overflow-hidden rounded-[24px] border border-white/[0.09] bg-[#0b0d12]/88 p-6 backdrop-blur-md md:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full blur-3xl transition-colors duration-700"
                style={{
                  background: `radial-gradient(circle, ${verdict.color}32, transparent 65%)`,
                }}
              />
              <div className="relative flex min-h-[398px] flex-col">
                <div className="mb-3 flex items-center gap-2 text-[12px] text-[var(--muted)]">
                  <Calculator className="h-3.5 w-3.5" />
                  Расчётная вероятность
                </div>
                <AnimateNumber
                  value={percent}
                  suffix="%"
                  className="text-[clamp(4.5rem,10vw,7rem)] font-medium leading-none tracking-[-0.065em] tabular-nums"
                  style={{ color: verdict.color }}
                />
                <div className="mb-5 mt-6 h-1.5 overflow-hidden rounded-full bg-white/[0.055]">
                  <motion.div
                    initial={false}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.65, ease: EASE }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${verdict.color}, ${verdict.color}aa)`,
                    }}
                  />
                </div>
                <motion.div
                  key={verdict.label}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="text-2xl font-medium tracking-tight md:text-3xl"
                >
                  {verdict.label}
                </motion.div>

                <div className="mt-7 space-y-3 border-t border-white/[0.07] pt-6 text-[12.5px]">
                  <SummaryRow
                    label="Специальность"
                    value={specialty.shortName}
                    icon={<SpecialtyIcon className="h-3.5 w-3.5" />}
                  />
                  <SummaryRow label="База" value={`${grade} класс`} />
                  <SummaryRow label="Средний балл" value={gpa.toFixed(1)} mono />
                  <SummaryRow
                    label="Достижения"
                    value={String(achievements.length)}
                    mono
                  />
                </div>

                <div className="mt-auto pt-7">
                  <Link
                    href="/admissions/apply"
                    className="flex h-12 items-center justify-center rounded-xl border border-[var(--accent)]/35 bg-[var(--accent)]/[0.12] text-[13px] font-medium text-white transition-colors hover:bg-[var(--accent)]/[0.18]"
                  >
                    Узнать о поступлении
                  </Link>
                  <div className="mt-4 flex items-start gap-2 text-[10.5px] leading-relaxed text-[var(--muted)]">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <p>
                      Расчёт ориентировочный. Итог зависит от количества грантов и
                      конкурсного списка абитуриентов.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  children,
  last = false,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <fieldset className={"p-5 md:p-7 " + (!last ? "border-b border-white/[0.07]" : "")}>
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-[11px] text-[var(--accent)]">{number}</span>
        <h3 className="text-[13px] font-medium text-white/80">{title}</h3>
      </div>
      {children}
    </fieldset>
  );
}

function SummaryRow({
  label,
  value,
  icon,
  mono = false,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-[var(--muted)]">
        {icon}
        {label}
      </span>
      <span
        className={
          "max-w-[58%] truncate text-right text-white " +
          (mono ? "font-mono tabular-nums" : "")
        }
      >
        {value}
      </span>
    </div>
  );
}
