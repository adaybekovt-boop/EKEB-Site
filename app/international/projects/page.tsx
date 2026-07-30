import type { Metadata } from "next";
import { Rocket, Plane, Wrench, Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { StatGrid } from "@/components/page-content/stat-strip";
import { Timeline } from "@/components/page-content/timeline";
import { BigCTA } from "@/components/page-content/big-cta";

export const metadata: Metadata = {
  title: "Международные проекты — ЕКЕБ",
};

const stats = [
  { value: "4", label: "активных проекта", hint: "разные доноры и форматы" },
  { value: "€ 480k", label: "общий бюджет", hint: "финансирование 2023–2026", warm: true },
  { value: "47", label: "студентов и преподавателей", hint: "участники мобильности" },
  { value: "5", label: "стран-партнёров", hint: "Польша, Литва, Турция, Германия, Грузия", warm: true },
];

const projects = [
  {
    code: "Erasmus+ KA171",
    title: "International Credit Mobility",
    body: "Программа академической мобильности студентов и преподавателей с университетами Польши и Литвы. Семестр или модуль обучения у партнёра с переносом кредитов.",
    tags: ["Активен", "2023–2026", "Польша · Литва", "€ 180k"],
    href: "#",
  },
  {
    code: "Bolashak",
    title: "Стажировки преподавателей",
    body: "Государственная программа РК: преподаватели колледжа выезжают на трёхмесячные стажировки в Турцию и Германию для обмена методическим опытом.",
    tags: ["Активен", "Ежегодный набор", "Турция · Германия"],
    href: "#",
  },
  {
    code: "EU4Skills",
    title: "Модернизация ТиПО Казахстана",
    body: "Проект ЕС по обновлению профессионального образования: обновление учебных планов IT-программ, поставка лабораторного оборудования, тренинги преподавателей.",
    tags: ["Активен", "2022–2025", "ЕС", "€ 220k"],
    href: "#",
  },
  {
    code: "DAAD-EAST",
    title: "Eastern Partnership in Vocational Education",
    body: "Совместная инициатива DAAD и казахстанских колледжей. Летние школы, преподавательские визиты, разработка совместных дистанционных курсов.",
    tags: ["Активен", "2024–2026", "Германия · Грузия", "€ 80k"],
    href: "#",
  },
];

const milestones = [
  {
    year: "2022",
    title: "Старт EU4Skills",
    body: "Колледж входит в пилотную группу казахстанских организаций ТиПО. Получает грант на обновление лаборатории сетевой безопасности и тренинги преподавателей.",
  },
  {
    year: "2023",
    title: "Первая мобильность Erasmus+",
    body: "Запущен компонент KA171 с Высшей школой управления в Кракове. На обучение по обмену выехали восемь студентов IT-программ.",
    accent: "warm" as const,
  },
  {
    year: "2024",
    title: "Bolashak и DAAD",
    body: "Преподаватели колледжа защитили заявки в две программы стажировок. Первая группа методистов выехала в Стамбул и Берлин на трёхмесячные модули.",
  },
  {
    year: "2025",
    title: "Совместная защита дипломов",
    body: "Первая партия студентов с двойным руководством — совместная защита перед смешанной комиссией ЕКЕБ и Anadolu University в Эскишехире.",
    accent: "warm" as const,
  },
  {
    year: "2026",
    title: "Закрытие EU4Skills и продление мобильности",
    body: "Финальный отчёт по EU4Skills. Подача заявки на продление Erasmus+ KA171 с расширением сети — добавление партнёров из Латвии и Турции.",
  },
];

const benefits = [
  {
    title: "Семестр у партнёра без академразницы",
    body: "Кредиты, полученные в принимающем вузе, переносятся в учебный план. Студент не теряет ни одного модуля и возвращается в свою группу.",
  },
  {
    title: "Финансирование поездки",
    body: "Стипендия Erasmus+ или Bolashak покрывает дорогу, проживание и страховку. Колледж оформляет визу и согласует расписание с партнёром.",
  },
  {
    title: "Сертификат и транскрипт",
    body: "По итогам мобильности — академический транскрипт принимающего вуза на английском и сертификат участника программы.",
  },
];

export default function IntlProjectsPage() {
  return (
    <PageShell
      pathname="/international/projects"
      eyebrow="Международное"
      title="Международные проекты."
      subtitle="Erasmus+, программы обмена студентами и преподавателями, совместные исследования и хакатоны."
      back={{ label: "Назад в «Международное»", href: "/international" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Действующие"
        title={
          <>
            Четыре проекта <br />
            <span className="text-[var(--muted)]">с разными донорами</span>.
          </>
        }
        intro="Параллельные проекты с разными источниками финансирования. Каждый — со своим фокусом: мобильность, методика, инфраструктура, методические курсы."
        ambient="indigo"
      >
        <FeatureGrid items={projects} cols={2} />
      </ContentSection>

      <ContentSection
        eyebrow="Что получает студент"
        title={
          <>
            Три практичных <br />
            <span className="text-[var(--muted)]">эффекта мобильности</span>.
          </>
        }
        ambient="warm"
      >
        <FeatureGrid items={benefits} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Хронология"
        title={
          <>
            От пилота EU4Skills <br />
            <span className="text-[var(--muted)]">до сети из пяти стран</span>.
          </>
        }
        intro="Пять опорных точек: запуск, первая мобильность, расширение сети, совместная защита, закрытие фазы и продление."
        ambient="split"
      >
        <Timeline items={milestones} />
      </ContentSection>

      <BigCTA
        eyebrow="Хочу участвовать"
        title={
          <>
            Подать заявку <br />
            на мобильность.
          </>
        }
        body="Окно подачи документов — два раза в год, в сентябре и феврале. Заявку рассматривает международный отдел совместно с заведующим кафедрой."
        primary={{ label: "Связаться", href: "/contact" }}
        secondary={{ label: "Меморандумы", href: "/international/memorandums" }}
      />
    </PageShell>
  );
}
