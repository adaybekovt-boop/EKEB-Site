"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./ui/magnetic-button";
import { AnimatedNumber } from "./ui/animated-number";
import { SplineRobot } from "./ui/spline-robot";
import { MobileSmokeBg } from "./ui/mobile-smoke-bg";
import { useDeviceTier } from "@/lib/device-tier";

const ShaderGradientBg = dynamic(
  () => import("./ui/shader-gradient-bg").then((mod) => mod.ShaderGradientBg),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 gradient-bg-fallback" aria-hidden />
    ),
  }
);

const EASE = [0.16, 1, 0.3, 1] as const;
const headlineLines = ["Колледж,", "после которого", "берут на работу."];

// One-switch rollback: set to false to restore the original hero image
// and animated WebGL shader without changing the component structure.
const USE_CALM_GLOBAL_GRADIENT = true;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { tier, isMobile, reducedMotion } = useDeviceTier();

  // Enable the aurora shader on mid+ tier including mobile — it's the
  // primary backdrop for the rotating crest, and without it the logo
  // gets lost against the dark background on phones. CSS fallback for
  // low-tier or reduced-motion users (still bright indigo blobs).
  const useShader = tier !== "low" && !reducedMotion;

  return (
    <section
      ref={root}
      className="relative min-h-[100dvh] overflow-hidden motion-island"
    >
      {/* Atmospheric hero image — visible under the shader on desktop,
          primary background on mobile where shader is disabled. */}
      {!USE_CALM_GLOBAL_GRADIENT && <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero_abstract.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#08090a]/80 via-[#08090a]/40 to-transparent" />
      </div>}

      {/* Aurora shader background — autonomous animation */}
      {!USE_CALM_GLOBAL_GRADIENT && (useShader ? (
        <ShaderGradientBg
          scheme="royal"
          noiseScale={1.6}
          intensity={1.0}
          className="absolute inset-0"
        />
      ) : (
        <div className="absolute inset-0 gradient-bg-fallback" aria-hidden />
      ))}

      {/* Faint dotted grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* 3D robot — right side on desktop so it doesn't sit behind text */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="absolute inset-x-[-18%] top-[-5%] h-[56svh] md:inset-0 md:left-[30%] md:h-auto z-0"
      >
        {isMobile ? <MobileSmokeBg className="w-full h-full" /> : <SplineRobot className="w-full h-full" />}
      </motion.div>

      {/* legibility mask */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, var(--background) 0%, var(--background) 22%, rgba(8,9,10,0.85) 38%, rgba(8,9,10,0.35) 58%, transparent 78%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,9,10,0.15) 0%, rgba(8,9,10,0.05) 25%, rgba(8,9,10,0.15) 55%, rgba(8,9,10,0.62) 82%, var(--background) 100%)",
        }}
      />

      {/* gradient floor */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-[var(--background)] via-[var(--background)]/70 to-transparent z-[2]" />

      {/* content — all entrance animations are mount-time, not scroll */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-5 md:px-10 pt-[47svh] md:pt-44 pb-10 md:pb-24 min-h-[100dvh] flex flex-col justify-between pointer-events-none">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="inline-flex items-center gap-2 mb-5 md:mb-8 pl-1.5 pr-3 py-1.5 max-w-full rounded-full border border-white/[0.1] bg-black/25 backdrop-blur-sm"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)]/15">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] idle-glow" />
            </span>
            <span className="text-[11.5px] sm:text-[13px] text-foreground/85 truncate">
              Набор 2026 открыт — Актобе
            </span>
          </motion.div>

          <h1 className="font-medium tracking-[-0.045em] leading-[0.96] text-[clamp(2.35rem,11vw,9rem)] mb-5 md:mb-10 text-white">
            {headlineLines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.4,
                  delay: 0.35 + i * 0.18,
                  ease: EASE,
                }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ y: 26, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.3, delay: 1.05, ease: EASE }}
            className="text-[14px] sm:text-[15px] md:text-xl text-white/65 max-w-2xl leading-relaxed mb-6 md:mb-10"
          >
            Европейский высший колледж цифровых технологий и
            предпринимательства в Актобе. Дуальное обучение, WorldSkills,
            бизнес-инкубатор и стажировки у партнёров — со второго курса.
          </motion.p>

          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 1.4, ease: EASE }}
            className="grid grid-cols-1 min-[430px]:grid-cols-2 md:flex md:flex-wrap items-center gap-2.5 md:gap-3 [&>a]:w-full md:[&>a]:w-auto [&>a]:justify-center"
          >
            <MagneticButton href="#programs" className="pointer-events-auto">
              Выбрать специальность <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton href="#about" variant="ghost" className="pointer-events-auto">
              О колледже <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>

        <div className="mt-10 md:mt-auto grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-7 md:gap-8 pt-7 md:pt-16 border-t border-white/[0.08]">
          {([
            { kind: "num", value: 12, suffix: "+", label: "специальностей" },
            { kind: "text", text: "WorldSkills", label: "сертифицированный центр" },
            { kind: "num", value: 150, suffix: "+", label: "партнёров-работодателей" },
            { kind: "num", value: 94, suffix: "%", label: "трудоустройство выпускников" },
          ] as const).map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.0,
                delay: 1.6 + i * 0.12,
                ease: EASE,
              }}
              className="flex flex-col gap-1"
            >
              {m.kind === "num" ? (
                <AnimatedNumber
                  value={m.value}
                  suffix={m.suffix}
                  startDelay={1700 + i * 120}
                  className="text-xl sm:text-2xl md:text-4xl font-medium tracking-tight text-white tabular-nums"
                />
              ) : (
                <span className="text-lg sm:text-2xl md:text-4xl font-medium tracking-tight text-white break-words">
                  {m.text}
                </span>
              )}
              <span className="text-[11px] sm:text-[12.5px] text-[var(--muted)] tracking-wide leading-snug">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* corner ticker */}
      <div className="hidden md:flex absolute bottom-6 right-10 z-10 items-center gap-2 text-[11px] text-[var(--muted)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] idle-glow" />
        Приём документов открыт
      </div>

      {/* subtle scroll cue — only on desktop, fades after first scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2.6, ease: EASE }}
        aria-hidden
        className="hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-[var(--muted)]"
      >
        <span className="text-[10.5px] tracking-[0.18em] uppercase">
          Прокрутите
        </span>
        <span className="relative h-9 w-[18px] rounded-full border border-white/[0.18] overflow-hidden">
          <span className="absolute left-1/2 top-1.5 -translate-x-1/2 h-1.5 w-[2px] rounded-full bg-[var(--accent)] animate-scroll-hint" />
        </span>
      </motion.div>
    </section>
  );
}
