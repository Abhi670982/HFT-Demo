"use client";

import type { ChangeEventHandler } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  error?: string;
  hint?: string;
  rows?: number;
  autoComplete?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
}

const baseInput =
  "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500 transition-all focus:outline-none focus:ring-4 dark:text-white dark:placeholder:text-dark-text-muted";

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  options = [],
  error,
  hint,
  rows = 4,
  autoComplete,
  value,
  onChange,
}: FormFieldProps) {
  const stateClasses = error
    ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100 dark:border-rose-500/50 dark:focus:border-rose-400 dark:focus:ring-rose-500/20"
    : "border-line focus:border-brand-400 focus:ring-brand-100 dark:border-dark-line dark:focus:border-brand-400 dark:focus:ring-brand-500/20";

  const fieldId = `field-${name}`;
  const errorId = `error-${name}`;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-[13px] font-semibold text-ink-700 dark:text-dark-text-secondary">
        {label}
        {required && (
          <span className="ml-0.5 text-brand-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {type === "textarea" ? (
        <textarea
          id={fieldId}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(baseInput, stateClasses, "resize-none")}
        />
      ) : type === "select" ? (
        <select
          id={fieldId}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(baseInput, stateClasses, "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236a6a8c%22 stroke-width=%222%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10")}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(baseInput, stateClasses)}
        />
      )}

      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-rose-500">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-ink-500 dark:text-dark-text-muted">{hint}</p>
      ) : null}
    </div>
  );
}
