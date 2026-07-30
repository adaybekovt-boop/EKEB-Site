"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Workflow, Beaker, Trophy, Sparkles, Users, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const tiles = [
  {
    icon: Workflow,
    title: "Дуальное обучение",
    body: "Половина недели — в аудитории, половина — на рабочем месте у компании-партнёра. Студенты получают зарплату со второго курса.",
    span: "md:col-span-2 md:row-span-2",
    glow: "indigo" as const,
  },
  {
    icon: Trophy,
    title: "WorldSkills",
    body: "Аккредитованный центр компетенций. Чемпионы региона три года подряд.",
    span: "md:col-span-2",
    glow: "gold" as const,
  },
  {
    icon: Beaker,
    title: "12 лабораторий",
    body: "Cisco · 1С · робототехника · IoT · сетевая безопасность · 3D-печать.",
    span: "md:col-span-1 md:row-span-2",
    glow: "indigo" as const,
  },
  {
    icon: Users,
    title: "150+ партнёров",
    body: "Договоры со студенческими местами и понятной воронкой к офферу — не бумажки для отчёта.",
    span: "md:col-span-1",
    glow: "indigo" as const,
  },
  {
    icon: Sparkles,
    title: "Бизнес-инкубатор",
    body: "Менторы, рабочее место, pre-seed. Запустить стартап во время учёбы — не исключение, а часть программы.",
    span: "md:col-span-2",
    glow: "gold" as const,
  },
  {
    icon: Globe,
    title: "Международный обмен",
    body: "Программы с европейскими колледжами-партнёрами. Семестр за рубежом — по конкурсу.",
    span: "md:col-span-2",
    glow: "indigo" as const,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Learning() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <section
      ref={sectionRef}
      id="learning"
      className="relative py-24 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-16">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="col-span-12 md:col-span-7"
          >
            <span className="text-[13px] text-[var(--accent)] mb-3 inline-block">
              Обучение
            </span>
            <h2 className="text-[2rem] md:text-6xl font-medium tracking-tighter leading-[1.05]">
              Что входит
              <br />
              <span className="text-[var(--muted)]">в обучение</span>.
            </h2>
          </motion.div>
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="col-span-12 md:col-span-5 md:pt-8"
          >
            <p className="text-[var(--muted)] text-[15px] leading-relaxed max-w-md">
              За каждым направлением закреплён работодатель, центр
              компетенций WorldSkills и международная программа обмена. Не
              учебник, а связка под конкретный оффер.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {tiles.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.title}
                initial={{ y: 40, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.08,
                  ease: EASE,
                }}
                className={t.span}
              >
                <div
                  className={cn(
                    "relative h-full min-h-[180px] md:min-h-[200px] rounded-2xl border border-white/[0.06] bg-[#0e1016]/80 backdrop-blur-sm p-6 md:p-8 overflow-hidden transition-all duration-500 group hover:border-white/[0.14] hover:bg-[#0e1016]/95",
                    t.glow === "indigo" && "shadow-[0_0_40px_-16px_rgba(97,120,245,0.12)] hover:shadow-[0_0_50px_-12px_rgba(97,120,245,0.22)]",
                    t.glow === "gold" && "shadow-[0_0_40px_-16px_rgba(212,165,116,0.10)] hover:shadow-[0_0_50px_-12px_rgba(212,165,116,0.18)]"
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="relative h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-11 w-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-mono text-white/20">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="mt-auto">
                      <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2 text-white">
                        {t.title}
                      </h3>
                      <p className="text-[13.5px] text-[var(--muted)] leading-relaxed">
                        {t.body}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
