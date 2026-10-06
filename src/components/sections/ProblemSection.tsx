import { Clock3, SearchX, UserX, FileWarning } from "lucide-react";
import FeatureCard from "@/components/cards/FeatureCard";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";

const problems = [
  {
    icon: SearchX,
    tone: "blue" as const,
    title: "Hard to Find Relevant Opportunities",
    description:
      "Endless scrolling through job boards, yet the roles that truly fit your profile stay buried.",
  },
  {
    icon: FileWarning,
    tone: "orange" as const,
    title: "Generic Resumes Get Ignored",
    description:
      "One-size-fits-all resumes fail to clear ATS filters and rarely catch a recruiter's attention.",
  },
  {
    icon: UserX,
    tone: "pink" as const,
    title: "Difficult to Reach Recruiters",
    description:
      "Cold messages go unanswered and the right recruiters feel impossible to find and connect with.",
  },
  {
    icon: Clock3,
    tone: "mint" as const,
    title: "Manual and Time-Consuming Process",
    description:
      "Tracking applications, tailoring resumes and following up — all manually, all exhausting.",
  },
];

export default function ProblemSection() {
  return (
    <section className="shell-pad py-12 sm:py-16">
      <SectionHeader
        eyebrow="The Reality"
        title={
          <>
            The Problem with <span className="text-gradient">Traditional Job Search</span>
          </>
        }
        description="Finding the right job can be overwhelming, time-consuming and frustrating. Most job seekers face the same challenges."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {problems.map((problem) => (
          <FeatureCard key={problem.title} {...problem} />
        ))}
      </div>
      <div className="mt-9 flex justify-center">
        <Button href="/how-it-works" variant="primary" size="md" arrow>
          See How We Solve It
        </Button>
      </div>
    </section>
  );
}
