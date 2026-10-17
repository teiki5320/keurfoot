import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig, withBase } from "@/lib/config";
import { TOPS } from "@/lib/data/tops";
import { illustration } from "@/lib/illustrations";
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
      <div className="container-page mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {TOPS.map((t) => {
          const img = illustration(`top-${t.slug}`);
          return (
            <Card
              key={t.slug}
              href={`/top-10/${t.slug}`}
              eyebrow={t.kind === "classement" ? "Classement chiffré" : "Notre sélection"}
              title={t.pinTitle}
              visual={
                img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={withBase(img)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
                ) : undefined
              }
            />
          );
        })}
      </div>
    </>
  );
}
