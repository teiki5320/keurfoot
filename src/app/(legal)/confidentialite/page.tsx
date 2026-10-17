import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Données personnelles, cookies et publicité Google sur Keur Foot : ce qui est collecté, pourquoi, et vos droits.",
  path: "/confidentialite",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité" updated="17 octobre 2026">
      <p>
        {legalConfig.companyName} (« nous ») attache une grande importance à la protection de vos données personnelles,
        traitées conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et
        Libertés.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        {legalConfig.companyName}, {legalConfig.address}. Contact : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>

      <h2>Données collectées et finalités</h2>
      <p>
        Le site ne comporte ni compte, ni formulaire, ni mesure d&apos;audience par cookie. Des données personnelles sont
        traitées dans les cas suivants.
      </p>
      <ul>
        <li>
          <strong>Messages envoyés à l&apos;adresse de contact</strong> : votre adresse e-mail et le contenu de votre
          message, pour vous répondre. Base légale : intérêt légitime (répondre à votre demande).
        </li>
        <li>
          <strong>Journaux techniques de l&apos;hébergeur</strong> : comme tout site, l&apos;hébergeur ({legalConfig.hostName})
          traite l&apos;adresse IP et les informations techniques de connexion pour délivrer les pages et protéger le site
          contre les attaques. Base légale : intérêt légitime (sécurité du site).
        </li>
        <li>
          <strong>Publicité (Google AdSense)</strong> : certaines pages affichent des annonces fournies par Google. Le détail
          figure plus bas, dans la partie « Publicité ».
        </li>
      </ul>
      <p>Nous ne revendons jamais vos données.</p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>Messages de contact : le temps de traiter la demande, puis 3 ans au plus.</li>
        <li>Journaux techniques : selon la politique de l&apos;hébergeur, quelques jours en général.</li>
      </ul>

      <h2>Destinataires et sous-traitants</h2>
      <p>
        Vos données sont destinées à nos services internes et à nos sous-traitants techniques : hébergement du site (
        {legalConfig.hostName}) et messagerie. Pour la publicité, Google et ses partenaires publicitaires reçoivent
        directement les données décrites dans la partie « Publicité ». Lorsque des données sont transférées hors de
        l&apos;Union européenne (hébergeur et Google, États-Unis), ce transfert est encadré par le cadre de protection des
        données UE–États-Unis (Data Privacy Framework) et par des clauses contractuelles types de la Commission européenne.
      </p>

      <h2 id="publicite">Publicité (Google AdSense)</h2>
      <p>
        Pour financer le site, les fiches sélections et joueurs, la page de la CAN, les classements Top 10 et les articles
        « Conseils » peuvent afficher des annonces signalées « Publicité ». Elles sont choisies et diffusées par Google
        (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlande), avec le service Google AdSense. Nous ne
        choisissons pas les annonces une à une et ne recevons aucune donnée personnelle de Google sur vous : nous recevons
        seulement des statistiques globales (nombre d&apos;annonces vues, de clics, revenus).
      </p>
      <ul>
        <li>
          <strong>Votre choix d&apos;abord</strong> : à votre première visite, un bandeau de Google vous demande votre accord.
          Vous pouvez accepter, refuser ou choisir finalité par finalité. Vous pouvez changer d&apos;avis à tout moment avec
          le lien « Gérer mes cookies » en bas de chaque page.
        </li>
        <li>
          <strong>Si vous acceptez</strong> : Google et ses partenaires publicitaires, dont la liste figure dans le bandeau
          (« Gérer les options »), peuvent déposer et lire des cookies ou identifiants sur votre appareil et utiliser votre
          adresse IP, des informations sur votre navigateur et les pages consultées, pour afficher des annonces, les
          personnaliser selon vos centres d&apos;intérêt, en mesurer l&apos;efficacité et lutter contre la fraude. Base
          légale : votre consentement.
        </li>
        <li>
          <strong>Si vous refusez</strong> : Google peut afficher des annonces dites « limitées », sans cookie publicitaire
          ni personnalisation, ou n&apos;afficher aucune annonce. Le site reste entièrement accessible.
        </li>
        <li>
          <strong>Durées</strong> : les durées de conservation des cookies de Google et de ses partenaires sont indiquées
          pour chacun dans le bandeau (« Gérer les options »).
        </li>
        <li>
          Google agit en responsable de traitement pour ses propres finalités. Pour en savoir plus :{" "}
          <a href="https://policies.google.com/technologies/partner-sites?hl=fr">comment Google utilise les données des
          sites partenaires</a>. Vous pouvez aussi régler la personnalisation des annonces Google dans{" "}
          <a href="https://myadcenter.google.com/?hl=fr">Mon Centre de publicités</a>.
        </li>
      </ul>

      <h2>Liens vers Amazon</h2>
      <p>
        Les boutons « Voir sur Amazon » ouvrent Amazon.fr avec notre identifiant de partenaire, qui permet à Amazon de nous
        rémunérer sur les achats. Nous ne recevons aucune donnée personnelle de votre part à cette occasion. Sur Amazon,
        vos données et les cookies déposés relèvent de la politique de confidentialité d&apos;Amazon.
      </p>

      <h2>Épingles Pinterest</h2>
      <p>
        Le bouton « Épingler » est un simple lien vers Pinterest : aucun script ni cookie de Pinterest n&apos;est chargé sur
        le site tant que vous ne cliquez pas. Sur Pinterest, vos données relèvent de la politique de confidentialité de
        Pinterest.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition
        et de portabilité de vos données, ainsi que du droit de définir des directives relatives à leur sort après votre
        décès. Pour les exercer : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Vous
        pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr).
      </p>

      <h2 id="cookies">Cookies</h2>
      <p>
        Le site lui-même ne dépose aucun cookie de mesure d&apos;audience ni de réseau social. Les seuls cookies sont
        ceux de la publicité Google, déposés <strong>uniquement si vous les acceptez</strong> dans le bandeau (voir
        « Publicité » ci-dessus). Pour revoir votre choix : lien « Gérer mes cookies » en bas de chaque page.
      </p>
      <ul>
        <li><strong>Choix de consentement</strong> (cookie de Google) : mémorise votre réponse au bandeau, pour ne pas vous la redemander à chaque page.</li>
        <li><strong>Cookies publicitaires de Google et de ses partenaires</strong> : seulement avec votre accord ; liste et durées dans le bandeau.</li>
      </ul>
      <p>Amazon.fr et Pinterest, une fois ouverts depuis un bouton du site, déposent leurs propres cookies, selon leur politique.</p>
    </LegalPage>
  );
}
