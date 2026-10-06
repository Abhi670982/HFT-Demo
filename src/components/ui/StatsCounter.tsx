"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StatsCounterProps {
  /** Animated numeric value. Omit and use `display` for static text like "3–5". */
  value?: number;
  display?: string;
  prefix?: string;
  suffix?: string;
  label: string;
  dark?: boolean;
  durationMs?: number;
  className?: string;
}

export default function StatsCounter({
  value,
  display,
  prefix = "",
  suffix = "",
  label,
  dark = false,
  durationMs = 1600,
  className,
}: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || value === undefined) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCurrent(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs]);

  const text = display ?? `${prefix}${current.toLocaleString("en-IN")}${suffix}`;

  return (
    <div ref={ref} className={cn("flex flex-col items-center gap-1.5 text-center", className)}>
      <span
        className={cn(
          "text-[38px] font-extrabold tracking-tight sm:text-[44px]",
          dark ? "text-white" : "text-ink-900"
        )}
      >
        {text}
      </span>
      <span className={cn("text-sm font-medium", dark ? "text-white/60" : "text-ink-500")}>
        {label}
      </span>
    </div>
  );
}
