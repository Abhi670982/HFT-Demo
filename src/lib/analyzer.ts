/**
 * FRONTEND DEMO ANALYSIS ENGINE
 * ------------------------------
 * Runs entirely in the browser — no backend calls. The architecture is
 * intentionally isolated in this module so a real AI API can replace the
 * `analyzeResumeAndJd` function later without touching any UI code.
 */

export interface AnalyzerInput {
  resumeText: string;
  jdText: string;
}

export interface AnalysisResult {
  overall: number;
  keywordMatch: number;
  skillsMatch: number;
  experienceMatch: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  gaps: string[];
  recommendations: string[];
}

const STOPWORDS = new Set([
  "the","and","for","with","you","your","will","are","have","this","that","from","our","their",
  "who","was","not","but","all","can","has","was","its","his","her","one","two","three","may",
  "job","role","work","team","teams","company","years","year","plus","strong","good","great",
  "must","should","would","able","well","also","into","over","more","most","some","such","only",
  "they","them","then","than","when","what","which","while","where","being","been","were","each",
  "other","using","used","use","new","like","including","include","includes","across","within",
  "about","please","apply","candidates","candidate","required","require","requires","responsibilities",
  "experience","experienced","skills","skill","working","looking","join","help","make","made",
  "per","any","etc","via","at","in","on","of","to","a","an","as","is","it","or","by","be","we",
]);

/** Curated skill dictionary used to extract meaningful requirements from the JD. */
const SKILL_DICTIONARY: string[] = [
  "react","next.js","angular","vue","typescript","javascript","node.js","python","java","c++","c#",
  "go","rust","php","ruby","kotlin","swift","flutter","react native","html","css","tailwind",
  "sql","mysql","postgresql","mongodb","redis","elasticsearch","graphql","rest api","docker",
  "kubernetes","aws","azure","gcp","ci/cd","jenkins","terraform","linux","git","microservices",
  "system design","data structures","algorithms","machine learning","deep learning","nlp","pandas",
  "numpy","tensorflow","pytorch","tableau","power bi","excel","spark","hadoop","etl","data analysis",
  "product management","roadmap","agile","scrum","kanban","jira","figma","ui/ux","user research",
  "seo","sem","google analytics","content marketing","brand management","crm","salesforce",
  "hubspot","financial modeling","accounting","risk management","recruitment","onboarding",
  "communication","leadership","stakeholder management","problem solving","negotiation",
  "project management","testing","selenium","automation","devops","sre","security","oauth",
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9+#./\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function wordSet(text: string): Set<string> {
  return new Set(normalize(text).split(" ").filter((w) => w.length > 2 && !STOPWORDS.has(w)));
}

function detectSkills(text: string): string[] {
  const t = normalize(text);
  return SKILL_DICTIONARY.filter((skill) => t.includes(skill));
}

function detectYears(text: string): number {
  const matches = text.match(/(\d{1,2})\s*\+?\s*(?:-\s*\d{1,2}\s*)?years?/g) ?? [];
  const nums = matches
    .map((m) => parseInt(m.match(/\d{1,2}/)?.[0] ?? "0", 10))
    .filter((n) => n > 0 && n < 40);
  return nums.length ? Math.max(...nums) : 0;
}

