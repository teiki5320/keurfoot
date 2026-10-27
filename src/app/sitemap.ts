import type { MetadataRoute } from "next";
import { NOINDEX, siteConfig } from "@/lib/config";
import { getConseils } from "@/lib/data/conseils";
import { PLAYERS } from "@/lib/data/players";
import { SELECTIONS } from "@/lib/data/selections";
import { getMaintenance } from "@/lib/data/settings";
import { TOPS } from "@/lib/data/tops";

export const dynamic = "force-static";

/** Dernière mise à jour des pages légales. */
const LEGAL_UPDATED = "2026-10-17";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Site en maintenance ou version provisoire (GitHub Pages) : rien à indexer.
  if (NOINDEX || getMaintenance().enabled) return [];
  const base = siteConfig.url;
  const day = (d: string) => new Date(`${d}T00:00:00Z`);
  const page = (path: string, date: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({
    url: `${base}${path}`,
    lastModified: day(date),
    changeFrequency,
    priority,
  });
  return [
    { url: base, lastModified: day("2026-10-17"), changeFrequency: "weekly", priority: 1 },
    ...["/selections", "/joueurs", "/can", "/can/prochaine-edition", "/top-10", "/boutique", "/boutique/maillots", "/conseils", "/actus"].map((p) =>
      page(p, "2026-10-17", 0.8, "weekly"),
    ),
    ...SELECTIONS.map((s) => page(`/selection/${s.slug}`, s.updatedAt, 0.8)),
    ...PLAYERS.map((p) => page(`/joueur/${p.slug}`, p.updatedAt, 0.7)),
    ...TOPS.map((t) => page(`/top-10/${t.slug}`, t.updatedAt, 0.8)),
    ...getConseils().map((c) => page(`/conseils/${c.slug}`, c.date, 0.6)),
    ...["/conditions", "/mentions-legales", "/confidentialite"].map((path) => ({
      url: `${base}${path}`,
      lastModified: day(LEGAL_UPDATED),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
