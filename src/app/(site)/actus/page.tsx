import type { Metadata } from "next";
import { BlocActus } from "@/components/actus/BlocActus";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Actus du foot africain",
  description:
    "Les dernières actus du football africain : sélections, CAN, éliminatoires et joueurs. Résumées en français, mises à jour deux fois par jour, avec le lien vers chaque source.",
  path: "/actus",
});

/**
 * Actus du foot africain : 20 actus lues en direct depuis la veille (src/lib/veille.ts).
 * Chargées dans le navigateur, elles ne sont pas vues par Google : c'est voulu.
 */
export default function ActusPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Actus", href: "/actus" }]} />
      <PageHero
        eyebrow="En direct des sélections"
        title="Actus du foot africain"
        intro="Les dernières nouvelles des sélections africaines, de la CAN et des éliminatoires, résumées en français deux fois par jour. Chaque actu renvoie vers l'article d'origine : clique sur « Source » pour le lire en entier."
      />
      <div className="container-page mt-8">
        <BlocActus
          limite={20}
          avecDate
          prioritaire
          siVide={<p className="panel p-5 text-soft">Les actus ne sont pas disponibles pour le moment. Reviens un peu plus tard.</p>}
        />
      </div>
    </>
  );
}
