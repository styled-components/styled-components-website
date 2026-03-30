import { theme } from './theme';

/**
 * Color constants — thin aliases over the createTheme contract.
 * All actual color values live in utils/theme.ts.
 *
 * Existing component imports continue to work unchanged.
 */

// Surfaces
export const paleGrey = theme.color.surface;
export const lightGrey = theme.color.border;

// Static greys (used in always-dark contexts like footer)
export const grey = '#282a36';
export const darkGrey = '#232530';

// Errors
export const red = theme.color.error;

// Brand pinks (used in docs examples, not themeable)
export const violetRed = 'rgb(219, 112, 147)';
export const darkVioletRed = 'rgb(197, 90, 127)';
export const lightVioletRed = 'rgb(243, 192, 210)';
export const palepink = '#BF4F74';

// Gold
export const gold = 'rgb(24, 18, 10)';

// Accent
export const accent = theme.color.accent;
export const accentLight = theme.color.accentLight;
export const accentLightest = theme.color.accentLighter;
export const accentDark = theme.color.accentDark;

export const textSecondary = theme.color.textSecondary;
