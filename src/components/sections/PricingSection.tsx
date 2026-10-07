import { BadgeCheck, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";

const valuePoints = [
  "11 specialised AI agents working on your search",
  "Personalised strategy built around your profile and goals",
  "Human guidance from your first session to final negotiation",
  "End-to-end execution — discovery, outreach, tracking, interviews",
  "HFT Academy access to keep you growing between offers",
  "Zero-risk guarantee for complete peace of mind",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="shell-pad scroll-mt-28 py-12 sm:py-16">
      <SectionHeader
        eyebrow="Get Started"
        title="Your Career Transformation Starts Here"
        description="One structured program that combines AI, automation and human expertise — tailored to your stage, your goals and your target roles."
      />

      <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-panel border border-line dark:border-dark-line bg-surface dark:bg-dark-surface shadow-card md:grid md:grid-cols-[1.15fr_0.85fr]">
        {/* value list */}
        <div className="flex flex-col gap-4 p-7 sm:p-9">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
            <BadgeCheck className="size-4" aria-hidden="true" /> What&rsquo;s included
          </p>
          <ul className="flex flex-col gap-3">
            {valuePoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600 dark:text-dark-text-secondary">
                <CheckCircle2 className="mt-0.5 size-[18px] shrink-0 text-icon-teal" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA panel */}
        <div className="flex flex-col justify-center gap-4 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-7 text-white sm:p-9">
          <h3 className="text-2xl font-bold tracking-tight">Ready when you are.</h3>
          <p className="text-sm leading-relaxed text-white/90">
            Pricing is shared during your free consultation — transparently, based on your career
            stage and the support you need. No hidden costs, ever.
          </p>
          <div className="mt-2 flex flex-col gap-2.5">
            <Button href="/get-started" variant="white" size="lg" arrow>
              Get Started
            </Button>
            <Button href="/how-it-works" variant="ghost" size="md" className="text-white/90 hover:text-white">
              See how the process works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
