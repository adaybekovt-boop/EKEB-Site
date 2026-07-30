import Link from "next/link";
import { WatermarkDrift } from "./ui/watermark-drift";

type Col = {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
};

export function Footer() {
  const cols: Col[] = [
    {
      title: "Колледж",
      links: [
        { label: "О нас", href: "/about" },
        { label: "История", href: "/about/history" },
        { label: "Коллектив", href: "/about/staff" },
        { label: "Лицензия", href: "/about/license" },
        { label: "Аккредитация", href: "/documents/accreditation" },
        { label: "Партнёры", href: "/partners" },
      ],
    },
    {
      title: "Абитуриенту",
      links: [
        { label: "Приём документов", href: "/admissions/apply" },
        { label: "Специальности", href: "/admissions/programs" },
        { label: "Стоимость", href: "/students/tuition" },
        { label: "Шансы на грант", href: "/admissions/grant" },
        { label: "Результаты", href: "/admissions/results" },
      ],
    },
    {
      title: "Студенту",
      links: [
        { label: "Расписание", href: "/students/schedule" },
        { label: "Библиотека", href: "/students/library" },
        { label: "Трудоустройство", href: "/students/employment" },
        { label: "WorldSkills", href: "/students/worldskills" },
        { label: "Ящик доверия", href: "/students/trust-box" },
      ],
    },
    {
      title: "Контакты",
      links: [
        { label: "+7 (700) 354-37-72", href: "tel:+77003543772", external: true },
        { label: "info@ekeb.edu.kz", href: "mailto:info@ekeb.edu.kz", external: true },
        { label: "ул. Маресьева 105", href: "https://2gis.kz/aktobe", external: true },
        { label: "Актобе, Казахстан", href: "https://2gis.kz/aktobe", external: true },
      ],
    },
  ];

  const socials = [
    { label: "WhatsApp", href: "https://wa.me/77003543772" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
  ];

  return (
    <footer className="relative border-t border-white/[0.06] pt-14 md:pt-20 pb-10 mt-10 md:mt-12 overflow-hidden">
      {/* subtle aurora glow tied to brand */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(97,120,245,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-3 mb-6 group w-fit"
            >
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#6178f5] via-[#a8b5ff] to-[#d4a574]" />
                <div className="absolute inset-[1.5px] rounded-[7px] bg-[var(--background)] flex items-center justify-center">
                  <span className="text-base font-semibold gradient-text">E</span>
                </div>
                <div className="absolute inset-0 rounded-lg blur-md opacity-30 group-hover:opacity-60 transition-opacity bg-[var(--accent)] -z-10" />
              </div>
              <div>
                <div className="text-[15px] font-semibold tracking-tight">ЕКЕБ</div>
                <div className="text-[11px] text-[var(--muted)]">European College</div>
              </div>
            </Link>
            <p className="text-[14px] text-[var(--muted)] leading-relaxed max-w-xs mb-6">
              Европейский высший колледж цифровых технологий и
              предпринимательства. Готовим людей, которые меняют мир к лучшему.
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 text-[11.5px] rounded-full border border-white/[0.08] text-[var(--muted)] hover:text-foreground hover:border-white/[0.18] hover:bg-white/[0.02] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="col-span-6 md:col-span-2">
              <div className="text-[13px] text-foreground mb-4">{c.title}</div>
              <ul className="space-y-2.5">
                {c.links.map((l) =>
                  l.external ? (
                    <li key={l.href + l.label}>
                      <a
                        href={l.href}
                        className="text-[13px] text-[var(--muted)] hover:text-foreground transition-colors duration-300"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[13px] text-[var(--muted)] hover:text-foreground transition-colors duration-300"
                      >
                        {l.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline mb-6" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] text-[var(--muted)]">
          <div>
            © {new Date().getFullYear()} Европейский высший колледж · Все права
            защищены
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/documents/regulations"
              className="hover:text-foreground transition-colors"
            >
              Документы
            </Link>
            <Link
              href="/documents/rules"
              className="hover:text-foreground transition-colors"
            >
              Правила приёма
            </Link>
            <Link
              href="/contact"
              className="hover:text-foreground transition-colors"
            >
              Связаться
            </Link>
          </div>
        </div>

        {/* big watermark word — scroll-linked drift + slow breathe */}
        <WatermarkDrift text="ЕКЕБ  колледж" />
      </div>
    </footer>
  );
}
