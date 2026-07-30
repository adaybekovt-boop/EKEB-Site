import type { Metadata } from "next";
import {
  GraduationCap,
  FileText,
  Banknote,
  Briefcase,
  Globe,
  BookMarked,
  Building2,
  Trophy,
  Database,
  ShieldCheck,
  Wallet,
  Users,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { BigCTA } from "@/components/page-content/big-cta";
import { StatGrid } from "@/components/page-content/stat-strip";

export const metadata: Metadata = {
  title: "Полезные ссылки — ЕКЕБ",
};

const stats = [
  { value: "24", label: "проверенные ресурса", hint: "по четырём категориям" },
  { value: "4", label: "категории", hint: "учёба, документы, финансы, карьера", warm: true },
  { value: "100%", label: "проверено", hint: "ссылки актуальны на 2025" },
  { value: "рус. и каз.", label: "языки", hint: "часть — на английском", warm: true },
];

const education = [
  {
    code: "ED",
    title: "eduportal.kz",
    body: "Образовательный портал МОН РК: реестр учебных заведений, лицензии, аккредитации, типовые программы.",
    href: "https://eduportal.kz",
    tags: ["МОН РК"],
  },
  {
    code: "BF",
    title: "Bilim Foundation",
    body: "Стипендии и образовательные гранты от частного фонда: для одарённых студентов, в том числе из регионов.",
    href: "https://bilim-foundation.org",
    tags: ["стипендии"],
  },
  {
    code: "EN",
    title: "ЕНТ — testcenter.kz",
    body: "Национальный центр тестирования: регистрация на ЕНТ, КТА, пробное тестирование, результаты.",
    href: "https://testcenter.kz",
    tags: ["ЕНТ", "КТА"],
  },
  {
    code: "CR",
    title: "Coursera",
    body: "Бесплатный финансовый аид для студентов колледжа: курсы Stanford, Google, IBM. Сертификаты идут в портфолио.",
    href: "https://coursera.org",
    tags: ["онлайн-курсы"],
  },
  {
    code: "ST",
    title: "Stepik",
    body: "Русскоязычная платформа: курсы по программированию, математике, бухучёту. Многие — от ведущих вузов СНГ.",
    href: "https://stepik.org",
    tags: ["RU"],
  },
  {
    code: "EL",
    title: "eLibrary.ru",
    body: "Научная электронная библиотека: статьи, диссертации, монографии. Доступ через библиотеку колледжа.",
    href: "https://elibrary.ru",
    tags: ["научная база"],
  },
];

const documents = [
  {
    code: "EG",
    title: "eGov.kz",
    body: "Портал электронного правительства: справки, выписки, заявления, ИИН, прописка, военный учёт — всё онлайн.",
    href: "https://egov.kz",
    tags: ["госуслуги"],
  },
  {
    code: "AD",
    title: "Әділет zan.kz",
    body: "Информационно-правовая система Казахстана: законы, кодексы, подзаконные акты в актуальной редакции.",
    href: "https://adilet.zan.kz",
    tags: ["законы"],
  },
  {
    code: "GV",
    title: "gov.kz",
    body: "Единая платформа интернет-ресурсов государственных органов РК. Управления образования, акиматы, министерства.",
    href: "https://gov.kz",
    tags: ["гос. органы"],
  },
  {
    code: "EN",
    title: "Enbek.kz",
    body: "Электронная биржа труда: вакансии, регистрация безработным, обучение «Жас Маман», социальные программы.",
    href: "https://enbek.kz",
    tags: ["работа"],
  },
  {
    code: "MD",
    title: "Medical Patient — emis.kz",
    body: "Электронная медицина: запись к врачу, выписка справки 086/у для практики и общежития, история анализов.",
    href: "https://damumed.kz",
    tags: ["мед. справки"],
  },
  {
    code: "DI",
    title: "Digital ID — eGov mobile",
    body: "Цифровое удостоверение в смартфоне, ЭЦП, подпись документов. Используется для электронных заявлений в AIS колледжа.",
    href: "https://egov.kz/cms/ru/mobile-applications",
    tags: ["ЭЦП"],
  },
];

const finance = [
  {
    code: "KS",
    title: "Kaspi.kz",
    body: "Оплата обучения через раздел «Платежи» → «Образование» → «ЕКЕБ». Квитанция приходит автоматически в AIS.",
    href: "https://kaspi.kz",
    tags: ["оплата"],
  },
  {
    code: "HL",
    title: "Halyk Bank",
    body: "Оплата обучения через Homebank: те же шаги, тот же раздел. Подходит для платежей юридическими лицами и работодателями.",
    href: "https://halykbank.kz",
    tags: ["оплата"],
  },
  {
    code: "FK",
    title: "Финансовый центр МОН",
    body: "Государственный финансовый центр: гранты, ваучерное финансирование, образовательные кредиты от государства.",
    href: "https://fincenter.kz",
    tags: ["гранты", "кредиты"],
  },
  {
    code: "JF",
    title: "Jusan Bank — образовательный кредит",
    body: "Кредит на обучение под низкий процент с отсрочкой выплаты до окончания колледжа. Для студентов всех курсов.",
    href: "https://jusan.kz",
    tags: ["кредит"],
  },
];

const career = [
  {
    code: "WS",
    title: "WorldSkills Kazakhstan",
    body: "Национальные и региональные чемпионаты профессионального мастерства. Колледж — площадка по трём компетенциям.",
    href: "https://worldskills.kz",
    tags: ["чемпионаты"],
  },
  {
    code: "HH",
    title: "HeadHunter — hh.kz",
    body: "Крупнейший сайт вакансий Казахстана. У колледжа корпоративный профиль с вакансиями партнёров для выпускников.",
    href: "https://hh.kz",
    tags: ["вакансии"],
  },
  {
    code: "LI",
    title: "LinkedIn",
    body: "Профессиональная сеть: профиль для карьеры, рекомендации преподавателей, рекрутеры IT-компаний СНГ и зарубежья.",
    href: "https://linkedin.com",
    tags: ["EN", "карьера"],
  },
  {
    code: "AT",
    title: "Atameken — qoldau.kz",
    body: "Палата предпринимателей: программы стажировок, гранты для студенческих стартапов, бизнес-инкубаторы.",
    href: "https://qoldau.kz",
    tags: ["стажировки"],
  },
];

export default function LinksPage() {
  return (
    <PageShell
      pathname="/students/links"
      eyebrow="Студенту"
      title="Полезные ссылки."
      subtitle="Внешние ресурсы для учёбы, документов, финансов и карьеры — собраны и проверены сервис-центром колледжа."
      back={{ label: "Назад в «Студенту»", href: "/students" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Образование"
        title={
          <>
            Учёба и развитие — <br />
            <span className="text-[var(--muted)]">за пределами кампуса</span>.
          </>
        }
        intro="Порталы МОН РК, открытые курсы и научные базы. Часть требует регистрации с корпоративным email — берите его у куратора."
        ambient="indigo"
      >
        <FeatureGrid items={education} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Документы и государство"
        title="Госуслуги и правовые базы."
        intro="eGov, Әділет, gov.kz и медицинские сервисы — то, чем студент пользуется в течение учебного года: справки, прописка, медицина, ЭЦП."
        ambient="warm"
      >
        <FeatureGrid items={documents} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Финансы и оплата"
        title="Оплата обучения и финансирование."
        intro="Оплачивать обучение можно через любой казахстанский банк. Государственные финансовые программы — для тех, кому нужна поддержка."
      >
        <FeatureGrid items={finance} cols={4} />
      </ContentSection>

      <ContentSection
        eyebrow="Карьера и индустрия"
        title="Где искать работу и стажировку."
        ambient="indigo"
      >
        <FeatureGrid items={career} cols={4} />
      </ContentSection>

      <BigCTA
        eyebrow="Не нашли нужный ресурс?"
        title={
          <>
            Напишите в сервис-центр — <br />
            добавим в каталог.
          </>
        }
        body="Если регулярно пользуетесь полезным сервисом, которого нет в списке, — расскажите. Сервис-центр проверит и добавит, чтобы пригодилось другим студентам."
        primary={{ label: "Сервис-центр", href: "/students/service-center" }}
        secondary={{ label: "Библиотека", href: "/students/library" }}
      />
    </PageShell>
  );
}
