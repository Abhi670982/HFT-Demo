import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms that apply while using this HuntForTomorrow.in demo build.",
};

export default function TermsPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="The ground rules for using this demo website."
      />
      <section className="shell-pad pb-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-panel border border-line dark:border-dark-line bg-surface dark:bg-dark-surface p-8 text-[15px] leading-relaxed text-ink-600 dark:text-dark-text-secondary shadow-soft sm:p-10">
          <div>
            <h2 className="mb-2 text-lg font-bold text-ink-900 dark:text-white dark:text-white">Prototype status</h2>
            <p>
              This site is a design and development prototype for HuntForTomorrow.in. Content,
              imagery and statistics are presented for demonstration purposes and may change before
              launch.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-ink-900 dark:text-white dark:text-white">Company references</h2>
            <p>
              Company and media names appear as text-based references describing the types of
              organisations our community works with or follows. These are not partnership or
              endorsement claims.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-ink-900 dark:text-white dark:text-white">Demo functionality</h2>
            <p>
              Onboarding, client access, dashboards and analysis tools are simulated on the
              frontend. They demonstrate intended behaviour and do not process real transactions or
              store real data.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
