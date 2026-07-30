"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight, CheckCircle2, Globe, Sparkles, Users, Zap } from "lucide-react";

// Recharts is ~75kb gz; defer it so it never blocks initial paint.
const EmploymentChart = dynamic(
  () => import("./_employment-chart").then((m) => m.EmploymentChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] w-full skeleton rounded-xl opacity-40" />
    ),
  }
);

import { TextEffect } from "@/components/ui/text-effect";
import { TextScramble } from "@/components/ui/text-scramble";
import { TextLoop } from "@/components/ui/text-loop";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Spotlight } from "@/components/ui/spotlight";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GlowBorderButton } from "@/components/ui/moving-border";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { DarkCard } from "@/components/ui/dark-card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EASE = [0.16, 1, 0.3, 1] as const;

const alumni = [
  { id: 1, name: "Айдана Серикова", designation: "Backend, Kaspi", image: "/images/alumni/aidana.jpg" },
  { id: 2, name: "Алмаз Бектуров", designation: "QA Lead, BTS Digital", image: "/images/alumni/almaz.jpg" },
  { id: 3, name: "Дарья Иванова", designation: "Финансист, Halyk", image: "/images/alumni/darya.jpg" },
  { id: 4, name: "Тимур Касенов", designation: "Юрист, AEQUITAS", image: "/images/alumni/timur.jpg" },
  { id: 5, name: "Сабина Шарипова", designation: "Founder, Saby AI", image: "/images/alumni/sabina.jpg" },
];

const looped = ["офферу.", "карьере.", "проекту.", "стартапу."];

const partners = [
  "Kaspi.kz",
  "Halyk Bank",
  "BTS Digital",
  "Air Astana",
  "Beeline",
  "Tele2",
  "Freedom Finance",
  "Chocofamily",
  "Magnum",
  "Forte Bank",
];

const faq = [
  {
    q: "Можно ли совмещать учёбу с работой?",
    a: "Со второго курса дуальное обучение — это уже стажировка у партнёра с оплатой. Полноценная работа на старших курсах согласуется с куратором.",
  },
  {
    q: "Есть ли общежитие?",
    a: "Да, в шаговой доступности от кампуса. Места распределяются по конкурсу баллов и социальной нужде, заявка подаётся вместе с документами на поступление.",
  },
  {
    q: "Какие документы нужны для поступления?",
    a: "Паспорт или удостоверение личности, аттестат об окончании школы, фото 3×4, медицинская справка формы 086. Иностранные граждане дополнительно — нотариальный перевод документов.",
  },
  {
    q: "Что входит в стоимость обучения?",
    a: "Все занятия, доступ к лабораториям, лицензии на профессиональный софт (1С, Adobe, Cisco Academy), участие в WorldSkills и регулярные мастер-классы от партнёров.",
  },
];

function StatCard({
  value,
  suffix,
  label,
  decimals = 0,
  glow,
}: {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
  glow: "indigo" | "gold";
}) {
  return (
    <DarkCard
      glow={glow}
      className="p-5 md:p-7 h-full min-h-[148px] md:min-h-[176px] flex flex-col justify-between"
    >
      <div className="flex items-baseline">
        <AnimatedNumber
          value={value}
          suffix={suffix}
          decimals={decimals}
          className="text-[2rem] md:text-[3.25rem] leading-none font-medium tracking-tighter text-white tabular-nums [font-variant-numeric:tabular-nums]"
        />
      </div>
      <p className="mt-2 text-[11px] md:text-[12.5px] text-[var(--muted)] tracking-wide uppercase">
        {label}
      </p>
    </DarkCard>
  );
}

