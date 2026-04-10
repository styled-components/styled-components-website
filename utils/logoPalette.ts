export const PALETTE_STEPS = 20;

const LOGO_LUM = 0.82;
const LOGO_CHROMA = 0.32;
const HUE_OFFSET = 23;

function ringHue(index: number): number {
  return ((index * 360) / PALETTE_STEPS + HUE_OFFSET) % 360;
}

export function ringColor(index: number): string {
  return `oklch(${LOGO_LUM} ${LOGO_CHROMA} ${ringHue(index)})`;
}
