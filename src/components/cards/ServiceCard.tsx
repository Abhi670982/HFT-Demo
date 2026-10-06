import type { LucideIcon } from "lucide-react";
import type { IconTone } from "@/lib/types";
import { cn } from "@/lib/utils";
import IconContainer from "@/components/ui/IconContainer";

interface ServiceCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: IconTone;
  className?: string;
}

export default function ServiceCard({
  id,
  icon: Icon,
  title,
  description,
  tone = "violet",
  className,
}: ServiceCardProps) {
  return (
    <div
      id={id}
      className={cn(
        "group relative flex h-full scroll-mt-28 flex-col gap-4 overflow-hidden rounded-card border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card",
        className
      )}
    >
      {/* soft corner accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-pastel-lavender/60 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />
      <IconContainer tone={tone} className="transition-transform duration-300 group-hover:scale-110">
        <Icon aria-hidden="true" />
      </IconContainer>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[17px] font-bold leading-snug tracking-tight text-ink-900">{title}</h3>
        <p className="text-sm leading-relaxed text-ink-500">{description}</p>
      </div>
    </div>
  );
}
