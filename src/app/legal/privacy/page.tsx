import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HuntForTomorrow.in handles information in this demo build.",
};

export default function PrivacyPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="A plain-language summary of how this demo site handles information."
      />
      <section className="shell-pad pb-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-panel border border-line bg-surface p-8 text-[15px] leading-relaxed text-ink-600 shadow-soft sm:p-10">
          <div>
            <h2 className="mb-2 text-lg font-bold text-ink-900">Demo notice</h2>
            <p>
              This website is a frontend prototype. Forms on this site perform client-side
              validation only — submitted details are not stored on a server, not shared with
              third parties, and not used for any outreach.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-ink-900">Tools</h2>
            <p>
              The Resume / JD Analysis tool runs entirely in your browser. Resume text and job
              descriptions never leave your device.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-ink-900">Client Access</h2>
            <p>
              The client access and dashboard screens are simulated with sample data and no real
              credentials are collected or verified.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-ink-900">Contact</h2>
            <p>
              For any questions about this site, reach the team at the handles listed in the
              footer. When the production site launches, a complete policy will be published here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
