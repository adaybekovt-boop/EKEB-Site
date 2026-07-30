import { cn } from "@/lib/utils";

interface GradientBackground4Props {
  className?: string;
}

/**
 * Lightweight global backdrop. It is intentionally isolated in one component:
 * remove its import and JSX entry from app/layout.tsx to disable it completely.
 */
export function GradientBackground4({ className }: GradientBackground4Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full",
        className
      )}
      style={{
        background: [
          "radial-gradient(125% 105% at 50% -28%, rgba(99, 102, 241, 0.20) 0%, rgba(52, 55, 104, 0.12) 34%, transparent 72%)",
          "radial-gradient(70% 46% at 78% 18%, rgba(89, 92, 170, 0.055) 0%, transparent 72%)",
          "linear-gradient(180deg, #151627 0%, #10111d 32%, #090a10 68%, #050506 100%)",
        ].join(", "),
      }}
    />
  );
}
