import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { CanCountdown } from "@/components/ui/CanCountdown";
import { ScoreBoard } from "@/components/ui/Vestiaire";
import { todayInParis } from "@/lib/conseils/article";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/PageHero";
import { SourcesList } from "@/components/ui/SourcesList";
import { siteConfig } from "@/lib/config";
import { getCountry } from "@/lib/countries";
import { CAN_EDITIONS, CAN_INTRO, CAN_SOURCES, CAN_UPDATED, NEXT_CAN } from "@/lib/data/can";
import { countryLink } from "@/lib/data/links";
import { illustration } from "@/lib/illustrations";
import { itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

const first = CAN_EDITIONS[0];
const last = CAN_EDITIONS.at(-1)!;

export const metadata: Metadata = pageMetadata({
  title: "CAN : toutes les éditions et le palmarès complet",
  description: `Toutes les Coupes d'Afrique des nations de ${first.year} à ${last.year} : pays hôtes, vainqueurs, finalistes, scores des finales et classement des pays les plus titrés.`,
  path: "/can",
});

/** Nom affiché d'un pays, avec son nom d'époque s'il a changé (« RD Congo (Zaïre) »). */
function CountryName({ slug, as }: { slug: string; as?: string | null }) {
  const name = getCountry(slug)?.name ?? slug;
  const href = countryLink(slug);
  const label = as ? `${name} (${as})` : name;
  return href ? <Link href={href} className="hover:text-gold underline decoration-line-strong underline-offset-2">{label}</Link> : <>{label}</>;
}

export default function CanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListLd("Éditions de la Coupe d'Afrique des nations", CAN_EDITIONS.map((e) => ({ name: `CAN ${e.year}`, url: `${siteConfig.url}/can#can-${e.year}` })))),
        }}
      />
      <Breadcrumb items={[{ name: "CAN", href: "/can" }]} />
      <PageHero
        eyebrow={`${CAN_EDITIONS.length} éditions · ${first.year}–${last.year}`}
        title="La Coupe d'Afrique des nations"
        intro={CAN_INTRO[0]}
        image={illustration("can")}
      >
        <Link href="/can/prochaine-edition" className="btn-primary mt-6">
          La prochaine CAN ({NEXT_CAN.year})
        </Link>
      </PageHero>

      <div className="container-page mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div>
          <div className="prose-text">
            {CAN_INTRO.slice(1).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <h2 className="section-title mt-10">Toutes les éditions</h2>
          <ol className="mt-5 space-y-2">
            {[...CAN_EDITIONS].reverse().map((e) => (
              <li key={e.year} id={`can-${e.year}`} className="scroll-mt-28 rounded border border-line bg-surface p-4 sm:grid sm:grid-cols-[90px_1fr_200px] sm:items-start sm:gap-4">
                <p className="font-display text-3xl text-gold">{e.year}</p>
                <div className="mt-1 sm:mt-0">
                  <p className="text-[15px] font-semibold">
                    <span aria-hidden>🏆 </span>
                    <CountryName slug={e.winner} as={e.winnerAs} />
                    {e.disputed && (
                      <span className="ml-2 rounded-full bg-flame/15 px-2 py-0.5 align-middle text-[11px] font-bold tracking-wide text-flame uppercase">Contesté</span>
                    )}
                  </p>
                  <p className="text-sm text-muted">
                    {/^\d/.test(e.final) ? (
                      <>
                        Finale : {e.final} contre <CountryName slug={e.runnerUp} as={e.runnerUpAs} />
                      </>
                    ) : (
                      <>
                        {e.final}. Deuxième : <CountryName slug={e.runnerUp} as={e.runnerUpAs} />
                      </>
                    )}
                  </p>
                  {e.note && <p className="mt-2 text-[13px] leading-relaxed text-chalk/75">{e.note}</p>}
                </div>
                <p className="mt-1 text-sm text-muted sm:mt-0 sm:text-right">
                  {e.hosts.map((h) => getCountry(h)?.name).join(", ")} · {e.teams} équipes
                </p>
              </li>
            ))}
          </ol>
          <AdSlot placement="can" />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <ScoreBoard title={`Palmarès · ${CAN_EDITIONS.length} éditions`} limit={20}>
            {last.disputed && `Titre ${last.year} contesté devant le TAS. `}
            <Link href="/top-10/pays-les-plus-titres-can" className="underline underline-offset-2 hover:text-gold">Le Top 10 des pays les plus titrés</Link>
          </ScoreBoard>
          {NEXT_CAN.start && (
            <Link href="/can/prochaine-edition" className="panel flex items-center justify-between p-5 transition-colors hover:border-gold">
              <span>
                <span className="eyebrow block">Prochaine édition</span>
                <span className="font-display text-4xl">CAN {NEXT_CAN.year}</span>
              </span>
              <span className="font-display text-3xl text-gold">
                <CanCountdown start={NEXT_CAN.start} built={todayInParis()} />
              </span>
            </Link>
          )}
        </aside>
      </div>

      <div className="container-page">
        <SourcesList sources={CAN_SOURCES} updatedAt={CAN_UPDATED} />
      </div>
    </>
  );
}
