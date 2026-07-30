import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ArrowRight, Instagram, Send, Youtube, Music2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContentSection } from "@/components/page-content/section";
import { FAQ } from "@/components/page-content/faq";
import { ContactForm } from "@/components/contact/contact-form";
import { DarkCard } from "@/components/ui/dark-card";

export const metadata: Metadata = {
  title: "Контакты — ЕКЕБ",
  description:
    "Адрес кампуса в Актобе, телефон приёмной, почта, часы работы, форма обратной связи и реквизиты колледжа.",
};

const socials = [
  { label: "Instagram", handle: "@ekeb.kz", href: "https://instagram.com/ekeb.kz", Icon: Instagram },
  { label: "Telegram", handle: "@ekeb_official", href: "https://t.me/ekeb_official", Icon: Send },
  { label: "YouTube", handle: "/EkebCollege", href: "https://youtube.com/@ekebcollege", Icon: Youtube },
  { label: "TikTok", handle: "@ekeb.college", href: "https://tiktok.com/@ekeb.college", Icon: Music2 },
];

const faq = [
  {
    q: "Как лучше доехать до колледжа?",
    a: "Кампус находится на ул. Маресьева, 105 — это рядом с остановкой «Молодёжная». Ходят автобусы 1, 3, 25, 28 и маршрутки 7, 11. На машине — паркинг на 40 мест с южной стороны здания.",
  },
  {
    q: "Когда лучше прийти лично?",
    a: "Приёмная работает Пн–Пт с 9:00 до 18:00. Пиковые часы — 10:00–12:00 (меньше очередей в обед). По субботам приём ведётся по предварительной записи через форму или по телефону.",
  },
  {
    q: "Нужно ли записываться заранее?",
    a: "Для общих вопросов — нет, приходите в рабочие часы. Для встречи с директором, замами или подачи документов в период приёмной кампании — желательно записаться, чтобы не ждать.",
  },
  {
    q: "Можно ли посетить занятия?",
    a: "Да, в рамках Дня открытых дверей (раз в месяц) или индивидуального визита по записи. Покажем лаборатории, познакомим с преподавателями и студентами, расскажем о дуальной практике.",
  },
  {
    q: "Есть ли общежитие?",
    a: "Колледж не имеет собственного общежития, но помогает с подбором проживания у партнёров. Подробности — у менеджера приёмной или в разделе «Иногородним студентам».",
  },
];

