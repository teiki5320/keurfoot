"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BASE_PATH } from "@/lib/config";
import { NAV } from "./nav";

/** Rubrique ouverte : son casier a le voyant allumé. */
function useActive() {
  const raw = usePathname() ?? "/";
  const path = BASE_PATH && raw.startsWith(BASE_PATH) ? raw.slice(BASE_PATH.length) || "/" : raw;
  return (href: string) => {
    const section = href.replace(/s$/, "");
    return path === href || path.startsWith(`${href}/`) || path.startsWith(`${section}/`);
  };
}

/** Casiers du vestiaire = menu principal. Colonne sur grand écran, rangée qu'on fait défiler au doigt sur mobile. */
export function Lockers({ variant }: { variant: "colonne" | "rangee" }) {
  const isActive = useActive();
  const col = variant === "colonne";
  return (
    <nav aria-label={col ? "Menu principal" : "Menu mobile"} className={col ? "flex flex-col gap-[5px]" : "no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-3"}>
      {NAV.map((n) => {
        const active = isActive(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`group relative flex shrink-0 flex-col justify-between rounded-[3px] border bg-gradient-to-b from-locker to-[#1e2227] shadow-[inset_0_1px_0_rgba(255,255,255,.08)] transition-colors hover:border-gold ${
              active ? "border-gold/70" : "border-line-strong"
            } ${col ? "h-[66px] px-2.5 py-2" : "h-[54px] min-w-[112px] px-2 py-1.5"}`}
          >
            {/* Grille d'aération du casier */}
            <span aria-hidden className="block h-2.5 rounded-[1px] bg-[repeating-linear-gradient(0deg,#15181c_0_2px,transparent_2px_4px)] opacity-90" />
            <span className="flex items-center justify-between gap-2">
              <span className="rounded-[2px] bg-label px-2 py-0.5 font-display text-[13px] font-bold tracking-[0.1em] text-[#15181c] uppercase">
                {n.label}
              </span>
              <span
                aria-hidden
                className={`size-[9px] rounded-full ${active ? "bg-gold shadow-[0_0_10px_var(--color-gold)]" : "bg-line-strong"}`}
              />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
