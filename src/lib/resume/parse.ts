/**
 * Turns normalised resume text into structured fields. Extraction is strictly
 * literal: values are copied from the document, and anything that can't be
 * found stays null / empty — nothing is inferred or invented.
 */

import { detectSkills } from "./skills";

export type ResumeSection =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "achievements"
  | "personal";

export interface ParsedResume {
  name: string | null;
  email: string | null;
  phone: string | null;
  links: string[];
  summary: string | null;
  skills: string[];
  experience: string[];
  education: string[];
  projects: string[];
  certifications: string[];
  /** Sections detected from headings, in document order. */
  sections: ResumeSection[];
  /**
   * Total professional experience in years, from date ranges in the experience
   * section (overlaps merged) or an explicit "N years of experience" statement.
   * null when the resume gives no basis to compute it.
   */
  experienceYears: number | null;
  /** All dictionary skills mentioned anywhere in the resume (used for matching). */
  detectedSkills: string[];
  text: string;
}

const HEADINGS: Record<ResumeSection, string[]> = {
  summary: [
    "summary", "professional summary", "career summary", "executive summary", "profile",
    "professional profile", "career profile", "profile summary", "objective", "career objective",
    "professional objective", "about", "about me", "personal statement", "overview",
  ],
  experience: [
    "experience", "work experience", "professional experience", "relevant experience",
    "industry experience", "employment", "employment history", "work history", "career history",
    "professional background", "internship", "internships", "internship experience",
    "experience and internships", "work experience and internships", "career highlights",
    "professional journey", "positions held", "employment details",
  ],
  education: [
    "education", "educational background", "educational qualifications", "educational qualification",
    "academic background", "academic qualifications", "academic details", "academics",
    "qualifications", "education and training", "academic profile", "scholastic profile", "studies",
  ],
  skills: [
    "skills", "technical skills", "key skills", "core skills", "professional skills", "soft skills",
    "skill set", "skillset", "skills and tools", "skills and abilities", "core competencies",
    "competencies", "areas of expertise", "expertise", "technologies", "tools and technologies",
    "tech stack", "technical proficiency", "it skills", "computer skills", "tools", "toolkit", "toolbox",
  ],
  projects: ["projects", "project", "academic projects", "personal projects", "key projects", "project experience", "major projects"],
  certifications: [
    "certifications", "certification", "certificates", "licenses and certifications",
    "certifications and courses", "courses", "training", "trainings", "professional development",
  ],
  achievements: [
    "achievements", "awards", "honors", "honours", "awards and achievements", "accomplishments",
    "extracurricular activities", "extra curricular activities", "activities", "publications",
    "volunteer experience", "volunteering", "leadership", "positions of responsibility",
  ],
  personal: [
    "personal details", "personal information", "personal profile", "contact", "contact information",
    "contact details", "languages", "languages known", "hobbies", "interests", "hobbies and interests",
    "declaration",
  ],
};

const HEADING_LOOKUP = new Map<string, ResumeSection>(
  (Object.entries(HEADINGS) as [ResumeSection, string[]][]).flatMap(([section, names]) =>
    names.map((n) => [n, section] as const)
  )
);

export function headingKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Strips Markdown heading / emphasis markers so "## Experience" or "**Skills**" read as plain text. */
function plain(line: string): string {
  return line.replace(/^#+\s*/, "").replace(/\*\*|__/g, "").trim();
}

/** Returns the section a line introduces (plus any inline content after "Heading:"), or null. */
export function matchHeading(line: string): { section: ResumeSection; rest: string } | null {
  const stripped = plain(line).replace(/^[•\s\d.)#|:-]+/, "").trim();
  if (!stripped) return null;

  // "Skills: React, TypeScript, …" — only the label before the colon must look like a heading.
  const colon = stripped.indexOf(":");
  const head = colon >= 0 ? stripped.slice(0, colon) : stripped;
  const rest = colon >= 0 ? stripped.slice(colon + 1).trim() : "";
  if (head.length > 40 || head.split(/\s+/).length > 5) return null;

  const section = HEADING_LOOKUP.get(headingKey(head));
  return section ? { section, rest } : null;
}

const EMAIL = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const URL_PATTERN = /\b(?:https?:\/\/)?(?:www\.)?(?:linkedin\.com\/[^\s|,;)]+|github\.com\/[^\s|,;)]+|gitlab\.com\/[^\s|,;)]+|behance\.net\/[^\s|,;)]+|https?:\/\/[^\s|,;)]+)/gi;
const PHONE_CANDIDATE = /(?:\+?\d[\d\s().-]{8,18}\d)/g;

