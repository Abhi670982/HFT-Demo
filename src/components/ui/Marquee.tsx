import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BrandLogo } from "@/lib/data/logos";

interface MarqueeProps {
  items: BrandLogo[];
  dark?: boolean;
  slow?: boolean;
  className?: string;
}

/**
 * Seamless infinite brand-logo marquee — the item list is duplicated exactly
 * once and the track translates -50%, so the loop is invisible. Pauses on hover.
 * Official SVG logos render at a consistent height with their brand colors;
 * brands without a sourced official asset use a premium text treatment.
 */
export default function Marquee({ items, dark = false, slow = false, className }: MarqueeProps) {
  const row = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden py-2",
        dark ? "text-white/70" : "text-ink-500",
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
        {row.map((item, i) => (
          <span
            key={`${item.name}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-10 whitespace-nowrap sm:gap-14"
          >
            {item.src ? (
              <span
                className="relative inline-flex h-7 w-auto items-center sm:h-8"
                title={item.name}
              >
                <Image
                  src={`/media/logos/${item.src}.svg`}
                  alt={`${item.name} logo`}
                  width={0}
                  height={0}
                  sizes="120px"
                  className="h-full w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
              </span>
            ) : (
              <span
                className={cn(
                  "text-lg font-semibold tracking-tight transition-colors duration-300 sm:text-xl",
                  dark ? "text-white/70 group-hover:text-white" : "text-ink-500 group-hover:text-ink-700"
                )}
              >
                {item.name}
              </span>
            )}
            <span
              className={cn("size-1.5 shrink-0 rounded-full", dark ? "bg-brand-400/60" : "bg-brand-200")}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
