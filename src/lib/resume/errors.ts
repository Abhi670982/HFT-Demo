/**
 * Error codes for every way the Resume / JD flow can reject input or fail.
 * Messages are written for end users — internal details (stack traces, parser
 * errors) are never surfaced in the UI.
 */

export type ResumeToolErrorCode =
  | "UNSUPPORTED_TYPE"
  | "MULTIPLE_FILES"
  | "LEGACY_DOC"
  | "FILE_TOO_LARGE"
  | "EMPTY_FILE"
  | "CONTENT_MISMATCH"
  | "CORRUPTED_FILE"
  | "PASSWORD_PROTECTED"
  | "NO_TEXT"
  | "TOO_MANY_PAGES"
  | "PARSE_TIMEOUT"
  | "PARSE_FAILED"
  | "RESUME_MISSING"
  | "RESUME_TOO_LONG"
  | "NOT_A_RESUME"
  | "LOOKS_LIKE_JD"
  | "INSUFFICIENT_CONTENT"
  | "JD_MISSING"
  | "JD_TOO_SHORT"
  | "JD_TOO_LONG"
  | "JD_INVALID"
  | "JD_LOOKS_LIKE_RESUME"
  | "ANALYSIS_FAILED";

export const ERROR_MESSAGES: Record<ResumeToolErrorCode, string> = {
  UNSUPPORTED_TYPE:
    "This file type isn't supported. Please upload your resume as a PDF, DOCX, TXT or MD file — or paste the text below.",
  MULTIPLE_FILES: "Please upload one resume file at a time.",
  LEGACY_DOC:
    "Older .doc files (and password-protected Word files) can't be read. Please save your resume as DOCX or PDF and try again.",
  FILE_TOO_LARGE:
    "This file is larger than 5 MB. Resumes are usually much smaller — please upload a smaller file or paste your resume text.",
  EMPTY_FILE: "This file is empty. Please choose your resume file again.",
  CONTENT_MISMATCH:
    "This file's contents don't match its file type — it may have been renamed or corrupted. Please upload the original resume file.",
  CORRUPTED_FILE:
    "We couldn't read this file — it appears to be damaged. Please re-export your resume and try again.",
  PASSWORD_PROTECTED: "This file is password-protected. Please upload an unlocked copy of your resume.",
  NO_TEXT:
    "We couldn't find any readable text in this file. Scanned or image-only resumes aren't supported — please upload a text-based PDF/DOCX or paste your resume text.",
  TOO_MANY_PAGES:
    "This document has more than 10 pages, which is too long for a resume. Please upload your resume only.",
  PARSE_TIMEOUT:
    "Reading this file took too long. Please try again with a smaller file, or paste your resume text below.",
  PARSE_FAILED:
    "Something went wrong while reading your resume. Please try again, or paste your resume text below.",
  RESUME_MISSING: "Please upload your resume or paste its text.",
  RESUME_TOO_LONG:
    "This text is too long to be a resume. Please upload or paste your resume only.",
  NOT_A_RESUME: "Please upload a valid resume containing your professional or educational information.",
  LOOKS_LIKE_JD:
    "This looks like a job description, not a resume. Paste it in Step 2 and add your own resume here.",
  INSUFFICIENT_CONTENT:
    "Your resume has too little information to analyze. Please include details such as your skills, education or experience.",
  JD_MISSING: "Please paste the job description you're targeting.",
  JD_TOO_SHORT:
    "This job description is too short. Please paste the complete JD, including responsibilities and requirements.",
  JD_TOO_LONG: "This job description is too long. Please paste a single job description.",
  JD_INVALID:
    "This doesn't look like a job description. Please paste the full JD for the role you're targeting.",
  JD_LOOKS_LIKE_RESUME:
    "This looks like a resume, not a job description. Please paste the job posting you're targeting here.",
  ANALYSIS_FAILED: "We couldn't complete the analysis. Please try again.",
};

export class ResumeToolError extends Error {
  readonly code: ResumeToolErrorCode;

  constructor(code: ResumeToolErrorCode) {
    super(ERROR_MESSAGES[code]);
    this.name = "ResumeToolError";
    this.code = code;
  }
}

/** Maps any thrown value to a safe, user-facing message. */
export function toUserMessage(error: unknown, fallback: ResumeToolErrorCode = "PARSE_FAILED"): string {
  return error instanceof ResumeToolError ? error.message : ERROR_MESSAGES[fallback];
}
