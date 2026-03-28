/**
 * Design token references — CSS custom property names as JS constants.
 *
 * These are thin pointers to CSS variables defined in GlobalStyles.tsx.
 * No runtime computation — just `var(--name)` strings for use in
 * styled-components template literals.
 */

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const color = {
  // Surfaces
  bg: 'var(--color-bg)',
  surface: 'var(--color-surface)',
  surfaceRaised: 'var(--color-surface-raised)',

  // Text
  text: 'var(--color-text)',
  textSecondary: 'var(--color-text-secondary)',
  textMuted: 'var(--color-text-muted)',

  // Accent (purple)
  accent: 'var(--color-accent)',
  accentLight: 'var(--color-accent-light)',
  accentLighter: 'var(--color-accent-lighter)',
  accentDark: 'var(--color-accent-dark)',
  accentSubtle: 'var(--color-accent-subtle)',

  // Borders
  border: 'var(--color-border)',
  borderStrong: 'var(--color-border-strong)',

  // Shadows
  shadow: 'var(--color-shadow)',

  // Semantic
  error: 'var(--color-error)',
  brandPink: 'var(--color-brand-pink)',
  selection: 'var(--color-selection)',
  linkUnderline: 'var(--color-link-underline)',
  linkUnderlineHover: 'var(--color-link-underline-hover)',

  // Blog
  blogAccent: 'var(--color-blog-accent)',
  blogAccentSubtle: 'var(--color-blog-accent-subtle)',
  blogAccentMuted: 'var(--color-blog-accent-muted)',

  // Code blocks (always dark)
  codeBg: 'var(--color-code-bg)',
  codeText: 'var(--color-code-text)',

  // Nav (always dark with glassmorphism)
  navBg: 'var(--color-nav-bg)',
  navText: 'var(--color-nav-text)',

  // Hero
  heroText: 'var(--color-hero-text)',
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const font = {
  sans: 'var(--font-sans)',
  display: 'var(--font-display)',
  mono: 'var(--font-mono)',
} as const;

export const text = {
  xs: 'var(--text-xs)',
  sm: 'var(--text-sm)',
  base: 'var(--text-base)',
  md: 'var(--text-md)',
  lg: 'var(--text-lg)',
  xl: 'var(--text-xl)',
  '2xl': 'var(--text-2xl)',
  '3xl': 'var(--text-3xl)',
} as const;

export const fontWeight = {
  normal: 'var(--font-weight-normal)',
  medium: 'var(--font-weight-medium)',
  semibold: 'var(--font-weight-semibold)',
  bold: 'var(--font-weight-bold)',
} as const;

export const leading = {
  tight: 'var(--leading-tight)',
  snug: 'var(--leading-snug)',
  normal: 'var(--leading-normal)',
  relaxed: 'var(--leading-relaxed)',
} as const;

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

export const space = {
  1: 'var(--space-1)',
  2: 'var(--space-2)',
  3: 'var(--space-3)',
  4: 'var(--space-4)',
  5: 'var(--space-5)',
  6: 'var(--space-6)',
  8: 'var(--space-8)',
  10: 'var(--space-10)',
  12: 'var(--space-12)',
  16: 'var(--space-16)',
  20: 'var(--space-20)',
  24: 'var(--space-24)',
} as const;

// ---------------------------------------------------------------------------
// Border radius
// ---------------------------------------------------------------------------

export const radius = {
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  full: 'var(--radius-full)',
} as const;

// ---------------------------------------------------------------------------
// Transitions
// ---------------------------------------------------------------------------

export const duration = {
  fast: 'var(--duration-fast)',
  normal: 'var(--duration-normal)',
  slow: 'var(--duration-slow)',
} as const;

export const ease = {
  out: 'var(--ease-out)',
} as const;

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export const layout = {
  sidebarWidth: 'var(--sidebar-width)',
  navbarHeight: 'var(--navbar-height)',
} as const;
