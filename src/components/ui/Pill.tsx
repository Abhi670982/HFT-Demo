import { Zap } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PillProps {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}

export default function Pill({ children, dark = false, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]",
        dark
          ? "border-white/15 bg-surface/5 text-brand-200"
          : "border-brand-100 bg-surface text-brand-600 shadow-soft",
        className
      )}
    >
      <Zap className="size-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}
