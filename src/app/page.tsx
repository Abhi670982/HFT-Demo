import HomeHero from "@/components/sections/HomeHero";
import MarqueesSection from "@/components/sections/MarqueesSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import AgentsSection from "@/components/sections/AgentsSection";
import HowItWorksWorkflow from "@/components/cards/HowItWorksWorkflow";
import { steps } from "@/lib/data/steps";
import SectionHeader from "@/components/ui/SectionHeader";
import ServicesSection from "@/components/sections/ServicesSection";
import AcademySection from "@/components/sections/AcademySection";
import ToolsPreviewSection from "@/components/sections/ToolsPreviewSection";
import HumanAiSection from "@/components/sections/HumanAiSection";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import StatsSection from "@/components/sections/StatsSection";
import PricingSection from "@/components/sections/PricingSection";
import HostSection from "@/components/sections/HostSection";
import GuaranteeSection from "@/components/sections/GuaranteeSection";
import OnboardingFormSection from "@/components/sections/OnboardingFormSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HomeHero />
      <MarqueesSection />
      <ProblemSection />
      <SolutionSection />

      {/* 11 AI Agents */}
      <AgentsSection />

      {/* How It Works — 5-step workflow */}
      <section id="process" className="shell-pad scroll-mt-28 py-12 sm:py-16">
        <SectionHeader
          eyebrow="The Process"
          title="How It Works"
          description="A structured five-step journey — from understanding your profile to signing the right offer."
        />
        <HowItWorksWorkflow steps={steps} className="mt-12" />
      </section>

      <ServicesSection />
      <AcademySection />
      <ToolsPreviewSection />
      <HumanAiSection />
      <TestimonialCarousel />
      <StatsSection />
      <PricingSection />
      <HostSection />
      <GuaranteeSection />
      <OnboardingFormSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
