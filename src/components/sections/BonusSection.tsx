import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const bonuses = [
  {
    label: "BONUS 1",
    title: "Boolean Script",
    description:
      "Surface roles most candidates never see, the ones companies never post on Naukri or LinkedIn",
    points: [
      "Discover niche roles",
      "Write powerful outreach messages",
      "Build WIN projects",
      "Practice Interviews",
    ],
  },
  {
    label: "BONUS 2",
    title: "World's Best Resume Building Playbook",
    description: "A step-by-step, battle-tested resume playbook that shows you:",
    points: [
      "What recruiters scan in the first 7 seconds",
      "Role-wise resume structures that beat ATS",
      "Bullet formulas that trigger interview calls",
    ],
    highlight: true,
  },
  {
    label: "BONUS 3",
    title: "1+1 Access to Everything",
    description:
      "Bring a friend – at no extra cost. Get complimentary full access for a friend to everything included in the programme.",
    points: [
      "Both of you get 1-on-1 time",
      "Perfect for accountability & faster results",
    ],
  },
];

export default function BonusSection() {
  return (
    <section id="bonuses" className="shell-pad scroll-mt-28 py-12 sm:py-16">
      <SectionHeader
        eyebrow="Exclusive Bonuses"
        title="You Also Get These Free Bonuses"
        description="Included with your programme — worth ₹11,000 in total value."
      />

      <Reveal>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {bonuses.map((bonus) => (
            <div
              key={bonus.label}
              className={cn(
                "flex flex-col gap-4 rounded-card border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
                bonus.highlight
                  ? "border-brand-300 dark:border-brand-500/50"
                  : "border-line dark:border-dark-line dark:bg-dark-surface"
              )}
            >
              {/* Badge */}
              <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                {bonus.label}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold tracking-tight text-ink-900 dark:text-white">
                {bonus.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-ink-500 dark:text-dark-text-muted">
                {bonus.description}
              </p>

              {/* Points */}
              <ul className="flex flex-col gap-2">
                {bonus.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm font-medium text-ink-700 dark:text-dark-text-secondary"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-brand-500"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA + Total value */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/#start-search"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 px-8 text-[15px] font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg active:translate-y-0"
          >
            Save Your Slot
          </Link>
          <p className="text-sm font-semibold text-ink-500 dark:text-dark-text-muted">
            Total Bonus Value:{" "}
            <span className="text-ink-900 dark:text-white">₹11,000</span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
