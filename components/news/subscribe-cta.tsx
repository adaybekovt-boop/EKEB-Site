"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SubscribeCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-32"
    >
      <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] bg-[var(--elevated)] p-8 md:p-16 lg:p-20">
        <div
          aria-hidden
          className="absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(97,120,245,0.35) 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(212,165,116,0.20) 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />

        <div className="relative max-w-3xl">
          <span className="text-[13px] text-[var(--accent)] mb-3 inline-block">
            Подписка
          </span>
          <h3 className="text-[2rem] md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.05] mb-5 md:mb-7">
            Подпишитесь на новости — <br />
            <span className="text-[var(--muted)]">раз в месяц, без спама</span>.
          </h3>
          <p className="text-[15px] md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl mb-7 md:mb-9">
            Дайджест: ключевые события колледжа, открытые наборы, истории
            выпускников и анонсы дней открытых дверей.
          </p>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="inline-flex items-center gap-2.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-5 py-3 text-[13.5px] text-[var(--accent)]"
              >
                <Check className="w-4 h-4" strokeWidth={1.75} />
                Подписка подтверждена. До встречи в письме.
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                onSubmit={submit}
                className="flex flex-col sm:flex-row items-stretch gap-3 max-w-xl"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@mail.kz"
                  className="flex-1 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-3 text-[14px] tracking-tight placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)]/40 focus:bg-white/[0.05] focus:outline-none transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-[13.5px] font-medium tracking-tight hover:bg-white transition-colors duration-300"
                >
                  Подписаться
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
