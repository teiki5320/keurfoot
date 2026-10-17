import { ShoppingBag } from "lucide-react";

/** Bouton vers Amazon.fr (lien d'affiliation signalé « sponsored ») : ouvre un nouvel onglet. */
export function AmazonButton({ href, label = "Voir sur Amazon", className = "" }: { href: string; label?: string; className?: string }) {
  return (
    <a href={href} target="_blank" rel="sponsored nofollow noopener noreferrer" className={`btn-primary ${className}`}>
      <ShoppingBag aria-hidden className="size-4" />
      {label}
    </a>
  );
}
