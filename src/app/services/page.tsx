import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { services } from "@/lib/data/services";
import ServiceCard from "@/components/cards/ServiceCard";
import CTASection from "@/components/layout/CTASection";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "End-to-end career support to help you find, apply and land the right opportunities.",
};

const floatingLabels = ["Strategy", "Outreach", "Interview", "Debrief", "Negotiation"];
const labelPositions = [
  "-left-2 top-6 sm:-left-6",
  "-right-2 top-16 sm:-right-8",
  "-left-3 bottom-16 sm:-left-8",
  "-right-3 bottom-8 sm:-right-6",
  "left-6 -bottom-4",
];

export default function ServicesPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        eyebrow="Our Services"
        title="Our Services"
        description="End-to-end career support to help you find, apply and land the right opportunities."
        actions={
          <Button href="/get-started" variant="primary" size="lg" arrow>
            Get Started
          </Button>
        }
      >
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-brand-200/70 via-transparent to-pastel-mint blur-2xl"
          />
          <div className="relative grid size-56 place-items-center rounded-[32px] border border-line bg-surface shadow-card sm:size-64">
            <span className="grid size-28 place-items-center rounded-[28px] bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-glow sm:size-32">
              <Briefcase className="size-14" aria-hidden="true" />
            </span>
          </div>
          {floatingLabels.map((label, i) => (
            <span
              key={label}
              style={{ animationDelay: `${i * 0.7}s` }}
              className={`absolute ${labelPositions[i]} animate-floaty rounded-xl border border-line bg-surface px-3.5 py-2 text-xs font-bold text-ink-900 shadow-soft backdrop-blur-sm dark:border-dark-line dark:bg-dark-surface dark:text-white`}
            >
              {label}
            </span>
          ))}
        </div>
      </PageHero>

      {/* service grid */}
      <section className="shell-pad py-10 sm:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 0.06}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* how services tie together */}
      <section className="shell-pad pb-10">
        <Reveal>
          <div className="rounded-panel border border-line bg-surface p-8 shadow-soft sm:p-10">
            <h2 className="text-center text-2xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-3xl">
              One system, not ten checkboxes
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-ink-500">
              Each service strengthens the others: positioning sharpens your resume, an optimised
              resume powers outreach, outreach fills your pipeline, and every tracked application
              feeds interview preparation. Together they form one continuous, guided system.
            </p>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Get the Full System Working for You"
        description="Every service above is included in one guided journey — start with a conversation about your goals."
        secondaryLabel="Meet Your AI Agents"
        secondaryHref="/ai-agents"
      />
    </main>
  );
}
