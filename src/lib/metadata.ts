import type { Metadata } from "next";
import { NOINDEX, siteConfig } from "./config";

/** Image de partage par défaut (1200 × 630, logo Keur Foot), pour les pages sans image propre. */
export const DEFAULT_SHARE_IMAGES: Array<{ url: string; width: number; height: number; alt: string }> = [
  { url: "/brand/keurfoot-partage.jpg", width: 1200, height: 630, alt: "Keur Foot, le football africain" },
];

interface PageMetadataInput {
  title: string;
  description: string;
  /** Chemin de la page (« /selections »), utilisé pour l'adresse canonique et le partage. */
  path: string;
  image?: string | null;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  noindex?: boolean;
  /** Titre utilisé tel quel, sans le suffixe « | Keur Foot » (accueil). */
  absoluteTitle?: boolean;
}

/**
 * Métadonnées d'une page : titre, description, adresse canonique et aperçu de partage.
 * Next.js remplace entièrement le bloc openGraph du layout dès qu'une page en définit un : on le reconstruit ici.
 */
export function pageMetadata({ title, description, path, image, imageAlt, type = "website", publishedTime, noindex, absoluteTitle }: PageMetadataInput): Metadata {
  // Titre complet limité à ~60 caractères (au-delà, Google le coupe) : sans le suffixe s'il est trop long.
  const suffixed = `${title} | ${siteConfig.name}`;
  const absolute = absoluteTitle || suffixed.length > 60;
  const fullTitle = absolute ? title : suffixed;
  const images = image ? [{ url: image, alt: imageAlt ?? title }] : DEFAULT_SHARE_IMAGES;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: type === "profile" ? "website" : type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images.map((i) => i.url) },
    // Grande image autorisée dans Google Discover et les résultats (« max-image-preview:large »).
    robots: noindex || NOINDEX ? { index: false, follow: true, "max-image-preview": "large" } : { "max-image-preview": "large" },
  };
}

/** Texte coupé proprement pour une description (≤ max caractères ; Google en montre environ 155). */
export function clip(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
