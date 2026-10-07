import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { footerColumns, siteName, siteTagline, socialLinks } from "@/lib/data/site";

const LinkedinIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const socialIcons = [LinkedinIcon, InstagramIcon, XIcon, YoutubeIcon];

export default function Footer() {
  return (
    <footer className="w-full bg-navy-950 text-white/90">
      <div className="shell-pad pb-7 pt-12 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" aria-label="HuntForTomorrow — Home" className="inline-flex items-center gap-2.5">
              <Image
                src={assets.logo}
                alt="HuntForTomorrow logo"
                width={36}
                height={36}
                className="size-9 rounded-xl object-contain"
              />
              <span className="text-[15px] font-bold tracking-tight text-white">
                HuntForTomorrow
              </span>
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-white/80">
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
                    className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90 transition-all hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-brand-600/20 hover:text-white"
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
                        className="text-[13px] text-white/80 transition-colors hover:text-brand-300"
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
          <p className="text-xs text-white/80">Built with AI + human care, for your career.</p>
        </div>
      </div>
    </footer>
  );
}
