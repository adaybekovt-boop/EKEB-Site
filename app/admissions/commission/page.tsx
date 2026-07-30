import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { Timeline } from "@/components/page-content/timeline";
import { FAQ } from "@/components/page-content/faq";
import { DocGrid } from "@/components/page-content/doc-card";
import { BigCTA } from "@/components/page-content/big-cta";
import { CommissionMembers } from "@/components/admissions/commission-members";
import { ContactBlock } from "@/components/admissions/contact-block";

export const metadata: Metadata = {
  title: "Приёмная комиссия — ЕКЕБ",
  description:
    "Контакты приёмной комиссии ЕКЕБ: телефон, адрес, часы работы, состав комиссии и расписание дней открытых дверей.",
};

const stats = [
  { value: "01.06 — 15.08", label: "приём документов", hint: "ежегодно" },
  { value: "5", label: "членов комиссии", hint: "председатель и секретарь", warm: true },
  { value: "Пн — Сб", label: "часы работы", hint: "09:00 — 18:00" },
  { value: "до 3", label: "специальности", hint: "в одной заявке", warm: true },
];

const members = [
  {
    name: "Айгуль Сериковна Аубакирова",
    role: "Председатель комиссии",
    unit: "Заместитель директора по учебной работе",
    phone: "8 7132 56-12-01",
    email: "commission@ekeb.kz",
    hours: "Пн — Пт, 09:00 — 17:00",
    accent: "indigo" as const,
  },
  {
    name: "Жанна Маратовна Турсынова",
    role: "Ответственный секретарь",
    unit: "Координатор приёма",
    phone: "8 7132 56-12-02",
    email: "secretary@ekeb.kz",
    hours: "Пн — Сб, 09:00 — 18:00",
    accent: "indigo" as const,
  },
  {
    name: "Ержан Болатович Калиев",
    role: "Методист",
    unit: "Профориентация и учебные планы",
    phone: "8 7132 56-12-03",
    email: "method@ekeb.kz",
    hours: "Пн — Пт, 10:00 — 17:00",
    accent: "warm" as const,
  },
  {
    name: "Динара Кайратовна Нурмагамбетова",
    role: "Юрист комиссии",
    unit: "Договоры, согласия родителей, апелляции",
    phone: "8 7132 56-12-04",
    email: "legal@ekeb.kz",
    hours: "Пн — Пт, 09:00 — 16:00",
    accent: "indigo" as const,
  },
  {
    name: "Асем Кенесовна Жумабаева",
    role: "Психолог",
    unit: "Сопровождение абитуриентов и семей",
    phone: "8 7132 56-12-05",
    email: "psy@ekeb.kz",
    hours: "Вт, Чт, Сб, 11:00 — 18:00",
    accent: "warm" as const,
  },
];

const openDays = [
  {
    year: "15.03",
    title: "Весенний день открытых дверей",
    body: "Презентация всех 5 специальностей, экскурсия по лабораториям ПО и тестирования, открытое занятие по 1С. Сбор — 11:00 у главного входа.",
  },
  {
    year: "26.04",
    title: "День IT-специальностей",
    body: "Воркшоп по фронтенду и автотестированию, демо студенческих проектов, встреча с тимлидами IT-партнёров Актобе.",
    accent: "warm" as const,
  },
  {
    year: "17.05",
    title: "День финансовых и юридических программ",
    body: "Открытая лекция по налоговому кодексу РК, юридическая клиника, демонстрация работы оценщика на реальных объектах.",
  },
  {
    year: "07.06",
    title: "Старт приёма документов — день консультаций",
    body: "Сотрудники приёмной комиссии у стойки, расчёт шансов на грант, проверка готовности документов на месте.",
    accent: "warm" as const,
  },
  {
    year: "12.07",
    title: "Финальный день открытых дверей",
    body: "Последняя возможность задать вопросы перед закрытием приёма. Демо общежития, презентация студенческих клубов.",
  },
];

const docs = [
  {
    title: "Положение о приёмной комиссии ЕКЕБ",
    format: "PDF",
    size: "184 КБ",
    kind: "Регламент",
    updated: "01.2026",
    href: "#",
  },
  {
    title: "Правила приёма на 2026 — 2027 учебный год",
    format: "PDF",
    size: "312 КБ",
    kind: "Документ",
    updated: "02.2026",
    href: "#",
  },
  {
    title: "Образец заявления на поступление",
    format: "DOCX",
    size: "42 КБ",
    kind: "Бланк",
    updated: "01.2026",
    href: "#",
  },
  {
    title: "Согласие родителей (для абитуриентов до 18 лет)",
    format: "DOCX",
    size: "28 КБ",
    kind: "Бланк",
    updated: "01.2026",
    href: "#",
  },
];