function findPhone(text: string): string | null {
  for (const match of text.match(PHONE_CANDIDATE) ?? []) {
    const digits = match.replace(/\D/g, "");
    // 10–13 digits, and not a date range like "2019 - 2021" or "01/2020 – 06/2022".
    if (digits.length < 10 || digits.length > 13) continue;
    if (/^(?:19|20)\d{2}\s*[-–]\s*(?:19|20)\d{2}$/.test(match.trim())) continue;
    return match.trim();
  }
  return null;
}

const NAME_STOPWORDS = /\b(resume|curriculum|vitae|cv|biodata|profile|page|email|phone|mobile|address)\b/i;

/** The candidate name: one of the first header lines, made of 2–5 capitalised name-like words. */
function findName(headerLines: string[]): string | null {
  for (const line of headerLines.slice(0, 3).map(plain)) {
    if (EMAIL.test(line) || /\d{3}/.test(line) || /https?:|www\.|\.com/i.test(line)) continue;
    // "Jane Doe — Software Engineer" / "Jane Doe | Bengaluru"
    const candidate = line.split(/\s[|–—-]\s|\s*[|,–—]\s*|\t/)[0].replace(/^•\s*/, "").trim();
    if (NAME_STOPWORDS.test(candidate) || matchHeading(candidate)) continue;
    const words = candidate.split(/\s+/);
    if (words.length < 2 || words.length > 5 || candidate.length > 50) continue;
    const nameLike = words.every((w) => /^\p{Lu}[\p{L}'.-]*$/u.test(w) || /^\p{Lu}\.?$/u.test(w));
    if (nameLike) return candidate;
  }
  return null;
}

/** Splits a skills section into individual items. */
function splitSkills(lines: string[]): string[] {
  const seen = new Set<string>();
  const items: string[] = [];
  for (const line of lines) {
    // Drop category labels such as "Languages:" / "Frameworks -".
    const content = line.replace(/^•\s*/, "").replace(/^[^:]{1,30}:\s*/, "");
    for (const part of content.split(/\s*(?:[,;|•·]|\t|\s-\s|\s–\s)\s*/)) {
      const item = part.replace(/^[\s.()]+|[\s.()]+$/g, "").trim();
      if (!item || item.length > 40 || item.split(/\s+/).length > 5) continue;
      const key = item.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        items.push(item);
      }
    }
  }
  return items;
}

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};
const MONTH = "(jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec)[a-z]*\\.?";
const DATE = `(?:${MONTH}\\s*'?,?\\s*((?:19|20)\\d{2})|(\\d{1,2})\\s*[/.-]\\s*((?:19|20)\\d{2})|((?:19|20)\\d{2}))`;
const END_DATE = `(?:${DATE}|(present|current|now|till date|to date|ongoing|today))`;
const DATE_RANGE = new RegExp(`${DATE}\\s*(?:-|–|—|to|till|until)\\s*${END_DATE}`, "gi");

function toMonthIndex(month: string | undefined, monthNum: string | undefined, year: string): number {
  const m = month ? MONTHS[month.toLowerCase().slice(0, 3)] : monthNum ? Number(monthNum) : 1;
  return Number(year) * 12 + (m >= 1 && m <= 12 ? m - 1 : 0);
}

