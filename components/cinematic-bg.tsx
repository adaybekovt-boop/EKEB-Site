"use client";

import { useEffect, useRef } from "react";
import { useDeviceTier } from "@/lib/device-tier";

/**
 * Reactive black-and-white ambient background.
 * - Soft drifting white blobs (subtle parallax via scroll)
 * - Light following the pointer (mouse + touch)
 * - Tap/click ripples
 * - Throttled to ~30 fps, low DPR (0.55x), auto-pauses on tab hidden
 * - Pointer-events disabled, fully decorative
 */
export function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isMobile, tier } = useDeviceTier();

  useEffect(() => {
    // Skip the global ambient canvas entirely on mobile / low tier —
    // the hero CSS aurora fallback already supplies depth, and one
    // fewer always-on canvas keeps mobile at 60fps.
    if (isMobile || tier === "low") return;
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctxRaw = canvasEl.getContext("2d", { alpha: true });
    if (!ctxRaw) return;
    // narrow to non-null inside closures
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctxRaw;

    // ── Config ───────────────────────────────────────────────
    const DPR = Math.min(window.devicePixelRatio || 1, 2) * 0.55;
    const TARGET_FPS = 30;
    const FRAME_MS = 1000 / TARGET_FPS;
    const BLOB_COUNT = 7;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── State ────────────────────────────────────────────────
    let width = 0;
    let height = 0;
    let scrollY = window.scrollY || 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let pointerX = targetX;
    let pointerY = targetY;
    let lastFrame = performance.now();
    let rafId = 0;
    let visible = !document.hidden;

    type Blob = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
      phase: number;
    };
    const blobs: Blob[] = Array.from({ length: BLOB_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
      r: 0.22 + Math.random() * 0.28,
      a: 0.035 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2,
    }));

    type Ripple = { x: number; y: number; t: number; max: number };
    const ripples: Ripple[] = [];

    // ── Resize ───────────────────────────────────────────────
    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.max(1, Math.floor(w * DPR));
      canvas.height = Math.max(1, Math.floor(h * DPR));
      width = w;
      height = h;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    }

    // ── Input ────────────────────────────────────────────────
    function onMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
    }
    function onTap(e: PointerEvent) {
      if (reduceMotion) return;
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        t: 0,
        max: Math.max(width, height) * 0.55,
      });
      if (ripples.length > 5) ripples.shift();
    }
    function onScroll() {
      scrollY = window.scrollY || 0;
    }
    function onVisibility() {
      visible = !document.hidden;
      if (visible) {
        lastFrame = performance.now();
        if (!rafId) rafId = requestAnimationFrame(loop);
      } else if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    // ── Loop ─────────────────────────────────────────────────
    function loop(now: number) {
      rafId = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = now - lastFrame;
      if (dt < FRAME_MS) return;
      lastFrame = now;

      // Pointer lerp
      pointerX += (targetX - pointerX) * 0.08;
      pointerY += (targetY - pointerY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Drifting blobs
      const scrollShift = (scrollY * 0.00045) % 1;
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        b.x += b.vx;
        b.y += b.vy;
        b.phase += 0.004;
        if (b.x < -0.1 || b.x > 1.1) b.vx *= -1;
        if (b.y < -0.1 || b.y > 1.1) b.vy *= -1;

        const cx = (b.x + Math.sin(b.phase) * 0.04) * width;
        let cy = ((b.y + scrollShift + Math.cos(b.phase) * 0.03) % 1) * height;
        if (cy < 0) cy += height;
        const rad = b.r * Math.min(width, height);
        const a = b.a * (0.85 + Math.sin(b.phase) * 0.15);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        grad.addColorStop(0, `rgba(255,255,255,${a.toFixed(3)})`);
        grad.addColorStop(0.6, `rgba(255,255,255,${(a * 0.25).toFixed(3)})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Pointer light
      {
        const rad = 260;
        const a = 0.16;
        const g = ctx.createRadialGradient(pointerX, pointerY, 0, pointerX, pointerY, rad);
        g.addColorStop(0, `rgba(255,255,255,${a})`);
        g.addColorStop(0.5, "rgba(255,255,255,0.05)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.t += dt;
        const p = Math.min(1, r.t / 1100);
        if (p >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        const eased = 1 - Math.pow(1 - p, 3);
        const radius = r.max * eased;
        const a = 0.28 * (1 - p);
        ctx.strokeStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // ── Mount ────────────────────────────────────────────────
    resize();
    if (!reduceMotion) {
      rafId = requestAnimationFrame(loop);
    } else {
      // single static paint for reduced motion
      lastFrame = performance.now() - FRAME_MS;
      loop(performance.now());
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onTap, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onTap);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isMobile, tier]);

  if (isMobile || tier === "low") return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 select-none"
      style={{ touchAction: "none" }}
    />
  );
}
