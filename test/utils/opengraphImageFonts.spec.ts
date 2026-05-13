import { globSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Every codegen OG route must load fonts via utils/readOgFont (committed TTFs under assets/fonts/og). */
const OG_IMAGE_FILES = globSync('**/opengraph-image.tsx', { cwd: process.cwd() });

describe('opengraph-image font sourcing', () => {
  it('discovers opengraph-image.tsx files', () => {
    expect(OG_IMAGE_FILES.length).toBeGreaterThan(0);
    expect(new Set(OG_IMAGE_FILES).size).toBe(OG_IMAGE_FILES.length);
  });

  it.each(OG_IMAGE_FILES)('%s uses readOgFont (no CDN font URLs)', relativePath => {
    const src = readFileSync(join(process.cwd(), relativePath), 'utf8');
    expect(src).toMatch(/from ['"]@\/utils\/readOgFont['"]/);
    expect(src).not.toContain('fonts.gstatic.com');
    expect(src).not.toContain('cdn.jsdelivr.net/fontsource');
  });
});
