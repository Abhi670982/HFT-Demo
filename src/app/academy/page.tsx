import type { Metadata } from "next";
import { BookOpen, Clock3, Download, FileText, FolderOpen, GraduationCap, PlayCircle } from "lucide-react";
import DashboardPreview from "@/components/cards/DashboardPreview";
import FeatureCard from "@/components/cards/FeatureCard";
import CTASection from "@/components/layout/CTASection";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import IconContainer from "@/components/ui/IconContainer";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "HFT Academy",
  description:
    "Practical learning resources and programmes to help you build the skills that today's employers are looking for. Learn. Upskill. Get Ahead.",
};

const features = [
  {
    icon: GraduationCap,
    tone: "violet" as const,
    title: "Industry-Relevant Courses",
    description:
      "Learning designed around the skills employers screen for right now — refreshed as the market shifts.",
  },
  {
    icon: Clock3,
    tone: "blue" as const,
    title: "Self-Paced Learning",
    description:
      "Short, focused lessons that fit around your job search and your schedule — progress at your own pace.",
  },
  {
    icon: FolderOpen,
    tone: "mint" as const,
    title: "Practical Resources",
    description:
      "Templates, checklists and guides you can apply to your search the same day you open them.",
  },
];

const resourceCards = [
  { icon: FileText, title: "Guides & Playbooks", copy: "Step-by-step guides for every stage of the hiring journey." },
  { icon: PlayCircle, title: "Video Lessons", copy: "Watch short, practical lessons whenever it suits you." },
  { icon: Download, title: "Templates & Tools", copy: "Ready-to-use frameworks for resumes, outreach and more." },
];

export default function AcademyPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        eyebrow="HFT Academy"
        title={
          <>
            HFT Academy <span className="text-gradient">Learn. Upskill. Get Ahead.</span>
          </>
        }
        description="Practical learning resources and programmes to help you build the skills that today's employers are looking for."
        actions={
          <Button href="/get-started" variant="primary" size="lg" arrow>
            Explore Academy
          </Button>
        }
      >
        <DashboardPreview />
      </PageHero>

      {/* features */}
      <section className="shell-pad py-10 sm:py-14">
        <SectionHeader
          eyebrow="Why Academy"
          title="Learning That Moves Your Career Forward"
          description="Everything in the Academy is built to support one outcome — making you a stronger candidate."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.08}>
              <FeatureCard {...feature} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* resource panels */}
      <section id="resources" className="shell-pad scroll-mt-28 pb-10">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-center gap-4 rounded-panel border border-line bg-surface p-8 shadow-soft sm:p-10">
              <IconContainer tone="orange" size="lg">
                <BookOpen aria-hidden="true" />
              </IconContainer>
              <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                Resources for every stage
              </h2>
              <p className="text-[15px] leading-relaxed text-ink-500">
                Whether you&rsquo;re just starting your search or preparing for a final-round
                negotiation, the Academy keeps a practical resource one click away — no fluff, no
                filler, just what moves you forward.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Career guides", "Interview prep", "Salary insights", "Personal branding"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-pastel-lavender px-3 py-1.5 text-xs font-semibold text-icon-violet"
                    >
                      {chip}
                    </span>
                  )
                )}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {resourceCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.06}>
                <div className="group flex h-full items-center gap-4 rounded-card border border-line bg-surface p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card">
                  <IconContainer tone={(["blue", "violet", "mint"] as const)[i]} size="lg">
                    <card.icon aria-hidden="true" />
                  </IconContainer>
                  <div>
                    <h3 className="text-[15px] font-bold tracking-tight text-ink-900">{card.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{card.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* learning strip */}
      <section className="shell-pad py-10">
        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-panel border border-line bg-surface p-8 text-center shadow-soft sm:flex-row sm:text-left">
            <IconContainer tone="violet" size="lg">
              <GraduationCap aria-hidden="true" />
            </IconContainer>
            <div className="flex-1">
              <h2 className="text-xl font-bold tracking-tight text-ink-900">
                Included with your HuntForTomorrow journey
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">
                Academy access is built into the client experience — your learning path adapts to
                your active job-search stage.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Keep Growing with HFT Academy"
        description="Start your journey and unlock practical courses, resources and programmes designed for your next step."
        secondaryLabel="See How It Works"
        secondaryHref="/how-it-works"
      />
    </main>
  );
}
