"use client";

import {
  BriefcaseBusiness,
  Code2,
  Medal,
  Palette,
  UsersRound,
} from "lucide-react";
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";
import { useDeviceTier } from "@/lib/device-tier";

const sections = [
  {
    id: "programming",
    leftLabel: "Код",
    title: "Программирование",
    rightLabel: "Разработка",
    background:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "design",
    leftLabel: "Визуал",
    title: "Дизайн и медиа",
    rightLabel: "Креатив",
    background:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "business",
    leftLabel: "Бизнес",
    title: "Предпринимательство",
    rightLabel: "Стартап",
    background:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "worldskills",
    leftLabel: "Навыки",
    title: "WorldSkills",
    rightLabel: "Чемпионат",
    background:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "dual",
    leftLabel: "Практика",
    title: "Дуальное обучение",
    rightLabel: "Работа",
    background:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80",
  },
];

export function ProgramsShowcase() {
  const { isMobile } = useDeviceTier();

  const mobileIcons = [Code2, Palette, BriefcaseBusiness, Medal, UsersRound];
  if (isMobile) {
    return (
      <section id="programs-showcase" className="relative px-4 py-20 overflow-hidden">
        <div className="mb-8">
          <div className="text-[2.35rem] font-medium tracking-tighter leading-none">{"\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f"}</div>
          <div className="mt-2 text-[11px] text-white/50 tracking-[0.2em] uppercase">{"\u0412\u044b\u0431\u0435\u0440\u0438 \u0441\u0432\u043e\u0439 \u043f\u0443\u0442\u044c"}</div>
        </div>
        <div className="grid gap-3">
          {sections.map((section, index) => {
            const Icon = mobileIcons[index];

            return (
              <div
                key={section.id}
                className="group relative min-h-40 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(130deg,rgba(29,37,89,.92),rgba(14,16,29,.94)_62%,rgba(8,9,10,.98))] p-5"
              >
                <div className="absolute -right-6 -top-7 h-36 w-36 rounded-full border border-[var(--accent)]/20 bg-[radial-gradient(circle,rgba(97,120,245,.3),transparent_64%)]" />
                <div className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[.045] text-[var(--accent)] shadow-[0_12px_38px_rgba(0,0,0,.22)]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="relative flex justify-between pr-16 text-[10px] uppercase tracking-[.16em] text-white/60">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{section.rightLabel}</span>
                </div>
                <div className="relative mt-9">
                  <span className="text-[10px] uppercase tracking-[.18em] text-[var(--accent)]">{section.leftLabel}</span>
                  <h3 className="mt-1.5 max-w-[15rem] text-[clamp(1.45rem,6.7vw,2rem)] leading-[.96] font-medium tracking-tighter text-white break-words">{section.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  return (
    <section id="programs-showcase" className="relative">
      <FullScreenScrollFX
        sections={sections}
        header={
          <>
            <div className="text-[clamp(1.8rem,5vw,3.5rem)] font-medium tracking-tighter leading-[0.95]">
              Направления
            </div>
            <div className="text-[clamp(0.8rem,1.5vw,1rem)] text-white/50 tracking-[0.2em] uppercase mt-2">
              Выбери свой путь
            </div>
          </>
        }
        showProgress
        durations={{ change: 0.7, snap: 800 }}
        colors={{
          text: "rgba(247,248,248,0.92)",
          overlay: "rgba(8,9,10,0.55)",
          pageBg: "#08090a",
          stageBg: "#08090a",
        }}
        fontFamily='var(--font-geist-sans), system-ui, sans-serif'
        style={{ textTransform: "none" }}
      />
    </section>
  );
}
