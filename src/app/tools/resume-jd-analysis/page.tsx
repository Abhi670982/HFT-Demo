import type { Metadata } from "next";
import ToolAnalyzer from "@/components/sections/ToolAnalyzer";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Resume / JD Analysis",
  description:
    "Paste your resume and a job description to see your match score, missing keywords, profile gaps and recommendations — instantly in your browser.",
};

export default function ResumeJdAnalysisPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        eyebrow="Free Tool"
        title={
          <>
            Resume / <span className="text-gradient">JD Analysis</span>
          </>
        }
        description="Upload your resume, paste a job description and get an instant match score with keywords, gaps and recommendations."
      />
      <section className="shell-pad pb-14">
        <Reveal>
          <div className="rounded-[28px] border border-line bg-page p-5 shadow-soft sm:p-8">
            <ToolAnalyzer />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
