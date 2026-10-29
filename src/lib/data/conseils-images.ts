import type { ConseilImageCredit } from "@/lib/conseils/article";

/**
 * Crédits des images de conseils qui ne sont pas des illustrations originales (règles : docs/ILLUSTRATIONS.md).
 * Le fichier est public/illustrations/conseil-<slug>.webp (WebP 1200 × 800, servi par le site).
 * Photo : Wikimedia Commons ou Openverse (usage commercial), avec auteur, licence et page d'origine.
 * Carte : générée aux couleurs de Keur Foot quand aucune photo libre ne convient.
 * Un conseil absent de cette liste garde son illustration originale.
 */
export const CONSEIL_IMAGES: Record<string, ConseilImageCredit> = {
  "combien-de-temps-dure-un-match-de-foot": {
    type: "photo",
    source: "openverse",
    auteur: "joncandy",
    licence: "CC BY-SA 2.0",
    page: "https://www.flickr.com/photos/37195744@N03/3746942395",
    alt: "Match de football en cours dans un stade éclairé à la tombée de la nuit",
  },
  "comment-apprendre-a-jongler-avec-un-ballon-de-foot": {
    type: "photo",
    source: "wikimedia",
    auteur: "Mostafameraji",
    licence: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Football_freestyle_Iran-Mohammad_Akbari_%D8%AD%D8%B1%DA%A9%D8%A7%D8%AA_%D8%A7%D9%86%D9%81%D8%B1%D8%A7%D8%AF%DB%8C_%D9%81%D9%88%D8%AA%D8%A8%D8%A7%D9%84_%D9%86%D9%85%D8%A7%DB%8C%D8%B4%DB%8C._%D8%A7%DB%8C%D8%B1%D8%A7%D9%86._%D9%85%D8%AD%D9%85%D8%AF_%D8%A7%DA%A9%D8%A8%D8%B1%DB%8C_03.jpg",
    alt: "Jeune homme qui jongle avec un ballon de football au bord d'une rivière",
  },
  "comment-apprendre-a-un-enfant-a-frapper-dans-le-ballon": {
    type: "photo",
    source: "wikimedia",
    auteur: "Dorcas Cheng-Tozun",
    licence: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Kenyan_boy_kicking_soccer_ball.jpg",
    alt: "Petit garçon qui court pour frapper un ballon de football sur un terrain en herbe",
  },
  "comment-choisir-des-gants-de-gardien-de-but": {
    type: "photo",
    source: "wikimedia",
    auteur: "Walter Mains",
    licence: "Domaine public",
    page: "https://commons.wikimedia.org/wiki/File:Football_Gloves_Cone1.jpg",
    alt: "Deux paires de gants de gardien de but posées sur une pelouse à côté d'un plot orange",
  },
  "comment-choisir-ses-protege-tibias": { type: "carte", alt: "Illustration Keur Foot : un ballon sur fond vert et la mention « Protège-tibias »" },
  "comment-choisir-un-bon-ballon-de-foot": {
    type: "photo",
    source: "wikimedia",
    auteur: "USARJ NCO CORPS",
    licence: "CC BY 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Soccer_Ball_(27181880724).jpg",
    alt: "Ballon de football noir et blanc posé sur la ligne blanche d'un terrain",
  },
  "comment-encadrer-un-maillot-de-foot": { type: "carte", alt: "Illustration Keur Foot : un ballon sur fond vert et la mention « Encadrer un maillot »" },
  "comment-habiller-un-enfant-pour-le-foot-en-hiver": {
    type: "photo",
    source: "wikimedia",
    auteur: "Thomas Taylor Hammond (1920-1993)",
    licence: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Soccer_in_the_Snow_Hammond_Slides.jpg",
    alt: "Enfants qui jouent au football sur un terrain enneigé",
  },
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
  "comment-se-deroule-la-phase-finale-de-la-can": {
    type: "photo",
    source: "wikimedia",
    auteur: "Akidjoh",
    licence: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Moses_Mabhida_Stadium_during_2013_Africa_Cup_of_Nations-2013-01-23_RSA_vs_ANG.JPG",
    alt: "Supporters dans les tribunes du stade Moses-Mabhida de Durban pendant la CAN 2013",
  },
  "comment-se-maquiller-aux-couleurs-de-son-equipe": {
    type: "photo",
    source: "openverse",
    auteur: "Richard_of_England",
    licence: "CC BY 2.0",
    page: "https://www.flickr.com/photos/57827564@N03/6996587572",
    alt: "Supportrice dont on peint le drapeau sud-africain sur la joue",
  },
  "qu-est-ce-que-le-hors-jeu-au-football": {
    type: "photo",
    source: "openverse",
    auteur: "Lars Plougmann",
    licence: "CC BY-SA 2.0",
    page: "https://www.flickr.com/photos/75062596@N00/21396705938",
    alt: "Arbitre assistant au bord du terrain, son drapeau à la main",
  },
  "quel-cadeau-foot-offrir-a-un-enfant": { type: "carte", alt: "Illustration Keur Foot : un ballon sur fond vert et la mention « Un cadeau foot »" },
  "quel-drapeau-de-supporter-choisir": {
    type: "photo",
    source: "wikimedia",
    auteur: "Patrick de Laive",
    licence: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Rainbow_nation_flag.jpg",
    alt: "Grand drapeau de l'Afrique du Sud agité dans un stade éclairé la nuit",
  },
};
