import Link from "next/link";
import { getCountry } from "@/lib/countries";
import { canRanking, titlesBadge } from "@/lib/data/can";
import { countryLink } from "@/lib/data/links";
import type { Selection } from "@/lib/types";
import { Jersey } from "./Jersey";

/** Délai de balancement décalé d'un maillot à l'autre, pour que la penderie ne bouge pas d'un bloc. */
const sway = (i: number) => ({ animationDelay: `${-(i * 0.7) % 3.4}s` });

/**
 * Penderie : tringle d'acier, maillots sur cintre qui se balancent, tasseau de bois.
 * Sur mobile, la penderie défile au doigt ; sur grand écran, tous les maillots tiennent sur la tringle.
 */
export function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative">
      <div aria-hidden className="h-3 rounded-md bg-gradient-to-b from-[#b8bfc7] via-[#6b7279] to-[#2c3137] shadow-[0_6px_14px_rgba(0,0,0,.6)]" />
      <div
        role="region"
        aria-label={label}
        className="no-scrollbar -mt-1.5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 sm:grid sm:grid-cols-3 sm:overflow-visible xl:grid-cols-6 [&>*]:w-[42vw] [&>*]:max-w-[190px] [&>*]:shrink-0 [&>*]:snap-start sm:[&>*]:w-auto sm:[&>*]:max-w-none"
      >
        {children}
      </div>
      <div aria-hidden className="mx-5 mt-1 h-4 rounded-[3px] bg-gradient-to-b from-[#8a5a35] to-[#5a3a20] shadow-[0_8px_16px_rgba(0,0,0,.5)]" />
    </div>
  );
}

/** Maillot d'une sélection accroché à la tringle : nombre de CAN gagnées sur la poitrine. */
export function RailSelection({ s, i, caption, href }: { s: Selection; i: number; caption?: string; href?: string }) {
  const country = getCountry(s.country)!;
  const titles = s.canTitles.length;
  return (
    <Link href={href ?? `/selection/${s.slug}`} className="kf-hang group flex flex-col items-center gap-2 px-1 pb-4" style={sway(i)}>
      <Jersey
        colors={s.colors}
        hanger
        big={titlesBadge(s.canTitles)}
        label={`Maillot dessiné aux couleurs ${country.of}, ${titles} CAN gagnée${titles > 1 ? "s" : ""}`}
        className="w-full max-w-[190px] drop-shadow-[0_22px_18px_rgba(0,0,0,.6)]"
      />
      <span className="text-center font-display text-xl leading-none font-bold tracking-[0.04em] uppercase group-hover:text-gold sm:text-[22px]">{country.name}</span>
      <span className="text-center text-xs tracking-[0.06em] text-muted uppercase">
        {caption ?? (titles ? `${titles} CAN gagnée${titles > 1 ? "s" : ""}` : "En quête d'une CAN")}
      </span>
    </Link>
  );
}

/** Tableau d'ardoise : pays les plus titrés de la CAN, avec des barres qui se remplissent. */
export function ScoreBoard({ title, limit = 8, children }: { title: string; limit?: number; children?: React.ReactNode }) {
  const rows = canRanking().slice(0, limit);
  const max = rows[0]?.years.length ?? 1;
  return (
    <div className="board px-5 py-6 sm:px-7 sm:py-7">
      <p className="text-[13px] font-bold tracking-[0.2em] text-board-muted uppercase">{title}</p>
      <ol className="mt-4 flex flex-col gap-2.5">
        {rows.map((r, i) => {
          const name = getCountry(r.country)?.name ?? r.country;
          const href = countryLink(r.country);
          return (
            <li key={r.country} className="grid grid-cols-[22px_minmax(0,110px)_minmax(0,1fr)_30px] items-center gap-3 text-[15px] font-medium sm:grid-cols-[24px_150px_minmax(0,1fr)_30px] sm:text-base">
              <span className="text-board-muted">{r.rank}</span>
              {href ? <Link href={href} className="truncate hover:text-gold">{name}</Link> : <span className="truncate">{name}</span>}
              <span aria-hidden className="h-2.5 bg-white/[0.08]">
                <span className="kf-grow block h-full bg-gold" style={{ width: `${(r.years.length / max) * 100}%`, animationDelay: `${i * 0.08}s` }} />
              </span>
              <span className="text-right font-display text-[22px]">
                {r.years.length}
                <span className="sr-only"> titres</span>
              </span>
            </li>
          );
        })}
      </ol>
      {children && <div className="mt-4 text-xs leading-relaxed text-board-muted">{children}</div>}
    </div>
  );
}
