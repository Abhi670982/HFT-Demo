import { CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const guaranteePoints = [
  "Personalized AI setup",
  "Live 1-on-1 guidance",
];

export default function GuaranteeSection() {
  return (
    <section className="shell-pad py-6">
      <Reveal>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-panel border border-line bg-surface shadow-card dark:border-dark-line dark:bg-dark-surface">
          <div className="flex flex-col gap-6 p-7 sm:p-10 md:flex-row md:items-center md:justify-between">

            {/* Left — text content */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pastel-mint text-icon-teal">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-3xl">
                  Zero-Risk Guarantee
                </h2>
              </div>

              <p className="max-w-xl text-[15px] leading-relaxed text-ink-500 dark:text-dark-text-muted">
                If you don&rsquo;t see how these AI agents can transform your job
                search, get 100% refund.{" "}
                <strong className="font-bold text-ink-700 dark:text-dark-text-secondary">
                  No questions asked.
                </strong>
              </p>

              <div className="flex flex-wrap gap-5">
                {guaranteePoints.map((point) => (
                  <span
                    key={point}
                    className="flex items-center gap-2 text-sm font-semibold text-ink-700 dark:text-dark-text-secondary"
                  >
                    <CheckCircle2
                      className="size-4 shrink-0 text-brand-500"
                      aria-hidden="true"
                    />
                    {point}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — CTA */}
            <div className="flex shrink-0 flex-col items-start gap-2 md:items-end">
              <Link
                href="/#start-search"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 px-8 text-[15px] font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg active:translate-y-0"
              >
                Claim Your Slot
              </Link>
              <p className="text-sm font-semibold text-ink-500 dark:text-dark-text-muted">
                Total Bonus Value:{" "}
                <span className="text-ink-900 dark:text-white">₹11,000</span>
              </p>
            </div>

          </div>
        </div>
      </Reveal>
    </section>
  );
}
