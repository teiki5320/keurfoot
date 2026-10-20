"use client";

import { useSyncExternalStore } from "react";
import { todayInParis } from "@/lib/conseils/article";
import { countdownLabel, daysUntil } from "@/lib/countdown";

/** Relit la date du jour chaque minute (le compte à rebours change à minuit, heure de Paris). */
function subscribe(onChange: () => void) {
  const t = setInterval(onChange, 60_000);
  return () => clearInterval(t);
}

/**
 * Compte à rebours avant le coup d'envoi de la CAN (« J-242 »).
 * Le site est statique : la valeur du build sert au premier affichage, puis la date du jour du navigateur prend le relais.
 */
export function CanCountdown({ start, built }: { start: string; built: string }) {
  const today = useSyncExternalStore(subscribe, todayInParis, () => built);
  return <>{countdownLabel(daysUntil(start, today))}</>;
}
