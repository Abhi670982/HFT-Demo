import type { LucideIcon } from "lucide-react";
import type { IconTone } from "@/lib/types";
import { cn } from "@/lib/utils";
import IconContainer from "@/components/ui/IconContainer";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: IconTone;
  className?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  tone = "violet",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group flex h-full flex-col gap-4 rounded-card border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card",
        className
      )}
    >
      <IconContainer tone={tone} className="transition-transform duration-300 group-hover:scale-110">
        <Icon aria-hidden="true" />
      </IconContainer>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-bold leading-snug tracking-tight text-ink-900">{title}</h3>
        <p className="text-sm leading-relaxed text-ink-500">{description}</p>
      </div>
    </div>
  );
}
