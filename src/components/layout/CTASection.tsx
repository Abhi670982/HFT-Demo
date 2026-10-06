import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

interface CTASectionProps {
  title: ReactNode;
  description: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Illustration slot rendered on the right */
  illustration?: ReactNode;
  className?: string;
  compact?: boolean;
}

export default function CTASection({
  title,
  description,
  primaryLabel = "Get Started",
  primaryHref = "/get-started",
  secondaryLabel = "Learn More",
  secondaryHref = "/how-it-works",
  illustration,
  className,
  compact = false,
}: CTASectionProps) {
  return (
    <section className={cn("px-3 pb-4 sm:px-6", className)}>
      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[28px] bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
        {/* glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-brand-600/30 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 bottom-0 size-80 rounded-full bg-brand-400/25 blur-[110px]"
        />

        <div
          className={cn(
            "relative grid items-center gap-10 px-6 sm:px-10 lg:px-14",
            compact ? "py-12 sm:py-14" : "py-14 sm:py-20",
            illustration ? "lg:grid-cols-[1.05fr_0.95fr]" : ""
          )}
        >
          <Reveal className="flex flex-col items-start gap-5">
            <h2 className="text-balance text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-3xl lg:text-[34px]">
              {title}
            </h2>
            <p className="max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
              {description}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button href={primaryHref} variant="primary" size="lg" arrow>
                {primaryLabel}
              </Button>
              {secondaryLabel && (
                <Button
                  href={secondaryHref}
                  variant="ghost"
                  size="lg"
                  className="border border-white/20 text-white hover:border-white/40 hover:text-white"
                >
                  {secondaryLabel}
                </Button>
              )}
            </div>
          </Reveal>

          {illustration && (
            <Reveal delay={0.12} className="relative hidden justify-center lg:flex">
              {illustration}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
