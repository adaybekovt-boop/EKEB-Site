import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { Timeline } from "@/components/page-content/timeline";
import { BigCTA } from "@/components/page-content/big-cta";
import { AlumniAmbassadorForm } from "@/components/students/alumni-ambassador-form";
import {
  AlumniStoryCard,
  type AlumniStory,
} from "@/components/students/alumni-story-card";

export const metadata: Metadata = {
  title: "Выпускникам — ЕКЕБ",
  description:
    "Сообщество выпускников ЕКЕБ: статистика, истории, программы менторства и амбассадоров.",
};

const stats = [
  { value: "6", label: "выпусков", hint: "с 2020 года" },
  { value: "1 480", label: "выпускников", hint: "всего за время работы", warm: true },
  { value: "94%", label: "трудоустройство", hint: "выпуск 2024" },
  { value: "73", label: "амбассадора", hint: "в активной сети", warm: true },
];

const releases = [
  {
    year: "2020",
    title: "Первый выпуск — 87 человек",
    body: "Программы «Учёт и аудит» и «Программное обеспечение». 78% получили оффер в течение трёх месяцев после защиты. Среди работодателей — местные банки, аудиторские компании, фриланс-разработка.",
  },
  {
    year: "2021",
    title: "142 выпускника, +«Правоведение»",
    body: "Открыта программа правоведения, первый выпуск юридических ассистентов. Запущена ментор-программа: 12 выпускников вернулись, чтобы провести лекции и взять студентов на стажировку.",
    accent: "warm" as const,
  },
  {
    year: "2022",
    title: "218 выпускников",
    body: "Год экспансии. Партнёрства с Kolesa Group, Beeline, Halyk Finservice. Шесть выпускников ушли в собственные проекты — два дошли до серии A. 89% трудоустройства.",
  },
  {
    year: "2023",
    title: "267 выпускников, +«Оценка»",
    body: "Первый выпуск программы «Оценка». Расширение на Алматы и Астану — 34 выпускника переехали в столицы. Запущен ежегодный alumni-day.",
    accent: "warm" as const,
  },
  {
    year: "2024",
    title: "311 выпускников, 94% офферов",
    body: "Рекордный набор офферов до защиты диплома. 41 выпускник продолжил обучение в вузах Казахстана, Польши, Латвии и Малайзии по программе двойного диплома.",
  },
];

const stories: AlumniStory[] = [
  {
    initials: "АС",
    name: "Айгерим С.",
    year: "выпуск 2022",
    role: "QA Engineer, Kolesa Group · Алматы",
    quote:
      "В колледже я попала в команду WorldSkills по тестированию ПО. Это и стало моим пропуском в индустрию — без вуза, сразу на проект. Сейчас веду команду из четырёх джуниоров, двое из которых тоже из ЕКЕБ.",
    accent: "indigo",
  },
  {
    initials: "ДМ",
    name: "Даурен М.",
    year: "выпуск 2021",
    role: "Junior Auditor, KPMG · Атырау",
    quote:
      "Дуальная практика на третьем курсе превратилась в оффер. В колледже мне нравилось, что преподаватели не делали вид, что всё знают — они звали практиков, и это сильно отличалось от школы.",
    accent: "warm",
  },
  {
    initials: "НТ",
    name: "Нурислам Т.",
    year: "выпуск 2023",
    role: "Founder, Aqtobe Bites · Актобе",
    quote:
      "Бизнес-инкубатор колледжа дал первые деньги на тестирование идеи. За два года выросли с одной точки до пяти, в команде сейчас восемь человек. С колледжем продолжаем работать — берём студентов на летние стажировки.",
    accent: "indigo",
  },
  {
    initials: "АК",
    name: "Алина К.",
    year: "выпуск 2022",
    role: "Юрист, Magnum Cash & Carry · Астана",
    quote:
      "Юридическая клиника при колледже — место, где я научилась работать с реальными договорами и людьми. После выпуска поступила в КазНУ на сокращённую программу, параллельно работала помощником юриста.",
    accent: "warm",
  },
];

export default function AlumniPage() {
  return (
    <PageShell
      pathname="/students/alumni"
      eyebrow="Студенту"
      title="Выпускникам."
      subtitle="Сообщество выпускников ЕКЕБ: статистика, истории, ментор-программа и сервисы для тех, кто уже окончил колледж."
      back={{ label: "Назад в «Студенту»", href: "/students" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Хронология выпусков"
        title={
          <>
            Шесть лет, <br />
            <span className="text-[var(--muted)]">шесть выпусков</span>.
          </>
        }
        intro="Каждый год — больше специальностей, больше партнёров, больше выпускников, которые возвращаются преподавать и брать стажёров."
        ambient="split"
      >
        <Timeline items={releases} />
      </ContentSection>

      <ContentSection
        eyebrow="Истории"
        title="Где сейчас наши выпускники."
        intro="Четыре истории из разных программ. Не парадные — рабочие, с конкретными ролями и компаниями."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {stories.map((s, i) => (
            <AlumniStoryCard key={s.name} story={s} index={i} />
          ))}
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Стать амбассадором"
        title={
          <>
            Возвращайтесь — <br />
            <span className="gradient-warm">студентам это важно</span>.
          </>
        }
        intro="Ментор-программа: лекция в семестр, стажировка в вашей компании, разбор кейсов, помощь с резюме. Без обязательств — формат выбираете сами."
      >
        <AlumniAmbassadorForm />
      </ContentSection>

      <BigCTA
        eyebrow="Если нужны документы"
        title={
          <>
            Дубликат диплома или <br />
            транскрипт — через центр.
          </>
        }
        body="Запрос можно подать онлайн в SmartNation или прийти в кабинет 104. Для выпускников до 2021 года — отдельная процедура, координатор подскажет."
        primary={{ label: "Центр обслуживания", href: "/students/service-center" }}
        secondary={{ label: "Написать координатору", href: "mailto:alumni@ekeb.kz" }}
        variant="warm"
      />
    </PageShell>
  );
}
