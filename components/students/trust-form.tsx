"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Send,
  Lock,
} from "lucide-react";
import { DarkCard } from "@/components/ui/dark-card";

const EASE = [0.16, 1, 0.3, 1] as const;

type Category =
  | "academic"
  | "teacher"
  | "facility"
  | "other";

const categories: { id: Category; label: string; hint: string }[] = [
  {
    id: "academic",
    label: "Учебный процесс",
    hint: "расписание, нагрузка, оценивание",
  },
  {
    id: "teacher",
    label: "Поведение преподавателя",
    hint: "грубость, предвзятость, опоздания",
  },
  {
    id: "facility",
    label: "Бытовое",
    hint: "общежитие, столовая, санузлы, оборудование",
  },
  {
    id: "other",
    label: "Другое",
    hint: "идеи, предложения, благодарности",
  },
];

export function TrustForm() {
  const [category, setCategory] = useState<Category>("academic");
  const [text, setText] = useState("");
  const [contact, setContact] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 20) return;
    setState("sending");
    setTimeout(() => setState("sent"), 900);
  };

  const remaining = 1500 - text.length;

  return (
    <DarkCard glow="indigo" className="p-6 md:p-10">
      <AnimatePresence mode="wait">
          {state === "sent" ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col items-center text-center py-8 md:py-12"
            >
              <div className="h-14 w-14 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-5">
                <CheckCircle2 className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2">
                Обращение зарегистрировано
              </h3>
              <p className="text-[14px] text-[var(--muted)] leading-relaxed max-w-md">
                Номер заявки сформирован и передан директору напрямую.
                Если вы оставили контакт — ответ придёт в течение 7 рабочих дней.
              </p>
              <button
                onClick={() => {
                  setState("idle");
                  setText("");
                  setContact("");
                }}
                className="mt-6 text-[13px] text-[var(--accent)] hover:text-foreground transition-colors"
              >
                Отправить ещё одно
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="space-y-7"
            >
              <div className="flex items-start gap-3 text-[12.5px] text-[var(--muted)]">
                <Lock className="w-4 h-4 mt-0.5 text-[var(--accent)] shrink-0" strokeWidth={1.5} />
                <span>
                  Сообщение шифруется и попадает напрямую к директору.
                  Преподаватели, кураторы и сотрудники приёмной комиссии не имеют доступа.
                </span>
              </div>

              <div>
                <label className="block text-[12.5px] uppercase tracking-wider text-[var(--muted)] mb-3">
                  Категория обращения
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {categories.map((c) => {
                    const active = category === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCategory(c.id)}
                        className={
                          "text-left rounded-xl border p-3.5 transition-all duration-300 " +
                          (active
                            ? "border-[var(--accent)]/50 bg-[var(--accent)]/10"
                            : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16]")
                        }
                      >
                        <div
                          className={
                            "text-[14px] font-medium tracking-tight mb-1 " +
                            (active ? "text-foreground" : "text-foreground/85")
                          }
                        >
                          {c.label}
                        </div>
                        <div className="text-[12px] text-[var(--muted)] leading-snug">
                          {c.hint}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="trust-text"
                  className="block text-[12.5px] uppercase tracking-wider text-[var(--muted)] mb-3"
                >
                  Опишите ситуацию
                </label>
                <textarea
                  id="trust-text"
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 1500))}
                  rows={6}
                  placeholder="Что произошло? Когда? Кто был участником? Чем вам это мешает?"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] focus:bg-white/[0.04] focus:border-[var(--accent)]/40 outline-none p-4 text-[14px] leading-relaxed text-foreground placeholder:text-[var(--muted)]/60 resize-y transition-colors"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11.5px] text-[var(--muted)]">
                    минимум 20 символов
                  </span>
                  <span className="text-[11.5px] font-mono text-[var(--muted)]">
                    {remaining}
                  </span>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-white/[0.04] accent-[var(--accent)]"
                  />
                  <span className="text-[13.5px] text-foreground/85 leading-snug">
                    Отправить анонимно
                    <span className="block text-[12px] text-[var(--muted)] mt-0.5">
                      Без анонимности директор сможет вернуться к вам с уточнениями
                    </span>
                  </span>
                </label>
              </div>

              {!anonymous && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <label
                    htmlFor="trust-contact"
                    className="block text-[12.5px] uppercase tracking-wider text-[var(--muted)] mb-3"
                  >
                    Контакт для ответа
                  </label>
                  <input
                    id="trust-contact"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="email или Telegram @username"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] focus:bg-white/[0.04] focus:border-[var(--accent)]/40 outline-none p-3.5 text-[14px] text-foreground placeholder:text-[var(--muted)]/60 transition-colors"
                  />
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-[12px] text-[var(--muted)]">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent-warm)]" strokeWidth={1.5} />
                  <span>Срок рассмотрения — до 14 рабочих дней</span>
                </div>
                <button
                  type="submit"
                  disabled={state === "sending" || text.trim().length < 20}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-[14px] font-medium tracking-tight transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {state === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Отправляем
                    </>
                  ) : (
                    <>
                      Отправить директору <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
    </DarkCard>
  );
}
