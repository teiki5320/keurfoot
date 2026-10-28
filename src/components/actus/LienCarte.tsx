"use client";

import Link from "next/link";
import type { LienActu } from "@/lib/veille";

/**
 * Titre d'une carte d'actu, dont le lien couvre toute la carte (la carte doit être en « relative »).
 * Vers l'article sur le site (page construite ou page de secours), sinon vers la source dans un nouvel onglet.
 * Le crédit de l'image garde son propre lien, posé au-dessus (voir CreditImage).
 */
export function LienCarte({ lien, children, className = "" }: { lien: LienActu; children: React.ReactNode; className?: string }) {
  const classes = `after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold ${className}`;
  if (lien.type === "source")
    return (
      <a href={lien.href} target="_blank" rel="noopener nofollow" className={classes}>
        {children}
        <span className="sr-only"> (article d&apos;origine, nouvel onglet)</span>
      </a>
    );
  return (
    <Link href={lien.href} className={classes} prefetch={lien.type === "page" ? undefined : false}>
      {children}
    </Link>
  );
}
