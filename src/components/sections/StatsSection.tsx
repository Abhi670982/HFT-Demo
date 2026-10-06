import StatsCounter from "@/components/ui/StatsCounter";

const stats = [
  { value: 1200, suffix: "+", label: "Automated workflows" },
  { value: 60, suffix: "%", label: "Boost in productivity" },
  { value: 28, suffix: "K+", label: "Job seekers guided" },
  { display: "3–5", label: "Interview calls a week" },
];

export default function StatsSection() {
  return (
    <section className="shell-pad py-6">
      <div className="grid grid-cols-2 gap-y-10 rounded-panel border border-line bg-surface px-6 py-10 shadow-soft sm:px-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
