"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Code2, Briefcase, Terminal, ClipboardList, Scale, Info } from "lucide-react";
import { AnimateNumber } from "@/components/ui/animated-blur-number";
import { DarkCard } from "@/components/ui/dark-card";

/**
 * Реалистичная оценка шансов на грант.
 *
 * Логика:
 * 1) Средний балл → нормированный gpaScore [0..1]:  (gpa - 3) / 2
 * 2) У каждой специальности есть «конкурентность» difficulty [0..1].
 *    Чем выше — тем сложнее проходной балл.
 * 3) Базовый шанс = gpaScore * (1 - difficulty * 0.5)
 * 4) После 9 класса грантов больше — небольшой бонус +5 п.п.
 * 5) Достижения (олимпиады, WorldSkills, аттестат отличника) — +4 п.п. за каждое.
 * 6) Результат всегда зажат в коридоре 3–92% — никакого «гарантированно» и «нулевого шанса».
 *
 * Это НЕ официальная формула — это честная грубая оценка по статистике конкурса.
 */
const specialties = [
  { id: "swdev", name: "ПО · Разработчик", difficulty: 0.78, icon: Code2 },
  { id: "swqa", name: "ПО · Тестировщик / сопровождение", difficulty: 0.65, icon: Terminal },
  { id: "audit", name: "Учёт и аудит · Бухгалтер", difficulty: 0.6, icon: Briefcase },
  { id: "appr", name: "Оценка · Техник-оценщик", difficulty: 0.5, icon: ClipboardList },
  { id: "law", name: "Правоведение · Юрист", difficulty: 0.7, icon: Scale },
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

function verdictOf(p: number): { label: string; tone: "low" | "mid" | "high" | "top" } {
  if (p < 0.2) return { label: "Низкий шанс", tone: "low" };
  if (p < 0.45) return { label: "Ниже среднего", tone: "mid" };
  if (p < 0.7) return { label: "Хороший шанс", tone: "high" };
  return { label: "Очень высокий", tone: "top" };
}

export function GrantCalculator() {
  const [specId, setSpecId] = useState<(typeof specialties)[number]["id"]>("swdev");
  const [grade, setGrade] = useState<9 | 11>(11);
  const [gpa, setGpa] = useState(4.2);
  const [achievements, setAchievements] = useState(0);

  const spec = specialties.find((s) => s.id === specId)!;
  const SpecIcon = spec.icon;

  const chance = useMemo(
    () => computeChance({ difficulty: spec.difficulty, gpa, grade, achievements }),
    [spec.difficulty, gpa, grade, achievements]
  );
  const percent = Math.round(chance * 100);
  const v = verdictOf(chance);

  const toneColor = {
    low: "#d8362a",
    mid: "#d4a574",
    high: "#6178f5",
    top: "#5dbb63",
  }[v.tone];

  return (
    <section id="grant" className="relative py-24 md:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(97,120,245,0.10) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(212,165,116,0.08) 0%, transparent 55%)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-10 md:mb-16">
          <div className="col-span-12 md:col-span-7">
            <span className="text-[13px] text-[var(--accent)] mb-3 inline-block">Абитуриенту</span>
            <h2 className="text-[2rem] md:text-5xl font-medium tracking-tighter leading-[1.05]">
              Калькулятор шансов<br />
              <span className="text-[var(--muted)]">на государственный грант</span>.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-[var(--muted)] text-[15px] leading-relaxed max-w-md">
              Оценка по среднему баллу аттестата, выбранной специальности и достижениям.
              Это ориентир, а не гарантия — финальный конкурс зависит от полного списка абитуриентов года.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* ─── Inputs ─── */}
          <div className="col-span-12 md:col-span-7 space-y-5">
            {/* Specialty */}
            <DarkCard className="p-6 md:p-7">
              <div className="flex items-center gap-2 text-[12px] text-[var(--muted)] mb-4">
                <span className="font-mono text-[var(--accent)]">01</span>
                <span>Выберите специальность</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {specialties.map((s) => {
                  const Icon = s.icon;
                  const active = s.id === specId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSpecId(s.id)}
                      className={
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] border " +
                        (active
                          ? "border-white/[0.18] bg-white/[0.04]"
                          : "border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/[0.1]")
                      }
                    >
                      <div
                        className={
                          "h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 transition-colors " +
                          (active
                            ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                            : "border-white/[0.08] bg-white/[0.02] text-[var(--muted)]")
                        }
                      >
                        <Icon className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                      <span className="text-[13.5px] font-medium tracking-tight">{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </DarkCard>

            {/* Grade */}
            <DarkCard className="p-6 md:p-7">
              <div className="flex items-center gap-2 text-[12px] text-[var(--muted)] mb-4">
                <span className="font-mono text-[var(--accent)]">02</span>
                <span>На базе какого класса поступаете</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {([9, 11] as const).map((g) => {
                  const active = g === grade;
                  return (
                    <button
                      key={g}
                      onClick={() => setGrade(g)}
                      className={
                        "rounded-xl py-4 text-left px-5 transition-all duration-400 border " +
                        (active
                          ? "border-white/[0.18] bg-white/[0.04]"
                          : "border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/[0.1]")
                      }
                    >
                      <div className="text-2xl font-medium tracking-tight mb-0.5">{g} класс</div>
                      <div className="text-[12px] text-[var(--muted)]">
                        {g === 9 ? "Основное общее" : "Среднее общее"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </DarkCard>

            {/* GPA slider */}
            <DarkCard className="p-6 md:p-7">
              <div className="flex items-center gap-2 text-[12px] text-[var(--muted)] mb-4">
                <span className="font-mono text-[var(--accent)]">03</span>
                <span>Средний балл аттестата</span>
              </div>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-4xl font-medium tracking-tighter tabular-nums gradient-text">
                  {gpa.toFixed(1)}
                </span>
                <span className="text-[12px] text-[var(--muted)]">от 3.0 до 5.0</span>
              </div>
              <input
                type="range"
                min="3"
                max="5"
                step="0.1"
                value={gpa}
                onChange={(e) => setGpa(parseFloat(e.target.value))}
                className="w-full accent-[var(--accent)] cursor-pointer"
              />
              <div className="flex justify-between text-[10.5px] text-[var(--muted)] mt-2 font-mono">
                <span>3.0</span>
                <span>3.5</span>
                <span>4.0</span>
                <span>4.5</span>
                <span>5.0</span>
              </div>
            </DarkCard>

            {/* Achievements */}
            <DarkCard className="p-6 md:p-7">
              <div className="flex items-center gap-2 text-[12px] text-[var(--muted)] mb-2">
                <span className="font-mono text-[var(--accent)]">04</span>
                <span>Дополнительные достижения</span>
              </div>
              <p className="text-[12px] text-[var(--muted)] mb-4 max-w-md">
                Олимпиады, WorldSkills, спорт, аттестат с отличием — каждое добавляет ≈4 п.п.
                Максимум 5 учитываемых достижений.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAchievements(Math.max(0, achievements - 1))}
                  className="h-10 w-10 rounded-full border border-white/[0.1] text-[var(--muted)] hover:text-foreground hover:border-white/[0.2] transition"
                  aria-label="Меньше"
                >
                  −
                </button>
                <div className="text-2xl font-medium tracking-tight tabular-nums min-w-[2ch] text-center">
                  {achievements}
                </div>
                <button
                  onClick={() => setAchievements(Math.min(5, achievements + 1))}
                  className="h-10 w-10 rounded-full border border-white/[0.1] text-[var(--muted)] hover:text-foreground hover:border-white/[0.2] transition"
                  aria-label="Больше"
                >
                  +
                </button>
                <div className="text-[12.5px] text-[var(--muted)] ml-2">достижений</div>
              </div>
            </DarkCard>
          </div>

          {/* ─── Result ─── */}
          <div className="col-span-12 md:col-span-5 md:sticky md:top-32 self-start">
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] bg-gradient-to-br from-[var(--elevated)] to-[var(--background)] p-6 md:p-10 min-h-[420px] md:min-h-[520px]">
              <div
                className="absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl transition-colors duration-700"
                style={{ background: `radial-gradient(circle, ${toneColor}40 0%, transparent 60%)` }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative flex flex-col h-full">
                <div className="flex items-center gap-2 text-[12px] text-[var(--muted)] mb-1">
                  <Calculator className="w-3.5 h-3.5" />
                  Расчётная вероятность
                </div>

                {/* big percent */}
                <div className="flex items-baseline gap-2 mb-5">
                  <AnimateNumber
                    value={percent}
                    suffix="%"
                    className="text-[clamp(4rem,12vw,7rem)] font-medium tracking-tighter tabular-nums leading-none"
                    style={{ color: toneColor }}
                  />
                </div>

                {/* progress bar */}
                <div className="relative h-2 rounded-full overflow-hidden bg-white/[0.05] mb-5">
                  <motion.div
                    initial={false}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${toneColor}, ${toneColor}b3)`,
                      boxShadow: `0 0 16px ${toneColor}66`,
                    }}
                  />
                </div>

                {/* verdict */}
                <div className="text-xl md:text-3xl font-medium tracking-tighter mb-1">
                  {v.label}
                </div>

                {/* selected spec summary */}
                <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2.5 text-[13px]">
                  <Row label="Специальность" value={spec.name} icon={<SpecIcon className="w-3.5 h-3.5" />} />
                  <Row label="База" value={`${grade} класс`} />
                  <Row label="Средний балл" value={gpa.toFixed(1)} mono />
                  <Row label="Достижений" value={String(achievements)} mono />
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-start gap-2 text-[11.5px] text-[var(--muted)] leading-relaxed">
                    <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <p>
                      Оценка ориентировочная. Финальный проходной балл зависит от количества
                      государственных мест на специальность и состава абитуриентов 2026 года.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  icon,
  mono,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-[var(--muted)]">
        {icon}
        <span>{label}</span>
      </div>
      <span
        className={
          "text-foreground text-right truncate max-w-[60%] " + (mono ? "font-mono tabular-nums" : "")
        }
      >
        {value}
      </span>
    </div>
  );
}
