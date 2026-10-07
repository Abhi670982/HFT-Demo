"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Faq } from "@/lib/data/faqs";
import { cn } from "@/lib/utils";

interface AccordionProps {
  items: Faq[];
  className?: string;
  defaultOpen?: number | null;
}

export default function Accordion({ items, className, defaultOpen = 0 }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-card border bg-surface transition-colors duration-300",
              isOpen ? "border-brand-200 shadow-soft" : "border-line hover:border-line-strong"
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-trigger-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="text-[15px] font-semibold text-ink-900 dark:text-white sm:text-base">
                {item.question}
              </span>
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300",
                  isOpen
                    ? "rotate-180 bg-gradient-to-br from-brand-600 to-brand-400 text-white"
                    : "bg-pastel-lavender text-icon-violet"
                )}
              >
                <ChevronDown className="size-4" aria-hidden="true" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ink-500 dark:text-dark-text-muted sm:px-6 sm:pb-6">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
