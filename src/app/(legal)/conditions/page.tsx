import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import { legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Conditions générales d'utilisation",
  description:
    "Conditions d'utilisation du site Keur Foot : fiches des sélections et des joueurs, classements, conseils et liens vers Amazon.",
  path: "/conditions",
});

export default function TermsPage() {
  const l = legalConfig;
  return (
    <LegalPage title="Conditions générales d'utilisation" updated="17 octobre 2026">
      <h2>Article 1 — Objet</h2>
      <p>
        Les présentes conditions générales d&apos;utilisation (CGU) encadrent l&apos;accès au site {siteConfig.url}, édité
        par {l.companyName}, {l.legalForm}, dont le siège est situé {l.address} (ci-après « l&apos;Éditeur »). Le site
        présente le football africain : sélections nationales, Coupe d&apos;Afrique des nations, grands joueurs, classements,
        conseils d&apos;achat et liens vers de l&apos;équipement de supporter sur Amazon.fr. Utiliser le site vaut acceptation
        des présentes CGU.
      </p>

      <h2>Article 2 — Accès au site</h2>
      <p>
        Le site est accessible gratuitement, sans inscription. L&apos;Éditeur peut suspendre l&apos;accès, notamment pour
        maintenance, sans que sa responsabilité puisse être engagée.
      </p>

      <h2>Article 3 — Le site ne vend aucun article</h2>
      <p>
        L&apos;Éditeur ne vend, n&apos;expédie ni ne facture aucun article. Les boutons « Voir sur Amazon » renvoient vers
        Amazon.fr : la vente est conclue entre l&apos;acheteur et Amazon ou le vendeur tiers indiqué sur Amazon, selon leurs
        propres conditions. La livraison, le droit de rétractation, les garanties et le service client relèvent de ce
        vendeur. Seul le prix indiqué sur Amazon au moment de l&apos;achat fait foi.
      </p>
      <p>{AMAZON_DISCLOSURE}</p>

      <h2>Article 4 — Fiches, classements et conseils</h2>
      <p>
        Les faits publiés (palmarès, statistiques, résultats) sont tirés de sources citées sur chaque page. Les classements
        « meilleurs joueurs » et les conseils reflètent l&apos;avis de la rédaction, selon des critères indiqués sur la page.
        Les statistiques des joueurs en activité sont datées et peuvent avoir évolué depuis.
      </p>

      <h2>Article 5 — Marques et logos</h2>
      <p>
        Le site est indépendant de toute fédération, de la CAF, de la FIFA, des clubs et des équipementiers. Leurs noms sont
        cités à titre d&apos;information ; aucun de leurs logos ou emblèmes n&apos;est reproduit.
      </p>

      <h2>Article 6 — Propriété intellectuelle</h2>
      <p>
        Les textes, illustrations et éléments graphiques du site sont protégés par le droit de la propriété intellectuelle.
        Toute reproduction sans autorisation préalable est interdite, hormis le partage d&apos;un lien vers une page du site
        ou d&apos;une épingle Pinterest proposée par le site.
      </p>

      <h2>Article 7 — Responsabilité</h2>
      <p>
        L&apos;Éditeur s&apos;efforce de fournir des informations exactes mais ne peut garantir l&apos;absence
        d&apos;erreur. Il n&apos;est pas responsable du contenu des sites vers lesquels renvoient les liens, notamment
        Amazon.fr et Pinterest.
      </p>

      <h2>Article 8 — Droit applicable</h2>
      <p>
        Les présentes CGU sont soumises au droit français. Pour toute question :{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
