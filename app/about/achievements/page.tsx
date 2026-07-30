import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { Timeline } from "@/components/page-content/timeline";
import { BigCTA } from "@/components/page-content/big-cta";
import { PartnerTags } from "@/components/about/partner-tags";
import {
  Trophy,
  Medal,
  Code2,
  Cpu,
  Calculator,
  GraduationCap,
  Rocket,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Достижения — ЕКЕБ",
};

const stats = [
  { value: "47", label: "медалей", hint: "WorldSkills и олимпиады, 2019–2025" },
  {
    value: "12",
    label: "золотых",
    hint: "региональные и нац. этапы",
    warm: true,
  },
  { value: "6", label: "компетенций", hint: "WorldSkills Kazakhstan" },
  { value: "94%", label: "оффер", hint: "до защиты диплома, выпуск 2024", warm: true },
];

const worldskills = [
  {
    code: "GOLD",
    title: "IT Software Solutions for Business",
    body:
      "Региональный чемпионат WorldSkills Aktobe 2024. Команда: Алмас Бекенов, наставник — Тимур Жанабаев. Прошли на национальный этап.",
    tags: ["2024", "Регион"],
  },
  {
    code: "SILVER",
    title: "IT Software Testing",
    body:
      "Национальный чемпионат WorldSkills Kazakhstan 2024. Айгерим Жунусова — единственный участник из Актобе в финале.",
    tags: ["2024", "Нац."],
  },
  {
    code: "BRONZE",
    title: "Web Technologies",
    body:
      "Региональный этап 2023. Студенты второго курса вышли в финал с проектом на Next.js и собственной CMS.",
    tags: ["2023", "Регион"],
  },
  {
    code: "GOLD",
    title: "Accounting",
    body:
      "Региональный чемпионат 2023. Камила Бекетова. Подготовка велась на базе кафедры «Учёт и аудит» с симуляцией 1С.",
    tags: ["2023", "Регион"],
  },
  {
    code: "SILVER",
    title: "Digital Construction (Civil 3D)",
    body:
      "Совместная команда с партнёрским колледжем. Площадка — Алматы, 2025. Призовое место в межрегиональном зачёте.",
    tags: ["2025"],
  },
  {
    code: "GOLD",
    title: "Cyber Security (Junior)",
    body:
      "Юниорский трек WorldSkills Aktobe 2025. Двое студентов первого курса под наставничеством практика из IT-партнёра.",
    tags: ["2025", "Junior"],
  },
];

const olympiads = [
  {
    code: "01",
    title: "Республиканская олимпиада по информатике",
    body:
      "Третье место в командном зачёте, 2024. Призёр в личном — Динара Кулмагамбетова. Алгоритмы и структуры данных на C++.",
    tags: ["Алгоритмы"],
  },
  {
    code: "02",
    title: "Региональная олимпиада по математике",
    body:
      "Победитель — Адильбек Сериков, второй курс. Параллельно прошёл стажировку в банке-партнёре.",
    tags: ["Математика"],
  },
  {
    code: "03",
    title: "Хакатон Aktobe Digital",
    body:
      "Гран-при за систему учёта посещаемости со сканом QR-бейджа. Решение внедрено в самом колледже.",
    tags: ["Хакатон", "MVP"],
  },
  {
    code: "04",
    title: "Олимпиада по бухгалтерскому учёту",
    body:
      "Командное второе место по СКФО Казахстана, 2023. Тренер — Маржан Аубакирова, кафедра «Учёт и аудит».",
    tags: ["Бух. учёт"],
  },
  {
    code: "05",
    title: "AstanaHub Startup Garage",
    body:
      "Студенческий стартап «KirJoler» (логистика для МСБ) прошёл в акселератор и получил pre-seed грант.",
    tags: ["Стартап"],
  },
  {
    code: "06",
    title: "Конкурс «Правовая клиника года»",
    body:
      "Юридическая клиника колледжа признана лучшей в категории «ТиПО» по Западному Казахстану в 2024 году.",
    tags: ["Право"],
  },
];

