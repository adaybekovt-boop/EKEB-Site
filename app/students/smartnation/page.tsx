import type { Metadata } from "next";
import {
  CalendarClock,
  GraduationCap,
  FileText,
  Bell,
  MessageSquare,
  CreditCard,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { FeatureGrid } from "@/components/page-content/feature-card";
import { BigCTA } from "@/components/page-content/big-cta";
import { StatGrid } from "@/components/page-content/stat-strip";
import { FAQ } from "@/components/page-content/faq";
import { StepsList } from "@/components/page-content/steps";
import { AppMockup } from "@/components/students/schedule-table";

export const metadata: Metadata = {
  title: "AIS «College SmartNation» — ЕКЕБ",
};

const features = [
  {
    code: "01",
    title: "Расписание",
    body: "Личный календарь занятий, замены, переносы. Подписка на .ics для Google Calendar и Apple Calendar.",
    tags: ["push", ".ics"],
  },
  {
    code: "02",
    title: "Оценки и рейтинг",
    body: "Текущий балл по каждому предмету, история аттестаций, прогноз итоговой оценки, баллы за лабораторные.",
    tags: ["рейтинг", "60/40"],
  },
  {
    code: "03",
    title: "Домашние задания",
    body: "Задания от преподавателя, файлы, сроки, статус сдачи. Преподаватель проверяет работы здесь же — без чатов.",
    tags: ["дедлайны"],
  },
  {
    code: "04",
    title: "Уведомления",
    body: "Замена пары, новая оценка, приглашение на консультацию, объявление кафедры — всё приходит пушем.",
    tags: ["push"],
  },
  {
    code: "05",
    title: "Заявления",
    body: "Электронные заявления: на справку, на академический отпуск, на пересдачу, на материальную помощь. Без очередей в деканате.",
    tags: ["e-gov-формат"],
  },
  {
    code: "06",
    title: "Оплата обучения",
    body: "Баланс лицевого счёта, оплата онлайн через Kaspi и Halyk, история платежей и квитанции для бухгалтерии.",
    tags: ["Kaspi", "Halyk"],
  },
  {
    code: "07",
    title: "Мобильное приложение",
    body: "Нативное приложение для iOS и Android: расписание офлайн, биометрический вход, виджет на главном экране.",
    tags: ["iOS", "Android"],
  },
  {
    code: "08",
    title: "Безопасный вход",
    body: "Двухфакторная авторизация, шифрование данных, журналирование входов. Восстановление доступа — через куратора.",
    tags: ["2FA"],
  },
];

const steps = [
  {
    code: "01",
    title: "Получите логин",
    body: "В первую неделю учёбы куратор выдаёт временный логин и пароль. Если потеряли — обратитесь к куратору или в сервис-центр.",
  },
  {
    code: "02",
    title: "Смените пароль",
    body: "При первом входе AIS попросит сменить пароль и привязать номер телефона. Это пригодится для восстановления и двухфакторной авторизации.",
  },
  {
    code: "03",
    title: "Установите приложение",
    body: "Скачайте «College SmartNation» в App Store или Google Play, войдите с тем же логином. Включите пуши — не пропустите замены.",
  },
  {
    code: "04",
    title: "Подпишитесь на расписание",
    body: "В настройках профиля — кнопка «Экспорт в календарь». Скопируйте ссылку .ics и добавьте подписку в Google или Apple Calendar.",
    hint: "Расписание будет обновляться автоматически",
  },
];

const faq = [
  {
    q: "Что делать, если забыл пароль?",
    a: "На экране входа — кнопка «Восстановить». Если привязан номер телефона, придёт SMS-код. Если нет — обратитесь к куратору группы: он сбросит пароль в течение одного рабочего дня. Для четвёртого курса в дни сессии сброс делается за два часа.",
  },
  {
    q: "Почему не приходят пуши?",
    a: "Проверьте разрешения уведомлений в настройках телефона (для iOS — «Уведомления» → SmartNation, для Android — «Приложения» → SmartNation → «Уведомления»). В самом приложении — настройки → уведомления — включите нужные категории.",
  },
  {
    q: "Можно ли подать заявление вместо родителей?",
    a: "Электронные заявления подписываются ЭЦП студента (через eGov mobile) или личным ПИН-кодом, выданным при поступлении. Заявления, требующие согласия родителей (например, академический отпуск несовершеннолетнего), подписываются отдельным потоком.",
  },
  {
    q: "Работает ли AIS на старых телефонах?",
    a: "Минимальные версии: iOS 14 и Android 8. На более старых устройствах используйте веб-версию через любой современный браузер — функциональность одинаковая, кроме биометрии и офлайн-режима расписания.",
  },
  {
    q: "Куда писать о баге или предложении?",
    a: "В приложении: профиль → «Сообщить о проблеме». В вебе: правый нижний угол, иконка вопроса. Команда AIS отвечает в течение 1–3 рабочих дней. Срочные сбои в дни сессии — на горячую линию техподдержки.",
  },
];

const stats = [
  { value: "1 200+", label: "пользователей", hint: "студенты и преподаватели" },
  { value: "8", label: "модулей", hint: "в одном кабинете", warm: true },
  { value: "iOS+Android", label: "приложения", hint: "плюс веб-версия" },
  { value: "99.5%", label: "uptime", hint: "за 2024 учебный год", warm: true },
];

export default function SmartNationPage() {
  return (
    <PageShell
      pathname="/students/smartnation"
      eyebrow="Студенту"
      title="AIS «College SmartNation»."
      subtitle="Электронный кабинет студента: оценки, посещаемость, расписание, документы, заявления — в браузере и мобильном приложении."
      back={{ label: "Назад в «Студенту»", href: "/students" }}
    >
      <ContentSection density="dense">
        <StatGrid items={stats} />
      </ContentSection>

      <ContentSection
        eyebrow="Один кабинет"
        title={
          <>
            Вся учебная жизнь — <br />
            <span className="text-[var(--muted)]">в одном входе</span>.
          </>
        }
        intro="AIS SmartNation объединяет расписание, оценки, домашку, заявления и оплату. Один логин — и не нужно ходить между деканатом, бухгалтерией и кафедрой."
        ambient="indigo"
      >
        <div className="grid lg:grid-cols-2 gap-4">
          <AppMockup title="Расписание" variant="indigo">
            <div className="space-y-2">
              <div className="text-[12px] font-mono text-[var(--muted)] mb-3">
                Пн · 14 октября
              </div>
              {[
                { t: "09:00", s: "Программирование на Python", r: "B-303" },
                { t: "10:45", s: "Английский язык", r: "А-204" },
                { t: "13:00", s: "Математика", r: "А-118" },
              ].map((it) => (
                <div
                  key={it.s}
                  className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-[12px] text-[var(--accent)] tabular-nums">
                      {it.t}
                    </span>
                    <span className="text-[13px] truncate">{it.s}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--accent-warm)] shrink-0">
                    {it.r}
                  </span>
                </div>
              ))}
            </div>
          </AppMockup>

          <AppMockup title="Оценки" variant="warm">
            <div className="space-y-2">
              <div className="text-[12px] font-mono text-[var(--muted)] mb-3">
                Текущий рейтинг · осень
              </div>
              {[
                { s: "Программирование", v: 88, g: "B" },
                { s: "Базы данных", v: 92, g: "А" },
                { s: "Английский", v: 76, g: "B" },
                { s: "Математика", v: 81, g: "B" },
              ].map((it) => (
                <div
                  key={it.s}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px]">{it.s}</span>
                    <span className="font-mono text-[12px] text-[var(--accent-warm)]">
                      {it.v} · {it.g}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--accent)]"
                      style={{ width: `${it.v}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AppMockup>

          <AppMockup title="Домашка" variant="warm">
            <div className="space-y-2">
              <div className="text-[12px] font-mono text-[var(--muted)] mb-3">
                Активные задания
              </div>
              {[
                { s: "REST API на FastAPI", d: "до 18.10", st: "в работе" },
                { s: "ER-диаграмма колледжа", d: "до 22.10", st: "не начато" },
                { s: "Эссе по гражданскому праву", d: "до 25.10", st: "в работе" },
              ].map((it) => (
                <div
                  key={it.s}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5"
                >
                  <div className="text-[13px] mb-1">{it.s}</div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[var(--muted)]">{it.st}</span>
                    <span className="font-mono text-[var(--accent)]">{it.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </AppMockup>

          <AppMockup title="Новости" variant="indigo">
            <div className="space-y-2">
              <div className="text-[12px] font-mono text-[var(--muted)] mb-3">
                Объявления кафедры
              </div>
              {[
                { t: "Замена: вместо алгоритмов — лекция по SQL", d: "сегодня" },
                { t: "Регистрация на WorldSkills открыта", d: "вчера" },
                { t: "Стипендия начислена за сентябрь", d: "3 дня назад" },
              ].map((it) => (
                <div
                  key={it.t}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5"
                >
                  <div className="text-[13px] mb-1 leading-snug">{it.t}</div>
                  <div className="text-[11px] text-[var(--muted)]">{it.d}</div>
                </div>
              ))}
            </div>
          </AppMockup>
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Модули"
        title="Восемь рабочих инструментов."
        intro="Каждый модуль закрывает конкретную задачу. Ничего лишнего, ничего скрытого — функциональность задокументирована."
      >
        <FeatureGrid items={features} cols={4} />
      </ContentSection>

      <ContentSection
        eyebrow="С чего начать"
        title="Первый вход — за пять минут."
        ambient="warm"
      >
        <StepsList steps={steps} />
      </ContentSection>

      <ContentSection eyebrow="Поддержка" title="Что спрашивают про вход.">
        <FAQ items={faq} />
      </ContentSection>

      <BigCTA
        eyebrow="Уже учитесь?"
        title={
          <>
            Войдите в личный кабинет — <br />
            и проверьте расписание.
          </>
        }
        body="AIS работает в любом современном браузере. Для постоянных пушей — установите мобильное приложение."
        primary={{ label: "Войти в SmartNation", href: "https://smartnation.ekeb.kz" }}
        secondary={{ label: "Сервис-центр", href: "/students/service-center" }}
      />
    </PageShell>
  );
}
