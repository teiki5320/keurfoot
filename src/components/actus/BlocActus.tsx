import { fluxConstruit, slugsConstruits } from "@/lib/articles";
import { filtrerActus } from "@/lib/veille";
import { BlocActusClient, type BlocActusProps } from "./BlocActusClient";

/**
 * Bloc d'actus (accueil, page Actus, fiches sélection) : les actus du dernier build sont écrites dans la page
 * (Google les voit, rien ne bouge à l'ouverture), puis rafraîchies dans le navigateur depuis la veille.
 * La liste des pages d'articles construites est elle aussi écrite au moment du build.
 */
export function BlocActus(props: BlocActusProps) {
  const flux = fluxConstruit();
  const initial = flux ? { actus: filtrerActus(flux.actus, { pays: props.pays, limite: props.limite }), genereLe: flux.genere_le } : null;
  return <BlocActusClient {...props} construits={slugsConstruits()} initial={initial} />;
}
