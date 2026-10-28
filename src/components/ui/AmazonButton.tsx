import { ShoppingBag } from "lucide-react";
import { AMAZON_LABEL, AMAZON_NOTE } from "@/lib/amazon";

/**
 * Bouton « Voir sur Amazon » (lien d'affiliation signalé « sponsored ») : ouvre un nouvel onglet.
 * Toujours 44 px de haut au moins (min-h-11) et toujours avec son texte, pour le doigt sur téléphone.
 * Le libellé est toujours le même ; `produit` complète le nom accessible (« Voir sur Amazon : … »).
 * `note` affiche juste dessous la ligne « Lien partenaire Amazon… » ; `icone={false}` pour les cartes étroites.
 */
export function AmazonButton({
  href,
  produit,
  note = false,
  icone = true,
  className = "",
}: {
  href: string;
  produit?: string;
  note?: boolean;
  icone?: boolean;
  className?: string;
}) {
  const bouton = (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      aria-label={produit ? `${AMAZON_LABEL} : ${produit}` : undefined}
      className={`btn-primary min-h-11 whitespace-nowrap ${note ? "" : className}`}
    >
      {icone && <ShoppingBag aria-hidden className="size-4" />}
      {AMAZON_LABEL}
    </a>
  );
  if (!note) return bouton;
  return (
    <div className={`flex flex-col ${className}`}>
      {bouton}
      <AmazonNote className="mt-1.5" />
    </div>
  );
}

/** Ligne discrète « Lien partenaire Amazon. Prix, disponibilité et vendeur sont indiqués sur Amazon. » */
export function AmazonNote({ className = "" }: { className?: string }) {
  return <p className={`text-[11px] leading-snug text-muted ${className}`}>{AMAZON_NOTE}</p>;
}
