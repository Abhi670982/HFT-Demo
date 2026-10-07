import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Pill from "./Pill";
import Reveal from "./Reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <Pill dark={dark}>{eyebrow}</Pill>}
      <h2
        className={cn(
          "max-w-3xl text-balance text-2xl font-bold leading-[1.18] tracking-tight sm:text-3xl lg:text-[34px]",
          dark ? "text-white" : "text-ink-900 dark:text-white"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-sm leading-relaxed sm:text-[15px]",
            dark ? "text-white/90" : "text-ink-500 dark:text-dark-text-muted"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
