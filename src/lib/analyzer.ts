/**
 * FRONTEND DEMO ANALYSIS ENGINE
 * ------------------------------
 * Runs entirely in the browser — no backend calls. The architecture is
 * intentionally isolated in this module so a real AI API can replace the
 * `analyzeResumeAndJd` function later without touching any UI code.
 *
 * Inputs must already be validated: the resume via `validateResumeText`
 * (which returns the ParsedResume used here) and the JD via
 * `validateJobDescription`. The result is checked by `assertValidResult`
 * before it is returned, so the UI never renders a malformed analysis — the
 * same guard should wrap any future AI response.
 */

import { ResumeToolError } from "@/lib/resume/errors";
import type { ParsedResume } from "@/lib/resume/parse";
import { detectSkills } from "@/lib/resume/skills";

export interface AnalyzerInput {
  resume: ParsedResume;
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
  "who","was","not","but","all","can","has","its","his","her","one","two","three","may",
  "job","role","work","team","teams","company","years","year","plus","strong","good","great",
  "must","should","would","able","well","also","into","over","more","most","some","such","only",
  "they","them","then","than","when","what","which","while","where","being","been","were","each",
  "other","using","used","use","new","like","including","include","includes","across","within",
  "about","please","apply","candidates","candidate","required","require","requires","responsibilities",
  "experience","experienced","skills","skill","working","looking","join","help","make","made",
  "per","any","etc","via","at","in","on","of","to","a","an","as","is","it","or","by","be","we",
  "ideal","opportunity","environment","ability","understanding","knowledge","excellent","preferred",
  "responsible","requirement","requirements","qualification","qualifications","nice","have","having",
  "least","minimum","relevant","related","field","based","familiarity","familiar","proficiency",
  "proficient","hands","expert","expertise","senior","junior","position","opening","we're",
  "you'll","ensure","provide","build","building","develop","developing","multiple","various",
]);

const MAX_KEYWORDS = 18;
const MAX_FREQUENT_TERMS = 8;

function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[a-z][a-z0-9+#.'-]*[a-z0-9+#]|[a-z]/g) ?? [];
}

/** Meaningful JD terms that occur at least twice, most frequent first. */
function frequentTerms(jdText: string, exclude: string[]): string[] {
  const counts = new Map<string, number>();
  for (const token of tokenize(jdText)) {
    if (token.length < 4 || STOPWORDS.has(token)) continue;
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }
  const excluded = exclude.join(" ");
  return [...counts.entries()]
    .filter(([word, count]) => count >= 2 && !excluded.includes(word))
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_FREQUENT_TERMS)
    .map(([word]) => word);
}

function hasTerm(tokens: Set<string>, word: string): boolean {
  return tokens.has(word) || tokens.has(`${word}s`) || (word.endsWith("s") && tokens.has(word.slice(0, -1)));
}

/** The strictest "N+ years" requirement stated in the JD, or 0 if none. */
function requiredYears(jdText: string): number {
  const pattern = /(\d{1,2})\s*\+?\s*(?:(?:-|–|to)\s*\d{1,2}\s*)?\+?\s*(?:years?|yrs?)\b([^.\n]{0,40})/gi;
  let max = 0;
  for (const m of jdText.matchAll(pattern)) {
    const n = Number(m[1]);
    if (n > 0 && n <= 30 && /experience|exp\b/i.test(m[2] + m[0])) max = Math.max(max, n);
  }
  return max;
}

const pct = (part: number, whole: number) => Math.round((part / whole) * 100);
const clamp = (n: number) => Math.min(100, Math.max(0, Math.round(n)));

/** Throws if a result is malformed — guards the UI against bad engine (or future AI) output. */
export function assertValidResult(value: unknown): asserts value is AnalysisResult {
  const r = value as Record<string, unknown> | null;
  const isScore = (n: unknown) => typeof n === "number" && Number.isFinite(n) && n >= 0 && n <= 100;
  const isList = (l: unknown) => Array.isArray(l) && l.every((s) => typeof s === "string" && s.trim().length > 0);
  if (
    !r ||
    !isScore(r.overall) ||
    !isScore(r.keywordMatch) ||
    !isScore(r.skillsMatch) ||
    !isScore(r.experienceMatch) ||
    !isList(r.matchedKeywords) ||
    !isList(r.missingKeywords) ||
    !isList(r.gaps) ||
    !isList(r.recommendations) ||
    (r.gaps as string[]).length === 0 ||
    (r.recommendations as string[]).length === 0
  ) {
    throw new ResumeToolError("ANALYSIS_FAILED");
  }
}

