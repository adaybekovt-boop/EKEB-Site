import type { Metadata } from "next";
import { ShieldCheck, Globe2, Award, Layers } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { StatGrid } from "@/components/page-content/stat-strip";
import { DocGrid } from "@/components/page-content/doc-card";
import { Timeline } from "@/components/page-content/timeline";
import { FAQ } from "@/components/page-content/faq";
import { BigCTA } from "@/components/page-content/big-cta";

export const metadata: Metadata = {
  title: "Аккредитация — ЕКЕБ",
};

const stats = [
  { value: "2", label: "агентства", hint: "НААР и AQAS" },
  { value: "5", label: "программ", hint: "все аккредитованы", warm: true },
  { value: "до 2029", label: "срок действия", hint: "по основной аккредитации" },
  { value: "2023", label: "первая программная", hint: "пройдена в полном объёме", warm: true },
];

const agencies = [
  {
    code: "НААР",
    title: "Независимое агентство аккредитации и рейтинга",
    body: "Национальное аккредитационное агентство РК. Институциональная и программная аккредитация по всем пяти специальностям колледжа.",
    tags: ["Институциональная", "Программная", "Казахстан"],
  },
  {
    code: "AQAS",
    title: "Agency for Quality Assurance",
    body: "Немецкое агентство аккредитации, член ENQA и EQAR. Подтверждает соответствие программ европейским стандартам качества высшего образования и СПО.",
    tags: ["Германия", "ENQA", "EQAR"],
  },
];

const benefits = [
  {
    title: "Признание диплома",
    body: "Аккредитованная программа — основание для признания диплома в реестре МНВО и при поступлении в зарубежные вузы по обмену.",
  },
  {
    title: "Прозрачное качество",
    body: "Стандарты агентств открыты. Студент видит, по каким критериям оценивался каждый модуль программы.",
  },
  {
    title: "Мобильность",
    body: "С аккредитацией AQAS легче подавать на программы Erasmus+ и обмена в страны Евросоюза. Это снимает половину барьеров на этапе подачи документов.",
  },
];

const history = [
  {
    year: "2020",
    title: "Заявка на институциональную аккредитацию",
    body: "Колледж подаёт заявку в НААР. Проведена внутренняя ревизия процессов, обновлена документация, согласован график визита экспертной комиссии.",
  },
  {
    year: "2021",
    title: "Институциональная аккредитация НААР",
    body: "Колледж получает институциональную аккредитацию сроком на пять лет. Положительное заключение по всем 11 стандартам качества.",
    accent: "warm" as const,
  },
  {
    year: "2023",
    title: "Программная аккредитация по 5 специальностям",
    body: "Все программы СПО проходят программную аккредитацию НААР. Получены сертификаты до 2028–2029 годов.",
  },
  {
    year: "2024",
    title: "Заявка в AQAS",
    body: "Подана заявка на международную программную аккредитацию AQAS по двум IT-программам. Старт самообследования по европейским стандартам.",
    accent: "warm" as const,
  },
];

const docs = [
  {
    title: "Свидетельство о институциональной аккредитации НААР",
    kind: "Срок действия: до 2026",
    size: "420 КБ",
    updated: "08.2021",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Сертификат — Программное обеспечение",
    kind: "Программная аккредитация НААР",
    size: "380 КБ",
    updated: "09.2023",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Сертификат — Учёт и аудит",
    kind: "Программная аккредитация НААР",
    size: "380 КБ",
    updated: "09.2023",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Сертификат — Правоведение",
    kind: "Программная аккредитация НААР",
    size: "380 КБ",
    updated: "09.2023",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Сертификат — Оценка",
    kind: "Программная аккредитация НААР",
    size: "380 КБ",
    updated: "09.2023",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Отчёт самообследования (НААР, 2023)",
    kind: "Итоговый сводный документ",
    size: "8.6 МБ",
    updated: "06.2023",
    format: "PDF" as const,
    href: "#",
  },
];

const faq = [
  {
    q: "Зачем студенту обращать внимание на аккредитацию?",
    a: "Аккредитация — это внешняя гарантия того, что программа соответствует государственным и профессиональным стандартам. Без неё диплом может не приниматься в реестрах МНВО и Палаты оценщиков, и сложнее перевестись или подать заявку на программу обмена.",
  },
  {
    q: "Чем отличается институциональная аккредитация от программной?",
    a: "Институциональная — это оценка колледжа целиком: управление, ресурсы, среда. Программная — оценка конкретной образовательной программы: содержание, преподаватели, результаты. Колледж проходит обе формы.",
  },
  {
    q: "Что даёт международная аккредитация AQAS?",
    a: "AQAS — член европейской ассоциации ENQA. Аккредитация AQAS означает, что программа соответствует стандартам ESG (European Standards and Guidelines). Это упрощает признание диплома в ЕС и подачу заявок на программы Erasmus+.",
  },
  {
    q: "Куда обращаться, если нужна выписка для другой страны?",
    a: "В канцелярию колледжа — мы готовим официальную справку с переводом на английский или язык страны назначения в течение 7 рабочих дней.",
  },
];

export default function AccreditationPage() {
  return (
    <PageShell
      pathname="/documents/accreditation"
      eyebrow="Документы"
      title="Аккредитация."
      subtitle="Институциональная и специализированная аккредитация по образовательным программам — отечественные и зарубежные агентства."
      back={{ label: "Назад в «Документы»", href: "/documents" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Агентства"
        title={
          <>
            Кто оценивает <br />
            <span className="text-[var(--muted)]">качество программ</span>.
          </>
        }
        intro="Два аккредитационных агентства — национальное и европейское. Стандарты обоих публичны, отчёты — в открытом доступе на сайте."
        ambient="indigo"
      >
        <FeatureGrid items={agencies} cols={2} />
      </ContentSection>

      <ContentSection
        eyebrow="Что это даёт студенту"
        title={
          <>
            Не формальность — <br />
            <span className="text-[var(--muted)]">три практичных эффекта</span>.
          </>
        }
        ambient="warm"
      >
        <FeatureGrid items={benefits} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="История"
        title={
          <>
            Четыре года — <br />
            <span className="text-[var(--muted)]">путь к признанию</span>.
          </>
        }
        intro="От первой подачи в НААР до текущей заявки в AQAS. Аккредитация — это процесс, в который встроено постоянное улучшение программ."
        ambient="split"
      >
        <Timeline items={history} />
      </ContentSection>

      <ContentSection
        eyebrow="Сертификаты"
        title={
          <>
            Свидетельства <br />
            <span className="text-[var(--muted)]">и отчёты</span>.
          </>
        }
      >
        <DocGrid items={docs} />
      </ContentSection>

      <ContentSection eyebrow="Частые вопросы" title="Об аккредитации.">
        <FAQ items={faq} />
      </ContentSection>

      <BigCTA
        eyebrow="Дальше"
        title={
          <>
            Посмотрите итоги <br />
            аттестации 2024.
          </>
        }
        body="Аттестация и аккредитация — разные процедуры. Первая — государственная, вторая — независимая. Обе подтверждают качество программ."
        primary={{ label: "Аттестация 2024", href: "/documents/attestation-2024" }}
        secondary={{ label: "Международная аккредитация", href: "/international/accreditation" }}
      />
    </PageShell>
  );
}
