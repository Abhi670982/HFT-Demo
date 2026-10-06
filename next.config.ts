import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Keep the project self-contained even when nested in deep user folders
    root: path.join(__dirname),
  },
  images: {
    // Demo project: assets (incl. SVG placeholders in /public/images) are served as-is,
    // so swapping a placeholder for a real .jpg/.png requires no rebuild config.
    unoptimized: true,
  },
};

export default nextConfig;
