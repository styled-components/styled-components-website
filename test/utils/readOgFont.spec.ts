import { readOgFont } from '../../utils/readOgFont';

describe('readOgFont', () => {
  it('loads bundled Figtree bold from disk', async () => {
    const buf = await readOgFont('figtreeBold');
    expect(buf.byteLength).toBeGreaterThan(10_000);
  });

  it('dedupes concurrent reads for the same font file', async () => {
    const [a, b] = await Promise.all([readOgFont('interLatin400'), readOgFont('interLatin400')]);
    expect(a).toBe(b);
  });
});
