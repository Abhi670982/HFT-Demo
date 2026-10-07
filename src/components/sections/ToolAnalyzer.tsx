"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  CircleAlert,
  FileText,
  GaugeCircle,
  Lightbulb,
  LoaderCircle,
  RotateCcw,
  Target,
  Upload,
  UserRound,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import {
  analyzeResumeAndJd,
  SAMPLE_JD,
  SAMPLE_RESUME,
  type AnalysisResult,
} from "@/lib/analyzer";
import { ResumeToolError, toUserMessage } from "@/lib/resume/errors";
import { extractResumeFile, RESUME_FILE_ACCEPT } from "@/lib/resume/file";
import type { ParsedResume, ResumeSection } from "@/lib/resume/parse";
import { loadBrowserPdfJs } from "@/lib/resume/pdfjsBrowser";
import { validateJobDescription, validateResumeText } from "@/lib/resume/validate";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import IconContainer from "@/components/ui/IconContainer";

type Phase = "input" | "analyzing" | "results";
type UploadStage = "reading" | "parsing" | "validating";

/** The analysis and the exact resume it was computed from — always replaced together. */
interface Report {
  resume: ParsedResume;
  fileName: string | null;
  analysis: AnalysisResult;
}

const UPLOAD_STAGE_LABEL: Record<UploadStage, string> = {
  reading: "Reading file…",
  parsing: "Extracting text…",
  validating: "Checking it's a resume…",
};

const SECTION_LABEL: Record<ResumeSection, string> = {
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  achievements: "Achievements",
  personal: "Personal details",
};

function ScoreRing({ score }: { score: number }) {
  return (
    <div className="relative grid size-32 place-items-center sm:size-36">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#e4e8f7" strokeWidth="11" />
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 52}
          initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / 100) }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#5B35F5" />
            <stop offset="1" stopColor="#7C4DFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white">{score}%</span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-dark-text-muted">
          Match
        </span>
      </div>
    </div>
  );
}

function MatchBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[13px] font-semibold">
        <span className="text-ink-600 dark:text-dark-text-secondary">{label}</span>
        <span className="text-ink-900 dark:text-white">{value}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </div>
    </div>
  );
}

