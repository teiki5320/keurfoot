import type { Metadata } from "next";
import Link from "next/link";
import { AmazonButton } from "@/components/ui/AmazonButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Rail, RailSelection } from "@/components/ui/Vestiaire";
import { PageHero } from "@/components/ui/PageHero";
import { AMAZON_DISCLOSURE, amazonUrl } from "@/lib/amazon";
import { getCountry } from "@/lib/countries";
import { SELECTIONS } from "@/lib/data/selections";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Maillots des sélections africaines",
  description: "Les maillots du Sénégal, de la Côte d'Ivoire, du Cameroun, du Maroc, de l'Algérie et du Mali, avec nos conseils pour choisir la bonne taille.",
  path: "/boutique/maillots",
});

export default function JerseysPage() {
  const list = [...SELECTIONS].sort((a, b) => getCountry(a.country)!.name.localeCompare(getCountry(b.country)!.name, "fr"));
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
        <Rail label="Penderie des maillots">
          {list.map((s, i) => (
            <div key={s.slug} className="flex flex-col items-center">
              <RailSelection s={s} i={i} caption={s.jersey.label} />
              <AmazonButton href={amazonUrl(s.jersey)} label="Amazon" className="-mt-1 mb-3 px-4 text-sm" />
            </div>
          ))}
        </Rail>
        <p className="mt-8 text-xs text-muted">
          Les maillots dessinés sur cette page sont des créations Keur Foot aux couleurs des drapeaux, pas les maillots officiels ; le
          chiffre sur la poitrine est le nombre de CAN gagnées (* titre 2025 contesté). Prix et tailles : ceux affichés par le vendeur
          sur Amazon. {AMAZON_DISCLOSURE}
        </p>
      </div>
    </>
  );
}
