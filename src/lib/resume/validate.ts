/**
 * Content validation for the two analysis inputs.
 *
 * The resume check is signal-based rather than a checklist: a fresher resume
 * with no work history, or a resume without headings, is still accepted as
 * long as there is enough career/education information overall. Documents
 * that carry no such signals — or that read like a job posting — are rejected
 * before they ever reach the analysis engine.
 */

import { ResumeToolError } from "./errors";
import {
  headingKey,
  parseResume,
  ROLE_WORDS,
  sumDateRanges,
  type ParsedResume,
  type ResumeSection,
} from "./parse";
import { detectSkills } from "./skills";

export const MAX_RESUME_CHARS = 40_000;
export const MAX_JD_CHARS = 20_000;
const MIN_RESUME_WORDS = 25;
const MIN_JD_WORDS = 20;

const EDUCATION_TERMS =
  /\b(bachelor'?s?|masters|master'?s (?:degree|of|in)|diploma|degree|university|college|institute|school|cgpa|gpa|graduat(?:ed|ion)|hsc|ssc|cbse|icse|class\s+(?:x|xii|10|12)(?:th)?|10th|12th|semester)\b/i;
/** Degree abbreviations match case-sensitively so everyday words like "be", "me" or "ma" don't count. */
const DEGREES =
  /\b(?:B\.?\s?Tech|M\.?\s?Tech|B\.\s?E\b|M\.\s?E\b|B\.?\s?Sc|M\.?\s?Sc|BCA|MCA|BBA|MBA|B\.?\s?Com|M\.?\s?Com|B\.\s?A\b|M\.\s?A\b|PGDM|Ph\.?\s?D|B\.?\s?Des|M\.?\s?Des|LLB|MBBS|B\.?\s?Pharm)/;

const ROLES = new RegExp(ROLE_WORDS.source, "gi");

const CORE_SECTIONS: ResumeSection[] = ["summary", "experience", "education", "skills", "projects", "certifications"];

/** Headings typical of papers and reports — not of resumes. */
const DOCUMENT_HEADINGS = new Set([
  "abstract", "introduction", "methods", "methodology", "materials and methods", "results", "discussion",
  "conclusion", "conclusions", "references", "bibliography", "literature review", "acknowledgements",
  "acknowledgments", "table of contents", "appendix",
]);

const ACHIEVEMENT_VERBS =
  /\b(developed|built|led|managed|designed|implemented|created|improved|worked|collaborated|responsible for|handled|achieved|delivered|launched|organi[sz]ed|coordinated|analy[sz]ed|conducted|maintained|trained|mentored|increased|reduced|completed|participated|volunteered|won|secured|awarded)\b/gi;

