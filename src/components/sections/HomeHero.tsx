"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Briefcase,
  FileCheck2,
  MessagesSquare,
  SearchCheck,
  Send,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";

const heroStats: { icon: LucideIcon; value: string; label: string; tone: "blue" | "mint" | "lavender" }[] = [
  { icon: Briefcase, value: "10K+", label: "Applications Sent", tone: "blue" },
  { icon: TrendingUp, value: "3X", label: "More Interviews", tone: "mint" },
  { icon: BadgeCheck, value: "80%", label: "Client Success Rate", tone: "lavender" },
];

const toneMap = {
  blue: "bg-pastel-blue text-icon-blue",
  mint: "bg-pastel-mint text-icon-teal",
  lavender: "bg-pastel-lavender text-icon-violet",
  orange: "bg-pastel-orange text-icon-orange",
  pink: "bg-pastel-pink text-icon-pink",
} as const;

/**
 * Floating status cards — separate HTML/CSS elements layered over the hero
 * image (never embedded). Positions differ per breakpoint so they never
 * overflow the viewport on mobile.
 */
const floatingPills = [
  {
    icon: FileCheck2,
    label: "Resume Optimized",
    tone: "blue" as const,
    className:
      "left-1 top-6 sm:-left-6 sm:top-10",
    delay: "0s",
  },
  {
    icon: SearchCheck,
    label: "Relevant Jobs Found",
    tone: "mint" as const,
    className: "right-1 top-16 sm:-right-5 sm:top-24",
    delay: "1.3s",
  },
  {
    icon: Send,
    label: "Outreach Sent Automatically",
    tone: "orange" as const,
    className: "left-1 bottom-16 sm:-left-5 sm:bottom-24",
    delay: "0.7s",
  },
  {
    icon: MessagesSquare,
    label: "Interview Preparation",
    tone: "pink" as const,
    className: "right-1 bottom-6 sm:-right-4 sm:bottom-9",
    delay: "1.9s",
  },
];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 size-[380px] rounded-full bg-brand-200/40 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-32 size-72 rounded-full bg-pastel-mint/80 blur-[100px]"
      />

      <div className="shell-pad relative grid items-center gap-8 py-8 sm:py-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:py-12">
        {/* LEFT */}
        <div className="flex flex-col items-start gap-4 sm:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <Pill>AI-Powered Career Ecosystem</Pill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.08 }}
            className="text-balance text-[32px] font-bold leading-[1.08] tracking-tight text-ink-900 dark:text-white sm:text-[42px] lg:text-[46px]"
          >
            Smarter Job Search
            <br />
            for a <span className="text-gradient">Brighter Tomorrow</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.16 }}
            className="max-w-lg text-sm leading-relaxed text-ink-500 dark:text-dark-text-muted sm:text-[15px]"
          >
            An AI-powered ecosystem with 11 specialized AI agents, human guidance, and end-to-end
            support to help you land the right opportunities faster and more effectively.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.24 }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <Button arrow disabled>
              Get Started
            </Button>
            <Button href="/how-it-works" variant="secondary" size="lg">
              See How It Works
            </Button>
          </motion.div>

          {/* mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.32 }}
            className="mt-1 grid w-full max-w-md grid-cols-3 gap-2.5 sm:max-w-lg sm:gap-3"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-2 rounded-2xl border border-line bg-surface/85 p-2.5 backdrop-blur-sm transition-colors dark:border-dark-line dark:bg-surface/80 sm:flex-row sm:items-center sm:gap-2.5 sm:p-3.5"
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full",
                    toneMap[stat.tone]
                  )}
                >
                  <stat.icon className="size-4" aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <p className="text-base font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-lg">
                    {stat.value}
                  </p>
                  <p className="text-[10.5px] font-medium text-ink-500 dark:text-dark-text-muted">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — career visual with floating status cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeOut, delay: 0.18 }}
          className="relative mx-auto w-full max-w-[440px] pb-4 sm:max-w-[480px] lg:pb-0"
        >
          <div className="relative overflow-hidden rounded-[24px] border border-line bg-surface shadow-card transition-colors dark:border-dark-line">
            <Image
              src={assets.homeHero}
              alt="Young professional ready for a brighter career"
              width={520}
              height={560}
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          {/* floating UI cards (separate layered elements) */}
          {floatingPills.map((pill) => (
            <div
              key={pill.label}
              style={{ animationDelay: pill.delay }}
              className={cn(
                "absolute z-10 animate-floaty rounded-xl border border-line bg-surface px-2.5 py-2 shadow-card backdrop-blur-sm transition-colors dark:border-dark-line dark:bg-[#1a1a3dcc] sm:px-3",
                pill.className
              )}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md sm:size-7 sm:rounded-lg",
                    toneMap[pill.tone]
                  )}
                >
                  <pill.icon className="size-3.5 sm:size-4" aria-hidden="true" />
                </span>
                <span className="text-[10.5px] font-bold text-ink-900 dark:text-white sm:text-xs">
                  {pill.label}
                </span>
              </div>
            </div>
          ))}

          {/* handwritten annotation */}
          <div className="absolute -bottom-4 left-2 flex items-end gap-1 sm:-bottom-5 sm:left-6">
            <span className="font-hand text-[20px] font-semibold leading-none text-brand-600 dark:text-brand-300 sm:text-[24px]">
              Your Career Companion
            </span>
            <svg
              viewBox="0 0 60 44"
              className="h-7 w-9 text-brand-500 dark:text-brand-400 sm:h-9 sm:w-11"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 6c10 22 28 32 48 30M44 28l10 7-11 5"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
