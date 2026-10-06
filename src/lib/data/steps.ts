export interface Step {
  number: string;
  title: string;
  description: string;
  agents: string[];
  outputs: string[];
  human: string;
}

export const steps: Step[] = [
  {
    number: "01",
    title: "Understand Your Profile",
    description: "We analyze your background, skills and goals.",
    agents: ["Career Strategist", "Resume Optimiser"],
    outputs: ["Profile & positioning summary", "Career goals document"],
    human: "A strategist reviews your inputs and aligns the plan with you personally.",
  },
  {
    number: "02",
    title: "Create a Strategy",
    description: "Build a personalised job-search plan.",
    agents: ["Career Strategist", "Job Finder"],
    outputs: ["Target roles & company list", "Weekly action plan"],
    human: "Your dedicated guide refines the strategy with you, step by step.",
  },
  {
    number: "03",
    title: "AI-Powered Execution",
    description:
      "AI agents find opportunities, optimise your resume, prepare outreach and more.",
    agents: [
      "Job Scout",
      "Resume Optimiser",
      "Outreach Assistant",
      "LinkedIn Authority Builder",
    ],
    outputs: ["Optimised resume & profiles", "Personalised outreach drafts"],
    human: "You stay in control — every application is approved before it goes out.",
  },
  {
    number: "04",
    title: "Track and Improve",
    description: "Monitor applications and continuously improve your strategy.",
    agents: ["Application Tracker", "Recruiter Radar"],
    outputs: ["Live application pipeline", "Weekly improvement report"],
    human: "Regular check-ins review progress and unblock anything slowing you down.",
  },
  {
    number: "05",
    title: "Get Interviews and Offers",
    description: "Receive interview support and guidance through the final stages.",
    agents: ["Interview Simulator", "Pitch Decker", "Compensation Advisor"],
    outputs: ["Interview preparation sessions", "Offer evaluation & negotiation support"],
    human: "Your mentor prepares you for every round — and the final negotiation.",
  },
];
