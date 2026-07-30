"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DarkCard } from "@/components/ui/dark-card";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const path = [
  {
    year: "Год 1",
    title: "База + первый стек",
    body: "Профильные предметы, общая программа, первые инструменты специальности. Знакомство с компанией-партнёром.",
  },
  {
    year: "Год 2",
    title: "Дуальное обучение",
    body: "Половину времени студент проводит у партнёра. Задачи приходят от наставника из компании, а не из методички.",
  },
  {
    year: "Год 3",
    title: "WorldSkills и спецкурсы",
    body: "Углубление в специализацию, подготовка к региональному и национальному чемпионату, сертификации Cisco / 1С / по направлению.",
  },
  {
    year: "Год 4",
    title: "Дипломный проект",
    body: "Кейс на продукте партнёра или собственный стартап через бизнес-инкубатор. Защита идёт перед комиссией из работодателей.",
  },
];

export function Path() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!ref.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      // SVG path draw
      const path = lineRef.current!;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      // Items reveal
      gsap.utils.toArray<HTMLElement>(".path-item").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.05,
        });

        // dot pop
        const dot = el.querySelector(".path-dot");
        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
            },
          });
        }
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-8">
        <div className="col-span-12 md:col-span-4 md:sticky md:top-32 self-start">
          <span className="text-[13px] text-[var(--accent)] mb-3 inline-block">Студенту</span>
          <h2 className="text-[2rem] md:text-5xl font-medium tracking-tighter leading-[1.05] mb-6">
            Четыре года —<br />
            <span className="text-[var(--muted)]">по шагам.</span>
          </h2>
          <p className="text-[var(--muted)] text-[15px] leading-relaxed max-w-md">
            От первой пары до защиты диплома: каждый год привязан либо к компании-партнёру,
            либо к чемпионату, либо к собственному стартапу. Учёба не лежит в столе.
          </p>
        </div>

        <div className="col-span-12 md:col-span-8 relative">
          <svg
            className="absolute left-[14px] top-0 h-full w-12 hidden md:block pointer-events-none"
            viewBox="0 0 60 800"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M 30 20 Q 5 200, 30 400 T 30 780"
              stroke="url(#pathGradient)"
              strokeWidth="2"
              fill="none"
            />
            <defs>
              <linearGradient id="pathGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6178f5" />
                <stop offset="100%" stopColor="#d4a574" />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-6">
            {path.map((p, i) => (
              <div key={p.year} className="path-item relative md:pl-20">
                <div
                  className="path-dot hidden md:flex absolute left-[6px] top-7 h-5 w-5 rounded-full border-2 border-[var(--background)] items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #6178f5 0%, #d4a574 100%)",
                    boxShadow: "0 0 20px rgba(97,120,245,0.6)",
                  }}
                />
                <DarkCard glow={i % 2 === 0 ? "indigo" : "gold"} className="p-6 md:p-8">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="inline-flex items-baseline gap-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-0.5 text-[10.5px] font-mono uppercase tracking-[0.14em] text-[var(--accent)] whitespace-nowrap shrink-0">
                      {p.year}
                    </span>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-tight min-w-0 text-white">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-[14.5px] text-[var(--muted)] leading-relaxed max-w-xl">
                    {p.body}
                  </p>
                </DarkCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
