"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, CircleDot, Package } from "lucide-react";
import type { Agent } from "@/lib/data/agents";
import { cn } from "@/lib/utils";
import IconContainer from "@/components/ui/IconContainer";

interface AgentCardDetailedProps {
  agent: Agent;
  expanded: boolean;
  onToggle: () => void;
}

export default function AgentCardDetailed({ agent, expanded, onToggle }: AgentCardDetailedProps) {
  const Icon = agent.icon;

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-card border bg-surface transition-all duration-300",
        expanded ? "border-brand-300 shadow-card" : "border-line shadow-soft hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`agent-panel-${agent.id}`}
        className="flex w-full flex-col gap-3.5 p-6 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <IconContainer tone={agent.tone}>
              <Icon aria-hidden="true" />
            </IconContainer>
            <div>
              <h3 className="text-[17px] font-bold leading-snug tracking-tight text-ink-900 dark:text-white dark:text-white">
                {agent.name}
              </h3>
              <p className="text-[13px] font-medium text-brand-700 dark:text-brand-300">{agent.tagline}</p>
            </div>
          </div>
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300",
              expanded
                ? "rotate-180 bg-gradient-to-br from-brand-600 to-brand-400 text-white"
                : "bg-pastel-lavender text-icon-violet"
            )}
          >
            <ChevronDown className="size-4" aria-hidden="true" />
          </span>
        </div>
        <p className="text-sm leading-relaxed text-ink-500 dark:text-dark-text-muted">{agent.description}</p>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`agent-panel-${agent.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-4 border-t border-line dark:border-dark-line px-6 pb-6 pt-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-dark-text-muted">
                  Problem solved
                </p>
                <p className="mt-1.5 flex items-start gap-2 text-sm leading-relaxed text-ink-600 dark:text-dark-text-secondary">
                  <CircleDot className="mt-0.5 size-4 shrink-0 text-icon-orange" aria-hidden="true" />
                  {agent.problemSolved}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-dark-text-muted">
                  What it does
                </p>
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {agent.whatItDoes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-ink-600 dark:text-dark-text-secondary">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-icon-teal" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-pastel-blue/70 p-3.5">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-icon-blue">
                    <Package className="size-3.5" aria-hidden="true" /> Output / Value
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-dark-text-secondary">{agent.output}</p>
                </div>
                <div className="rounded-xl bg-pastel-purple/70 p-3.5">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-icon-violet">
                    <Package className="size-3.5" aria-hidden="true" /> Where it fits
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-dark-text-secondary">{agent.journey}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
