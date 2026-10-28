"use client";

import { ageActu, type Actu } from "@/lib/veille";

/**
 * Nom de la source (en texte : toute la carte est déjà un lien), toujours visible, suivi de l'âge de l'actu.
 * Le lien vers l'article d'origine est sur la page de l'article (encadré « Sources »),
 * ou sur la carte elle-même tant que l'article complet n'est pas écrit.
 */
export function LienSource({ actu }: { actu: Actu }) {
  const age = ageActu(actu.publie_le);
  return (
    <p className="text-[13px] font-semibold">
      <span className="text-[#3ccf7c]">Source : {actu.source_nom}</span>
      {age && <span className="font-normal text-muted"> · {age}</span>}
    </p>
  );
}
