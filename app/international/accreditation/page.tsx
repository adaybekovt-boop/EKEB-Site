import type { Metadata } from "next";
import { Globe2, Plane, Award, BookOpen } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { StatGrid } from "@/components/page-content/stat-strip";
import { DocGrid } from "@/components/page-content/doc-card";
import { FAQ } from "@/components/page-content/faq";
import { BigCTA } from "@/components/page-content/big-cta";

export const metadata: Metadata = {
  title: "Международная аккредитация — ЕКЕБ",
};

const stats = [
  { value: "2", label: "агентства", hint: "AQAS и ASIIN — Германия" },
  { value: "2", label: "программы", hint: "IT-направления", warm: true },
  { value: "ESG", label: "стандарт", hint: "European Standards & Guidelines" },
  { value: "2024", label: "запуск процедуры", hint: "выход на международный уровень", warm: true },
];

const agencies = [
  {
    code: "AQAS",
    title: "Agency for Quality Assurance through Accreditation of Study Programmes",
    body: "Аккредитационное агентство Германии. Член ENQA и EQAR. Аккредитация по программе «Программное обеспечение» на стадии экспертной оценки.",
    tags: ["Германия", "ENQA", "EQAR", "ESG"],
  },
  {
    code: "ASIIN",
    title: "Akkreditierungsagentur für Studiengänge der Ingenieurwissenschaften",
    body: "Немецкое агентство аккредитации программ в области инженерии, информатики и естественных наук. Заявка по программе «Системы информационной безопасности».",
    tags: ["Германия", "Engineering", "Informatics"],
  },
];

const benefits = [
  {
    title: "Академическая мобильность",
    body: "Студенты с аккредитованной AQAS программой могут перевести модули в партнёрские вузы Евросоюза в рамках Erasmus+ без академической разницы.",
  },
  {
    title: "Признание диплома",
    body: "Аккредитация AQAS / ASIIN включена в реестр EQAR — диплом облегчённо признаётся работодателями и вузами стран ЕС.",
  },
  {
    title: "Качество по ESG",
    body: "Колледж работает по Европейским стандартам качества (ESG). Это ежегодный внутренний аудит и публичные отчёты — норма для всех программ.",
  },
];

const docs = [
  {
    title: "Заявка на аккредитацию AQAS",
    kind: "Программное обеспечение",
    size: "2.4 МБ",
    updated: "11.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Заявка на аккредитацию ASIIN",
    kind: "Системы информационной безопасности",
    size: "2.1 МБ",
    updated: "11.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Self-Evaluation Report (English)",
    kind: "Отчёт самообследования по стандартам ESG",
    size: "9.8 МБ",
    updated: "10.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Stakeholder Feedback Summary",
    kind: "Анкеты партнёров и студентов на английском",
    size: "1.2 МБ",
    updated: "10.2024",
    format: "PDF" as const,
    href: "#",
  },
];

const faq = [
  {
    q: "Чем международная аккредитация отличается от национальной?",
    a: "Национальная (НААР) подтверждает соответствие казахстанским стандартам ГОСО. Международная (AQAS, ASIIN) — европейским ESG. Обе формы дополняют друг друга и принимаются разными организациями.",
  },
  {
    q: "Когда колледж получит первую международную аккредитацию?",
    a: "Решение AQAS ожидаем в третьем квартале 2025 года. Это завершит цикл, начатый подачей заявки в ноябре 2024.",
  },
  {
    q: "Что нужно студенту, чтобы воспользоваться эффектом аккредитации?",
    a: "Получить транскрипт на английском в канцелярии и отметить в нём аккредитованную программу. Все документы готовятся бесплатно.",
  },
];

export default function IntlAccreditationPage() {
  return (
    <PageShell
      pathname="/international/accreditation"
      eyebrow="Международное"
      title="Международная аккредитация."
      subtitle="Признание программ колледжа зарубежными агентствами и профессиональными ассоциациями."
      back={{ label: "Назад в «Международное»", href: "/international" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Агентства"
        title={
          <>
            С кем колледж <br />
            <span className="text-[var(--muted)]">работает в Европе</span>.
          </>
        }
        intro="Оба агентства — немецкие, но работают по общеевропейским стандартам ESG и включены в реестр EQAR."
        ambient="indigo"
      >
        <FeatureGrid items={agencies} cols={2} />
      </ContentSection>

      <ContentSection
        eyebrow="Зачем студенту"
        title={
          <>
            Что меняется <br />
            <span className="text-[var(--muted)]">после аккредитации</span>.
          </>
        }
        ambient="warm"
      >
        <FeatureGrid items={benefits} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Документы"
        title={
          <>
            Отчёты <br />
            <span className="text-[var(--muted)]">и заявки</span>.
          </>
        }
        intro="Все материалы — на английском, согласно требованиям агентств. Опубликованы как часть процедуры прозрачности."
        ambient="split"
      >
        <DocGrid items={docs} />
      </ContentSection>

      <ContentSection eyebrow="Частые вопросы" title="О международной аккредитации.">
        <FAQ items={faq} />
      </ContentSection>

      <BigCTA
        eyebrow="Дальше"
        title={
          <>
            Меморандумы <br />
            и совместные проекты.
          </>
        }
        body="Аккредитация — один из эффектов внешнего сотрудничества. Параллельно работают меморандумы с зарубежными колледжами и проекты Erasmus+."
        primary={{ label: "Меморандумы", href: "/international/memorandums" }}
        secondary={{ label: "Проекты", href: "/international/projects" }}
      />
    </PageShell>
  );
}