export function analyzeResumeAndJd({ resume, jdText }: AnalyzerInput): AnalysisResult {
  const resumeText = resume.text;
  const resumeTokens = new Set(tokenize(resumeText));
  const resumeSkills = resume.detectedSkills;

  // 1. Keyword extraction — dictionary skills + recurring meaningful terms from the JD
  const jdSkills = detectSkills(jdText);
  const keywords = [...new Set([...jdSkills, ...frequentTerms(jdText, jdSkills)])].slice(0, MAX_KEYWORDS);
  if (!keywords.length) throw new ResumeToolError("JD_INVALID");

  const matchedKeywords = keywords.filter((k) =>
    jdSkills.includes(k) ? resumeSkills.includes(k) : hasTerm(resumeTokens, k)
  );
  const missingKeywords = keywords.filter((k) => !matchedKeywords.includes(k));
  const keywordMatch = pct(matchedKeywords.length, keywords.length);

  // 2. Skills match
  const matchedSkills = jdSkills.filter((s) => resumeSkills.includes(s));
  const missingSkills = jdSkills.filter((s) => !resumeSkills.includes(s));
  const skillsMatch = jdSkills.length ? pct(matchedSkills.length, jdSkills.length) : keywordMatch;

  // 3. Experience match — stated JD requirement vs. experience computed from the resume
  const jdYears = requiredYears(jdText);
  const resumeYears = resume.experienceYears;
  const hasExperience = resume.experience.length > 0 || (resumeYears ?? 0) > 0;
  let experienceMatch: number;
  if (jdYears > 0) {
    if (resumeYears !== null) experienceMatch = resumeYears >= jdYears ? 100 : pct(resumeYears, jdYears);
    else experienceMatch = hasExperience ? 50 : 0;
  } else {
    const senioritySignals = ["led", "managed", "owned", "architected", "mentored", "drove", "delivered", "scaled"]
      .filter((s) => hasTerm(resumeTokens, s)).length;
    experienceMatch = hasExperience ? Math.min(60 + senioritySignals * 8, 100) : 50;
  }
  experienceMatch = clamp(experienceMatch);

  // 4. Overall score — weighted blend
  const overall = clamp(keywordMatch * 0.4 + skillsMatch * 0.35 + experienceMatch * 0.25);

  // 5. Profile gaps
  const gaps: string[] = [];
  if (missingSkills.length) {
    gaps.push(`Skills the JD asks for that your resume doesn't mention: ${missingSkills.slice(0, 5).join(", ")}.`);
  } else if (missingKeywords.length > 3) {
    gaps.push(`Missing ${missingKeywords.length} keywords the JD emphasises — including ${missingKeywords.slice(0, 3).join(", ")}.`);
  }
  if (jdYears > 0 && resumeYears !== null && resumeYears < jdYears) {
    gaps.push(`The JD asks for ${jdYears}+ years of experience; your resume shows about ${resumeYears} ${resumeYears === 1 ? "year" : "years"}.`);
  } else if (jdYears > 0 && !hasExperience) {
    gaps.push(`The JD asks for ${jdYears}+ years of experience; your resume doesn't list professional experience yet.`);
  } else if (jdYears > 0 && resumeYears === null) {
    gaps.push("Your roles have no dates, so your total experience can't be calculated — add start and end dates.");
  }
  if (!/\d+(?:\.\d+)?\s*%|₹|\$|\b\d+(?:\.\d+)?x\b|\b\d+[kKmM]\+?\s+(?:users|customers|downloads|revenue)/.test(resumeText)) {
    gaps.push("No quantified achievements detected — add measurable outcomes (%, ₹, time saved).");
  }
  if (!resume.sections.includes("education") && !resume.education.length && !/\b(education|b\.?\s?tech|bachelor|master|m\.?\s?tech|mba|degree|university|college)\b/i.test(resumeText)) {
    gaps.push("Education section not detected — recruiters and ATS filters look for it.");
  }
  if (!/certification|certified/i.test(resumeText) && /certification|certified/i.test(jdText)) {
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
  if (!hasExperience) {
    recommendations.push(
      "Without work experience, lead with projects, internships and coursework that use the JD's key skills."
    );
  } else if (experienceMatch < 75) {
    recommendations.push(
      "Reframe earlier work to highlight depth and ownership — match the seniority the JD is asking for."
    );
  }
  recommendations.push(
    hasExperience
      ? "Mirror the JD's top 3 skills in your most recent role's bullet points, each with a measurable result."
      : "Mirror the JD's top 3 skills in your project descriptions, each with a concrete outcome."
  );

  const result: AnalysisResult = {
    overall,
    keywordMatch,
    skillsMatch,
    experienceMatch,
    matchedKeywords,
    missingKeywords,
    gaps,
    recommendations,
  };
  assertValidResult(result);
  return result;
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
