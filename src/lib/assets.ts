/**
 * CENTRALIZED ASSET CONFIG
 * ------------------------
 * The project `public/media/` folder is the single source of truth for imagery.
 * Every image used across the website is referenced from this file — to swap an
 * asset, replace the file in /public/media and update the path here only.
 */
export const assets = {
  logo: "/media/HFTLOGO.png",
  homeHero: "/media/homeheropic.png",
  agentsHero: "/media/11AIagentheropic.png",
  aboutHero: "/media/Aboutpageheropicture.png",
  ceo: "/media/HFTCEOSIRPIC.png",
} as const;
