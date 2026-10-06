export const siteName = "HuntForTomorrow.in";
export const siteTagline = "Smarter Job Search for a Brighter Tomorrow";

export const getStartedDisabled = true;

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "AI Agents", href: "/ai-agents" },
  { label: "Services", href: "/services" },
  { label: "HFT Academy", href: "/academy" },
  { label: "Tools", href: "/tools" },
];

export type DropdownLink = NavLink;

export const resourcesDropdown: DropdownLink[] = [
  { label: "Job Search Advice", href: "/academy#resources" },
  { label: "Hiring Trends", href: "/academy#resources" },
  { label: "Career Blog", href: "/academy#resources" },
  { label: "Guide", href: "/how-it-works#process" },
  { label: "Job Search Training", href: "/academy#resources" },
  { label: "Success Stories", href: "/#success-stories" },
];

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "ATS Resume Checker", href: "/tools/resume-jd-analysis" },
      { label: "Cover Letter Generator", href: "/academy#resources" },
      { label: "Job Application Tracker", href: "/ai-agents" },
      { label: "AI Resume Builder", href: "/services" },
      { label: "AI Mock Interview", href: "/ai-agents" },
      { label: "Career Coaching", href: "/services" },
      { label: "Job Search Training", href: "/academy#resources" },
      { label: "Success Stories", href: "/#success-stories" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Job Search Advice", href: "/academy#resources" },
      { label: "Hiring Trends", href: "/academy#resources" },
      { label: "Career Blog", href: "/academy#resources" },
      { label: "Guide", href: "/how-it-works#process" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Refund", href: "/legal/refund" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

/**
 * Social profile URLs — placeholders wired for easy replacement
 * once official profiles are live.
 */
export const socialLinks: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/huntfortomorrow" },
  { label: "Instagram", href: "https://www.instagram.com/huntfortomorrow" },
  { label: "X (Twitter)", href: "https://x.com/huntfortomorrow" },
  { label: "YouTube", href: "https://www.youtube.com/@huntfortomorrow" },
];

export const supportEmail = "hello@huntfortomorrow.in";
