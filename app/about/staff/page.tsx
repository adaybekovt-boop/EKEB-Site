import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { BigCTA } from "@/components/page-content/big-cta";
import { StaffGrid, TeacherGrid } from "@/components/staff/staff-grid";

export const metadata: Metadata = {
  title: "Коллектив колледжа — ЕКЕБ",
};

const stats = [
  { value: "85", label: "преподавателей", hint: "из них 38 — из индустрии" },
  { value: "12", label: "руководителей", hint: "директор, замы, методисты", warm: true },
  { value: "32", label: "практика-наставника", hint: "со стороны партнёров" },
  { value: "9", label: "докторов наук", hint: "PhD и кандидаты наук", warm: true },
];

const leadership = [
  {
    name: "Айнур Сейтжанова",
    role: "Директор колледжа",
    department: "Управление",
    accent: "indigo" as const,
    bio: "Кандидат экономических наук. С 2018 года ведёт колледж от лицензирования до полной аккредитации. Курирует партнёрство с индустрией.",
  },
  {
    name: "Дамир Ермеков",
    role: "Заместитель по учебной работе",
    department: "Учебная часть",
    accent: "warm" as const,
    bio: "Отвечает за качество образования, расписание и совмещение дуальной практики с теоретическими модулями.",
  },
  {
    name: "Гульнара Абдрахманова",
    role: "Заместитель по воспитательной работе",
    department: "Студенческая жизнь",
    accent: "indigo" as const,
    bio: "Курирует студсовет, профориентацию, психологическую службу и ящик доверия.",
  },
];

const teachers = [
  { name: "Аймбетова Арай Абдигалиева", image: "/images/teachers/Аймбетова_Арай_Абдигалиева.jpg" },
  { name: "Бажитова Ольга Владимировна", image: "/images/teachers/Бажитова_Ольга_Владимировна.jpg" },
  { name: "Бегіманов Серіқкали Берикұлы", image: "/images/teachers/Бегіманов_Серіқкали_Берикұлы.jpg" },
  { name: "Жалимов Ислам Дустанович", image: "/images/teachers/Жалимов_Ислам_Дустанович.jpg" },
  { name: "Катенова Эльмира Бекжановна", image: "/images/teachers/Катенова_Эльмира_Бекжановна.jpg" },
  { name: "Кәдірбек Данияр Берікұлы", image: "/images/teachers/Кәдірбек_Данияр_Берікұлы.jpg" },
  { name: "Мусина Рита Маликовна", image: "/images/teachers/Мусина_Рита_Маликовна.jpg" },
  { name: "Нарыков Нурсултан Кикельбаевич", image: "/images/teachers/Нарыков_Нурсултан_Кикельбаевич.jpg" },
  { name: "Султамуратов Бакытхан Адилбекович", image: "/images/teachers/Султамуратов_Бакытхан_Адилбекович.jpg" },
  { name: "Турганова Клара Алиевна", image: "/images/teachers/Турганова_Клара_Алиевна.jpg" },
  { name: "Қаржау Шолпан Шынжанқызы", image: "/images/teachers/Қаржау_Шолпан_Шынжанқызы.jpg" },
];

const departments = [
  {
    name: "Программное обеспечение",
    head: "Тимур Жанабаев",
    role: "Заведующий кафедрой",
    members: 18,
    note: "Разработка, тестирование, DevOps, базы данных. Большая часть преподавателей — действующие разработчики из IT-партнёров.",
    accent: "indigo" as const,
  },
  {
    name: "Учёт и аудит",
    head: "Маржан Аубакирова",
    role: "Заведующая кафедрой",
    members: 11,
    note: "1С, МСФО, налогообложение, аудит. Преподаватели — практикующие бухгалтеры и аудиторы.",
    accent: "warm" as const,
  },
  {
    name: "Правоведение",
    head: "Ербол Сейткалиев",
    role: "Заведующий кафедрой",
    members: 9,
    note: "Гражданское и трудовое право РК, процессуальные дисциплины, юридическая клиника.",
    accent: "indigo" as const,
  },
  {
    name: "Оценка",
    head: "Самал Жаксыбекова",
    role: "Заведующая кафедрой",
    members: 7,
    note: "Оценка недвижимости, бизнеса, движимого имущества. Связь с Палатой оценщиков РК.",
    accent: "warm" as const,
  },
  {
    name: "Общеобразовательные дисциплины",
    head: "Айдар Кенжебеков",
    role: "Руководитель",
    members: 22,
    note: "Математика, информатика, языки, физика, история — обязательная часть программы СПО.",
    accent: "indigo" as const,
  },
  {
    name: "WorldSkills и подготовка",
    head: "Алия Турганбаева",
    role: "Координатор центра",
    members: 6,
    note: "Тренеры по компетенциям IT Software Solutions, IT Software Testing, Accounting и Web Technologies.",
    accent: "warm" as const,
  },
];

export default function StaffPage() {
  return (
    <PageShell
      pathname="/about/staff"
      eyebrow="О колледже"
      title="Коллектив колледжа."
      subtitle="Преподаватели из индустрии, наставники со стороны партнёров и методисты — те, кто строит дуальную программу."
      back={{ label: "Назад в «О колледже»", href: "/about" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Руководство"
        title={
          <>
            Те, кто отвечает <br />
            <span className="text-[var(--muted)]">за курс колледжа</span>.
          </>
        }
        intro="Открытый контур принятия решений: директор и два заместителя. С каждым можно записаться на встречу через приёмную."
        ambient="indigo"
      >
        <StaffGrid items={leadership} variant="leadership" />
      </ContentSection>

      <ContentSection
        eyebrow="Кафедры"
        title={
          <>
            Шесть кафедр — <br />
            <span className="text-[var(--muted)]">шесть точек ответственности</span>.
          </>
        }
        intro="За каждой образовательной программой стоит конкретная кафедра. Часть преподавателей работает full-time, часть приезжает из компаний-партнёров."
        ambient="warm"
      >
        <StaffGrid items={departments} variant="department" />
      </ContentSection>

      <ContentSection
        eyebrow="Преподаватели"
        title={
          <>
            Команда колледжа — <br />
            <span className="text-[var(--muted)]">в лицах</span>.
          </>
        }
        intro="Преподаватели-практики, методисты и наставники — те, кто проводит учебный процесс ежедневно."
        ambient="indigo"
      >
        <TeacherGrid items={teachers} />
      </ContentSection>

      <BigCTA
        eyebrow="Хотите присоединиться?"
        title={
          <>
            Открыты вакансии <br />
            для преподавателей-практиков.
          </>
        }
        body="Колледж приглашает разработчиков, бухгалтеров, юристов и оценщиков, готовых вести 4–8 часов в неделю как преподаватель-практик. Возможен дистанционный формат для модульных курсов."
        primary={{ label: "Связаться", href: "/contact" }}
        secondary={{ label: "Посмотреть программы", href: "/learning/programs" }}
      />
    </PageShell>
  );
}
