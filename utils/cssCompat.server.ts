import 'server-only';

import { COMPAT_ENTRIES, type BrowserMin, type MergedEntry } from './cssCompat';

/**
 * Build the matrix on the server, joining each entry against caniuse-lite to
 * extract minimum supported browser versions.
 *
 * Returns plain JSON-safe objects suitable for crossing the server→client
 * boundary in a Next.js server component.
 *
 * Lives in a separate file with `import 'server-only'` so caniuse-lite never
 * enters the client bundle.
 */
export function loadCompatMatrix(): MergedEntry[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const caniuse: typeof import('caniuse-lite') = require('caniuse-lite');

  return COMPAT_ENTRIES.map(entry => {
    const merged: MergedEntry = { ...entry };

    if (entry.caniuseId && caniuse.features[entry.caniuseId]) {
      const unpacked = caniuse.feature(caniuse.features[entry.caniuseId]);
      merged.caniuseTitle = unpacked.title;
      merged.browserMins = extractBrowserMins(unpacked.stats);
    }

    return merged;
  });
}

function extractBrowserMins(stats: Record<string, Record<string, string>>): BrowserMin {
  const wanted: Array<keyof BrowserMin> = ['chrome', 'safari', 'firefox', 'edge'];
  const out: BrowserMin = {};
  for (const browser of wanted) {
    const browserStats = stats[browser];
    if (!browserStats) continue;
    const versions = Object.entries(browserStats)
      .filter(([version, support]) => support.startsWith('y') && !Number.isNaN(parseFloat(version)))
      .map(([version]) => parseFloat(version))
      .toSorted((a, b) => a - b);
    if (versions.length > 0) {
      out[browser] = String(versions[0]);
    }
  }
  return out;
}
