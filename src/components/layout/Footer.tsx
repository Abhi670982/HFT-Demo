import { AtSign, Globe, MessageCircle, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { footerColumns, siteName, siteTagline, socialLinks } from "@/lib/data/site";

const socialIcons = [Globe, MessageCircle, AtSign, Video];

export default function Footer() {
  return (
    <footer className="w-full rounded-b-[28px] bg-navy-950 text-white/70">
      <div className="shell-pad pb-7 pt-12 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" aria-label="HuntForTomorrow.in — Home" className="inline-flex items-center gap-2.5">
              <Image
                src={assets.logo}
                alt="HuntForTomorrow logo"
                width={36}
                height={36}
                className="size-9 rounded-xl object-contain"
              />
              <span className="text-[15px] font-bold tracking-tight text-white">
                HuntForTomorrow<span className="text-brand-400">.in</span>
              </span>
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-white/60">
              {siteTagline}. An AI-powered career ecosystem with 11 specialised agents, human
              guidance and end-to-end support — built to land you the right opportunities faster.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map((social, i) => {
                const Icon = socialIcons[i % socialIcons.length];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteName} on ${social.label}`}
                    className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-brand-600/20 hover:text-white"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  {column.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-white/60 transition-colors hover:text-brand-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row">
          <p className="text-xs">
            © {new Date().getFullYear()} {siteName} — {siteTagline}
          </p>
          <p className="text-xs text-white/40">Built with AI + human care, for your career.</p>
        </div>
      </div>
    </footer>
  );
}
