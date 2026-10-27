"use client";

import { ageActu, type Actu } from "@/lib/veille";

/** Lien vers l'article d'origine, toujours visible, suivi de l'âge de l'actu. */
export function LienSource({ actu }: { actu: Actu }) {
  const age = ageActu(actu.publie_le);
  return (
    <p className="text-[13px] font-semibold">
      <a href={actu.source_url} target="_blank" rel="noopener nofollow" className="text-[#3ccf7c] underline-offset-2 hover:text-gold hover:underline">
        Source : {actu.source_nom} <span aria-hidden>↗</span>
        <span className="sr-only"> (nouvel onglet)</span>
      </a>
      {age && <span className="font-normal text-muted"> · {age}</span>}
    </p>
  );
}
