import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  FileText,
  Flame,
  GraduationCap,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const courses = [
  { title: "Resume & Personal Branding", progress: 68, tone: "bg-icon-violet" },
  { title: "Interview Confidence", progress: 42, tone: "bg-icon-blue" },
  { title: "Career Growth Strategy", progress: 85, tone: "bg-icon-teal" },
];

const stats = [
  { icon: Clock3, label: "Hours learned", value: "12.5" },
  { icon: Flame, label: "Learning streak", value: "6 days" },
  { icon: GraduationCap, label: "Resources saved", value: "9" },
];

export default function DashboardPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-panel border border-line bg-surface shadow-card",
        className
      )}
    >
      {/* window header */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-page/60 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 text-white">
            <GraduationCap className="size-4" aria-hidden="true" />
          </span>
          <span className="text-sm font-bold text-ink-900 dark:text-white dark:text-white">HFT Academy</span>
        </div>
        <span className="rounded-full bg-pastel-mint px-2.5 py-1 text-[11px] font-semibold text-icon-teal">
          Continue learning
        </span>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-[1.4fr_1fr] sm:p-6">
        {/* course list */}
        <div className="flex flex-col gap-3">
          {courses.map((course) => (
            <div
              key={course.title}
              className="group flex items-center gap-3.5 rounded-2xl border border-line bg-surface p-3.5 transition-all duration-300 hover:border-brand-200 hover:shadow-soft"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pastel-lavender text-icon-violet transition-transform group-hover:scale-110">
                <PlayCircle className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink-900 dark:text-white dark:text-white">{course.title}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className={cn("h-full rounded-full transition-all", course.tone)}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              <span className="shrink-0 text-xs font-bold text-ink-500">{course.progress}%</span>
            </div>
          ))}
        </div>

        {/* right column */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-2xl bg-page px-4 py-3"
              >
                <span className="grid size-8 place-items-center rounded-lg bg-surface text-icon-violet shadow-soft">
                  <stat.icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium text-ink-500">{stat.label}</span>
                <span className="ml-auto text-sm font-bold text-ink-900 dark:text-white dark:text-white">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-1 flex-col gap-2 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 p-4 text-white">
            <p className="flex items-center gap-2 text-[13px] font-bold">
              <BookOpen className="size-4" aria-hidden="true" /> This week&rsquo;s focus
            </p>
            <p className="text-xs leading-relaxed text-white/80">
              Short, practical lessons matched to your active job-search stage.
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-semibold">
              <FileText className="size-3.5" aria-hidden="true" /> Resources
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