/** Phrases typical of job postings rather than resumes. */
const JD_PHRASES = [
  /\bwe(?:'re| are) (?:looking|hiring|seeking)\b/i,
  /\byou(?:'ll| will)\b/i,
  /\bthe ideal candidate\b/i,
  /\b(?:key |job |primary )?responsibilities\b/i,
  /\brequirements?\b/i,
  /\b(?:preferred|minimum|basic) qualifications\b/i,
  /\bwhat we offer\b|\bbenefits\b|\bperks\b/i,
  /\bapply (?:now|today|here)\b|\bhow to apply\b/i,
  /\babout (?:the|this) (?:role|job|position|team)\b|\babout us\b/i,
  /\bjob (?:description|summary|type|title)\b/i,
  /\bwho you are\b|\bwhat you(?:'ll| will) do\b/i,
  /\bmust[-\s]have\b|\bnice[-\s]to[-\s]have\b|\bgood to have\b/i,
  /\bequal opportunity\b/i,
  /\b(?:salary|ctc|compensation)\b/i,
  /\b(?:candidates?|applicants?) (?:should|must|will)\b/i,
  /\bis a plus\b|\bstrong plus\b/i,
  /\bexperience (?:with|in) \w+ (?:is )?(?:required|preferred)\b/i,
  /\b\d+\s*\+?\s*(?:-|to)?\s*\d*\s*years? of (?:\w+\s){0,3}experience (?:in|with|is)\b/i,
];

/** Signals that a text describes a job opening at all. */
const JD_SIGNALS = [
  ...JD_PHRASES,
  ROLES,
  /\b(?:skills?|knowledge of|proficien(?:t|cy)|familiar(?:ity)? with|hands[-\s]on|expertise)\b/i,
  /\b(?:experience|years?)\b/i,
  /\b(?:degree|bachelor'?s?|graduate|qualification)\b/i,
  /\b(?:role|position|opening|vacancy|team|company|client)\b/i,
  /\b(?:location|remote|hybrid|on-?site|full[-\s]time|part[-\s]time|contract)\b/i,
];

function countWords(text: string): number {
  return text.match(/\p{L}[\p{L}'’-]*/gu)?.length ?? 0;
}

function countJdPhrases(text: string): number {
  return JD_PHRASES.filter((p) => p.test(text)).length;
}

function letterRatio(text: string): number {
  const visible = text.replace(/\s/g, "");
  return visible.length ? (visible.match(/\p{L}/gu)?.length ?? 0) / visible.length : 0;
}

export interface ResumeSignals {
  score: number;
  headingTypes: number;
  hasContact: boolean;
  hasEducation: boolean;
  dateRanges: number;
  documentHeadings: number;
  jdPhrases: number;
}

export function scoreResumeSignals(parsed: ParsedResume): ResumeSignals {
  const { text } = parsed;
  const headingTypes = parsed.sections.filter((s) => CORE_SECTIONS.includes(s)).length;
  const minorHeadings = parsed.sections.length - headingTypes;
  const hasEducation = parsed.sections.includes("education") || EDUCATION_TERMS.test(text) || DEGREES.test(text);
  const roles = new Set((text.match(ROLES) ?? []).map((r) => r.toLowerCase())).size;
  const verbs = new Set((text.match(ACHIEVEMENT_VERBS) ?? []).map((v) => v.toLowerCase())).size;
  const dateRanges = sumDateRanges(text.split("\n")).ranges;
  const hasContact = Boolean(parsed.email || parsed.phone || parsed.links.some((l) => /linkedin|github/i.test(l)));

  let score = Math.min(headingTypes, 4) * 2 + (minorHeadings > 0 ? 1 : 0);
  score += (parsed.email ? 2 : 0) + (parsed.phone ? 1 : 0) + (parsed.links.length ? 1 : 0);
  score += hasEducation ? 2 : 0;
  score += Math.min(roles, 2) + Math.min(verbs, 2);
  score += dateRanges > 0 ? 2 : 0;
  score += parsed.detectedSkills.length >= 3 ? 2 : parsed.detectedSkills.length > 0 ? 1 : 0;
  score += parsed.name ? 1 : 0;

  const documentHeadings = text.split("\n").filter((l) => DOCUMENT_HEADINGS.has(headingKey(l))).length;

  return { score, headingTypes, hasContact, hasEducation, dateRanges, documentHeadings, jdPhrases: countJdPhrases(text) };
}

/**
 * Validates that the text is a genuine resume and returns its parsed form.
 * Throws ResumeToolError (NOT_A_RESUME, LOOKS_LIKE_JD, INSUFFICIENT_CONTENT, …) otherwise.
 */
export function validateResumeText(rawText: string): ParsedResume {
  const text = rawText.trim();
  if (!text) throw new ResumeToolError("RESUME_MISSING");
  if (text.length > MAX_RESUME_CHARS) throw new ResumeToolError("RESUME_TOO_LONG");
  if (letterRatio(text) < 0.5) throw new ResumeToolError("NOT_A_RESUME");

  const parsed = parseResume(text);
  const signals = scoreResumeSignals(parsed);

  if (countWords(text) < MIN_RESUME_WORDS) {
    throw new ResumeToolError(signals.hasContact || signals.headingTypes > 0 || parsed.name ? "INSUFFICIENT_CONTENT" : "NOT_A_RESUME");
  }

  // Job postings mention skills, roles and education too — but rarely the
  // personal details and dated history that every resume carries.
  const personalSignals =
    (parsed.email ? 1 : 0) + (parsed.phone ? 1 : 0) + (signals.dateRanges > 0 ? 1 : 0) +
    (parsed.sections.includes("education") || parsed.sections.includes("experience") ? 1 : 0);
  if (signals.jdPhrases >= 3 && signals.jdPhrases > personalSignals + 1) {
    throw new ResumeToolError("LOOKS_LIKE_JD");
  }

  // Papers and reports have their own heading structure and no resume sections.
  if (signals.documentHeadings >= 2 && signals.headingTypes < 2) throw new ResumeToolError("NOT_A_RESUME");

  const structured = signals.headingTypes >= 1 || (signals.hasContact && (signals.hasEducation || signals.dateRanges > 0));
  if (signals.score >= 7 && structured) return parsed;

  throw new ResumeToolError(signals.score >= 4 && (signals.hasContact || signals.headingTypes > 0) ? "INSUFFICIENT_CONTENT" : "NOT_A_RESUME");
}

/** Validates the job description input. Returns the trimmed text. */
export function validateJobDescription(rawText: string, resumeText = ""): string {
  const text = rawText.trim();
  if (!text) throw new ResumeToolError("JD_MISSING");
  if (text.length > MAX_JD_CHARS) throw new ResumeToolError("JD_TOO_LONG");
  if (text.length < 80 || countWords(text) < MIN_JD_WORDS) throw new ResumeToolError("JD_TOO_SHORT");
  if (letterRatio(text) < 0.5) throw new ResumeToolError("JD_INVALID");
  if (resumeText.trim() && text === resumeText.trim()) throw new ResumeToolError("JD_LOOKS_LIKE_RESUME");

  const jdSignals = JD_SIGNALS.filter((p) => {
    p.lastIndex = 0;
    return p.test(text);
  }).length;

  // A pasted resume: personal details + dated history, but no posting language.
  const parsed = parseResume(text);
  const resumeSignals = scoreResumeSignals(parsed);
  if (
    resumeSignals.jdPhrases < 2 &&
    (parsed.email || parsed.phone) &&
    resumeSignals.dateRanges > 0 &&
    resumeSignals.headingTypes >= 2
  ) {
    throw new ResumeToolError("JD_LOOKS_LIKE_RESUME");
  }

  // Needs to describe a job and name at least something concrete to match against.
  if (jdSignals < 3 || (detectSkills(text).length === 0 && countJdPhrases(text) === 0 && jdSignals < 5)) {
    throw new ResumeToolError("JD_INVALID");
  }
  return text;
}
