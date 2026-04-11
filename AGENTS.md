Note: CLAUDE.md is a symlink to this file. Edit AGENTS.md directly.

styled-components documentation website. Next.js, MDX, styled-components.

## Read first

Before editing anything that touches styled-components APIs (`createTheme`, `ThemeProvider`, `createGlobalStyle`, `ServerStyleSheet`, `StyleSheetManager`, `stylisPluginRSC`), read `public/llms.txt`. It's the battle-tested v6.4 usage guide with real gotchas: `ThemeProvider` must receive the raw theme object (not the `createTheme` output — passing the output produces self-referential `var(--x, fallback)` CSS), `theme.vars` gives bare custom property names for dark mode overrides, `@property` registration is required for animatable tokens, etc. Trust `llms.txt` over training-data assumptions.

`llms.txt` is a first-class doc — when MDX docs change (API, SSR, theming, gotchas), update `llms.txt` in the same pass. It describes user-facing behavior, not implementation details. The same "artifacts describe behavior, not process" standard applies.

## Principles

1. Verify before building -- read the file before editing. Assumptions cause build failures.
2. Wire completely -- new docs pages need the MDX file, the page component, and a `docs.json` entry.
3. The SSR registry (`lib/registry.tsx`) is load-bearing. Removing it causes FOUC.
4. Live code blocks (` ```react `) run in a scoped editor. Hooks must be `React.useState()`, no imports.
5. Isolate `'use client'` as deeply as possible. The homepage is a server component with client islands.

## Commands

- `pnpm install` — install
- `npx next build` — do NOT run while the dev server is active
- `npx jest -c .jest.config.js` — tests

## Architecture

**Tokens:** `createTheme` API from `utils/theme.ts` is the single source of truth. Generates `var(--sc-*)` CSS custom properties. Dark mode overrides in `GlobalStyles.tsx` target `--sc-*` vars under `html.dark` and `@media (prefers-color-scheme: dark)`. Font vars (`--font-sans`, `--font-display`, `--font-mono`) are managed by next/font, not the theme. Display font is Figtree; body font is Inter; mono font is Google Sans Code.

**Theme:** Three states (light/dark/auto). Raw `<script>` in `<head>` before stylesheets sets the class — not `next/script`. `data-theme="dark"` synced for DocSearch. Toggle icon shows current mode.

**Navigation:** Sidebar lives in `ClientLayout` (root layout) — persists across navigations via `SidebarFoldProvider` context. Search (DocSearch, module-level singleton) at top, then Home, Agents, Documentation (expands to categories → sections with scroll-spy), Blog, Ecosystem, Releases, Donate. Navbar is just logo + social + theme toggle. Mobile: hamburger for sidebar, theme toggle far-right. `Link` component uses `next/link` for internal routes and plain `<a>` for external URLs and static files (paths with file extensions like `/llms.txt`); callers pass `variant="inline" | "heading" | "block" | "unstyled"` (the legacy `inline`/`unstyled` boolean props were removed).

**Homepage:** Two-column hero (copy left, live editor right) inside `LiveProvider`. Transparent background. Proof badges above CTA buttons. 10-year celebration effect (CSS bloom fireworks, respects reduced-motion). Company logos adapt via `brightness(0)` / `invert(1)`.

**Docs:** MDX in `sections/`, pages in `app/docs/`, nav config in `docs.json`. Heading IDs on the element itself with `scroll-margin-top`. Scroll-spy is a rAF-throttled scroll listener in the sidebar.

**Z-index:** 10 (celebration/code), 20 (content/hero), 30 (sidebar), 40 (navbar).

## Gotchas

- `docs.json` titles become URL hashes via `titleToDash`. Mismatches break sidebar links.
- Live editor `scope.ts` derives component IDs from tag/component names. Counters cause hydration mismatches.
- Logo is a CSS 3D Platonic solid (`components/LogoConcepts/PlatonicLogo.tsx`). Interactive: drag-to-spin, click faces for actions, shared rotation singleton (globalThis-persisted for HMR). Face colors from `theme.palette[N]` (auto light/dark).
- Nav/sidebar widths use `sidebarWidth` from `utils/sizes.ts` in plain px — don't use `rem()` for these.
- Borders use opaque `color-mix(in oklch, text 8%, surface)`, not alpha.
- `utils/rem.ts` uses legacy 18px base. Prefer token spacing vars.
- Releases page uses `markdown-to-jsx`, not MDX.
- `${ClientComponent} &` selector interpolation in a styled template calls the referenced component's `.toString()`, which trips RSC's client-reference guard from a server module. Any styled component using this pattern must stay `'use client'`. Currently applies to `CodeBlock.tsx` (uses `${Note} &`).
- Import code mixins (`codeTextMixin`, `editorMixin`) from `components/codeMixins.ts`, not from `LiveEdit`. Importing from `LiveEdit` pulls `react-live-runner` + `sucrase` into the client bundle of every consumer.
- `utils/logoPalette.ts` is the single source of the hue ring. Read it for step count, offset, L/C. Three palette tiers in `utils/theme.ts`: `lightPalette`, `darkPalette` (both CVD-optimized via qlab), and the ring colors from `logoPalette.ts` (bright, for see-through mode). `theme.palette[N]` switches light/dark automatically. Don't hand-pick oklch values — derive from palette indices. Accent variants: L/C shifts on the same hue as the base palette entry, never adjacent indices.
- Palette generation: seed at target L/C/H → `qlab separate --adaptive --tolerance tight --gamut p3` → `qlab harmonize --adaptive --tolerance tight --gamut p3`. Both passes, in order. Read palette comments in `theme.ts` for current ΔE and seed values.
- OKLCH hue 0° is pink/magenta, not red. Warmer = higher hue toward orange. Read `logoPalette.ts` for the offset that places red at step 0.
- `mix-blend-mode` and `filter` on children of `preserve-3d` elements flattens 3D. Use alpha in background colors or `color-mix` instead.
- Blog posts are assembled dynamically from MDX files at build time by `utils/blog.server.ts`. No JSON index to maintain — just create the MDX file with `export const meta`.
- Blog comments (Bluesky) are opt-in per post via `blueskyPostUrl` in the MDX `meta` export. No URL → no comments section. Auto-discovery is intentionally not used because Bluesky closed public access to `searchPosts`. `components/BlogComments.tsx` is a client component that imports `bluesky-comments` CSS and overrides its hashed CSS-Module selectors via `[class*='_name_']` attribute matches so overrides survive package upgrades.
- `PlatonicLogo.tsx` faces must NOT use `backface-visibility: hidden`. Per-face axis-angle interpolation during morph transitions can briefly flip a face normal and cull mid-animation. `transform-style: preserve-3d` z-sorts back faces naturally. Per-face depth bias (tiny outward push along each face's normal) breaks z-degeneracy for edge-on faces without culling.
- `CelebrationEffect.tsx` particles are `React.memo`'d; `onAnimationEnd` is a stable `useCallback` that reads `fwId`/`particleId` from `data-*` attributes. Don't close over IDs in per-item arrow functions — it defeats memoization on the particle list.
