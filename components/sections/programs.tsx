"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Briefcase, ClipboardList, Scale, Terminal, ArrowUpRight } from "lucide-react";
import { DarkCard } from "@/components/ui/dark-card";

const steps = [
  {
    code: "01",
    title: "Программное обеспечение",
    qualification: "Разработчик программного обеспечения",
    body: "Бэкенд, фронтенд, базы данных, DevOps. Со второго курса — стажировка в IT-компаниях Актобе. На выходе портфолио и реальные коммерческие проекты.",
    tags: ["Python", "JavaScript", "SQL", "Docker"],
    icon: Code2,
    image: "/images/programs/prog_01.jpg",
  },
  {
    code: "02",
    title: "Программное обеспечение",
    qualification: "Техник по сопровождению и тестированию ПО",
    body: "QA, ручное и автоматизированное тестирование, сопровождение приложений, поддержка пользователей. Сертификации по тестированию входят в программу.",
    tags: ["QA", "Selenium", "Postman", "Linux"],
    icon: Terminal,
    image: "/images/programs/prog_01.jpg",
  },
  {
    code: "03",
    title: "Учёт и аудит",
    qualification: "Бухгалтер",
    body: "Финансовый учёт, налогообложение, 1С, МСФО. Со второго курса студенты ведут учёт у партнёров — стажировка идёт в зачётку.",
    tags: ["1С", "Налоги", "МСФО", "Аудит"],
    icon: Briefcase,
    image: "/images/programs/prog_02.jpg",
  },
  {
    code: "04",
    title: "Оценка",
    qualification: "Техник-оценщик",
    body: "Оценка недвижимости, бизнеса, движимого имущества. Программа выровнена с отраслевыми стандартами Палаты оценщиков РК.",
    tags: ["Недвижимость", "Бизнес", "Имущество"],
    icon: ClipboardList,
    image: "/images/programs/prog_04.jpg",
  },
  {
    code: "05",
    title: "Правоведение",
    qualification: "Юрист",
    body: "Гражданское, трудовое, административное право РК. Практика в адвокатских конторах и юридических отделах партнёров колледжа.",
    tags: ["ГК РК", "Трудовое", "Процесс"],
    icon: Scale,
    image: "/images/programs/prog_03.jpg",
  },
];