export function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxBg = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const parallaxFg = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 overflow-hidden motion-island"
    >
      {/* Layered parallax decoration — one spectacle: Beams + soft Spotlight only */}
      <motion.div
        style={{ y: parallaxBg }}
        className="pointer-events-none absolute inset-0 opacity-40"
      >
        <BackgroundBeams />
      </motion.div>

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(212,165,116,0.45)"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Header — text effect + scramble + loop */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-14 md:mb-20">
          <motion.div
            style={{ y: parallaxFg }}
            className="col-span-12 md:col-span-7"
          >
            <Badge variant="accent" className="mb-4">
              Результаты
            </Badge>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1.05]">
              <TextEffect
                per="word"
                preset="fade-in-blur"
                as="span"
                trigger={inView}
                staggerChildren={0.04}
              >
                Учёба, которая ведёт к
              </TextEffect>
              <span className="block text-[var(--accent)]">
                <TextLoop items={looped} />
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="col-span-12 md:col-span-5 md:pt-6"
          >
            <p className="text-[var(--muted)] text-[15px] leading-relaxed mb-6 max-w-md">
              Шесть лет данных по выпускникам, тридцать четыре компании-партнёра,
              девяносто четыре процента трудоустройства. Цифры — не оформление, а
              рамка обязательств.
            </p>
            <div className="flex items-center gap-3 text-[12px] text-[var(--muted)]">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <span>Обновлено</span>
              <TextScramble
                text="01.05.2026"
                className="font-mono text-foreground"
              />
            </div>
          </motion.div>
        </div>

        {/* Stat grid — animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-14 md:mb-20 [perspective:1400px]">
          <motion.div
            initial={{ y: 36, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <StatCard
              value={94}
              suffix="%"
              label="трудоустроены"
              glow="indigo"
            />
          </motion.div>
          <motion.div
            initial={{ y: 36, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            <StatCard
              value={360}
              suffix="K ₸"
              label="средний оффер"
              glow="gold"
            />
          </motion.div>
          <motion.div
            initial={{ y: 36, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          >
            <StatCard
              value={150}
              suffix="+"
              label="работодателей"
              glow="indigo"
            />
          </motion.div>
          <motion.div
            initial={{ y: 36, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            <StatCard
              value={4.8}
              decimals={1}
              suffix="/5"
              label="оценка студентов"
              glow="gold"
            />
          </motion.div>
        </div>

        {/* Bento grid — readable feature cards */}
        <div className="mb-14 md:mb-20">
          <BentoGrid>
            <BentoCard size="lg">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-4 mb-5 md:mb-6">
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                    Доля трудоустройства
                  </h3>
                  <p className="text-[13px] text-[var(--muted)] mt-1">
                    Шесть лет подряд — кривая идёт вверх.
                  </p>
                </div>
                <Badge variant="gold" className="self-start whitespace-nowrap shrink-0">
                  +16 п.п. за 5 лет
                </Badge>
              </div>
              <Tabs defaultValue="rate">
                <TabsList className="flex w-full md:inline-flex md:w-auto">
                  <TabsTrigger value="rate" className="flex-1 md:flex-none">
                    Трудоустройство
                  </TabsTrigger>
                  <TabsTrigger value="salary" className="flex-1 md:flex-none">
                    Средний оффер
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="rate">
                  <div className="h-[220px] sm:h-[240px] md:h-[280px] w-full -mx-1 sm:mx-0">
                    <EmploymentChart kind="rate" />
                  </div>
                </TabsContent>
                <TabsContent value="salary">
                  <div className="h-[220px] sm:h-[240px] md:h-[280px] w-full -mx-1 sm:mx-0">
                    <EmploymentChart kind="salary" />
                  </div>
                </TabsContent>
              </Tabs>
            </BentoCard>

            <BentoCard size="md">
              <Zap className="w-6 h-6 text-[var(--accent)] mb-4" />
              <h3 className="text-lg font-medium tracking-tight mb-2">
                Карьера наших выпускников
              </h3>
              <p className="text-[13.5px] text-[var(--muted)] leading-relaxed mb-6">
                Каждый выпускник заканчивает учёбу с реальным портфолио и контактом
                в компании.
              </p>
              <AnimatedTooltip items={alumni} />
            </BentoCard>

            <BentoCard size="sm">
              <CheckCircle2 className="w-6 h-6 text-[var(--accent-warm)] mb-4" />
              <h3 className="text-lg font-medium tracking-tight mb-2">
                Гарантия оффера
              </h3>
              <p className="text-[13.5px] text-[var(--muted)] leading-relaxed">
                Если за полгода после защиты диплома вы не получаете оффера,
                колледж возвращает 50% последнего года обучения.
              </p>
            </BentoCard>

            <BentoCard size="sm">
              <Users className="w-6 h-6 text-[var(--accent)] mb-4" />
              <h3 className="text-lg font-medium tracking-tight mb-2">
                150+ партнёров
              </h3>
              <p className="text-[13.5px] text-[var(--muted)] leading-relaxed">
                Kaspi, Halyk, BTS Digital, Air Astana и другие компании ждут стажёров.
              </p>
            </BentoCard>

            <BentoCard size="sm">
              <Globe className="w-6 h-6 text-[var(--accent)] mb-4" />
              <h3 className="text-lg font-medium tracking-tight mb-2">
                Международный обмен
              </h3>
              <p className="text-[13.5px] text-[var(--muted)] leading-relaxed">
                Семестр в европейском колледже-партнёре по конкурсному отбору.
              </p>
            </BentoCard>
          </BentoGrid>
        </div>

        {/* Infinite slider — partner logos */}
        <div className="mb-14 md:mb-20">
          <p className="text-[12px] text-[var(--muted)] tracking-wider uppercase mb-6">
            Где работают выпускники
          </p>
          <InfiniteSlider speed={10}>
            {partners.map((p) => (
              <div
                key={p}
                className="flex items-center gap-3 rounded-full border border-white/[0.08] bg-[var(--elevated)]/40 backdrop-blur-md px-5 py-2.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="text-[14px] font-medium tracking-tight">
                  {p}
                </span>
              </div>
            ))}
          </InfiniteSlider>
        </div>

        {/* FAQ accordion + glow button + tooltip */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="col-span-12 md:col-span-5"
          >
            <Badge variant="default" className="mb-4">
              FAQ
            </Badge>
            <h3 className="text-3xl md:text-4xl font-medium tracking-tighter leading-[1.05] mb-4">
              <TextEffect per="word" preset="slide" trigger={inView}>
                Часто спрашивают.
              </TextEffect>
            </h3>
            <p className="text-[14.5px] text-[var(--muted)] leading-relaxed mb-8 max-w-md">
              Если ответа нет — приёмная комиссия отвечает в течение рабочего
              дня. Можно прийти лично.
            </p>

            <TooltipProvider delayDuration={200}>
              <div className="flex flex-wrap gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <GlowBorderButton duration={4000}>
                        Записаться на день открытых дверей
                        <ArrowUpRight className="w-4 h-4" />
                      </GlowBorderButton>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Ближайший — 24 мая, суббота, 11:00
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="col-span-12 md:col-span-7"
          >
            <Card className="px-6 md:px-8">
              <Accordion type="single" collapsible defaultValue="0">
                {faq.map((item, i) => (
                  <AccordionItem key={item.q} value={String(i)}>
                    <AccordionTrigger className="text-[16px] md:text-[17px]">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
