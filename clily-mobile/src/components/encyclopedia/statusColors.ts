import { colors } from '../../theme/tokens';
import type { IucnStatus, PopulationTrend } from '../../types/species.types';

/** Figma: Vulnerable is yellow (#FFC64C), "Menurun" is red (#FF2200). Other values follow the same scale. */
export const IUCN_COLOR: Record<IucnStatus, string> = {
  'Least Concern': colors.statusSafe,
  'Near Threatened': colors.statusSafe,
  Vulnerable: colors.statusWarning,
  Endangered: colors.statusDanger,
  'Critically Endangered': colors.statusDanger,
};

export const TREND_COLOR: Record<PopulationTrend, string> = {
  Meningkat: colors.statusSafe,
  Stabil: colors.navy,
  Menurun: colors.statusDanger,
};
