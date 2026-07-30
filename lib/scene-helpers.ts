/**
 * Scene helpers for cinematic ScrollFilm.
 * Keep tiny and hot-path-friendly — these run inside useFrame.
 */

export function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Map a global progress (0..1) into a named scene's local progress (0..1).
 * Outside the scene window the value is clamped (0 before, 1 after).
 */
export function sceneProgress(p: number, start: number, end: number) {
  if (end <= start) return 0;
  return clamp01((p - start) / (end - start));
}

/**
 * Bell-curve pulse centred on `at` with bandwidth `width`.
 * Returns 0..1. Use to create a single bass-hit accent at a scroll moment.
 * Default width = 0.04 → ≈8% of scroll window at half-height.
 */
export function hit(p: number, at: number, width = 0.04) {
  const d = (p - at) / width;
  return Math.exp(-d * d);
}

/**
 * Smooth in/out — Hermite smoothstep.
 */
export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/**
 * Mix two numbers by factor t (clamped).
 */
export function mix(a: number, b: number, t: number) {
  return a + (b - a) * clamp01(t);
}
