import { Bot, HeartHandshake, Route, Target, type LucideIcon } from "lucide-react";
import type { IconTone } from "@/lib/types";
import FeatureCard from "@/components/cards/FeatureCard";
import SectionHeader from "@/components/ui/SectionHeader";

const solutions: { icon: LucideIcon; tone: IconTone; title: string; description: string }[] = [
  {
    icon: Bot,
    tone: "violet",
    title: "AI-Powered Automation",
    description: "11 specialized AI agents working for you.",
  },
  {
    icon: Target,
    tone: "blue",
    title: "Personalised Strategy",
    description: "Tailored to your profile and goals.",
  },
  {
    icon: HeartHandshake,
    tone: "mint",
    title: "Human Guidance",
    description: "Expert support at every stage.",
  },
  {
    icon: Route,
    tone: "orange",
    title: "End-to-End Support",
    description: "From job discovery to offer and negotiation.",
  },
];

export default function SolutionSection() {
  return (
    <section className="shell-pad py-12 sm:py-16">
      <SectionHeader
        eyebrow="The HFT Solution"
        title="The HuntForTomorrow Solution"
        description="A complete ecosystem that combines AI agents, structured workflows, automation and human support to make your job search smarter and more effective."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.map((solution) => (
          <FeatureCard key={solution.title} {...solution} />
        ))}
      </div>
    </section>
  );
}
