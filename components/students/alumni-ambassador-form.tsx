"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AlumniAmbassadorForm() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [role, setRole] = useState("");
  const [contact, setContact] = useState("");
  const [help, setHelp] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const helpOptions = [
    "Менторство студентам",
    "Лекция / мастер-класс",
    "Стажировка в моей компании",
    "Помощь в трудоустройстве",
  ];

  const toggle = (opt: string) =>
    setHelp((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !year || !contact) return;
    setState("sending");
    setTimeout(() => setState("sent"), 900);
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-10">
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col items-center text-center py-8"
          >
            <div className="h-12 w-12 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-4">
              <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium tracking-tight mb-1.5">
              Заявка принята
            </h3>
            <p className="text-[13.5px] text-[var(--muted)] max-w-md leading-relaxed">
              Координатор alumni-сети свяжется с вами на этой неделе, чтобы согласовать формат участия.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id="amb-name"
                label="Имя и фамилия"
                value={name}
                onChange={setName}
                placeholder="Айгерим Сериковна"
              />
              <Field
                id="amb-year"
                label="Год выпуска"
                value={year}
                onChange={setYear}
                placeholder="2022"
              />
              <Field
                id="amb-role"
                label="Текущая роль"
                value={role}
                onChange={setRole}
                placeholder="QA Engineer, Kolesa Group"
              />
              <Field
                id="amb-contact"
                label="Контакт"
                value={contact}
                onChange={setContact}
                placeholder="email или Telegram"
              />
            </div>

            <div>
              <label className="block text-[12.5px] uppercase tracking-wider text-[var(--muted)] mb-3">
                Чем готовы помочь
              </label>
              <div className="flex flex-wrap gap-2">
                {helpOptions.map((opt) => {
                  const active = help.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggle(opt)}
                      className={
                        "px-3.5 py-2 rounded-full border text-[12.5px] transition-all duration-300 " +
                        (active
                          ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-foreground"
                          : "border-white/[0.08] bg-white/[0.02] text-foreground/80 hover:border-white/[0.16]")
                      }
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={state === "sending" || !name || !year || !contact}
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-[13.5px] font-medium tracking-tight hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                {state === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Отправляем
                  </>
                ) : (
                  <>
                    Стать амбассадором <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[12.5px] uppercase tracking-wider text-[var(--muted)] mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] focus:bg-white/[0.04] focus:border-[var(--accent)]/40 outline-none px-3.5 py-2.5 text-[14px] text-foreground placeholder:text-[var(--muted)]/60 transition-colors"
      />
    </div>
  );
}
