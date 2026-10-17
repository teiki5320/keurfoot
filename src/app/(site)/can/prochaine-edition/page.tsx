import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/PageHero";
import { SourcesList } from "@/components/ui/SourcesList";
import { getCountry } from "@/lib/countries";
import { CAN_EDITIONS, NEXT_CAN } from "@/lib/data/can";
import { formatDate } from "@/lib/format";
import { illustration } from "@/lib/illustrations";
import { clip, pageMetadata } from "@/lib/metadata";

const hosts = NEXT_CAN.hosts.map((h) => getCountry(h)?.name ?? h);
const hostsText = hosts.length > 1 ? `${hosts.slice(0, -1).join(", ")} et ${hosts.at(-1)}` : hosts[0];
const last = CAN_EDITIONS.at(-1)!;

export const metadata: Metadata = pageMetadata({
  title: `CAN ${NEXT_CAN.year} : pays hôte, dates et format`,
  description: clip(`La prochaine Coupe d'Afrique des nations, la CAN ${NEXT_CAN.year} : ${hostsText}. ${NEXT_CAN.text[0]}`),
  path: "/can/prochaine-edition",
});

export default function NextCanPage() {
  const winner = getCountry(last.winner)?.name;
  return (
    <>
      <Breadcrumb
        items={[
          { name: "CAN", href: "/can" },
          { name: `CAN ${NEXT_CAN.year}`, href: "/can/prochaine-edition" },
        ]}
      />
      <PageHero eyebrow="La prochaine édition" title={`CAN ${NEXT_CAN.year}`} image={illustration("can")}>
        <dl className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface/80 p-4">
            <dt className="eyebrow">{hosts.length > 1 ? "Pays hôtes" : "Pays hôte"}</dt>
            <dd className="mt-1 font-display text-2xl uppercase">{hostsText}</dd>
          </div>
          <div className="rounded-xl border border-line bg-surface/80 p-4">
            <dt className="eyebrow">Dates</dt>
            <dd className="mt-1 font-display text-2xl uppercase">{NEXT_CAN.dates ?? "À confirmer"}</dd>
          </div>
        </dl>
      </PageHero>

      <div className="container-page mt-10">
        <div className="prose-text">
          {NEXT_CAN.text.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p>
            Tenant du titre : <strong>{winner}</strong>, vainqueur de la CAN {last.year}. Retrouvez{" "}
            <Link href="/can">toutes les éditions et le palmarès complet</Link>.
          </p>
          <p className="text-sm text-muted">Informations vérifiées le {formatDate(NEXT_CAN.checkedOn)} : elles peuvent évoluer d&apos;ici le tournoi.</p>
        </div>
        <SourcesList sources={NEXT_CAN.sources} updatedAt={NEXT_CAN.checkedOn} />
      </div>
    </>
  );
}
