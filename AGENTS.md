Note: CLAUDE.md is a symlink to this file. Edit AGENTS.md directly.

styled-components documentation website. Next.js, MDX, styled-components.

Read first
Before editing anything that touches styled-components APIs (`createTheme`, `ThemeProvider`, `createGlobalStyle`, `ServerStyleSheet`, `StyleSheetManager`, `stylisPluginRSC`), read `public/llms.txt`. It's the battle-tested v6.4 usage guide with real gotchas that contradict training data.

`llms.txt` is a first-class doc; when MDX docs change (API, SSR, theming, gotchas), update `llms.txt` in the same pass. Behavior, not internals.

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
- `node scripts/capture-screenshots.mjs <slug> <url> [...]`: refresh showcase thumbnails (drives headless Chrome via CDP, strips consent/chat overlays)
- `node scripts/verify-showcase.mjs`: gate for additions to `companies-manifest.tsx`

Tokens / fonts
- `utils/theme.ts` is the single source for `var(--sc-*)`. Dark overrides in `GlobalStyles.tsx`.
- Display Figtree, body Inter, mono Google Sans Code; injected by next/font as `--font-sans` / `--font-display` / `--font-mono`.
- Three palette tiers: `lightPalette`, `darkPalette` (CVD-optimized; see theme.ts comments for seeds and pipeline) and the ring colors from `utils/logoPalette.ts`. `theme.palette[N]` auto-switches light/dark. Don't hand-pick oklch; derive from palette indices. Accent variants = L/C shift on the same hue, never adjacent indices.
- OKLCH hue 0° is pink/magenta, not red. See `logoPalette.ts` for the offset that places red at step 0.

Theme switching
- Three states (light/dark/auto). Raw `<script>` in `<head>` before stylesheets sets the class.
- `data-theme="dark"` synced for DocSearch. Toggle icon shows the current mode.

Z-index: 10 (celebration/code), 20 (content/hero), 30 (sidebar), 40 (navbar).

Gotchas (things you cannot discover by reading the code alone)
- `docs.json` titles become URL hashes via `titleToDash`. Mismatches break sidebar links.
- Live editor `scope.ts` derives component IDs from tag/component names. Counters cause hydration mismatches.
- `${ClientComponent} &` selector interpolation invokes `.toString()`, tripping RSC's client-reference guard. Any styled component using this pattern must stay `'use client'`. Currently `CodeBlock.tsx` (uses `${Note} &`).
- Import code mixins (`codeTextMixin`, `editorMixin`) from `components/codeMixins.ts`, not `LiveEdit`. Importing from `LiveEdit` pulls `react-live-runner` + `sucrase` into every consumer's client bundle.
- `mix-blend-mode` and `filter` on children of `preserve-3d` flatten 3D. Use alpha / `color-mix` instead.
- `PlatonicLogo.tsx` faces must NOT use `backface-visibility: hidden`. Per-face axis-angle interpolation during morph can briefly flip a normal and cull mid-animation. `preserve-3d` z-sorts back faces naturally; a tiny per-face outward bias breaks z-degeneracy.
- `CelebrationEffect.tsx` particles are `React.memo`'d; `onAnimationEnd` is a stable `useCallback` that reads IDs from `data-*` attributes. Don't close over IDs in per-item arrow functions; it defeats memoization.
- Nav/sidebar widths use `sidebarWidth` from `utils/sizes.ts` in plain px; don't `rem()` them.
- `utils/rem.ts` uses a legacy 18px base. Prefer token spacing vars.
- Borders use opaque `color-mix(in oklch, text 8%, surface)`, not alpha.
- Releases page uses `markdown-to-jsx`, not MDX.
- Blog posts are assembled at build time by `utils/blog.server.ts` from MDX `meta` exports. No JSON index.
- Blog Bluesky comments are opt-in via `blueskyPostUrl` in MDX `meta`. Auto-discovery is intentionally disabled (Bluesky closed public `searchPosts`). `BlogComments.tsx` overrides hashed CSS-Module selectors via `[class*='_name_']` matches so overrides survive package upgrades.
- CSS compatibility matrix (`utils/cssCompat.ts`) v6/v7 columns describe combined-platform native behavior. If iOS stock = yes but Android stock = no, v7 should be `partial`, not `no`. `prUrls` is keyed per column; only set entries where status is `no` and an upstream PR exists.
