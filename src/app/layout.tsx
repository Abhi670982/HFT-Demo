import type { Metadata, Viewport } from "next";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HuntForTomorrow.in — Smarter Job Search for a Brighter Tomorrow",
    template: "%s | HuntForTomorrow.in",
  },
  description:
    "An AI-powered career ecosystem with 11 specialised AI agents, human guidance and end-to-end support to help you land the right opportunities faster.",
  keywords: [
    "job search",
    "AI career platform",
    "resume optimisation",
    "interview preparation",
    "career strategy",
    "HuntForTomorrow",
  ],
};

export const viewport: Viewport = {
  themeColor: "#f3f5ff",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before paint — applies the persisted theme without hydration mismatch.
 * Default is dark only when the OS prefers it and nothing was stored.
 */
const themeInit = `(()=>{try{const s=localStorage.getItem("hft-theme");const d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Navbar />
        {/* Rounded page shell — every page renders inside this premium container */}
        <div
          id="shell"
          className="mx-auto mt-[76px] w-full max-w-[1440px] flex-1 overflow-x-clip rounded-[28px] bg-page shadow-[0_30px_80px_-40px_rgb(11_11_43/0.25)] transition-colors duration-300 dark:shadow-[0_30px_80px_-40px_rgb(0_0_0/0.8)]"
        >
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
