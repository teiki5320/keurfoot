import type { Metadata } from "next";
import Link from "next/link";
import { AmazonButton, AmazonNote } from "@/components/ui/AmazonButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Rail, RailSelection } from "@/components/ui/Vestiaire";
import { PageHero } from "@/components/ui/PageHero";
import { ILLUSTRATION_NOTE, amazonUrl } from "@/lib/amazon";
import { selectionsByRegion } from "@/lib/data/selections";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Maillots des sélections africaines",
  description: "Les maillots des sélections africaines, région par région, avec nos conseils pour choisir la bonne taille.",
  path: "/boutique/maillots",
});

export default function JerseysPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Boutique", href: "/boutique" },
          { name: "Maillots", href: "/boutique/maillots" },
        ]}
      />
      <PageHero
        eyebrow="Boutique supporter"
        title="Les maillots des sélections"
        intro="Choisissez votre équipe : chaque lien ouvre la recherche du maillot sur Amazon, en version adulte et enfant selon les vendeurs."
      >
        <Link href="/conseils/comment-choisir-sa-taille-de-maillot-de-foot" className="btn-secondary mt-6">
          Comment choisir sa taille ?
        </Link>
      </PageHero>

      <div className="container-page mt-10">
        {selectionsByRegion().map((g) => (
          <section key={g.region} className="mt-10 first:mt-0" aria-labelledby={`maillots-${g.region}`}>
            <h2 id={`maillots-${g.region}`} className="section-title mb-5 text-[28px] sm:text-4xl">{g.label}</h2>
            <Rail label={`Maillots : ${g.label}`}>
              {g.selections.map((s, i) => (
                <div key={s.slug} className="flex flex-col items-center">
                  <RailSelection s={s} i={i} caption={s.jersey.label} />
                  <AmazonButton href={amazonUrl(s.jersey)} produit={s.jersey.label} icone={false} className="-mt-1 mb-3 px-3 text-[13px]" />
                </div>
              ))}
            </Rail>
          </section>
        ))}
        <AmazonNote className="mt-8 text-xs" />
        <p className="mt-1 text-xs text-muted">
          {ILLUSTRATION_NOTE} Les maillots dessinés sur cette page sont des créations Keur Foot aux couleurs des drapeaux, pas les
          maillots officiels ; le chiffre sur la poitrine est le nombre de CAN gagnées (* titre 2025 contesté).
        </p>
      </div>
    </>
  );
}
