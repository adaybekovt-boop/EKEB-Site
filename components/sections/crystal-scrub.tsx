"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowDown } from "lucide-react";
import { useDeviceTier } from "@/lib/device-tier";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
 * Crystal scroll-scrub film — atlas edition.
 *
 * 240 frames packed into 4 webp sprite atlases:
 *   atlas_0: frames 0..59
 *   atlas_1: frames 60..119
 *   atlas_2: frames 120..179
 *   atlas_3: frames 180..239
 *
 * Each atlas is 6 cols × 10 rows of 640×360 cells (3840×3600
 * total), under the 4096 mobile texture cap and under the 16MP
 * iOS Safari image limit. Total payload: ~1.2MB for all 4 files
 * combined.
 *
 * Drawing is GPU-accelerated via drawImage(atlas, sx, sy, sw, sh,
 * dx, dy, dw, dh) — sub-region blits run in <1ms on any device.
 * 60fps on mobile is a non-issue once the atlas is decoded.
 *
 * Atlases load progressively: atlas 0 when section approaches
 * viewport, then 1, 2, 3 in parallel. By the time the user reaches
 * the corresponding frame range, the right atlas is already
 * decoded and resident.
 * ───────────────────────────────────────────────────────────── */

const TOTAL_FRAMES = 240;
const ATLAS_COUNT = 4;
const PER_ATLAS = 60;
const COLS = 6;
const CELL_W = 640;
const CELL_H = 360;
const ATLAS_URLS = [
  "/scrub/atlas_0.webp",
  "/scrub/atlas_1.webp",
  "/scrub/atlas_2.webp",
  "/scrub/atlas_3.webp",
];

const FRAMES_END = 0.72;
// Scroll hint shows on entry, fades out as the crystal starts to come alive.
// Two-stage opacity: ramp up early so it appears once user lands, ramp down
// before the eyebrow begins to reveal so they never overlap.
const T_HINT_IN = [0.0, 0.06] as const;
const T_HINT_OUT = [0.28, 0.45] as const;
const T_EYEBROW = [0.62, 0.74] as const;
const T_HEADLINE = [0.72, 0.9] as const;
const T_SUBLINE = [0.88, 0.96] as const;
const T_ARROW = [0.94, 1.0] as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}
function mapRange(p: number, from: number, to: number) {
  return clamp01((p - from) / (to - from));
}