function ChipList({ items, tone }: { items: string[]; tone: "good" | "warn" | "neutral" }) {
  if (!items.length)
    return <p className="text-sm text-ink-500 dark:text-dark-text-muted">Nothing to show here.</p>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold",
            tone === "good"
              ? "bg-pastel-green text-icon-teal"
              : tone === "warn"
                ? "bg-pastel-orange text-icon-orange"
                : "bg-brand-50 text-brand-700 dark:bg-brand-600/20 dark:text-brand-200"
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

const STEPS = [
  { number: "1", title: "Upload Resume", hint: "PDF, DOCX, TXT or paste text" },
  { number: "2", title: "Paste Job Description", hint: "The role you're targeting" },
  { number: "3", title: "Click Analyze", hint: "Runs instantly in your browser" },
  { number: "4", title: "Get Results", hint: "Score, gaps & recommendations" },
];

export default function ToolAnalyzer() {
  const [phase, setPhase] = useState<Phase>("input");
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [jdError, setJdError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploadStage, setUploadStage] = useState<UploadStage | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [report, setReport] = useState<Report | null>(null);
  /** Bumped to invalidate an in-flight upload (newer upload, manual edit, sample, unmount). */
  const uploadTokenRef = useRef(0);
  const analyzeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      uploadTokenRef.current++;
      if (analyzeTimerRef.current) clearTimeout(analyzeTimerRef.current);
    },
    []
  );

  const busy = uploadStage !== null || phase === "analyzing";
  const canAnalyze = !busy && resumeText.trim().length > 0 && jdText.trim().length > 0;

  const cancelUpload = () => {
    uploadTokenRef.current++;
    setUploadStage(null);
  };

  const readFile = async (file: File) => {
    if (busy) return;
    const token = ++uploadTokenRef.current;
    const isCurrent = () => token === uploadTokenRef.current;
    setResumeError(null);
    setFormError(null);
    setUploadStage("reading");
    try {
      const extracted = await extractResumeFile(file, loadBrowserPdfJs, () => {
        if (isCurrent()) setUploadStage("parsing");
      });
      if (!isCurrent()) return;
      setUploadStage("validating");
      // Reject non-resume documents up front; the text is validated again on Analyze.
      validateResumeText(extracted.text);
      // A new resume fully replaces the previous one and any analysis of it.
      setResumeText(extracted.text);
      setFileName(extracted.fileName);
      setReport(null);
    } catch (error) {
      if (isCurrent()) setResumeError(toUserMessage(error, "PARSE_FAILED"));
    } finally {
      if (isCurrent()) setUploadStage(null);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file after fixing it
    if (file) void readFile(file);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (busy) return;
    const files = e.dataTransfer.files;
    if (files.length > 1) {
      setResumeError(toUserMessage(new ResumeToolError("MULTIPLE_FILES")));
      return;
    }
    if (files[0]) void readFile(files[0]);
  };

  const loadSample = () => {
    cancelUpload();
    setResumeText(SAMPLE_RESUME);
    setJdText(SAMPLE_JD);
    setFileName("sample-resume.txt");
    setResumeError(null);
    setJdError(null);
    setFormError(null);
    setReport(null);
  };

  const analyze = () => {
    if (busy || analyzeTimerRef.current) return; // one analysis at a time
    setFormError(null);

    // Both inputs are validated (and errors shown together) before anything is analyzed.
    let resume: ParsedResume | null = null;
    let jd: string | null = null;
    try {
      resume = validateResumeText(resumeText);
      setResumeError(null);
    } catch (error) {
      setResumeError(toUserMessage(error, "NOT_A_RESUME"));
    }
    try {
      jd = validateJobDescription(jdText, resumeText);
      setJdError(null);
    } catch (error) {
      setJdError(toUserMessage(error, "JD_INVALID"));
    }
    if (!resume || !jd) return;

    const validResume = resume;
    const validJd = jd;
    const analyzedFileName = fileName;
    setReport(null);
    setPhase("analyzing");
    // Simulated processing time so the UX feels like a real AI call.
    analyzeTimerRef.current = setTimeout(() => {
      analyzeTimerRef.current = null;
      try {
        const analysis = analyzeResumeAndJd({ resume: validResume, jdText: validJd });
        setReport({ resume: validResume, fileName: analyzedFileName, analysis });
        setPhase("results");
      } catch (error) {
        if (error instanceof ResumeToolError && error.code.startsWith("JD_")) setJdError(error.message);
        else setFormError(toUserMessage(error, "ANALYSIS_FAILED"));
        setPhase("input");
      }
    }, 1400);
  };

  /** Back to the inputs for another run — the resume and JD are kept so either can be changed. */
  const reset = () => {
    if (analyzeTimerRef.current) clearTimeout(analyzeTimerRef.current);
    analyzeTimerRef.current = null;
    setPhase("input");
    setReport(null);
    setResumeError(null);
    setJdError(null);
    setFormError(null);
  };

  const result = report?.analysis;
  const snapshot = report?.resume;

  return (
    <div className="flex flex-col gap-8">
      {/* Flow steps */}
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <li
            key={step.number}
            className={cn(
              "flex items-center gap-3 rounded-2xl border p-4 transition-all",
              phase === "input" || (phase === "results" && i === 3)
                ? "border-brand-200 bg-surface shadow-soft dark:border-brand-500/40 dark:bg-dark-surface"
                : "border-line bg-surface/60 dark:border-dark-line dark:bg-white/[0.04]"
            )}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-sm font-extrabold text-white">
              {step.number}
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900 dark:text-white">{step.title}</p>
              <p className="text-xs text-ink-500 dark:text-dark-text-muted">{step.hint}</p>
            </div>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        {phase !== "results" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {/* Step 1 — Resume */}
            <div className="flex flex-col gap-4 rounded-panel border border-line bg-surface dark:bg-dark-surface p-6 shadow-soft dark:border-dark-line sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink-900 dark:text-white">
                  <IconContainer tone="blue" size="sm">
                    <FileText aria-hidden="true" />
                  </IconContainer>
                  Step 1 · Your Resume
                </h3>
                <button
                  type="button"
                  onClick={loadSample}
                  disabled={phase === "analyzing"}
                  className="text-xs font-bold text-brand-600 underline-offset-4 hover:underline disabled:pointer-events-none disabled:opacity-50"
                >
                  Try sample
                </button>
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  if (!busy) setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                aria-busy={uploadStage !== null}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-all",
                  dragging
                    ? "border-brand-400 bg-brand-50 dark:bg-brand-600/20"
                    : "border-line-strong bg-page/60 dark:border-dark-line dark:bg-white/[0.04]"
                )}
              >
                {uploadStage ? (
                  <>
                    <LoaderCircle className="size-6 animate-spin text-brand-500" aria-hidden="true" />
                    <p role="status" className="text-sm font-semibold text-ink-700 dark:text-dark-text-secondary">
                      {UPLOAD_STAGE_LABEL[uploadStage]}
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="size-6 text-ink-500 dark:text-dark-text-secondary" aria-hidden="true" />
                    <p className="break-all text-sm font-semibold text-ink-700 dark:text-dark-text-secondary">
                      {fileName ? fileName : "Drag & drop or"}
                    </p>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={busy}
                  className="text-sm font-bold text-brand-600 underline-offset-4 hover:underline disabled:pointer-events-none disabled:opacity-50"
                >
                  {fileName ? "replace file" : "browse files"}
                </button>
                <p className="text-xs text-ink-500 dark:text-dark-text-muted">
                  PDF, DOCX, TXT or MD · up to 5 MB — or just paste below
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={RESUME_FILE_ACCEPT}
                  onChange={onFileChange}
                  disabled={busy}
                  className="hidden"
                  aria-label="Upload resume file"
                />
              </div>

              <FormField
                label="Resume text"
                name="resumeText"
                type="textarea"
                rows={9}
                placeholder="Paste your resume content here…"
                value={resumeText}
                onChange={(e) => {
                  if (uploadStage) cancelUpload(); // a manual edit wins over a pending upload
                  setResumeText(e.target.value);
                  if (!e.target.value.trim()) setFileName(null);
                  setResumeError(null);
                  setFormError(null);
                }}
                error={resumeError ?? undefined}
                hint="Parsed locally in your browser — nothing is uploaded."
              />
            </div>

            {/* Step 2 — JD */}
            <div className="flex flex-col gap-4 rounded-panel border border-line bg-surface dark:bg-dark-surface p-6 shadow-soft dark:border-dark-line sm:p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink-900 dark:text-white">
                <IconContainer tone="violet" size="sm">
                  <Target aria-hidden="true" />
                </IconContainer>
                Step 2 · Job Description
              </h3>
              <FormField
                label="Paste the JD you're targeting"
                name="jdText"
                type="textarea"
                rows={16}
                placeholder="Paste the complete job description here…"
                value={jdText}
                onChange={(e) => {
                  setJdText(e.target.value);
                  setJdError(null);
                  setFormError(null);
                }}
                error={jdError ?? undefined}
              />
              {formError && (
                <p role="alert" className="text-xs font-medium text-rose-500">
                  {formError}
                </p>
              )}
              <Button
                onClick={analyze}
                variant="primary"
                size="lg"
                arrow
                disabled={!canAnalyze}
                className="w-full"
              >
                <Zap className="size-4" aria-hidden="true" />
                {phase === "analyzing"
                  ? "Analyzing…"
                  : uploadStage
                    ? "Reading resume…"
                    : canAnalyze
                      ? "Analyze Match"
                      : "Add resume + JD to analyze"}
              </Button>
            </div>
          </motion.div>
        )}

        {phase === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-5 rounded-panel border border-line bg-surface dark:bg-dark-surface py-24 shadow-soft dark:border-dark-line"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
              className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-glow"
            >
              <GaugeCircle className="size-7" aria-hidden="true" />
            </motion.span>
            <p role="status" className="text-lg font-bold text-ink-900 dark:text-white">Analyzing your match…</p>
            <p className="px-4 text-center text-sm text-ink-500 dark:text-dark-text-muted">
              Resume and JD validated — comparing skills, keywords and experience
            </p>
          </motion.div>
        )}

        {phase === "results" && result && snapshot && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6"
          >
            {/* score header */}
            <div className="grid items-center gap-8 rounded-panel border border-line bg-surface dark:bg-dark-surface p-7 shadow-card dark:border-dark-line sm:p-9 md:grid-cols-[auto_1fr]">
              <div className="mx-auto flex flex-col items-center gap-3">
                <ScoreRing score={result.overall} />
                <p className="text-sm font-semibold text-ink-600 dark:text-dark-text-secondary">Overall Match Score</p>
              </div>
              <div className="flex flex-col gap-4">
                <MatchBar label="Keyword Match" value={result.keywordMatch} />
                <MatchBar label="Skills Match" value={result.skillsMatch} />
                <MatchBar label="Experience Match" value={result.experienceMatch} />
                <div className="mt-1 flex flex-wrap gap-2.5">
                  <Button onClick={reset} variant="secondary" size="md">
                    <RotateCcw className="size-4" aria-hidden="true" />
                    Analyze another
                  </Button>
                </div>
              </div>
            </div>

            {/* what was read from the resume — values are taken verbatim, never inferred */}
            <div className="flex flex-col gap-4 rounded-panel border border-line bg-surface dark:bg-dark-surface p-6 shadow-soft dark:border-dark-line sm:p-7">
              <h3 className="flex flex-wrap items-center gap-2 text-base font-bold text-ink-900 dark:text-white">
                <UserRound className="size-5 text-icon-blue" aria-hidden="true" />
                Resume Snapshot
                {report.fileName && (
                  <span className="break-all text-xs font-semibold text-ink-500 dark:text-dark-text-muted">
                    · {report.fileName}
                  </span>
                )}
              </h3>
              <dl className="grid gap-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-dark-text-muted">Name</dt>
                  <dd className="mt-1 break-words font-semibold text-ink-900 dark:text-white">
                    {snapshot.name ?? "Not found in resume"}
                  </dd>
                  {(snapshot.email || snapshot.phone) && (
                    <dd className="mt-0.5 break-all text-ink-600 dark:text-dark-text-secondary">
                      {[snapshot.email, snapshot.phone].filter(Boolean).join(" · ")}
                    </dd>
                  )}
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-dark-text-muted">Experience</dt>
                  <dd className="mt-1 font-semibold text-ink-900 dark:text-white">
                    {snapshot.experienceYears !== null
                      ? `${snapshot.experienceYears} ${snapshot.experienceYears === 1 ? "year" : "years"}`
                      : snapshot.experience.length
                        ? "Listed (no dates found)"
                        : "No work experience listed"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-dark-text-muted">Sections found</dt>
                  <dd className="mt-1 text-ink-700 dark:text-dark-text-secondary">
                    {snapshot.sections.length
                      ? snapshot.sections.map((s) => SECTION_LABEL[s]).join(", ")
                      : "No standard headings"}
                  </dd>
                </div>
              </dl>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-dark-text-muted">
                  Skills on your resume
                </p>
                <ChipList items={snapshot.skills.slice(0, 24)} tone="neutral" />
              </div>
            </div>

            {/* details grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-4 rounded-panel border border-line bg-surface dark:bg-dark-surface p-6 shadow-soft dark:border-dark-line sm:p-7">
                <h3 className="flex items-center gap-2 text-base font-bold text-ink-900 dark:text-white">
                  <CheckCircle2 className="size-5 text-icon-teal" aria-hidden="true" />
                  Matched Keywords
                </h3>
                <ChipList items={result.matchedKeywords} tone="good" />
                <h3 className="mt-3 flex items-center gap-2 text-base font-bold text-ink-900 dark:text-white">
                  <CircleAlert className="size-5 text-icon-orange" aria-hidden="true" />
                  Missing Keywords
                </h3>
                <ChipList items={result.missingKeywords} tone="warn" />
              </div>

              <div className="flex flex-col gap-4 rounded-panel border border-line bg-surface dark:bg-dark-surface p-6 shadow-soft dark:border-dark-line sm:p-7">
                <h3 className="flex items-center gap-2 text-base font-bold text-ink-900 dark:text-white">
                  <Target className="size-5 text-icon-violet" aria-hidden="true" />
                  Profile Gaps
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {result.gaps.map((gap) => (
                    <li key={gap} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600 dark:text-dark-text-secondary">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-pastel-orange ring-4 ring-pastel-orange/40" />
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-panel border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow-soft dark:border-brand-500/30 dark:from-brand-600/15 dark:to-dark-surface sm:p-7">
              <h3 className="flex items-center gap-2 text-base font-bold text-ink-900 dark:text-white">
                <Lightbulb className="size-5 text-icon-violet" aria-hidden="true" />
                Recommendations
              </h3>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {result.recommendations.map((rec) => (
                  <li key={rec} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600 dark:text-dark-text-secondary">
                    <Zap className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden="true" />
                    {rec}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-ink-500 dark:text-dark-text-muted">
                Demo analysis — heuristics run locally in your browser. Architecture is ready for a
                real AI backend to be plugged in later.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
