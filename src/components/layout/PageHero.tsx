import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  /** Optional action buttons row */
  actions?: ReactNode;
  className?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  actions,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* soft decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 size-64 rounded-full bg-pastel-mint/70 blur-3xl"
      />

      <div className="shell-pad relative py-10 sm:py-12 lg:py-14">
        <div
          className={cn(
            "grid items-center gap-8",
            children ? "lg:grid-cols-[1.05fr_0.95fr]" : "max-w-3xl"
          )}
        >
          <Reveal className="flex flex-col items-start gap-4">
            <Pill>{eyebrow}</Pill>
            <h1 className="text-balance text-[30px] font-bold leading-[1.1] tracking-tight text-ink-900 dark:text-white sm:text-4xl lg:text-[44px]">
              {title}
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-ink-500 dark:text-dark-text-muted sm:text-[15px]">
              {description}
            </p>
            {actions && <div className="flex flex-wrap items-center gap-2.5 pt-0.5">{actions}</div>}
          </Reveal>

          {children && (
            <Reveal delay={0.12} className="relative">
              {children}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
