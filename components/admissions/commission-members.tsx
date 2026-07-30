"use client";

import { motion } from "motion/react";
import { Mail, Phone } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface CommissionMember {
  name: string;
  role: string;
  unit?: string;
  email?: string;
  phone?: string;
  hours?: string;
  accent?: "indigo" | "warm";
}

function initials(full: string) {
  const parts = full.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export function CommissionMembers({ items }: { items: CommissionMember[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {items.map((m, i) => (
        <motion.article
          key={m.name}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
          className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-7 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/[0.16] hover:bg-white/[0.04]"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />

          <div className="flex items-start gap-4 mb-5">
            <div
              className={
                "relative h-14 w-14 rounded-2xl border flex items-center justify-center font-medium text-base tracking-tight shrink-0 " +
                (m.accent === "warm"
                  ? "border-[var(--accent-warm)]/30 bg-[var(--accent-warm)]/[0.08] text-[var(--accent-warm)]"
                  : "border-[var(--accent)]/25 bg-[var(--accent)]/[0.08] text-[var(--accent)]")
              }
            >
              {initials(m.name)}
              <span
                aria-hidden
                className={
                  "absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 " +
                  (m.accent === "warm"
                    ? "shadow-[0_0_24px_-6px_rgba(212,165,116,0.55)]"
                    : "shadow-[0_0_24px_-6px_rgba(97,120,245,0.55)]")
                }
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-mono text-[var(--muted)] mb-1 uppercase tracking-wider">
                {m.role}
              </div>
              <h3 className="text-base md:text-lg font-medium tracking-tight leading-snug">
                {m.name}
              </h3>
              {m.unit && (
                <div className="text-[12.5px] text-[var(--muted)] mt-0.5">
                  {m.unit}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 text-[13px]">
            {m.phone && (
              <a
                href={`tel:${m.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2.5 text-foreground/85 hover:text-foreground transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--muted)]" strokeWidth={1.75} />
                <span className="font-mono text-[12.5px]">{m.phone}</span>
              </a>
            )}
            {m.email && (
              <a
                href={`mailto:${m.email}`}
                className="flex items-center gap-2.5 text-foreground/85 hover:text-foreground transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--muted)]" strokeWidth={1.75} />
                <span className="font-mono text-[12.5px]">{m.email}</span>
              </a>
            )}
            {m.hours && (
              <div className="text-[12px] text-[var(--muted)] pt-1">
                {m.hours}
              </div>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
