import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { Timeline } from "@/components/page-content/timeline";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { StepsList } from "@/components/page-content/steps";
import { BigCTA } from "@/components/page-content/big-cta";
import {
  Code2,
  Bug,
  Calculator,
  Globe,
  Trophy,
  Medal,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "WorldSkills — ЕКЕБ",
  description:
    "Аккредитованный центр компетенций WorldSkills: подготовка к региональным и национальным чемпионатам, медали, тренеры, отбор в команду.",
};

const stats = [
  { value: "4", label: "компетенции", hint: "официальная аккредитация" },
  { value: "23", label: "медали", hint: "за пять лет участия", warm: true },
  { value: "6", label: "тренеров", hint: "сертифицированы как эксперты" },
  { value: "47", label: "участников", hint: "проходят подготовку сейчас", warm: true },
];

const competencies = [
  {
    code: "WSC 09",
    title: "IT Software Solutions",
    body: "Разработка десктопного и веб-ПО под бизнес-задачу за 4 модуля по 4 часа. Стек — C#, .NET, SQL Server, WPF. Тестируется работа с заказчиком, разбиение задачи, документация.",
    tags: ["юниоры", "основная"],
  },
  {
    code: "WSC 17",
    title: "IT Software Testing",
    body: "Ручное и автоматизированное тестирование, разработка чек-листов, баг-репортов, регрессионных наборов. Инструменты — Postman, Selenium, JIRA, TestRail.",
    tags: ["юниоры", "основная"],
  },
  {
    code: "WSC 33",
    title: "Accounting",
    body: "Полный цикл бухгалтерского учёта по МСФО: первичные документы, проводки, отчётность, налоги. Работа в 1С 8.3 и SAP. Время — 16 часов на полный кейс.",
    tags: ["основная"],
  },
  {
    code: "WSC 17b",
    title: "Web Technologies",
    body: "Frontend + backend под заданный макет и API. HTML/CSS, JavaScript, React, Node.js, REST. Оценивается верстка, доступность, чистота кода и time-to-market.",
    tags: ["юниоры", "новая"],
  },
];

const achievements = [
  {
    year: "2021",
    title: "Дебют — серебро в Accounting",
    body: "Первый региональный чемпионат WorldSkills Aktobe. Серебро в Accounting (Мадина Б.) и две бронзы — IT Software Solutions и IT Software Testing.",
  },
  {
    year: "2022",
    title: "Первое золото — IT Software Testing",
    body: "Региональное золото и выход в национальный финал. На национальном — пятое место. Два серебра в Accounting и IT Software Solutions.",
    accent: "warm" as const,
  },
  {
    year: "2023",
    title: "Серебро на национальном",
    body: "Темирлан А. — серебро национального чемпионата по IT Software Testing. Команда по Accounting впервые попала в топ-10. Колледж аккредитован как ЦСК — центр сертификации компетенций.",
  },
  {
    year: "2024",
    title: "Бронза WorldSkills Asia",
    body: "Первая международная медаль — бронза азиатского регионального этапа в IT Software Testing. На национальном — два золота, одно серебро. Открыта компетенция Web Technologies.",
    accent: "warm" as const,
  },
  {
    year: "2025",
    title: "Золото национального + сборы Kazan",
    body: "Команда по Web Technologies привезла золото национального чемпионата. Айгерим С. и Темирлан А. отобраны в сборную Казахстана для подготовки к WorldSkills Lyon 2026.",
  },
];

const trainers = [
  {
    initials: "ТА",
    name: "Тимур Айдарович",
    role: "IT Software Testing",
    detail:
      "10 лет в QA, ex-Kolesa Group. Сертифицированный эксперт WorldSkills International с 2022 года. Готовит сборную Казахстана.",
  },
  {
    initials: "АН",
    name: "Алия Нурлановна",
    role: "Accounting",
    detail:
      "ACCA, 12 лет в аудите. Эксперт WorldSkills Kazakhstan, главный судья регионального чемпионата 2023–2024.",
  },
  {
    initials: "ДК",
    name: "Данияр Кайратович",
    role: "IT Software Solutions",
    detail:
      "Senior C# Developer, 8 лет в банковском ПО. Готовит команду колледжа с 2021 года, привёл двух участников в топ-3 национального чемпионата.",
  },
  {
    initials: "АС",
    name: "Айгерим Сериковна",
    role: "Web Technologies",
    detail:
      "Frontend tech-lead. Открыла компетенцию в колледже в 2024 году. В первый же сезон команда взяла золото национального чемпионата.",
  },
];

