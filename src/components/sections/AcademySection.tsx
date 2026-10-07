import { Clock3, FolderOpen, GraduationCap } from "lucide-react";
import DashboardPreview from "@/components/cards/DashboardPreview";
import Button from "@/components/ui/Button";
import FeatureCard from "@/components/cards/FeatureCard";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";

const features = [
  {
    icon: GraduationCap,
    tone: "violet" as const,
    title: "Industry-Relevant Courses",
    description: "Learning designed around what employers actually look for today.",
  },
  {
    icon: Clock3,
    tone: "blue" as const,
    title: "Self-Paced Learning",
    description: "Progress on your schedule — short lessons that fit around your search.",
  },
  {
    icon: FolderOpen,
    tone: "mint" as const,
    title: "Practical Resources",
    description: "Templates, checklists and guides you can apply immediately.",
  },
];

export default function AcademySection() {
  return (
    <section className="shell-pad py-12 sm:py-16">
      <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <Reveal className="flex min-w-0 flex-col items-start gap-5 sm:gap-6">
          <div className="flex min-w-0 flex-col gap-3.5 sm:gap-4">
            <Pill className="self-start">HFT Academy</Pill>
            <h2 className="text-balance text-2xl font-bold leading-[1.18] tracking-tight text-ink-900 dark:text-white sm:text-3xl lg:text-[32px]">
              Learn. Upskill. <span className="text-gradient">Get Ahead.</span>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-ink-500 dark:text-dark-text-muted sm:text-base">
              Practical learning resources and programmes to help you build the skills that
              today&rsquo;s employers are looking for.
            </p>
          </div>

          <div className="grid w-full min-w-0 gap-3 sm:grid-cols-3 sm:gap-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} className="min-w-0 p-4 sm:p-5" />
            ))}
          </div>

          <Button href="/academy" variant="primary" size="md" arrow>
            Explore Academy
          </Button>
        </Reveal>

        <Reveal delay={0.12} className="min-w-0">
          <DashboardPreview />
        </Reveal>
      </div>
    </section>
  );
}
