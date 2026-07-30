import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { NewsFeed, type NewsItem } from "@/components/news/news-feed";
import { SubscribeCTA } from "@/components/news/subscribe-cta";

export const metadata: Metadata = {
  title: "Новости — ЕКЕБ",
  description:
    "Анонсы, отчёты с мероприятий, победы студентов, новости от партнёров и приёмной комиссии колледжа ЕКЕБ.",
};

const news: NewsItem[] = [
  {
    id: "ws-2026-aktobe",
    date: "2026-04-22",
    tag: "WorldSkills",
    title:
      "Студенты ЕКЕБ взяли два золота на областном WorldSkills Aktobe 2026",
    excerpt:
      "Компетенции IT Software Solutions и Accounting — первое место. Команда едет на национальный этап в Астану в мае.",
    accent: "warm",
  },
  {
    id: "open-doors-april",
    date: "2026-04-12",
    tag: "День открытых дверей",
    title: "День открытых дверей 27 апреля — программы, лаборатории, FAQ",
    excerpt:
      "Покажем кафедры, познакомим с преподавателями и партнёрами. Регистрация открыта на сайте.",
    accent: "indigo",
  },
  {
    id: "memo-aktsu",
    date: "2026-03-30",
    tag: "Партнёры",
    title: "Меморандум с АРГУ им. Жубанова: упрощённый переход на бакалавриат",
    excerpt:
      "Выпускники программ «ПО» и «Учёт и аудит» получат сокращённую форму обучения и часть зачётов автоматом.",
    accent: "indigo",
  },
  {
    id: "lab-ml",
    date: "2026-03-18",
    tag: "Лаборатории",
    title: "Открыли лабораторию машинного обучения с GPU-станциями",
    excerpt:
      "Шесть рабочих мест с RTX, корпоративные датасеты от Tabys и Kolesa Group, курс по PyTorch с куратором из индустрии.",
    accent: "warm",
  },
  {
    id: "alumni-kaspi",
    date: "2026-03-04",
    tag: "Выпускники",
    title:
      "Выпускник 2024 года Алибек Сейтжанов — Junior Engineer в Kaspi.kz",
    excerpt:
      "От практики на втором курсе до оффера через полгода после диплома. Алибек делится дорожной картой и ошибками.",
    accent: "indigo",
  },
  {
    id: "admissions-quota",
    date: "2026-02-21",
    tag: "Приёмная",
    title: "Утверждены квоты на государственный грант — 2026/27",
    excerpt:
      "По «Программному обеспечению» — 25 мест, «Учёт и аудит» — 18, «Правоведение» — 12, «Оценка» — 8.",
    accent: "warm",
  },
  {
    id: "halyk-internship",
    date: "2026-02-08",
    tag: "Партнёры",
    title: "Halyk Bank открыл 18 мест на дуальную практику в семестре",
    excerpt:
      "Розничный блок и бэк-офис. Студенты второго и третьего курсов программы «Учёт и аудит» — приоритетная категория.",
    accent: "indigo",
  },
  {
    id: "ws-prep-camp",
    date: "2026-01-26",
    tag: "WorldSkills",
    title: "Стартует зимний кэмп подготовки к WorldSkills",
    excerpt:
      "Шесть недель интенсива по компетенциям IT Software Solutions, IT Software Testing и Web Technologies.",
    accent: "warm",
  },
  {
    id: "alumni-startup",
    date: "2025-12-19",
    tag: "Выпускники",
    title: "Студенческий стартап Tabys Lite привлёк pre-seed на 4 млн ₸",
    excerpt:
      "Выпускницы программы «ПО» Дария и Алия запустили MVP финтех-приложения для самозанятых. Колледж был первым клиентом.",
    accent: "indigo",
  },
  {
    id: "open-doors-dec",
    date: "2025-12-05",
    tag: "День открытых дверей",
    title: "Декабрьский день открытых дверей собрал 220 родителей и абитуриентов",
    excerpt:
      "Рекордная посещаемость за два года. Очередь на запись на пробный модуль закрыли за час.",
    accent: "warm",
  },
  {
    id: "lab-1c",
    date: "2025-11-14",
    tag: "Лаборатории",
    title: "Обновили лабораторию 1С: Бухгалтерия 8.3 и онлайн-кассы",
    excerpt:
      "Все 24 рабочих места перешли на учебную лицензию 1С с интеграцией ОФД. Поддержка от партнёра — Касса Гранд Аудит.",
    accent: "indigo",
  },
  {
    id: "memo-poland",
    date: "2025-10-30",
    tag: "Партнёры",
    title: "Меморандум с польским колледжем Wrocław College",
    excerpt:
      "Студенческий обмен на семестр и совместный модуль по европейскому корпоративному учёту. Первая группа — осень 2026.",
    accent: "warm",
  },
];

const stats = [
  { value: "120+", label: "публикаций в год", hint: "новости и репортажи" },
  { value: "12", label: "тем", hint: "от приёмной до выпускников", warm: true },
  { value: "8 600", label: "подписчиков", hint: "соцсети и рассылка" },
  { value: "3 дня", label: "медиана отклика", hint: "комментарии редакции", warm: true },
];

export default function NewsPage() {
  return (
    <PageShell
      pathname="/news"
      eyebrow="Новости"
      title="Новости колледжа."
      subtitle="Анонсы, отчёты с мероприятий, победы студентов, новости от партнёров и приёмной комиссии. Фильтр по тегам — справа."
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Лента"
        title={
          <>
            Что нового — <br />
            <span className="text-[var(--muted)]">за последние месяцы</span>.
          </>
        }
        intro="Всё свежее сверху. Если интересна одна тема — переключите фильтр; колонка отсортирована по дате публикации."
        ambient="indigo"
      >
        <NewsFeed items={news} />
      </ContentSection>

      <SubscribeCTA />
    </PageShell>
  );
}
