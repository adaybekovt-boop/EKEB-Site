import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SmoothScrollProvider } from "@/lib/lenis";
import { DeviceTierProvider } from "@/lib/device-tier";
import { ScrollProgress } from "@/components/scroll-progress";
import { GradientBackground4 } from "@/components/ui/gradient-background-4";
import { LiquidGlassFilter } from "@/components/ui/liquid-glass-filter";
import { CopyProtection } from "@/components/copy-protection";
import "./globals.css";

export const metadata: Metadata = {
  title: "ЕКЕБ — Европейский колледж цифровых технологий и предпринимательства",
  description:
    "Готовим людей, которые меняют мир. Дуальное обучение, WorldSkills, бизнес-инкубатор. Актобе.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#08090a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark" data-tier="low">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <DeviceTierProvider>
          <SmoothScrollProvider>
            <LiquidGlassFilter />
            <GradientBackground4 />
            <ScrollProgress />
            <CopyProtection />
            <div className="relative z-10">{children}</div>
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 z-[100] opacity-[0.06] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
          </SmoothScrollProvider>
        </DeviceTierProvider>
      </body>
    </html>
  );
}
