import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const OG_FONT_DIR = join(process.cwd(), 'assets', 'fonts', 'og');

/** Filenames under assets/fonts/og (committed TTFs for next/og; see Next.js opengraph-image docs). */
export const OG_FONT_FILES = {
  figtreeBold: 'figtree-700.ttf',
  interLatin400: 'inter-latin-400-normal.ttf',
  interLatin600: 'inter-latin-600-normal.ttf',
  jetbrainsMonoLatin500: 'jetbrains-mono-latin-500-normal.ttf',
} as const;

export type OgFontKey = keyof typeof OG_FONT_FILES;

const inflight = new Map<string, Promise<ArrayBuffer>>();

function bufferToArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

/** Loads a bundled font once per filename (deduped across concurrent OG generation workers). */
export async function readOgFont(key: OgFontKey): Promise<ArrayBuffer> {
  const filename = OG_FONT_FILES[key];
  let pending = inflight.get(filename);
  if (!pending) {
    pending = readFile(join(OG_FONT_DIR, filename)).then(bufferToArrayBuffer);
    inflight.set(filename, pending);
  }
  return pending;
}
