"use client";

import { imageCarree, type Actu, type LienActu } from "@/lib/veille";
import { CreditImage } from "./CreditImage";
import { LienCarte } from "./LienCarte";
import { LienSource } from "./LienSource";

/**
 * Actu compacte : image carrée à gauche, puis titre, résumé, source, âge et crédit. Toute la carte ouvre l'article (voir lienActu).
 * Dans une colonne étroite (grand écran, moins de 24 rem, ex. iPad en paysage à côté du bandeau) : image et titre plus petits, sans résumé.
 */
export function ActuVignette({ actu, lien }: { actu: Actu; lien: LienActu }) {
  return (
    <article className="group @container panel relative flex h-full gap-3.5 p-3 transition-colors hover:border-gold/60 sm:gap-4 sm:p-3.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageCarree(actu.image)}
        alt={actu.image.alt}
        width={112}
        height={112}
        loading="lazy"
        decoding="async"
        className="size-[88px] shrink-0 rounded-[3px] bg-locker object-cover sm:size-[112px] lg:@max-sm:size-[76px]"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        {actu.competition && <p className="text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">{actu.competition}</p>}
        <h3 className="mt-0.5 font-display text-[19px] leading-[1.08] text-pretty uppercase group-hover:text-gold sm:text-[21px] lg:@max-sm:text-[18px]">
          <LienCarte lien={lien}>{actu.titre}</LienCarte>
        </h3>
        <p className="mt-1 line-clamp-2 text-[14px] lg:@max-sm:hidden leading-snug text-soft">{actu.resume}</p>
        <div className="mt-auto pt-1.5">
          <LienSource actu={actu} />
          <CreditImage image={actu.image} className="mt-0.5" />
        </div>
      </div>
    </article>
  );
}
