/**
 * Company / media entries for the logo marquees.
 *
 * Two tiers:
 *  - `src`: official brand logo SVG lives at /media/logos/<src>.svg
 *    (downloaded from the Simple Icons library — official brand paths, CC0).
 *  - no `src`: rendered as a premium text treatment — used only where an
 *    authentic official logo asset could not be sourced.
 */
export interface BrandLogo {
  name: string;
  src?: string;
}

/* ---------- People Placed At (home + about) ---------- */
export const placedAtLogos: BrandLogo[] = [
  { name: "Google", src: "google" },
  { name: "Meta", src: "meta" },
  { name: "Amazon" },
  { name: "Microsoft" },
  { name: "Deloitte" },
  { name: "Blinkit" },
  { name: "P&G" },
  { name: "Adobe", src: "adobe" },
  { name: "Flipkart", src: "flipkart" },
];

/* ---------- Worked with talent from (about) ---------- */
export const talentLogos: BrandLogo[] = [
  { name: "Microsoft" },
  { name: "Amazon" },
  { name: "IBM" },
  { name: "Goldman Sachs", src: "goldmansachs" },
  { name: "American Express", src: "americanexpress" },
  { name: "PayPal", src: "paypal" },
  { name: "Nokia", src: "nokia" },
  { name: "Ericsson", src: "ericsson" },
  { name: "John Deere", src: "johndeere" },
  { name: "Infosys", src: "infosys" },
  { name: "Wipro", src: "wipro" },
  { name: "TCS", src: "tcs" },
  { name: "HDFC Bank", src: "hdfcbank" },
  { name: "ICICI Bank", src: "icicibank" },
  { name: "Axis Bank", src: "axisbank" },
  { name: "Airtel", src: "airtel" },
  { name: "OYO", src: "oyo" },
  { name: "Unacademy", src: "unacademy" },
  { name: "BYJU'S", src: "byjus" },
  { name: "Accenture", src: "accenture" },
  { name: "Gartner" },
  { name: "BCG" },
  { name: "Capgemini" },
  { name: "Cognizant" },
  { name: "Optum" },
  { name: "DXC Technology" },
  { name: "Tech Mahindra", src: "mahindra" },
  { name: "Kotak Mahindra" },
  { name: "Asian Paints" },
  { name: "IndiaMART" },
];

/* ---------- Featured in (about) ---------- */
export const mediaLogos: BrandLogo[] = [
  { name: "MSN" },
  { name: "News18" },
  { name: "Republic" },
  { name: "The Wire" },
  { name: "The Free Press Journal" },
  { name: "Eshn News" },
  { name: "Prime News of India" },
  { name: "Indian Prime Bulletin" },
  { name: "Daily District News" },
  { name: "Newswire of India" },
  { name: "99 News" },
  { name: "Insider News Times" },
  { name: "News Today 24x7" },
  { name: "The India Forbes News" },
  { name: "Today News Standard" },
  { name: "Times News Express" },
  { name: "The Republic News" },
  { name: "Punjab Bytes" },
];
