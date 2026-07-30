import type { Metadata } from "next";
import { CalendarDays, Layers, Users, Smartphone } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { BigCTA } from "@/components/page-content/big-cta";
import { StatGrid } from "@/components/page-content/stat-strip";
import { BellsTable, Legend } from "@/components/students/schedule-table";

export const metadata: Metadata = {
  title: "Расписание занятий и звонков — ЕКЕБ",
};

// 1-я смена: пн и пт — 3 пары (до 12:25), вт-ср-чт — 4 пары (до 13:55)
// 2-я смена: пары 5–7, начало 14:00
const bells = [
  { code: "01", label: "Первая пара", time: "08:00 – 09:20", kind: "lesson" as const },
  { code: "—", label: "Перерыв", time: "09:20 – 09:30", kind: "break" as const, hint: "10 минут" },
  { code: "02", label: "Вторая пара", time: "09:30 – 10:50", kind: "lesson" as const },
  { code: "—", label: "Перерыв", time: "10:50 – 11:05", kind: "break" as const, hint: "15 минут" },
  { code: "03", label: "Третья пара", time: "11:05 – 12:25", kind: "lesson" as const, hint: "Пн/Пт — конец учебного дня (1 смена)" },
  { code: "—", label: "Перерыв", time: "12:25 – 12:35", kind: "break" as const, hint: "10 минут" },
  { code: "04", label: "Четвёртая пара", time: "12:35 – 13:55", kind: "lesson" as const, hint: "Вт/Ср/Чт — конец учебного дня (1 смена)" },
  { code: "—", label: "Перерыв", time: "13:55 – 14:00", kind: "break" as const, hint: "5 минут" },
  { code: "05", label: "Пятая пара", time: "14:00 – 15:20", kind: "lesson" as const, hint: "Начало 2-й смены" },
  { code: "—", label: "Перерыв", time: "15:20 – 15:25", kind: "break" as const, hint: "5 минут" },
  { code: "06", label: "Шестая пара", time: "15:25 – 16:45", kind: "lesson" as const },
  { code: "—", label: "Перерыв", time: "16:45 – 17:00", kind: "break" as const, hint: "15 минут" },
  { code: "07", label: "Седьмая пара", time: "17:00 – 18:20", kind: "lesson" as const, hint: "2-я смена — конец учебного дня" },
];

const courses = [
  {
    code: "ПН",
    title: "Понедельник",
    body: "3 пары, окончание в 12:25. Пары 1–3 для первой смены. Пары 5–7 для второй смены.",
    tags: ["08:00 – 12:25", "14:00 – 18:20"],
  },
  {
    code: "ВТ–ЧТ",
    title: "Вторник – Четверг",
    body: "4 пары, окончание в 13:55. Максимальная учебная нагрузка недели.",
    tags: ["08:00 – 13:55", "14:00 – 18:20"],
  },
  {
    code: "ПТ",
    title: "Пятница",
    body: "3 пары, окончание в 12:25. Короткий день, как понедельник.",
    tags: ["08:00 – 12:25", "14:00 – 18:20"],
  },
  {
    code: "2 СМ",
    title: "Вторая смена",
    body: "Группы 2-й смены занимаются с 14:00. Расписание звонков то же — пары 5, 6, 7.",
    tags: ["14:00 – 18:20"],
  },
];

const features = [
  {
    code: "AIS",
    title: "Расписание в AIS SmartNation",
    body: "Личное расписание по группе и подгруппе, замены и переносы — приходят пушем в мобильное приложение колледжа.",
    href: "/students/smartnation",
    tags: ["push", "iOS/Android"],
  },
  {
    code: "ICS",
    title: "Экспорт в календарь",
    body: "Подписка на .ics-ленту: расписание автоматически появляется в Google Calendar и Apple Calendar, обновляется при заменах.",
    tags: [".ics", "google", "apple"],
  },
  {
    code: "GRP",
    title: "Кураторы и старосты",
    body: "Староста группы получает уведомление о замене за сутки. Куратор подтверждает изменения и отвечает на вопросы в чате группы.",
    tags: ["староста", "куратор"],
  },
];

const stats = [
  { value: "5", label: "рабочих дней", hint: "понедельник – пятница" },
  { value: "3–4", label: "пары в день", hint: "по 80 минут", warm: true },
  { value: "2", label: "смены", hint: "1-я: 08:00 — 2-я: 14:00" },
  { value: "18:20", label: "окончание", hint: "максимум для 2-й смены", warm: true },
];

export default function SchedulePage() {
  return (
    <PageShell
      pathname="/students/schedule"
      eyebrow="Студенту"
      title="Расписание занятий и звонков."
      subtitle="Актуальное расписание по группам, расписание звонков, замены и переносы — в одном месте."
      back={{ label: "Назад в «Студенту»", href: "/students" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Расписание звонков"
        title={
          <>
            Один ритм <br />
            <span className="text-[var(--muted)]">для всего колледжа</span>.
          </>
        }
        intro="Звонки одинаковые для всех корпусов и курсов. На индивидуальных консультациях время согласуется отдельно с преподавателем."
        ambient="indigo"
      >
        <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">
          <BellsTable rows={bells} />
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 lg:p-6 space-y-4">
            <h4 className="text-[14px] font-medium tracking-tight">Легенда</h4>
            <Legend
              items={[
                { color: "indigo", label: "Учебная пара" },
                { color: "muted", label: "Перерыв" },
                { color: "warm", label: "Электив / WorldSkills" },
              ]}
            />
            <div className="hairline" />
            <div className="text-[12.5px] text-[var(--muted)] leading-relaxed">
              Учебная пара — 90 минут (два академических часа по 45 минут с короткой паузой внутри).
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="По курсам"
        title="Нагрузка растёт от первого курса к четвёртому."
        intro="К третьему курсу часть недели студент проводит на предприятии — и расписание в AIS отражает реальное место учёбы."
      >
        <FeatureGrid items={courses} cols={4} />
      </ContentSection>

      <ContentSection
        eyebrow="Инструменты"
        title="Расписание всегда под рукой."
        ambient="warm"
      >
        <FeatureGrid items={features} cols={3} />
      </ContentSection>

      <BigCTA
        eyebrow="Личное расписание"
        title={
          <>
            Войдите в AIS — <br />
            расписание именно для вашей группы.
          </>
        }
        body="В AIS «College SmartNation» вы видите личное расписание, замены, домашние задания и оценки. Один логин — всё расписание учебной жизни."
        primary={{ label: "Войти в SmartNation", href: "/students/smartnation" }}
        secondary={{ label: "Учебный календарь", href: "/students/calendar" }}
      />
    </PageShell>
  );
}
