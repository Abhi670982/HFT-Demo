import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund principles for the HuntForTomorrow program (demo copy).",
};

export default function RefundPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        eyebrow="Legal"
        title="Refund Policy"
        description="Our principles on transparency and fairness — final terms are shared during onboarding."
      />
      <section className="shell-pad pb-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-panel border border-line dark:border-dark-line bg-surface dark:bg-dark-surface p-8 text-[15px] leading-relaxed text-ink-600 dark:text-dark-text-secondary shadow-soft sm:p-10">
          <div>
            <h2 className="mb-2 text-lg font-bold text-ink-900 dark:text-white dark:text-white">Our commitment</h2>
            <p>
              Every engagement begins with clear deliverables, clear timelines and clear
              communication. The Zero-Risk Guarantee shown on the home page reflects how we treat
              clients during onboarding.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-ink-900 dark:text-white dark:text-white">Before enrolment</h2>
            <p>
              Program details — including pricing and refund terms — are documented and shared
              transparently before any payment. Nothing is charged without that clarity.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-ink-900 dark:text-white dark:text-white">Demo note</h2>
            <p>
              This page is demo copy for the prototype. The final, binding refund policy will be
              published here before commercial launch.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
