import {
  AtSign,
  ClipboardList,
  Compass,
  Crosshair,
  FileText,
  IndianRupee,
  MessagesSquare,
  Radar,
  Send,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { IconTone } from "@/lib/types";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: IconTone;
}

export const services: Service[] = [
  {
    id: "career-role-positioning",
    title: "Career & Role Positioning",
    description:
      "Clarify the roles that fit your strengths — and exactly how to position yourself for them.",
    icon: Compass,
    tone: "violet",
  },
  {
    id: "resume-development",
    title: "Resume Development",
    description:
      "ATS-friendly, role-targeted resumes that pass screening and make recruiters stop scrolling.",
    icon: FileText,
    tone: "blue",
  },
  {
    id: "linkedin-naukri-optimisation",
    title: "LinkedIn & Naukri Optimisation",
    description:
      "Profiles that rank in recruiter searches, convert profile views into conversations.",
    icon: AtSign,
    tone: "mint",
  },
  {
    id: "company-targeting",
    title: "Company Targeting",
    description:
      "A focused list of companies that match your goals — so you apply with intent, not at random.",
    icon: Target,
    tone: "purple",
  },
  {
    id: "recruiter-discovery",
    title: "Recruiter Discovery",
    description:
      "Find and connect with the recruiters actively hiring in your domain and level.",
    icon: Radar,
    tone: "pink",
  },
  {
    id: "job-matching",
    title: "Job Matching",
    description:
      "Curated openings matched to your profile and strategy — a shortlist, not a haystack.",
    icon: Crosshair,
    tone: "orange",
  },
  {
    id: "personalised-outreach",
    title: "Personalised Outreach",
    description:
      "Messages and follow-ups crafted for every opportunity, so you get noticed and get replies.",
    icon: Send,
    tone: "green",
  },
  {
    id: "application-tracking",
    title: "Application Tracking",
    description:
      "A clear pipeline of every application, status and next step — nothing slips through.",
    icon: ClipboardList,
    tone: "blue",
  },
  {
    id: "interview-support",
    title: "Interview Support",
    description:
      "Preparation, mock rounds and guidance for every stage — from screening to final discussion.",
    icon: MessagesSquare,
    tone: "rose",
  },
  {
    id: "compensation-negotiation",
    title: "Compensation / Negotiation",
    description:
      "Benchmark your offers against the market and negotiate with data-backed confidence.",
    icon: IndianRupee,
    tone: "mint",
  },
];
