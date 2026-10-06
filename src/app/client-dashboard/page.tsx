"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeIndianRupee,
  Bot,
  CalendarCheck,
  ClipboardList,
  FileText,
  Handshake,
  LayoutDashboard,
  Mail,
  Radar,
  Send,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/ui/Logo";
import Pill from "@/components/ui/Pill";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "strategy", label: "Career Strategy", icon: Target },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "opportunities", label: "Opportunities", icon: LayoutDashboard },
  { id: "recruiters", label: "Recruiters", icon: Radar },
  { id: "outreach", label: "Outreach", icon: Send },
  { id: "applications", label: "Applications", icon: ClipboardList },
  { id: "interviews", label: "Interviews", icon: CalendarCheck },
  { id: "compensation", label: "Compensation", icon: BadgeIndianRupee },
] as const;

type TabId = (typeof tabs)[number]["id"];

const demoContent: Record<TabId, { heading: string; note: string; rows: { title: string; meta: string; chip: string; tone: string }[] }> = {
  strategy: {
    heading: "Career Strategy",
    note: "Your positioning, target roles and this week's plan — built with your strategist.",
    rows: [
      { title: "Positioning statement v3", meta: "Approved by mentor · Mon", chip: "Finalised", tone: "bg-pastel-green text-icon-teal" },
      { title: "Target companies — Tier 1 list", meta: "12 companies · updated Fri", chip: "Active", tone: "bg-pastel-blue text-icon-blue" },
      { title: "Weekly action plan", meta: "Outreach x8 · 2 mock interviews", chip: "In progress", tone: "bg-pastel-orange text-icon-orange" },
    ],
  },
  resume: {
    heading: "Resume",
    note: "Role-tailored versions prepared by the Resume Optimiser.",
    rows: [
      { title: "Senior PM — Product-led SaaS", meta: "ATS score 91 · v4", chip: "Ready", tone: "bg-pastel-green text-icon-teal" },
      { title: "Senior PM — FinTech", meta: "ATS score 87 · v3", chip: "Ready", tone: "bg-pastel-green text-icon-teal" },
      { title: "Master resume", meta: "Base version · updated Tue", chip: "Master", tone: "bg-pastel-lavender text-icon-violet" },
    ],
  },
  opportunities: {
    heading: "Opportunities",
    note: "Curated roles matched to your strategy by Job Finder and Job Scout.",
    rows: [
      { title: "Senior Product Manager — GrowthPad", meta: "92% match · posted 2h ago", chip: "New", tone: "bg-pastel-mint text-icon-teal" },
      { title: "Lead PM — FinEdge", meta: "88% match · posted today", chip: "Shortlisted", tone: "bg-pastel-blue text-icon-blue" },
      { title: "Product Manager — Shopkart", meta: "81% match · posted yesterday", chip: "Reviewing", tone: "bg-pastel-orange text-icon-orange" },
    ],
  },
  recruiters: {
    heading: "Recruiters",
    note: "Recruiter Radar's live map of who's hiring in your domain.",
    rows: [
      { title: "A. Kapoor — Talent Partner, TechHire", meta: "Hiring: Senior PMs · active this week", chip: "Connect", tone: "bg-pastel-pink text-icon-pink" },
      { title: "R. Nair — HR Director, FinEdge", meta: "Posted 3 relevant roles", chip: "Warm", tone: "bg-pastel-orange text-icon-orange" },
      { title: "S. Mehta — Consultant, HireWorks", meta: "Suggested: intro via outreach agent", chip: "Queued", tone: "bg-pastel-lavender text-icon-violet" },
    ],
  },
  outreach: {
    heading: "Outreach",
    note: "Personalised sequences drafted by the Outreach Assistant — you approve before sending.",
    rows: [
      { title: "Intro note — GrowthPad hiring manager", meta: "Awaiting your approval", chip: "Draft", tone: "bg-pastel-orange text-icon-orange" },
      { title: "Follow-up 2 — FinEdge recruiter", meta: "Sent Wed · reply received", chip: "Replied", tone: "bg-pastel-green text-icon-teal" },
      { title: "LinkedIn connection — Shopkart PM lead", meta: "Queued for Thursday", chip: "Scheduled", tone: "bg-pastel-blue text-icon-blue" },
    ],
  },
  applications: {
    heading: "Applications",
    note: "Your live pipeline — every application, status and next step.",
    rows: [
      { title: "GrowthPad — Senior PM", meta: "Applied Mon · recruiter screen booked", chip: "Interview", tone: "bg-pastel-green text-icon-teal" },
      { title: "FinEdge — Lead PM", meta: "Applied Fri · under review", chip: "In review", tone: "bg-pastel-blue text-icon-blue" },
      { title: "Shopkart — PM", meta: "Applied last week", chip: "Applied", tone: "bg-pastel-lavender text-icon-violet" },
    ],
  },
  interviews: {
    heading: "Interviews",
    note: "Preparation sessions and upcoming rounds with the Interview Simulator.",
    rows: [
      { title: "Recruiter screen — GrowthPad", meta: "Tomorrow 4:00 PM · prep pack ready", chip: "Upcoming", tone: "bg-pastel-mint text-icon-teal" },
      { title: "Mock round 2 — case & guesstimates", meta: "Completed · score 84", chip: "Done", tone: "bg-pastel-green text-icon-teal" },
      { title: "Story drills — leadership examples", meta: "With mentor · Friday", chip: "Scheduled", tone: "bg-pastel-blue text-icon-blue" },
    ],
  },
  compensation: {
    heading: "Compensation",
    note: "Market benchmarks and negotiation strategy from the Compensation Advisor.",
    rows: [
      { title: "GrowthPad offer — evaluation", meta: "CTC vs market: +12% · negotiate fixed", chip: "Action", tone: "bg-pastel-orange text-icon-orange" },
      { title: "Benchmark — Senior PM, Bengaluru", meta: "p50–p75 band · updated this month", chip: "Reference", tone: "bg-pastel-lavender text-icon-violet" },
      { title: "Negotiation script — final round", meta: "Reviewed with mentor", chip: "Ready", tone: "bg-pastel-green text-icon-teal" },
    ],
  },
};

