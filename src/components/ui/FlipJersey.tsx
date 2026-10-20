"use client";

import { useState } from "react";
import { Jersey } from "./Jersey";

/** Maillot sur cintre qu'on retourne d'un clic : face (chiffre) puis dos (texte et chiffre). */
export function FlipJersey({
  colors,
  label,
  front,
  backName,
  back,
}: {
  colors: string[];
  label: string;
  front: string | number | null;
  backName: string | null;
  back: string | number | null;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flex w-full flex-col items-center gap-3.5">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={`${label} : retourner le maillot (${flipped ? "dos" : "face"} visible)`}
        className="block w-full max-w-[360px] cursor-pointer [perspective:1200px]"
      >
        <span
          className="relative block transition-transform duration-[800ms] ease-[cubic-bezier(.3,.9,.3,1)] [transform-style:preserve-3d]"
          style={{ transform: `rotateY(${flipped ? 180 : 0}deg)` }}
        >
          <span className="kf-hang block [backface-visibility:hidden]">
            <Jersey colors={colors} hanger big={front} label={`${label}, face`} className="w-full drop-shadow-[0_26px_24px_rgba(0,0,0,.65)]" />
          </span>
          <span className="absolute inset-0 block [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Jersey colors={colors} hanger side="dos" name={backName} big={back} label={`${label}, dos`} className="w-full drop-shadow-[0_26px_24px_rgba(0,0,0,.65)]" />
          </span>
        </span>
      </button>
      <span className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">Cliquer pour retourner · {flipped ? "dos" : "face"}</span>
    </div>
  );
}
