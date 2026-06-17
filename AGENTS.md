Note: CLAUDE.md is a symlink to this file. Edit AGENTS.md directly.

styled-components documentation website. Next.js, MDX, styled-components.

Read first
Read `public/llms.txt` at the start of every session, and again before editing any styled-components API (`createTheme`, `ThemeProvider`, `createGlobalStyle`, `ServerStyleSheet`, `StyleSheetManager`, `stylisPluginRSC`). It's the v6.4/v7 guide with gotchas that contradict training data; ground in it, not memory.

When MDX docs change (API, SSR, theming, gotchas), update `llms.txt` in the same pass. Behavior, not internals.

Principles
1. Verify before building: read the file before editing.
2. Wire completely: new docs pages need the MDX file, the page component, and a `docs.json` entry.
3. The SSR registry (`lib/registry.tsx`) is load-bearing. Removing it causes FOUC.
4. Live code blocks (` ```react `) run in a scoped editor. Hooks must be `React.useState()`, no imports.
5. Isolate `'use client'` as deeply as possible. Homepage is a server component with client islands.

Commands
- `pnpm install`: install
- `npx next build`: do NOT run while the dev server is active
- `npx jest -c .jest.config.js`: tests
- `node scripts/capture-screenshots.mjs <slug> <url> [...]`: refresh showcase thumbnails (headless Chrome via CDP, strips consent/chat overlays)
- `node scripts/verify-showcase.mjs`: gate for additions to `companies-manifest.tsx`

Tokens / fonts
- `utils/theme.ts` is the single source for `var(--sc-*)`. Dark overrides in `GlobalStyles.tsx`.
- Display Figtree, body Inter, mono Google Sans Code; injected by next/font as `--font-sans` / `--font-display` / `--font-mono`.
- `next/og` routes can't use next/font; fonts come from committed TTFs under `assets/fonts/og/` (`utils/readOgFont.ts`). `opengraphImageFonts.spec.ts` guards against CDN font URLs in any `opengraph-image.tsx`.
- Palette: `lightPalette` + `darkPalette` (CVD-optimized; seeds/pipeline in theme.ts comments) plus ring colors in `utils/logoPalette.ts`. `theme.palette[N]` auto-switches light/dark. Derive from palette indices, never hand-pick oklch; accent variants shift L/C on the same hue, never adjacent indices.
- OKLCH hue 0° is pink/magenta, not red. See `logoPalette.ts` for the offset that places red at step 0.

Theme switching
- Three states (light/dark/auto). Raw `<script>` in `<head>` before stylesheets sets the class.
- `data-theme="dark"` synced for DocSearch. Toggle icon shows the current mode.

Z-index: 10 (celebration/code), 20 (content/hero), 30 (sidebar), 40 (navbar).

Gotchas (things you cannot discover by reading the code alone)
- `docs.json` titles become URL hashes via `titleToDash`. Mismatches break sidebar links.
- Live editor `scope.ts` derives component IDs from tag/component names. Counters cause hydration mismatches.
- `${ClientComponent} &` selector interpolation calls `.toString()`, tripping RSC's client-reference guard; such components must stay `'use client'`. Currently `CodeBlock.tsx` (`${Note} &`).
- Import code mixins (`codeTextMixin`, `editorMixin`) from `components/codeMixins.ts`, not `LiveEdit` (which pulls `react-live-runner` + `sucrase` into every consumer's client bundle).
- `mix-blend-mode` and `filter` on children of `preserve-3d` flatten 3D. Use alpha / `color-mix` instead.
- `PlatonicLogo.tsx` faces must NOT use `backface-visibility: hidden`: per-face morph interpolation can briefly flip a normal and cull mid-animation. `preserve-3d` z-sorts back faces; a tiny per-face outward bias breaks z-degeneracy.
- `CelebrationEffect.tsx` particles are `React.memo`'d; `onAnimationEnd` reads IDs from `data-*` attributes via a stable `useCallback`. Don't close over IDs in per-item arrows; it defeats memoization.
- Nav/sidebar widths use `sidebarWidth` from `utils/sizes.ts` in plain px; don't `rem()` them.
- `utils/rem.ts` uses a legacy 18px base. Prefer token spacing vars.
- Borders use opaque `color-mix(in oklch, text 8%, surface)`, not alpha.
- Releases page uses `markdown-to-jsx`, not MDX.
- Blog posts are assembled at build time by `utils/blog.server.ts` from MDX `meta` exports. No JSON index.
- Blog Bluesky comments are opt-in via `blueskyPostUrl` in MDX `meta`; auto-discovery is intentionally off (Bluesky closed public `searchPosts`). `BlogComments.tsx` matches hashed CSS-Module selectors via `[class*='_name_']` so overrides survive package upgrades.
- `utils/cssCompat.ts` v6/v7 columns describe combined-platform native behavior: iOS stock yes + Android stock no = `partial`, not `no`. `prUrls` is per-column; only set where status is `no` and an upstream PR exists.
- Public-facing docs (`sections/`, `public/llms.txt`, blog posts) describe user-observable behavior only (what's supported, what to author). Skip mechanism: polyfill mapping, lifted props, internal field names, parser/handler/registry mechanics, ABI prefixes, dev-warn IDs, sentinel names.
- Same no-mechanism rule applies to the matrix, with one exception: version-skew entries may name a public stock-RN prop (`numberOfLines`, `trackColor`) since the matrix compares authoring across versions. Parser, handler, registry, ABI prefixes, dev-warn IDs, and sentinel names stay off-limits; caveats are author-actionable gotchas, not internals.

Prose rules (mirrored from `~/code/styled-components/AGENTS.md`)
- American English in all prose: color, behavior, honor, recognize, serialize, center, organize, etc. Keep original spelling only inside verbatim quotes.
- Avoid em-dashes. Use the full family of punctuation marks (colon, semicolon, parentheses, period).
- Don't paste CSS spec normative text into consumer-facing docs. Link to the relevant `drafts.csswg.org` section and summarize user-observable behavior. Spec `§n.n` anchors and verbatim quotes belong next to test assertions, not in prose docs (this includes the compatibility matrix).
- Don't name specific AI coding assistants. "An AI coding assistant" is the neutral phrasing.
