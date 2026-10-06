import type { Agent } from "@/lib/data/agents";
import { cn } from "@/lib/utils";
import IconContainer from "@/components/ui/IconContainer";

interface AgentCardProps {
  agent: Agent;
  className?: string;
}

/**
 * Uniform agent card — every card shares identical dimensions, padding,
 * icon size and clamped text areas so the grid/carousel keeps equal heights
 * regardless of description length.
 */
export default function AgentCard({ agent, className }: AgentCardProps) {
  const Icon = agent.icon;
  return (
    <article
      className={cn(
        "group flex h-full flex-col gap-2.5 rounded-card border border-line bg-surface p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card dark:border-dark-line dark:bg-dark-surface dark:hover:border-brand-500/50",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <IconContainer
          tone={agent.tone}
          size="md"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          <Icon aria-hidden="true" />
        </IconContainer>
        <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-ink-900 dark:text-white">
          {agent.name}
        </h3>
      </div>
      <p className="line-clamp-1 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-brand-600 dark:text-brand-300">
        {agent.tagline}
      </p>
      <p className="line-clamp-4 text-[13px] leading-relaxed text-ink-500 dark:text-dark-text-muted">
        {agent.description}
      </p>
    </article>
  );
}
