"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cpu,
  BookOpen,
  Mic2,
  UtensilsCrossed,
  Dumbbell,
  FlaskConical,
  Maximize2,
  Compass,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Sector {
  id: string;
  code: string;
  name: string;
  hint: string;
  detail: string;
  icon: typeof Cpu;
  // hotspot position in percent
  x: number;
  y: number;
  accent: "indigo" | "warm";
}

const sectors: Sector[] = [
  {
    id: "lab-software",
    code: "01",
    name: "Лаборатория ПО",
    hint: "Корпус 1 · 2 этаж",
    detail:
      "24 рабочих места с двумя мониторами, отдельная Git-инфраструктура, развёрнутая внутренняя CI. Здесь идут практики по разработке и тестированию ПО.",
    icon: Cpu,
    x: 22,
    y: 38,
    accent: "indigo",
  },
  {
    id: "lab-accounting",
    code: "02",
    name: "Лаборатория 1С",
    hint: "Корпус 1 · 1 этаж",
    detail:
      "Лицензионная конфигурация 1С:Бухгалтерия 8.3 и БАС, имитационная корпоративная среда с генерируемыми проводками. Сюда приходят на практику бухгалтеры-партнёры.",
    icon: FlaskConical,
    x: 38,
    y: 64,
    accent: "warm",
  },
  {
    id: "library",
    code: "03",
    name: "Библиотека",
    hint: "Корпус 1 · 3 этаж",
    detail:
      "12 000 экз. печатной литературы и онлайн-доступ к eLibrary, IEEE и каталогам РК. Тихая зона на 60 мест, переговорные на 4–6 человек для проектной работы.",
    icon: BookOpen,
    x: 54,
    y: 30,
    accent: "indigo",
  },
  {
    id: "assembly",
    code: "04",
    name: "Актовый зал",
    hint: "Корпус 2 · цокольный",
    detail:
      "240 мест, профессиональный звук, проекция 4K. Здесь проходят защиты дипломов, лекции приглашённых спикеров и финалы WorldSkills.",
    icon: Mic2,
    x: 68,
    y: 58,
    accent: "warm",
  },
  {
    id: "canteen",
    code: "05",
    name: "Столовая",
    hint: "Корпус 1 · 1 этаж",
    detail:
      "Собственная кухня, 180 посадочных мест, обед в стоимости стипендии для отличников. Меню обновляется еженедельно, есть веганские позиции.",
    icon: UtensilsCrossed,
    x: 16,
    y: 76,
    accent: "indigo",
  },
  {
    id: "gym",
    code: "06",
    name: "Спортзал",
    hint: "Корпус 2 · 1 этаж",
    detail:
      "Игровой зал 24×12 м, тренажёрная секция, душевые. Бесплатные секции по волейболу, баскетболу, шахматам и тхэквондо для всех студентов.",
    icon: Dumbbell,
    x: 82,
    y: 78,
    accent: "warm",
  },
];

