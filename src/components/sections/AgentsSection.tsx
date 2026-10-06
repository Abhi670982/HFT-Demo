"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { agents } from "@/lib/data/agents";
import AgentCard from "@/components/cards/AgentCard";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";

export default function AgentsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section id="agents" className="shell-pad scroll-mt-24 py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <SectionHeader
          align="left"
          eyebrow="Your AI Team"
          title="Meet Your 11 AI Agents"
          description="A team of specialised AI agents working together to handle every step of your career journey."
          className="max-w-2xl"
        />
        {/* Carousel controls — aligned to the header, equal size, accessible */}
        <div className="hidden gap-2 lg:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll agents left"
            className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink-600 dark:text-dark-text-secondary shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600 dark:border-dark-line dark:bg-dark-surface dark:text-dark-text-secondary dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            <ChevronLeft className="size-[18px]" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll agents right"
            className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink-600 dark:text-dark-text-secondary shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600 dark:border-dark-line dark:bg-dark-surface dark:text-dark-text-secondary dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            <ChevronRight className="size-[18px]" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      >
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            className="w-[252px] shrink-0 snap-start sm:w-[276px]"
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button href="/ai-agents" variant="secondary" size="md" arrow>
          View All AI Agents
        </Button>
      </div>
    </section>
  );
}
