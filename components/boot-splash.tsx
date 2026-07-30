"use client";

import { useEffect, useState } from "react";

const SPLASH_MS = 780;

export function BootSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), SPLASH_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="boot-splash" role="status" aria-label="Загрузка сайта">
      <div className="boot-splash__glow" aria-hidden />
      <div className="boot-splash__mark" aria-hidden><span>Е</span></div>
      <div className="boot-splash__line" aria-hidden><span /></div>
      <span className="sr-only">Подготавливаем версию сайта для вашего устройства</span>
    </div>
  );
}