export default function ContactPage() {
  return (
    <PageShell
      pathname="/contact"
      eyebrow="Контакты"
      title="Связаться с колледжем."
      subtitle="Телефон, почта, адрес кампуса в Актобе, часы работы и форма обратной связи — всё в одном месте."
    >
      {/* Map + contact cards */}
      <ContentSection density="dense" ambient="indigo">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          <div className="md:col-span-7 rounded-3xl border border-white/[0.08] bg-[var(--elevated)] overflow-hidden">
            <div className="relative h-[300px] sm:h-[360px] md:h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0e1019] via-[#15182a] to-[#0e1019]" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(97,120,245,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(97,120,245,0.08) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 800 480"
                fill="none"
                aria-hidden
              >
                <path
                  d="M0 240 Q 200 180, 400 240 T 800 220"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="22"
                />
                <path
                  d="M400 0 Q 350 240, 420 480"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="14"
                />
                <path
                  d="M0 100 L 800 120"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="8"
                />
                <path
                  d="M0 380 L 800 360"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="8"
                />
                <path
                  d="M120 0 Q 140 200, 180 480"
                  stroke="rgba(255,255,255,0.035)"
                  strokeWidth="6"
                />
                <path
                  d="M620 0 Q 600 240, 660 480"
                  stroke="rgba(255,255,255,0.035)"
                  strokeWidth="6"
                />
              </svg>

              {/* secondary pins for depth */}
              <div className="absolute top-[28%] left-[22%] h-2 w-2 rounded-full bg-white/30" />
              <div className="absolute top-[68%] left-[78%] h-2 w-2 rounded-full bg-white/20" />
              <div className="absolute top-[40%] left-[72%] h-1.5 w-1.5 rounded-full bg-white/25" />

              {/* primary pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 -m-10 rounded-full bg-[var(--accent)]/20 idle-glow" />
                  <div className="absolute inset-0 -m-5 rounded-full bg-[var(--accent)]/30 animate-ping" />
                  <div className="relative h-7 w-7 rounded-full bg-[var(--accent)] border-2 border-white/30 shadow-[0_0_24px_rgba(97,120,245,0.85)]" />
                </div>
              </div>

              <div className="absolute bottom-5 md:bottom-7 left-5 md:left-7 right-5 md:right-7 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] text-[var(--muted)] mb-1 uppercase tracking-wider">
                    Адрес кампуса
                  </div>
                  <div className="text-foreground text-[15px] md:text-2xl tracking-tight">
                    г. Актобе, ул. Маресьева, 105
                  </div>
                  <div className="text-[12.5px] text-[var(--muted)] mt-1">
                    Остановка «Молодёжная» · паркинг с южной стороны
                  </div>
                </div>
                <a
                  href="https://2gis.kz/aktobe"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] text-[var(--accent)] flex items-center gap-1 hover:gap-2 transition-all shrink-0"
                >
                  Открыть в 2GIS <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-1 gap-3 md:gap-4">
            <ContactInfoCard
              label="Телефон приёмной"
              icon={<Phone className="w-5 h-5" strokeWidth={1.5} />}
              main={<a href="tel:+77003543772" className="hover:text-[var(--accent)] transition">+7 (700) 354-37-72</a>}
              sub={<a href="tel:+77132543772" className="hover:text-foreground transition">+7 (7132) 54-37-72</a>}
            />
            <ContactInfoCard
              label="Почта"
              icon={<Mail className="w-5 h-5" strokeWidth={1.5} />}
              main={<a href="mailto:info@ekeb.edu.kz" className="hover:text-[var(--accent)] transition">info@ekeb.edu.kz</a>}
              sub={<a href="mailto:partners@ekeb.edu.kz" className="hover:text-foreground transition">partners@ekeb.edu.kz · для бизнеса</a>}
            />
            <ContactInfoCard
              label="Часы работы"
              icon={<Clock className="w-5 h-5" strokeWidth={1.5} />}
              main="Пн — Пт · 9:00 — 18:00"
              sub="Суббота · по записи · Воскресенье — выходной"
            />
            <ContactInfoCard
              label="Адрес"
              icon={<MapPin className="w-5 h-5" strokeWidth={1.5} />}
              main="ул. Маресьева, 105"
              sub="г. Актобе, 030010, Казахстан"
            />
          </div>
        </div>
      </ContentSection>

      {/* Socials */}
      <ContentSection
        eyebrow="Соцсети"
        title={
          <>
            Подписывайтесь — <br />
            <span className="text-[var(--muted)]">там анонсы и закулисье</span>.
          </>
        }
        intro="Колледж ведёт каналы во всех площадках, где сидят абитуриенты и студенты. Истории дня открытых дверей, репортажи с чемпионатов, разборы программ."
        density="dense"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {socials.map((s) => {
            const Icon = s.Icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-5 md:p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <div className="h-10 w-10 rounded-xl border border-white/[0.08] flex items-center justify-center text-[var(--accent)] mb-4 group-hover:border-white/[0.16] transition">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="text-[15px] font-medium tracking-tight mb-0.5">
                  {s.label}
                </div>
                <div className="text-[12.5px] text-[var(--muted)]">{s.handle}</div>
              </a>
            );
          })}
        </div>
      </ContentSection>

      {/* Form + requisites */}
      <ContentSection density="medium" ambient="warm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="lg:col-span-5">
            <DarkCard className="p-6 md:p-8 h-full">
              <div className="text-[12.5px] text-[var(--accent)] mb-2">
                Реквизиты колледжа
              </div>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-6 leading-tight">
                Для договоров и оплат.
              </h3>
              <RequisiteRow label="Полное наименование" value="ТОО «ЕКЕБ Колледж»" />
              <RequisiteRow label="БИН" value="180 940 012 345" mono />
              <RequisiteRow label="Юридический адрес" value="г. Актобе, ул. Маресьева, 105" />
              <RequisiteRow label="ИИК" value="KZ12 7710 0000 1234 5678" mono />
              <RequisiteRow label="Банк" value="АО «Halyk Bank»" />
              <RequisiteRow label="БИК" value="HSBKKZKX" mono />
              <RequisiteRow label="Кбе" value="17" mono last />
              <a
                href="/documents/requisites.pdf"
                className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] text-[var(--accent)] hover:gap-2 transition-all"
              >
                Скачать карточку предприятия <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </DarkCard>
          </div>
        </div>
      </ContentSection>

      {/* FAQ */}
      <ContentSection
        eyebrow="Частые вопросы"
        title={
          <>
            Как доехать, когда прийти, <br />
            <span className="text-[var(--muted)]">нужна ли запись</span>.
          </>
        }
        intro="Самые частые вопросы перед визитом в колледж. Если ответа на ваш вопрос нет — напишите через форму выше."
      >
        <FAQ items={faq} />
      </ContentSection>
    </PageShell>
  );
}

function ContactInfoCard({
  label,
  icon,
  main,
  sub,
}: {
  label: string;
  icon: React.ReactNode;
  main: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <DarkCard className="p-5 md:p-6">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-[var(--accent)] shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-[10.5px] text-[var(--muted)] mb-1 uppercase tracking-wider">
            {label}
          </div>
          <div className="text-[15px] md:text-base font-medium tracking-tight">
            {main}
          </div>
          {sub && (
            <div className="text-[12.5px] text-[var(--muted)] mt-0.5 leading-snug">
              {sub}
            </div>
          )}
        </div>
      </div>
    </DarkCard>
  );
}

function RequisiteRow({
  label,
  value,
  mono,
  last,
}: {
  label: string;
  value: string;
  mono?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={
        "flex items-baseline justify-between gap-4 py-2.5 " +
        (last ? "" : "border-b border-white/[0.06]")
      }
    >
      <span className="text-[11.5px] text-[var(--muted)] uppercase tracking-wider shrink-0">
        {label}
      </span>
      <span
        className={
          "text-[13px] text-foreground/90 text-right " +
          (mono ? "font-mono" : "tracking-tight")
        }
      >
        {value}
      </span>
    </div>
  );
}
