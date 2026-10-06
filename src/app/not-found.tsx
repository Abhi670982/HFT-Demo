import { Compass } from "lucide-react";
import Button from "@/components/ui/Button";
import IconContainer from "@/components/ui/IconContainer";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <IconContainer tone="violet" size="lg">
        <Compass aria-hidden="true" />
      </IconContainer>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">Error 404</p>
      <h1 className="text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
        This page went off-strategy
      </h1>
      <p className="max-w-md text-[15px] leading-relaxed text-ink-500">
        The page you&rsquo;re looking for doesn&rsquo;t exist — but your next opportunity is still
        right where you left it.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/" variant="primary" size="lg" arrow>
          Back to Home
        </Button>
        <Button href="/ai-agents" variant="secondary" size="lg">
          Meet the AI Agents
        </Button>
      </div>
    </main>
  );
}
