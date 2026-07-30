import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11.5px] font-medium tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-white/10 bg-white/[0.04] text-foreground/85",
        accent:
          "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]",
        gold:
          "border-[var(--accent-warm)]/30 bg-[var(--accent-warm)]/10 text-[var(--accent-warm)]",
        outline: "border-white/20 text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
