"use client";

import { motion } from "framer-motion";
import type { Step } from "@/lib/data/steps";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface HowItWorksWorkflowProps {
  steps: Step[];
  className?: string;
}

export default function HowItWorksWorkflow({ steps, className }: HowItWorksWorkflowProps) {
  return (
    <div className={cn("relative", className)}>
      {/* connector line (desktop) */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-brand-200 lg:block"
      />

      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {steps.map((step, i) => (
          <motion.li
            key={step.number}
            variants={fadeUp}
            custom={i * 0.08}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative flex h-full flex-col items-start gap-4 lg:items-center lg:text-center"
          >
            {/* numbered circle */}
            <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-lg font-extrabold text-white shadow-glow">
              {step.number}
            </span>
            <div className="flex flex-col gap-1.5 rounded-card border border-line bg-surface p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card lg:items-center">
              <h3 className="text-[15px] font-bold leading-snug tracking-tight text-ink-900">
                {step.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-ink-500">{step.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
