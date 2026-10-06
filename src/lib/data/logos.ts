/**
 * Company / media entries for the logo marquees.
 *
 * Two tiers:
 *  - `image`: statically-imported PNG/SVG confirmed visible on BOTH light & dark backgrounds.
 *  - neither: falls back to the premium text treatment — color-aware (ink in light, white in dark).
 *
 * SVG assets with hardcoded black/white fills that make them invisible on one theme
 * are intentionally listed WITHOUT an image so they render as readable text.
 */
import type { StaticImageData } from "next/image";

/* ---------- Homepage / About: People Placed At ---------- */
import googleLogo from "@/logos/Googlelogo.png";
import microsoftLogo from "@/logos/Microsoftlogo.png";
import amazonLogo from "@/logos/amazonlogo.png";
import deloitteLogo from "@/logos/deloittelogo.png";
import pgLogo from "@/logos/P&Glogo.png";
import blinkitLogo from "@/logos/blinkitlogo.jpg";

/* ---------- About: Worked With Talent From — VISIBLE SVGs only ---------- */
import talentLogosImg0 from "@/Worked with Talent from Leading companies/accenture.svg";
import talentLogosImg1 from "@/Worked with Talent from Leading companies/airtel.svg";
import talentLogosImg3 from "@/Worked with Talent from Leading companies/american-express.svg";
import talentLogosImg6 from "@/Worked with Talent from Leading companies/axis-bank.svg";
import talentLogosImg13 from "@/Worked with Talent from Leading companies/goldman-sachs.svg";
import talentLogosImg14 from "@/Worked with Talent from Leading companies/hcltech.svg";
import talentLogosImg15 from "@/Worked with Talent from Leading companies/hdfc-bank.svg";
import talentLogosImg17 from "@/Worked with Talent from Leading companies/ibm.svg";
import talentLogosImg18 from "@/Worked with Talent from Leading companies/icici-bank.svg";
import talentLogosImg20 from "@/Worked with Talent from Leading companies/infosys.svg";
import talentLogosImg23 from "@/Worked with Talent from Leading companies/maruti-suzuki.svg";
import talentLogosImg24 from "@/Worked with Talent from Leading companies/microsoft.svg";
import talentLogosImg33 from "@/Worked with Talent from Leading companies/udaan.svg";
import talentLogosImg34 from "@/Worked with Talent from Leading companies/wipro.svg";

/* ---------- About: Featured In — VISIBLE SVGs only ---------- */
import mediaLogosImg0 from "@/FeaturedInLogos/99-news.svg";
import mediaLogosImg2 from "@/FeaturedInLogos/eshn-news.svg";
import mediaLogosImg3 from "@/FeaturedInLogos/free-press-journal.svg";
import mediaLogosImg6 from "@/FeaturedInLogos/News18logo.svg";
import mediaLogosImg9 from "@/FeaturedInLogos/republic.svg";
import mediaLogosImg11 from "@/FeaturedInLogos/the-republic-news.svg";

export interface BrandLogo {
  name: string;
  /** Path-string src for /media/logos/<src> (legacy public-folder logos) */
  src?: string;
  /** Statically-imported image (preferred — avoids 404s and optimises at build time) */
  image?: StaticImageData;
}

/* ---------- People Placed At (home + about) ---------- */
export const placedAtLogos: BrandLogo[] = [
  { name: "Google", image: googleLogo },
  { name: "Microsoft", image: microsoftLogo },
  { name: "Amazon", image: amazonLogo },
  { name: "Deloitte", image: deloitteLogo },
  { name: "P&G", image: pgLogo },
  { name: "Blinkit", image: blinkitLogo },
];

/* ---------- Worked with talent from (about) ----------
 * Logos marked with NO image fall back to styled text (color-correct in both themes).
 * This is intentional — those SVGs have hardcoded fills invisible on one background.
 * ------------------------------------------------------------------ */
export const talentLogos: BrandLogo[] = [
  { name: "Accenture",           image: talentLogosImg0  },
  { name: "Airtel",              image: talentLogosImg1  },
  { name: "Amazon"                                       }, // black fill → text fallback
  { name: "American Express",    image: talentLogosImg3  },
  { name: "Asian Paints"                                 }, // invisible SVG → text fallback
  { name: "Atos"                                         }, // invisible SVG → text fallback
  { name: "Axis Bank",           image: talentLogosImg6  },
  { name: "BCG"                                          }, // invisible SVG → text fallback
  { name: "Concentrix"                                   }, // invisible SVG → text fallback
  { name: "Cummins"                                      }, // invisible SVG → text fallback
  { name: "DXC Technology"                               }, // invisible SVG → text fallback
  { name: "Eaton"                                        }, // invisible SVG → text fallback
  { name: "EXL"                                          }, // invisible SVG → text fallback
  { name: "Goldman Sachs",       image: talentLogosImg13 },
  { name: "HCLTech",             image: talentLogosImg14 },
  { name: "HDFC Bank",           image: talentLogosImg15 },
  { name: "Hexaware"                                     }, // invisible SVG → text fallback
  { name: "IBM",                 image: talentLogosImg17 },
  { name: "ICICI Bank",          image: talentLogosImg18 },
  { name: "IndiaMart"                                    }, // invisible SVG → text fallback
  { name: "Infosys",             image: talentLogosImg20 },
  { name: "Kotak Mahindra"                               }, // invisible SVG → text fallback
  { name: "L&T"                                          }, // invisible SVG → text fallback
  { name: "Maruti Suzuki",       image: talentLogosImg23 },
  { name: "Microsoft",           image: talentLogosImg24 },
  { name: "NTT"                                          }, // invisible SVG → text fallback
  { name: "Optum"                                        }, // invisible SVG → text fallback
  { name: "PhysicsWallah"                                }, // invisible SVG → text fallback
  { name: "S&P Global"                                   }, // invisible SVG → text fallback
  { name: "State Bank of India"                          }, // invisible SVG → text fallback
  { name: "TCS"                                          }, // invisible SVG → text fallback
  { name: "Tech Mahindra"                                }, // invisible SVG → text fallback
  { name: "The Times of India"                           }, // invisible SVG → text fallback
  { name: "Udaan",               image: talentLogosImg33 },
  { name: "Wipro",               image: talentLogosImg34 },
];

/* ---------- Featured in (about) ----------
 * Same rule — invisible SVGs fall back to readable text.
 * ------------------------------------------------------------------ */
export const mediaLogos: BrandLogo[] = [
  { name: "99 News",              image: mediaLogosImg0  },
  { name: "Daily District News"                          }, // invisible SVG → text fallback
  { name: "Eshn News",            image: mediaLogosImg2  },
  { name: "Free Press Journal",   image: mediaLogosImg3  },
  { name: "Indian Prime Bulletin"                        }, // invisible SVG → text fallback
  { name: "News Today 24x7"                              }, // invisible SVG → text fallback
  { name: "News18",               image: mediaLogosImg6  },
  { name: "Newswire of India"                            }, // invisible SVG → text fallback
  { name: "Punjab Bytes"                                 }, // invisible SVG → text fallback
  { name: "Republic",             image: mediaLogosImg9  },
  { name: "The India Forbes News"                        }, // invisible SVG → text fallback
  { name: "The Republic News",    image: mediaLogosImg11 },
  { name: "The Wire"                                     }, // invisible SVG → text fallback
  { name: "Times News Express"                           }, // invisible SVG → text fallback
  { name: "Today News Standard"                          }, // invisible SVG → text fallback
];
