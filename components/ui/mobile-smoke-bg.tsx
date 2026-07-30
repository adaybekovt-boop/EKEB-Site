"use client";

import { useEffect, useRef } from "react";
import { useDeviceTier } from "@/lib/device-tier";

const VERTEX = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[4];
uniform vec4 u_scene;
uniform vec4 u_shape;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_scale u_shape.x
#define u_intensity u_shape.y

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 palette(float x) {
  x = clamp(x, 0.0, 1.0);
  vec3 c = mix(u_colors[0], u_colors[1], smoothstep(0.0, 0.42, x));
  c = mix(c, u_colors[2], smoothstep(0.38, 0.76, x));
  return mix(c, u_colors[3], smoothstep(0.72, 1.0, x));
}

float lightning(vec2 uv, float time) {
  float cycle = floor(time / 4.8);
  float local = fract(time / 4.8);
  float chance = hash21(vec2(cycle, 8.31));
  float envelope = (1.0 - smoothstep(0.018, 0.09, local))
    + 0.55 * (1.0 - smoothstep(0.11, 0.17, abs(local - 0.13)));
  envelope *= step(0.66, chance);

  float seed = chance * 19.0;
  float boltX = 0.66
    + sin(uv.y * 10.0 + seed) * 0.065
    + sin(uv.y * 31.0 + seed * 1.7) * 0.018;
  float core = exp(-abs(uv.x - boltX) * 185.0);
  float glow = exp(-abs(uv.x - boltX) * 22.0);
  float vertical = smoothstep(0.08, 0.24, uv.y) * (1.0 - smoothstep(0.78, 0.98, uv.y));
  return (core * 1.2 + glow * 0.22) * vertical * envelope;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy)
    / min(u_resolution.x, u_resolution.y);
  p *= u_scale;

  float t = u_time * 0.63;
  vec2 q = vec2(
    fbm(p + vec2(t * 0.075, -t * 0.025)),
    fbm(p + vec2(5.2, 1.3) - vec2(t * 0.045, t * 0.06))
  );
  vec2 r = vec2(
    fbm(p + (2.2 + u_intensity * 3.6) * q + vec2(1.7, 9.2)),
    fbm(p + (2.2 + u_intensity * 3.6) * q + vec2(8.3, 2.8))
  );
  float field = fbm(p + 2.75 * r + 7.83);
  field = (field - 0.5) * 1.16 + 0.48;
  vec3 col = palette(field);

  float bolt = lightning(uv, t);
  col += vec3(0.42, 0.58, 1.0) * bolt;
  col += vec3(0.07, 0.11, 0.28) * smoothstep(0.84, 1.0, bolt);

  float vignette = smoothstep(0.95, 0.22, length(uv - 0.5));
  col *= mix(0.46, 1.0, vignette);
  col *= 0.94;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function MobileSmokeBg({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tier, reducedMotion } = useDeviceTier();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const scene = gl.getUniformLocation(program, "u_scene");
    const shape = gl.getUniformLocation(program, "u_shape");
    const colors = gl.getUniformLocation(program, "u_colors[0]");
    gl.uniform3fv(
      colors,
      new Float32Array([
        0.018, 0.024, 0.070,
        0.035, 0.070, 0.190,
        0.120, 0.190, 0.520,
        0.480, 0.610, 1.000,
      ])
    );
    gl.uniform4f(shape, 1.96, 0.72, 0.5, 0.0);

    let raf = 0;
    let visible = true;
    let lastFrame = 0;
    const started = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, tier === "low" ? 1 : 1.35);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      if (now - lastFrame < 32 && !reducedMotion) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;
      resize();
      const seconds = reducedMotion ? 1.8 : (now - started) / 1000;
      gl.uniform4f(scene, canvas.width, canvas.height, seconds, 4);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(draw);
      if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    const onVisibility = () => {
      if (!document.hidden && visible && !raf) raf = requestAnimationFrame(draw);
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(draw);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [tier, reducedMotion]);

  return (
    <div className={`relative overflow-hidden bg-[#070914] ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(8,9,10,.12)_45%,rgba(8,9,10,.72)_100%)]"
      />
    </div>
  );
}
