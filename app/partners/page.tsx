import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { BigCTA } from "@/components/page-content/big-cta";
import { Marquee } from "@/components/ui/marquee";
import { PartnersGrid, type Partner } from "@/components/partners/partners-grid";

export const metadata: Metadata = {
  title: "Наши партнёры — ЕКЕБ",
  description:
    "Список компаний, где студенты ЕКЕБ проходят дуальную практику. Фильтр по отрасли, количеству мест и направлениям.",
};

const stats = [
  { value: "150+", label: "компаний-партнёров", hint: "договор о дуальной практике" },
  { value: "6", label: "отраслей", hint: "от IT до госсектора", warm: true },
  { value: "420", label: "студентов на практике", hint: "семестр 2025/26" },
  { value: "94%", label: "офферов до защиты", hint: "выпуск 2024 года", warm: true },
];

const partners: Partner[] = [
  // IT
  {
    id: "kaspi",
    name: "Kaspi.kz",
    industry: "IT",
    city: "Алматы · Актобе",
    seats: 24,
    tracks: ["Разработка", "QA", "Аналитика"],
    accent: "indigo",
  },
  {
    id: "chocofamily",
    name: "Chocofamily Holding",
    industry: "IT",
    city: "Алматы",
    seats: 12,
    tracks: ["Бэкенд", "Frontend"],
    accent: "indigo",
  },
  {
    id: "kolesa",
    name: "Kolesa Group",
    industry: "IT",
    city: "Алматы · удалённо",
    seats: 8,
    tracks: ["QA", "DevOps"],
    accent: "indigo",
  },
  {
    id: "btsdigital",
    name: "BTS Digital",
    industry: "IT",
    city: "Астана",
    seats: 10,
    tracks: ["GovTech", "Data"],
    accent: "warm",
  },
  {
    id: "tabys",
    name: "Tabys",
    industry: "IT",
    city: "Актобе",
    seats: 14,
    tracks: ["Web", "Mobile"],
    accent: "indigo",
  },
  {
    id: "aktobedev",
    name: "Aktobe Dev Studio",
    industry: "IT",
    city: "Актобе",
    seats: 9,
    tracks: ["Frontend", "1C-разработка"],
    accent: "warm",
  },
  {
    id: "westcode",
    name: "WestCode",
    industry: "IT",
    city: "Актобе",
    seats: 6,
    tracks: ["WordPress", "Тестирование"],
    accent: "indigo",
  },
  {
    id: "ramaiot",
    name: "Rama IoT",
    industry: "IT",
    city: "Актобе · Алматы",
    seats: 5,
    tracks: ["Embedded", "DevOps"],
    accent: "warm",
  },

  // Финансы
  {
    id: "halyk",
    name: "Halyk Bank",
    industry: "Финансы",
    city: "Актобе",
    seats: 18,
    tracks: ["Учёт", "Кредитный отдел"],
    accent: "warm",
  },
  {
    id: "forte",
    name: "ForteBank",
    industry: "Финансы",
    city: "Актобе",
    seats: 10,
    tracks: ["Розничный блок", "Бэк-офис"],
    accent: "indigo",
  },
  {
    id: "jusan",
    name: "Jusan Bank",
    industry: "Финансы",
    city: "Актобе",
    seats: 8,
    tracks: ["Кассовые операции", "MSFO"],
    accent: "warm",
  },
  {
    id: "kassa-grand",
    name: "Касса Гранд Аудит",
    industry: "Финансы",
    city: "Актобе",
    seats: 6,
    tracks: ["Аудит", "1С: Бухгалтерия"],
    accent: "indigo",
  },
  {
    id: "appraisal-house",
    name: "Дом Оценки KZ",
    industry: "Финансы",
    city: "Актобе",
    seats: 5,
    tracks: ["Оценка недвижимости", "Авто"],
    accent: "warm",
  },

  // Телеком
  {
    id: "beeline",
    name: "Beeline Kazakhstan",
    industry: "Телеком",
    city: "Актобе",
    seats: 12,
    tracks: ["Сети", "Поддержка"],
    accent: "indigo",
  },
  {
    id: "kazakhtelecom",
    name: "Казахтелеком",
    industry: "Телеком",
    city: "Актобе",
    seats: 9,
    tracks: ["Сетевая инфра", "1-я линия"],
    accent: "warm",
  },
  {
    id: "tele2",
    name: "Tele2 / Altel",
    industry: "Телеком",
    city: "Актобе",
    seats: 7,
    tracks: ["Розница", "CRM-системы"],
    accent: "indigo",
  },

  // Госсектор
  {
    id: "egov",
    name: "ЦОН «Правительство для граждан»",
    industry: "Госсектор",
    city: "Актобе",
    seats: 14,
    tracks: ["Документооборот", "Юр.клиника"],
    accent: "warm",
  },
  {
    id: "akimat",
    name: "Акимат г. Актобе",
    industry: "Госсектор",
    city: "Актобе",
    seats: 8,
    tracks: ["Правовое сопровождение"],
    accent: "indigo",
  },
  {
    id: "tax",
    name: "Комитет госдоходов",
    industry: "Госсектор",
    city: "Актобе",
    seats: 6,
    tracks: ["Налоговый учёт"],
    accent: "warm",
  },

  // Розница
  {
    id: "magnum",
    name: "Magnum Cash & Carry",
    industry: "Розница",
    city: "Актобе",
    seats: 10,
    tracks: ["Складской учёт", "1С: ТМЗ"],
    accent: "indigo",
  },
  {
    id: "lamoda",
    name: "Lamoda KZ",
    industry: "Розница",
    city: "Алматы · удалённо",
    seats: 5,
    tracks: ["Фулфилмент", "Аналитика"],
    accent: "warm",
  },
  {
    id: "airastana",
    name: "Air Astana",
    industry: "Розница",
    city: "Актобе (представительство)",
    seats: 4,
    tracks: ["Клиентский сервис"],
    accent: "indigo",
  },
  {
    id: "small",
    name: "Small.kz",
    industry: "Розница",
    city: "Актобе",
    seats: 6,
    tracks: ["E-commerce", "Контент"],
    accent: "warm",
  },

  // Производство
  {
    id: "ank",
    name: "АНК «Актобе»",
    industry: "Производство",
    city: "Актобе",
    seats: 12,
    tracks: ["Учёт ТМЗ", "Правовая часть"],
    accent: "indigo",
  },
  {
    id: "actubeferrum",
    name: "АктобеФеррум",
    industry: "Производство",
    city: "Актобе",
    seats: 8,
    tracks: ["Бухгалтерия предприятий"],
    accent: "warm",
  },
  {
    id: "agromaster",
    name: "Агромастер-Запад",
    industry: "Производство",
    city: "Актобе",
    seats: 5,
    tracks: ["1С: УПП"],
    accent: "indigo",
  },
];

