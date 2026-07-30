import type { Metadata } from "next";
import { Handshake, BookOpen, Users, Sun } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { StatGrid } from "@/components/page-content/stat-strip";
import { DocGrid } from "@/components/page-content/doc-card";
import { BigCTA } from "@/components/page-content/big-cta";
import { PartnerMap } from "./partner-map";

export const metadata: Metadata = {
  title: "Меморандумы и договора — ЕКЕБ",
};

const stats = [
  { value: "8", label: "зарубежных партнёров", hint: "колледжи и университеты" },
  { value: "5", label: "стран", hint: "Польша, Латвия, Турция, Литва, Узбекистан", warm: true },
  { value: "32", label: "студента в обмене", hint: "за 2023–2024 учебный год" },
  { value: "2026", label: "горизонт", hint: "действующие меморандумы", warm: true },
];

const partners = [
  {
    code: "PL",
    title: "Wyższa Szkoła Zarządzania w Krakowie",
    body: "Высшая школа управления в Кракове, Польша. Совместные программы по бизнес-аналитике и обмен студентов на летние модули.",
    tags: ["Польша", "Краков", "Обмен студентов"],
    href: "#",
  },
  {
    code: "LV",
    title: "Riga Technical College",
    body: "Технический колледж Риги, Латвия. Партнёрство по IT-программам, доступ к лабораториям, стажировки преподавателей.",
    tags: ["Латвия", "Рига", "IT", "Стажировки"],
    href: "#",
  },
  {
    code: "TR",
    title: "Anadolu University",
    body: "Университет Анадолу в Эскишехире, Турция. Программа двойного руководства дипломами и доступ к открытым курсам университета.",
    tags: ["Турция", "Эскишехир", "Двойные дипломы"],
    href: "#",
  },
  {
    code: "LT",
    title: "Kauno Kolegija — Higher Education Institution",
    body: "Каунасский колледж, Литва. Совместная летняя школа по правоведению и сравнительному праву ЕС.",
    tags: ["Литва", "Каунас", "Summer school"],
    href: "#",
  },
  {
    code: "UZ",
    title: "Tashkent State Economic University",
    body: "Ташкентский государственный экономический университет. Программы для специальности «Учёт и аудит», совместные конференции.",
    tags: ["Узбекистан", "Ташкент", "Бухучёт"],
    href: "#",
  },
  {
    code: "PL",
    title: "Państwowa Wyższa Szkoła Zawodowa, Tarnów",
    body: "Государственная высшая школа в Тарнуве, Польша. Краткосрочные стажировки преподавателей по педагогике СПО.",
    tags: ["Польша", "Тарнув", "Преподаватели"],
    href: "#",
  },
  {
    code: "TR",
    title: "Konya Technical University",
    body: "Технический университет Коньи, Турция. Партнёрство по программе «Системы информационной безопасности» и совместные хакатоны.",
    tags: ["Турция", "Конья", "Кибербезопасность"],
    href: "#",
  },
  {
    code: "LV",
    title: "Latvian College of Culture",
    body: "Латвийский колледж культуры. Площадка для обмена по soft skills и студенческой жизни в рамках программы культурной мобильности.",
    tags: ["Латвия", "Культура", "Soft skills"],
    href: "#",
  },
];

const includes = [
  {
    title: "Обмен студентами",
    body: "Семестр или модуль обучения у партнёра с переносом кредитов. По итогам — академическая справка, признаваемая в обоих учебных заведениях.",
  },
  {
    title: "Совместные программы",
    body: "Согласованные модули, единые методические материалы, в отдельных случаях — двойное руководство дипломным проектом и совместная защита.",
  },
  {
    title: "Летние школы",
    body: "Двух- или трёхнедельные интенсивы по конкретной теме: бизнес-аналитика, сравнительное право ЕС, кибербезопасность. Финансируются совместно.",
  },
  {
    title: "Стажировки преподавателей",
    body: "Обмен опытом методистов и преподавателей: лекции в принимающем учреждении, наблюдение за форматами обучения, обмен учебными планами.",
  },
];

const docs = [
  {
    title: "Меморандум о взаимопонимании — Wyższa Szkoła Zarządzania",
    kind: "Подписан 03.2023, действует до 2028",
    size: "640 КБ",
    updated: "03.2023",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Меморандум — Riga Technical College",
    kind: "Подписан 09.2022, действует до 2027",
    size: "590 КБ",
    updated: "09.2022",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Договор о двойном дипломировании — Anadolu University",
    kind: "Подписан 05.2024, рамочный",
    size: "820 КБ",
    updated: "05.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Меморандум — Kauno Kolegija",
    kind: "Подписан 02.2024, действует до 2026",
    size: "510 КБ",
    updated: "02.2024",
    format: "PDF" as const,
    href: "#",
  },
];

export default function MemorandumsPage() {
  return (
    <PageShell
      pathname="/international/memorandums"
      eyebrow="Международное"
      title="Меморандумы и договора."
      subtitle="Подписанные соглашения о сотрудничестве с зарубежными колледжами, университетами и компаниями."
      back={{ label: "Назад в «Международное»", href: "/international" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Карта"
        title={
          <>
            Пять стран — <br />
            <span className="text-[var(--muted)]">восемь договоров</span>.
          </>
        }
        intro="Сеть зарубежных партнёров колледжа: от Кракова до Ташкента. Каждый договор — рабочий: за ним стоят семестры обмена, летние школы и совместные защиты."
        ambient="indigo"
      >
        <PartnerMap />
      </ContentSection>

      <ContentSection
        eyebrow="Партнёры"
        title={
          <>
            Учебные заведения, <br />
            <span className="text-[var(--muted)]">с которыми работаем</span>.
          </>
        }
        intro="Восемь действующих меморандумов. Каждый закреплён в реестре международного отдела колледжа."
        ambient="split"
      >
        <FeatureGrid items={partners} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Что включает меморандум"
        title={
          <>
            Четыре формата <br />
            <span className="text-[var(--muted)]">сотрудничества</span>.
          </>
        }
        intro="Один документ может включать несколько направлений. Конкретный объём — в приложении к меморандуму на каждый учебный год."
        ambient="warm"
      >
        <FeatureGrid items={includes} cols={4} />
      </ContentSection>

      <ContentSection
        eyebrow="Документы"
        title={
          <>
            Подписанные <br />
            <span className="text-[var(--muted)]">соглашения</span>.
          </>
        }
        intro="Часть актуальных меморандумов в открытом доступе. Полный реестр — в международном отделе колледжа."
      >
        <DocGrid items={docs} />
      </ContentSection>

      <BigCTA
        eyebrow="Дальше"
        title={
          <>
            Посмотрите международные <br />
            проекты колледжа.
          </>
        }
        body="Erasmus+, Bolashak, EU4Skills — конкретные проекты, в которых студенты и преподаватели участвуют прямо сейчас."
        primary={{ label: "Проекты", href: "/international/projects" }}
        secondary={{ label: "Аккредитация", href: "/international/accreditation" }}
      />
    </PageShell>
  );
}