export function CrystalScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const { tier, isMobile, reducedMotion } = useDeviceTier();

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const canvas = canvasRef.current;
    if (!section || !pin || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    if (isMobile) {
      ScrollTrigger.config({ ignoreMobileResize: true });
    }

    // Internal canvas resolution. Aspect 16:9 matching the atlas cell.
    // Browsers natively scale this up via CSS — one high-quality
    // upscale step instead of a noisy chain.
    const sizeCanvas = () => {
      const TW = 1280;
      const TH = 720;
      if (canvas.width !== TW || canvas.height !== TH) {
        canvas.width = TW;
        canvas.height = TH;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
    };
    sizeCanvas();

    // ── Atlas loading
    const atlases: (HTMLImageElement | null)[] = new Array(ATLAS_COUNT).fill(null);
    let lastFrame = -1;
    let firstDrawn = false;
    let lastHintOpacity = -1;

    const drawFrame = (frameIdx: number) => {
      const i = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIdx));
      const atlasIdx = Math.floor(i / PER_ATLAS);
      const localIdx = i - atlasIdx * PER_ATLAS;
      const atlas = atlases[atlasIdx];
      if (!atlas || !atlas.complete || atlas.naturalWidth === 0) {
        // Fall back to whichever atlas IS ready, if any
        const fallbackAtlas = atlases.find(
          (a) => a && a.complete && a.naturalWidth > 0
        );
        if (!fallbackAtlas) return;
        // Just hold previous frame — don't redraw
        return;
      }

      const col = localIdx % COLS;
      const row = Math.floor(localIdx / COLS);
      const sx = col * CELL_W;
      const sy = row * CELL_H;

      const cw = canvas.width;
      const ch = canvas.height;
      ctx.drawImage(atlas, sx, sy, CELL_W, CELL_H, 0, 0, cw, ch);
    };

    const loadAtlas = (idx: number) =>
      new Promise<void>((resolve) => {
        if (atlases[idx]) return resolve();
        const img = new Image();
        img.decoding = "async";
        img.src = ATLAS_URLS[idx];
        img.onload = () => {
          atlases[idx] = img;
          if (idx === 0 && !firstDrawn) {
            firstDrawn = true;
            drawFrame(0);
          }
          resolve();
        };
        img.onerror = () => resolve();
      });

    // ── Lazy load gate via IntersectionObserver
    let preloadStarted = false;
    const kickOffPreload = async () => {
      if (preloadStarted) return;
      preloadStarted = true;
      // Load atlas 0 first — it's the one needed immediately when scroll
      // starts. Then fan out the rest in parallel — browser handles
      // HTTP/2 multiplexing.
      await loadAtlas(0);
      for (let i = 1; i < ATLAS_COUNT; i++) loadAtlas(i);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            kickOffPreload();
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "100% 0px 100% 0px" }
    );
    io.observe(section);

    // Fallback for very old browsers
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(kickOffPreload, { timeout: 3000 });
    } else {
      setTimeout(kickOffPreload, 1500);
    }

    // ── Text reveal setup
    let split: SplitType | null = null;
    if (headlineRef.current) {
      split = new SplitType(headlineRef.current, { types: "words" });
      gsap.set(split.words, { opacity: 0, y: 36, filter: "blur(10px)" });
    }
    if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 0, y: 14 });
    if (sublineRef.current) gsap.set(sublineRef.current, { opacity: 0, y: 20 });
    if (arrowRef.current) gsap.set(arrowRef.current, { opacity: 0, y: -8 });
    if (hintRef.current) gsap.set(hintRef.current, { opacity: 0, y: 8 });

    // ── ScrollTrigger
    if (isMobile || reducedMotion) {
      void kickOffPreload();
      split?.revert();
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1, y: 0, filter: "none" });
      if (sublineRef.current) gsap.set(sublineRef.current, { opacity: 1, y: 0 });
      if (arrowRef.current) gsap.set(arrowRef.current, { opacity: 1, y: 0 });
      if (hintRef.current) gsap.set(hintRef.current, { opacity: 0 });
      return () => {
        split?.revert();
        io.disconnect();
      };
    }
    const st = ScrollTrigger.create({
      trigger: section,
      start: isMobile ? "center center" : "top top",
      end: () => `+=${Math.round(window.innerHeight * (isMobile ? 3.2 : 3.4))}`,
      pin: pin,
      pinSpacing: true,
      pinType: isMobile ? "fixed" : "transform",
      // Heavier scrub damping so a fast flick doesn't make the sphere
      // teleport through fragmentation — it lerps toward the target
      // frame and reads as continuous motion instead of cuts.
      scrub: isMobile ? 1.1 : 1.2,
      anticipatePin: isMobile ? 0 : 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;

        // 1) Frame scrub — completes by FRAMES_END
        const framePart = clamp01(p / FRAMES_END);
        const frameIdx = Math.floor(framePart * (TOTAL_FRAMES - 1));
        if (frameIdx !== lastFrame) {
          drawFrame(frameIdx);
          lastFrame = frameIdx;
        }

        // 1.5) Scroll hint — appears immediately, fades before reveal.
        // Throttled: skip writes when opacity barely moves AND we're
        // already invisible, so the giant majority of scroll ticks
        // (after the hint has faded) cost zero DOM work.
        if (hintRef.current) {
          const tIn = mapRange(p, T_HINT_IN[0], T_HINT_IN[1]);
          const tOut = 1 - mapRange(p, T_HINT_OUT[0], T_HINT_OUT[1]);
          const opacity = Math.min(tIn, tOut);
          const delta = Math.abs(opacity - lastHintOpacity);
          if (delta > 0.01 || (lastHintOpacity > 0 && opacity === 0)) {
            gsap.set(hintRef.current, {
              opacity,
              y: lerp(8, 0, tIn),
              force3D: true,
            });
            lastHintOpacity = opacity;
          }
        }

        // 2) Eyebrow
        if (eyebrowRef.current) {
          const t = mapRange(p, T_EYEBROW[0], T_EYEBROW[1]);
          gsap.set(eyebrowRef.current, { opacity: t, y: lerp(14, 0, t) });
        }

        // 3) Headline word-by-word
        if (split && split.words) {
          const t = mapRange(p, T_HEADLINE[0], T_HEADLINE[1]);
          const n = split.words.length;
          split.words.forEach((word, i) => {
            const startAt = (i / Math.max(n - 1, 1)) * 0.55;
            const wt = clamp01((t - startAt) / 0.45);
            gsap.set(word, {
              opacity: wt,
              y: lerp(36, 0, wt),
              filter: `blur(${lerp(10, 0, wt)}px)`,
            });
          });
        }

        // 4) Subline
        if (sublineRef.current) {
          const t = mapRange(p, T_SUBLINE[0], T_SUBLINE[1]);
          gsap.set(sublineRef.current, { opacity: t, y: lerp(20, 0, t) });
        }

        // 5) Arrow
        if (arrowRef.current) {
          const t = mapRange(p, T_ARROW[0], T_ARROW[1]);
          gsap.set(arrowRef.current, { opacity: t, y: lerp(-8, 0, t) });
        }
      },
    });

    return () => {
      st.kill();
      split?.revert();
      io.disconnect();
    };
  }, [tier, isMobile, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background)]"
    >
      <div
        ref={pinRef}
        className="relative h-[100svh] md:h-[100dvh] w-full overflow-hidden bg-black flex items-center justify-center"
      >
        {/* Letterboxed canvas — fixed 16:9 window centred in viewport. */}
        <div className="relative w-[min(1400px,95vw)] aspect-[16/9] mx-auto">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            aria-hidden
          />
        </div>

        {/* Page-tone edge feather */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 md:h-32 z-10"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-32 z-10"
          style={{
            background:
              "linear-gradient(to top, var(--background) 0%, transparent 100%)",
          }}
        />

        {/* Text overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5 md:px-10 pointer-events-none text-center">
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 mb-5 md:mb-7"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] idle-glow" />
            <span className="text-[11px] md:text-[11.5px] text-[var(--accent)] tracking-[0.22em] uppercase">
              Следующий шаг
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="font-medium tracking-tighter leading-[0.95] text-white max-w-[16ch] text-[clamp(2.4rem,8.5vw,7rem)]"
          >
            Один выбор — множество путей.
          </h2>

          <p
            ref={sublineRef}
            className="mt-5 md:mt-7 text-[14px] md:text-lg text-white/65 max-w-md leading-relaxed"
          >
            Пять программ. Дуальное обучение. Партнёры со второго курса.
          </p>

          <div
            ref={arrowRef}
            className="mt-8 md:mt-12 flex flex-col items-center gap-2 text-white/45"
          >
            <span className="text-[10.5px] tracking-[0.22em] uppercase">
              Выберите программу
            </span>
            <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
          </div>
        </div>

        {/* Scroll hint — bottom-center, lives only while the crystal is
            spinning, never overlaps with the headline reveal. */}
        <div
          ref={hintRef}
          aria-hidden
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 text-white/55 pointer-events-none"
        >
          <span className="text-[10.5px] md:text-[11px] tracking-[0.22em] uppercase">
            Прокрутите вниз
          </span>
          <span className="relative h-9 w-[18px] rounded-full border border-white/[0.22] overflow-hidden">
            <span className="absolute left-1/2 top-1.5 -translate-x-1/2 h-1.5 w-[2px] rounded-full bg-[var(--accent)] animate-scroll-hint" />
          </span>
        </div>
      </div>
    </section>
  );
}
