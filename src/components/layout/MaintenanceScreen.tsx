import Link from "next/link";

export function MaintenanceScreen({ message, contactEmail }: { message: string; contactEmail: string }) {
  return (
    <main id="contenu" className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-5xl uppercase">
        Keur<span className="text-gold">Foot</span>
      </p>
      <h1 className="mt-6 font-display text-3xl uppercase">Mi-temps</h1>
      <p className="mt-3 max-w-md text-muted">{message}</p>
      <p className="mt-6 text-sm">
        <a href={`mailto:${contactEmail}`} className="underline">{contactEmail}</a>
      </p>
      <nav aria-label="Informations légales" className="mt-10 flex gap-4 text-xs text-muted">
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/confidentialite">Confidentialité</Link>
        <Link href="/conditions">Conditions</Link>
      </nav>
    </main>
  );
}
