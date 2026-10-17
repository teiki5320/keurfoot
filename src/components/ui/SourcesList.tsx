import type { Source } from "@/lib/types";
import { formatDate } from "@/lib/format";

/** Sources des informations de la page et date de dernière vérification : rien n'est publié sans source. */
export function SourcesList({ sources, updatedAt }: { sources: Source[]; updatedAt: string }) {
  return (
    <section aria-labelledby="sources" className="mt-14 border-t border-line pt-6 text-sm">
      <h2 id="sources" className="eyebrow">Sources</h2>
      <ul className="mt-3 space-y-1.5 text-muted">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-2 hover:text-chalk">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-faint">Informations vérifiées le {formatDate(updatedAt)}.</p>
    </section>
  );
}
