import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { FAQ } from "@/components/page-content/faq";
import { BigCTA } from "@/components/page-content/big-cta";
import { DarkCard } from "@/components/ui/dark-card";
import { TuitionTable } from "@/components/students/tuition-table";
import {
  Smartphone,
  Landmark,
  CalendarDays,
  Award,
  HeartHandshake,
  Users2,
  Copy,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Оплата за обучение — ЕКЕБ",
  description:
    "Стоимость обучения по специальностям, реквизиты колледжа, способы оплаты, рассрочка и льготные категории.",
};

const tuition = [
  {
    code: "06120100",
    name: "Программное обеспечение (по видам)",
    duration: "3 г. 10 м. / 2 г. 10 м.",
    price9: "640 000 ₸ / год",
    price11: "680 000 ₸ / год",
  },
  {
    code: "06130100",
    name: "Вычислительная техника и сети",
    duration: "3 г. 10 м. / 2 г. 10 м.",
    price9: "620 000 ₸ / год",
    price11: "660 000 ₸ / год",
  },
  {
    code: "04110100",
    name: "Учёт и аудит",
    duration: "2 г. 10 м. / 1 г. 10 м.",
    price9: "520 000 ₸ / год",
    price11: "560 000 ₸ / год",
  },
  {
    code: "04120100",
    name: "Оценка (по отраслям)",
    duration: "2 г. 10 м. / 1 г. 10 м.",
    price9: "540 000 ₸ / год",
    price11: "580 000 ₸ / год",
  },
  {
    code: "04210100",
    name: "Правоведение",
    duration: "2 г. 10 м. / 1 г. 10 м.",
    price9: "500 000 ₸ / год",
    price11: "540 000 ₸ / год",
  },
];

const benefits = [
  {
    title: "Отличники — скидка 30%",
    body: "Если средний балл аттестата 4,75 и выше, при поступлении автоматически предоставляется скидка на первый год обучения.",
  },
  {
    title: "Дети-сироты, инвалиды I–II гр.",
    body: "Обучение по льготной ставке — 50% от стандартной стоимости. Документы: справка из органов опеки или МСЭК.",
  },
  {
    title: "Многодетные семьи",
    body: "Скидка 20% при предоставлении удостоверения многодетной матери / отца. Для второго и последующего ребёнка из семьи.",
  },
  {
    title: "Дети из приграничных районов",
    body: "Льгота 15% для жителей сёл и районных центров Актюбинской области с подтверждением прописки.",
  },
];

const faq = [
  {
    q: "Можно ли платить помесячно?",
    a: "Да, оплата за обучение разбивается на 10 равных платежей — с сентября по июнь. График фиксируется в договоре. Просрочка более 30 дней приводит к отчислению после уведомления.",
  },
  {
    q: "Что если родители оплачивают за два курса вперёд?",
    a: "Предусмотрена скидка 5% при оплате года вперёд и 8% — за два года. Скидка применяется к договорной цене текущего учебного года, не накладывается на льготные категории.",
  },
  {
    q: "Возвращаются ли деньги при отчислении?",
    a: "Да, пропорционально неиспользованным месяцам обучения. Удерживается комиссия 7% за административные расходы. Возврат производится в течение 30 дней с даты приказа.",
  },
  {
    q: "Что входит в стоимость обучения?",
    a: "Все аудиторные занятия, доступ к лабораториям и серверам колледжа, лицензии 1С / JetBrains / Adobe для учебных нужд, базовая канцелярия, медосмотр. Не входит: учебники сверх программы, выезды на чемпионаты, общежитие.",
  },
  {
    q: "Меняется ли цена в течение года?",
    a: "Нет, цена фиксируется в договоре на учебный год и не пересматривается. Индексация возможна только при подписании договора на следующий год — обычно 8–10%.",
  },
];

