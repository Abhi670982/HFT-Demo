import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  FileText,
  GaugeCircle,
  Lightbulb,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

const matchBars = [
  { label: "Keywords Match", value: 92, tone: "bg-icon-teal" },
  { label: "Skills Match", value: 88, tone: "bg-icon-blue" },
  { label: "Experience Match", value: 78, tone: "bg-icon-violet" },
];

export default function ToolsPreviewSection() {
  return (
    <section className="shell-pad py-12 sm:py-16">
      <SectionHeader
        eyebrow="AI-Powered Tools"
        title="AI-Powered Tools to Boost Your Job Search"
        description="Simple and powerful tools to help you improve your resume, understand job descriptions and strengthen your applications."
      />

      <Reveal delay={0.1} className="mt-10">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-panel border border-line bg-white shadow-card md:grid-cols-2">
          {/* Resume document */}
          <div className="flex flex-col gap-4 border-b border-line bg-page/60 p-6 sm:p-8 md:border-b-0 md:border-r">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-pastel-blue text-icon-blue">
                <FileText className="size-4.5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink-900">Resume.pdf</p>
                <p className="text-xs text-ink-400">Uploaded · Software Engineer</p>
              </div>
            </div>
            {/* fake document lines */}
            <div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-5 shadow-soft">
              <div className="h-2.5 w-1/2 rounded-full bg-brand-200" />
              <div className="h-2 w-3/4 rounded-full bg-line-strong" />
              <div className="h-2 w-2/3 rounded-full bg-line-strong" />
              <div className="mt-2 h-2 w-full rounded-full bg-line" />
              <div className="h-2 w-5/6 rounded-full bg-line" />
              <div className="h-2 w-4/6 rounded-full bg-line" />
              <div className="mt-2 flex gap-2">
                {["React", "Node.js", "SQL"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-pastel-lavender px-2.5 py-1 text-[10px] font-bold text-icon-violet"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs leading-relaxed text-ink-400">
              Your resume is parsed locally in this demo — nothing leaves your browser.
            </p>
          </div>

          {/* JD analysis panel */}
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                <GaugeCircle className="size-4.5 text-icon-violet" aria-hidden="true" />
                JD Analysis
              </p>
              <span className="rounded-full bg-pastel-mint px-3 py-1.5 text-sm font-extrabold text-icon-teal">
                85% Match
              </span>
            </div>

            <div className="flex flex-col gap-3.5">
              {matchBars.map((bar) => (
                <div key={bar.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
                    <span className="text-ink-600">{bar.label}</span>
                    <span className="text-ink-900">{bar.value}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-line">
                    <div
                      className={`h-full rounded-full ${bar.tone}`}
                      style={{ width: `${bar.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-pastel-orange/70 p-4">
              <p className="flex items-center gap-2 text-xs font-bold text-icon-orange">
                <CircleAlert className="size-4" aria-hidden="true" /> Missing Keywords
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["System Design", "Kubernetes"].map((k) => (
                  <span
                    key={k}
                    className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-700"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-500">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-icon-violet" aria-hidden="true" />
              Suggestions: add measurable outcomes to your top 2 roles and mirror the JD&rsquo;s
              core skills in your summary.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-9 flex justify-center">
        <Button href="/tools/resume-jd-analysis" variant="primary" size="md" arrow>
          Try Resume / JD Analysis
        </Button>
      </div>
      <p className="mx-auto mt-3 flex max-w-md items-center justify-center gap-1.5 text-center text-xs text-ink-400">
        <BadgeCheck className="size-3.5 shrink-0 text-icon-teal" aria-hidden="true" />
        Interactive demo — full analyzer on the Tools page
        <ArrowRight className="size-3" aria-hidden="true" />
      </p>
    </section>
  );
}
