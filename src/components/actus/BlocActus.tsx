"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { chargerFlux, dateMiseAJour, filtrerActus, type Actu } from "@/lib/veille";
import { ActuBandeau } from "./ActuBandeau";
import { ActuVignette } from "./ActuVignette";

interface BlocActusProps {
  /** Titre du bloc (rien sur la page /actus, qui a déjà son grand titre). */
  titre?: string;
  /** Nombre d'actus : la 1re en bandeau, les suivantes en vignettes. */
  limite: number;
  /** Code ISO d'un pays (« SN ») pour ne garder que ses actus. */
  pays?: string;
  /** Lien « Toutes les actus → » à côté du titre. */
  lienTout?: boolean;
  /** Affiche la date de mise à jour du fichier. */
  avecDate?: boolean;
  /** Bandeau chargé tout de suite (accueil), sinon à l'approche de l'écran. */
  prioritaire?: boolean;
  /** Texte montré quand aucune actu n'est disponible (par défaut : rien, le bloc s'efface). */
  siVide?: React.ReactNode;
  className?: string;
}

type Etat = { phase: "chargement" } | { phase: "pret"; actus: Actu[]; genereLe: string };

/** Squelette discret pendant le chargement. */
function Squelette({ compacte }: { compacte: boolean }) {
  return (
    <div aria-hidden className={`grid animate-pulse gap-4 ${compacte ? "lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]" : ""}`}>
      <div className="panel aspect-video w-full" />
      <div className="grid gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="panel h-[112px] sm:h-[138px]" />
        ))}
      </div>
    </div>
  );
}

/**
 * Bloc d'actus lu en direct depuis la veille (voir src/lib/veille.ts).
 * En cas d'erreur ou s'il n'y a aucune actu, le bloc entier disparaît : la page reste intacte.
 */
export function BlocActus({ titre, limite, pays, lienTout = false, avecDate = false, prioritaire = false, siVide = null, className = "" }: BlocActusProps) {
  const [etat, setEtat] = useState<Etat>({ phase: "chargement" });

  useEffect(() => {
    let actif = true;
    chargerFlux().then((flux) => {
      if (actif) setEtat({ phase: "pret", actus: flux ? filtrerActus(flux.actus, { pays, limite }) : [], genereLe: flux?.genere_le ?? "" });
    });
    return () => {
      actif = false;
    };
  }, [pays, limite]);

  const compacte = limite <= 4;
  if (etat.phase === "pret" && etat.actus.length === 0) return siVide ? <div className={className}>{siVide}</div> : null;

  const [une, ...suite] = etat.phase === "pret" ? etat.actus : [];
  const maj = etat.phase === "pret" && avecDate ? dateMiseAJour(etat.genereLe) : "";

  return (
    <section className={className} aria-label={titre ?? "Actus"} aria-busy={etat.phase === "chargement"}>
      {(titre || lienTout) && (
        <div className="mb-5 flex items-end justify-between gap-4">
          {titre && <h2 className="section-title">{titre}</h2>}
          {lienTout && (
            <Link href="/actus" className="shrink-0 font-display text-lg font-bold tracking-[0.06em] text-gold uppercase hover:text-chalk">
              Toutes les actus →
            </Link>
          )}
        </div>
      )}
      {maj && <p className="mb-4 text-sm text-muted">Mis à jour le {maj}.</p>}
      {etat.phase === "chargement" ? (
        <Squelette compacte={compacte} />
      ) : compacte && suite.length === 1 ? (
        // Deux actus seulement : sur grand écran, deux bandeaux côte à côte de même hauteur
        // (une vignette seule, étirée à la hauteur du bandeau, aurait l'air vide).
        <div className="grid gap-4 lg:grid-cols-2">
          <ActuBandeau actu={une} prioritaire={prioritaire} />
          <div className="lg:hidden">
            <ActuVignette actu={suite[0]} />
          </div>
          <div className="hidden lg:block">
            <ActuBandeau actu={suite[0]} />
          </div>
        </div>
      ) : compacte ? (
        // Bandeau à gauche (55 %), vignettes à droite (45 %) : les deux colonnes finissent à la même hauteur.
        // L'image du bandeau prend la hauteur restante, les vignettes se partagent la colonne à parts égales.
        <div className={`grid gap-4 ${suite.length > 0 ? "lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]" : ""}`}>
          <ActuBandeau actu={une} prioritaire={prioritaire} colonne={suite.length > 0} />
          {suite.length > 0 && (
            <div className="grid gap-3 lg:auto-rows-fr">
              {suite.map((a) => (
                <ActuVignette key={a.id} actu={a} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          <ActuBandeau actu={une} prioritaire={prioritaire} horizontal />
          {suite.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {suite.map((a) => (
                <ActuVignette key={a.id} actu={a} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
