import { ShieldCheck } from "lucide-react";
import IconContainer from "@/components/ui/IconContainer";
import Reveal from "@/components/ui/Reveal";

export default function GuaranteeSection() {
  return (
    <section className="shell-pad py-6">
      <Reveal>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-panel border border-line bg-surface p-8 text-center shadow-soft sm:p-10">
          <IconContainer tone="mint" size="lg">
            <ShieldCheck aria-hidden="true" />
          </IconContainer>
          <h2 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-3xl">
            Zero-Risk Guarantee
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-500">
            Your journey begins with complete transparency — clear deliverables, clear timelines
            and clear communication at every step. If the program isn&rsquo;t the right fit during
            your onboarding, we&rsquo;ll make it right. That&rsquo;s our commitment to you.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
