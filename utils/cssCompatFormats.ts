import { CATEGORY_LABELS, SUPPORT_LABELS, type MergedEntry, type Support } from './cssCompat';

const TITLE = 'React Native CanIUse';
const DESCRIPTION =
  'CSS feature compatibility across styled-components v6, styled-components v7, stock React Native iOS, and stock React Native Android.';
const SOURCE = 'https://styled-components.com/docs/compatibility';

type CompatColumn = {
  key: 'nativeV6' | 'nativeV7' | 'iosStock' | 'androidStock';
  label: string;
};

const COLUMNS: CompatColumn[] = [
  { key: 'nativeV6', label: 'styled-components v6 native' },
  { key: 'nativeV7', label: 'styled-components v7 native' },
  { key: 'iosStock', label: 'stock React Native iOS' },
  { key: 'androidStock', label: 'stock React Native Android' },
];

export function buildCompatJson(entries: MergedEntry[]) {
  return {
    title: TITLE,
    description: DESCRIPTION,
    source: SOURCE,
    columns: COLUMNS,
    entries: sortEntries(entries).map(entry => ({
      id: entry.id,
      title: entry.title,
      category: entry.category,
      categoryLabel: CATEGORY_LABELS[entry.category],
      caniuseId: entry.caniuseId ?? null,
      caniuseTitle: entry.caniuseTitle ?? null,
      browserMins: entry.browserMins ?? null,
      support: {
        nativeV6: entry.nativeV6,
        nativeV7: entry.nativeV7,
        iosStock: stockSupport(entry.iosStock),
        androidStock: stockSupport(entry.androidStock),
      },
      supportLabels: {
        nativeV6: SUPPORT_LABELS[entry.nativeV6],
        nativeV7: SUPPORT_LABELS[entry.nativeV7],
        iosStock: SUPPORT_LABELS[stockSupport(entry.iosStock)],
        androidStock: SUPPORT_LABELS[stockSupport(entry.androidStock)],
      },
      summary: entry.summary,
      caveats: entry.caveats ?? [],
      prUrls: entry.prUrls ?? {},
    })),
  };
}

export function buildCompatMarkdown(entries: MergedEntry[]): string {
  const lines = [
    `# ${TITLE}`,
    '',
    DESCRIPTION,
    '',
    `Source: ${SOURCE}`,
    '',
    '## Summary',
    '',
    '| Feature | Category | sc-v6 | sc-v7 | iOS stock | Android stock | Upstream PRs |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...sortEntries(entries).map(entry =>
      [
        markdownLink(entry.title, `${SOURCE}#${entry.id}`),
        CATEGORY_LABELS[entry.category],
        status(entry.nativeV6),
        status(entry.nativeV7),
        status(stockSupport(entry.iosStock)),
        status(stockSupport(entry.androidStock)),
        formatPrLinks(entry.prUrls),
      ]
        .map(tableCell)
        .join(' | ')
        .replace(/^/, '| ')
        .replace(/$/, ' |')
    ),
    '',
    '## Details',
    '',
    ...sortEntries(entries).flatMap(entry => formatEntryDetails(entry)),
  ];

  return `${lines.join('\n')}\n`;
}

function sortEntries(entries: MergedEntry[]): MergedEntry[] {
  return entries.toSorted((a, b) => a.title.localeCompare(b.title));
}

function stockSupport(support: Support | undefined): Support {
  return support ?? 'no';
}

function status(support: Support): string {
  return SUPPORT_LABELS[support];
}

function formatPrLinks(prUrls: MergedEntry['prUrls']): string {
  if (!prUrls) return '';

  return Object.entries(prUrls)
    .map(([key, url]) => markdownLink(key, url))
    .join(', ');
}

function formatEntryDetails(entry: MergedEntry): string[] {
  const details = [
    `### ${entry.title}`,
    '',
    `- ID: \`${entry.id}\``,
    `- Category: ${CATEGORY_LABELS[entry.category]}`,
    `- styled-components v6 native: ${status(entry.nativeV6)}`,
    `- styled-components v7 native: ${status(entry.nativeV7)}`,
    `- stock React Native iOS: ${status(stockSupport(entry.iosStock))}`,
    `- stock React Native Android: ${status(stockSupport(entry.androidStock))}`,
  ];

  if (entry.caniuseId) details.push(`- Can I Use ID: \`${entry.caniuseId}\``);
  if (entry.caniuseTitle) details.push(`- Can I Use title: ${entry.caniuseTitle}`);
  if (entry.browserMins && Object.keys(entry.browserMins).length > 0) {
    details.push(
      `- Browser minimums: ${Object.entries(entry.browserMins)
        .map(([browser, version]) => `${browser} ${version}`)
        .join(', ')}`
    );
  }
  if (entry.prUrls && Object.keys(entry.prUrls).length > 0) {
    details.push(`- Upstream PRs: ${formatPrLinks(entry.prUrls)}`);
  }

  details.push('', entry.summary, '');

  if (entry.caveats && entry.caveats.length > 0) {
    details.push('Caveats:', '', ...entry.caveats.map(caveat => `- ${caveat}`), '');
  }

  return details;
}

function markdownLink(label: string, href: string): string {
  return `[${label.replaceAll(']', '\\]')}](${href})`;
}

function tableCell(value: string): string {
  return value.replaceAll('|', '\\|').replaceAll('\n', '<br>');
}
