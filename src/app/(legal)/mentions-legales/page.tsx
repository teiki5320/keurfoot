import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import { ADSENSE_CLIENT, legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description: "Éditeur et hébergeur du site Keur Foot, données personnelles, publicité, liens Amazon, marques, illustrations et limites de responsabilité.",
  path: "/mentions-legales",
});

export default function LegalNoticePage() {
  const l = legalConfig;
  return (
    <LegalPage title="Mentions légales" updated="17 octobre 2026">
      <p>
        Informations sur l&apos;éditeur et l&apos;hébergeur du site, l&apos;usage de vos données et les limites des
        informations publiées (loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique).
      </p>

      <h2>Éditeur du site</h2>
      <ul>
        <li>
          Éditeur : {l.companyName}, société par actions simplifiée (SAS) au capital de 200 €, exerçant sous le nom
          commercial {l.tradeName}, qui publie le site {siteConfig.name}.
        </li>
        <li>Siège social : {l.address}.</li>
        <li>Immatriculation : {l.rcs} (SIRET {l.siret}).</li>
        <li>N° de TVA intracommunautaire : {l.vat}.</li>
        <li>Directeur de la publication : {l.director}.</li>
        {l.phone && <li>Téléphone : {l.phone}.</li>}
        <li>
          Contact : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </li>
      </ul>

      <h2>Hébergeur</h2>
      <p>{l.host}.</p>

      <h2>Données personnelles et cookies</h2>
      <ul>
        <li>
          {ADSENSE_CLIENT
            ? "Aucun compte n'est nécessaire. Le site ne dépose lui-même aucun cookie ; seuls les cookies de la publicité Google sont déposés, et uniquement si vous les acceptez dans le bandeau de consentement (lien « Gérer mes cookies » en bas de chaque page pour changer d'avis)."
            : "Aucun compte n'est nécessaire et le site ne dépose aucun cookie."}
        </li>
        <li>
          Les polices, les images et le code du site sont servis par le site lui-même, sans mesure d&apos;audience par
          cookie.{ADSENSE_CLIENT && " Seuls les annonces et le bandeau de consentement viennent de Google."}
        </li>
        <li>L&apos;hébergeur peut enregistrer des journaux techniques (adresse IP, date, page demandée) pour la sécurité du service.</li>
        <li>
          Conformément au RGPD, vous pouvez exercer vos droits d&apos;accès, de rectification et d&apos;effacement auprès de
          l&apos;éditeur, à l&apos;adresse de contact ci-dessus. Le détail figure dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </li>
      </ul>

      <h2>Publicité</h2>
      {!ADSENSE_CLIENT ? (
        <p>
          Le site n&apos;affiche pour l&apos;instant aucune publicité. Si des annonces Google AdSense sont ajoutées, ces mentions
          et la <Link href="/confidentialite">politique de confidentialité</Link> seront mises à jour avant leur mise en place.
        </p>
      ) : (
      <p>
        Pour financer le site, certaines pages affichent des annonces fournies par Google AdSense. Elles sont toujours
        signalées par la mention « Publicité » et séparées des contenus et des liens Amazon. L&apos;éditeur ne choisit pas les
        annonces une à une : leur présence ne vaut pas recommandation, et leur contenu relève de l&apos;annonceur. Les
        catégories d&apos;annonces inadaptées à un site sportif tout public (jeux d&apos;argent et paris sportifs compris) sont
        bloquées. Le détail des données utilisées figure dans la{" "}
        <Link href="/confidentialite#publicite">politique de confidentialité</Link>.
      </p>
      )}

      <h2>Liens sponsorisés (Amazon)</h2>
      <p>
        Les boutons « Voir sur Amazon » des fiches sélections, de la boutique, des classements et des conseils sont des liens
        d&apos;affiliation du programme Partenaires d&apos;Amazon.fr. {AMAZON_DISCLOSURE} Le prix payé est le même pour
        l&apos;acheteur. Le site ne vend aucun article : la vente, la livraison et le service client relèvent d&apos;Amazon ou
        du vendeur tiers. Aucun prix n&apos;est garanti : seul le prix affiché sur Amazon au moment de l&apos;achat fait foi.
        Un clic sur ces liens vous fait quitter le site : Amazon applique alors sa propre politique de confidentialité et de
        cookies.
      </p>

      <h2>Marques, logos et compétitions</h2>
      <p>
        {siteConfig.name} est un site indépendant. Il n&apos;est lié à aucune fédération nationale de football, ni à la
        Confédération africaine de football (CAF), ni à la FIFA, ni à aucun club ou équipementier. Les noms des sélections,
        des compétitions, des clubs et des marques sont cités à titre d&apos;information et restent la propriété de leurs
        titulaires. Le site n&apos;utilise aucun logo, écusson ni emblème officiel.
      </p>

      <h2>Propriété intellectuelle et images</h2>
      <ul>
        <li>
          Les textes du site (fiches, classements, articles) sont rédigés par l&apos;éditeur, ainsi que le logo de{" "}
          {siteConfig.name} : ils sont la propriété de l&apos;éditeur, sauf mention contraire. Toute reproduction sans
          autorisation est interdite.
        </li>
        <li>
          Les illustrations sont des <strong>créations originales</strong> réalisées pour {siteConfig.name}, en partie avec
          l&apos;aide de l&apos;intelligence artificielle. Elles ne représentent aucune personne réelle. Les maillots dessinés
          sur le site sont des créations génériques aux couleurs des drapeaux, et non les maillots officiels.
        </li>
        <li>Le site ne publie aucune photo de joueur.</li>
        <li>Pour toute demande de retrait ou de correction, écrivez à l&apos;adresse de contact.</li>
      </ul>

      <h2>Limites de responsabilité</h2>
      <p>
        Les informations publiées (palmarès, statistiques, dates, résultats) sont vérifiées auprès de sources citées en bas de
        chaque page, mais peuvent comporter des erreurs ou évoluer, notamment les statistiques des joueurs en activité, toujours
        datées. N&apos;hésitez pas à nous signaler une erreur à l&apos;adresse de contact.
      </p>
    </LegalPage>
  );
}
