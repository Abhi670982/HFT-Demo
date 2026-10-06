"use client";

import { motion } from "framer-motion";
import { ArrowLeft, KeyRound, LockKeyhole, MailCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export default function ClientAccessPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter the email you registered with.");
      return;
    }
    if (code.trim().length < 4) {
      setError("Please enter your 4+ character access code (demo: any code works).");
      return;
    }
    setError(null);
    setSubmitted(true);
    // Demo routing — replace with real auth when backend is available.
    setTimeout(() => router.push("/client-dashboard"), 900);
  };

  return (
    <main className="flex flex-1 flex-col">
      <section className="shell-pad flex flex-1 flex-col py-14 sm:py-20">
        <div className="mx-auto grid w-full max-w-4xl overflow-hidden rounded-[28px] border border-line bg-surface shadow-card lg:grid-cols-2">
          {/* form side */}
          <div className="flex flex-col justify-center gap-6 p-8 sm:p-12">
            <Logo />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start gap-4"
              >
                <span className="grid size-14 place-items-center rounded-full bg-pastel-green text-icon-green">
                  <MailCheck className="size-7" aria-hidden="true" />
                </span>
                <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 dark:text-white">
                  Access verified
                </h1>
                <p className="text-sm leading-relaxed text-ink-500">
                  Taking you to your client dashboard…
                </p>
              </motion.div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-pastel-lavender px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-icon-violet">
                    <LockKeyhole className="size-3.5" aria-hidden="true" /> Secure Access
                  </span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white">
                    Client Access
                  </h1>
                  <p className="text-sm leading-relaxed text-ink-500">
                    Sign in to view your private career dashboard — strategy, applications,
                    outreach, interviews and more, all in one place.
                  </p>
                </div>

                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="client-email" className="text-[13px] font-semibold text-ink-700 dark:text-dark-text-secondary">
                      Registered email
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                        setError(null);
                      }}
                      className={cn(
                        "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500 dark:placeholder:text-dark-text-muted focus:outline-none focus:ring-4",
                        error ? "border-rose-300 focus:ring-rose-100" : "border-line focus:border-brand-400 focus:ring-brand-100"
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="client-code" className="text-[13px] font-semibold text-ink-700 dark:text-dark-text-secondary">
                      Access code
                    </label>
                    <input
                      id="client-code"
                      type="password"
                      placeholder="Your private access code"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                        setError(null);
                      }}
                      className={cn(
                        "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500 dark:placeholder:text-dark-text-muted focus:outline-none focus:ring-4",
                        error ? "border-rose-300 focus:ring-rose-100" : "border-line focus:border-brand-400 focus:ring-brand-100"
                      )}
                    />
                    {error && (
                      <p role="alert" className="text-xs font-medium text-rose-500">
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="group mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg"
                  >
                    <KeyRound className="size-4" aria-hidden="true" />
                    Continue to Dashboard
                  </button>
                </form>

                <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-500 dark:text-dark-text-muted">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-icon-teal" aria-hidden="true" />
                  This is a demo access flow — any valid email and a 4+ character code opens the
                  sample dashboard. No real credentials are stored.
                </p>
              </>
            )}
          </div>

          {/* visual side */}
          <div className="relative hidden flex-col justify-between gap-6 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-10 text-white lg:flex">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 top-10 size-72 rounded-full bg-brand-600/30 blur-[100px]"
            />
            <div className="relative flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Your entire search, one dashboard
              </h2>
              <p className="text-sm leading-relaxed text-white/70">
                Everything your agents and mentors produce — organised, always current:
              </p>
              <ul className="mt-1 grid grid-cols-2 gap-2.5">
                {[
                  "Career Strategy",
                  "Resume",
                  "Opportunities",
                  "Recruiters",
                  "Outreach",
                  "Applications",
                  "Interviews",
                  "Compensation",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-white/10 bg-surface/[0.06] px-3.5 py-2.5 text-[13px] font-semibold text-white/85 backdrop-blur-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-surface/[0.06] p-4 backdrop-blur-sm">
              <Image
                src="/media/HFTLOGO.png"
                alt=""
                width={44}
                height={44}
                className="rounded-xl object-contain"
                aria-hidden="true"
              />
              <p className="text-[13px] leading-relaxed text-white/70">
                HuntForTomorrow — Smarter Job Search for a Brighter Tomorrow
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-4xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 transition-colors hover:text-brand-600"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to previous page
          </button>
        </div>
      </section>
    </main>
  );
}
