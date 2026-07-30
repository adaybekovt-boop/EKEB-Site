import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { MediaGrid } from "@/components/about/media-grid";
import { BigCTA } from "@/components/page-content/big-cta";

export const metadata: Metadata = {
  title: "СМИ о нас — ЕКЕБ",
};

const stats = [
  { value: "38", label: "публикаций", hint: "с 2020 года" },
  { value: "9", label: "ТВ-сюжетов", hint: "QazaqstanTV, Almaty TV и регион", warm: true },
  { value: "4", label: "подкаста", hint: "интервью с директором и преподавателями" },
  { value: "12", label: "регион. изданий", hint: "Aktobe Times, AQT, Diapazon", warm: true },
];

const featured = [
  {
    outlet: "Forbes Kazakhstan",
    date: "14 марта 2024",
    type: "Статья" as const,
    title: "Как Актобе вырастил собственный IT-колледж и стал поставщиком разработчиков",
    excerpt:
      "Разбор дуальной модели ЕКЕБ, цифры трудоустройства и интервью с директором о том, как договариваться с компаниями-партнёрами.",
    href: "#",
    accent: "indigo" as const,
    coverImage: "/images/media/media_02.jpg",
  },
  {
    outlet: "Tengrinews",
    date: "2 ноября 2023",
    type: "Статья" as const,
    title: "Студенты из Актобе взяли золото WorldSkills по Accounting",
    excerpt:
      "Репортаж с национального этапа WorldSkills Kazakhstan и комментарии тренеров колледжа о подготовке к чемпионату.",
    href: "#",
    accent: "warm" as const,
    coverImage: "/images/media/media_03.jpg",
  },
  {
    outlet: "Inbusiness.kz",
    date: "20 сентября 2024",
    type: "Статья" as const,
    title: "94% выпускников ЕКЕБ получают оффер до защиты диплома — как это устроено",
    excerpt:
      "Анализ модели «стажировка с третьего семестра» и сравнение с другими колледжами Западного Казахстана.",
    href: "#",
    accent: "indigo" as const,
    coverImage: "/images/media/media_01.jpg",
  },
];

const all = [
  {
    outlet: "QazaqstanTV",
    date: "11 февраля 2025",
    type: "Сюжет" as const,
    title: "Дуальная модель ЕКЕБ — материал в выпуске «Жаңалықтар»",
    excerpt:
      "Шестиминутный сюжет о том, как студенты совмещают учёбу и работу в компаниях-партнёрах. Съёмки в лабораториях колледжа.",
    href: "#",
  },
  {
    outlet: "Aktobe Times",
    date: "28 мая 2024",
    type: "Статья" as const,
    title: "ЕКЕБ открывает юридическую клинику для жителей Актобе",
    excerpt:
      "Студенты-правоведы под руководством практикующих юристов оказывают бесплатные консультации жителям трёх районов города.",
    href: "#",
    accent: "warm" as const,
  },
  {
    outlet: "Capital.kz",
    date: "9 января 2024",
    type: "Статья" as const,
    title: "Колледж как стартап: ЕКЕБ и его бизнес-инкубатор",
    excerpt:
      "Три студенческих стартапа из инкубатора колледжа суммарно приносят выручку в 60+ млн тенге в год. Разбор кейса KirJoler.",
    href: "#",
  },
  {
    outlet: "Bilim Podcast",
    date: "17 апреля 2024",
    type: "Подкаст" as const,
    title: "Айнур Сейтжанова — как договариваться с индустрией",
    excerpt:
      "Часовое интервью директора колледжа: про найм преподавателей-практиков, договоры о дуальной практике и реальные оферы.",
    href: "#",
    accent: "indigo" as const,
  },
  {
    outlet: "Diapazon",
    date: "5 декабря 2023",
    type: "Статья" as const,
    title: "Аккредитация НААР: первый колледж Актобе с международным признанием",
    excerpt:
      "Региональная газета о прохождении институциональной аккредитации и реакции работодателей города.",
    href: "#",
  },
  {
    outlet: "Almaty TV",
    date: "30 октября 2024",
    type: "Сюжет" as const,
    title: "Хакатон Aktobe Digital выиграли студенты ЕКЕБ",
    excerpt:
      "Гран-при за систему учёта посещаемости с QR-бейджами, которую внедрили в самом колледже и продали трём партнёрам.",
    href: "#",
    accent: "warm" as const,
  },
  {
    outlet: "Kursiv.media",
    date: "22 июня 2024",
    type: "Статья" as const,
    title: "Дефицит бухгалтеров в Актобе: что делает колледж ЕКЕБ",
    excerpt:
      "Бизнес-издание о новой образовательной программе по 1С и БАС и о соглашениях с региональными компаниями.",
    href: "#",
  },
  {
    outlet: "AQT online",
    date: "12 марта 2025",
    type: "Статья" as const,
    title: "WorldSkills Aktobe 2025: ЕКЕБ — главная площадка региона",
    excerpt:
      "Региональный чемпионат снова на базе колледжа. 6 компетенций, 70+ участников, 4 первых места у команд ЕКЕБ.",
    href: "#",
    accent: "indigo" as const,
  },
  {
    outlet: "EdTech KZ",
    date: "8 августа 2024",
    type: "Подкаст" as const,
    title: "Цифровизация ТиПО — что работает в регионах",
    excerpt:
      "Дамир Ермеков, замдиректора по учебной работе, разбирает кейс системы «College SmartNation» собственной разработки.",
    href: "#",
  },
];

export default function MediaPage() {
  return (
    <PageShell
      pathname="/about/media"
      eyebrow="О колледже"
      title="СМИ о нас."
      subtitle="Публикации в Forbes Kazakhstan, Tengrinews, Inbusiness и региональных изданиях, телесюжеты и подкасты — собрали всё в одном месте."
      back={{ label: "Назад в «О колледже»", href: "/about" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Главное"
        title={
          <>
            Три крупные публикации <br />
            <span className="text-[var(--muted)]">за последний год</span>.
          </>
        }
        intro="Материалы, в которых разобрана дуальная модель колледжа, цифры трудоустройства и победы на чемпионатах."
        ambient="indigo"
      >
        <MediaGrid items={featured} />
      </ContentSection>

      <ContentSection
        eyebrow="Архив"
        title={
          <>
            Все упоминания — <br />
            <span className="text-[var(--muted)]">по дате</span>.
          </>
        }
        intro="Региональные и республиканские издания, ТВ-сюжеты, отраслевые подкасты. Все ссылки внешние — открываются в новой вкладке."
        ambient="warm"
      >
        <MediaGrid items={all} />
      </ContentSection>

      <BigCTA
        eyebrow="Пресс-служба"
        title={
          <>
            Журналистам — <br />
            пишите напрямую.
          </>
        }
        body="Готовы дать комментарий по теме ТиПО, дуального образования, IT-кадров в регионе, WorldSkills. Пресс-кит с фактами, цифрами и фото — по запросу."
        primary={{ label: "Связаться с пресс-службой", href: "/contact" }}
        secondary={{ label: "Блог директора", href: "/about/blog" }}
      />
    </PageShell>
  );
}
