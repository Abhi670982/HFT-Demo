import { mediaLogos, placedAtLogos, talentLogos } from "@/lib/data/logos";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import { BadgeCheck, Newspaper, TrendingUp } from "lucide-react";

/**
 * Homepage keeps only the approved "People Placed At" strip.
 * (Trusted by Job Seekers, Featured In and Worked With Talent marquees
 * live on the About page.)
 */
export default function MarqueesSection({
  showFeaturedIn = false,
  showTalentFrom = false,
}: {
  showFeaturedIn?: boolean;
  showTalentFrom?: boolean;
} = {}) {
  return (
    <section className="flex flex-col gap-2 py-8 sm:py-10">
      {/* People placed at */}
      <div className="shell-pad">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <span className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-icon-teal">
            <BadgeCheck className="size-4" aria-hidden="true" /> People Placed At
          </span>
          <h2 className="text-lg font-bold tracking-tight text-ink-900 dark:text-white sm:text-xl">
            Our clients are working toward teams like these
          </h2>
        </Reveal>
      </div>
      <Marquee items={placedAtLogos} />

      {/* Optional extras (used on the About page) */}
      {showTalentFrom && (
        <>
          <div className="shell-pad pt-5">
            <Reveal className="flex flex-col items-center gap-2 text-center">
              <span className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-icon-blue">
                <TrendingUp className="size-4" aria-hidden="true" /> Worked With Talent From
              </span>
              <h2 className="mx-auto max-w-xl text-lg font-bold tracking-tight text-ink-900 dark:text-white sm:text-xl">
                Worked with talent from leading companies
              </h2>
            </Reveal>
          </div>
          <Marquee items={talentLogos} slow />
        </>
      )}

      {showFeaturedIn && (
        <>
          <div className="shell-pad pt-5">
            <Reveal className="flex flex-col items-center gap-2 text-center">
              <span className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-brand-500">
                <Newspaper className="size-4" aria-hidden="true" /> Featured In
              </span>
              <h2 className="text-lg font-bold tracking-tight text-ink-900 dark:text-white sm:text-xl">
                Recognized by leading media platforms
              </h2>
            </Reveal>
          </div>
          <Marquee items={mediaLogos} dark slow />
        </>
      )}
    </section>
  );
}
