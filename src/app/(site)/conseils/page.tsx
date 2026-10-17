import type { Metadata } from "next";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/lib/config";
import { getConseils } from "@/lib/data/conseils";
import { itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Conseils : nos guides d'achat pour supporters",
  description: "Tailles de maillot, buts pliables, ballons, crampons : nos guides pratiques pour bien choisir l'équipement du supporter et du petit joueur.",
  path: "/conseils",
});

export default function ConseilsPage() {
  const conseils = getConseils();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListLd("Conseils Keur Foot", conseils.map((c) => ({ name: c.title, url: `${siteConfig.url}/conseils/${c.slug}` })))),
        }}
      />
      <Breadcrumb items={[{ name: "Conseils", href: "/conseils" }]} />
      <PageHero
        eyebrow="Guides d'achat"
        title="Conseils"
        intro="Des réponses claires aux questions qu'on se pose avant d'acheter : la bonne taille de maillot, le bon ballon, le bon but pour le jardin."
      />
      <div className="container-page mt-10">
        <ConseilGrid conseils={conseils} />
      </div>
    </>
  );
}
