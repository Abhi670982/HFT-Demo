"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { agentCategories, agents } from "@/lib/data/agents";
import { assets } from "@/lib/assets";
import AgentCardDetailed from "@/components/cards/AgentCardDetailed";
import CTASection from "@/components/layout/CTASection";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type CategoryId = (typeof agentCategories)[number]["id"];

export default function AiAgentsPage() {
  const [category, setCategory] = useState<CategoryId>("all");
  const [expandedId, setExpandedId] = useState<string | null>(agents[0]?.id ?? null);

  const visibleAgents = useMemo(
    () => (category === "all" ? agents : agents.filter((a) => a.category === category)),
    [category]
  );

  return (
    <main className="flex flex-col">
      <PageHero
        eyebrow="Your AI Team"
        title={
          <>
            11 AI Agents <span className="text-gradient">Working for Your Career</span>
          </>
        }
        description="Specialised agents that handle discovery, optimisation, outreach and preparation — coordinated end-to-end, supervised by humans. Click any agent to see exactly what it does."
        actions={
          <Button href="/get-started" variant="primary" size="lg" arrow>
            Put Them to Work
          </Button>
        }
      >
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-brand-200/60 to-transparent blur-2xl"
          />
          <Image
            src={assets.agentsHero}
            alt="The 11 HuntForTomorrow AI agents working for your career"
            width={640}
            height={400}
            priority
            className="relative h-auto w-full rounded-[24px] border border-line object-cover shadow-card dark:border-dark-line"
          />
          <div className="absolute -bottom-5 left-4 animate-floaty rounded-2xl border border-line bg-surface px-4 py-2.5 shadow-card">
            <p className="text-xs font-bold text-ink-900 dark:text-white">🤖 11 agents · one mission</p>
            <p className="text-[11px] text-ink-500">Your career, on autopilot + guidance</p>
          </div>
        </div>
      </PageHero>

      {/* Filters */}
      <section className="shell-pad pb-4">
        <Reveal className="flex flex-wrap items-center gap-2">
          {agentCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              aria-pressed={category === cat.id}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300",
                category === cat.id
                  ? "border-transparent bg-gradient-to-r from-brand-600 to-brand-400 text-white shadow-glow"
                  : "border-line bg-surface text-ink-600 dark:text-dark-text-secondary hover:border-brand-200 hover:text-brand-600"
              )}
            >
              {cat.label}
            </button>
          ))}
        </Reveal>
      </section>

      {/* Agent cards */}
      <section className="shell-pad py-8">
        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleAgents.map((agent, i) => (
              <motion.div
                key={agent.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <AgentCardDetailed
                  agent={agent}
                  expanded={expandedId === agent.id}
                  onToggle={() => setExpandedId(expandedId === agent.id ? null : agent.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ecosystem strip */}
      <section className="shell-pad py-10">
        <Reveal>
          <div className="flex flex-col items-center gap-3 rounded-panel border border-line bg-surface p-8 text-center shadow-soft">
            <Pill>How they coordinate</Pill>
            <p className="max-w-3xl text-[15px] leading-relaxed text-ink-500">
              Your agents share one strategy, one pipeline and one goal. The Career Strategist sets
              direction, discovery agents find opportunities, branding agents make you impossible to
              ignore, and interview agents close the deal — with human guides reviewing every
              important step.
            </p>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Let the Agents Start Working"
        description="Tell us about your goals and your 11-agent team gets to work — strategy first, results next."
        secondaryLabel="See the Process"
        secondaryHref="/how-it-works"
      />
    </main>
  );
}
