"use client";

import { useSyncExternalStore } from "react";
import { ageActu, type Actu } from "@/lib/veille";

const rien = () => () => {};

/**
 * Nom de la source (en texte : toute la carte est déjà un lien), toujours visible, suivi de l'âge de l'actu.
 * Le lien vers l'article d'origine est sur la page de l'article (encadré « Sources »),
 * ou sur la carte elle-même tant que l'article complet n'est pas écrit.
 * L'âge (« il y a 3 h ») n'est calculé que dans le navigateur : écrit au build, il serait faux.
 */
export function LienSource({ actu }: { actu: Actu }) {
  const age = useSyncExternalStore(
    rien,
    () => ageActu(actu.publie_le),
    () => "",
  );
  return (
    <p className="text-[13px] font-semibold">
      <span className="text-[#3ccf7c]">Source : {actu.source_nom}</span>
      {age && <span className="font-normal text-muted"> · {age}</span>}
    </p>
  );
}
