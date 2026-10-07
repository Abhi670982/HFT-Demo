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
        dark ? "text-white/90" : "text-ink-500",
        className
      )}
      style={{
        maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
    >
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
            className="flex items-center gap-10 whitespace-nowrap sm:gap-14 pr-10 sm:pr-14"
          >
            {item.image || item.src ? (
              <span
                className="relative inline-flex h-7 w-auto items-center sm:h-8"
                title={item.name}
              >
                <Image
                  src={item.image || `/media/logos/${item.src}`}
                  alt={`${item.name} logo`}
                  width={0}
                  height={0}
                  sizes="120px"
                  style={{ width: "auto", height: "100%" }}
                  className="h-full w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
              </span>
            ) : (
              <span
                className={cn(
                  "text-[15px] font-bold tracking-tight transition-colors duration-300 sm:text-base",
                  dark
                    ? "text-white/80 group-hover:text-white"
                    : "text-ink-700 group-hover:text-ink-900 dark:text-white/80 dark:group-hover:text-white"
                )}
              >
                {item.name}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
