"use client";

import { CheckCircle2 } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";

const experienceOptions = [
  { value: "0-2", label: "0–2 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "6-10", label: "6–10 years" },
  { value: "10+", label: "10+ years" },
];

interface FormState {
  name: string;
  email: string;
  currentRole: string;
  targetRole: string;
  experience: string;
  goal: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  currentRole: "",
  targetRole: "",
  experience: "",
  goal: "",
};

export default function OnboardingFormSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((err) => ({ ...err, [field]: undefined }));
    };
  // NOTE: submission flow is intentionally dormant — the Get Started action is
  // disabled per spec until the real onboarding/backend is ready. Validation
  // and the success state activate again with the live submit handler.
  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section id="start-search" className="shell-pad scroll-mt-28 py-12 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-panel border border-line bg-surface shadow-card lg:grid-cols-[0.9fr_1.1fr]">
        {/* copy side */}
        <div className="flex flex-col justify-center gap-4 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-8 text-white sm:p-10">
          <h2 className="text-[28px] font-bold leading-tight tracking-tight sm:text-[34px]">
            Tell us about your search
          </h2>
          <p className="text-sm leading-relaxed text-white/90 sm:text-[15px]">
            Share a few details and the HuntForTomorrow team will map the right starting point for
            your journey — the right agents, the right strategy and the right guidance.
          </p>
          <ul className="mt-2 flex flex-col gap-2.5 text-sm text-white/90">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-400" /> A personalised starting plan
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-400" /> Guidance from a career expert
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-400" /> No commitment required
            </li>
          </ul>
        </div>

        {/* form side */}
        <div className="p-7 sm:p-10">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-pastel-green text-icon-green">
                <CheckCircle2 className="size-8" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-ink-900 dark:text-white dark:text-white">
                Thanks, {form.name.split(" ")[0]}! We&rsquo;ve got your details.
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-ink-500">
                Your search profile has been received. Our team will review it and reach out at{" "}
                <span className="font-semibold text-ink-900 dark:text-white dark:text-white">{form.email}</span> with your next
                steps.
              </p>
              <Button variant="secondary" size="md" onClick={reset}>
                Submit another response
              </Button>
            </div>
          ) : (
            <form noValidate className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Name"
                  name="name"
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                  error={errors.name}
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                  error={errors.email}
                />
                <FormField
                  label="Current Role"
                  name="currentRole"
                  placeholder="e.g. Software Engineer"
                  required
                  value={form.currentRole}
                  onChange={update("currentRole")}
                  error={errors.currentRole}
                />
                <FormField
                  label="Target Role"
                  name="targetRole"
                  placeholder="e.g. Senior Product Manager"
                  required
                  value={form.targetRole}
                  onChange={update("targetRole")}
                  error={errors.targetRole}
                />
              </div>
              <FormField
                label="Experience"
                name="experience"
                type="select"
                required
                options={experienceOptions}
                value={form.experience}
                onChange={update("experience")}
                error={errors.experience}
              />
              <FormField
                label="Job Search Goal"
                name="goal"
                type="textarea"
                placeholder="Tell us what you're looking for in your next role…"
                value={form.goal}
                onChange={update("goal")}
              />
              <Button
                type="button"
                variant="primary"
                size="lg"
                arrow
                disabled
                className="mt-1 w-full sm:w-auto sm:self-start"
              >
                Get Started
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
