import { buildCompatJson, buildCompatMarkdown } from '../../utils/cssCompatFormats';
import type { MergedEntry } from '../../utils/cssCompat';

const entries: MergedEntry[] = [
  {
    id: 'z-feature',
    title: 'Z feature',
    category: 'other',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'yes',
    summary: 'Z summary',
    caveats: ['Z caveat'],
    prUrls: { v7: 'https://example.com/pr/1' },
  },
  {
    id: 'a-feature',
    title: 'A feature',
    category: 'selectors',
    caniuseId: 'css-a',
    caniuseTitle: 'CSS A',
    browserMins: { chrome: '100' },
    nativeV6: 'partial',
    nativeV7: 'yes',
    summary: 'A summary with | pipe',
  },
];

describe('css compatibility formats', () => {
  it('builds a stable JSON payload with default stock support', () => {
    expect(buildCompatJson(entries)).toEqual({
      title: 'React Native CanIUse',
      description:
        'CSS feature compatibility across styled-components v6, styled-components v7, stock React Native iOS, and stock React Native Android.',
      source: 'https://styled-components.com/docs/compatibility',
      columns: [
        { key: 'nativeV6', label: 'styled-components v6 native' },
        { key: 'nativeV7', label: 'styled-components v7 native' },
        { key: 'iosStock', label: 'stock React Native iOS' },
        { key: 'androidStock', label: 'stock React Native Android' },
      ],
      entries: [
        {
          id: 'a-feature',
          title: 'A feature',
          category: 'selectors',
          categoryLabel: 'Selectors',
          caniuseId: 'css-a',
          caniuseTitle: 'CSS A',
          browserMins: { chrome: '100' },
          support: {
            nativeV6: 'partial',
            nativeV7: 'yes',
            iosStock: 'no',
            androidStock: 'no',
          },
          supportLabels: {
            nativeV6: 'Partial',
            nativeV7: 'Supported',
            iosStock: 'Not supported',
            androidStock: 'Not supported',
          },
          summary: 'A summary with | pipe',
          caveats: [],
          prUrls: {},
        },
        {
          id: 'z-feature',
          title: 'Z feature',
          category: 'other',
          categoryLabel: 'Other',
          caniuseId: null,
          caniuseTitle: null,
          browserMins: null,
          support: {
            nativeV6: 'no',
            nativeV7: 'partial',
            iosStock: 'no',
            androidStock: 'yes',
          },
          supportLabels: {
            nativeV6: 'Not supported',
            nativeV7: 'Partial',
            iosStock: 'Not supported',
            androidStock: 'Supported',
          },
          summary: 'Z summary',
          caveats: ['Z caveat'],
          prUrls: { v7: 'https://example.com/pr/1' },
        },
      ],
    });
  });

  it('builds markdown with a table and details', () => {
    expect(buildCompatMarkdown(entries)).toMatchInlineSnapshot(`
"# React Native CanIUse

CSS feature compatibility across styled-components v6, styled-components v7, stock React Native iOS, and stock React Native Android.

Source: https://styled-components.com/docs/compatibility

## Summary

| Feature | Category | sc-v6 | sc-v7 | iOS stock | Android stock | Upstream PRs |
| --- | --- | --- | --- | --- | --- | --- |
| [A feature](https://styled-components.com/docs/compatibility#a-feature) | Selectors | Partial | Supported | Not supported | Not supported |  |
| [Z feature](https://styled-components.com/docs/compatibility#z-feature) | Other | Not supported | Partial | Not supported | Supported | [v7](https://example.com/pr/1) |

## Details

### A feature

- ID: \`a-feature\`
- Category: Selectors
- styled-components v6 native: Partial
- styled-components v7 native: Supported
- stock React Native iOS: Not supported
- stock React Native Android: Not supported
- Can I Use ID: \`css-a\`
- Can I Use title: CSS A
- Browser minimums: chrome 100

A summary with | pipe

### Z feature

- ID: \`z-feature\`
- Category: Other
- styled-components v6 native: Not supported
- styled-components v7 native: Partial
- stock React Native iOS: Not supported
- stock React Native Android: Supported
- Upstream PRs: [v7](https://example.com/pr/1)

Z summary

Caveats:

- Z caveat

"
`);
  });
});
