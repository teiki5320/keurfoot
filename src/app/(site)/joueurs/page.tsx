import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { Jersey } from "@/components/ui/Jersey";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/lib/config";
import { getCountry } from "@/lib/countries";
import { PLAYERS, POSITIONS } from "@/lib/data/players";
import { getSelection } from "@/lib/data/selections";
import { illustration } from "@/lib/illustrations";
import { itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import type { Player } from "@/lib/types";

export const metadata: Metadata = pageMetadata({
  title: "Les grands joueurs africains : légendes et stars",
  description: "Didier Drogba, Samuel Eto'o, Sadio Mané, Achraf Hakimi : parcours, palmarès et statistiques en sélection des grands joueurs du football africain.",
  path: "/joueurs",
});

function PlayerCard({ p }: { p: Player }) {
  const country = getCountry(p.selection)!;
  const colors = getSelection(p.selection)?.colors ?? ["#1d2320", "#f2b705"];
  return (
    <Card
      href={`/joueur/${p.slug}`}
      eyebrow={`${country.name} · ${POSITIONS[p.position]}`}
      title={p.name}
      visual={<Jersey colors={colors} number={p.shirtNumber} label={`Maillot dessiné de ${p.name}`} className="h-3/4 w-auto" />}
      text={p.caps !== null && p.goals !== null ? `${p.caps} sélections · ${p.goals} buts` : undefined}
    />
  );
}

export default function PlayersPage() {
  const active = PLAYERS.filter((p) => p.active);
  const legends = PLAYERS.filter((p) => !p.active);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListLd("Joueurs africains", PLAYERS.map((p) => ({ name: p.name, url: `${siteConfig.url}/joueur/${p.slug}` })))),
        }}
      />
      <Breadcrumb items={[{ name: "Joueurs", href: "/joueurs" }]} />
      <PageHero
        eyebrow="Légendes et stars"
        title="Les joueurs"
        intro="Les grands noms du football africain, d'hier et d'aujourd'hui : leur parcours, leur palmarès et leurs chiffres en sélection, toujours datés et sourcés."
        image={illustration("joueurs")}
      />
      {[
        { title: "Les légendes", list: legends },
        { title: "En activité", list: active },
      ].map((g) =>
        g.list.length ? (
          <section key={g.title} className="container-page mt-12">
            <h2 className="section-title">{g.title}</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {g.list.map((p) => (
                <PlayerCard key={p.slug} p={p} />
              ))}
            </div>
          </section>
        ) : null,
      )}
    </>
  );
}
