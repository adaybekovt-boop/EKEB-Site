"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";
import { motion } from "motion/react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineRobotProps {
  scene?: string;
  className?: string;
}

export function SplineRobot({
  scene = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
  className,
}: SplineRobotProps) {
  const shouldLoad = true;
  const rootRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const visibleRef = useRef(true);


  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const setPlayback = (visible: boolean) => {
      setIsVisible(visible);
      visibleRef.current = visible;
      const app = appRef.current;
      if (!app) return;
      if (visible && !document.hidden) app.play();
      else app.stop();
    };

    const observer = new IntersectionObserver(
      ([entry]) => setPlayback(entry.isIntersecting),
      { rootMargin: "200px", threshold: 0.01 }
    );
    const onVisibility = () => {
      const app = appRef.current;
      if (!app) return;
      if (!document.hidden && visibleRef.current) app.play();
      else app.stop();
    };

    observer.observe(root);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      appRef.current?.stop();
    };
  }, []);

  return (
    <motion.div
      className={className}
      ref={rootRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Живая обёртка — периодически качает робота, создавая эффект "приветствия" */}
      <motion.div
        className="w-full h-full origin-bottom"
        animate={isVisible ? {
          rotateZ: [0, -2.5, 3.5, -2, 0],
          y: [0, -8, 0],
        } : { rotateZ: 0, y: 0 }}
        transition={{
          duration: 2.2,
          ease: "easeInOut",
          repeat: isVisible ? Infinity : 0,
          repeatDelay: 4,
        }}
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="h-32 w-64 skeleton rounded-3xl opacity-30" />
            </div>
          }
        >
          {shouldLoad && (
            <Spline
              scene={scene}
              className="w-full h-full"
              onLoad={(app) => {
                appRef.current = app;
                if (!isVisible || document.hidden) app.stop();
              }}
            />
          )}
        </Suspense>
      </motion.div>
    </motion.div>
  );
}
