import type { Metadata } from "next";
import {
  ClipboardList,
  Wrench,
  GraduationCap,
  FileSignature,
  UserCheck,
  Building,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { StatGrid } from "@/components/page-content/stat-strip";
import { StepsList } from "@/components/page-content/steps";
import { DocGrid } from "@/components/page-content/doc-card";
import { Marquee } from "@/components/ui/marquee";
import { BigCTA } from "@/components/page-content/big-cta";

export const metadata: Metadata = {
  title: "Производственная практика — ЕКЕБ",
};

const stats = [
  { value: "3", label: "вида практики", hint: "учебная, производственная, преддипломная" },
  { value: "150+", label: "компаний-партнёров", hint: "Актобе и область", warm: true },
  { value: "до 40%", label: "оплачиваемая", hint: "по ученическому договору" },
  { value: "1 280", label: "часов за четыре года", hint: "среднее по программам", warm: true },
];

const types = [
  {
    code: "I курс",
    title: "Учебная практика",
    body: "Две недели в конце второго семестра. Знакомство с производственной средой партнёра, экскурсии, наблюдение за процессами. Без самостоятельных задач.",
    tags: ["120 ч", "не оплачивается", "групповая"],
  },
  {
    code: "II–III курс",
    title: "Производственная практика",
    body: "Регулярная по дуальной модели: два дня в неделю + сосредоточенные блоки по 4 недели в конце семестра. Реальные задачи под наставником.",
    tags: ["720 ч", "часто оплачивается", "индивидуальная"],
  },
  {
    code: "IV курс",
    title: "Преддипломная практика",
    body: "Восемь недель перед защитой. Студент собирает фактуру для дипломного проекта прямо у партнёра, готовит отчёт и презентацию.",
    tags: ["440 ч", "оплачивается", "профильная"],
  },
];

const steps = [
  {
    code: "01",
    title: "Назначение руководителя",
    body: "Куратор от колледжа закрепляется приказом по специальности. У каждой группы — свой руководитель практики, который ведёт студентов весь срок обучения.",
  },
  {
    code: "02",
    title: "Подбор компании-партнёра",
    body: "Колледж согласует список компаний по профилю. Студент выбирает из открытых мест; если место занято, его перенаправят на следующий профильный партнёр.",
  },
  {
    code: "03",
    title: "Договор с предприятием",
    body: "Между колледжем, компанией и студентом заключается трёхсторонний договор. Указываются сроки, наставник со стороны компании, режим, отчётность.",
    hint: "Шаблон договора — в разделе документов ниже",
  },
  {
    code: "04",
    title: "Ведение дневника",
    body: "Студент ежедневно фиксирует задачи и часы. Наставник раз в неделю визирует записи; раз в две недели руководитель от колледжа проверяет дневник.",
  },
  {
    code: "05",
    title: "Защита периода практики",
    body: "По окончании периода — защита перед комиссией: студент представляет отчёт, наставник даёт характеристику, выставляется итоговая оценка.",
  },
];

const partners = [
  "ТОО Aktobe Soft",
  "АО Народный Банк",
  "ТОО WestQA",
  "Аудиторская компания «Бухгалтер»",
  "АК «Закон и Право»",
  "ТОО Oil Service Group",
  "ИП Палата оценщиков",
  "ТОО Smart Logistics",
];

const docs = [
  {
    title: "Договор о прохождении производственной практики",
    kind: "Шаблон трёхстороннего договора",
    size: "180 КБ",
    updated: "09.2024",
    format: "DOCX" as const,
    href: "#",
  },
  {
    title: "Дневник практики",
    kind: "Форма ведения и образец заполнения",
    size: "240 КБ",
    updated: "09.2024",
    format: "PDF" as const,
    href: "#",
  },
  {
    title: "Характеристика наставника",
    kind: "Шаблон для подписи руководителем от компании",
    size: "92 КБ",
    updated: "09.2024",
    format: "DOCX" as const,
    href: "#",
  },
  {
    title: "Положение о практике",
    kind: "Внутренний акт колледжа",
    size: "640 КБ",
    updated: "08.2024",
    format: "PDF" as const,
    href: "#",
  },
];

const supportRoles = [
  {
    title: "Руководитель практики (колледж)",
    body: "Закрепляется за группой, согласует список партнёров, проверяет дневники, ведёт итоговую защиту. Контактен по WhatsApp и в офисе.",
  },
  {
    title: "Наставник (партнёр)",
    body: "Принимает студента на рабочем месте, ставит задачи, ведёт еженедельные one-to-one, подписывает дневник и характеристику.",
  },
  {
    title: "Отдел практики",
    body: "Заключает договоры с компаниями, ведёт реестр мест, разбирает спорные ситуации, занимается перераспределением студентов.",
  },
];

export default function PracticePage() {
  return (
    <PageShell
      pathname="/learning/practice"
      eyebrow="Обучение"
      title="Производственная практика."
      subtitle="Учебная, производственная и преддипломная — как устроена, когда проходит и где её можно пройти."
      back={{ label: "Назад в «Обучение»", href: "/learning" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Три вида"
        title={
          <>
            От знакомства <br />
            <span className="text-[var(--muted)]">до дипломного проекта</span>.
          </>
        }
        intro="Каждый вид практики решает свою задачу. Первая — посмотреть, как устроено производство. Вторая — встроиться в команду. Третья — собрать материал для диплома."
        ambient="indigo"
      >
        <FeatureGrid items={types} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Как это устроено"
        title={
          <>
            Пять шагов — <br />
            <span className="text-[var(--muted)]">от приказа до защиты</span>.
          </>
        }
        intro="Процесс одинаков для всех видов практики. Меняется только продолжительность, доля самостоятельной работы и требования к отчёту."
        ambient="split"
      >
        <StepsList steps={steps} />
      </ContentSection>

      <ContentSection
        eyebrow="Кто отвечает"
        title={
          <>
            Три роли вокруг <br />
            <span className="text-[var(--muted)]">студента-практиканта</span>.
          </>
        }
        intro="Контур ответственности прозрачный: на любом этапе понятно, к кому идти с вопросом."
        ambient="warm"
      >
        <FeatureGrid items={supportRoles} cols={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Партнёры"
        title={
          <>
            Где сейчас <br />
            <span className="text-[var(--muted)]">проходят практику</span>.
          </>
        }
        intro="Часть реестра компаний-партнёров с открытыми местами на текущий учебный год. Полный список — в отделе практики."
      >
        <Marquee items={partners} />
      </ContentSection>

      <ContentSection
        eyebrow="Документы"
        title={
          <>
            Шаблоны и формы <br />
            <span className="text-[var(--muted)]">для практикантов</span>.
          </>
        }
        intro="Скачайте до выхода на практику. Дневник нужно начать вести с первого дня, договор подписать до начала."
      >
        <DocGrid items={docs} />
      </ContentSection>

      <BigCTA
        eyebrow="Вопросы по практике?"
        title={
          <>
            Отдел практики <br />
            на связи каждый день.
          </>
        }
        body="Если компания-партнёр предлагает место — напишите нам, мы оформим договор. Если ищете место — приходите в кабинет 214."
        primary={{ label: "Контакты", href: "/contact" }}
        secondary={{ label: "Дуальная модель", href: "/learning/dual" }}
      />
    </PageShell>
  );
}
