import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  dark?: boolean;
  slow?: boolean;
  className?: string;
}

/**
 * Seamless infinite marquee — the item list is duplicated exactly once and the
 * track translates -50%, so the loop is invisible. Pauses on hover.
 */
export default function Marquee({ items, dark = false, slow = false, className }: MarqueeProps) {
  const row = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative overflow-hidden py-1",
        dark ? "text-white/65" : "text-ink-400",
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r to-transparent sm:w-24",
          dark ? "from-navy-900" : "from-page"
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l to-transparent sm:w-24",
          dark ? "from-navy-900" : "from-page"
        )}
      />
      <div
        className={cn(
          "flex w-max items-center group-hover:[animation-play-state:paused]",
          slow ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        {row.map((label, i) => (
          <span
            key={`${label}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-10 whitespace-nowrap sm:gap-14"
          >
            <span className="text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-ink-600 sm:text-xl dark:group-hover:text-white">
              {label}
            </span>
            <span
              className={cn("size-1.5 shrink-0 rounded-full", dark ? "bg-brand-400/60" : "bg-brand-200")}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
