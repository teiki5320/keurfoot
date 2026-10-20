import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { Jersey } from "@/components/ui/Jersey";
import { siteConfig } from "@/lib/config";
import { getCountry } from "@/lib/countries";
import { PLAYERS, POSITIONS } from "@/lib/data/players";
import { getSelection } from "@/lib/data/selections";
import { itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import type { Player } from "@/lib/types";

export const metadata: Metadata = pageMetadata({
  title: "Les grands joueurs africains : légendes et stars",
  description: "Didier Drogba, Samuel Eto'o, Sadio Mané, Achraf Hakimi : parcours, palmarès et statistiques en sélection des grands joueurs du football africain.",
  path: "/joueurs",
});

/** Carte joueur : maillot de dos avec son numéro, nom, sélection, poste et chiffres en sélection. */
function PlayerCard({ p, i }: { p: Player; i: number }) {
  const country = getCountry(p.selection)!;
  const colors = getSelection(p.selection)?.colors ?? ["#1d2320", "#f2b705"];
  return (
    <Link
      href={`/joueur/${p.slug}`}
      className="kf-rise panel grid grid-cols-[72px_1fr] items-center gap-3.5 p-4 transition-colors hover:border-gold"
      style={{ animationDelay: `${i * 0.06}s` }}
    >
      <Jersey colors={colors} side="dos" big={p.shirtNumber} label={`Maillot dessiné de ${p.name}`} className="w-[72px] drop-shadow-[0_6px_6px_rgba(0,0,0,.5)]" />
      <span>
        <span className="block font-display text-[26px] leading-none uppercase">{p.name}</span>
        <span className="mt-1 block text-[13px] text-muted">
          {country.name} · {POSITIONS[p.position]}
        </span>
        {p.caps !== null && p.goals !== null && (
          <span className="mt-2.5 block text-[11px] font-bold tracking-[0.1em] text-gold uppercase">
            {p.caps} sélections · {p.goals} buts
          </span>
        )}
      </span>
    </Link>
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
      <div className="container-page kf-rise pt-6">
        <h1 className="font-display text-[56px] leading-[0.9] uppercase sm:text-7xl">Les légendes</h1>
        <p className="mt-3 max-w-2xl text-soft">
          Les grands noms du football africain, d&apos;hier et d&apos;aujourd&apos;hui : leur parcours, leur palmarès et leurs chiffres en
          sélection, toujours datés et sourcés.
        </p>
      </div>
      {[
        { title: "Les légendes", list: legends },
        { title: "En activité", list: active },
      ].map((g) =>
        g.list.length ? (
          <section key={g.title} className="container-page mt-10">
            <h2 className="section-title">{g.title}</h2>
            <div className="mt-5 grid gap-3.5 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
              {g.list.map((p, i) => (
                <PlayerCard key={p.slug} p={p} i={i} />
              ))}
            </div>
          </section>
        ) : null,
      )}
    </>
  );
}
