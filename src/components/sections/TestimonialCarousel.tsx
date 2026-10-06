"use client";

import { featuredTestimonial, supportingTestimonials } from "@/lib/data/testimonials";
import TestimonialCard from "@/components/cards/TestimonialCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";
import { Quote } from "lucide-react";
import clientPicture from "@/RealClientpicture.png";

export default function TestimonialCarousel() {
  const row = [...supportingTestimonials, ...supportingTestimonials];

  return (
    <section id="success-stories" className="shell-pad scroll-mt-28 py-12 sm:py-16">
      <SectionHeader
        eyebrow="Client Feedback"
        title="Success Stories"
        description="Real outcomes from job seekers who ran their search with HuntForTomorrow."
      />

      <div className="mx-auto mt-12 max-w-5xl">
        {/* Featured Testimonial (Dhairya Singh) */}
        <div className="grid overflow-hidden rounded-card border border-line bg-surface shadow-card dark:border-dark-line dark:bg-dark-surface lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-auto">
            <Image 
              src={clientPicture} 
              alt={featuredTestimonial.name} 
              fill 
              placeholder="blur"
              className="object-cover" 
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <div className="mb-6 w-fit rounded-full bg-[#f80000]/10 px-4 py-1.5 text-sm font-bold text-[#f80000] dark:bg-[#f80000]/20">
              Oracle
            </div>
            <Quote className="mb-4 size-8 text-brand-200 dark:text-brand-400/70" aria-hidden="true" />
            <blockquote className="text-lg font-medium leading-relaxed text-ink-700 dark:text-dark-text-secondary sm:text-xl sm:leading-[1.6]">
              &ldquo;{featuredTestimonial.quote}&rdquo;
            </blockquote>
            
            <div className="mt-8 flex flex-col gap-1 border-t border-line pt-6 dark:border-dark-line">
              <span className="font-bold tracking-tight text-ink-900 dark:text-white text-base">
                {featuredTestimonial.name}
              </span>
              <span className="text-sm text-ink-500 dark:text-dark-text-muted">
                {featuredTestimonial.role}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {featuredTestimonial.results?.map(r => (
                <div key={r} className="flex flex-col items-center justify-center rounded-xl bg-page p-3 text-center dark:bg-navy-900">
                   <span className="text-xs font-bold leading-tight text-brand-600 dark:text-brand-400">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee for remaining testimonials */}
      <div 
        className="group relative mx-auto mt-8 w-full max-w-6xl overflow-hidden py-4"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex w-max items-stretch gap-6 animate-marquee-ultra hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <div key={`${t.id}-${i}`} className="w-[320px] sm:w-[380px] shrink-0">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
