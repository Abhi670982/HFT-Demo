import type { Metadata } from "next";
import { Bot, CheckCircle2, Package, UserCheck } from "lucide-react";
import { agents } from "@/lib/data/agents";
import { steps } from "@/lib/data/steps";
import HowItWorksWorkflow from "@/components/cards/HowItWorksWorkflow";
import CTASection from "@/components/layout/CTASection";
import PageHero from "@/components/layout/PageHero";
import IconContainer from "@/components/ui/IconContainer";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "A simple and structured process to help you go from profile building to job offers with the power of AI and human guidance.",
};

export default function HowItWorksPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        eyebrow="The Process"
        title="How It Works"
        description="A simple and structured process to help you go from profile building to job offers with the power of AI and human guidance."
        actions={
          <a
            href="#process"
            className="text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
          >
            Jump to the 5 steps ↓
          </a>
        }
      >
        {/* mini visual workflow */}
        <div className="rounded-[28px] border border-line bg-surface p-6 shadow-card sm:p-8">
          <div className="flex flex-col gap-4">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center gap-3.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-xs font-extrabold text-white">
                  {step.number}
                </span>
                <div className="flex-1 rounded-xl bg-page px-4 py-2.5">
                  <p className="text-sm font-bold text-ink-900 dark:text-white dark:text-white">{step.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      {/* 5-step workflow */}
      <section id="process" className="shell-pad scroll-mt-28 py-14 sm:py-20">
        <SectionHeader
          eyebrow="The Journey"
          title="Five Steps to Your Next Offer"
          description="Each step combines AI agents doing the heavy lifting with human experts guiding the decisions."
        />
        <HowItWorksWorkflow steps={steps} className="mt-12" />
      </section>

      {/* Step details */}
      <section className="shell-pad pb-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={0.04}>
              <article className="overflow-hidden rounded-panel border border-line bg-surface shadow-soft">
                <div className="flex flex-col gap-4 border-b border-line bg-page/50 p-6 sm:flex-row sm:items-center sm:gap-5 sm:p-7">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-lg font-extrabold text-white shadow-glow">
                    {step.number}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-2xl">
                      {step.title}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{step.description}</p>
                  </div>
                </div>

                <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-3">
                  {/* agents */}
                  <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-dark-text-muted">
                      <Bot className="size-4 text-icon-violet" aria-hidden="true" /> AI Agents on
                      this step
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {step.agents.map((name) => {
                        const agent = agents.find((a) => a.name === name);
                        const Icon = agent?.icon;
                        return (
                          <span
                            key={name}
                            className="inline-flex items-center gap-1.5 rounded-full bg-pastel-lavender px-3 py-1.5 text-xs font-semibold text-icon-violet"
                          >
                            {Icon && <Icon className="size-3.5" aria-hidden="true" />}
                            {name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* outputs */}
                  <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-dark-text-muted">
                      <Package className="size-4 text-icon-blue" aria-hidden="true" /> Expected
                      outputs
                    </p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {step.outputs.map((output) => (
                        <li
                          key={output}
                          className="flex items-start gap-2 text-sm leading-relaxed text-ink-600 dark:text-dark-text-secondary"
                        >
                          <CheckCircle2
                            className="mt-0.5 size-4 shrink-0 text-icon-teal"
                            aria-hidden="true"
                          />
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* human involvement */}
                  <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-dark-text-muted">
                      <UserCheck className="size-4 text-icon-orange" aria-hidden="true" /> Human
                      involvement
                    </p>
                    <div
                      className={`mt-3 rounded-2xl p-4 ${
                        ["bg-pastel-purple/70", "bg-pastel-blue/70", "bg-pastel-mint/70", "bg-pastel-orange/70", "bg-pastel-pink/70"][i]
                      }`}
                    >
                      <p className="text-sm leading-relaxed text-ink-600 dark:text-dark-text-secondary">{step.human}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* agent strip teaser */}
      <section className="shell-pad py-10">
        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-panel border border-line bg-surface p-8 text-center shadow-soft sm:flex-row sm:text-left">
            <IconContainer tone="violet" size="lg">
              <Bot aria-hidden="true" />
            </IconContainer>
            <div className="flex-1">
              <h2 className="text-xl font-bold tracking-tight text-ink-900 dark:text-white dark:text-white">
                Backed by 11 specialised AI agents
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">
                Every step of this process is powered by agents built for one job — strategy,
                discovery, branding, outreach or interviews.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Ready to Run Your Search This Way?"
        description="Start your journey with a structured process, AI execution and human guidance at every step."
        secondaryLabel="Meet Your AI Agents"
        secondaryHref="/ai-agents"
      />
    </main>
  );
}
