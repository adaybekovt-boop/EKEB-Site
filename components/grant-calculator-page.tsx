"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator,
  Info,
  Sparkles,
  Trophy,
  Award,
  Globe,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { DarkCard } from "@/components/ui/dark-card";
import {
  SPECIALTIES,
  PEER_COLLEGES,
  calculateChance,
  verdictOf,
  type Specialty,
} from "@/lib/grant-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const toneColor = {
  low: "#d8362a",
  mid: "#d4a574",
  high: "#6178f5",
  top: "#5dbb63",
} as const;

export function GrantCalculatorPage() {
  const [specId, setSpecId] = useState<string>(SPECIALTIES[0].id);
  const [grade, setGrade] = useState<9 | 11>(11);
  const [gpa, setGpa] = useState(4.2);
  const [unt, setUnt] = useState(85);
  const [achievements, setAchievements] = useState(0);
  const [honors, setHonors] = useState(false);
  const [serpin, setSerpin] = useState(false);

  const specialty = SPECIALTIES.find((s) => s.id === specId) ?? SPECIALTIES[0];

  const result = useMemo(
    () =>
      calculateChance({
        specialty,
        grade,
        gpa,
        unt: grade === 11 ? unt : 0,
        achievements,
        honors,
        serpin,
      }),
    [specialty, grade, gpa, unt, achievements, honors, serpin]
  );

  const percent = Math.round(result.probability * 100);
  const verdict = verdictOf(result.probability);
  const color = toneColor[verdict.tone];

  const SpecIcon = specialty.icon;

  return (
    <>
      {/* ────────────────────────────────────────────────────── */}
      {/* CALCULATOR                                              */}
      {/* ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* ─── Inputs ─── */}
          <div className="col-span-12 lg:col-span-7 space-y-4 md:space-y-5">
            {/* Specialty */}
            <CalcCard step="01" title="Выберите специальность">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {SPECIALTIES.map((s) => {
                  const active = s.id === specId;
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSpecId(s.id)}
                      className={
                        "group flex items-start gap-3 px-4 py-3 rounded-xl text-left transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] border " +
                        (active
                          ? "border-white/[0.18] bg-white/[0.04]"
                          : "border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.1]")
                      }
                    >
                      <div
                        className={
                          "h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 transition-colors " +
                          (active
                            ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                            : "border-white/[0.08] bg-white/[0.02] text-[var(--muted)] group-hover:text-foreground")
                        }
                      >
                        <Icon className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13.5px] font-medium tracking-tight truncate">
                          {s.name}
                        </div>
                        <div className="mt-0.5 text-[11px] text-[var(--muted)]">
                          конкурс ≈ {s.competitionRatio.toFixed(1)} чел/место
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CalcCard>

            {/* Grade */}
            <CalcCard step="02" title="На базе какого класса поступаете">
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
                          : "border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.1]")
                      }
                    >
                      <div className="text-2xl font-medium tracking-tight mb-0.5">
                        {g} класс
                      </div>
                      <div className="text-[12px] text-[var(--muted)]">
                        {g === 9
                          ? "Основное общее · больше грантов"
                          : "Среднее общее · короче программа"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CalcCard>

            {/* GPA */}
            <CalcCard step="03" title="Средний балл аттестата">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-4xl font-medium tracking-tighter tabular-nums gradient-text">
                  {gpa.toFixed(1)}
                </span>
                <span className="text-[12px] text-[var(--muted)]">
                  от 3.0 до 5.0
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="5"
                step="0.1"
                value={gpa}
                onChange={(e) => setGpa(parseFloat(e.target.value))}
                className="w-full accent-[var(--accent)] cursor-pointer"
                aria-label="Средний балл"
              />
              <div className="flex justify-between text-[10.5px] text-[var(--muted)] mt-2 font-mono">
                <span>3.0</span>
                <span>3.5</span>
                <span>4.0</span>
                <span>4.5</span>
                <span>5.0</span>
              </div>
            </CalcCard>

            {/* ENT (only for 11th grade) */}
            <AnimatePresence initial={false}>
              {grade === 11 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  style={{ overflow: "hidden" }}
                >
                  <CalcCard step="04" title="Балл ЕНТ (если сдавали)">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-4xl font-medium tracking-tighter tabular-nums gradient-warm">
                        {unt}
                      </span>
                      <span className="text-[12px] text-[var(--muted)]">
                        из 140
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="140"
                      step="1"
                      value={unt}
                      onChange={(e) => setUnt(parseInt(e.target.value, 10))}
                      className="w-full accent-[var(--accent)] cursor-pointer"
                      aria-label="Балл ЕНТ"
                    />
                    <div className="flex justify-between text-[10.5px] text-[var(--muted)] mt-2 font-mono">
                      <span>0</span>
                      <span>50</span>
                      <span>80</span>
                      <span>110</span>
                      <span>140</span>
                    </div>
                  </CalcCard>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Achievements */}
            <CalcCard
              step={grade === 11 ? "05" : "04"}
              title="Дополнительные достижения"
            >
              <p className="text-[12px] text-[var(--muted)] mb-4 max-w-md">
                Олимпиады, WorldSkills, спорт. Каждое прибавляет ≈ 4 п.п.
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
                <div className="text-[12.5px] text-[var(--muted)] ml-2">
                  достижений
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Toggle
                  active={honors}
                  onClick={() => setHonors((v) => !v)}
                  icon={<Award className="w-3.5 h-3.5" />}
                  label="Аттестат с отличием / Алтын белгі"
                />
                <Toggle
                  active={serpin}
                  onClick={() => setSerpin((v) => !v)}
                  icon={<Globe className="w-3.5 h-3.5" />}
                  label="Программа «Серпін»"
                />
              </div>
            </CalcCard>
          </div>

          {/* ─── Result ─── */}
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 self-start">
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] bg-gradient-to-br from-[var(--elevated)] to-[var(--background)] p-6 md:p-9">
              <div
                aria-hidden
                className="absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl transition-colors duration-700"
                style={{
                  background: `radial-gradient(circle, ${color}40 0%, transparent 60%)`,
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative flex flex-col">
                <div className="flex items-center gap-2 text-[12px] text-[var(--muted)] mb-1">
                  <Calculator className="w-3.5 h-3.5" />
                  Расчётная вероятность
                </div>

                <div className="flex items-baseline gap-2 mb-5">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={percent}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="text-[clamp(4.5rem,15vw,8rem)] font-medium tracking-tighter tabular-nums leading-none"
                      style={{ color }}
                    >
                      {percent}
                    </motion.span>
                  </AnimatePresence>
                  <span
                    className="text-3xl font-medium tracking-tighter"
                    style={{ color }}
                  >
                    %
                  </span>
                </div>

                <div className="relative h-2 rounded-full overflow-hidden bg-white/[0.05] mb-2">
                  <motion.div
                    initial={false}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${color}, ${color}b3)`,
                      boxShadow: `0 0 16px ${color}66`,
                    }}
                  />
                </div>
                <div className="text-[11px] text-[var(--muted)] mb-5">
                  ± {result.confidence} п.п. доверительный коридор
                </div>

                <div className="text-xl md:text-2xl font-medium tracking-tighter mb-1">
                  {verdict.label}
                </div>
                <p className="text-[13px] text-[var(--muted)] leading-relaxed mb-6 max-w-sm">
                  {verdict.hint}
                </p>

                {/* Passing GPA forecast */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 mb-5">
                  <div className="flex items-center justify-between text-[12px] text-[var(--muted)] mb-2">
                    <span>Прогноз проходного балла</span>
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-2xl font-medium tracking-tight tabular-nums">
                      {result.estimatedPassingGpa.toFixed(2)}
                    </span>
                    <span
                      className={
                        "text-[12px] " +
                        (result.gpaGap >= 0
                          ? "text-[var(--color-positive)]"
                          : "text-[var(--color-negative)]")
                      }
                    >
                      ваш аттестат {result.gpaGap >= 0 ? "+" : ""}
                      {result.gpaGap}
                    </span>
                  </div>
                </div>

                {/* Breakdown */}
                {result.breakdown.length > 0 && (
                  <div className="space-y-1.5 text-[12.5px] mb-6">
                    {result.breakdown.map((b) => (
                      <div
                        key={b.label}
                        className="flex items-center justify-between text-[var(--muted)]"
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={
                              "font-mono w-3 inline-flex justify-center " +
                              (b.sign === "+"
                                ? "text-[var(--color-positive)]"
                                : b.sign === "−"
                                ? "text-[var(--color-negative)]"
                                : "text-[var(--accent)]")
                            }
                          >
                            {b.sign}
                          </span>
                          {b.label}
                        </span>
                        <span className="font-mono tabular-nums text-foreground">
                          {b.value} п.п.
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected specialty summary */}
                <div className="pt-5 border-t border-white/[0.06] space-y-2 text-[12.5px]">
                  <Row
                    label="Специальность"
                    value={specialty.name}
                    icon={<SpecIcon className="w-3.5 h-3.5" />}
                  />
                  <Row
                    label="Классификатор"
                    value={specialty.classifier}
                    mono
                  />
                  <Row label="База" value={`${grade} класс`} />
                  <Row label="Средний балл" value={gpa.toFixed(1)} mono />
                  {grade === 11 && (
                    <Row label="Балл ЕНТ" value={String(unt)} mono />
                  )}
                  <Row
                    label="Грантов от набора"
                    value={`${Math.round(specialty.grantShare * 100)}%`}
                    mono
                  />
                </div>

                <div className="mt-6 flex items-start gap-2 text-[11.5px] text-[var(--muted)] leading-relaxed">
                  <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <p>
                    Оценка ориентировочная. Финальный проходной балл зависит от
                    количества государственных мест на специальность и состава
                    абитуриентов 2026 года.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────── */}
      {/* SPECIALTY MARKET CONTEXT                                */}
      {/* ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-10">
          <div className="col-span-12 md:col-span-7">
            <span className="text-[13px] text-[var(--accent)] mb-3 inline-block">
              Контекст
            </span>
            <h2 className="text-[2rem] md:text-5xl font-medium tracking-tighter leading-[1.05]">
              Что вы выбрали:
              <br />
              <span className="text-[var(--muted)]">{specialty.name}</span>.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-[var(--muted)] text-[14.5px] leading-relaxed max-w-md">
              {specialty.market}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
          <StatTile
            label="Конкурс"
            value={`${specialty.competitionRatio.toFixed(1)}×`}
            hint="заявок на одно гос. место"
            icon={<TrendingUp className="w-4 h-4" />}
          />
          <StatTile
            label="Проходной балл"
            value={specialty.passingGpa.toFixed(2)}
            hint="средний по РК, 2023-2024"
            icon={<Trophy className="w-4 h-4" />}
          />
          <StatTile
            label="Грантов от набора"
            value={`${Math.round(specialty.grantShare * 100)}%`}
            hint="доля гос. мест"
            icon={<Sparkles className="w-4 h-4" />}
          />
          <StatTile
            label="Квалификация"
            value={specialty.qualification.split(" ").slice(0, 2).join(" ")}
            hint="по диплому ТиПО"
            icon={<Award className="w-4 h-4" />}
          />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────── */}
      {/* PEER COLLEGES COMPARISON                                */}
      {/* ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-20">
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-10">
          <div className="col-span-12 md:col-span-7">
            <span className="text-[13px] text-[var(--accent)] mb-3 inline-block">
              Сравнение
            </span>
            <h2 className="text-[2rem] md:text-5xl font-medium tracking-tighter leading-[1.05]">
              Конкурс в других
              <br />
              <span className="text-[var(--muted)]">колледжах Казахстана</span>.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-[var(--muted)] text-[14.5px] leading-relaxed max-w-md">
              Ориентировочные данные приёмных кампаний 2023–2024 по 9 ведущим
              ТиПО Казахстана. ЕКЕБ выделен.
            </p>
          </div>
        </div>

        <PeerTable highlight="ЕКЕБ (Актобе)" />
      </section>

      {/* ────────────────────────────────────────────────────── */}
      {/* DISCLAIMER + NEXT STEPS                                 */}
      {/* ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <NextStep
            n="01"
            title="Подать документы онлайн"
            body="Заполните электронную форму — займёт 10 минут."
            href="/admissions/apply"
          />
          <NextStep
            n="02"
            title="Список специальностей"
            body="Полный учебный план, стоимость, партнёры по практике."
            href="/admissions/programs"
          />
          <NextStep
            n="03"
            title="Приёмная комиссия"
            body="Контакты, часы работы, перечень документов."
            href="/admissions/commission"
          />
        </div>
      </section>
    </>
  );
}

/* ─── Subcomponents ───────────────────────────────────────────── */

function CalcCard({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <DarkCard className="p-5 md:p-7">
      <div className="flex items-center gap-2 text-[12px] text-[var(--muted)] mb-4">
        <span className="font-mono text-[var(--accent)]">{step}</span>
        <span>{title}</span>
      </div>
      {children}
    </DarkCard>
  );
}

function Toggle({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12.5px] transition-all duration-300 " +
        (active
          ? "border-[var(--accent)]/40 bg-[var(--accent)]/12 text-foreground"
          : "border-white/[0.08] bg-white/[0.02] text-[var(--muted)] hover:text-foreground")
      }
      aria-pressed={active}
    >
      {icon}
      {label}
    </button>
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
          "text-foreground text-right truncate max-w-[60%] " +
          (mono ? "font-mono tabular-nums" : "")
        }
      >
        {value}
      </span>
    </div>
  );
}

function StatTile({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6"
    >
      <div className="flex items-center justify-between text-[var(--muted)] text-[11.5px] mb-4">
        <span className="uppercase tracking-wide">{label}</span>
        <span className="text-[var(--accent)]">{icon}</span>
      </div>
      <div className="text-3xl md:text-4xl font-medium tracking-tighter mb-1">
        {value}
      </div>
      <div className="text-[12px] text-[var(--muted)]">{hint}</div>
    </motion.div>
  );
}

function PeerTable({ highlight }: { highlight: string }) {
  return (
    <div className="overflow-x-auto -mx-5 md:mx-0">
      <div className="min-w-[640px] md:min-w-0 mx-5 md:mx-0">
        <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 text-[11px] uppercase tracking-wider text-[var(--muted)] border-b border-white/[0.06]">
          <div className="col-span-4">Колледж</div>
          <div className="col-span-2">Город</div>
          <div className="col-span-2 text-right">Проходной IT</div>
          <div className="col-span-2 text-right">Проходной эк/юр</div>
          <div className="col-span-2 text-right">Конкурс IT</div>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {PEER_COLLEGES.map((c, i) => {
            const isUs = c.name === highlight;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                className={
                  "grid grid-cols-12 gap-3 px-5 py-4 text-[13px] items-center " +
                  (isUs
                    ? "bg-[var(--accent)]/[0.07] border-l-2 border-[var(--accent)]"
                    : "")
                }
              >
                <div
                  className={
                    "col-span-12 md:col-span-4 font-medium tracking-tight " +
                    (isUs ? "text-[var(--accent)]" : "text-foreground")
                  }
                >
                  {c.name}
                  {isUs && (
                    <span className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] align-middle">
                      ВЫ
                    </span>
                  )}
                </div>
                <div className="col-span-4 md:col-span-2 text-[var(--muted)]">
                  {c.city}
                </div>
                <div className="col-span-4 md:col-span-2 md:text-right font-mono tabular-nums">
                  {c.itPassing.toFixed(2)}
                </div>
                <div className="col-span-4 md:col-span-2 md:text-right font-mono tabular-nums text-[var(--muted)]">
                  {c.econPassing.toFixed(2)}
                </div>
                <div className="col-span-12 md:col-span-2 md:text-right font-mono tabular-nums">
                  {c.itRatio.toFixed(1)}×
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NextStep({
  n,
  title,
  body,
  href,
}: {
  n: string;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group relative block rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-6 transition-all duration-500 overflow-hidden"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
      />
      <div className="flex items-start justify-between mb-6">
        <span className="text-[11px] font-mono text-[var(--accent)]">{n}</span>
        <ChevronRight
          className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all"
          strokeWidth={1.75}
        />
      </div>
      <h3 className="text-lg font-medium tracking-tight mb-2">{title}</h3>
      <p className="text-[13px] text-[var(--muted)] leading-relaxed">{body}</p>
    </a>
  );
}
