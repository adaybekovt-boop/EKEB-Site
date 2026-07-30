import { motionValue } from "motion/react";

/**
 * Module-level shared motionValue for the hero ScrollFilm timeline.
 * GSAP timeline onUpdate pushes its `self.progress` into this MV; R3F
 * components read it inside useFrame to stay in lockstep with the DOM.
 *
 * Why a module-level singleton instead of context: useFrame runs at
 * 60–144Hz and cannot tolerate React render cycles for prop changes.
 */
export const filmProgress = motionValue(0);
