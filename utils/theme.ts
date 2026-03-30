import { createTheme } from 'styled-components';

// ---------------------------------------------------------------------------
// Light theme — the default. Every value becomes a CSS custom property
// via createTheme: theme.color.bg → "var(--sc-color-bg, oklch(0.99 0 0))"
// ---------------------------------------------------------------------------

export const lightTheme = {
  color: {
    // Surfaces
    bg: 'oklch(0.99 0 0)',
    surface: 'oklch(0.97 0 0)',
    surfaceRaised: 'oklch(0.95 0 0)',

    // Text
    text: 'oklch(0.2 0.01 270)',
    textSecondary: 'oklch(0.45 0 0)',
    textMuted: 'oklch(0.58 0 0)',

    // Accent (purple)
    accent: 'oklch(0.50 0.16 290)',
    accentLight: 'oklch(0.62 0.16 290)',
    accentLighter: 'oklch(0.75 0.12 290)',
    accentDark: 'oklch(0.42 0.16 290)',
    accentSubtle: 'oklch(0.5 0.16 290 / 0.08)',

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
    error: 'oklch(0.63 0.24 25)',
    brandPink: 'oklch(0.62 0.14 350)',

    // Blog
    blogAccent: 'oklch(0.72 0.10 60)',
    blogAccentSubtle: 'oklch(0.72 0.1 60 / 0.08)',
    blogAccentMuted: 'oklch(0.72 0.1 60 / 0.2)',

    // Nav (glassmorphism)
    navBg: 'oklch(1 0 0 / 0.85)',
    navText: 'oklch(0.2 0.01 270)',

    // Code syntax
    codeBg: 'oklch(0.97 0 0)',
    codeText: 'oklch(0.2 0.01 270)',
    codeComment: 'oklch(0.55 0.02 290)',
    codePunctuation: 'oklch(0.5 0.04 290)',
    codeConstant: 'oklch(0.5 0.04 290)',
    codeNumber: 'oklch(0.52 0.18 310)',
    codeKeyword: 'oklch(0.45 0.14 240)',
    codeTag: 'oklch(0.42 0.14 160)',
    codeFunction: 'oklch(0.5 0.2 350)',
    codeString: 'oklch(0.45 0.12 200)',
    codeVariable: 'oklch(0.2 0.01 270)',

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
  },
};

// ---------------------------------------------------------------------------
// Dark theme — only colors change
// ---------------------------------------------------------------------------

export const darkColors: Partial<typeof lightTheme.color> = {
  bg: 'oklch(0.13 0.01 270)',
  surface: 'oklch(0.18 0.01 270)',
  surfaceRaised: 'oklch(0.22 0.01 270)',
  text: 'oklch(0.93 0 0)',
  textSecondary: 'oklch(0.75 0 0)',
  textMuted: 'oklch(0.5 0 0)',
  accentSubtle: 'oklch(0.62 0.16 290 / 0.12)',
  border: 'oklch(1 0 0 / 0.1)',
  borderStrong: 'oklch(1 0 0 / 0.15)',
  shadow: 'oklch(0 0 0 / 0.4)',
  selection: 'oklch(0.6 0.12 290 / 0.3)',
  linkUnderline: 'oklch(1 0 0 / 0.2)',
  linkUnderlineHover: 'oklch(1 0 0 / 0.45)',
  blogAccentSubtle: 'oklch(0.72 0.1 60 / 0.12)',
  blogAccentMuted: 'oklch(0.72 0.1 60 / 0.25)',
  navBg: 'oklch(0.1 0.01 270 / 0.85)',
  navText: 'oklch(0.95 0 0)',
  codeBg: 'oklch(0.18 0.02 290)',
  codeText: 'oklch(0.95 0 0)',
  codeComment: 'oklch(0.62 0.03 290)',
  codePunctuation: 'oklch(0.55 0.08 290)',
  codeConstant: 'oklch(0.55 0.08 290)',
  codeNumber: 'oklch(0.72 0.12 310)',
  codeKeyword: 'oklch(0.72 0.12 200)',
  codeTag: 'oklch(0.78 0.1 160)',
  codeFunction: 'oklch(0.72 0.16 350)',
  codeString: 'oklch(0.78 0.08 200)',
  codeVariable: 'oklch(0.95 0 0)',
};

export const darkTheme = { ...lightTheme, color: { ...lightTheme.color, ...darkColors } };

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
