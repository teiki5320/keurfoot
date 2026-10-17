import maintenanceFile from "../../../content/maintenance.json";

export interface MaintenanceSettings {
  enabled: boolean;
  message: string;
}

export const DEFAULT_MAINTENANCE_MESSAGE = "On prépare le terrain : le site revient très vite !";

/**
 * Mode maintenance, lu dans content/maintenance.json au moment du build.
 * On le bascule avec le bouton « Maintenance » de l'onglet Actions de GitHub
 * (.github/workflows/maintenance.yml), qui republie le site.
 * Quand il est actif, les pages affichent l'écran de maintenance ; les pages légales restent accessibles.
 */
export function getMaintenance(): MaintenanceSettings {
  const v = maintenanceFile as Partial<MaintenanceSettings>;
  return { enabled: Boolean(v.enabled), message: v.message?.trim() || DEFAULT_MAINTENANCE_MESSAGE };
}
