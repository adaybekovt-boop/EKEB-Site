import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { DocGrid } from "@/components/page-content/doc-card";
import { StatGrid } from "@/components/page-content/stat-strip";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { BigCTA } from "@/components/page-content/big-cta";
import {
  Code2,
  Calculator,
  Scale,
  Gauge,
  Cog,
  ShieldCheck,
  BadgeCheck,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Лицензия — ЕКЕБ",
};

const stats = [
  { value: "KZ", label: "лицензия РК", hint: "Министерство образования и науки" },
  {
    value: "5",
    label: "специальностей",
    hint: "по классификатору ГОСО РК",
    warm: true,
  },
  { value: "2", label: "аккредитации", hint: "НААР и AQAS" },
  { value: "2031", label: "срок действия", hint: "следующая аттестация в 2027", warm: true },
];

const docs = [
  {
    title: "Государственная лицензия KZ83LAA00021157",
    kind: "Образовательная деятельность ТиПО",
    size: "1.4 MB",
    updated: "март 2024",
    href: "#",
    format: "PDF",
  },
  {
    title: "Приложение 1 — Программное обеспечение",
    kind: "06120100, 06120200",
    size: "412 KB",
    updated: "март 2024",
    href: "#",
    format: "PDF",
  },
  {
    title: "Приложение 2 — Учёт и аудит",
    kind: "04120100",
    size: "388 KB",
    updated: "март 2024",
    href: "#",
    format: "PDF",
  },
  {
    title: "Приложение 3 — Правоведение",
    kind: "04210100",
    size: "402 KB",
    updated: "март 2024",
    href: "#",
    format: "PDF",
  },
  {
    title: "Приложение 4 — Оценка",
    kind: "04110200",
    size: "395 KB",
    updated: "март 2024",
    href: "#",
    format: "PDF",
  },
  {
    title: "Приложение 5 — Сопровождение ПО",
    kind: "06120300",
    size: "376 KB",
    updated: "март 2024",
    href: "#",
    format: "PDF",
  },
  {
    title: "Аккредитация НААР — программа ПО",
    kind: "Сертификат № SA-A-0421-22",
    size: "820 KB",
    updated: "май 2023",
    href: "#",
    format: "PDF",
  },
  {
    title: "Аккредитация AQAS — программа «Учёт и аудит»",
    kind: "Институциональная аккредитация",
    size: "1.1 MB",
    updated: "ноябрь 2023",
    href: "#",
    format: "PDF",
  },
];

const programs = [
  {
    code: "06120100",
    title: "Программное обеспечение",
    body:
      "3 г 10 мес на базе 9 кл · 2 г 10 мес на базе 11 кл. Квалификации: техник-программист, разработчик ПО.",
    tags: ["ГОСО 2022", "Дуальная"],
  },
  {
    code: "06120300",
    title: "Сопровождение ПО",
    body:
      "Эксплуатация и поддержка прикладного ПО, базовое тестирование, работа с системами учёта инцидентов.",
    tags: ["ГОСО 2022"],
  },
  {
    code: "04120100",
    title: "Учёт и аудит",
    body:
      "Бухгалтер, бухгалтер-практик. Программа согласована с ПБК и Палатой аудиторов РК. Работа в 1С и БАС.",
    tags: ["ГОСО 2022", "1С", "МСФО"],
  },
  {
    code: "04210100",
    title: "Правоведение",
    body:
      "Юрист среднего звена. Гражданское, трудовое и административное право РК. Практика в юр. клинике колледжа.",
    tags: ["ГОСО 2022"],
  },
  {
    code: "04110200",
    title: "Оценка",
    body:
      "Помощник оценщика. Оценка недвижимости, движимого имущества, бизнеса. Партнёрство с Палатой оценщиков РК.",
    tags: ["ГОСО 2022"],
  },
  {
    code: "—",
    title: "Контроль качества",
    body:
      "Внутренний аудит образовательного процесса, опросы студентов и работодателей, рейтинг преподавателей.",
    tags: ["ISO 21001"],
  },
];

const meta = [
  {
    code: "KZ83LAA00021157",
    title: "Номер лицензии",
    body: "Выдана уполномоченным органом РК в сфере образования. Бессрочная, требует периодической переаттестации программ.",
  },
  {
    code: "12.03.2024",
    title: "Дата последнего переоформления",
    body: "Переоформление после добавления специальности «Сопровождение ПО» и обновления квалификаций по ПО.",
  },
];

export default function LicensePage() {
  return (
    <PageShell
      pathname="/about/license"
      eyebrow="О колледже"
      title="Лицензия."
      subtitle="Государственная лицензия на образовательную деятельность по программам технического и профессионального образования, приложения по каждой специальности и подтверждающие сертификаты аккредитации."
      back={{ label: "Назад в «О колледже»", href: "/about" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Документ"
        title={
          <>
            Лицензия выдана <br />
            <span className="text-[var(--muted)]">Министерством образования РК</span>.
          </>
        }
        intro="Колледж работает по бессрочной государственной лицензии. Каждые пять лет программы проходят государственную аттестацию, а раз в шесть лет — независимую аккредитацию."
        ambient="indigo"
      >
        <FeatureGrid items={meta} cols={2} />
      </ContentSection>

      <ContentSection
        eyebrow="Приложения"
        title={
          <>
            Пять специальностей — <br />
            <span className="text-[var(--muted)]">по коду ГОСО РК</span>.
          </>
        }
        intro="К лицензии приложен пакет документов по каждой специальности с указанием квалификаций, форм обучения и сроков подготовки."
        ambient="warm"
      >
        <FeatureGrid items={programs} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Скачать"
        title={
          <>
            Сканы и приложения <br />
            <span className="text-[var(--muted)]">в открытом доступе</span>.
          </>
        }
        intro="Все документы доступны для скачивания: лицензия, приложения по каждой специальности, сертификаты аккредитации НААР и AQAS."
      >
        <DocGrid items={docs} />
      </ContentSection>

      <BigCTA
        eyebrow="Сомневаетесь?"
        title={
          <>
            Можем подтвердить <br />
            подлинность лицензии.
          </>
        }
        body="Проверить лицензию можно в реестре уполномоченного органа РК или запросить заверенную копию в приёмной комиссии — приходите лично или напишите нам."
        primary={{ label: "Связаться с приёмной", href: "/contact" }}
        secondary={{ label: "Аккредитация и аттестация", href: "/about/history" }}
      />
    </PageShell>
  );
}
