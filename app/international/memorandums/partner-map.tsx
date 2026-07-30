"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PartnerMap() {
  const countries = [
    { code: "PL", name: "Польша", count: 2, x: "30%", y: "28%" },
    { code: "LV", name: "Латвия", count: 2, x: "55%", y: "20%" },
    { code: "LT", name: "Литва", count: 1, x: "48%", y: "32%" },
    { code: "TR", name: "Турция", count: 2, x: "42%", y: "62%" },
    { code: "UZ", name: "Узбекистан", count: 1, x: "70%", y: "55%" },
    { code: "KZ", name: "Актобе — ЕКЕБ", count: 0, x: "62%", y: "38%" },
  ];

  return (
    <div className="relative rounded-3xl border border-white/[0.08] bg-[var(--elevated)] p-6 md:p-10 overflow-hidden min-h-[420px]">
      <div
        aria-hidden
        className="absolute inset-0 -z-[1] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(97,120,245,0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(212,165,116,0.10) 0%, transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-[1]">
        <div className="text-[12px] font-mono text-[var(--accent)] mb-2">
          partner-network.map
        </div>
        <h3 className="text-2xl md:text-3xl font-medium tracking-tighter leading-tight mb-2">
          География партнёрств
        </h3>
        <p className="text-[14px] text-[var(--muted)] max-w-md">
          Восемь учебных заведений в пяти странах. Колледж в Актобе как центр,
          партнёры — на расстоянии трёх перелётов и одного зум-колла.
        </p>
      </div>

      <div className="relative mt-8 h-[260px]">
        {countries.map((c, i) => {
          const isHome = c.code === "KZ";
          return (
            <motion.div
              key={c.code + "-" + i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: c.x, top: c.y }}
            >
              <div
                className={
                  "rounded-full border px-3 py-1.5 backdrop-blur text-[12px] tracking-tight " +
                  (isHome
                    ? "border-[var(--accent-warm)]/40 bg-[var(--accent-warm)]/10 text-[var(--accent-warm)]"
                    : "border-white/[0.12] bg-white/[0.04] text-foreground/90")
                }
              >
                <span className="font-mono mr-2 text-[var(--accent)]">
                  {c.code}
                </span>
                {c.name}
                {c.count > 0 && (
                  <span className="ml-2 text-[var(--muted)]">×{c.count}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
