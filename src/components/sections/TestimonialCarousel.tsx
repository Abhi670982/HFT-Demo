"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";
import TestimonialCard from "@/components/cards/TestimonialCard";
import SectionHeader from "@/components/ui/SectionHeader";

const AUTOPLAY_MS = 6500;

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  // Autoplay — paused on hover/focus/interaction
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, count]);

  const userGo = (dir: 1 | -1) => {
    setPaused(true);
    go(dir);
  };

  return (
    <section id="success-stories" className="shell-pad scroll-mt-28 py-12 sm:py-16">
      <SectionHeader
        eyebrow="Client Feedback"
        title="Success Stories"
        description="Real outcomes from job seekers who ran their search with HuntForTomorrow."
      />

      <div
        className="relative mx-auto mt-10 max-w-4xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* arrows */}
        <button
          type="button"
          onClick={() => userGo(-1)}
          aria-label="Previous testimonial"
          className="absolute -left-2 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-xl border border-line bg-surface text-ink-600 dark:text-dark-text-secondary shadow-soft transition-all hover:-translate-y-[calc(50%+2px)] hover:border-brand-300 hover:text-brand-600 md:grid lg:-left-16"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => userGo(1)}
          aria-label="Next testimonial"
          className="absolute -right-2 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-xl border border-line bg-surface text-ink-600 dark:text-dark-text-secondary shadow-soft transition-all hover:-translate-y-[calc(50%+2px)] hover:border-brand-300 hover:text-brand-600 md:grid lg:-right-16"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>

        {/* slides */}
        <div className="overflow-hidden rounded-[24px]">
          <motion.div
            className="flex"
            animate={{ x: `-${index * 100}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {testimonials.map((t) => (
              <div key={t.id} className="w-full shrink-0 px-0.5">
                <TestimonialCard testimonial={t} featured />
              </div>
            ))}
          </motion.div>
        </div>

        {/* dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setPaused(true);
                setIndex(i);
              }}
              aria-label={`Go to testimonial ${i + 1} — ${t.name}`}
              aria-current={i === index}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-7 bg-gradient-to-r from-brand-600 to-brand-400" : "w-2 bg-line-strong hover:bg-brand-200"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
