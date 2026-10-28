"use client";

import type { Actu, LienActu } from "@/lib/veille";
import { CreditImage } from "./CreditImage";
import { LienCarte } from "./LienCarte";
import { LienSource } from "./LienSource";

/**
 * Actu à la une : image 16:9, titre, résumé, source et âge, crédit de l'image. Toute la carte ouvre l'article (voir lienActu).
 * « horizontal » : image à gauche du texte sur grand écran (page /actus).
 * « colonne » : à côté des vignettes sur grand écran ; l'image remplit la hauteur laissée par le texte,
 * pour que le bandeau finisse pile à la hauteur de la colonne de vignettes.
 */
export function ActuBandeau({ actu, lien, prioritaire = false, horizontal = false, colonne = false }: { actu: Actu; lien: LienActu; prioritaire?: boolean; horizontal?: boolean; colonne?: boolean }) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={actu.image.url}
      alt={actu.image.alt}
      width={actu.image.largeur}
      height={actu.image.hauteur}
      loading={prioritaire ? "eager" : "lazy"}
      fetchPriority={prioritaire ? "high" : undefined}
      decoding="async"
      className={`aspect-video w-full bg-locker object-cover ${horizontal ? "lg:w-[58%] lg:shrink-0 lg:self-start" : ""} ${colonne ? "lg:absolute lg:inset-0 lg:aspect-auto lg:h-full" : ""}`}
    />
  );
  return (
    <article className={`group panel relative flex h-full flex-col overflow-hidden transition-colors hover:border-gold/60 ${horizontal ? "lg:flex-row" : ""}`}>
      {colonne ? <div className="relative lg:min-h-[190px] lg:flex-1">{image}</div> : image}
      <div className={`flex flex-col gap-2 p-4 sm:p-5 ${colonne ? "lg:flex-none" : "flex-1"}`}>
        {actu.competition && <p className="eyebrow">{actu.competition}</p>}
        <h3 className={`font-display text-[26px] leading-[1.02] text-pretty uppercase group-hover:text-gold sm:text-[30px] ${colonne ? "lg:line-clamp-3 lg:text-[28px]" : ""}`}>
          <LienCarte lien={lien}>{actu.titre}</LienCarte>
        </h3>
        <p className={`text-[15px] leading-relaxed text-soft ${colonne ? "lg:line-clamp-3" : ""}`}>{actu.resume}</p>
        <div className="mt-auto pt-1">
          <LienSource actu={actu} />
          <CreditImage image={actu.image} className="mt-1" />
        </div>
      </div>
    </article>
  );
}