export function TourViewer() {
  const [active, setActive] = useState<Sector>(sectors[0]);
  const isWarm = active.accent === "warm";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
      {/* Viewer */}
      <div className="lg:col-span-8 relative rounded-3xl border border-white/[0.08] bg-[var(--elevated)] overflow-hidden">
        {/* Stage */}
        <div className="relative aspect-[16/10] md:aspect-[16/9]">
          {/* Blueprint background */}
          <Image
            src="/images/tour/tour_blueprint.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="(max-width: 1024px) 100vw, 67vw"
            draggable={false}
          />
          {/* Ambient gradient — changes per sector */}
          <motion.div
            key={`bg-${active.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            aria-hidden
            className="absolute inset-0"
            style={{
              background: isWarm
                ? "radial-gradient(ellipse at 30% 25%, rgba(212,165,116,0.30) 0%, transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(97,120,245,0.18) 0%, transparent 55%)"
                : "radial-gradient(ellipse at 30% 25%, rgba(97,120,245,0.32) 0%, transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(212,165,116,0.16) 0%, transparent 55%)",
            }}
          />

          {/* Floor grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.32]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "linear-gradient(180deg, transparent 0%, black 30%, black 65%, transparent 100%)",
              transform: "perspective(800px) rotateX(58deg) scale(1.4)",
              transformOrigin: "center 60%",
            }}
          />

          {/* Horizon line */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[58%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%)",
            }}
          />

          {/* Hotspots */}
          {sectors.map((s) => {
            const isActive = s.id === active.id;
            const warm = s.accent === "warm";
            return (
              <button
                key={s.id}
                onClick={() => setActive(s)}
                aria-label={s.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
              >
                <span className="relative block h-3 w-3">
                  <span
                    className={
                      "absolute -inset-2 rounded-full transition-opacity duration-500 " +
                      (isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100") +
                      " " +
                      (warm
                        ? "bg-[var(--accent-warm)]/15"
                        : "bg-[var(--accent)]/15")
                    }
                  />
                  <span
                    className={
                      "absolute inset-0 rounded-full idle-glow " +
                      (warm
                        ? "bg-[var(--accent-warm)]/35"
                        : "bg-[var(--accent)]/35")
                    }
                  />
                  <span
                    className={
                      "absolute inset-[3px] rounded-full transition-transform duration-500 " +
                      (isActive ? "scale-125" : "scale-100 group-hover:scale-110") +
                      " " +
                      (warm
                        ? "bg-[var(--accent-warm)]"
                        : "bg-[var(--accent)]")
                    }
                  />
                </span>
                <span
                  className={
                    "absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-wider transition-opacity duration-500 " +
                    (isActive
                      ? "opacity-100 text-foreground"
                      : "opacity-50 text-[var(--muted)] group-hover:opacity-90")
                  }
                >
                  {s.code} · {s.name}
                </span>
              </button>
            );
          })}

          {/* Compass */}
          <div className="absolute top-5 left-5 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[var(--muted)]">
            <Compass className="w-3.5 h-3.5" strokeWidth={1.5} />
            Кампус ЕКЕБ · сектор {active.code}
          </div>

          {/* Fullscreen pseudo-button */}
          <div className="absolute top-5 right-5 h-9 w-9 rounded-xl border border-white/[0.1] bg-[var(--background)]/60 backdrop-blur-sm flex items-center justify-center text-[var(--muted)]">
            <Maximize2 className="w-4 h-4" strokeWidth={1.5} />
          </div>
        </div>

        {/* Caption */}
        <div className="relative border-t border-white/[0.06] p-5 md:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="flex items-baseline gap-2 mb-2 text-[11px] font-mono uppercase tracking-wider text-[var(--muted)]">
                <span>{active.code}</span>
                <span className="text-[var(--muted)]/50">·</span>
                <span>{active.hint}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2">
                {active.name}
              </h3>
              <p className="text-[14px] text-[var(--muted)] leading-relaxed max-w-2xl">
                {active.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Sidebar list */}
      <div className="lg:col-span-4 space-y-2 md:space-y-3">
        {sectors.map((s) => {
          const Icon = s.icon;
          const isActive = s.id === active.id;
          const warm = s.accent === "warm";
          return (
            <button
              key={s.id}
              onClick={() => setActive(s)}
              className={
                "w-full text-left rounded-2xl border p-4 md:p-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
                (isActive
                  ? "border-white/[0.16] bg-white/[0.04]"
                  : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/[0.12]")
              }
            >
              <div className="flex items-start gap-4">
                <div
                  className={
                    "h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-500 " +
                    (isActive
                      ? warm
                        ? "border-[var(--accent-warm)]/40 bg-[var(--accent-warm)]/10 text-[var(--accent-warm)]"
                        : "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "border-white/[0.08] bg-white/[0.02] text-[var(--muted)]")
                  }
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 mb-1 text-[10.5px] font-mono uppercase tracking-wider text-[var(--muted)]">
                    <span>{s.code}</span>
                    <span className="text-[var(--muted)]/50">·</span>
                    <span>{s.hint}</span>
                  </div>
                  <div
                    className={
                      "text-[14.5px] font-medium tracking-tight leading-snug " +
                      (isActive ? "text-foreground" : "text-foreground/80")
                    }
                  >
                    {s.name}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
