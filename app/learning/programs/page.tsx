import type { Metadata } from "next";
import {
  Code2,
  Calculator,
  Scale,
  Building2,
  Terminal,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { StatGrid } from "@/components/page-content/stat-strip";
import { DocGrid } from "@/components/page-content/doc-card";
import { Timeline } from "@/components/page-content/timeline";
import { BigCTA } from "@/components/page-content/big-cta";

export const metadata: Metadata = {
  title: "Образовательные программы — ЕКЕБ",
};

const stats = [
  { value: "5", label: "специальностей", hint: "очная форма, СПО" },
  { value: "9 / 11", label: "база поступления", hint: "после 9 или 11 класса", warm: true },
  { value: "3-4", label: "года обучения", hint: "зависит от базы" },
  { value: "5", label: "квалификаций", hint: "присваиваются по итогам", warm: true },
];

const programs = [
  {
    code: "06130100",
    title: "Программное обеспечение (по видам)",
    body: "Веб- и мобильная разработка, базы данных, основы DevOps. Дуальная практика — у IT-партнёров Актобе с первого года.",
    href: "#program-soft",
    tags: ["3 года 10 мес", "база 9", "очно", "JS / Python / SQL"],
  },
  {
    code: "06130200",
    title: "Системы информационной безопасности",
    body: "Сетевое администрирование, защита данных, основы реагирования на инциденты. Лаборатория с реальным оборудованием.",
    href: "#program-sec",
    tags: ["3 года 10 мес", "база 9", "очно", "Linux / pfSense"],
  },
  {
    code: "04110100",
    title: "Учёт и аудит",
    body: "Полный цикл бухгалтерского учёта в 1С, МСФО, налогообложение, аудит. Практика — в аутсорсинговых бухгалтериях и на предприятиях.",
    href: "#program-acc",
    tags: ["2 года 10 мес", "база 11", "очно", "1С / МСФО"],
  },
  {
    code: "04210100",
    title: "Правоведение",
    body: "Гражданское и трудовое право РК, процессуальные дисциплины. Юридическая клиника при колледже как площадка для практики.",
    href: "#program-law",
    tags: ["2 года 10 мес", "база 11", "очно", "ГК РК / ТК РК"],
  },
  {
    code: "04140100",
    title: "Оценка (по отраслям и областям применения)",
    body: "Оценка недвижимости, бизнеса, движимого имущества. Стажировка с лицензированными оценщиками — членами Палаты оценщиков РК.",
    href: "#program-eval",
    tags: ["2 года 10 мес", "база 11", "очно"],
  },
];

const semester = [
  {
    year: "I семестр",
    title: "Общеобразовательные и базовые модули",
    body: "Русский / казахский язык, математика, информатика, история Казахстана, физкультура. Введение в специальность с экскурсиями к партнёрам.",
  },
  {
    year: "II семестр",
    title: "Профессиональные основы",
    body: "Базовые дисциплины по программе: алгоритмика и языки для IT, основы бухучёта для УиА, ТГП для правоведов. Первая учебная практика — две недели.",
    accent: "warm" as const,
  },
  {
    year: "III–IV семестры",
    title: "Профильные модули + дуальная практика",
    body: "50/50 между колледжем и компанией. Контрольные точки модулей закрываются защитой реальных артефактов: код, отчёт, проект договора, отчёт об оценке.",
  },
  {
    year: "V–VI семестры",
    title: "Углублённые модули и WorldSkills",
    body: "Подготовка к чемпионатам по компетенциям IT Software Solutions, IT Software Testing, Accounting. Расширенная практика у партнёра.",
    accent: "warm" as const,
  },
  {
    year: "VII–VIII семестры",
    title: "Преддипломная практика и защита",
    body: "Дипломный проект пишется на материале задач компании-партнёра. Защита перед смешанной комиссией с участием наставников из индустрии.",
  },
];

const plans = [
  {
    title: "Учебный план — Программное обеспечение",
    kind: "Очное, 3 года 10 мес",
    size: "1.2 МБ",
    updated: "08.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Учебный план — Системы инф. безопасности",
    kind: "Очное, 3 года 10 мес",
    size: "1.1 МБ",
    updated: "08.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Учебный план — Учёт и аудит",
    kind: "Очное, 2 года 10 мес",
    size: "980 КБ",
    updated: "08.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Учебный план — Правоведение",
    kind: "Очное, 2 года 10 мес",
    size: "1.0 МБ",
    updated: "08.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Учебный план — Оценка",
    kind: "Очное, 2 года 10 мес",
    size: "920 КБ",
    updated: "08.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Перечень профессиональных стандартов",
    kind: "Свод по всем программам",
    size: "640 КБ",
    updated: "06.2024",
    format: "DOCX" as const,
    href: "#",
  },
];

export default function EduProgramsPage() {
  return (
    <PageShell
      pathname="/learning/programs"
      eyebrow="Обучение"
      title="Образовательные программы."
      subtitle="Учебные планы, ожидаемые результаты обучения, привязка к профессиональным стандартам и WorldSkills."
      back={{ label: "Назад в «Обучение»", href: "/learning" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Пять программ"
        title={
          <>
            Специальности, <br />
            <span className="text-[var(--muted)]">которые мы ведём</span>.
          </>
        }
        intro="Каждая программа разработана на основе ГОСО СПО и согласована с профессиональными стандартами Министерства труда. По всем пяти — действующая аккредитация НААР."
        ambient="indigo"
      >
        <FeatureGrid items={programs} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Модули по семестрам"
        title={
          <>
            Восемь семестров — <br />
            <span className="text-[var(--muted)]">единая траектория</span>.
          </>
        }
        intro="Структура одинакова для всех специальностей: общеобразовательный фундамент, профессиональное ядро, дуальная практика, преддипломная подготовка."
        ambient="split"
      >
        <Timeline items={semester} />
      </ContentSection>

      <ContentSection
        eyebrow="Учебные планы"
        title={
          <>
            Скачать рабочие <br />
            <span className="text-[var(--muted)]">документы программ</span>.
          </>
        }
        intro="Текущие версии планов, утверждённые методическим советом. Изменения в плане публикуются с приказом о пересмотре."
        ambient="warm"
      >
        <DocGrid items={plans} />
      </ContentSection>

      <BigCTA
        eyebrow="Не нашли подходящую?"
        title={
          <>
            Посмотрите дуальную модель <br />
            и условия поступления.
          </>
        }
        body="На собеседовании по поступлению мы поможем выбрать программу под ваш опыт и интересы — и расскажем, какие компании-партнёры берут студентов по этому профилю."
        primary={{ label: "Подать заявку", href: "/applicants" }}
        secondary={{ label: "Дуальная модель", href: "/learning/dual" }}
      />
    </PageShell>
  );
}
