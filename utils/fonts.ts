// Modern font stack with CSS variable references.
// The CSS variables are set by next/font in app/layout.tsx.

export const fontSans =
  'var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const fontDisplay =
  'var(--font-display), -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';

export const fontMono =
  'var(--font-mono), ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

// Backward-compat aliases — existing component imports continue to work.
export const bodyFont = fontSans;
export const headerFont = fontSans;
export const displayFont = fontDisplay;
export const monospace = fontMono;
