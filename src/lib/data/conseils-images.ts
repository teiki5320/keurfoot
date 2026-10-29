import type { ConseilImageCredit } from "@/lib/conseils/article";

/**
 * Crédits des images de conseils qui ne sont pas des illustrations originales (règles : docs/ILLUSTRATIONS.md).
 * Le fichier est public/illustrations/conseil-<slug>.webp (WebP 1200 × 800, servi par le site).
 * Photo : Wikimedia Commons ou Openverse (usage commercial), avec auteur, licence et page d'origine.
 * Carte : générée aux couleurs de Keur Foot quand aucune photo libre ne convient.
 * Un conseil absent de cette liste garde son illustration originale.
 */
export const CONSEIL_IMAGES: Record<string, ConseilImageCredit> = {
  "comment-initier-un-enfant-au-football": {
    type: "photo",
    source: "wikimedia",
    auteur: "Francis ackson soko",
    licence: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Children_playing_football_01.jpg",
    alt: "Enfants qui jouent au football pieds nus ou en baskets sur un terrain en terre",
  },
  "comment-laver-un-maillot-de-foot": { type: "carte", alt: "Illustration Keur Foot : un ballon sur fond vert et la mention « Laver un maillot »" },
  "comment-organiser-une-soiree-match-entre-amis": {
    type: "photo",
    source: "openverse",
    auteur: "Adam Jones, Ph.D. - Global Photo Archive",
    licence: "CC BY 2.0",
    page: "https://www.flickr.com/photos/41000732@N04/4721660234",
    alt: "Habitants rassemblés devant un téléviseur pour regarder un match de Coupe du monde au Ghana",
  },
  "quel-drapeau-de-supporter-choisir": {
    type: "photo",
    source: "wikimedia",
    auteur: "Patrick de Laive",
    licence: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Rainbow_nation_flag.jpg",
    alt: "Grand drapeau de l'Afrique du Sud agité dans un stade éclairé la nuit",
  },
};
