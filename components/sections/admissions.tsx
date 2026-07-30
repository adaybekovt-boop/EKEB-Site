"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, FileText, ClipboardCheck, GraduationCap } from "lucide-react";
import { DarkCard } from "@/components/ui/dark-card";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Calendar,
    n: "01",
    title: "Подайте заявку",
    body: "Онлайн-форма на сайте или лично в приёмной комиссии. Из документов нужны паспорт, аттестат и фото 3×4.",
  },
  {
    icon: FileText,
    n: "02",
    title: "Соберите портфолио",
    body: "Дипломы, грамоты, сертификаты олимпиад и WorldSkills — каждый прибавляет баллы к итоговому конкурсу.",
  },
  {
    icon: ClipboardCheck,
    n: "03",
    title: "Конкурс баллов",
    body: "Средний балл аттестата плюс бонусы за достижения. Списки зачисленных публикуем открыто.",
  },
  {
    icon: GraduationCap,
    n: "04",
    title: "Зачисление и старт",
    body: "Договор, выбор партнёра-работодателя, ориентационная неделя. С первого сентября — на пары.",
  },
];

export function Admissions() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".adm-step").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.07,
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-7">
            <span className="text-[13px] text-[var(--accent)] mb-3 inline-block">Документы</span>
            <h2 className="text-[2rem] md:text-6xl font-medium tracking-tighter leading-[1.05]">
              Как поступить.<br />
              <span className="text-[var(--muted)]">Четыре шага.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-8 space-y-3">
            <div className="flex items-center justify-between text-[13px] text-[var(--muted)] border-b border-white/[0.06] pb-3">
              <span>Подача документов</span>
              <span className="text-foreground">1 июня — 15 августа</span>
            </div>
            <div className="flex items-center justify-between text-[13px] text-[var(--muted)] border-b border-white/[0.06] pb-3">
              <span>Объявление результатов</span>
              <span className="text-foreground">25 августа</span>
            </div>
            <div className="flex items-center justify-between text-[13px] text-[var(--muted)] border-b border-white/[0.06] pb-3">
              <span>Начало учебного года</span>
              <span className="text-foreground">1 сентября</span>
            </div>
            <div className="flex items-center justify-between text-[13px] text-[var(--muted)] pb-3">
              <span>Стоимость обучения</span>
              <span className="text-foreground">от 480 000 ₸ / год</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 [perspective:1400px]">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="adm-step">
                <DarkCard
                  glow={i % 2 === 0 ? "indigo" : "gold"}
                  className="p-6 md:p-10 min-h-[220px] md:min-h-[280px]"
                >
                  <div className="relative h-full flex flex-col">
                    <div className="flex items-start justify-between mb-8">
                      <div className="h-11 w-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <span className="text-[24px] font-mono text-white/[0.12] group-hover:text-[var(--accent)]/45 transition-colors duration-500">
                        {s.n}
                      </span>
                    </div>
                    <div className="mt-auto">
                      <h3 className="text-xl font-medium tracking-tight mb-2 text-white">
                        {s.title}
                      </h3>
                      <p className="text-[13.5px] text-[var(--muted)] leading-relaxed">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </DarkCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
