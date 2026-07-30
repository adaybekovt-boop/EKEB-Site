import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { Timeline } from "@/components/page-content/timeline";
import { DocGrid } from "@/components/page-content/doc-card";
import { BigCTA } from "@/components/page-content/big-cta";

export const metadata: Metadata = {
  title: "Аттестация 2024 — ЕКЕБ",
};

const stats = [
  { value: "5/5", label: "программ прошли", hint: "без особых условий" },
  { value: "94%", label: "трудоустройство", hint: "выпуск 2024, релевантная работа", warm: true },
  { value: "8.6", label: "средний балл ИГА", hint: "по шкале комиссии" },
  { value: "0", label: "нарушений", hint: "по итогам выездной проверки", warm: true },
];

const timeline = [
  {
    year: "Февраль",
    title: "Приказ о начале самообследования",
    body: "Сформирована рабочая группа: директор, методисты, заведующие кафедрами. Утверждён график подготовки документов и сбор фактуры по каждой программе.",
  },
  {
    year: "Март",
    title: "Сбор фактуры по программам",
    body: "Анализ учебных планов, ведомостей, дневников практик. Опрос работодателей-партнёров и студентов выпускных курсов.",
    accent: "warm" as const,
  },
  {
    year: "Апрель",
    title: "Отчёт самообследования",
    body: "Подготовлен сводный отчёт по форме МНВО — 280 страниц. Согласован с кафедрами, утверждён директором, опубликован на сайте.",
  },
  {
    year: "Май",
    title: "Выездная экспертная комиссия",
    body: "Четырёхдневный визит: проверка документации, открытые занятия, встречи со студентами и партнёрами, осмотр материально-технической базы.",
    accent: "warm" as const,
  },
  {
    year: "Июнь",
    title: "Заключение и приказ",
    body: "Положительное заключение по всем пяти программам. Приказ МНВО подтверждает результаты государственной аттестации до 2029 года.",
  },
];

const docs = [
  {
    title: "Отчёт самообследования колледжа",
    kind: "Сводный документ по всем программам",
    size: "12.4 МБ",
    updated: "04.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Приказ о результатах государственной аттестации",
    kind: "Приказ МНВО РК",
    size: "320 КБ",
    updated: "06.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Заключение экспертной комиссии",
    kind: "Итоговый протокол выездной проверки",
    size: "1.8 МБ",
    updated: "06.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Сводные ведомости ИГА",
    kind: "Результаты итоговой государственной аттестации",
    size: "640 КБ",
    updated: "06.2024",
    format: "XLSX" as const,
    href: "#",
  },
  {
    title: "Анкеты работодателей-партнёров",
    kind: "Опрос 47 компаний — приложение к отчёту",
    size: "880 КБ",
    updated: "03.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "План устранения замечаний",
    kind: "Документ контроля по рекомендациям комиссии",
    size: "210 КБ",
    updated: "07.2024",
    format: "DOCX" as const,
    href: "#",
  },
];

export default function Attestation2024Page() {
  return (
    <PageShell
      pathname="/documents/attestation-2024"
      eyebrow="Документы"
      title="Аттестация 2024."
      subtitle="Государственная аттестация колледжа: материалы самообследования, отчёты, результаты."
      back={{ label: "Назад в «Документы»", href: "/documents" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Хронология"
        title={
          <>
            Как прошла <br />
            <span className="text-[var(--muted)]">аттестация 2024</span>.
          </>
        }
        intro="Пять этапов с февраля по июнь: от приказа о начале самообследования до выхода итогового приказа МНВО. Без сдвигов по графику."
        ambient="indigo"
      >
        <Timeline items={timeline} />
      </ContentSection>

      <ContentSection
        eyebrow="Документы"
        title={
          <>
            Полный пакет <br />
            <span className="text-[var(--muted)]">материалов аттестации</span>.
          </>
        }
        intro="Самообследование, протоколы, ведомости и приказы — всё в открытом доступе для абитуриентов, родителей и партнёров."
        ambient="split"
      >
        <DocGrid items={docs} />
      </ContentSection>

      <BigCTA
        eyebrow="Есть вопросы?"
        title={
          <>
            Учебная часть отвечает <br />
            на запросы письменно.
          </>
        }
        body="Запросы по результатам аттестации, ведомостям и отдельным программам можно отправить через канцелярию или приёмную."
        primary={{ label: "Связаться", href: "/contact" }}
        secondary={{ label: "Аккредитация", href: "/documents/accreditation" }}
      />
    </PageShell>
  );
}
