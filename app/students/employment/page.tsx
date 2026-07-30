import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { BigCTA } from "@/components/page-content/big-cta";
import { EmploymentCharts } from "@/components/students/employment-charts";
import {
  AlumniStoryCard,
  type AlumniStory,
} from "@/components/students/alumni-story-card";
import {
  Building2,
  MapPin,
  Briefcase,
  Banknote,
  Clock,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Трудоустройство — ЕКЕБ",
  description:
    "Трудоустройство выпускников ЕКЕБ: статистика, партнёры-работодатели, открытые вакансии и истории.",
};

const stats = [
  { value: "94%", label: "трудоустройство", hint: "выпуск 2024" },
  { value: "150+", label: "партнёров", hint: "договоры о практике", warm: true },
  { value: "47 дн.", label: "до первого оффера", hint: "медиана по выпуску 2024" },
  { value: "320 K ₸", label: "средний оффер", hint: "junior-специалист", warm: true },
];

const partners = [
  { name: "Kolesa Group", note: "QA, разработка" },
  { name: "Kaspi.kz", note: "frontend, поддержка" },
  { name: "Halyk Bank", note: "банковское ПО" },
  { name: "Beeline Kazakhstan", note: "IT, тестирование" },
  { name: "KPMG", note: "аудит, консалтинг" },
  { name: "Magnum Cash & Carry", note: "юристы, учёт" },
  { name: "Air Astana", note: "ИТ-поддержка" },
  { name: "АО «КазТрансОйл»", note: "оценка, учёт" },
  { name: "АктобеНефтеМаш", note: "правоведение, учёт" },
  { name: "Бухгалтерская компания BES", note: "1С, отчётность" },
];

const stories: AlumniStory[] = [
  {
    initials: "ТЖ",
    name: "Темирлан Ж.",
    year: "выпуск 2024",
    role: "Frontend Developer, Kaspi.kz · Алматы",
    quote:
      "Оффер пришёл за две недели до защиты диплома. На собеседовании спрашивали по тому же стеку, что и на дуальной практике, — React, TypeScript, тесты. Это сильно упростило подготовку.",
    accent: "indigo",
  },
  {
    initials: "ИЖ",
    name: "Инкар Ж.",
    year: "выпуск 2023",
    role: "Junior Auditor, KPMG · Атырау",
    quote:
      "На третьем курсе я попала на стажировку в KPMG через карьерный центр колледжа. Через шесть месяцев предложили оффер. Главное — не бояться откликаться на вакансии «от 1 года опыта»: практика тоже считается.",
    accent: "warm",
  },
  {
    initials: "АН",
    name: "Алмат Н.",
    year: "выпуск 2024",
    role: "QA Engineer, Beeline · Актобе",
    quote:
      "Колледж готовит к WorldSkills по тестированию ПО, и это автоматически даёт хорошее резюме — рекрутеры в Казахстане знают эти медали. Меня позвали на собеседование без скрининга.",
    accent: "indigo",
  },
];

const vacancies = [
  {
    company: "Kolesa Group",
    location: "Алматы · удалённо",
    role: "Junior QA Engineer",
    salary: "от 350 000 ₸",
    requirements: [
      "Опыт ручного тестирования (учебные проекты считаются)",
      "Postman, базовые SQL-запросы",
      "Английский — техническая документация",
    ],
    type: "full-time",
  },
  {
    company: "Halyk Bank",
    location: "Актобе",
    role: "Специалист по обработке заявок",
    salary: "от 220 000 ₸",
    requirements: [
      "Знание 1С: Бухгалтерия",
      "Внимательность, грамотность речи",
      "Готовность к графику 5/2",
    ],
    type: "full-time",
  },
  {
    company: "АктобеНефтеМаш",
    location: "Актобе",
    role: "Помощник юриста",
    salary: "от 180 000 ₸",
    requirements: [
      "Студент 3–4 курса правоведения или выпускник",
      "Знание ГК РК и трудового законодательства",
      "Опыт работы с договорами поставки",
    ],
    type: "full-time",
  },
  {
    company: "Бухгалтерская компания BES",
    location: "Актобе",
    role: "Стажёр-бухгалтер",
    salary: "150 000 ₸ + KPI",
    requirements: [
      "Знание МСФО на базовом уровне",
      "Excel: ВПР, сводные таблицы",
      "1С: Бухгалтерия",
    ],
    type: "intern → offer",
  },
  {
    company: "Aqtobe Bites",
    location: "Актобе",
    role: "Frontend Intern",
    salary: "120 000 ₸",
    requirements: [
      "HTML, CSS, JavaScript — уверенно",
      "React или Vue — учебный проект в портфолио",
      "Git, базовое понимание API",
    ],
    type: "intern → offer",
  },
];

