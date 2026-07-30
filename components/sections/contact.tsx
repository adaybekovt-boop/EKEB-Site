"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { MagneticButton } from "../ui/magnetic-button";
import { DarkCard } from "../ui/dark-card";

const CollegeMap = dynamic(() => import("../ui/college-map").then((m) => m.CollegeMap), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[var(--elevated)] animate-pulse" />,
});

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current || !ref.current) return;
    const ctx = gsap.context(() => {
      const split = new SplitType(headingRef.current!, { types: "words" });
      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.02,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
        },
      });

      gsap.from(".contact-item", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 75%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(97,120,245,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] idle-glow" />
              <span className="text-[13px] text-[var(--accent)] tracking-wide">
                Контакты
              </span>
            </div>
            <h2
              ref={headingRef}
              className="text-[2.6rem] md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.02] max-w-[14ch]"
            >
              Готовы<br />
              <span className="text-[var(--muted)]">поступить?</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:pb-3">
            <p className="text-[var(--muted)] text-[15px] md:text-lg leading-relaxed mb-6 max-w-md">
              Приёмная комиссия отвечает в течение дня. Звоните, пишите или
              приходите лично.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="tel:+77003543772">
                Позвонить <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton href="mailto:info@ekeb.edu.kz" variant="ghost">
                Написать
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="contact-grid grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="contact-item md:col-span-7 rounded-3xl border border-white/[0.08] bg-[var(--elevated)] overflow-hidden">
            <div className="relative h-[260px] sm:h-[320px] md:h-[400px]">
              <CollegeMap />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0e1019]/60 via-[#15182a]/30 to-[#0e1019]/50 pointer-events-none" />

              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 flex items-end justify-between gap-3 pointer-events-none">
                <div className="min-w-0">
                  <div className="text-[11px] text-[var(--muted)] mb-1">Адрес кампуса</div>
                  <div className="text-foreground text-[15px] md:text-xl tracking-tight">
                    г. Актобе, ул. Маресьева, 105
                  </div>
                </div>
                <a
                  href="https://2gis.kz/aktobe/query/Европейский%20колледж,%20ул.%20Маресьева,%20105"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] text-[var(--accent)] flex items-center gap-1 hover:gap-2 transition-all pointer-events-auto"
                >
                  Открыть в 2GIS <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-1 gap-4">
            <DarkCard className="contact-item p-5 md:p-7" glow="indigo">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-[var(--accent)] shrink-0">
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[11px] text-[var(--muted)] mb-1">Телефон</div>
                  <a href="tel:+77003543772" className="text-xl font-medium tracking-tight hover:text-[var(--accent)] transition">
                    +7 (700) 354-37-72
                  </a>
                </div>
              </div>
            </DarkCard>

            <DarkCard className="contact-item p-5 md:p-7" glow="gold">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-[var(--accent)] shrink-0">
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[11px] text-[var(--muted)] mb-1">Почта приёмной</div>
                  <a href="mailto:info@ekeb.edu.kz" className="text-base font-medium tracking-tight hover:text-[var(--accent)] transition block">
                    info@ekeb.edu.kz
                  </a>
                  <a href="mailto:ekeb@edu.kz" className="text-[13px] text-[var(--muted)] hover:text-foreground transition">
                    ekeb@edu.kz
                  </a>
                </div>
              </div>
            </DarkCard>

            <DarkCard className="contact-item p-5 md:p-7" glow="indigo">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-[var(--accent)] shrink-0">
                  <Clock className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[11px] text-[var(--muted)] mb-1">Часы работы</div>
                  <div className="text-base font-medium tracking-tight">Пн — Пт · 9:00 — 18:00</div>
                  <div className="text-[13px] text-[var(--muted)]">Суббота · по записи</div>
                </div>
              </div>
            </DarkCard>
          </div>
        </div>
      </div>
    </section>
  );
}
