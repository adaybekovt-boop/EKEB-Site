"use client";

import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface DarkCardProps {
  children: ReactNode;
  className?: string;
  glow?: "indigo" | "gold" | "none";
  hoverLine?: boolean;
  onClick?: () => void;
  as?: "div" | "button" | "li";
}

export const DarkCard = forwardRef<HTMLDivElement, DarkCardProps>(
  ({ children, className, glow = "none", hoverLine = true, onClick, as: Tag = "div" }, ref) => {
    const Comp: any = Tag;
    return (
      <Comp
        ref={ref}
        onClick={onClick}
        className={cn(
          "relative h-full rounded-2xl border border-white/[0.06] bg-[#0e1016]/80 backdrop-blur-sm overflow-hidden transition-all duration-500 group",
          glow === "indigo" &&
            "shadow-[0_0_40px_-16px_rgba(97,120,245,0.12)] hover:shadow-[0_0_50px_-12px_rgba(97,120,245,0.22)]",
          glow === "gold" &&
            "shadow-[0_0_40px_-16px_rgba(212,165,116,0.10)] hover:shadow-[0_0_50px_-12px_rgba(212,165,116,0.18)]",
          onClick && "cursor-pointer",
          className
        )}
      >
        {hoverLine && (
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        )}
        <div className="relative h-full">{children}</div>
      </Comp>
    );
  }
);
DarkCard.displayName = "DarkCard";
