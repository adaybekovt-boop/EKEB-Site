import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { Timeline } from "@/components/page-content/timeline";
import { StatGrid } from "@/components/page-content/stat-strip";
import { BigCTA } from "@/components/page-content/big-cta";

export const metadata: Metadata = {
  title: "История колледжа — ЕКЕБ",
};

const history = [
  {
    year: "2018",
    title: "Основание колледжа",
    body: "Группа преподавателей и предпринимателей Актобе открывает колледж нового формата — с дуальной моделью, встроенной в учебный план с первого курса.",
  },
  {
    year: "2019",
    title: "Первая лицензия",
    body: "Получена государственная лицензия на пять специальностей: программное обеспечение, учёт и аудит, оценка, правоведение, сопровождение ПО.",
    accent: "warm" as const,
  },
  {
    year: "2020",
    title: "Удалёнка и онлайн-лаборатории",
    body: "Колледж переводит лабораторные занятия в виртуальные среды, разворачивает собственный AIS «College SmartNation» — управление расписанием, оценками и сдачей работ.",
  },
  {
    year: "2021",
    title: "Открытие WorldSkills-центра",
    body: "Запущена площадка подготовки к WorldSkills по компетенциям IT Software Solutions, IT Software Testing и Accounting. С этого года студенты выезжают на национальные чемпионаты.",
    accent: "warm" as const,
  },
  {
    year: "2022",
    title: "Бизнес-инкубатор",
    body: "Открытие инкубатора при колледже: рабочее место, ментор из индустрии и pre-seed для студенческих проектов. Первые три стартапа выпускников начинают приносить выручку.",
  },
  {
    year: "2023",
    title: "Государственная аккредитация",
    body: "Колледж проходит государственную аккредитацию НААР по всем пяти образовательным программам. Признание зарубежных партнёров — меморандумы с польским и латвийским колледжами.",
    accent: "warm" as const,
  },
  {
    year: "2024",
    title: "Аттестация и расширение",
    body: "Успешная аттестация программ, ремонт второго корпуса, открытие отдельных кабинетов 1С, тестирования ПО и юридической клиники для практики студентов-правоведов.",
  },
  {
    year: "2026",
    title: "1 200+ студентов и 150+ партнёров",
    body: "Сегодня в колледже учатся более 1200 студентов, действуют 150+ договоров о дуальной практике, 94% выпускников получают оффер до защиты диплома.",
    accent: "warm" as const,
  },
];

const stats = [
  { value: "8", label: "лет работы", hint: "с первого набора в 2018" },
  { value: "1 200+", label: "студентов", hint: "очная и заочная формы", warm: true },
  { value: "150+", label: "партнёров", hint: "договоры о дуальной практике" },
  { value: "94%", label: "трудоустройство", hint: "выпуск 2024 года", warm: true },
];

export default function HistoryPage() {
  return (
    <PageShell
      pathname="/about/history"
      eyebrow="О колледже"
      title="История колледжа."
      subtitle="От первой группы 2018 года до 1200+ студентов и 150+ компаний-партнёров сегодня."
      back={{ label: "Назад в «О колледже»", href: "/about" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Хронология"
        title={
          <>
            Восемь лет — <br />
            <span className="text-[var(--muted)]">от идеи до индустрии</span>.
          </>
        }
        intro="Колледж рос вместе с цифровой экономикой Актобе: каждый год новая компетенция, новый партнёр или новая лаборатория. Ниже — узловые точки, без воды."
        ambient="split"
      >
        <Timeline items={history} />
      </ContentSection>

      <BigCTA
        eyebrow="Хотите подробнее?"
        title={
          <>
            Институция, которая <br />
            готовит людей под индустрию.
          </>
        }
        body="Посмотрите коллектив, лицензию и аккредитации — или загляните на блог директора, где разбираются текущие изменения программ."
        primary={{ label: "Коллектив колледжа", href: "/about/staff" }}
        secondary={{ label: "Блог директора", href: "/about/blog" }}
      />
    </PageShell>
  );
}
