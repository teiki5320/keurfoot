import { slugsConstruits } from "@/lib/articles";
import { BlocActusClient, type BlocActusProps } from "./BlocActusClient";

/**
 * Bloc d'actus (accueil, page Actus, fiches sélection) : les actus sont lues dans le navigateur,
 * la liste des pages d'articles construites est écrite dans la page au moment du build.
 */
export function BlocActus(props: BlocActusProps) {
  return <BlocActusClient {...props} construits={slugsConstruits()} />;
}