export function ProgramsPinned() {
  const [active, setActive] = useState(0);
  const current = steps[active];
  const Icon = current.icon;

  return (
    <section id="programs" className="relative py-24 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* heading */}
        <div className="grid grid-cols-12 gap-8 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-7">
            <span className="text-[13px] text-[var(--accent)] mb-3 inline-block">Абитуриенту</span>
            <h2 className="text-[2rem] md:text-5xl font-medium tracking-tighter leading-[1.05]">
              Пять программ<br />
              <span className="text-[var(--muted)]">— выбирайте по интересу</span>.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-6">
            <p className="text-[var(--muted)] text-[15px] leading-relaxed max-w-md">
              Каждая программа — это работодатель-партнёр, центр компетенций WorldSkills и
              понятная связка «учёба → стажировка → оффер». Нажмите на специальность, чтобы посмотреть подробности.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* left: tab list */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-2">
            {steps.map((s, i) => {
              const StepIcon = s.icon;
              const isActive = i === active;
              return (
                <button
                  key={s.code}
                  onClick={() => setActive(i)}
                  className={
                    "group relative text-left p-5 rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden " +
                    (isActive
                      ? "border-white/[0.18] bg-[var(--elevated)]"
                      : "border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.12]")
                  }
                >
                  {/* indicator bar */}
                  <span
                    className={
                      "absolute left-0 top-0 bottom-0 w-[2px] origin-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
                      (isActive ? "scale-y-100 bg-[var(--accent)]" : "scale-y-0 bg-[var(--accent)]")
                    }
                    style={isActive ? { boxShadow: "0 0 12px rgba(97,120,245,0.6)" } : undefined}
                  />
                  <div className="flex items-center gap-4">
                    <div
                      className={
                        "h-10 w-10 shrink-0 rounded-xl border flex items-center justify-center transition-colors duration-500 " +
                        (isActive
                          ? "border-white/[0.15] bg-white/[0.04] text-[var(--accent)]"
                          : "border-white/[0.08] bg-white/[0.02] text-[var(--muted)] group-hover:text-foreground")
                      }
                    >
                      <StepIcon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span
                          className={
                            "text-[11px] font-mono transition-colors " +
                            (isActive ? "text-[var(--accent)]" : "text-[var(--muted)]")
                          }
                        >
                          {s.code}
                        </span>
                        <h3
                          className={
                            "text-base md:text-lg font-medium tracking-tight transition-colors " +
                            (isActive ? "text-foreground" : "text-foreground/85 group-hover:text-foreground")
                          }
                        >
                          {s.title}
                        </h3>
                      </div>
                      <div
                        className={
                          "text-[12px] mt-0.5 transition-colors " +
                          (isActive ? "text-[var(--muted)]" : "text-[var(--muted)]/70")
                        }
                      >
                        {s.qualification}
                      </div>
                    </div>
                    <ArrowUpRight
                      className={
                        "w-4 h-4 transition-all duration-500 " +
                        (isActive
                          ? "text-[var(--accent)] translate-x-0 translate-y-0 opacity-100"
                          : "text-[var(--muted)] -translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0")
                      }
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* right: detail panel */}
          <div className="col-span-12 md:col-span-7 relative [perspective:1400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, rotateX: 6 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: -6 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <DarkCard glow="indigo" className="md:aspect-auto md:min-h-[520px] p-6 sm:p-8 md:p-12">
                  {current.image && (
                    <div
                      aria-hidden
                      className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none"
                      style={{
                        WebkitMaskImage:
                          "radial-gradient(ellipse 70% 65% at 50% 45%, black 0%, rgba(0,0,0,0.55) 45%, transparent 88%)",
                        maskImage:
                          "radial-gradient(ellipse 70% 65% at 50% 45%, black 0%, rgba(0,0,0,0.55) 45%, transparent 88%)",
                      }}
                    >
                      <Image
                        src={current.image}
                        alt=""
                        fill
                        className="object-cover opacity-[0.14] scale-105 blur-[1.5px]"
                        sizes="(max-width: 768px) 100vw, 58vw"
                        draggable={false}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(10,12,20,0) 0%, rgba(10,12,20,0.35) 65%, rgba(10,12,20,0.85) 100%)",
                        }}
                      />
                    </div>
                  )}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(97,120,245,0.32) 0%, transparent 60%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full blur-3xl"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(212,165,116,0.18) 0%, transparent 60%)",
                    }}
                  />

                  <div className="relative h-full flex flex-col gap-8 md:gap-0">
                    <div className="flex items-start justify-between">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-12 w-12 md:h-14 md:w-14 rounded-2xl border border-white/[0.12] bg-white/[0.04] flex items-center justify-center text-[var(--accent)]"
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                      </motion.div>
                      <span className="text-[11px] font-mono text-[var(--muted)]">
                        {current.code} / 05
                      </span>
                    </div>

                    <div className="md:mt-auto">
                      <motion.div
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[12px] text-[var(--accent)] mb-1.5"
                      >
                        {current.qualification}
                      </motion.div>
                      <motion.h3
                        initial={{ y: 18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.22, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="text-2xl md:text-4xl font-medium tracking-tighter mb-4 leading-tight"
                      >
                        {current.title}
                      </motion.h3>
                      <motion.p
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[var(--muted)] text-[15px] leading-relaxed max-w-md mb-6"
                      >
                        {current.body}
                      </motion.p>
                      <div className="flex flex-wrap gap-2">
                        {current.tags.map((t, idx) => (
                          <motion.span
                            key={t}
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                              delay: 0.38 + idx * 0.05,
                              duration: 0.4,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="px-3 py-1 text-[11.5px] rounded-full border border-white/[0.08] bg-white/[0.025] text-foreground/85 backdrop-blur-sm"
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </DarkCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
