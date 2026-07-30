"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Marquee } from "../ui/marquee";

const EASE = [0.16, 1, 0.3, 1] as const;

const tierOne = [
  "Kaspi.kz",
  "Air Astana",
  "Народный Банк",
  "Beeline",
  "Kazakhtelecom",
  "Chocofamily",
  "Aktobe Digital",
  "Tabys",
  "Halyk Finance",
  "QazTech",
];

const tierTwo = [
  "WorldSkills KZ",
  "Bilim Foundation",
  "Erasmus+",
  "Cisco Networking",
  "1С-Корпорация",
  "MikroTik",
  "Институт цифровых технологий",
  "АО НИТ",
];

export function Partners() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Counter-parallax: top row drifts one way, bottom the other, headline barely moves
  const yHead = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const xRowA = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const xRowB = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section
      ref={ref}
      id="partners"
      className="relative py-20 md:py-36 overflow-hidden motion-island"
    >
      {/* Aurora glow accents — match Royal vibe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 30%, rgba(97,120,245,0.14) 0%, transparent 60%), radial-gradient(ellipse 45% 40% at 85% 70%, rgba(212,165,116,0.10) 0%, transparent 60%)",
        }}
      />

      {/* Faint dotted constellation behind text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.20) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      <motion.div
        style={{ y: yHead }}
        className="mx-auto max-w-[1400px] px-5 md:px-10 mb-10 md:mb-14"
      >
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
          <motion.div
            initial={{ y: 28, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: EASE }}
            className="col-span-12 md:col-span-7"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] idle-glow" />
              <span className="text-[13px] text-[var(--accent)] tracking-wide">
                Партнёры
              </span>
            </div>
            <h2 className="text-[2rem] md:text-5xl font-medium tracking-tighter leading-[1.05]">
              150+ компаний, где студенты
              <br />
              <span className="gradient-warm">стажируются и работают</span>.
            </h2>
          </motion.div>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
            className="col-span-12 md:col-span-5 md:pb-3"
          >
            <p className="text-[var(--muted)] text-[15px] leading-relaxed max-w-md mb-4">
              По каждому договору — рабочие места под практику, кейсы для
              дипломов и приоритетный канал найма после выпуска. От локального
              бизнеса Актобе до национальных IT-компаний.
            </p>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 text-[12px] text-[var(--muted)] uppercase tracking-wider">
              <span>
                <span className="text-foreground text-base font-medium tracking-tight">
                  150+
                </span>{" "}
                договоров
              </span>
              <span>
                <span className="text-foreground text-base font-medium tracking-tight">
                  34
                </span>{" "}
                национальных бренда
              </span>
              <span>
                <span className="text-foreground text-base font-medium tracking-tight">
                  06
                </span>{" "}
                регионов РК
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Layered marquees — counter-direction + parallax drift */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        className="relative"
      >
        <motion.div style={{ x: xRowA }} className="relative">
          <Marquee items={tierOne} accent />
        </motion.div>
        <motion.div style={{ x: xRowB }} className="relative">
          <Marquee items={tierTwo} />
        </motion.div>

        {/* edge feather on both sides for filmic finish */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[var(--background)] to-transparent z-10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[var(--background)] to-transparent z-10"
        />
      </motion.div>
    </section>
  );
}
