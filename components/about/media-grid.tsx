"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Newspaper, Radio, Tv, Mic } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface MediaItem {
  outlet: string;
  date: string;
  type: "Статья" | "Видео" | "Подкаст" | "Сюжет";
  title: string;
  excerpt: string;
  href: string;
  accent?: "indigo" | "warm";
  coverImage?: string;
}

const typeIcon = {
  Статья: Newspaper,
  Видео: Tv,
  Подкаст: Mic,
  Сюжет: Radio,
};

export function MediaGrid({ items }: { items: MediaItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {items.map((m, i) => {
        const Icon = typeIcon[m.type];
        const warm = m.accent === "warm";
        return (
          <motion.a
            key={`${m.outlet}-${m.title}`}
            href={m.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
            className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
            />

            {/* Cover */}
            <div className="relative h-40 md:h-44 overflow-hidden border-b border-white/[0.06]">
              {m.coverImage ? (
                <>
                  <Image
                    src={m.coverImage}
                    alt={m.outlet}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    draggable={false}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: warm
                        ? "linear-gradient(135deg, rgba(212,165,116,0.25) 0%, rgba(8,9,10,0.5) 100%)"
                        : "linear-gradient(135deg, rgba(97,120,245,0.25) 0%, rgba(8,9,10,0.5) 100%)",
                    }}
                  />
                </>
              ) : (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: warm
                        ? "radial-gradient(ellipse at 30% 20%, rgba(212,165,116,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(97,120,245,0.12) 0%, transparent 55%)"
                        : "radial-gradient(ellipse at 30% 20%, rgba(97,120,245,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(212,165,116,0.10) 0%, transparent 55%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.18]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                      maskImage:
                        "radial-gradient(ellipse at center, black 30%, transparent 80%)",
                    }}
                  />
                </>
              )}
              <div className="relative h-full flex items-center justify-between p-5">
                <div className="text-2xl md:text-3xl font-medium tracking-tighter leading-none text-foreground/90 max-w-[70%]">
                  {m.outlet}
                </div>
                <div
                  className={
                    "h-10 w-10 rounded-xl border border-white/[0.08] bg-[var(--background)]/60 backdrop-blur-sm flex items-center justify-center " +
                    (warm ? "text-[var(--accent-warm)]" : "text-[var(--accent)]")
                  }
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 md:p-6 flex-1 flex flex-col">
              <div className="flex items-baseline gap-2 mb-3 text-[11px] font-mono uppercase tracking-wider text-[var(--muted)]">
                <span>{m.type}</span>
                <span className="text-[var(--muted)]/50">·</span>
                <span>{m.date}</span>
              </div>
              <h3 className="text-[15px] md:text-base font-medium tracking-tight leading-snug mb-2">
                {m.title}
              </h3>
              <p className="text-[13px] text-[var(--muted)] leading-relaxed flex-1">
                {m.excerpt}
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] text-foreground/70 group-hover:text-[var(--accent)] transition-colors">
                Читать полностью
                <ArrowUpRight
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500"
                  strokeWidth={1.75}
                />
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
