import type { NextConfig } from "next";

/**
 * Site 100 % statique (dossier out/).
 * Publié sur Cloudflare Pages (keurbook.com) par .github/workflows/deploy.yml ;
 * en-têtes et redirections dans public/_headers et public/_redirects.
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
