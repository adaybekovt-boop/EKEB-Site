"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { DarkCard } from "@/components/ui/dark-card";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 3 layers, different speeds
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const heading = ref.current!.querySelector("[data-heading]") as HTMLElement;
      const items = gsap.utils.toArray<HTMLElement>("[data-item]");
      const bg = ref.current!.querySelector("[data-bg]") as HTMLElement;
      const quote = ref.current!.querySelector("[data-quote]") as HTMLElement;

      const split = new SplitType(heading, { types: "words,chars" });
      const splitQuote = new SplitType(quote, { types: "words" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "cubic-bezier(0.16, 1, 0.3, 1)" },
      });

      tl.from(bg, { opacity: 0, scale: 1.2, duration: 1.4 }, 0)
        .from(split.chars, { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.02 }, 0.1)
        .from(splitQuote.words, { y: 20, opacity: 0, duration: 0.6, stagger: 0.04 }, 0.5)
        .from(items, { y: 30, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.4);
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-40 overflow-hidden">
      <motion.div
        data-bg
        style={{ y: yBg }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--background)] via-[var(--elevated)]/40 to-[var(--background)]"
      />

      <motion.div
        style={{ y: yMid }}
        aria-hidden
        className="absolute right-[-10%] top-[15%] h-[60vh] w-[60vh] rounded-full blur-3xl opacity-30"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(97,120,245,0.55) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-12 gap-6 md:gap-8">
        <div className="col-span-12 md:col-span-7">
          <span className="text-[13px] text-[var(--accent)] mb-3 inline-block">О колледже</span>
          <h2
            data-heading
            className="text-[2.4rem] md:text-7xl font-medium tracking-tighter leading-[1.05] mb-7 md:mb-10"
          >
            Колледж, после которого сразу берут на работу.
          </h2>
          <p
            data-quote
            className="text-[17px] md:text-2xl text-foreground/85 leading-snug max-w-2xl mb-8 md:mb-10"
          >
            ЕКЕБ работает по дуальной модели: половина программы — у компаний-партнёров.
            К выпуску у студента уже есть портфолио, контакты в индустрии и, как правило, оффер.
          </p>
        </div>

        <motion.div style={{ y: yFg }} className="col-span-12 md:col-span-5 grid grid-cols-2 gap-3">
          {[
            { v: 2018, suffix: "", l: "год основания", group: false },
            { v: 1200, suffix: "+", l: "студентов сейчас", group: true },
            { v: 85, suffix: "", l: "преподавателей", group: false },
            { v: 12, suffix: "", l: "лабораторий", group: false },
          ].map((s, i) => (
            <DarkCard
              key={s.l}
              data-item
              glow={i % 2 === 0 ? "indigo" : "gold"}
              className="p-6"
            >
              <AnimatedNumber
                value={s.v}
                suffix={s.suffix}
                format={
                  s.group
                    ? (n) => Math.round(n).toLocaleString("ru-RU").replace(/ /g, " ")
                    : undefined
                }
                className="block text-3xl md:text-4xl font-medium tracking-tight gradient-text mb-1 tabular-nums"
              />
              <div className="text-[12.5px] text-[var(--muted)]">{s.l}</div>
            </DarkCard>
          ))}
        </motion.div>
      </div>

      {/* big image strip with scroll scale */}
      <div className="relative mt-20 md:mt-32 mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="relative aspect-[4/5] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-white/[0.08]">
          <motion.div
            style={{ scale: scaleImg }}
            className="absolute inset-0"
          >
            <Image
              src="/images/dual/dual_concept.jpg"
              alt=""
              fill
              className="object-cover opacity-55"
              sizes="(max-width: 1400px) 100vw, 1400px"
              draggable={false}
            />
            {/* Brand-color tint overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 20% 30%, rgba(97,120,245,0.40) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(212,165,116,0.30) 0%, transparent 55%), linear-gradient(to bottom, rgba(8,9,10,0.25), rgba(8,9,10,0.55))",
              }}
            />
          </motion.div>

          <div className="relative h-full flex items-end p-7 md:p-16">
            <div className="max-w-xl">
              <span className="inline-block text-[12px] text-[var(--accent)] mb-3">
                Бизнес-инкубатор
              </span>
              <h3 className="text-2xl md:text-5xl font-medium tracking-tighter mb-4 leading-[1.05]">
                Со своей идеей — в инкубатор колледжа.
              </h3>
              <p className="text-[var(--muted)] text-[15px] max-w-md">
                Студентам с идеей колледж даёт ментора из индустрии, рабочее место и pre-seed
                на запуск. Часть стартапов потом становится дипломным проектом.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