const path = [
  {
    code: "01",
    title: "Внутренний отбор — сентябрь",
    body: "Открытое тестирование по выбранной компетенции: 4 часа на демо-задание. Допускаются студенты со 2 курса и старше, средний балл от 4,0.",
  },
  {
    code: "02",
    title: "Подготовительные сборы — октябрь–февраль",
    body: "Тренировки 4 раза в неделю по 3 часа. Разбор кейсов прошлых лет, репетиции на оборудовании, ментор-сессии с практиками индустрии.",
  },
  {
    code: "03",
    title: "Региональный чемпионат — март",
    body: "Площадка в Актобе. Победители выходят на национальный финал, призёры получают сертификаты регионального уровня и приоритет на стажировки у партнёров.",
  },
  {
    code: "04",
    title: "Национальный финал — май",
    body: "Чемпионат Казахстана в Астане. Золото национального открывает дорогу в сборную страны — отбор на WorldSkills Asia и World.",
    hint: "победители получают денежный приз от Министерства просвещения",
  },
];

export default function WorldSkillsPage() {
  return (
    <PageShell
      pathname="/students/worldskills"
      eyebrow="Студенту"
      title="WorldSkills."
      subtitle="Аккредитованный центр компетенций. Подготовка к региональным, национальным и международным чемпионатам по четырём направлениям."
      back={{ label: "Назад в «Студенту»", href: "/students" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Что это вообще такое"
        title={
          <>
            WorldSkills — <br />
            <span className="text-[var(--muted)]">олимпиады по профессиям</span>.
          </>
        }
        intro="Международное движение, в котором студенты колледжей соревнуются в практических задачах по своей специальности. Не теория, не тесты — заказчик, ТЗ, дедлайн, сдача работы экспертам индустрии."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <InfoBlock
            icon={Trophy}
            title="Уровни"
            body="Региональный → национальный (Казахстан) → континентальный (WorldSkills Asia / Europe) → мировой финал WorldSkills Competition раз в два года."
          />
          <InfoBlock
            icon={Medal}
            title="Медали"
            body="Золото, серебро, бронза, плюс «медальон превосходства» — даётся участникам, набравшим высокий балл, но не попавшим в топ-3."
            accent="warm"
          />
          <InfoBlock
            icon={Award}
            title="Зачем студенту"
            body="Сертификат WorldSkills признаётся работодателями как эквивалент опыта работы. Победителей берут на стажировки и офферы напрямую — без скрининга."
          />
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Компетенции колледжа"
        title="Четыре направления."
        intro="Каждая компетенция — это собственный регламент, оборудование и сертифицированный эксперт-тренер. По каждой колледж аккредитован как Центр сертификации (ЦСК)."
        ambient="indigo"
      >
        <FeatureGrid items={competencies} cols={2} />
      </ContentSection>

      <ContentSection
        eyebrow="Хронология"
        title="Пять лет, 23 медали."
        intro="От первого регионального дебюта в 2021 до бронзы WorldSkills Asia в 2024 и сборов в Казань для подготовки к Lyon 2026."
        ambient="split"
      >
        <Timeline items={achievements} />
      </ContentSection>

      <ContentSection
        eyebrow="Тренерский состав"
        title="Кто готовит команду."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {trainers.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-6 md:p-7 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/25 flex items-center justify-center font-medium text-[15px] tracking-tight shrink-0">
                  {t.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15.5px] font-medium tracking-tight">
                    {t.name}
                  </h3>
                  <div className="text-[12.5px] text-[var(--accent)] mt-0.5">
                    {t.role}
                  </div>
                  <p className="text-[13px] text-[var(--muted)] leading-relaxed mt-3">
                    {t.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Как попасть"
        title={
          <>
            Четыре шага — <br />
            <span className="text-[var(--muted)]">от отбора до национального финала</span>.
          </>
        }
        intro="Готовых не ждём — приходят все, кто чувствует, что хочет попробовать. Отсев происходит на сборах естественным образом."
      >
        <StepsList steps={path} />
      </ContentSection>

      <BigCTA
        eyebrow="Отбор на сезон 2025/2026"
        title={
          <>
            Запишитесь <br />
            на отборочное тестирование.
          </>
        }
        body="Регистрация открыта до 25 сентября. Тестирование — 28 сентября в субботу, корпус А, кабинеты компетенций. Результаты в течение недели."
        primary={{ label: "Записаться на отбор", href: "mailto:worldskills@ekeb.kz" }}
        secondary={{ label: "Карьерный центр", href: "/students/employment" }}
        variant="warm"
      />
    </PageShell>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  body,
  accent = "indigo",
}: {
  icon: any;
  title: string;
  body: string;
  accent?: "indigo" | "warm";
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-7">
      <div
        className={
          "h-10 w-10 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center mb-4 " +
          (accent === "warm" ? "text-[var(--accent-warm)]" : "text-[var(--accent)]")
        }
      >
        <Icon className="w-4 h-4" strokeWidth={1.5} />
      </div>
      <h3 className="text-[15px] font-medium tracking-tight mb-2">{title}</h3>
      <p className="text-[13.5px] text-[var(--muted)] leading-relaxed">{body}</p>
    </div>
  );
}
