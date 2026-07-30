"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";

const EmploymentChart = dynamic(
  () => import("@/components/sections/_employment-chart").then((mod) => mod.EmploymentChart),
  { ssr: false }
);

const EASE = [0.16, 1, 0.3, 1] as const;

export function EmploymentCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
      <ChartCard
        title="Доля трудоустроенных выпускников"
        hint="через 3 месяца после защиты диплома"
        accent="indigo"
      >
        <EmploymentChart kind="rate" />
      </ChartCard>
      <ChartCard
        title="Средний оффер junior-специалиста"
        hint="первая полная ставка после выпуска, тыс. ₸"
        accent="warm"
      >
        <EmploymentChart kind="salary" />
      </ChartCard>
    </div>
  );
}

function ChartCard({
  title,
  hint,
  accent,
  children,
}: {
  title: string;
  hint: string;
  accent: "indigo" | "warm";
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6"
    >
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <div>
          <h3 className="text-[14.5px] font-medium tracking-tight">{title}</h3>
          <p className="text-[11.5px] text-[var(--muted)] mt-0.5">{hint}</p>
        </div>
        <span
          className={
            "h-2 w-2 rounded-full " +
            (accent === "warm" ? "bg-[var(--accent-warm)]" : "bg-[var(--accent)]")
          }
        />
      </div>
      <div className="h-[220px] md:h-[260px]">{children}</div>
    </motion.div>
  );
}
