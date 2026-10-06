import type { Metadata } from "next";
import { Bot, Compass, Eye, HeartHandshake, UserCheck } from "lucide-react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { coreValues, leadership } from "@/lib/data/founders";
import { testimonials } from "@/lib/data/testimonials";
import FeatureCard from "@/components/cards/FeatureCard";
import TestimonialCard from "@/components/cards/TestimonialCard";
import CTASection from "@/components/layout/CTASection";
import MarqueesSection from "@/components/sections/MarqueesSection";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import IconContainer from "@/components/ui/IconContainer";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who is HuntForTomorrow? Our mission is to make job search smarter, more efficient and more accessible through the power of AI and human guidance.",
};

const valueIcons = [Bot, UserCheck, Eye, HeartHandshake];
const valueTones = ["violet", "blue", "mint", "orange"] as const;

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        eyebrow="About HuntForTomorrow"
        title={
          <>
            About <span className="text-gradient">HuntForTomorrow</span>
          </>
        }
        description="Our mission is to make job search smarter, more efficient and more accessible through the power of AI and human guidance."
        actions={
          <>
            <Button href="#story" variant="primary" size="md" arrow>
              Our Story
            </Button>
            <Button href="/how-it-works" variant="secondary" size="md">
              How It Works
            </Button>
          </>
        }
      >
        <div className="overflow-hidden rounded-[24px] border border-line bg-surface shadow-card dark:border-dark-line">
          <Image
            src={assets.aboutHero}
            alt="The HuntForTomorrow team collaborating around a laptop"
            width={640}
            height={440}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </PageHero>

      {/* Mission / Vision / Approach */}
      <section id="story" className="shell-pad scroll-mt-24 py-10 sm:py-12">
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col gap-3.5 rounded-panel border border-line bg-surface p-6 shadow-soft dark:border-dark-line sm:p-7">
              <IconContainer tone="violet" size="lg">
                <Compass aria-hidden="true" />
              </IconContainer>
              <h2 className="text-xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-2xl">
                Our Mission
              </h2>
              <p className="text-sm leading-relaxed text-ink-500 dark:text-dark-text-muted">
                Help job seekers navigate modern career growth with AI-powered tools, expert
                guidance and structured systems — so every hour spent searching moves you closer to
                the right offer.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-3.5 rounded-panel border border-line bg-surface p-6 shadow-soft dark:border-dark-line sm:p-7">
              <IconContainer tone="blue" size="lg">
                <Eye aria-hidden="true" />
              </IconContainer>
              <h2 className="text-xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-2xl">
                Our Vision
              </h2>
              <p className="text-sm leading-relaxed text-ink-500 dark:text-dark-text-muted">
                A world where no capable professional is held back by an inefficient hiring process
                — where the right opportunity and the right person find each other, faster.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex h-full flex-col gap-3.5 rounded-panel border border-line bg-surface p-6 shadow-soft dark:border-dark-line sm:p-7">
              <IconContainer tone="mint" size="lg">
                <HeartHandshake aria-hidden="true" />
              </IconContainer>
              <h2 className="text-xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-2xl">
                Human + AI Approach
              </h2>
              <p className="text-sm leading-relaxed text-ink-500 dark:text-dark-text-muted">
                Combine advanced AI technology with human expertise — automation for speed and
                consistency, experienced guides for judgment, strategy and negotiation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why we exist + philosophy */}
      <section className="shell-pad py-6 sm:py-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col gap-3 rounded-card border border-line bg-surface p-6 shadow-soft dark:border-dark-line sm:p-7">
              <h2 className="text-lg font-bold tracking-tight text-ink-900 dark:text-white sm:text-xl">
                Why HuntForTomorrow Exists
              </h2>
              <p className="text-sm leading-relaxed text-ink-500 dark:text-dark-text-muted">
                Talented people weren&rsquo;t losing to the market — they were losing to an
                inefficient process: generic resumes, unanswered outreach and endless manual
                tracking. We built an ecosystem of AI agents, structured workflows and human
                mentorship to fix that process end-to-end.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-3 rounded-card border border-line bg-surface p-6 shadow-soft dark:border-dark-line sm:p-7">
              <h2 className="text-lg font-bold tracking-tight text-ink-900 dark:text-white sm:text-xl">
                Career Support Philosophy
              </h2>
              <p className="text-sm leading-relaxed text-ink-500 dark:text-dark-text-muted">
                Every client works with dedicated AI agents executing the busywork and a human
                expert guiding decisions — including 1-on-1 sessions for strategy, interview
                preparation and final negotiation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership / Founder */}
      <section className="shell-pad py-10 sm:py-12">
        <SectionHeader
          eyebrow="Leadership"
          title="Meet Your Host"
          description="The people behind the HuntForTomorrow ecosystem."
        />
        <div className="mt-8 flex justify-center">
          {leadership.map((leader) => (
            <Reveal key={leader.name} className="w-full max-w-4xl">
              <div className="grid items-center gap-7 overflow-hidden rounded-panel border border-line bg-surface p-6 shadow-card dark:border-dark-line sm:p-8 md:grid-cols-[auto_1fr]">
                <div className="relative mx-auto aspect-[4/5] w-44 shrink-0 sm:w-52 md:w-56">
                  <div
                    aria-hidden="true"
                    className="absolute -left-2.5 -top-2.5 size-full rounded-[22px] bg-gradient-to-br from-brand-200 to-brand-400/40 dark:from-brand-600/40 dark:to-brand-400/20"
                  />
                  <div className="relative size-full overflow-hidden rounded-[20px] border border-line shadow-soft dark:border-dark-line">
                    <Image
                      src={leader.image}
                      alt={`${leader.name} — ${leader.role}`}
                      fill
                      sizes="(max-width: 640px) 176px, 224px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-3xl">
                      {leader.name}
                    </h3>
                    <p className="mt-0.5 text-[13px] font-semibold text-brand-600 dark:text-brand-300">
                      {leader.role}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-500 dark:text-dark-text-muted">
                    {leader.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Asia's Top 30 HR",
                      "Mentored 500+ professionals",
                      "CXO / HR Director / Senior Manager levels",
                    ].map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-pastel-lavender px-3 py-1.5 text-xs font-semibold text-icon-violet dark:bg-brand-600/20 dark:text-brand-300"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core values */}
      <section className="shell-pad py-10 sm:py-12">
        <SectionHeader
          eyebrow="What Drives Us"
          title="Our Core Values"
          description="Four principles behind every agent, workflow and conversation."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.06}>
              <FeatureCard
                icon={valueIcons[i]}
                tone={valueTones[i]}
                title={value.title}
                description={value.description}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Client feedback */}
      <section id="client-feedback" className="shell-pad scroll-mt-24 py-10 sm:py-12">
        <SectionHeader
          eyebrow="Client Feedback"
          title="Success Stories"
          description="Real outcomes from job seekers who ran their search with HuntForTomorrow."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.06}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Recognition + talent ecosystem marquees */}
      <MarqueesSection showFeaturedIn showTalentFrom />

      <CTASection
        title="Be a Part of Our Journey"
        description="Whether you're hunting for your next role or building your career alongside us — we'd love to hear from you."
        primaryLabel="Get Started"
        secondaryLabel="Meet the AI Agents"
        secondaryHref="/ai-agents"
      />
    </main>
  );
}
