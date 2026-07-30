"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Environment, PerformanceMonitor } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValue, useSpring } from "motion/react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

/* ─────────────────────────────────────────────────────────────
 * 3D-extruded SVG crest.
 *
 * SVGLoader → for each filled <path> create ExtrudeGeometry, give it
 * a PBR material whose color matches the path fill. Result: a real
 * volumetric crest, not a flat plane.
 *
 * Heraldic gold rings are added in Three.js as TorusGeometry — they
 * don't survive SVGLoader well as strokes, and TorusGeometry gives a
 * crisper rim than an extruded thin annulus.
 *
 * All animation is auto / time-driven. No scroll dependence.
 * ───────────────────────────────────────────────────────────── */

function colorMaterial(hex: string): THREE.MeshPhysicalMaterial {
  const c = new THREE.Color(hex);
  // The black lion body: highly polished obsidian feel.
  // The red mane: emissive ember.
  // The gold accents: heraldic gold.
  const lum = c.r * 0.299 + c.g * 0.587 + c.b * 0.114;
  const isBlack = lum < 0.12;
  const isRed = c.r > 0.5 && c.g < 0.3 && c.b < 0.3;
  const isGold = c.r > 0.7 && c.g > 0.5 && c.b < 0.6;

  if (isBlack) {
    return new THREE.MeshPhysicalMaterial({
      color: "#080808",
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      side: THREE.DoubleSide,
    });
  }
  if (isRed) {
    return new THREE.MeshPhysicalMaterial({
      color: "#c8261a",
      emissive: "#7a0d05",
      emissiveIntensity: 0.6,
      metalness: 0.35,
      roughness: 0.4,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide,
    });
  }
  if (isGold) {
    return new THREE.MeshPhysicalMaterial({
      color: "#ffd97a",
      emissive: "#d4a574",
      emissiveIntensity: 0.55,
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    });
  }
  return new THREE.MeshPhysicalMaterial({
    color: c,
    metalness: 0.5,
    roughness: 0.3,
    clearcoat: 0.8,
    side: THREE.DoubleSide,
  });
}

function SvgCrest3D({
  mx,
  my,
  isMobile,
}: {
  mx: any;
  my: any;
  isMobile: boolean;
}) {
  const data = useLoader(SVGLoader, "/crest.svg");

  const group = useMemo(() => {
    // 1) Build the extruded meshes into a child group at native SVG scale
    const inner = new THREE.Group();
    data.paths.forEach((path: any) => {
      const fillColor: string | undefined = path.userData?.style?.fill;
      if (!fillColor || fillColor === "none") return;

      const material = colorMaterial(fillColor);
      const shapes = SVGLoader.createShapes(path);

      shapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 8,
          bevelEnabled: true,
          bevelThickness: 1.6,
          bevelSize: 1.2,
          bevelSegments: isMobile ? 1 : 3,
          curveSegments: isMobile ? 6 : 10,
        });
        inner.add(new THREE.Mesh(geometry, material));
      });
    });

    // 2) Wrap it in a `root` group — root holds the Y-flip + scale + center
    const root = new THREE.Group();
    root.add(inner);

    // 3) Compute the size of the SVG content in its native coordinate
    //    system (before any scale), then derive a uniform scale factor
    //    so the longest side becomes `target` world-units.
    const nativeBox = new THREE.Box3().setFromObject(inner);
    const nativeSize = nativeBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(nativeSize.x, nativeSize.y);
    const target = 2.4; // sits cleanly inside ring radius 2.5
    const s = target / Math.max(maxDim, 0.0001);
    root.scale.set(s, -s, s); // flip Y because SVG is top-down

    // 4) Re-measure in WORLD space (i.e. after scale) and offset the
    //    inner group so the visible content is centred on origin.
    const worldBox = new THREE.Box3().setFromObject(root);
    const worldCenter = worldBox.getCenter(new THREE.Vector3());
    // Move inner in its own (unscaled) coordinate system to cancel the
    // world-center offset.
    inner.position.x -= worldCenter.x / root.scale.x;
    inner.position.y -= worldCenter.y / root.scale.y;
    inner.position.z -= worldCenter.z / root.scale.z;

    return root;
  }, [data, isMobile]);

  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    // AUTO rotation — calmer pace
    ref.current.rotation.y = t * 0.18 + mx.get() * 0.22;
    ref.current.rotation.x = Math.sin(t * 0.22) * 0.1 + my.get() * 0.16;
    ref.current.rotation.z = Math.sin(t * 0.15) * 0.03;

    // Idle bob + light scale breathing — slower
    ref.current.position.y = Math.sin(t * 0.42) * 0.05;
    const breathing = 1 + Math.sin(t * 0.3) * 0.018;
    ref.current.scale.setScalar(breathing);
  });

  return (
    <group ref={ref}>
      <primitive object={group} />
    </group>
  );
}

/* ─── Heraldic gold rings (front + back) ───────────────────── */
const RING_OUTER_R = 2.6;
const RING_INNER_R = 2.45;

