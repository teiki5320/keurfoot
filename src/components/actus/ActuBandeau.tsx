"use client";

import type { Actu } from "@/lib/veille";
import { CreditImage } from "./CreditImage";
import { LienSource } from "./LienSource";

/** Actu à la une : image 16:9, titre, résumé, source et âge, crédit de l'image (image à gauche du texte sur grand écran si « horizontal »). */
export function ActuBandeau({ actu, prioritaire = false, horizontal = false }: { actu: Actu; prioritaire?: boolean; horizontal?: boolean }) {
  return (
    <article className={`panel flex h-full flex-col overflow-hidden ${horizontal ? "lg:flex-row" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={actu.image.url}
        alt={actu.image.alt}
        width={actu.image.largeur}
        height={actu.image.hauteur}
        loading={prioritaire ? "eager" : "lazy"}
        fetchPriority={prioritaire ? "high" : undefined}
        decoding="async"
        className={`aspect-video w-full bg-locker object-cover ${horizontal ? "lg:w-[58%] lg:shrink-0 lg:self-start" : ""}`}
      />
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        {actu.competition && <p className="eyebrow">{actu.competition}</p>}
        <h3 className="font-display text-[26px] leading-[1.02] text-pretty uppercase sm:text-[30px]">{actu.titre}</h3>
        <p className="text-[15px] leading-relaxed text-soft">{actu.resume}</p>
        <div className="mt-auto pt-1">
          <LienSource actu={actu} />
          <CreditImage image={actu.image} className="mt-1" />
        </div>
      </div>
    </article>
  );
}
