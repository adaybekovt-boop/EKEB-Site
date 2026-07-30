"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Users } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface LeadershipItem {
  name: string;
  role: string;
  department: string;
  bio: string;
  accent?: "indigo" | "warm";
  image?: string;
}

interface DepartmentItem {
  name: string;
  head: string;
  role: string;
  members: number;
  note: string;
  accent?: "indigo" | "warm";
}

type StaffItem = LeadershipItem | DepartmentItem;

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export function StaffGrid({
  items,
  variant,
}: {
  items: StaffItem[];
  variant: "leadership" | "department";
}) {
  return (
    <div
      className={`grid gap-3 md:gap-4 ${
        variant === "leadership"
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {items.map((it, i) =>
        variant === "leadership" ? (
          <LeaderCard key={i} item={it as LeadershipItem} index={i} />
        ) : (
          <DeptCard key={i} item={it as DepartmentItem} index={i} />
        )
      )}
    </div>
  );
}

function LeaderCard({
  item,
  index,
}: {
  item: LeadershipItem;
  index: number;
}) {
  const warm = item.accent === "warm";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: EASE }}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-6 md:p-7 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      />

      <div className="relative aspect-[5/4] rounded-xl overflow-hidden mb-5 border border-white/[0.06]">
        <div
          className="absolute inset-0"
          style={{
            background: warm
              ? "radial-gradient(circle at 40% 30%, rgba(212,165,116,0.35) 0%, transparent 55%), linear-gradient(135deg, #1c1f29 0%, #0e1019 100%)"
              : "radial-gradient(circle at 40% 30%, rgba(97,120,245,0.35) 0%, transparent 55%), linear-gradient(135deg, #15182a 0%, #0e1019 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 28px)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {item.image ? (
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/[0.12] shadow-lg">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover object-top"
                sizes="80px"
                draggable={false}
              />
            </div>
          ) : (
            <span
              className={
                "text-5xl md:text-6xl font-medium tracking-tighter " +
                (warm ? "gradient-warm" : "gradient-text")
              }
            >
              {initials(item.name)}
            </span>
          )}
        </div>
      </div>

      <div className="text-[11.5px] text-[var(--accent)] mb-1.5 tracking-tight">
        {item.department}
      </div>
      <h3 className="text-lg md:text-xl font-medium tracking-tight mb-1 leading-snug">
        {item.name}
      </h3>
      <div className="text-[13px] text-foreground/85 mb-3">{item.role}</div>
      <p className="text-[13px] text-[var(--muted)] leading-relaxed">
        {item.bio}
      </p>
    </motion.div>
  );
}

export interface TeacherItem {
  name: string;
  subject?: string;
  image?: string;
}

export function TeacherGrid({ items }: { items: TeacherItem[] }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
      {items.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border border-white/[0.1] bg-white/[0.03] shrink-0">
            {t.image ? (
              <Image
                src={t.image}
                alt={t.name}
                fill
                className="object-cover object-top"
                sizes="64px"
                draggable={false}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-lg font-medium text-[var(--accent)]">
                {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
            )}
          </div>
          <div className="min-w-0 w-full">
            <div className="text-[11px] md:text-[12px] font-medium tracking-tight leading-tight text-foreground/90 line-clamp-2">
              {t.name}
            </div>
            {t.subject && (
              <div className="text-[10px] text-[var(--muted)] mt-0.5 line-clamp-1">{t.subject}</div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function DeptCard({
  item,
  index,
}: {
  item: DepartmentItem;
  index: number;
}) {
  const warm = item.accent === "warm";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.65, delay: index * 0.05, ease: EASE }}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.16] p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={
            "h-10 w-10 rounded-xl border flex items-center justify-center transition " +
            (warm
              ? "border-[var(--accent-warm)]/30 bg-[var(--accent-warm)]/10 text-[var(--accent-warm)]"
              : "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]")
          }
        >
          <Users className="w-4 h-4" strokeWidth={1.5} />
        </div>
        <span className="text-[11px] font-mono text-[var(--muted)] mt-2">
          {item.members} чел.
        </span>
      </div>
      <h3 className="text-base md:text-lg font-medium tracking-tight mb-2 leading-snug">
        {item.name}
      </h3>
      <div className="mb-3 pb-3 border-b border-white/[0.06]">
        <div className="text-[13px] text-foreground/90">{item.head}</div>
        <div className="text-[11.5px] text-[var(--muted)]">{item.role}</div>
      </div>
      <p className="text-[13px] text-[var(--muted)] leading-relaxed">
        {item.note}
      </p>
    </motion.div>
  );
}
