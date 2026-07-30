import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { DocGrid } from "@/components/page-content/doc-card";
import { StatGrid } from "@/components/page-content/stat-strip";
import { BigCTA } from "@/components/page-content/big-cta";

export const metadata: Metadata = {
  title: "Нормативно-правовая документация — ЕКЕБ",
};

const stats = [
  { value: "32", label: "действующих акта", hint: "учитываются в работе колледжа" },
  { value: "4", label: "категории", hint: "учебные, финансовые, трудовые, отчётность", warm: true },
  { value: "2024", label: "последнее обновление", hint: "сверка с реестром МНВО" },
  { value: "PDF / DOCX", label: "форматы", hint: "доступны для скачивания", warm: true },
];

const learningDocs = [
  {
    title: "Закон РК «Об образовании» № 319-III",
    kind: "Закон Республики Казахстан",
    size: "1.4 МБ",
    updated: "06.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Государственный общеобязательный стандарт ТиПО",
    kind: "Постановление Правительства РК № 348",
    size: "980 КБ",
    updated: "05.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Типовые правила деятельности организаций ТиПО",
    kind: "Приказ МНВО РК № 528",
    size: "740 КБ",
    updated: "07.2023",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Правила приёма в организации ТиПО",
    kind: "Приказ МНВО РК № 600",
    size: "560 КБ",
    updated: "06.2024",
    format: "PDF" as const,
    href: "#",
  },
];

const reportingDocs = [
  {
    title: "Правила государственной аттестации",
    kind: "Приказ МНВО РК № 419",
    size: "820 КБ",
    updated: "03.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Правила аккредитации в сфере образования",
    kind: "Приказ МНВО РК № 158",
    size: "640 КБ",
    updated: "11.2023",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Формы статистической отчётности 3-НК",
    kind: "Приказ Бюро национальной статистики",
    size: "480 КБ",
    updated: "01.2024",
    format: "DOCX" as const,
    href: "#",
  },
  {
    title: "Положение о портале e-orken.kz",
    kind: "Регламент работы в АИС",
    size: "320 КБ",
    updated: "09.2024",
    format: "PDF" as const,
    href: "#",
  },
];

const financeDocs = [
  {
    title: "Правила распределения образовательного гранта",
    kind: "Постановление Правительства РК № 269",
    size: "510 КБ",
    updated: "04.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Правила назначения государственных стипендий",
    kind: "Постановление Правительства РК № 116",
    size: "390 КБ",
    updated: "02.2024",
    format: "PDF" as const,
    href: "#",
  },
];

const laborDocs = [
  {
    title: "Трудовой кодекс РК",
    kind: "Кодекс Республики Казахстан",
    size: "2.1 МБ",
    updated: "07.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Правила организации дуального обучения",
    kind: "Приказ МНВО РК № 444",
    size: "620 КБ",
    updated: "08.2024",
    format: "PDF" as const,
    href: "#",
  },
];

export default function RegulationsPage() {
  return (
    <PageShell
      pathname="/documents/regulations"
      eyebrow="Документы"
      title="Нормативно-правовая документация."
      subtitle="Законы РК об образовании, приказы МНВО, государственные общеобязательные стандарты, типовые учебные планы."
      back={{ label: "Назад в «Документы»", href: "/documents" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Учебные акты"
        title={
          <>
            Основа учебного <br />
            <span className="text-[var(--muted)]">процесса</span>.
          </>
        }
        intro="Законы и приказы, по которым строится содержание программ, правила приёма и государственные стандарты СПО."
        ambient="indigo"
      >
        <DocGrid items={learningDocs} />
      </ContentSection>

      <ContentSection
        eyebrow="Отчётность и контроль"
        title={
          <>
            Формы и правила <br />
            <span className="text-[var(--muted)]">внешней отчётности</span>.
          </>
        }
        intro="Документы, которыми регулируется государственная аттестация, аккредитация и сдача статистических отчётов."
        ambient="split"
      >
        <DocGrid items={reportingDocs} />
      </ContentSection>

      <ContentSection
        eyebrow="Финансовые акты"
        title={
          <>
            Гранты <br />
            <span className="text-[var(--muted)]">и стипендии</span>.
          </>
        }
        intro="Правила распределения государственных образовательных грантов и условия назначения стипендий."
        ambient="warm"
      >
        <DocGrid items={financeDocs} />
      </ContentSection>

      <ContentSection
        eyebrow="Трудовые отношения"
        title={
          <>
            Трудовое право <br />
            <span className="text-[var(--muted)]">и дуальная модель</span>.
          </>
        }
        intro="Трудовой кодекс и отдельный приказ, регулирующий организацию дуального обучения в Казахстане."
      >
        <DocGrid items={laborDocs} />
      </ContentSection>

      <BigCTA
        eyebrow="Не нашли акт?"
        title={
          <>
            Запросите документ <br />
            в канцелярии колледжа.
          </>
        }
        body="Если нужен документ, которого нет в открытом разделе, — отправьте запрос. Канцелярия отвечает в течение трёх рабочих дней."
        primary={{ label: "Связаться", href: "/contact" }}
        secondary={{ label: "Внутренние правила", href: "/documents/rules" }}
      />
    </PageShell>
  );
}
