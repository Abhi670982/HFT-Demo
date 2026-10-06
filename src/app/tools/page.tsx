import type { Metadata } from "next";
import { Bot, GaugeCircle, ShieldCheck } from "lucide-react";
import CTASection from "@/components/layout/CTASection";
import PageHero from "@/components/layout/PageHero";
import ToolAnalyzer from "@/components/sections/ToolAnalyzer";
import IconContainer from "@/components/ui/IconContainer";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "AI-Powered Tools",
  description:
    "Simple and powerful tools to help you improve your resume, understand job descriptions and strengthen your applications.",
};

const promises = [
  { icon: ShieldCheck, text: "Runs in your browser — nothing is uploaded" },
  { icon: Bot, text: "Demo heuristics — ready for a real AI backend" },
  { icon: GaugeCircle, text: "Instant score, gaps and recommendations" },
];

export default function ToolsPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        eyebrow="AI-Powered Tools"
        title={
          <>
            AI-Powered Tools <span className="text-gradient">to Boost Your Job Search</span>
          </>
        }
        description="Simple and powerful tools to help you improve your resume, understand job descriptions and strengthen your applications. Start with the Resume / JD Analysis below."
      />

      {/* analyzer */}
      <section className="shell-pad pb-14">
        <Reveal>
          <div className="rounded-[28px] border border-line bg-page p-5 shadow-soft sm:p-8">
            <ToolAnalyzer />
          </div>
        </Reveal>
      </section>

      {/* trust strip */}
      <section className="shell-pad pb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {promises.map((p, i) => (
            <Reveal key={p.text} delay={i * 0.06}>
              <div className="flex h-full items-center gap-3.5 rounded-card border border-line bg-surface p-5 shadow-soft">
                <IconContainer tone={(["mint", "violet", "blue"] as const)[i]} size="md">
                  <p.icon aria-hidden="true" />
                </IconContainer>
                <p className="text-sm font-semibold leading-snug text-ink-700 dark:text-dark-text-secondary">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Want the Full Toolkit Working for You?"
        description="The analyzer is a taste of what the 11 AI agents do across your entire search — automatically."
        secondaryLabel="Meet Your AI Agents"
        secondaryHref="/ai-agents"
      />
    </main>
  );
}
