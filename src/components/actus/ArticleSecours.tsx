"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { chargerArticle, chargerFlux, fichesLiees, idDemande, lienActu, type ArticleActu, type LienFiche } from "@/lib/veille";
import { ArticleVue, type AutreActu } from "./ArticleVue";

type Etat = { phase: "chargement" } | { phase: "introuvable" } | { phase: "pret"; article: ArticleActu; autres: AutreActu[] };

/**
 * Page de secours d'un article (/actus/article?id=<id>), rendue dans le navigateur à partir de la veille.
 * Si l'article a déjà sa page construite, on y va directement. Id inconnu : message simple et lien vers /actus.
 */
export function ArticleSecours({ construits, fiches }: { construits: string[]; fiches: Record<string, LienFiche> }) {
  const [etat, setEtat] = useState<Etat>({ phase: "chargement" });
  const pages = useMemo(() => new Set(construits), [construits]);

  useEffect(() => {
    let actif = true;
    const id = idDemande(window.location.search);
    (async () => {
      const [article, flux] = await Promise.all([chargerArticle(id), chargerFlux()]);
      if (!actif) return;
      if (!article) return setEtat({ phase: "introuvable" });
      if (pages.has(article.slug)) {
        window.location.replace(`${window.location.pathname.replace(/\/actus\/article\/?$/, "")}/actus/${article.slug}`);
        return;
      }
      document.title = `${article.titre} | Keur Foot`;
      const autres: AutreActu[] = (flux?.actus ?? [])
        .filter((a) => a.id !== article.id && a.slug)
        .slice(0, 3)
        .map((a) => ({ id: a.id, titre: a.titre, source_nom: a.source_nom, publie_le: a.publie_le, image: a.image, lien: lienActu(a, pages) }));
      setEtat({ phase: "pret", article: { ...article, image: flux?.actus.find((a) => a.id === article.id)?.image ?? article.image }, autres });
    })();
    return () => {
      actif = false;
    };
  }, [pages]);

  if (etat.phase === "pret")
    return (
      <>
        <Breadcrumb
          items={[
            { name: "Actus", href: "/actus" },
            { name: etat.article.titre, href: `/actus/article?id=${etat.article.id}` },
          ]}
        />
        <ArticleVue article={etat.article} fiches={fichesLiees(etat.article, fiches)} autres={etat.autres} />
      </>
    );

  return (
    <>
      <Breadcrumb items={[{ name: "Actus", href: "/actus" }]} />
      <div className="container-page max-w-[744px]" aria-busy={etat.phase === "chargement"}>
        {etat.phase === "chargement" ? (
          <div aria-hidden className="mt-8 animate-pulse space-y-4">
            <div className="h-4 w-40 rounded bg-surface" />
            <div className="h-24 rounded bg-surface" />
            <div className="panel aspect-video w-full" />
          </div>
        ) : (
          <div className="panel mt-8 p-6">
            <h1 className="font-display text-[30px] leading-none uppercase">Article introuvable</h1>
            <p className="mt-3 text-soft">Cet article n&apos;existe pas ou n&apos;est plus disponible. Retrouve toutes les dernières nouvelles sur la page des actus.</p>
            <Link href="/actus" className="btn-primary mt-5">
              Voir les actus
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