export function analyzeResumeAndJd({ resumeText, jdText }: AnalyzerInput): AnalysisResult {
  const resume = normalize(resumeText);
  const jd = normalize(jdText);

  const jdWords = wordSet(jdText);
  const resumeWords = wordSet(resumeText);

  // 1. Keyword extraction — top skills + frequent meaningful words from the JD
  const jdSkills = detectSkills(jdText);
  const freqWords = Array.from(jdWords)
    .filter((w) => !jdSkills.some((s) => s.includes(w)))
    .sort((a, b) => jd.split(b).length - jd.split(a).length)
    .slice(0, 8);
  const keywords = [...new Set([...jdSkills, ...freqWords])].slice(0, 18);

  const matchedKeywords = keywords.filter(
    (k) => resumeWords.has(k) || resume.includes(k)
  );
  const missingKeywords = keywords.filter((k) => !matchedKeywords.includes(k));
  const keywordMatch = keywords.length
    ? Math.round((matchedKeywords.length / keywords.length) * 100)
    : 60;

  // 2. Skills match
  const resumeSkills = detectSkills(resumeText);
  const skillsMatch = jdSkills.length
    ? Math.round((jdSkills.filter((s) => resumeSkills.includes(s)).length / jdSkills.length) * 100)
    : Math.min(keywordMatch + 10, 95);

  // 3. Experience match (heuristic)
  const jdYears = detectYears(jdText);
  const resumeYears = detectYears(resumeText);
  let experienceMatch: number;
  if (jdYears > 0) {
    experienceMatch = resumeYears >= jdYears ? 92 : Math.max(35, Math.round((resumeYears / jdYears) * 88));
  } else {
    const senioritySignals = ["led","managed","owned","architected","mentored","drove","delivered","scaled"].filter(
      (s) => resume.includes(s)
    ).length;
    experienceMatch = Math.min(55 + senioritySignals * 8, 90);
  }

  // 4. Overall score — weighted blend
  const overall = Math.min(
    99,
    Math.max(20, Math.round(keywordMatch * 0.4 + skillsMatch * 0.35 + experienceMatch * 0.25))
  );

  // 5. Profile gaps
  const gaps: string[] = [];
  if (missingKeywords.length > 3) {
    gaps.push(`Missing ${missingKeywords.length} keywords the JD emphasises — including ${missingKeywords.slice(0, 3).join(", ")}.`);
  }
  if (!/achievements?|improved|increased|reduced|%\s*(increase|growth)|\d+x/.test(resume)) {
    gaps.push("No quantified achievements detected — add measurable outcomes (%, ₹, time saved).");
  }
  if (!/education|b\.tech|bachelor|master|m\.tech|mba|degree/.test(resume)) {
    gaps.push("Education section not detected — recruiters and ATS filters look for it.");
  }
  if (!/certification|certified/.test(resume) && /certification|certified/.test(jd)) {
    gaps.push("The JD mentions certifications your resume doesn't list.");
  }
  if (gaps.length === 0) {
    gaps.push("No major gaps detected — your profile covers the core requirements well.");
  }

  // 6. Recommendations
  const recommendations: string[] = [];
  if (missingKeywords.length) {
    recommendations.push(
      `Weave these keywords into your resume where genuinely relevant: ${missingKeywords.slice(0, 4).join(", ")}.`
    );
  }
  recommendations.push(
    "Start your summary with the exact job title from the JD to pass title-based ATS filters."
  );
  if (experienceMatch < 75) {
    recommendations.push(
      "Reframe earlier work to highlight depth and ownership — match the seniority the JD is asking for."
    );
  }
  recommendations.push(
    "Mirror the JD's top 3 skills in your most recent role's bullet points, each with a measurable result."
  );

  return {
    overall,
    keywordMatch,
    skillsMatch,
    experienceMatch,
    matchedKeywords,
    missingKeywords,
    gaps,
    recommendations,
  };
}

/** Built-in demo content so visitors can try the flow with one click. */
export const SAMPLE_RESUME = `Demo Candidate — Software Engineer, Bengaluru
Summary: Full-stack engineer with 4 years building web applications in React, Node.js and TypeScript.
Experience:
Senior Software Engineer — FinEdge (2022–present)
- Built and shipped 6 product features in React and TypeScript used by 40K+ monthly users.
- Improved API response times by 35% by redesigning Node.js services and adding Redis caching.
- Led migration of legacy REST APIs to GraphQL, reducing mobile payload size by 28%.
Software Engineer — TechNest (2020–2022)
- Developed dashboards with React, Redux and SQL, cutting report generation time by 60%.
- Wrote integration tests, raising coverage from 45% to 80%.
Skills: React, TypeScript, Node.js, GraphQL, Redis, SQL, Git, Agile
Education: B.Tech, Computer Science, VTU (2020)`;

export const SAMPLE_JD = `Senior Frontend Engineer — Growth Team
We are looking for a senior engineer to own critical user-facing surfaces.
Requirements:
- 5+ years of experience building production web applications.
- Expert in React and TypeScript; Next.js experience is a strong plus.
- Experience with REST APIs and GraphQL, caching strategies (Redis) and performance optimisation.
- Familiarity with Docker and AWS deployment pipelines.
- Strong system design fundamentals and experience mentoring engineers.
- Bachelor's degree in Computer Science or related field.`;
