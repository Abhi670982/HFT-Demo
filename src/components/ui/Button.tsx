import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "white" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand-600 to-brand-400 text-white shadow-glow hover:-translate-y-0.5 hover:shadow-glow-lg active:translate-y-0",
  secondary:
    "border border-brand-200 bg-surface text-ink-900 shadow-soft hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 active:translate-y-0 dark:border-brand-500/40 dark:bg-dark-surface dark:text-dark-text dark:hover:text-brand-300",
  ghost: "text-ink-700 hover:text-brand-600 dark:text-dark-text-secondary dark:hover:text-brand-300",
  white: "bg-white text-navy-900 shadow-soft hover:-translate-y-0.5 hover:shadow-card active:translate-y-0",
  dark: "bg-navy-900 text-white hover:-translate-y-0.5 hover:bg-navy-800 active:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

export interface ButtonProps {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  href?: string;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  href,
  type = "button",
  onClick,
  disabled,
  className,
  children,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  // Disabled buttons render as inert elements — visible but intentionally inactive.
  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="Coming soon"
        className={cn(classes, "cursor-not-allowed opacity-55 saturate-50")}
      >
        {content}
      </button>
    );
  }

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
