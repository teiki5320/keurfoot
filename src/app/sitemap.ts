import type { MetadataRoute } from "next";
import { NOINDEX, siteConfig } from "@/lib/config";
import { getMaintenance } from "@/lib/data/settings";

export const dynamic = "force-static";

/** Dernière mise à jour des pages légales. */
const LEGAL_UPDATED = "2026-10-17";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Site en maintenance ou version provisoire (GitHub Pages) : rien à indexer.
  if (NOINDEX || getMaintenance().enabled) return [];
  const base = siteConfig.url;
  const day = (d: string) => new Date(`${d}T00:00:00Z`);
  return [
    { url: base, lastModified: day("2026-10-17"), changeFrequency: "weekly", priority: 1 },
    ...["/conditions", "/mentions-legales", "/confidentialite"].map((path) => ({
      url: `${base}${path}`,
      lastModified: day(LEGAL_UPDATED),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
