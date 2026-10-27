"use client";

import { imageCarree, type Actu } from "@/lib/veille";
import { CreditImage } from "./CreditImage";
import { LienSource } from "./LienSource";

/** Actu compacte : image carrée à gauche, puis titre, résumé, source, âge et crédit. */
export function ActuVignette({ actu }: { actu: Actu }) {
  return (
    <article className="panel flex gap-3.5 p-3 sm:gap-4 sm:p-3.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageCarree(actu.image)}
        alt={actu.image.alt}
        width={112}
        height={112}
        loading="lazy"
        decoding="async"
        className="size-[88px] shrink-0 rounded-[3px] bg-locker object-cover sm:size-[112px]"
      />
      <div className="min-w-0 flex-1">
        {actu.competition && <p className="text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">{actu.competition}</p>}
        <h3 className="mt-0.5 font-display text-[19px] leading-[1.08] text-pretty uppercase sm:text-[21px]">{actu.titre}</h3>
        <p className="mt-1 line-clamp-2 text-[14px] leading-snug text-soft">{actu.resume}</p>
        <div className="mt-1.5">
          <LienSource actu={actu} />
          <CreditImage image={actu.image} className="mt-0.5" />
        </div>
      </div>
    </article>
  );
}
