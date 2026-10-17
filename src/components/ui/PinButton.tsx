import { siteConfig, withBase } from "@/lib/config";
import { pinPath, pinterestShareUrl } from "@/lib/pinterest";

/**
 * Bouton « Épingler » d'un Top 10 : simple lien vers Pinterest (aucun script ni cookie de Pinterest sur le site).
 * L'adresse de l'image doit être complète : on part de l'adresse du site, sous-dossier compris.
 */
export function PinButton({ slug, path, description }: { slug: string; path: string; description: string }) {
  const href = pinterestShareUrl(`${siteConfig.url}${path}`, `${siteConfig.url}${pinPath(slug)}`, description);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn inline-flex bg-[#e60023] text-white hover:bg-[#ad081b]">
      <svg aria-hidden viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.6-1.8-4.4-4.5-4.4-3 0-4.8 2.3-4.8 4.6 0 .9.4 1.9.8 2.4l.1.4-.3 1.2c0 .2-.2.3-.4.2-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8A10 10 0 1 0 12 2Z" />
      </svg>
      Épingler
    </a>
  );
}

/** Aperçu de l'épingle (image verticale), avec le sous-dossier du site. */
export function PinPreview({ slug, alt }: { slug: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={withBase(pinPath(slug))} alt={alt} width={1000} height={1500} loading="lazy" className="w-full rounded-2xl border border-line" />
  );
}
