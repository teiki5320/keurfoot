import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/lib/config";
import { TOPS } from "@/lib/data/tops";
import { illustration, imageAllegee } from "@/lib/illustrations";
import { itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Top 10 : les classements du football africain",
  description: "Meilleurs joueurs par pays, meilleurs buteurs de la CAN, pays les plus titrés : nos classements Top 10 du football africain, sourcés et à épingler.",
  path: "/top-10",
});

export default function TopsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListLd("Top 10 Keur Foot", TOPS.map((t) => ({ name: t.title, url: `${siteConfig.url}/top-10/${t.slug}` })))),
        }}
      />
      <Breadcrumb items={[{ name: "Top 10", href: "/top-10" }]} />
      <PageHero
        eyebrow="Classements"
        title="Top 10"
        intro="Les classements du football africain : légendes de chaque pays, buteurs de la CAN, nations les plus titrées. Chaque classement cite ses sources et ses critères."
      />
      <div className="container-page mt-8 grid gap-3.5 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {TOPS.map((t, i) => {
          const img = illustration(`top-${t.slug}`);
          return (
            <Link
              key={t.slug}
              href={`/top-10/${t.slug}`}
              className="kf-rise panel overflow-hidden transition-colors hover:border-gold"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img {...imageAllegee(img, "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw")} alt="" loading="lazy" className="block aspect-[4/3] w-full object-cover" />
              )}
              <span className="block px-4 py-4">
                <span className="eyebrow block text-[11px]">{t.kind === "classement" ? "Classement chiffré" : "Notre sélection"}</span>
                <span className="mt-1.5 block font-display text-2xl leading-[1.05] uppercase">{t.title}</span>
                <span className="mt-2 block text-[13px] text-muted">N°1 · {t.items[0].name}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
