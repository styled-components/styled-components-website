/**
 * Convert a pixel value to rem string.
 *
 * Uses 18px base for backward compatibility with existing component layouts.
 * New code should prefer CSS custom properties from utils/tokens.ts
 * (e.g., space[4], text.lg) which use the standard 16px base.
 */
const rem = (px: number): string => `${px / 18}rem`;

export default rem;
