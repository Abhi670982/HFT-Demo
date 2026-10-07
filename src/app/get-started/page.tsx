"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Compass,
  FileUser,
  PartyPopper,
  Settings2,
  Target,
  Timer,
} from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import FormField, { type SelectOption } from "@/components/ui/FormField";
import Logo from "@/components/ui/Logo";
import Pill from "@/components/ui/Pill";
import { cn } from "@/lib/utils";

const experienceOptions: SelectOption[] = [
  { value: "0-2", label: "0–2 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "6-10", label: "6–10 years" },
  { value: "10+", label: "10+ years" },
];

const roleLevelOptions: SelectOption[] = [
  { value: "individual", label: "Individual Contributor" },
  { value: "senior", label: "Senior / Lead" },
  { value: "manager", label: "Manager" },
  { value: "director", label: "Director / CXO" },
];

const workModeOptions: SelectOption[] = [
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
  { value: "any", label: "Open to any" },
];

const urgencyOptions: SelectOption[] = [
  { value: "active", label: "Actively searching — ASAP" },
  { value: "exploring", label: "Exploring — within 2–3 months" },
  { value: "passive", label: "Passively open to the right role" },
];

interface WizardData {
  name: string;
  email: string;
  phone: string;
  goal: string;
  targetRole: string;
  roleLevel: string;
  experience: string;
  industry: string;
  workMode: string;
  urgency: string;
}

const initialData: WizardData = {
  name: "",
  email: "",
  phone: "",
  goal: "",
  targetRole: "",
  roleLevel: "",
  experience: "",
  industry: "",
  workMode: "",
  urgency: "",
};

interface StepDef {
  title: string;
  caption: string;
  icon: typeof Compass;
  validate: (d: WizardData) => Partial<WizardData>;
}

const steps: StepDef[] = [
  {
    title: "Basic Profile",
    caption: "Let's start with the essentials so we know who we're helping.",
    icon: FileUser,
    validate: (d) => {
      const e: Partial<WizardData> = {};
      if (!d.name.trim()) e.name = "Please enter your name.";
      if (!d.email.trim()) e.email = "Please enter your email.";
      else if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Please enter a valid email address.";
      return e;
    },
  },
  {
    title: "Career Goals",
    caption: "What does your brighter tomorrow look like?",
    icon: Compass,
    validate: (d) => (!d.goal.trim() ? { goal: "Tell us briefly what you're aiming for." } : {}),
  },
  {
    title: "Target Role",
    caption: "The role we'll build your strategy around.",
    icon: Target,
    validate: (d) => {
      const e: Partial<WizardData> = {};
      if (!d.targetRole.trim()) e.targetRole = "Please enter your target role.";
      if (!d.roleLevel) e.roleLevel = "Please select your level.";
      return e;
    },
  },
  {
    title: "Experience",
    caption: "So we can position you at the right level.",
    icon: Timer,
    validate: (d) => (!d.experience ? { experience: "Please select your experience." } : {}),
  },
  {
    title: "Job Search Preferences",
    caption: "Final details to tune your agents.",
    icon: Settings2,
    validate: (d) => {
      const e: Partial<WizardData> = {};
      if (!d.workMode) e.workMode = "Please select your work-mode preference.";
      if (!d.urgency) e.urgency = "Please select how soon you want to move.";
      return e;
    },
  },
];

export default function GetStartedPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(initialData);
  const [errors, setErrors] = useState<Partial<WizardData>>({});
  const [done, setDone] = useState(false);

  const update =
    (field: keyof WizardData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setData((d) => ({ ...d, [field]: e.target.value }));
      setErrors((err) => ({ ...err, [field]: undefined }));
    };

  const next = (e?: FormEvent) => {
    e?.preventDefault();
    const stepErrors = steps[step].validate(data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    if (step < steps.length - 1) setStep((s) => s + 1);
    else setDone(true);
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const progress = done ? 100 : Math.round((step / steps.length) * 100);

  const current = steps[step];

  return (
    <main className="flex flex-col">
      <section className="shell-pad py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-line bg-surface shadow-card lg:grid-cols-[0.85fr_1.15fr]">
          {/* left panel */}
          <div className="relative flex flex-col justify-between gap-8 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-8 text-white sm:p-10">
            <div className="flex flex-col gap-3">
              <Logo dark />
              <Pill dark className="mt-2">
                Onboarding
              </Pill>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Let&rsquo;s build your brighter tomorrow
              </h1>
              <p className="text-sm leading-relaxed text-white/90">
                Six quick steps. Your answers tune your AI agents, your strategy and your first
                session — nothing generic, everything yours.
              </p>
            </div>
            <ul className="hidden flex-col gap-3 text-sm text-white/90 lg:flex">
              {[
                "Takes about 2 minutes",
                "Your data stays in this demo",
                "A strategist reviews every submission",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 shrink-0 text-brand-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* right panel — wizard */}
          <div className="flex flex-col p-7 sm:p-10">
            {done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-1 flex-col items-center justify-center gap-4 py-10 text-center"
              >
                <span className="grid size-16 place-items-center rounded-full bg-pastel-green text-icon-green">
                  <PartyPopper className="size-8" aria-hidden="true" />
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 dark:text-white dark:text-white">
                  Welcome aboard, {data.name.split(" ")[0]}!
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-ink-500">
                  Your profile is ready and your target — <strong>{data.targetRole}</strong> — is
                  noted. A career strategist will email{" "}
                  <strong>{data.email}</strong> within 1–2 working days with your personalised
                  starting plan.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  <Button href="/how-it-works" variant="primary" size="md" arrow>
                    See What Happens Next
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      setData(initialData);
                      setStep(0);
                      setDone(false);
                    }}
                  >
                    Start over
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* progress */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-ink-500">
                      Step {step + 1} of {steps.length + 1}
                    </span>
                    <span className="text-brand-600">{progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-line">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                <form onSubmit={next} className="mt-7 flex flex-1 flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-1 flex-col gap-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-xl bg-pastel-lavender text-icon-violet">
                          <current.icon className="size-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h2 className="text-lg font-bold tracking-tight text-ink-900 dark:text-white dark:text-white">
                            {current.title}
                          </h2>
                          <p className="text-[13px] text-ink-500">{current.caption}</p>
                        </div>
                      </div>

                      {step === 0 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormField
                            label="Full name"
                            name="name"
                            required
                            autoComplete="name"
                            placeholder="Your full name"
                            value={data.name}
                            onChange={update("name")}
                            error={errors.name}
                          />
                          <FormField
                            label="Email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={data.email}
                            onChange={update("email")}
                            error={errors.email}
                          />
                        </div>
                      )}

                      {step === 1 && (
                        <FormField
                          label="What's your job-search goal?"
                          name="goal"
                          type="textarea"
                          required
                          placeholder="e.g. Move into a senior product role at a product-led company…"
                          value={data.goal}
                          onChange={update("goal")}
                          error={errors.goal}
                        />
                      )}

                      {step === 2 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormField
                            label="Target role"
                            name="targetRole"
                            required
                            placeholder="e.g. Senior Product Manager"
                            value={data.targetRole}
                            onChange={update("targetRole")}
                            error={errors.targetRole}
                          />
                          <FormField
                            label="Level you're targeting"
                            name="roleLevel"
                            type="select"
                            required
                            options={roleLevelOptions}
                            value={data.roleLevel}
                            onChange={update("roleLevel")}
                            error={errors.roleLevel}
                          />
                        </div>
                      )}

                      {step === 3 && (
                        <div className="grid gap-4">
                          <FormField
                            label="Total experience"
                            name="experience"
                            type="select"
                            required
                            options={experienceOptions}
                            value={data.experience}
                            onChange={update("experience")}
                            error={errors.experience}
                          />
                          <FormField
                            label="Current company / industry"
                            name="industry"
                            placeholder="e.g. FinTech, IT services, FMCG…"
                            value={data.industry}
                            onChange={update("industry")}
                          />
                        </div>
                      )}

                      {step === 4 && (
                        <div className="grid gap-4">
                          <FormField
                            label="Preferred work mode"
                            name="workMode"
                            type="select"
                            required
                            options={workModeOptions}
                            value={data.workMode}
                            onChange={update("workMode")}
                            error={errors.workMode}
                          />
                          <FormField
                            label="How soon do you want to move?"
                            name="urgency"
                            type="select"
                            required
                            options={urgencyOptions}
                            value={data.urgency}
                            onChange={update("urgency")}
                            error={errors.urgency}
                          />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* nav buttons */}
                  <div className="mt-8 flex items-center justify-between gap-3">
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={back}
                      disabled={step === 0}
                      className={cn(step === 0 && "pointer-events-none opacity-0")}
                    >
                      <ArrowLeft className="size-4" aria-hidden="true" />
                      Back
                    </Button>
                    <Button type="submit" variant="primary" size="md" arrow={step < steps.length - 1}>
                      {step === steps.length - 1 ? (
                        <>
                          <Briefcase className="size-4" aria-hidden="true" />
                          Complete Setup
                        </>
                      ) : (
                        "Continue"
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
