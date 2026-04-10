import { createTheme } from 'styled-components';

function withAlpha(oklch: string, alpha: number): string {
  return `${oklch.slice(0, -1)} / ${alpha})`;
}

// Neutral hue for achromatic code tokens (text, comment, punctuation, variable)
const CODE_NEUTRAL = 54;
const CODE_NEUTRAL_DARK = 270; // cooler neutral for dark mode

// ---------------------------------------------------------------------------
// Light theme — the default. Every value becomes a CSS custom property
// via createTheme: theme.color.bg → "var(--sc-color-bg, oklch(0.99 0 0))"
// ---------------------------------------------------------------------------

// CVD-optimized light palette — seeded from red oklch(0.72 0.27 30), 20-step ring.
// qlab separate --adaptive --tolerance tight --gamut p3, then harmonize.
// Worst-pair ΔE 8.58 (normal vision), L range 0.61–0.80.
const lightPalette: Record<number, string> = {
  0: 'oklch(0.6579 0.2752 25.7477)',
  1: 'oklch(0.7133 0.2268 42.8918)',
  2: 'oklch(0.7583 0.2155 65.4221)',
  3: 'oklch(0.7979 0.2386 85.2743)',
  4: 'oklch(0.682 0.2741 104.0057)',
  5: 'oklch(0.7434 0.2246 122.9199)',
  6: 'oklch(0.6637 0.2479 136.97)',
  7: 'oklch(0.7545 0.258 149.7267)',
  8: 'oklch(0.7855 0.2177 170.2576)',
  9: 'oklch(0.7061 0.2436 183.6472)',
  10: 'oklch(0.6488 0.2213 203.8675)',
  11: 'oklch(0.7193 0.176 226.5113)',
  12: 'oklch(0.6051 0.2341 253.7474)',
  13: 'oklch(0.674 0.1845 266.6025)',
  14: 'oklch(0.7487 0.1439 281.5611)',
  15: 'oklch(0.6441 0.239 303.5304)',
  16: 'oklch(0.7606 0.2253 325.2988)',
  17: 'oklch(0.6961 0.2463 337.0433)',
  18: 'oklch(0.657 0.2534 352.3631)',
  19: 'oklch(0.6748 0.27 8.3969)',
};

export const lightTheme = {
  palette: lightPalette,
  color: {
    // Surfaces
    bg: 'oklch(0.99 0 0)',
    surface: 'oklch(0.97 0 0)',
    surfaceRaised: 'oklch(0.95 0 0)',

    // Text
    text: 'oklch(0.2 0.01 270)',
    textSecondary: 'oklch(0.45 0 0)',
    textMuted: 'oklch(0.58 0 0)',

    // Accent (blue-violet, derived from palette P[13])
    accent: lightPalette[13],
    accentLight: 'oklch(0.76 0.18 266.6)',
    accentLighter: 'oklch(0.85 0.12 266.6)',
    accentDark: 'oklch(0.56 0.22 266.6)',
    accentSubtle: withAlpha(lightPalette[13], 0.08),

    // Borders
    border: 'oklch(0 0 0 / 0.1)',
    borderStrong: 'oklch(0 0 0 / 0.2)',

    // Shadows
    shadow: 'oklch(0 0 0 / 0.12)',

    // Selection
    selection: 'oklch(0.8 0.12 85 / 0.3)',

    // Links
    linkUnderline: 'oklch(0 0 0 / 0.15)',
    linkUnderlineHover: 'oklch(0 0 0 / 0.4)',

    // Semantic
    error: lightPalette[0],
    brandPink: lightPalette[18],

    // Blog (derived from P[2] warm amber ~65°)
    blogAccent: lightPalette[2],
    blogAccentSubtle: withAlpha(lightPalette[2], 0.08),
    blogAccentMuted: withAlpha(lightPalette[2], 0.4),

    // Nav (glassmorphism)
    navBg: 'oklch(1 0 0 / 0.85)',
    navText: 'oklch(0.2 0.01 270)',

    // Code syntax — achromatic base tokens
    codeBg: 'oklch(0.97 0 0)',
    codeText: `oklch(0.22 0.02 ${CODE_NEUTRAL})`,
    codeComment: `oklch(0.60 0.03 ${CODE_NEUTRAL})`,

    // Code syntax — chromatic tokens (warm palette for light mode)
    codeDeclaration: lightPalette[12], // 239° blue — property, attr-name, selector
    codeFunction: lightPalette[15], // 293° purple — function calls
    codeValue: lightPalette[6], // 137° green — variables, entities
    codeAccess: lightPalette[15], // 293° purple — property access
    codeString: `oklch(0.22 0.02 ${CODE_NEUTRAL})`, // dark text
    codeInterp0: lightPalette[0], // 23° red
    codeInterp1: lightPalette[0], // 23° red
    codeInterp2: lightPalette[0], // 23° red

    // Hero (always light-on-dark)
    heroText: 'oklch(0.95 0 0)',
  },

  text: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    md: '1.125rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    display: '700',
  },

  leading: {
    tight: '1.15',
    snug: '1.4',
    normal: '1.6',
    relaxed: '1.7',
  },

  space: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },

  radius: {
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },

  duration: {
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
  },

  ease: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },

  layout: {
    sidebar: '18.75rem',
    navbar: '3.125rem',
    gutter: '2rem',
    gutterFluid: 'clamp(2rem, 5vw, 5rem)',
    // Readable content column width. Used by both Layout.Content and the
    // navbar's ContentZone so their horizontal edges line up at any viewport.
    contentWidth: '120ch',
  },
};

