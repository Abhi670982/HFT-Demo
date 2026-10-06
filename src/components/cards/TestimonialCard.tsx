import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";

interface TestimonialCardProps {
  testimonial: Testimonial;
  featured?: boolean;
  className?: string;
}

export default function TestimonialCard({
  testimonial,
  featured = false,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-card border border-line bg-surface shadow-soft transition-colors duration-300 dark:border-dark-line dark:bg-dark-surface",
        featured ? "p-6 sm:p-8" : "p-5 sm:p-6",
        className
      )}
    >
      <Quote
        className={cn("shrink-0 rotate-180 text-brand-200 dark:text-brand-400/70", featured ? "size-8" : "size-6")}
        aria-hidden="true"
      />
      <blockquote
        className={cn(
          "mt-3 flex-1 font-medium leading-relaxed text-ink-700 dark:text-dark-text-secondary",
          featured ? "text-base sm:text-lg sm:leading-[1.6]" : "text-sm leading-relaxed"
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {featured && testimonial.results && (
        <div className="mt-5 flex flex-wrap gap-2">
          {testimonial.results.map((result) => (
            <span
              key={result}
              className="rounded-full bg-pastel-green px-3 py-1 text-xs font-semibold text-icon-teal dark:bg-teal-500/15 dark:text-teal-300"
            >
              {result}
            </span>
          ))}
        </div>
      )}

      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4 dark:border-dark-line">
        <Avatar
          name={testimonial.name}
          className={featured ? "size-12 text-[15px]" : "size-10 text-[13px]"}
        />
        <div className="flex min-w-0 flex-col">
          <span
            className={cn(
              "font-bold tracking-tight text-ink-900 dark:text-white",
              featured ? "text-sm" : "text-[13px]"
            )}
          >
            {testimonial.name}
          </span>
          <span className="truncate text-xs text-ink-500 dark:text-dark-text-muted">
            {testimonial.role}
          </span>
        </div>
        <span className="ml-auto hidden shrink-0 rounded-full bg-pastel-mint px-3 py-1 text-xs font-semibold text-icon-teal dark:bg-teal-500/15 dark:text-teal-300 sm:inline-block">
          {testimonial.outcome}
        </span>
      </figcaption>
    </figure>
  );
}