const marqueeNames = [
  "Kaspi",
  "Halyk Bank",
  "Beeline",
  "Казахтелеком",
  "Chocofamily",
  "Kolesa Group",
  "ForteBank",
  "Jusan",
  "Tabys",
  "BTS Digital",
  "Lamoda",
  "Air Astana",
  "Magnum",
  "ЦОН",
  "Tele2",
];

export default function PartnersPage() {
  return (
    <PageShell
      pathname="/partners"
      eyebrow="О колледже"
      title="Наши партнёры."
      subtitle="150+ компаний, где студенты проходят дуальную практику и получают офферы после выпуска. Фильтруйте по отрасли — увидите количество мест и направления."
      back={{ label: "Назад в «О колледже»", href: "/about" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Сетка партнёров"
        title={
          <>
            Шесть отраслей — <br />
            <span className="text-[var(--muted)]">от IT до акимата</span>.
          </>
        }
        intro="Каждый партнёр подписал договор о дуальной практике с фиксированным количеством мест на семестр. Карточка показывает компанию, город, направления и формат."
        ambient="indigo"
      >
        <PartnersGrid items={partners} />
      </ContentSection>

      <Marquee items={marqueeNames} />

      <BigCTA
        eyebrow="Хотите присоединиться?"
        title={
          <>
            Стать партнёром <br />
            <span className="text-[var(--muted)]">колледжа ЕКЕБ</span>.
          </>
        }
        body="Компании-партнёры получают доступ к стажёрам с проверенной базой, могут участвовать в защите дипломов и предлагать заказы на лабораторные. Подписать договор о дуальной практике можно в течение двух недель."
        primary={{ label: "Связаться с приёмной", href: "/contact" }}
        secondary={{ label: "Образовательные программы", href: "/learning/programs" }}
      />
    </PageShell>
  );
}
