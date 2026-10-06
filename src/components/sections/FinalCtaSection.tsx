import { Bot, Target, TrendingUp } from "lucide-react";
import CTASection from "@/components/layout/CTASection";

function CareerGrowthIllustration() {
  return (
    <div className="relative flex items-end justify-center">
      <svg viewBox="0 0 300 240" className="w-full max-w-sm" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="ctaBar" x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="#5B35F5" />
            <stop offset="1" stopColor="#7C4DFF" />
          </linearGradient>
        </defs>
        {/* ascending bars */}
        <rect x="30" y="170" width="38" height="50" rx="8" fill="url(#ctaBar)" opacity="0.35" />
        <rect x="86" y="140" width="38" height="80" rx="8" fill="url(#ctaBar)" opacity="0.55" />
        <rect x="142" y="105" width="38" height="115" rx="8" fill="url(#ctaBar)" opacity="0.8" />
        <rect x="198" y="60" width="38" height="160" rx="8" fill="url(#ctaBar)" />
        {/* trend line */}
        <path
          d="M40 165 L100 130 L156 95 L212 45"
          stroke="#9d7bff"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="212" cy="45" r="9" fill="#9d7bff" />
        <circle cx="212" cy="45" r="16" fill="#9d7bff" opacity="0.25" />
        {/* person reaching top */}
        <g transform="translate(196 -12)">
          <circle cx="20" cy="20" r="11" fill="#fff" />
          <path d="M20 33c-12 0-20 8-21 21h42c-1-13-9-21-21-21z" fill="#fff" />
        </g>
        {/* small ascending accent dot */}
        <circle cx="262" cy="40" r="5" fill="#fff" opacity="0.8" />
      </svg>

      {/* floating chips over the illustration */}
      <span className="absolute -left-2 top-8 animate-floaty rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">
        <span className="flex items-center gap-1.5">
          <Target className="size-3.5" aria-hidden="true" /> Right Role
        </span>
      </span>
      <span
        className="absolute right-0 top-2 animate-floaty rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="flex items-center gap-1.5">
          <TrendingUp className="size-3.5" aria-hidden="true" /> Career Growth
        </span>
      </span>
      <span
        className="absolute bottom-10 left-4 animate-floaty rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm"
        style={{ animationDelay: "2s" }}
      >
        <span className="flex items-center gap-1.5">
          <Bot className="size-3.5" aria-hidden="true" /> 11 AI Agents
        </span>
      </span>
    </div>
  );
}

export default function FinalCtaSection() {
  return (
    <CTASection
      title="Ready to Start Your Journey?"
      description="Join HuntForTomorrow and get access to AI agents, expert guidance and a structured system to land your next opportunity."
      primaryLabel="Get Started"
      secondaryLabel="Learn More"
      illustration={<CareerGrowthIllustration />}
    />
  );
}
