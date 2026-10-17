"use client";

import Link from "next/link";
import { ADSENSE_CLIENT } from "@/lib/config";

type GoogleFc = { callbackQueue?: Array<() => void>; showRevocationMessage?: () => void };

declare global {
  interface Window {
    googlefc?: GoogleFc;
  }
}

/**
 * « Gérer mes cookies » : rouvre le bandeau de consentement de Google (outil « Confidentialité et messages » d'AdSense).
 * Sans AdSense, ou si le bandeau n'est pas chargé, mène à la partie Cookies de la politique de confidentialité.
 */
export function CookieSettingsLink({ className = "" }: { className?: string }) {
  if (!ADSENSE_CLIENT) {
    return (
      <Link href="/confidentialite#cookies" className={className}>
        Cookies
      </Link>
    );
  }
  return (
    <a
      href="/confidentialite#cookies"
      className={className}
      onClick={(e) => {
        // Bandeau de Google non chargé (bloqueur de publicité, hors Europe…) : le lien mène à la politique de confidentialité.
        const fc = window.googlefc;
        if (!fc) return;
        e.preventDefault();
        (fc.callbackQueue ??= []).push(() => window.googlefc?.showRevocationMessage?.());
      }}
    >
      Gérer mes cookies
    </a>
  );
}
