import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlocActus } from "@/components/actus/BlocActus";
import { AdSlot } from "@/components/ads/AdSlot";
import { AmazonButton } from "@/components/ui/AmazonButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FlagBand } from "@/components/ui/FlagBand";
import { FlipJersey } from "@/components/ui/FlipJersey";
import { SourcesList } from "@/components/ui/SourcesList";
import { amazonUrl } from "@/lib/amazon";
import { getCountry } from "@/lib/countries";
import { canYearsLabel, titlesBadge } from "@/lib/data/can";
import { POSITIONS, getPlayer, playersOf } from "@/lib/data/players";
import { SELECTIONS, getSelection } from "@/lib/data/selections";
import { TOPS } from "@/lib/data/tops";
import { illustration } from "@/lib/illustrations";
import { clip, pageMetadata } from "@/lib/metadata";
import { titreActusSelection } from "@/lib/veille";

export function generateStaticParams() {
  return SELECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/selection/[slug]">): Promise<Metadata> {
  const s = getSelection((await params).slug);
  if (!s) return {};
  const country = getCountry(s.country)!;
  return pageMetadata({
    title: `${country.name} : histoire, palmarès et légendes`,
    description: clip(s.intro),
    path: `/selection/${s.slug}`,
    image: illustration(`selection-${s.slug}`),
    imageAlt: `Illustration : ${country.name}`,
  });
}

export default async function SelectionPage({ params }: PageProps<"/selection/[slug]">) {
  const s = getSelection((await params).slug);
  if (!s) notFound();
  const country = getCountry(s.country)!;
  const casePlayers = playersOf(s.country);
  const tops = TOPS.filter((t) => t.country === s.country || t.items.some((i) => i.country === s.country)).slice(0, 4);
  const stats = [
    { label: "CAN gagnées", value: s.canTitles.length, detail: s.canTitles.length ? canYearsLabel(s.canTitles) : "Pas encore de titre" },
    { label: "Finales perdues", value: s.canFinals.length, detail: s.canFinals.length ? canYearsLabel(s.canFinals) : "—" },
    { label: "Coupes du monde", value: s.worldCups.length, detail: s.bestWorldCup ? `Meilleur résultat : ${s.bestWorldCup}` : "Jamais qualifié" },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Sélections", href: "/selections" },
          { name: country.name, href: `/selection/${s.slug}` },
        ]}
      />
      <div className="container-page kf-rise mt-5 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-10">
        {/* Le casier : maillot sur cintre, à retourner */}
        <div className="relative flex flex-col items-center rounded border border-line bg-gradient-to-b from-surface-2 to-[#15181c] px-6 pt-8 pb-5">
          <span className="absolute top-4 left-4 bg-gold px-2.5 py-1.5 font-display text-xs tracking-[0.14em] text-night uppercase">
            Casier {SELECTIONS.findIndex((x) => x.slug === s.slug) + 1}
          </span>
          <FlipJersey
            colors={s.colors}
            label={`Maillot dessiné aux couleurs ${country.of}`}
            front={titlesBadge(s.canTitles)}
            backName={s.nickname}
            back={titlesBadge(s.canTitles)}
          />
          <FlagBand colors={s.colors} className="mt-4 h-1.5 w-40" />
        </div>
        <div>
          <p className="eyebrow">{s.nickname ?? "Sélection nationale"}</p>
          <h1 className="mt-1.5 font-display text-[56px] leading-[0.88] uppercase sm:text-8xl lg:text-[112px]">{country.name}</h1>
          <p className="mt-4 max-w-[560px] text-[17px] leading-relaxed text-soft">{s.intro}</p>
          <dl className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
            {stats.map((st, i) => (
              <div key={st.label} className="panel p-3 sm:p-4">
                <dd className={`font-display text-4xl leading-none sm:text-[44px] ${i === 0 ? "text-gold" : ""}`}>{st.value}</dd>
                <dt className="mt-1 text-[11px] font-medium tracking-[0.1em] text-muted uppercase sm:text-xs">{st.label}</dt>
                <dd className="mt-1.5 text-xs text-soft sm:text-[13px]">{st.detail}</dd>
              </div>
            ))}
          </dl>
          {casePlayers.length > 0 && (
            <>
              <p className="mt-7 text-[13px] font-bold tracking-[0.2em] text-muted uppercase">Légende du casier</p>
              {casePlayers.map((p) => (
                <Link key={p.slug} href={`/joueur/${p.slug}`} className="panel mt-2.5 flex items-center justify-between px-4 py-4 transition-colors hover:border-gold">
                  <span>
                    <span className="block font-display text-[26px] leading-none uppercase">{p.name}</span>
                    <span className="mt-1 block text-[13px] text-muted">
                      {POSITIONS[p.position]} · {p.active ? "En activité" : "Légende"}
                    </span>
                  </span>
                  <span aria-hidden className="font-display text-xl text-gold">→</span>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="container-page mt-8">
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="section-title">L&apos;histoire</h2>
            <div className="prose-text mt-5">
              {s.history.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <AdSlot placement="selection" />

            <h2 className="section-title mt-12">Les joueurs emblématiques</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {s.legends.map((l) => {
                const player = l.playerSlug ? getPlayer(l.playerSlug) : undefined;
                return (
                  <li key={l.name} className="rounded border border-line bg-surface p-4">
                    <h3 className="font-display text-xl tracking-wide uppercase">
                      {player ? <Link href={`/joueur/${player.slug}`} className="text-gold hover:text-chalk">{l.name} →</Link> : l.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-chalk/80">{l.why}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="rounded border border-line bg-surface p-5 text-center">
              <p className="eyebrow">Le maillot</p>
              <p className="mt-3 font-semibold">{s.jersey.label}</p>
              <p className="mt-1 text-xs text-muted">Dessin Keur Foot aux couleurs du drapeau, pas le maillot officiel.</p>
              <AmazonButton href={amazonUrl(s.jersey)} label="Voir le maillot sur Amazon" className="mt-4 w-full" />
              <Link href="/conseils/comment-choisir-sa-taille-de-maillot-de-foot" className="mt-3 block text-xs text-gold underline underline-offset-2">
                Comment choisir sa taille ?
              </Link>
            </div>
            {tops.length > 0 && (
              <div>
                <p className="eyebrow">Classements</p>
                <ul className="mt-2 space-y-2">
                  {tops.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/top-10/${t.slug}`} className="tag w-full justify-between">
                        {t.pinTitle} <span aria-hidden>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Link href="/can" className="tag w-full justify-between">
              Toutes les CAN <span aria-hidden>→</span>
            </Link>
          </aside>
        </div>

        <SourcesList sources={s.sources} updatedAt={s.updatedAt} />

        {/* Actus du pays, loin des annonces et des liens Amazon ; bloc absent s'il n'y en a aucune. */}
        <BlocActus titre={titreActusSelection(s.nickname, country.of)} limite={3} pays={country.iso2} className="mt-14" />
      </div>
    </>
  );
}
