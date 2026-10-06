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
  icons: {
    icon: "/media/HFTLOGO.png",
    shortcut: "/media/HFTLOGO.png",
    apple: "/media/HFTLOGO.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f5ff",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before paint — applies the persisted theme without hydration mismatch.
 * Default is light when nothing is stored.
 */
const themeInit = `(()=>{try{const s=localStorage.getItem("hft-theme");const d=s==="dark";document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

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
          className="mx-auto mt-[76px] w-full max-w-[1440px] flex-1 overflow-x-clip bg-page transition-colors duration-300"
        >
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