/** Merged duration (in years) of all date ranges in the given lines. */
export function sumDateRanges(lines: string[], now = new Date()): { years: number; ranges: number } {
  const nowIndex = now.getFullYear() * 12 + now.getMonth();
  const intervals: [number, number][] = [];
  // Joined so ranges wrapped across lines ("06/2020 to" / "present") are still found.
  for (const m of lines.join(" ").matchAll(DATE_RANGE)) {
    const start = m[2] ? toMonthIndex(m[1], undefined, m[2]) : m[4] ? toMonthIndex(undefined, m[3], m[4]) : toMonthIndex(undefined, undefined, m[5]);
    let end: number;
    if (m[11]) end = nowIndex;
    else if (m[7]) end = toMonthIndex(m[6], undefined, m[7]);
    else if (m[9]) end = toMonthIndex(undefined, m[8], m[9]);
    else end = toMonthIndex(undefined, undefined, m[10]);
    // A year-only end date ("2019 – 2021") counts to the end of that year.
    if (m[10]) end += 11;
    if (start > end || start < 1960 * 12 || end > nowIndex + 12) continue;
    intervals.push([start, Math.min(end, nowIndex)]);
  }
  intervals.sort((a, b) => a[0] - b[0]);
  let months = 0;
  let current: [number, number] | null = null;
  for (const [s, e] of intervals) {
    if (current && s <= current[1]) current[1] = Math.max(current[1], e);
    else {
      if (current) months += current[1] - current[0] + 1;
      current = [s, e];
    }
  }
  if (current) months += current[1] - current[0] + 1;
  return { years: Math.round((months / 12) * 10) / 10, ranges: intervals.length };
}

/** Job-title words — shared with resume validation. */
export const ROLE_WORDS =
  /\b(engineer|developer|analyst|manager|intern|internship|consultant|designer|executive|associate|specialist|architect|administrator|accountant|teacher|lecturer|officer|coordinator|scientist|assistant|representative|technician|programmer|trainee|freelancer?|founder|director|supervisor|nurse|marketer|recruiter|tester)\b/i;

const HAS_DATE_RANGE = new RegExp(DATE_RANGE.source, "i");

const STATED_YEARS = /(\d{1,2}(?:\.\d)?)\s*\+?\s*(?:years?|yrs?)\s+(?:of\s+)?(?:total\s+|overall\s+|professional\s+|industry\s+|work\s+|relevant\s+|hands[\s-]on\s+)*experience/i;

export function parseResume(text: string): ParsedResume {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  const header: string[] = [];
  const buckets = new Map<ResumeSection, string[]>();
  const sections: ResumeSection[] = [];
  let current: ResumeSection | null = null;

  for (const line of lines) {
    const heading = matchHeading(line);
    // "Languages: Java, Go" / "Tools: Git" inside a skills section are category labels, not new sections.
    const skillLabel = heading?.rest && current === "skills" && (heading.section === "personal" || heading.section === "skills");
    if (heading && !skillLabel) {
      current = heading.section;
      if (!sections.includes(current)) sections.push(current);
      if (!buckets.has(current)) buckets.set(current, []);
      if (heading.rest) buckets.get(current)!.push(heading.rest);
    } else if (current) buckets.get(current)!.push(line);
    else header.push(line);
  }

  const section = (key: ResumeSection) => buckets.get(key) ?? [];
  let experience = section("experience");
  if (!experience.length) {
    // No recognised experience heading (custom headings, sidebar layouts): fall back to
    // dated lines naming a role, outside projects / certifications. Education isn't excluded:
    // in multi-column layouts job lines often follow the sidebar's education block.
    const elsewhere = new Set([...section("projects"), ...section("certifications")]);
    experience = lines.flatMap((l, i) => {
      const withNext = `${l} ${lines[i + 1] ?? ""}`; // the date may wrap onto the next line
      return !elsewhere.has(l) && ROLE_WORDS.test(l) && HAS_DATE_RANGE.test(withNext) ? [withNext] : [];
    });
  }

  let experienceYears: number | null = null;
  const fromDates = sumDateRanges(experience);
  if (fromDates.ranges > 0) experienceYears = fromDates.years;
  else {
    const stated = STATED_YEARS.exec([...section("summary"), ...header].join("\n"));
    if (stated) experienceYears = Number(stated[1]);
  }

  const listedSkills = splitSkills(section("skills"));
  const detectedSkills = detectSkills(text);

  return {
    name: findName(header),
    email: EMAIL.exec(text)?.[0] ?? null,
    phone: findPhone(text),
    links: [...new Set(text.match(URL_PATTERN) ?? [])].slice(0, 5),
    summary: section("summary").join(" ").trim() || null,
    skills: listedSkills.length ? listedSkills : detectedSkills,
    experience,
    education: section("education"),
    projects: section("projects"),
    certifications: section("certifications"),
    sections,
    experienceYears,
    detectedSkills,
    text,
  };
}
