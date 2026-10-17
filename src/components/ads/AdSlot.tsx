"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, ADSENSE_SLOTS, type AdPlacement } from "@/lib/config";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Emplacement d'annonce Google AdSense, toujours signalé « Publicité ».
 * N'affiche rien tant que l'identifiant du bloc n'est pas réglé (voir ADSENSE_SLOTS),
 * et se replie tout seul si Google n'a pas d'annonce à montrer (voir .ad-slot dans globals.css).
 * Habillage volontairement neutre : à reprendre avec le design définitif.
 */
export function AdSlot({ placement, className = "" }: { placement: AdPlacement; className?: string }) {
  const slot = ADSENSE_SLOTS[placement];
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Bloqueur de publicité ou script absent : l'emplacement reste vide.
    }
  }, [slot]);

  if (!ADSENSE_CLIENT || !slot) return null;
  return (
    <aside aria-label="Publicité" className={`ad-slot ${className}`}>
      <p className="ad-slot-label">Publicité</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
