"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Tier = "high" | "mid" | "low";

interface TierState {
  tier: Tier;
  isMobile: boolean;
  reducedMotion: boolean;
}

const Ctx = createContext<TierState>({
  tier: "low",
  isMobile: true,
  reducedMotion: false,
});

let webGLSupported: boolean | undefined;

function hasWebGL() {
  if (webGLSupported !== undefined) return webGLSupported;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    webGLSupported = Boolean(gl);
    if (gl && "getExtension" in gl) {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    webGLSupported = false;
  }
  return webGLSupported;
}

function detect(): TierState {
  if (typeof window === "undefined") {
    return { tier: "low", isMobile: true, reducedMotion: false };
  }

  const ua = navigator.userAgent;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
    window.innerWidth < 768;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Mid/low signals
  const cores = navigator.hardwareConcurrency ?? 8;
  const mem = (navigator as any).deviceMemory as number | undefined;
  const dpr = window.devicePixelRatio || 1;

  let tier: Tier = "high";
  if (reducedMotion) tier = "low";
  else if (mem && mem <= 2) tier = "low";
  else if (cores <= 2) tier = "low";
  else if (isMobile && (mem ? mem < 6 : true)) tier = "mid";
  else if (cores <= 4) tier = "mid";

  // WebGL probe — no WebGL ⇒ force low
  if (!hasWebGL()) tier = "low";

  // dpr influence — very high dpr on low-mem is bad
  if (tier === "mid" && dpr > 2.5 && (mem ?? 8) < 6) tier = "low";

  return { tier, isMobile, reducedMotion };
}

export function DeviceTierProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TierState>({
    tier: "low",
    isMobile: true,
    reducedMotion: false,
  });

  useEffect(() => {
    const initial = detect();
    setState(initial);
    document.documentElement.dataset.tier = initial.tier;

    let raf = 0;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const next = detect();
      setState((current) =>
        current.tier === next.tier &&
        current.isMobile === next.isMobile &&
        current.reducedMotion === next.reducedMotion
          ? current
          : next
      );
      document.documentElement.dataset.tier = next.tier;
    };
    const onResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };
    window.addEventListener("resize", onResize);
    motionQuery.addEventListener("change", update);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export function useDeviceTier() {
  return useContext(Ctx);
}
