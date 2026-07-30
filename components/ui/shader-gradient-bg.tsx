"use client";

import { useEffect, useMemo, useRef, useState, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "motion/react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
 * GLSL simplex-noise aurora gradient.
 * Custom EKEB scheme adds a 4th color stop for the warm gold the
 * brand uses next to indigo.
 * ───────────────────────────────────────────────────────────── */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Optimised to 2 snoise samples (was 3) — ~33% less fragment shader work.
// Using mediump precision and fixed DPR=1 for mobile headroom.
const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform float uNoiseScale;
  uniform float uIntensity;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;

    // 2 samples instead of 3 — dominant low-frequency shape + fine detail
    float n1 = snoise(vec3(uv * uNoiseScale, uTime * 0.08));
    float n2 = snoise(vec3(uv * uNoiseScale * 1.8 + 4.2, uTime * 0.05 + uScroll * 0.3));

    float noise = n1 * 0.65 + n2 * 0.35;
    noise = noise * 0.5 + 0.5;

    float k = clamp(noise + uScroll * 0.28, 0.0, 1.0);

    vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 0.45, k));
    color = mix(color, uColor3, smoothstep(0.40, 0.78, k));
    color = mix(color, uColor4, smoothstep(0.72, 1.0, k));

    color *= uIntensity;

    float vignette = 1.0 - length((uv - 0.5) * 1.5);
    color *= smoothstep(0.0, 0.85, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export type ShaderScheme = "royal" | "aurora" | "dusk" | "ember";

const COLOR_SCHEMES: Record<
  ShaderScheme,
  { c1: THREE.Color; c2: THREE.Color; c3: THREE.Color; c4: THREE.Color }
> = {
  // EKEB brand palette — deep ink, indigo accent, warm gold, soft cream highlight
  royal: {
    c1: new THREE.Color("#08090a"),
    c2: new THREE.Color("#1a2470"),
    c3: new THREE.Color("#6178f5"),
    c4: new THREE.Color("#d4a574"),
  },
  aurora: {
    c1: new THREE.Color("#0a0f1f"),
    c2: new THREE.Color("#0ea5e9"),
    c3: new THREE.Color("#6366f1"),
    c4: new THREE.Color("#10b981"),
  },
  dusk: {
    c1: new THREE.Color("#0a0a14"),
    c2: new THREE.Color("#5e6ad2"),
    c3: new THREE.Color("#a855f7"),
    c4: new THREE.Color("#ec4899"),
  },
  ember: {
    c1: new THREE.Color("#0a0608"),
    c2: new THREE.Color("#7a1d10"),
    c3: new THREE.Color("#f59e0b"),
    c4: new THREE.Color("#ffe1a8"),
  },
};

function GradientMesh({
  scheme,
  noiseScale,
  intensity,
}: {
  scheme: ShaderScheme;
  noiseScale: number;
  intensity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();

  const uniforms = useMemo(() => {
    const s = COLOR_SCHEMES[scheme];
    return {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColor1: { value: s.c1 },
      uColor2: { value: s.c2 },
      uColor3: { value: s.c3 },
      uColor4: { value: s.c4 },
      uNoiseScale: { value: noiseScale },
      uIntensity: { value: intensity },
    };
  }, [scheme, noiseScale, intensity]);

  const frameCount = useRef(0);
  useFrame((_, delta) => {
    frameCount.current++;
    // Update time every frame but only sample scroll every 2 frames
    uniforms.uTime.value += delta * 0.9;
    if (frameCount.current % 2 === 0) {
      uniforms.uScroll.value = scrollYProgress.get();
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface ShaderGradientBgProps {
  children?: ReactNode;
  scheme?: ShaderScheme;
  noiseScale?: number;
  intensity?: number;
  glassIntensity?: "none" | "soft" | "strong";
  className?: string;
  /** When true, render a static CSS fallback instead of the WebGL canvas */
  fallback?: boolean;
}

export function ShaderGradientBg({
  children,
  scheme = "royal",
  noiseScale = 1.6,
  intensity = 1.0,
  glassIntensity = "none",
  className,
  fallback = false,
}: ShaderGradientBgProps) {
  if (fallback) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <div className="absolute inset-0 -z-10 gradient-bg-fallback" />
        {children}
      </div>
    );
  }

  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 -z-10">
        <Canvas
          frameloop={inView ? "always" : "demand"}
          camera={{ position: [0, 0, 1], fov: 75 }}
          dpr={1}
          gl={{ antialias: false, powerPreference: "low-power" }}
        >
          <GradientMesh
            scheme={scheme}
            noiseScale={noiseScale}
            intensity={intensity}
          />
        </Canvas>
      </div>

      {glassIntensity !== "none" && (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-[5]",
            glassIntensity === "soft"
              ? "backdrop-blur-[48px] backdrop-saturate-[1.6]"
              : "backdrop-blur-[72px] backdrop-saturate-[2.0]"
          )}
        />
      )}

      {children}
    </div>
  );
}
