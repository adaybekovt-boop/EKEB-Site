import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { Timeline } from "@/components/page-content/timeline";
import { BigCTA } from "@/components/page-content/big-cta";
import { DocGrid } from "@/components/page-content/doc-card";
import { CalendarGrid, Legend } from "@/components/students/schedule-table";

export const metadata: Metadata = {
  title: "График учебного процесса — ЕКЕБ",
};

const months = [
  {
    month: "Сентябрь",
    events: [
      { kind: "lessons" as const, label: "Начало учебного года", days: "01.09" },
      { kind: "lessons" as const, label: "Осенний семестр", days: "1–30" },
    ],
  },
  {
    month: "Октябрь",
    events: [{ kind: "lessons" as const, label: "Лекции и лабораторные", days: "1–31" }],
  },
  {
    month: "Ноябрь",
    events: [
      { kind: "lessons" as const, label: "Текущая аттестация", days: "1–14" },
      { kind: "lessons" as const, label: "Лекции", days: "15–30" },
    ],
  },
  {
    month: "Декабрь",
    events: [
      { kind: "lessons" as const, label: "Завершение семестра", days: "1–28" },
      { kind: "break" as const, label: "Зимние каникулы", days: "29–08.01" },
    ],
  },
  {
    month: "Январь",
    events: [
      { kind: "session" as const, label: "Зимняя сессия", days: "09–31" },
      { kind: "session" as const, label: "Пересдачи", days: "29–02.02" },
    ],
  },
  {
    month: "Февраль",
    events: [
      { kind: "lessons" as const, label: "Весенний семестр", days: "03–28" },
    ],
  },
  {
    month: "Март",
    events: [
      { kind: "lessons" as const, label: "Лекции и лабораторные", days: "1–22" },
      { kind: "break" as const, label: "Весенние каникулы", days: "23–29" },
    ],
  },
  {
    month: "Апрель",
    events: [
      { kind: "lessons" as const, label: "Лекции", days: "1–14" },
      { kind: "practice" as const, label: "Технологическая практика II–III курс", days: "15–30" },
    ],
  },
  {
    month: "Май",
    events: [
      { kind: "practice" as const, label: "Практика II–III курс", days: "1–14" },
      { kind: "lessons" as const, label: "Текущая аттестация", days: "15–31" },
    ],
  },
  {
    month: "Июнь",
    events: [
      { kind: "session" as const, label: "Летняя сессия I–III курс", days: "1–21" },
      { kind: "defense" as const, label: "Защита дипломных IV курс", days: "10–25" },
    ],
  },
  {
    month: "Июль",
    events: [
      { kind: "break" as const, label: "Летние каникулы", days: "01–31" },
    ],
  },
  {
    month: "Август",
    events: [
      { kind: "break" as const, label: "Каникулы", days: "01–25" },
      { kind: "lessons" as const, label: "Установочные собрания", days: "26–31" },
    ],
  },
];

const milestones = [
  {
    year: "01.09",
    title: "Начало учебного года",
    body: "Линейка для первокурсников, кураторские часы, выдача читательских билетов и доступа к AIS SmartNation.",
  },
  {
    year: "Ноябрь",
    title: "Первая аттестация",
    body: "Контрольные точки рейтинга: студент видит свой балл в AIS и понимает, идёт ли к допуску на экзамен.",
    accent: "warm" as const,
  },
  {
    year: "Январь",
    title: "Зимняя сессия",
    body: "Две недели консультаций, две недели экзаменов. Пересдачи — в первой неделе февраля.",
  },
  {
    year: "Февраль",
    title: "Старт весеннего семестра",
    body: "Новые модули, перезапуск кружков, отбор в команды WorldSkills и стартап-инкубатор.",
    accent: "warm" as const,
  },
  {
    year: "Апрель",
    title: "Технологическая практика",
    body: "Студенты II и III курсов выходят на предприятия-партнёры. Куратор практики — преподаватель кафедры.",
  },
  {
    year: "Июнь",
    title: "Защита дипломов",
    body: "Государственная аттестация четвёртого курса, защита ВКР, вручение дипломов на торжественной церемонии.",
    accent: "warm" as const,
  },
  {
    year: "Июль",
    title: "Каникулы",
    body: "Корпус закрывается на плановый ремонт. Библиотека и AIS — работают.",
  },
];

const stats = [
  { value: "36", label: "учебных недель", hint: "по 6 дней" },
  { value: "8", label: "недель практики", hint: "в год для II–III курса", warm: true },
  { value: "2", label: "сессии", hint: "зимняя и летняя" },
  { value: "10", label: "недель каникул", hint: "включая праздничные", warm: true },
];

const docs = [
  {
    title: "График учебного процесса 2025–2026",
    kind: "По всем специальностям, утверждён приказом",
    format: "PDF",
    size: "412 КБ",
    updated: "28.08.2025",
    href: "#",
  },
  {
    title: "Календарь практик",
    kind: "Сроки и базы практик по курсам",
    format: "PDF",
    size: "186 КБ",
    updated: "01.09.2025",
    href: "#",
  },
  {
    title: "График государственной аттестации",
    kind: "Защиты ВКР, состав ГАК",
    format: "PDF",
    size: "92 КБ",
    updated: "10.04.2025",
    href: "#",
  },
];

export default function CalendarPage() {
  return (
    <PageShell
      pathname="/students/calendar"
      eyebrow="Студенту"
      title="График учебного процесса."
      subtitle="Семестры, каникулы, сессии, производственная практика, защита дипломов — на весь учебный год."
      back={{ label: "Назад в «Студенту»", href: "/students" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Календарь года"
        title={
          <>
            Двенадцать месяцев — <br />
            <span className="text-[var(--muted)]">без сюрпризов</span>.
          </>
        }
        intro="Раскладка на учебный год: что происходит в каждом месяце, у кого практика, когда сессия и каникулы."
        ambient="indigo"
      >
        <div className="mb-6">
          <Legend
            items={[
              { color: "indigo", label: "Учебные занятия" },
              { color: "warm", label: "Сессия" },
              { color: "ok", label: "Практика" },
              { color: "muted", label: "Каникулы" },
            ]}
          />
        </div>
        <CalendarGrid bands={months} />
      </ContentSection>

      <ContentSection
        eyebrow="Ключевые точки"
        title="Что важно не пропустить."
        intro="Семь моментов в году, которые определяют ритм учёбы и расписание студента."
        ambient="split"
      >
        <Timeline items={milestones} />
      </ContentSection>

      <ContentSection eyebrow="Документы" title="Скачать графики.">
        <DocGrid items={docs} />
      </ContentSection>

      <BigCTA
        eyebrow="Точные даты"
        title={
          <>
            Календарь для вашей группы — <br />
            в AIS SmartNation.
          </>
        }
        body="AIS показывает учебный календарь с учётом вашей специальности, формы обучения и курса. Подпишитесь на .ics — он появится в вашем телефоне."
        primary={{ label: "Войти в SmartNation", href: "/students/smartnation" }}
        secondary={{ label: "Расписание занятий", href: "/students/schedule" }}
      />
    </PageShell>
  );
}
