import { ArrowDown, ArrowRight, Bot, Briefcase, HeartHandshake, Target } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const flow = [
  { icon: Bot, label: "AI Agents", sub: "Execute the busywork" },
  { icon: Target, label: "Career Strategy", sub: "Personalised plan" },
  { icon: HeartHandshake, label: "Human Guidance", sub: "Expert judgment" },
  { icon: Briefcase, label: "Job Opportunities", sub: "Interviews & offers" },
];

export default function HumanAiSection() {
  return (
    <section className="px-3 py-4 sm:px-6">
      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[28px] bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
        {/* glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 size-80 rounded-full bg-brand-600/30 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-0 size-96 rounded-full bg-brand-400/20 blur-[120px]"
        />

        <div className="relative shell-pad py-14 sm:py-20">
          <SectionHeader
            dark
            eyebrow="Human + AI"
            title={
              <>
                AI-powered execution.
                <br />
                Human-guided decisions.
              </>
            }
            description="The platform combines the speed of AI automation with the judgment of experienced career guides — so nothing repetitive slows you down, and nothing important is left to chance."
          />

          {/* flow diagram */}
          <div className="mt-12 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
            {flow.map((node, i) => (
              <div key={node.label} className="contents">
                <div className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:bg-white/[0.09]">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                    <node.icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-bold text-white">{node.label}</p>
                  <p className="text-xs text-white/55">{node.sub}</p>
                </div>
                {i < flow.length - 1 && (
                  <div className="flex items-center justify-center lg:px-1">
                    <ArrowRight
                      className="hidden size-5 text-brand-400 lg:block"
                      aria-hidden="true"
                    />
                    <ArrowDown className="size-5 text-brand-400 sm:hidden" aria-hidden="true" />
                    <ArrowRight
                      className="hidden size-5 text-brand-400 sm:block lg:hidden"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-white/60">
            AI automation handles discovery, optimisation and tracking. Human experience guides
            every decision that shapes your career.
          </p>
        </div>
      </div>
    </section>
  );
}
