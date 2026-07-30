"use client";

import { ReactNode, useEffect } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Touch devices get native scroll (syncTouch on iOS Safari causes janky
    // momentum + breaks pull-to-refresh). Keep smooth Lenis only on pointer.
    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isCoarse || reducedMotion) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([lenisModule, gsapModule, scrollTriggerModule]) => {
      if (disposed) return;
      const Lenis = lenisModule.default;
      const { gsap } = gsapModule;
      const { ScrollTrigger } = scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.07,
        wheelMultiplier: 1,
        syncTouch: false,
        smoothWheel: true,
        autoRaf: false,
      });
      const update = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);
      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(update);
        lenis.destroy();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
