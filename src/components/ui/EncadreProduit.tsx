import { AmazonButton } from "@/components/ui/AmazonButton";
import { amazonUrl, type EmplacementAmazon } from "@/lib/amazon";
import { getCountry } from "@/lib/countries";
import type { Selection } from "@/lib/types";

/**
 * Petit titre de l'encadré d'une sélection : « Le maillot du Sénégal », ou « Le drapeau du Burundi » quand le maillot
 * n'est pas vendu sur Amazon. Jamais « le maillot de <joueur> » : le produit est celui de la sélection.
 */
export function titreProduitSelection(s: Selection): string {
  const de = getCountry(s.country)?.of ?? "";
  return s.jersey.objet === "drapeau" ? `Le drapeau ${de}` : `Le maillot ${de}`;
}

/**
 * Encadré d'un produit (1 à 3 par page de contenu) : petit titre, nom du produit, bouton « Voir sur Amazon »
 * de 44 px au moins et ligne « Lien partenaire Amazon… » dessous. Aucun prix, aucune photo Amazon.
 */
export function EncadreProduit({
  surtitre,
  produits,
  emplacement,
  children,
  className = "",
}: {
  surtitre: string;
  produits: Array<{ name: string; amazonQuery: string; asin: string | null; note?: string }>;
  emplacement: EmplacementAmazon;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded border border-line bg-surface p-5 ${className}`}>
      <p className="eyebrow">{surtitre}</p>
      <ul className="mt-2 space-y-4">
        {produits.map((p) => (
          <li key={p.name}>
            <p className="font-semibold">{p.name}</p>
            {p.note && <p className="mt-0.5 text-xs text-muted">{p.note}</p>}
            <AmazonButton href={amazonUrl(p, emplacement)} produit={p.name} note className="mt-3 w-full" />
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

/** Le maillot (ou le drapeau) d'une sélection, sous forme de produit pour EncadreProduit. */
export const produitSelection = (s: Selection) => ({ name: s.jersey.label, amazonQuery: s.jersey.amazonQuery, asin: s.jersey.asin });
