import type { ReactNode } from "react";
import type { IconTone } from "@/lib/types";
import { cn } from "@/lib/utils";

const tones: Record<IconTone, string> = {
  blue: "bg-pastel-blue text-icon-blue",
  violet: "bg-pastel-lavender text-icon-violet",
  mint: "bg-pastel-mint text-icon-teal",
  purple: "bg-pastel-purple text-icon-violet",
  orange: "bg-pastel-orange text-icon-orange",
  pink: "bg-pastel-pink text-icon-pink",
  green: "bg-pastel-green text-icon-green",
  rose: "bg-pastel-rose text-icon-rose",
};

const sizeMap = {
  sm: "size-9 rounded-lg [&>svg]:size-4",
  md: "size-11 rounded-xl [&>svg]:size-5",
  lg: "size-14 rounded-2xl [&>svg]:size-6",
} as const;

interface IconContainerProps {
  tone?: IconTone;
  size?: keyof typeof sizeMap;
  className?: string;
  children: ReactNode;
}

export default function IconContainer({
  tone = "violet",
  size = "md",
  className,
  children,
}: IconContainerProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        tones[tone],
        sizeMap[size],
        className
      )}
    >
      {children}
    </span>
  );
}