export default function TuitionPage() {
  return (
    <PageShell
      pathname="/students/tuition"
      eyebrow="Студенту"
      title="Оплата за обучение."
      subtitle="Стоимость по специальностям, способы оплаты, реквизиты и льготные категории — без скрытых платежей."
      back={{ label: "Назад в «Студенту»", href: "/students" }}
    >
      <ContentSection
        eyebrow="Цены на 2025/2026"
        title="Стоимость по программам."
        intro="Цена зафиксирована на весь учебный год. Принимаем оплату единовременно, годовыми частями или ежемесячно — без процентов."
        ambient="indigo"
      >
        <TuitionTable rows={tuition} />
        <p className="mt-4 text-[12px] text-[var(--muted)] max-w-2xl">
          Стоимость указана за один академический год обучения. Цена пересматривается раз в год при перезаключении договора.
        </p>
      </ContentSection>

      <ContentSection
        eyebrow="Способы оплаты"
        title={
          <>
            Четыре способа <br />
            <span className="text-[var(--muted)]">внести оплату</span>.
          </>
        }
        intro="Все каналы проверены: квитанция автоматически появляется в SmartNation в течение суток."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <DarkCard glow="indigo" className="p-6 md:p-7">
            <div className="h-11 w-11 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[var(--accent)] mb-5">
              <Smartphone className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium tracking-tight mb-2">Kaspi Pay</h3>
            <p className="text-[13.5px] text-[var(--muted)] leading-relaxed mb-4">
              В приложении Kaspi: «Платежи → Образование → Колледж ЕКЕБ». Указываете ИИН студента — система подтягивает договор и сумму.
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-foreground/80">
              <li>— зачисление в течение 15 минут</li>
              <li>— без комиссии для плательщика</li>
              <li>— квитанция сразу в SmartNation</li>
            </ul>
          </DarkCard>

          <DarkCard glow="gold" className="p-6 md:p-7">
            <div className="h-11 w-11 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[var(--accent-warm)] mb-5">
              <Landmark className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium tracking-tight mb-2">
              Банковский перевод
            </h3>
            <p className="text-[13.5px] text-[var(--muted)] leading-relaxed mb-4">
              Через любой банк Казахстана по реквизитам ниже. В назначении платежа обязательно укажите ИИН и ФИО студента.
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-foreground/80">
              <li>— для оплаты от организации-спонсора</li>
              <li>— для перевода со счёта родителя</li>
              <li>— зачисление 1–2 рабочих дня</li>
            </ul>
          </DarkCard>

          <DarkCard glow="indigo" className="p-6 md:p-7">
            <div className="h-11 w-11 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[var(--accent)] mb-5">
              <CalendarDays className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium tracking-tight mb-2">
              Рассрочка 0-0-10
            </h3>
            <p className="text-[13.5px] text-[var(--muted)] leading-relaxed mb-4">
              Сумма за год делится на 10 равных платежей — с сентября по июнь. Без переплат и поручителей.
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-foreground/80">
              <li>— оформляется при заключении договора</li>
              <li>— фиксированный график</li>
              <li>— автосписание с карты по желанию</li>
            </ul>
          </DarkCard>

          <DarkCard glow="gold" className="p-6 md:p-7">
            <div className="h-11 w-11 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[var(--accent-warm)] mb-5">
              <Award className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium tracking-tight mb-2">
              Государственный грант
            </h3>
            <p className="text-[13.5px] text-[var(--muted)] leading-relaxed mb-4">
              При получении гранта обучение оплачивает Министерство просвещения. Студент платит только за общежитие и питание.
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-foreground/80">
              <li>— конкурс по ЕНТ / собеседованию</li>
              <li>— контрольное число мест по программе</li>
              <li>— калькулятор шансов на сайте</li>
            </ul>
          </DarkCard>
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Реквизиты"
        title="Куда переводить."
        density="medium"
      >
        <DarkCard className="p-6 md:p-8">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-[14px]">
            <Req label="Наименование">ТОО «ЕКЕБ Колледж»</Req>
            <Req label="БИН">180 240 016 832</Req>
            <Req label="ИИК">KZ123 1234 1234 5678 9012</Req>
            <Req label="БИК">KSPIKZKA</Req>
            <Req label="Банк">АО «Kaspi Bank»</Req>
            <Req label="КБе">17</Req>
            <Req label="Юр. адрес" full>
              030000, Республика Казахстан, Актюбинская область, г. Актобе,
              пр. Абилкайыр-хана 47/1
            </Req>
            <Req label="Назначение платежа" full>
              «Оплата за обучение, ИИН студента ____________, ФИО ____________,
              специальность ____________, учебный год 2025/2026»
            </Req>
          </dl>
        </DarkCard>
      </ContentSection>

      <ContentSection
        eyebrow="Льготы и скидки"
        title="Кому полагается понижение."
        intro="Льготные категории не суммируются между собой. Применяется максимально выгодная для семьи."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {benefits.map((b) => {
            return (
              <DarkCard key={b.title} glow="gold" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[var(--accent-warm)] shrink-0">
                    <span className="text-[12px] font-mono">%</span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-medium tracking-tight mb-1.5">
                      {b.title}
                    </h3>
                    <p className="text-[13.5px] text-[var(--muted)] leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                </div>
              </DarkCard>
            );
          })}
        </div>
      </ContentSection>

      <ContentSection eyebrow="Частые вопросы" title="Что обычно уточняют родители.">
        <FAQ items={faq} />
      </ContentSection>

      <BigCTA
        eyebrow="Не уверены, потянете ли финансово"
        title={
          <>
            Посчитайте шансы <br />
            на государственный грант.
          </>
        }
        body="Калькулятор оценивает вероятность по среднему баллу, базе (9/11 кл.), баллу ЕНТ и специальности. Сравнение с другими ТиПО Казахстана."
        primary={{ label: "Открыть калькулятор", href: "/admissions/grant" }}
        secondary={{ label: "Бухгалтерия", href: "mailto:finance@ekeb.kz" }}
      />
    </PageShell>
  );
}

function Req({
  label,
  children,
  full = false,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <dt className="text-[11.5px] uppercase tracking-wider text-[var(--muted)] mb-1 flex items-center gap-1.5">
        {label}
        <Copy className="w-3 h-3 opacity-40" strokeWidth={1.5} />
      </dt>
      <dd className="text-foreground/90 font-mono text-[13px] md:text-[14px] leading-relaxed">
        {children}
      </dd>
    </div>
  );
}
