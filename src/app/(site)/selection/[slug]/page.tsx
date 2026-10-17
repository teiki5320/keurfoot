import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { AmazonButton } from "@/components/ui/AmazonButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FlagBand } from "@/components/ui/FlagBand";
import { Jersey } from "@/components/ui/Jersey";
import { PageHero } from "@/components/ui/PageHero";
import { SourcesList } from "@/components/ui/SourcesList";
import { amazonUrl } from "@/lib/amazon";
import { getCountry } from "@/lib/countries";
import { getPlayer } from "@/lib/data/players";
import { SELECTIONS, getSelection } from "@/lib/data/selections";
import { TOPS } from "@/lib/data/tops";
import { illustration } from "@/lib/illustrations";
import { clip, pageMetadata } from "@/lib/metadata";

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

const years = (list: number[]) => (list.length > 1 ? `${list.slice(0, -1).join(", ")} et ${list.at(-1)}` : `${list[0]}`);

export default async function SelectionPage({ params }: PageProps<"/selection/[slug]">) {
  const s = getSelection((await params).slug);
  if (!s) notFound();
  const country = getCountry(s.country)!;
  const tops = TOPS.filter((t) => t.country === s.country || t.items.some((i) => i.country === s.country)).slice(0, 4);
  const stats = [
    { label: "CAN gagnées", value: s.canTitles.length, detail: s.canTitles.length ? years(s.canTitles) : "Pas encore de titre" },
    { label: "Finales perdues", value: s.canFinals.length, detail: s.canFinals.length ? years(s.canFinals) : "—" },
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
      <PageHero eyebrow={s.nickname ?? "Sélection nationale"} title={country.name} intro={s.intro} image={illustration(`selection-${s.slug}`)}>
        <FlagBand colors={s.colors} className="mt-6 h-2 max-w-xs" />
      </PageHero>

      <div className="container-page mt-8">
        <dl className="grid gap-3 sm:grid-cols-3">
          {stats.map((st) => (
            <div key={st.label} className="rounded-2xl border border-line bg-surface p-4">
              <dt className="eyebrow">{st.label}</dt>
              <dd className="mt-1 font-display text-5xl leading-none">{st.value}</dd>
              <dd className="mt-2 text-sm text-muted">{st.detail}</dd>
            </div>
          ))}
        </dl>

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
                  <li key={l.name} className="rounded-2xl border border-line bg-surface p-4">
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
            <div className="rounded-2xl border border-line bg-surface p-5 text-center">
              <p className="eyebrow">Le maillot</p>
              <Jersey colors={s.colors} label={`Maillot dessiné aux couleurs ${country.of}`} className="mx-auto mt-3 h-40 w-auto" />
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
      </div>
    </>
  );
}
