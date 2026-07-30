"use client";

import { motion } from "motion/react";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface ContactBlockProps {
  phone: string;
  email: string;
  address: string;
  hours: { day: string; time: string }[];
}

export function ContactBlock({ phone, email, address, hours }: ContactBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative rounded-3xl border border-white/[0.1] bg-[var(--elevated)] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-24 h-80 w-80 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(97,120,245,0.32) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,165,116,0.22) 0%, transparent 60%)",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-px bg-white/[0.06]">
        {/* Big phone */}
        <div className="lg:col-span-3 bg-[var(--elevated)] p-7 md:p-10">
          <div className="flex items-center gap-2 text-[11.5px] text-[var(--accent)] font-mono uppercase tracking-wider mb-4">
            <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
            Приёмная комиссия
          </div>
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="block text-[2rem] md:text-5xl font-medium tracking-tighter leading-none gradient-text mb-3 hover:opacity-90 transition-opacity"
          >
            {phone}
          </a>
          <p className="text-[13px] text-[var(--muted)] leading-relaxed max-w-md">
            Звоните в рабочие часы — секретарь приёмной комиссии ответит на вопросы
            по подаче документов, экзаменам, проходным баллам и общежитию.
          </p>

          <div className="mt-6 flex items-center gap-2.5 text-[13.5px]">
            <Mail className="w-3.5 h-3.5 text-[var(--muted)]" strokeWidth={1.75} />
            <a
              href={`mailto:${email}`}
              className="font-mono text-foreground/90 hover:text-foreground transition-colors"
            >
              {email}
            </a>
          </div>
        </div>

        {/* Address + hours */}
        <div className="lg:col-span-2 bg-[var(--elevated)] p-7 md:p-10">
          <div className="flex items-center gap-2 text-[11.5px] text-[var(--accent-warm)] font-mono uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5" strokeWidth={1.75} />
            Адрес и часы
          </div>
          <p className="text-[14.5px] md:text-base text-foreground leading-snug mb-6">
            {address}
          </p>

          <div className="flex items-center gap-2 text-[11px] text-[var(--muted)] uppercase tracking-wider mb-3">
            <Clock className="w-3 h-3" strokeWidth={1.75} />
            График работы
          </div>
          <ul className="space-y-1.5">
            {hours.map((h) => (
              <li
                key={h.day}
                className="flex items-baseline justify-between gap-3 text-[13px]"
              >
                <span className="text-[var(--muted)]">{h.day}</span>
                <span className="font-mono text-foreground/90">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
