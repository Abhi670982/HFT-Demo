"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/lib/assets";
import { getStartedDisabled, navLinks, resourcesDropdown } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";

function LogoMark() {
  return (
    <Link href="/" aria-label="HuntForTomorrow.in — Home" className="flex shrink-0 items-center gap-2.5">
      <Image
        src={assets.logo}
        alt="HuntForTomorrow logo"
        width={36}
        height={36}
        className="size-9 rounded-xl object-contain"
        priority
      />
      <span className="text-[15px] font-bold tracking-tight text-ink-900 dark:text-white">
        HuntForTomorrow<span className="text-brand-400">.in</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResources, setMobileResources] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Subtle sticky shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change (render-time state adjustment —
  // the React-recommended pattern for soft resets on derived route state)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setResourcesOpen(false);
  }

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close Resources dropdown on outside click / Escape (keyboard accessible)
  useEffect(() => {
    if (!resourcesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResourcesOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [resourcesOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-2.5 z-50 px-3 sm:px-4">
      <div
        className={cn(
          "mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between gap-2.5 rounded-2xl border border-line/80 bg-surface/90 px-3 shadow-soft backdrop-blur-xl transition-shadow duration-300 dark:border-dark-line dark:bg-[#12122fe6] sm:px-4",
          scrolled && "shadow-card"
        )}
      >
        <LogoMark />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                isActive(link.href)
                  ? "bg-brand-50 font-semibold text-brand-600 dark:bg-brand-600/20 dark:text-brand-300"
                  : "text-ink-600 dark:text-dark-text-secondary hover:bg-pastel-lavender/60 hover:text-ink-900 dark:text-dark-text-secondary dark:hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Resources dropdown */}
          <div ref={resourcesRef} className="relative">
            <button
              type="button"
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
              onClick={() => setResourcesOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                resourcesOpen
                  ? "bg-brand-50 font-semibold text-brand-600 dark:bg-brand-600/20 dark:text-brand-300"
                  : "text-ink-600 dark:text-dark-text-secondary hover:bg-pastel-lavender/60 hover:text-ink-900 dark:text-dark-text-secondary dark:hover:text-white"
              )}
            >
              Resources
              <ChevronDown
                className={cn("size-3.5 transition-transform duration-300", resourcesOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-card dark:border-dark-line dark:bg-dark-surface"
                >
                  {resourcesDropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setResourcesOpen(false)}
                      className="block rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-ink-600 dark:text-dark-text-secondary transition-colors hover:bg-page hover:text-brand-600 dark:text-dark-text-secondary dark:hover:bg-white/5 dark:hover:text-brand-300"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button href="/client-access" variant="secondary" size="sm">
            Client Access
          </Button>
          <Button size="sm" arrow disabled={getStartedDisabled}>
            Get Started
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-xl bg-pastel-lavender text-icon-violet transition-colors hover:bg-pastel-purple dark:bg-brand-600/20 dark:text-brand-300"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 w-full max-w-[1400px] overflow-hidden rounded-3xl border border-line bg-surface p-4 shadow-card dark:border-dark-line dark:bg-dark-surface md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-brand-50 font-semibold text-brand-600 dark:bg-brand-600/20 dark:text-brand-300"
                        : "text-ink-700 dark:text-dark-text-secondary hover:bg-page dark:text-dark-text-secondary dark:hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Resources accordion inside mobile menu */}
              <div>
                <button
                  type="button"
                  aria-expanded={mobileResources}
                  onClick={() => setMobileResources((v) => !v)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                    "text-ink-700 dark:text-dark-text-secondary hover:bg-page dark:text-dark-text-secondary dark:hover:bg-white/5"
                  )}
                >
                  Resources
                  <ChevronDown
                    className={cn("size-4 transition-transform duration-300", mobileResources && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {mobileResources && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="ml-3 flex flex-col gap-0.5 border-l border-line pl-3 dark:border-dark-line">
                        {resourcesDropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="rounded-lg px-3 py-2 text-[13px] text-ink-500 transition-colors hover:bg-page hover:text-brand-600 dark:text-dark-text-muted dark:hover:bg-white/5 dark:hover:text-brand-300"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            <div className="mt-3 flex flex-col gap-2.5 border-t border-line pt-4 dark:border-dark-line">
              <Button href="/get-started" variant="primary" size="md" arrow disabled={getStartedDisabled}>
                Get Started
              </Button>
              <Button href="/client-access" variant="secondary" size="md">
                Client Access
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
