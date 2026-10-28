"use client";

import type { ImageActu } from "@/lib/veille";

/**
 * Crédit obligatoire de l'image d'une actu.
 * Photo : « Photo : auteur · licence » avec un lien vers la page d'origine ; carte générée : « Illustration : Keur Foot ».
 */
export function CreditImage({ image, className = "" }: { image: ImageActu; className?: string }) {
  const classes = `text-[11.5px] leading-snug text-muted ${className}`;
  if (image.source === "carte") return <p className={classes}>Illustration : Keur Foot</p>;
  const texte = `${image.source === "banque" ? "Image" : "Photo"} : ${image.credit}${image.licence ? ` · ${image.licence}` : ""}`;
  return (
    <p className={classes}>
      {image.page ? (
        <a href={image.page} target="_blank" rel="noopener nofollow" className="relative z-10 underline decoration-line-strong underline-offset-2 hover:text-chalk">
          {texte}
        </a>
      ) : (
        texte
      )}
    </p>
  );
}
