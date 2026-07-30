import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { DocGrid } from "@/components/page-content/doc-card";
import { StatGrid } from "@/components/page-content/stat-strip";
import { FAQ } from "@/components/page-content/faq";
import { BigCTA } from "@/components/page-content/big-cta";

export const metadata: Metadata = {
  title: "Правила и положения — ЕКЕБ",
};

const stats = [
  { value: "24", label: "внутренних акта", hint: "действующая редакция" },
  { value: "5", label: "категорий", hint: "учебные, финансовые, кадровые, этика, безопасность", warm: true },
  { value: "2024", label: "крупная редакция", hint: "пересмотр после аттестации" },
  { value: "PDF", label: "основной формат", hint: "DOCX по запросу", warm: true },
];

const founding = [
  {
    title: "Устав колледжа",
    kind: "Учредительный документ",
    size: "1.1 МБ",
    updated: "03.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Коллективный договор",
    kind: "Договор между администрацией и трудовым коллективом",
    size: "780 КБ",
    updated: "01.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Правила внутреннего распорядка",
    kind: "Для сотрудников и обучающихся",
    size: "560 КБ",
    updated: "08.2024",
    format: "PDF" as const,
    href: "#",
  },
];

const academic = [
  {
    title: "Положение о текущем контроле и промежуточной аттестации",
    kind: "Академическая политика",
    size: "640 КБ",
    updated: "08.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Положение об экзаменационной сессии",
    kind: "Регламент проведения сессии",
    size: "480 КБ",
    updated: "08.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Положение о практике",
    kind: "Учебная, производственная, преддипломная",
    size: "720 КБ",
    updated: "08.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Положение о государственной итоговой аттестации",
    kind: "Регламент защиты дипломных проектов",
    size: "590 КБ",
    updated: "06.2024",
    format: "PDF" as const,
    href: "#",
  },
];

const studentLife = [
  {
    title: "Положение о стипендии",
    kind: "Назначение и выплата стипендий",
    size: "320 КБ",
    updated: "02.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Положение об академическом отпуске",
    kind: "Основания, оформление, восстановление",
    size: "280 КБ",
    updated: "09.2023",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Положение о переводе и восстановлении",
    kind: "Внутренний и внешний перевод",
    size: "310 КБ",
    updated: "09.2023",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Положение о студенческом самоуправлении",
    kind: "Студсовет колледжа",
    size: "240 КБ",
    updated: "10.2023",
    format: "PDF" as const,
    href: "#",
  },
];

const integrity = [
  {
    title: "Антикоррупционная политика",
    kind: "Стандарт колледжа",
    size: "390 КБ",
    updated: "01.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Кодекс академической честности",
    kind: "Требования к студентам и преподавателям",
    size: "260 КБ",
    updated: "08.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Политика обработки персональных данных",
    kind: "Соответствие Закону РК",
    size: "340 КБ",
    updated: "05.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Положение о ящике доверия",
    kind: "Анонимные обращения, регламент рассмотрения",
    size: "180 КБ",
    updated: "02.2024",
    format: "PDF" as const,
    href: "#",
  },
];

const faq = [
  {
    q: "Где взять оригинал положения с подписью?",
    a: "В канцелярии колледжа. Заверенная копия выдаётся в течение 3 рабочих дней. Оригиналы хранятся в архиве учебной части.",
  },
  {
    q: "Как часто пересматриваются положения?",
    a: "По графику методического совета — раз в три года, либо внепланово при изменении законодательства. Дата последней редакции указана в карточке каждого документа.",
  },
  {
    q: "Можно ли предложить правки в правила?",
    a: "Да, через студенческий совет или напрямую через ящик доверия. Все предложения рассматриваются на ближайшем педагогическом совете.",
  },
  {
    q: "Что если положение противоречит закону РК?",
    a: "В таком случае действует норма закона. Колледж обязан внести изменения в течение 30 дней с момента вступления нормы в силу.",
  },
];

export default function DocsRulesPage() {
  return (
    <PageShell
      pathname="/documents/rules"
      eyebrow="Документы"
      title="Правила и положения."
      subtitle="Внутренние акты колледжа: устав, коллективный договор, положения о подразделениях, академическая политика."
      back={{ label: "Назад в «Документы»", href: "/documents" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Учредительные"
        title={
          <>
            Документы, <br />
            <span className="text-[var(--muted)]">которые держат колледж</span>.
          </>
        }
        intro="Устав, коллективный договор и правила внутреннего распорядка — фундамент, на котором стоят остальные положения."
        ambient="indigo"
      >
        <DocGrid items={founding} />
      </ContentSection>

      <ContentSection
        eyebrow="Учебные"
        title={
          <>
            Академическая <br />
            <span className="text-[var(--muted)]">политика</span>.
          </>
        }
        intro="Положения о контроле, сессии, практике и государственной итоговой аттестации. Действующие редакции на учебный год 2024–2025."
        ambient="split"
      >
        <DocGrid items={academic} />
      </ContentSection>

      <ContentSection
        eyebrow="Студенческие"
        title={
          <>
            Стипендия, отпуск, <br />
            <span className="text-[var(--muted)]">перевод и самоуправление</span>.
          </>
        }
        ambient="warm"
      >
        <DocGrid items={studentLife} />
      </ContentSection>

      <ContentSection
        eyebrow="Этика и безопасность"
        title={
          <>
            Прозрачность <br />
            <span className="text-[var(--muted)]">и защита данных</span>.
          </>
        }
        intro="Стандарты против коррупции, академической нечестности и регламент работы с персональными данными студентов и сотрудников."
      >
        <DocGrid items={integrity} />
      </ContentSection>

      <ContentSection eyebrow="Частые вопросы" title="О внутренних правилах.">
        <FAQ items={faq} />
      </ContentSection>

      <BigCTA
        eyebrow="Не нашли документ?"
        title={
          <>
            Канцелярия выдаст <br />
            заверенную копию.
          </>
        }
        body="Если нужна копия положения с подписью и печатью — оставьте заявку. Готовится в течение трёх рабочих дней."
        primary={{ label: "Связаться", href: "/contact" }}
        secondary={{ label: "Нормативные акты РК", href: "/documents/regulations" }}
      />
    </PageShell>
  );
}