export default function ClientDashboardPage() {
  const [tab, setTab] = useState<TabId>("strategy");
  const content = demoContent[tab];

  return (
    <main className="flex flex-col px-3 py-8 sm:px-6">
      <div className="mx-auto grid w-full max-w-[1400px] gap-6 lg:grid-cols-[260px_1fr]">
        {/* sidebar */}
        <aside
          className={cn(
            "h-fit rounded-panel border border-line bg-surface p-4 shadow-soft lg:sticky lg:top-28",
          )}
        >
          <div className="mb-4 hidden px-2 lg:block">
            <Logo markOnly className="mb-3" />
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-400">
              Client Workspace
            </p>
            <p className="mt-0.5 text-sm font-bold text-ink-900">Demo Client</p>
          </div>
          <nav aria-label="Dashboard sections" className="flex flex-wrap gap-1.5 lg:flex-col">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[13.5px] font-semibold transition-all",
                  tab === t.id
                    ? "bg-gradient-to-r from-brand-600 to-brand-400 text-white shadow-glow"
                    : "text-ink-600 hover:bg-page hover:text-ink-900"
                )}
              >
                <t.icon className="size-4 shrink-0" aria-hidden="true" />
                {t.label}
              </button>
            ))}
          </nav>
          <div className="mt-4 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 p-4 text-white">
            <p className="flex items-center gap-2 text-[13px] font-bold">
              <Bot className="size-4" aria-hidden="true" /> Agents active
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/80">
              11 agents are monitoring, drafting and tracking in the background.
            </p>
          </div>
        </aside>

        {/* content */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-panel border border-line bg-surface p-6 shadow-soft sm:p-7">
            <div>
              <Pill>Client Dashboard — Demo</Pill>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
                {content.heading}
              </h1>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-500">{content.note}</p>
            </div>
            <div className="hidden items-center gap-2 rounded-xl bg-page px-4 py-3 sm:flex">
              <Mail className="size-4 text-icon-violet" aria-hidden="true" />
              <span className="text-xs font-semibold text-ink-600">demo.client@example.com</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4"
            >
              {content.rows.map((row) => (
                <div
                  key={row.title}
                  className="group flex flex-wrap items-center gap-4 rounded-card border border-line bg-surface p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card sm:p-6"
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl",
                      row.tone.split(" ")[0],
                    )}
                  >
                    <Handshake className="size-5 opacity-70" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-bold text-ink-900">{row.title}</p>
                    <p className="truncate text-[13px] text-ink-500">{row.meta}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1.5 text-[11px] font-bold",
                      row.tone
                    )}
                  >
                    {row.chip}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="rounded-2xl border border-dashed border-line-strong bg-surface/60 p-4 text-center text-xs leading-relaxed text-ink-400">
            Frontend demo dashboard with sample data — no real backend, no real client data. Replace
            with live APIs when the backend is ready.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
            <Link
              href="/client-access"
              className="text-sm font-semibold text-ink-500 transition-colors hover:text-brand-600"
            >
              ← Sign in as a different client
            </Link>
            <Link
              href="/get-started"
              className="text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
            >
              Start your own journey →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