export default function EmploymentPage() {
  return (
    <PageShell
      pathname="/students/employment"
      eyebrow="Студенту"
      title="Трудоустройство."
      subtitle="Воронка от стажировки до оффера. Партнёры-работодатели, открытые вакансии, статистика и истории — без приукрашивания."
      back={{ label: "Назад в «Студенту»", href: "/students" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Динамика"
        title={
          <>
            Шесть лет роста — <br />
            <span className="text-[var(--muted)]">по двум осям</span>.
          </>
        }
        intro="Доля трудоустроенных и средний оффер растут параллельно: рынок труда Казахстана повышает требования, и колледж под них перестраивает программы."
        ambient="split"
      >
        <EmploymentCharts />
      </ContentSection>

      <ContentSection
        eyebrow="Топ-10 работодателей"
        title="Где работают наши выпускники."
        intro="Компании с подписанным договором о дуальной практике или регулярно закрывающие вакансии нашими выпускниками."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {partners.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-5 transition-all duration-500"
            >
              <div className="h-9 w-9 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[var(--accent)] mb-3">
                <Building2 className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <div className="text-[14px] font-medium tracking-tight mb-1">
                {p.name}
              </div>
              <div className="text-[12px] text-[var(--muted)]">{p.note}</div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Открытые вакансии"
        title="Что сейчас ищут партнёры."
        intro="Подборка обновляется еженедельно. Откликнуться можно через карьерный центр или напрямую — контакты у HR-координатора."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          {vacancies.map((v) => (
            <article
              key={v.company + v.role}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-6 md:p-7 transition-all duration-500"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="text-[12px] text-[var(--accent)] tracking-tight mb-1">
                    {v.company}
                  </div>
                  <h3 className="text-[16px] md:text-lg font-medium tracking-tight leading-snug">
                    {v.role}
                  </h3>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] -translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 shrink-0"
                  strokeWidth={1.5}
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 text-[12.5px] text-[var(--muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {v.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Banknote className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {v.salary}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {v.type}
                </span>
              </div>

              <div className="space-y-1.5">
                {v.requirements.map((r) => (
                  <div
                    key={r}
                    className="flex items-start gap-2.5 text-[13px] text-foreground/80"
                  >
                    <span className="mt-2 h-1 w-1 rounded-full bg-[var(--muted)] shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-5 pt-5 border-t border-white/[0.04] text-[12px] text-[var(--muted)]">
                <Briefcase className="w-3.5 h-3.5 text-[var(--accent-warm)]" strokeWidth={1.5} />
                Открыто, отклики через career@ekeb.kz
              </div>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Реальные истории"
        title="От практики к офферу."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {stories.map((s, i) => (
            <AlumniStoryCard key={s.name} story={s} index={i} />
          ))}
        </div>
      </ContentSection>

      <BigCTA
        eyebrow="Карьерный центр"
        title={
          <>
            Запишитесь на личную <br />
            <span className="gradient-text">карьерную консультацию</span>.
          </>
        }
        body="Часовая встреча с HR-координатором: разбор резюме, симуляция собеседования, подбор подходящих вакансий из базы партнёров. Бесплатно для студентов и выпускников."
        primary={{ label: "Записаться", href: "mailto:career@ekeb.kz" }}
        secondary={{ label: "WorldSkills", href: "/students/worldskills" }}
      />
    </PageShell>
  );
}