const milestones = [
  {
    year: "2021",
    title: "Первая медаль на WorldSkills",
    body:
      "Серебро по компетенции IT Software Solutions на региональном чемпионате. Команда из трёх студентов, наставник — Тимур Жанабаев.",
  },
  {
    year: "2022",
    title: "Победа в хакатоне Aktobe Digital",
    body:
      "Гран-при за систему учёта посещаемости с QR-бейджами. Проект внедрён в самом колледже и продаётся партнёрским колледжам.",
    accent: "warm" as const,
  },
  {
    year: "2023",
    title: "Золото и серебро на нац. этапе",
    body:
      "Камила Бекетова — золото по Accounting. Дилназ Серикова — серебро по IT Software Testing. Поездка на международный отбор.",
  },
  {
    year: "2024",
    title: "47-я медаль и оффер до диплома",
    body:
      "Колледж пересек отметку 47 медалей с момента основания. 94% выпускников 2024 года получили оффер до защиты диплома.",
    accent: "warm" as const,
  },
  {
    year: "2025",
    title: "Cyber Security Junior — золото",
    body:
      "Юниорский трек WorldSkills Aktobe 2025. Двое первокурсников взяли золото — самый молодой состав в истории колледжа.",
  },
];

const partners = [
  "WorldSkills Kazakhstan",
  "AstanaHub",
  "Палата оценщиков РК",
  "Палата аудиторов РК",
  "Aktobe Digital",
  "MOST IT Hub",
];

export default function AchievementsPage() {
  return (
    <PageShell
      pathname="/about/achievements"
      eyebrow="О колледже"
      title="Достижения."
      subtitle="Медали WorldSkills, призовые места республиканских олимпиад, гранты в стартап-акселераторах и оффер до защиты диплома — конкретные результаты студентов и команд."
      back={{ label: "Назад в «О колледже»", href: "/about" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="WorldSkills"
        title={
          <>
            Шесть компетенций — <br />
            <span className="text-[var(--muted)]">регулярные медали</span>.
          </>
        }
        intro="Подготовка идёт круглый год на площадке центра WorldSkills при колледже. Команды формируются по итогам внутренних отборов с первого курса."
        ambient="indigo"
      >
        <FeatureGrid items={worldskills} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Олимпиады и хакатоны"
        title={
          <>
            Шесть направлений — <br />
            <span className="text-[var(--muted)]">не только IT</span>.
          </>
        }
        intro="Студенты колледжа выступают на профильных олимпиадах по математике, бухгалтерскому учёту, информатике и в хакатонах с реальными прототипами."
        ambient="warm"
      >
        <FeatureGrid items={olympiads} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Хронология"
        title={
          <>
            Пять лет — <br />
            <span className="text-[var(--muted)]">пять переломных точек</span>.
          </>
        }
        intro="Главные моменты в истории спортивно-академической программы колледжа: от первой медали до института стажировок до защиты диплома."
        ambient="split"
      >
        <Timeline items={milestones} />
      </ContentSection>

      <ContentSection eyebrow="Партнёры" title="Кто помогает готовиться">
        <PartnerTags items={partners} />
      </ContentSection>

      <BigCTA
        eyebrow="Хотите попасть в команду?"
        title={
          <>
            Отборы открыты <br />
            с первого курса.
          </>
        }
        body="WorldSkills-площадка колледжа набирает участников каждый сентябрь. Отбор по компетенциям, тренировки 4–6 часов в неделю, поездки на чемпионаты за счёт колледжа."
        primary={{ label: "Поступить в колледж", href: "/admissions" }}
        secondary={{ label: "Посмотреть программы", href: "/learning/programs" }}
        variant="warm"
      />
    </PageShell>
  );
}
