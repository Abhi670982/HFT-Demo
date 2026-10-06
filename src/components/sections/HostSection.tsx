import { Award, BriefcaseBusiness, Users } from "lucide-react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";

const credentials = [
  { icon: Award, text: "Recognized among Asia's Top 30 HR" },
  { icon: Users, text: "Personally mentored 500+ professionals" },
  {
    icon: BriefcaseBusiness,
    text: "Supports senior professionals — CXO / HR Director / Senior Manager level",
  },
];

export default function HostSection() {
  return (
    <section id="host" className="shell-pad scroll-mt-28 py-12 sm:py-16">
      <Reveal>
        <div className="mx-auto grid max-w-5xl items-center gap-8 overflow-hidden rounded-panel border border-line bg-surface p-7 shadow-card sm:p-10 md:grid-cols-[auto_1fr]">
          {/* portrait */}
          <div className="relative mx-auto w-56 shrink-0 md:w-64">
            <div
              aria-hidden="true"
              className="absolute -left-3 -top-3 size-full rounded-[26px] bg-gradient-to-br from-brand-200 to-brand-400/40"
            />
            <Image
              src={assets.ceo}
              alt="Mukul Sharma — Founder of Hunt For Tomorrow"
              width={256}
              height={256}
              className="relative w-full rounded-[24px] border border-line object-cover"
            />
          </div>

          {/* content */}
          <div className="flex flex-col items-start gap-4">
            <Pill>Meet Your Host</Pill>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-white dark:text-white sm:text-3xl">
                Mukul Sharma
              </h2>
              <p className="mt-1 text-sm font-semibold text-brand-600">
                Founder — Hunt For Tomorrow
              </p>
            </div>
            <p className="max-w-xl text-[15px] leading-relaxed text-ink-500">
              With deep experience in talent acquisition and career strategy, Mukul has guided
              professionals across industries through every stage of the hiring journey — from
              positioning and outreach to interviews and negotiation.
            </p>
            <ul className="flex flex-col gap-2.5 pt-1">
              {credentials.map((c) => (
                <li key={c.text} className="flex items-start gap-2.5 text-sm font-medium text-ink-700 dark:text-dark-text-secondary">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-pastel-lavender text-icon-violet">
                    <c.icon className="size-4" aria-hidden="true" />
                  </span>
                  {c.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
