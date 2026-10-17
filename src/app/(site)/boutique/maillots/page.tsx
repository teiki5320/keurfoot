import type { Metadata } from "next";
import Link from "next/link";
import { AmazonButton } from "@/components/ui/AmazonButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Jersey } from "@/components/ui/Jersey";
import { PageHero } from "@/components/ui/PageHero";
import { AMAZON_DISCLOSURE, amazonUrl } from "@/lib/amazon";
import { getCountry } from "@/lib/countries";
import { SELECTIONS } from "@/lib/data/selections";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Maillots des sélections africaines",
  description: "Les maillots du Sénégal, de la Côte d'Ivoire, du Cameroun, du Maroc, de l'Algérie et du Mali, avec nos conseils pour choisir la bonne taille.",
  path: "/boutique/maillots",
});

export default function JerseysPage() {
  const list = [...SELECTIONS].sort((a, b) => getCountry(a.country)!.name.localeCompare(getCountry(b.country)!.name, "fr"));
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Boutique", href: "/boutique" },
          { name: "Maillots", href: "/boutique/maillots" },
        ]}
      />
      <PageHero
        eyebrow="Boutique supporter"
        title="Les maillots des sélections"
        intro="Choisissez votre équipe : chaque lien ouvre la recherche du maillot sur Amazon, en version adulte et enfant selon les vendeurs."
      >
        <Link href="/conseils/comment-choisir-sa-taille-de-maillot-de-foot" className="btn-secondary mt-6">
          Comment choisir sa taille ?
        </Link>
      </PageHero>

      <div className="container-page mt-10">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {list.map((s) => {
            const country = getCountry(s.country)!;
            return (
              <li key={s.slug} className="flex flex-col rounded-2xl border border-line bg-surface p-4 text-center">
                <Jersey colors={s.colors} label={`Maillot dessiné aux couleurs ${country.of}`} className="mx-auto h-28 w-auto sm:h-36" />
                <h2 className="mt-3 font-display text-xl tracking-wide uppercase sm:text-2xl">{country.name}</h2>
                {s.nickname && <p className="text-xs text-gold">{s.nickname}</p>}
                <p className="mt-1 flex-1 text-xs text-muted">{s.jersey.label}</p>
                <AmazonButton href={amazonUrl(s.jersey)} label="Amazon" className="mt-3 w-full px-3" />
                <Link href={`/selection/${s.slug}`} className="mt-2 text-xs text-chalk/70 underline underline-offset-2 hover:text-gold">
                  L&apos;histoire de la sélection
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-xs text-muted">
          Les maillots dessinés sur cette page sont des créations Keur Foot aux couleurs des drapeaux, pas les maillots officiels. {AMAZON_DISCLOSURE}
        </p>
      </div>
    </>
  );
}
