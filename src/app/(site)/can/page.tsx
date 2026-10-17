import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/PageHero";
import { SourcesList } from "@/components/ui/SourcesList";
import { siteConfig } from "@/lib/config";
import { getCountry } from "@/lib/countries";
import { CAN_EDITIONS, CAN_INTRO, CAN_SOURCES, CAN_UPDATED, NEXT_CAN, canRanking } from "@/lib/data/can";
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
  const ranking = canRanking();
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

      <div className="container-page mt-10 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="prose-text">
            {CAN_INTRO.slice(1).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <h2 className="section-title mt-10">Toutes les éditions</h2>
          <ol className="mt-5 space-y-2">
            {[...CAN_EDITIONS].reverse().map((e) => (
              <li key={e.year} id={`can-${e.year}`} className="scroll-mt-28 rounded-xl border border-line bg-surface p-4 sm:grid sm:grid-cols-[90px_1fr_200px] sm:items-start sm:gap-4">
                <p className="font-display text-3xl text-gold">{e.year}</p>
                <div className="mt-1 sm:mt-0">
                  <p className="text-[15px] font-semibold">
                    🏆 <CountryName slug={e.winner} as={e.winnerAs} />
                    {e.note?.startsWith("Titre contesté") && (
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

        <aside>
          <h2 className="section-title text-[28px] sm:text-[32px]">Les pays titrés</h2>
          <ol className="mt-4 divide-y divide-line rounded-xl border border-line bg-surface">
            {ranking.map((r) => (
              <li key={r.country} className="flex items-center gap-3 px-4 py-3">
                <span className="w-6 font-display text-xl text-gold">{r.rank}</span>
                <span className="flex-1 text-[15px]">
                  <CountryName slug={r.country} />
                  <span className="block text-xs text-muted">{r.years.join(", ")}</span>
                </span>
                <span className="font-display text-2xl">{r.years.length}</span>
              </li>
            ))}
          </ol>
          <Link href="/top-10/pays-les-plus-titres-can" className="tag mt-4">
            Le Top 10 des pays les plus titrés →
          </Link>
        </aside>
      </div>

      <div className="container-page">
        <SourcesList sources={CAN_SOURCES} updatedAt={CAN_UPDATED} />
      </div>
    </>
  );
}