const faq = [
  {
    q: "Можно ли подать документы без визита в колледж?",
    a: "Да. На странице «Подать документы онлайн» вы заполняете заявление и прикладываете сканы. Личный визит понадобится только на этап вступительных экзаменов и подписания договора.",
  },
  {
    q: "Кому нужно согласие родителей?",
    a: "Абитуриентам младше 18 лет на момент подачи. Бланк выложен в разделе «Документы» выше — нужны подписи обоих родителей либо опекуна.",
  },
  {
    q: "Что делать, если я не могу прийти на день открытых дверей?",
    a: "Запишитесь на индивидуальный визит по телефону приёмной комиссии. Также по будням до 18:00 секретарь проводит небольшие экскурсии без предварительной записи.",
  },
  {
    q: "Где найти результаты экзаменов?",
    a: "Списки публикуются на странице «Результаты конкурса» в течение 3 рабочих дней после экзамена. Каждому абитуриенту отдельно приходит SMS и e-mail.",
  },
  {
    q: "Как подать апелляцию?",
    a: "В течение 24 часов после публикации результата напишите на legal@ekeb.kz или заполните форму у юриста комиссии. Апелляционная комиссия рассматривает заявку за 3 рабочих дня.",
  },
];

export default function CommissionPage() {
  return (
    <PageShell
      pathname="/admissions/commission"
      eyebrow="Абитуриенту"
      title="Приёмная комиссия."
      subtitle="Состав комиссии, часы работы, контакты, перечень документов и сроки приёма заявлений."
      back={{ label: "Назад в «Абитуриенту»", href: "/admissions" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Контакты"
        title={
          <>
            Один номер, один <br />
            <span className="text-[var(--muted)]">адрес — всегда дозвонитесь</span>.
          </>
        }
        intro="Звоните по основному номеру приёмной комиссии. Если линия занята — секретарь перезвонит в течение 30 минут в рабочие часы."
        ambient="indigo"
      >
        <ContactBlock
          phone="8 7132 56-12-00"
          email="commission@ekeb.kz"
          address="г. Актобе, проспект Абилкайыр хана 60А, корпус А, кабинет 112"
          hours={[
            { day: "Пн — Пт", time: "09:00 — 18:00" },
            { day: "Сб", time: "10:00 — 16:00" },
            { day: "Вс", time: "выходной" },
            { day: "Обед", time: "13:00 — 14:00" },
          ]}
        />
      </ContentSection>

      <ContentSection
        eyebrow="Состав"
        title={
          <>
            Пять человек, <br />
            <span className="text-[var(--muted)]">которые принимают решения</span>.
          </>
        }
        intro="К каждому члену комиссии можно прийти напрямую: председатель отвечает за общие вопросы приёма, юрист — за договоры, психолог — за сопровождение семьи."
      >
        <CommissionMembers items={members} />
      </ContentSection>

      <ContentSection
        eyebrow="Дни открытых дверей"
        title={
          <>
            Пять дат, <br />
            <span className="text-[var(--muted)]">когда колледж открыт для всех</span>.
          </>
        }
        intro="Регистрация не нужна — приходите. На каждом дне открытых дверей работают все 5 членов комиссии и преподаватели специальностей."
        ambient="split"
      >
        <Timeline items={openDays} />
      </ContentSection>

      <ContentSection
        eyebrow="Документы"
        title="Бланки и регламенты."
        intro="Скачайте заранее, заполните дома — на приёме комиссии останется только проверить и подписать."
      >
        <DocGrid items={docs} />
      </ContentSection>

      <ContentSection
        eyebrow="Вопросы и ответы"
        title="Часто спрашивают."
        intro="Если не нашли ответ — пишите в Telegram приёмной комиссии или звоните, секретарь ответит в течение дня."
      >
        <FAQ items={faq} />
      </ContentSection>

      <BigCTA
        eyebrow="Готовы поступать?"
        title={
          <>
            Подайте документы онлайн <br />
            и сдайте экзамены ближе к дому.
          </>
        }
        body="Электронная заявка занимает 10 минут. После проверки секретарь свяжется с вами и согласует дату экзамена."
        primary={{ label: "Подать документы онлайн", href: "/admissions/apply" }}
        secondary={{ label: "Специальности", href: "/admissions/programs" }}
      />
    </PageShell>
  );
}
