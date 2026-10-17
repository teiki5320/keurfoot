import type { Metadata } from "next";
import { siteConfig, withBase } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

/** Accueil provisoire : remplacé par l'accueil complet à la fin du chantier. */
export default function HomePage() {
  return (
    <section className="container-page flex min-h-[70dvh] flex-col items-center justify-center py-16 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={withBase("/brand/keurfoot-logo.webp")} alt={siteConfig.name} width={480} height={384} className="w-64 sm:w-80" />
      <h1 className="mt-8 font-display text-4xl tracking-wide uppercase sm:text-6xl">{siteConfig.tagline}</h1>
      <p className="mt-4 max-w-xl text-muted">
        Sélections nationales, histoire de la CAN, grands joueurs africains et équipement de supporter : le coup d&apos;envoi,
        c&apos;est très bientôt.
      </p>
    </section>
  );
}
