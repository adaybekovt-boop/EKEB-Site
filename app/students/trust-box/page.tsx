import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { StatGrid } from "@/components/page-content/stat-strip";
import { StepsList } from "@/components/page-content/steps";
import { TrustForm } from "@/components/students/trust-form";
import { Phone, Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Электронный ящик доверия — ЕКЕБ",
  description:
    "Анонимный канал обращения к директору колледжа. Жалобы, предложения, идеи. Гарантия конфиденциальности.",
};

const flow = [
  {
    code: "01",
    title: "Отправка обращения",
    body: "Вы заполняете форму. Сообщение шифруется и попадает в защищённый ящик директора. Курсы, кафедры и приёмная не видят содержимого.",
  },
  {
    code: "02",
    title: "Первичный просмотр",
    body: "Директор читает обращение в течение 2 рабочих дней. Если ситуация требует немедленного вмешательства — реакция в тот же день.",
  },
  {
    code: "03",
    title: "Проверка фактов",
    body: "Привлекаются заведующие кафедрами, кураторы или служба безопасности — без указания вашего имени, если выбран анонимный режим.",
  },
  {
    code: "04",
    title: "Решение и ответ",
    body: "Принимается решение, при необходимости проводится дисциплинарная комиссия. Если вы оставили контакт — ответ приходит в течение 14 рабочих дней.",
    hint: "анонимные обращения публикуются в обезличенном отчёте за квартал",
  },
];

const stats = [
  { value: "184", label: "обращений", hint: "за 2024 учебный год" },
  { value: "92%", label: "обработано", hint: "в установленный срок", warm: true },
  { value: "47", label: "решений", hint: "приняты в пользу студента" },
  { value: "11", label: "регламентов", hint: "изменены по запросам", warm: true },
];

export default function TrustBoxPage() {
  return (
    <PageShell
      pathname="/students/trust-box"
      eyebrow="Студенту"
      title="Электронный ящик доверия."
      subtitle="Анонимный канал обращения к директору: жалобы, предложения, идеи. Каждое сообщение читается лично."
      back={{ label: "Назад в «Студенту»", href: "/students" }}
    >
      <ContentSection density="medium" ambient="indigo">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 lg:col-span-7">
            <TrustForm />
          </div>
          <div className="col-span-12 lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h3 className="text-[15px] font-medium tracking-tight mb-2">
                Что писать в ящик
              </h3>
              <ul className="space-y-2 text-[13.5px] text-[var(--muted)] leading-relaxed">
                <li>— несправедливое оценивание или давление преподавателя</li>
                <li>— нарушения техники безопасности в кабинетах и общежитии</li>
                <li>— коррупционные риски или конфликты интересов</li>
                <li>— предложения по программе, столовой, расписанию</li>
                <li>— благодарности конкретным сотрудникам</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h3 className="text-[15px] font-medium tracking-tight mb-2">
                Если нужна психологическая поддержка
              </h3>
              <p className="text-[13.5px] text-[var(--muted)] leading-relaxed mb-4">
                Штатный психолог колледжа — Алия Каримовна Жаксыбекова. Приём по записи, конфиденциально.
              </p>
              <div className="space-y-2 text-[13px]">
                <a
                  href="tel:+77132561234"
                  className="flex items-center gap-2.5 text-foreground/85 hover:text-foreground transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[var(--accent)]" strokeWidth={1.5} />
                  +7 (7132) 56-12-34, доб. 117
                </a>
                <a
                  href="mailto:psy@ekeb.kz"
                  className="flex items-center gap-2.5 text-foreground/85 hover:text-foreground transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--accent)]" strokeWidth={1.5} />
                  psy@ekeb.kz
                </a>
                <div className="flex items-center gap-2.5 text-foreground/85">
                  <MessageSquare className="w-3.5 h-3.5 text-[var(--accent)]" strokeWidth={1.5} />
                  Кабинет 214, корпус А (пн–пт, 10:00–17:00)
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Как мы работаем с обращениями"
        title={
          <>
            Четыре шага — <br />
            <span className="text-[var(--muted)]">от формы до ответа</span>.
          </>
        }
        intro="Прозрачный регламент, чтобы вы понимали, что происходит с сообщением после нажатия «Отправить»."
      >
        <StepsList steps={flow} />
      </ContentSection>

      <ContentSection
        eyebrow="Открытая статистика"
        title="Что изменилось благодаря вашим обращениям."
        intro="Ящик доверия — рабочий инструмент. Раз в квартал отчёт публикуется в открытом доступе, чтобы вы видели, к чему приводят сообщения."
        density="dense"
      >
        <StatGrid items={stats} />
      </ContentSection>
    </PageShell>
  );
}
