"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

const CHARS = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$&";

/**
 * Motion-Primitives-style text scrambler. On mount / viewport entry
 * it scrambles each character until it locks onto the target letter.
 */
export function TextScramble({
  text,
  className,
  speed = 60,
  trigger = "view",
}: {
  text: string;
  className?: string;
  speed?: number;
  trigger?: "view" | "mount";
}) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const started = useRef(false);

  useEffect(() => {
    if (trigger === "view" && !inView) return;
    if (started.current) return;
    started.current = true;

    const target = text;
    let frame = 0;
    let raf = 0;
    const queue: { from: string; to: string; start: number; end: number }[] = [];
    const length = Math.max(display.length, target.length);
    for (let i = 0; i < length; i++) {
      const from = display[i] || "";
      const to = target[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * speed);
      queue.push({ from, to, start, end });
    }

    const step = () => {
      let out = "";
      let complete = 0;
      for (let i = 0, n = queue.length; i < n; i++) {
        const { from, to, start, end } = queue[i];
        if (frame >= end) {
          complete++;
          out += to;
        } else if (frame >= start) {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          out += from;
        }
      }
      setDisplay(out);
      if (complete === queue.length) return;
      frame++;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, speed, trigger, display]);

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {display}
    </span>
  );
}
