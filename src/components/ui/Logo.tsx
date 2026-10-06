import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  dark?: boolean;
  href?: string;
  className?: string;
  /** Hide the wordmark (e.g. tight spaces) */
  markOnly?: boolean;
}

export default function Logo({ dark = false, href = "/", markOnly = false, className }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="HuntForTomorrow.in — Home"
      className={cn("group inline-flex shrink-0 items-center gap-2.5", className)}
    >
      <Image
        src="/media/HFTLOGO.png"
        alt="HuntForTomorrow logo"
        width={36}
        height={36}
        priority
        className="size-9 rounded-xl object-contain"
      />
      {!markOnly && (
        <span
          className={cn(
            "text-[15px] font-bold tracking-tight",
            dark ? "text-white" : "text-ink-900 dark:text-white"
          )}
        >
          HuntForTomorrow<span className="text-brand-400">.in</span>
        </span>
      )}
    </Link>
  );
}
