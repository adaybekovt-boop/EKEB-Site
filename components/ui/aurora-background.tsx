"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function AuroraBackground({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute -top-[20%] -left-[10%] h-[70vh] w-[70vw] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(97,120,245,0.35) 0%, transparent 60%)",
            animation: "aurora-shift 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[10%] -right-[15%] h-[60vh] w-[60vw] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(212,165,116,0.22) 0%, transparent 60%)",
            animation: "aurora-shift 18s ease-in-out -4s infinite",
          }}
        />
        <div
          className="absolute -bottom-[20%] left-[20%] h-[50vh] w-[50vw] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(97,120,245,0.25) 0%, transparent 65%)",
            animation: "aurora-shift 16s ease-in-out -8s infinite",
          }}
        />
      </div>
      {/* faint dotted grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      {children}
    </div>
  );
}
