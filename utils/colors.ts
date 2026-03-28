import { color } from './tokens';

/**
 * Color constants — now thin aliases over CSS custom properties.
 * All actual color values live in GlobalStyles.tsx as OKLCH tokens.
 *
 * Existing component imports continue to work unchanged.
 */

// Surfaces
export const paleGrey = color.surface;
export const lightGrey = color.border;

// Static greys (used in always-dark contexts like footer)
export const grey = '#282a36';
export const darkGrey = '#232530';

// Errors
export const red = color.error;

// Brand pinks (used in docs examples, not themeable)
export const violetRed = 'rgb(219, 112, 147)';
export const darkVioletRed = 'rgb(197, 90, 127)';
export const lightVioletRed = 'rgb(243, 192, 210)';
export const palepink = '#BF4F74';

// Gold
export const gold = 'rgb(24, 18, 10)';

// Accent
export const accent = color.accent;
export const accentLight = color.accentLight;
export const accentLightest = color.accentLighter;
export const accentDark = color.accentDark;

// Neutrals (now semantic)
export const blmGrey = color.borderStrong;
export const blmBlack = 'rgb(0, 0, 0)';
export const blmLightGrey = color.surface;
export const blmMetal = color.text;

export const textSecondary = color.textSecondary;
