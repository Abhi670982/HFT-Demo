"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/**
 * Theme store — the html.dark class is applied pre-hydration by the layout
 * script. This tiny external store lets the toggle read it reactively
 * without setState-in-effect patterns.
 */
const listeners = new Set<() => void>();

const observer =
  typeof window !== "undefined" && "MutationObserver" in window
    ? new MutationObserver(() => listeners.forEach((fn) => fn()))
    : null;

if (typeof document !== "undefined") {
  observer?.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readTheme(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export default function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, readTheme, () => false);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("hft-theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={cn(
        "relative grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-surface text-ink-600 dark:text-dark-text-secondary transition-all duration-300 hover:border-brand-300 hover:text-brand-600 dark:border-dark-line dark:bg-dark-surface dark:text-dark-text-secondary dark:hover:border-brand-400 dark:hover:text-brand-300",
        className
      )}
    >
      <Sun
        className={cn("size-[18px] transition-opacity duration-300", dark ? "opacity-0" : "opacity-100")}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "absolute size-[18px] transition-opacity duration-300",
          dark ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />
    </button>
  );
}
