"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  CircleAlert,
  FileText,
  GaugeCircle,
  Lightbulb,
  RotateCcw,
  Target,
  Upload,
  Zap,
} from "lucide-react";
import { useMemo, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import {
  analyzeResumeAndJd,
  SAMPLE_JD,
  SAMPLE_RESUME,
  type AnalysisResult,
} from "@/lib/analyzer";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import IconContainer from "@/components/ui/IconContainer";

type Phase = "input" | "analyzing" | "results";

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
        <span className="text-3xl font-extrabold tracking-tight text-ink-900">{score}%</span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
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
        <span className="text-ink-600">{label}</span>
        <span className="text-ink-900">{value}%</span>
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

function ChipList({ items, tone }: { items: string[]; tone: "good" | "warn" }) {
  if (!items.length) return <p className="text-sm text-ink-400">Nothing to show here.</p>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold",
            tone === "good" ? "bg-pastel-green text-icon-teal" : "bg-pastel-orange text-icon-orange"
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

const STEPS = [
  { number: "1", title: "Upload Resume", hint: "TXT or paste your resume text" },
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
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const canAnalyze = useMemo(
    () => resumeText.trim().length >= 80 && jdText.trim().length >= 80,
    [resumeText, jdText]
  );

  const readFile = (file: File) => {
    if (!/\.(txt|md)$/i.test(file.name)) {
      setResumeError("Demo supports .txt / .md files — or simply paste your resume text below.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setResumeText(String(reader.result ?? ""));
      setFileName(file.name);
      setResumeError(null);
    };
    reader.readAsText(file);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) readFile(file);
  };

  const loadSample = () => {
    setResumeText(SAMPLE_RESUME);
    setJdText(SAMPLE_JD);
    setFileName("sample-resume.txt");
    setResumeError(null);
    setJdError(null);
  };

  const analyze = () => {
    let ok = true;
    if (resumeText.trim().length < 80) {
      setResumeError("Please add your resume text (paste it or upload a .txt file) — at least a few lines.");
      ok = false;
    }
    if (jdText.trim().length < 80) {
      setJdError("Please paste the full job description you're targeting.");
      ok = false;
    }
    if (!ok) return;

    setPhase("analyzing");
    // Simulated processing time so the UX feels like a real AI call.
    setTimeout(() => {
      setResult(analyzeResumeAndJd({ resumeText, jdText }));
      setPhase("results");
    }, 1400);
  };

  const reset = () => {
    setPhase("input");
    setResult(null);
    setResumeText("");
    setJdText("");
    setFileName(null);
    setResumeError(null);
    setJdError(null);
  };

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
                ? "border-brand-200 bg-white shadow-soft"
                : "border-line bg-white/50"
            )}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-sm font-extrabold text-white">
              {step.number}
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900">{step.title}</p>
              <p className="text-xs text-ink-400">{step.hint}</p>
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
            <div className="flex flex-col gap-4 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink-900">
                  <IconContainer tone="blue" size="sm">
                    <FileText aria-hidden="true" />
                  </IconContainer>
                  Step 1 · Your Resume
                </h3>
                <button
                  type="button"
                  onClick={loadSample}
                  className="text-xs font-bold text-brand-600 underline-offset-4 hover:underline"
                >
                  Try sample
                </button>
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-all",
                  dragging ? "border-brand-400 bg-brand-50" : "border-line-strong bg-page/60"
                )}
              >
                <Upload className="size-6 text-ink-400" aria-hidden="true" />
                <p className="text-sm font-semibold text-ink-700">
                  {fileName ? fileName : "Drag & drop or"}
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
                >
                  browse files
                </button>
                <p className="text-xs text-ink-400">.txt / .md for this demo, or just paste below</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,text/plain"
                  onChange={onFileChange}
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
                  setResumeText(e.target.value);
                  setResumeError(null);
                }}
                error={resumeError ?? undefined}
                hint="Parsed locally in your browser — nothing is uploaded."
              />
            </div>

            {/* Step 2 — JD */}
            <div className="flex flex-col gap-4 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink-900">
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
                }}
                error={jdError ?? undefined}
              />
              <Button
                onClick={analyze}
                variant="primary"
                size="lg"
                arrow
                disabled={!canAnalyze}
                className="w-full"
              >
                <Zap className="size-4" aria-hidden="true" />
                {canAnalyze ? "Analyze Match" : "Add resume + JD to analyze"}
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
            className="flex flex-col items-center justify-center gap-5 rounded-panel border border-line bg-white py-24 shadow-soft"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
              className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-glow"
            >
              <GaugeCircle className="size-7" aria-hidden="true" />
            </motion.span>
            <p className="text-lg font-bold text-ink-900">Analyzing your match…</p>
            <p className="text-sm text-ink-500">Comparing resume against the job description</p>
          </motion.div>
        )}

        {phase === "results" && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6"
          >
            {/* score header */}
            <div className="grid items-center gap-8 rounded-panel border border-line bg-white p-7 shadow-card sm:p-9 md:grid-cols-[auto_1fr]">
              <div className="mx-auto flex flex-col items-center gap-3">
                <ScoreRing score={result.overall} />
                <p className="text-sm font-semibold text-ink-600">Overall Match Score</p>
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

            {/* details grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-4 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-7">
                <h3 className="flex items-center gap-2 text-base font-bold text-ink-900">
                  <CheckCircle2 className="size-5 text-icon-teal" aria-hidden="true" />
                  Matched Keywords
                </h3>
                <ChipList items={result.matchedKeywords} tone="good" />
                <h3 className="mt-3 flex items-center gap-2 text-base font-bold text-ink-900">
                  <CircleAlert className="size-5 text-icon-orange" aria-hidden="true" />
                  Missing Keywords
                </h3>
                <ChipList items={result.missingKeywords} tone="warn" />
              </div>

              <div className="flex flex-col gap-4 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-7">
                <h3 className="flex items-center gap-2 text-base font-bold text-ink-900">
                  <Target className="size-5 text-icon-violet" aria-hidden="true" />
                  Profile Gaps
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {result.gaps.map((gap) => (
                    <li key={gap} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-pastel-orange ring-4 ring-pastel-orange/40" />
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-panel border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow-soft sm:p-7">
              <h3 className="flex items-center gap-2 text-base font-bold text-ink-900">
                <Lightbulb className="size-5 text-icon-violet" aria-hidden="true" />
                Recommendations
              </h3>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {result.recommendations.map((rec) => (
                  <li key={rec} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600">
                    <Zap className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden="true" />
                    {rec}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-ink-400">
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
