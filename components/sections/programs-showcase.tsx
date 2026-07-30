"use client";

import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";

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