function HeraldicRings() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Slower auto spin
    ref.current.rotation.z = t * 0.035;
    ref.current.rotation.y = Math.sin(t * 0.18) * 0.05;
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0, -0.05]}>
        <torusGeometry args={[RING_OUTER_R, 0.055, 16, 64]} />
        <meshPhysicalMaterial
          color="#ffd97a"
          emissive="#d4a574"
          emissiveIntensity={0.6}
          metalness={0.95}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.1}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0, -0.05]}>
        <torusGeometry args={[RING_INNER_R, 0.02, 8, 48]} />
        <meshPhysicalMaterial
          color="#d4a574"
          emissive="#7a5a32"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ─── 3D star geometry ─────────────────────────────────────── */
function makeStarShape(outer = 0.42, inner = 0.18) {
  const shape = new THREE.Shape();
  const points = 5;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function Star({
  angle,
  baseRadius,
  index,
}: {
  angle: number;
  baseRadius: number;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(makeStarShape(), {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 2,
      curveSegments: 5,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const r = baseRadius + Math.sin(t * 0.45 + index) * 0.04;
    const a = angle + t * 0.09;
    ref.current.position.x = Math.cos(a) * r;
    ref.current.position.y = Math.sin(a) * r;
    ref.current.position.z = Math.sin(t * 0.4 + index * 0.7) * 0.15;
    ref.current.rotation.z = -a + Math.PI / 2;
    ref.current.rotation.y = t * 0.55 + index * 0.5;
    ref.current.rotation.x = Math.sin(t * 0.5 + index) * 0.25;
    const s = 1 + Math.sin(t * 0.9 + index * 0.7) * 0.1;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshPhysicalMaterial
        color="#ffcf3f"
        emissive="#ffae22"
        emissiveIntensity={0.7}
        metalness={0.95}
        roughness={0.13}
        clearcoat={1}
        clearcoatRoughness={0.08}
        toneMapped={false}
      />
    </mesh>
  );
}

function StarsRing({ mx, my, isMobile }: { mx: any; my: any; isMobile: boolean }) {
  const ringRef = useRef<THREE.Group>(null);
  const count = isMobile ? 6 : 9;
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        angle: (i / count) * Math.PI * 2 - Math.PI / 2,
        index: i,
      })),
    [count]
  );
  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.elapsedTime;
    ringRef.current.rotation.x =
      Math.sin(t * 0.18) * 0.08 + my.get() * 0.13;
    ringRef.current.rotation.y =
      Math.sin(t * 0.22) * 0.08 + mx.get() * 0.16;
    ringRef.current.rotation.z = Math.sin(t * 0.12) * 0.04;
  });
  return (
    <group ref={ringRef}>
      {stars.map((s) => (
        <Star
          key={s.index}
          angle={s.angle}
          baseRadius={RING_OUTER_R}
          index={s.index}
        />
      ))}
    </group>
  );
}

/* ─── Particle field ───────────────────────────────────────── */
function ParticleField({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const { geometry } = useMemo(() => {
    const count = isMobile ? 55 : 140;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color("#ffcf3f");
    const c2 = new THREE.Color("#6178f5");
    const c3 = new THREE.Color("#ffffff");
    for (let i = 0; i < count; i++) {
      const r = 3.8 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.45 - 1;
      const c =
        Math.random() < 0.55 ? c1 : Math.random() < 0.7 ? c2 : c3;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geometry: g };
  }, [isMobile]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.025;
    ref.current.rotation.x = Math.sin(t * 0.12) * 0.08;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Scene ────────────────────────────────────────────────── */
function Scene({
  mx,
  my,
  isMobile,
  highTier,
  degraded,
}: {
  mx: any;
  my: any;
  isMobile: boolean;
  highTier: boolean;
  degraded: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-5, -2, -5]} intensity={0.6} color="#6178f5" />
      <pointLight position={[0, 0, 4]} intensity={1.8} color="#ffcf3f" />
      <pointLight position={[0, 2, -2]} intensity={0.7} color="#6178f5" />
      {!isMobile && <pointLight position={[3, 3, 3]} intensity={1.2} color="#ffd97a" />}

      <ParticleField isMobile={isMobile} />

      <Float speed={0.55} rotationIntensity={0.05} floatIntensity={0.28}>
        <group scale={isMobile ? 0.7 : 0.9}>
          <Suspense fallback={null}>
            <SvgCrest3D mx={mx} my={my} isMobile={isMobile} />
          </Suspense>
          <StarsRing mx={mx} my={my} isMobile={isMobile} />
        </group>
      </Float>

      {!isMobile && !degraded && <Environment preset="city" />}

      <EffectComposer enabled={highTier && !degraded}>
        <Bloom
          luminanceThreshold={0.5}
          luminanceSmoothing={0.9}
          intensity={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.55} />
      </EffectComposer>
    </>
  );
}

export function Logo3D({
  isMobile = false,
}: {
  isMobile?: boolean;
  cinematic?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useSpring(useMotionValue(0), { damping: 30, stiffness: 80 });
  const my = useSpring(useMotionValue(0), { damping: 30, stiffness: 80 });

  const [inView, setInView] = useState(true);
  const [degraded, setDegraded] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const highTier = !isMobile;

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0"
      onMouseMove={(e) => {
        if (isMobile) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: isMobile ? 60 : 42 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        frameloop={inView ? "always" : "demand"}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <PerformanceMonitor
          onDecline={() => setDegraded(true)}
          onIncline={() => setDegraded(false)}
          flipflops={3}
        >
          <Scene mx={mx} my={my} isMobile={isMobile} highTier={highTier} degraded={degraded} />
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
