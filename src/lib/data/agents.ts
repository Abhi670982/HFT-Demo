import {
  AtSign,
  Binoculars,
  ClipboardList,
  Compass,
  FileText,
  IndianRupee,
  MessagesSquare,
  Presentation,
  Radar,
  Send,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";
import type { IconTone } from "@/lib/types";

export type AgentCategory = "strategy" | "discovery" | "branding" | "outreach" | "interview";

export interface Agent {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  tone: IconTone;
  category: AgentCategory;
  problemSolved: string;
  whatItDoes: string[];
  output: string;
  journey: string;
}

export const agentCategories: { id: AgentCategory | "all"; label: string }[] = [
  { id: "all", label: "All Agents" },
  { id: "strategy", label: "Strategy" },
  { id: "discovery", label: "Job Discovery" },
  { id: "branding", label: "Personal Branding" },
  { id: "outreach", label: "Outreach & Tracking" },
  { id: "interview", label: "Interview & Offers" },
];

export const agents: Agent[] = [
  {
    id: "career-strategist",
    name: "Career Strategist",
    tagline: "Your positioning and planning expert",
    description:
      "Understands your background and goals, then defines the positioning and strategy for your entire job search.",
    icon: Compass,
    tone: "violet",
    category: "strategy",
    problemSolved:
      "Most job seekers apply without a clear positioning, so every application starts from zero.",
    whatItDoes: [
      "Analyses your experience, strengths and goals",
      "Defines your target roles and career narrative",
      "Builds a personalised week-by-week strategy",
    ],
    output: "A clear positioning statement and a structured job-search plan.",
    journey: "Step 1–2 of your journey — everything else is built on this foundation.",
  },
  {
    id: "job-finder",
    name: "Job Finder",
    tagline: "Finds roles that actually fit you",
    description:
      "Matches your profile against live openings to surface the roles where you are genuinely competitive.",
    icon: SearchCheck,
    tone: "blue",
    category: "discovery",
    problemSolved:
      "Job boards bury relevant roles under thousands that don't match your profile.",
    whatItDoes: [
      "Continuously scans openings across platforms",
      "Scores every role against your profile",
      "Sends you a curated shortlist, not noise",
    ],
    output: "A daily shortlist of relevant, matched opportunities.",
    journey: "Runs in the background from day one of your search.",
  },
  {
    id: "resume-optimiser",
    name: "Resume Optimiser",
    tagline: "Tailors your resume to every role",
    description:
      "Rewrites and restructures your resume for each application so it clears screening and stands out.",
    icon: FileText,
    tone: "mint",
    category: "branding",
    problemSolved:
      "Generic resumes get ignored — recruiters spend seconds deciding who moves forward.",
    whatItDoes: [
      "Aligns keywords and achievements to each JD",
      "Improves structure, impact and readability",
      "Keeps versions ready for every target role",
    ],
    output: "Role-tailored, screening-ready resume versions.",
    journey: "Activates before every application you submit.",
  },
  {
    id: "outreach-assistant",
    name: "Outreach Assistant",
    tagline: "Messages that get replies",
    description:
      "Drafts personalised outreach to recruiters and hiring teams so your name lands in the right inbox.",
    icon: Send,
    tone: "orange",
    category: "outreach",
    problemSolved:
      "Cold, copy-paste messages rarely reach recruiters or get responses.",
    whatItDoes: [
      "Writes personalised messages per company and role",
      "Times and sequences follow-ups",
      "Keeps your voice consistent across channels",
    ],
    output: "Ready-to-send outreach sequences with follow-ups.",
    journey: "Works alongside applications — proactive, not just reactive.",
  },
  {
    id: "application-tracker",
    name: "Application Tracker",
    tagline: "Every application, under control",
    description:
      "Keeps all your applications, statuses and next actions organised in one clear pipeline.",
    icon: ClipboardList,
    tone: "purple",
    category: "outreach",
    problemSolved:
      "Losing track of applications means missed follow-ups and lost opportunities.",
    whatItDoes: [
      "Logs every application and its status",
      "Prompts timely follow-ups and nudges",
      "Highlights where to focus your energy",
    ],
    output: "A live pipeline of your entire job search.",
    journey: "Your control room from first application to offer.",
  },
  {
    id: "recruiter-radar",
    name: "Recruiter Radar",
    tagline: "Finds the right recruiters for you",
    description:
      "Maps recruiters and hiring managers relevant to your target roles and tracks the right moment to connect.",
    icon: Radar,
    tone: "pink",
    category: "discovery",
    problemSolved:
      "The best opportunities move through recruiters you haven't discovered yet.",
    whatItDoes: [
      "Identifies domain-relevant recruiters",
      "Tracks their active hiring areas",
      "Suggests the right time and angle to reach out",
    ],
    output: "A targeted recruiter map for your domain.",
    journey: "Runs parallel to job discovery to open direct channels.",
  },
  {
    id: "job-scout",
    name: "Job Scout",
    tagline: "Fresh openings, found early",
    description:
      "Scans the market daily for newly posted and less-crowded openings that match your strategy.",
    icon: Binoculars,
    tone: "green",
    category: "discovery",
    problemSolved:
      "By the time you see a posting on a job board, hundreds have already applied.",
    whatItDoes: [
      "Monitors company pages and niche boards",
      "Flags fresh, relevant openings first",
      "Prioritises roles with less competition",
    ],
    output: "Early alerts on openings that fit your plan.",
    journey: "Daily vigilance so you're always early, never late.",
  },
  {
    id: "linkedin-authority-builder",
    name: "LinkedIn Authority Builder",
    tagline: "A profile that attracts opportunities",
    description:
      "Optimises your LinkedIn and Naukri presence so recruiters find you — and want to reach out.",
    icon: AtSign,
    tone: "blue",
    category: "branding",
    problemSolved:
      "A weak profile makes you invisible to recruiters searching for exactly your skills.",
    whatItDoes: [
      "Optimises headlines, keywords and sections",
      "Positions you as an authority in your domain",
      "Guides content that builds visibility",
    ],
    output: "Search-optimised profiles that attract inbound interest.",
    journey: "Set up early, compounding throughout your search.",
  },
  {
    id: "pitch-decker",
    name: "Pitch Decker",
    tagline: "Your story, told sharply",
    description:
      "Turns your experience into crisp personal pitches, portfolio narratives and role-specific decks.",
    icon: Presentation,
    tone: "rose",
    category: "branding",
    problemSolved:
      "Great experience gets lost when you can't tell your story clearly and quickly.",
    whatItDoes: [
      "Builds your 30-second and deep-dive narratives",
      "Creates role-specific pitch material",
      "Prepares talking points for key conversations",
    ],
    output: "Pitch-ready narratives for interviews and networking.",
    journey: "Prepares you before interviews and key discussions.",
  },
  {
    id: "interview-simulator",
    name: "Interview Simulator",
    tagline: "Practice that feels like the real thing",
    description:
      "Runs realistic mock interviews with structured, actionable feedback for every round.",
    icon: MessagesSquare,
    tone: "violet",
    category: "interview",
    problemSolved:
      "Interviews are won on preparation — yet most candidates walk in unpractised.",
    whatItDoes: [
      "Simulates role-specific and HR rounds",
      "Scores answers with structured feedback",
      "Drills your weak areas until they're strong",
    ],
    output: "Interview-ready confidence with improved answers.",
    journey: "Kicks in the moment interviews start coming in.",
  },
  {
    id: "compensation-advisor",
    name: "Compensation Advisor",
    tagline: "Benchmark. Negotiate. Win.",
    description:
      "Benchmarks your offers against market data and guides you through confident negotiation.",
    icon: IndianRupee,
    tone: "orange",
    category: "interview",
    problemSolved:
      "Candidates routinely leave money on the table by negotiating without data.",
    whatItDoes: [
      "Benchmarks roles, levels and pay bands",
      "Builds your negotiation strategy",
      "Scripts the conversation, including counter-offers",
    ],
    output: "Data-backed negotiation guidance for every offer.",
    journey: "The final step — turning offers into the right offer.",
  },
];
