import { assets } from "@/lib/assets";

export interface Leader {
  name: string;
  role: string;
  bio: string;
  image: string;
}

/**
 * LEADERSHIP — verified information only.
 * Placeholder/invented founder entries have been removed per content cleanup.
 * Add additional verified leaders here when details are provided.
 */
export const leadership: Leader[] = [
  {
    name: "Mukul Sharma",
    role: "CEO & Co-Founder — Hunt For Tomorrow",
    bio: "Recognized among Asia's Top 30 HR, with deep experience in talent acquisition and career strategy. Has personally mentored 500+ professionals, including senior leaders at CXO, HR Director and Senior Manager levels.",
    image: assets.ceo,
  },
];

export const coreValues = [
  {
    title: "Innovation",
    description:
      "We build with the newest AI capabilities — and keep pushing what's possible in career support.",
  },
  {
    title: "User-Centric",
    description:
      "Every workflow starts with one question: what actually helps this person get hired?",
  },
  {
    title: "Transparency",
    description:
      "Clear plans, clear pricing, clear progress. You always know where your search stands.",
  },
  {
    title: "Impact",
    description:
      "We measure ourselves by one thing — the interviews, offers and growth our clients achieve.",
  },
];
