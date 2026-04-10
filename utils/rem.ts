/**
 * Convert a pixel value to rem string.
 *
 * Uses 18px base for backward compatibility with existing component layouts.
 * @deprecated New code should prefer the theme contract from utils/theme.ts
 * (e.g., theme.space[4], theme.text.lg) which use the standard 16px base.
 */
const rem = (px: number): string => `${px / 18}rem`;

export default rem;
