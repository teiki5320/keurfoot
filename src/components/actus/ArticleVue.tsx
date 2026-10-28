import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/lib/config";
import { dateArticle, nomDeSource, type ArticleActu, type ImageActu, type LienActu, type LienFiche } from "@/lib/veille";
import Link from "next/link";
import { CreditImage } from "./CreditImage";
import { LienCarte } from "./LienCarte";

/** Vignette du bloc « Autres actus ». */
export interface AutreActu {
  id: string;
  titre: string;
  source_nom: string;
  publie_le: string;
  image: ImageActu;
  lien: LienActu;
}

const lienExterne = "font-semibold text-[#3ccf7c] underline-offset-2 hover:text-gold hover:underline";

/**
 * Article complet d'une actu, dans le style des conseils : utilisé par la page construite (/actus/<slug>)
 * et par la page de secours (/actus/article?id=…). Jamais de lien Amazon ici.
 */
export function ArticleVue({
  article,
  fiches,
  autres,
  srcSet,
}: {
  article: ArticleActu;
  fiches: LienFiche[];
  autres: AutreActu[];
  /** Versions réduites de la photo (page construite seulement). */
  srcSet?: string;
}) {
  const date = dateArticle(article.publie_le);
  return (
    <>
      <article className="container-page max-w-[744px]">
        <p className="eyebrow mt-8">
          {article.competition ? `${article.competition} · ` : "Actu · "}
          <span className="text-faint">
            {date && <time dateTime={article.publie_le}>{date}</time>} · {article.lecture_min} min de lecture
          </span>
        </p>
        <h1 className="mt-3 font-display text-[36px] leading-[1] tracking-wide text-balance break-words uppercase sm:text-[52px]">{article.titre}</h1>
        <p className="mt-5 text-[18px] leading-relaxed font-semibold text-chalk sm:text-[19px]">{article.chapo}</p>

        <figure className="mt-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image.url}
            srcSet={srcSet}
            sizes={srcSet ? "(min-width: 776px) 744px, 100vw" : undefined}
            alt={article.image.alt}
            width={article.image.largeur || 1600}
            height={article.image.hauteur || 900}
            fetchPriority="high"
            decoding="async"
            className="aspect-video w-full rounded bg-locker object-cover"
          />
          <figcaption className="mt-2">
            <CreditImage image={article.image} />
          </figcaption>
        </figure>

        <div className="prose-text mt-8 text-[17px]">
          {article.blocs.map((b, i) => (
            <section key={i}>
              {b.intertitre && <h2>{b.intertitre}</h2>}
              {b.paragraphes.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        {/* Fiches du site liées à l'actu : sélections des pays concernés, joueurs cités. */}
        {fiches.length > 0 && (
          <nav aria-labelledby="fiches-liees" className="mt-10">
            <h2 id="fiches-liees" className="eyebrow">
              Pour aller plus loin
            </h2>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {fiches.map((f) => (
                <Link key={f.href} href={f.href} className="tag">
                  {f.texte} →
                </Link>
              ))}
            </div>
          </nav>
        )}

        <aside aria-labelledby="sources-article" className="mt-10 rounded border-l-4 border-gold bg-surface p-5 text-[15px] leading-relaxed">
          <h2 id="sources-article" className="eyebrow">
            Sources
          </h2>
          <p className="mt-2 text-soft">
            Article rédigé par {siteConfig.name} à partir de :{" "}
            <a href={article.source_url} target="_blank" rel="noopener nofollow" className={lienExterne}>
              {article.source_nom} <span aria-hidden>↗</span>
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
            {(article.autres_sources ?? []).map((url) => (
              <span key={url}>
                {", "}
                <a href={url} target="_blank" rel="noopener nofollow" className={lienExterne}>
                  {nomDeSource(url)} <span aria-hidden>↗</span>
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </span>
            ))}
            .
          </p>
        </aside>

        {/* Publicité : même modèle que les conseils, en fin d'article. */}
        <AdSlot placement="article" />
      </article>

      {autres.length > 0 && (
        <section className="container-page mt-14" aria-labelledby="autres-actus">
          <div className="flex items-end justify-between gap-4">
            <h2 id="autres-actus" className="section-title">
              Autres actus
            </h2>
            <Link href="/actus" className="shrink-0 font-display text-lg font-bold tracking-[0.06em] text-gold uppercase hover:text-chalk">
              Toutes les actus →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {autres.map((a) => (
              <article key={a.id} className="group panel relative flex gap-3.5 overflow-hidden p-3 transition-colors hover:border-gold/60 md:flex-col md:gap-0 md:p-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.image.url}
                  alt={a.image.alt}
                  width={a.image.largeur || 1600}
                  height={a.image.hauteur || 900}
                  loading="lazy"
                  decoding="async"
                  className="size-[88px] shrink-0 rounded-[3px] bg-locker object-cover md:aspect-video md:h-auto md:w-full md:rounded-none"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5 md:p-4">
                  <h3 className="font-display text-[19px] leading-[1.06] sm:text-[21px] text-pretty uppercase group-hover:text-gold">
                    <LienCarte lien={a.lien}>{a.titre}</LienCarte>
                  </h3>
                  <p className="mt-auto pt-1 text-[13px]">
                    <span className="font-semibold text-[#3ccf7c]">Source : {a.source_nom}</span>
                    {dateArticle(a.publie_le) && <span className="text-muted"> · {dateArticle(a.publie_le)}</span>}
                  </p>
                  <CreditImage image={a.image} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
