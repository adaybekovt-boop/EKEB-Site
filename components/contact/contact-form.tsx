"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Send, Check } from "lucide-react";
import { DarkCard } from "@/components/ui/dark-card";

const EASE = [0.16, 1, 0.3, 1] as const;

const TOPICS = [
  { value: "admissions", label: "Приёмная комиссия" },
  { value: "student", label: "Вопрос студенту" },
  { value: "partnership", label: "Партнёрство" },
  { value: "other", label: "Другое" },
];

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    topic: TOPICS[0].value,
    message: "",
  });
  const [topicOpen, setTopicOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const topicLabel =
    TOPICS.find((t) => t.value === form.topic)?.label ?? TOPICS[0].label;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((s) => ({ ...s, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    // demo only — no backend
  };

  const inputClass =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[14px] tracking-tight placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)]/40 focus:bg-white/[0.04] focus:outline-none transition-colors duration-300";

  return (
    <DarkCard className="p-6 md:p-9" glow="indigo">
      <div className="mb-6 md:mb-8">
        <div className="text-[12.5px] text-[var(--accent)] mb-2">
          Форма обратной связи
        </div>
        <h3 className="text-xl md:text-3xl font-medium tracking-tighter leading-tight">
          Напишите нам — ответим в течение дня.
        </h3>
      </div>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col items-center text-center py-8 md:py-12"
          >
            <div className="h-14 w-14 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-4">
              <Check className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <h4 className="text-lg md:text-xl font-medium tracking-tight mb-2">
              Сообщение отправлено
            </h4>
            <p className="text-[13.5px] text-[var(--muted)] max-w-sm">
              Спасибо. Приёмная комиссия ответит на указанную почту в течение
              рабочего дня.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setForm({
                  name: "",
                  email: "",
                  topic: TOPICS[0].value,
                  message: "",
                });
              }}
              className="mt-6 text-[12.5px] text-[var(--accent)] hover:text-foreground transition-colors"
            >
              Отправить ещё одно
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            onSubmit={submit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[var(--muted)] mb-1.5 block uppercase tracking-wider">
                  Имя
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Айгерим"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-[11px] text-[var(--muted)] mb-1.5 block uppercase tracking-wider">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@mail.kz"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[11px] text-[var(--muted)] mb-1.5 block uppercase tracking-wider">
                Тема
              </label>
              <button
                type="button"
                onClick={() => setTopicOpen((o) => !o)}
                className={inputClass + " flex items-center justify-between text-left"}
                aria-expanded={topicOpen}
              >
                <span>{topicLabel}</span>
                <ChevronDown
                  className={
                    "w-4 h-4 text-[var(--muted)] transition-transform duration-300 " +
                    (topicOpen ? "rotate-180" : "")
                  }
                  strokeWidth={1.75}
                />
              </button>
              <AnimatePresence>
                {topicOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="absolute z-20 mt-2 left-0 right-0 rounded-xl border border-white/[0.1] bg-[var(--elevated)] p-1.5 shadow-xl"
                  >
                    {TOPICS.map((t) => {
                      const active = t.value === form.topic;
                      return (
                        <li key={t.value}>
                          <button
                            type="button"
                            onClick={() => {
                              update("topic", t.value);
                              setTopicOpen(false);
                            }}
                            className={
                              "w-full text-left px-3 py-2 rounded-lg text-[13.5px] tracking-tight transition-colors " +
                              (active
                                ? "bg-white/[0.06] text-foreground"
                                : "text-foreground/85 hover:bg-white/[0.04]")
                            }
                          >
                            {t.label}
                          </button>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="text-[11px] text-[var(--muted)] mb-1.5 block uppercase tracking-wider">
                Сообщение
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Коротко опишите вопрос. Если про абитуриента — укажите специальность и базу (9/11 кл.)."
                className={inputClass + " resize-none"}
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <p className="text-[11.5px] text-[var(--muted)] max-w-xs leading-relaxed">
                Отправляя форму, вы соглашаетесь на обработку персональных данных.
              </p>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-[13px] font-medium tracking-tight hover:bg-white transition-colors duration-300"
              >
                Отправить
                <Send className="w-3.5 h-3.5" strokeWidth={1.75} />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </DarkCard>
  );
}