// ---------------------------------------------------------------------------
// Dark theme — only colors change
// ---------------------------------------------------------------------------

// CVD-optimized dark palette — qlab harmonize, L+0.03 brightened.
// Worst-pair ΔE 8.69 (normal vision), L range 0.69–0.90.
const darkPalette: Record<number, string> = {
  0: 'oklch(0.6994 0.2477 23.0264)',
  1: 'oklch(0.75 0.2027 40.905)',
  2: 'oklch(0.7822 0.1996 62.908)',
  3: 'oklch(0.8213 0.2102 82.2482)',
  4: 'oklch(0.8628 0.2501 97.2626)',
  5: 'oklch(0.8974 0.2407 114.9615)',
  6: 'oklch(0.8894 0.2821 131.5641)',
  7: 'oklch(0.8673 0.2627 147.8038)',
  8: 'oklch(0.8535 0.2354 165.7866)',
  9: 'oklch(0.8809 0.2114 183.7583)',
  10: 'oklch(0.8498 0.2042 197.6572)',
  11: 'oklch(0.7805 0.1916 209.8018)',
  12: 'oklch(0.7355 0.1704 235.9564)',
  13: 'oklch(0.6909 0.1774 264.5021)',
  14: 'oklch(0.7673 0.1341 276.0508)',
  15: 'oklch(0.8268 0.1093 296.4129)',
  16: 'oklch(0.7743 0.197 317.5406)',
  17: 'oklch(0.7418 0.2537 333.0661)',
  18: 'oklch(0.754 0.2287 349.1495)',
  19: 'oklch(0.7209 0.2362 5.228)',
};

export const darkColors: Partial<typeof lightTheme.color> = {
  bg: 'oklch(0.13 0.01 270)',
  surface: 'oklch(0.18 0.01 270)',
  surfaceRaised: 'oklch(0.22 0.01 270)',
  text: 'oklch(0.93 0 0)',
  textSecondary: 'oklch(0.75 0 0)',
  textMuted: 'oklch(0.5 0 0)',
  accent: darkPalette[13],
  accentLight: 'oklch(0.76 0.18 264.5)',
  accentLighter: 'oklch(0.85 0.12 264.5)',
  accentDark: 'oklch(0.56 0.18 264.5)',
  accentSubtle: withAlpha(darkPalette[13], 0.15),
  border: 'oklch(1 0 0 / 0.1)',
  borderStrong: 'oklch(1 0 0 / 0.15)',
  shadow: 'oklch(0 0 0 / 0.4)',
  selection: 'oklch(0.6 0.12 290 / 0.3)',
  linkUnderline: 'oklch(1 0 0 / 0.2)',
  linkUnderlineHover: 'oklch(1 0 0 / 0.45)',
  blogAccentSubtle: withAlpha(darkPalette[2], 0.12),
  blogAccentMuted: withAlpha(darkPalette[2], 0.25),
  navBg: 'oklch(0.1 0.01 270 / 0.85)',
  navText: 'oklch(0.95 0 0)',
  codeBg: 'oklch(0.18 0.01 270)',
  codeText: `oklch(0.95 0.01 ${CODE_NEUTRAL_DARK})`,
  codeComment: `oklch(0.55 0.02 ${CODE_NEUTRAL_DARK})`,

  // Code syntax — chromatic tokens (cool palette for dark mode)
  codeDeclaration: darkPalette[12], // 236° blue — property, attr-name, selector
  codeFunction: darkPalette[15], // 296° purple — function calls
  codeValue: darkPalette[7], // 148° green — variables, entities
  codeAccess: darkPalette[15], // 296° purple — property access
  codeString: '#fff',
  codeInterp0: darkPalette[0], // 23° red
  codeInterp1: darkPalette[0], // 23° red
  codeInterp2: darkPalette[0], // 23° red
};

export const darkTheme = {
  ...lightTheme,
  palette: darkPalette,
  color: { ...lightTheme.color, ...darkColors },
};

// ---------------------------------------------------------------------------
// Theme contract — the primary export. Use in styled-components templates:
//   import { theme } from '../utils/theme';
//   const Box = styled.div`background: ${theme.color.bg};`;
// ---------------------------------------------------------------------------

export const theme = createTheme(lightTheme, { prefix: 'sc' });

// ---------------------------------------------------------------------------
// Font vars — managed by next/font, not part of the theme.
// Kept here as simple var() refs since they're framework-controlled.
// ---------------------------------------------------------------------------

export const font = {
  sans: 'var(--font-sans)',
  display: 'var(--font-display)',
  mono: 'var(--font-mono)',
} as const;
