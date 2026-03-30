Note: CLAUDE.md is a symlink to this file. Edit AGENTS.md directly.

styled-components documentation website. Next.js, MDX, styled-components.

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

**Navigation:** Sidebar lives in `ClientLayout` (root layout) — persists across navigations via `SidebarFoldProvider` context. Search (DocSearch, module-level singleton) at top, then Documentation (expands to categories → sections with scroll-spy), Blog, Ecosystem, Releases, Fundraising. Navbar is just logo + social + theme toggle. Mobile: hamburger for sidebar, theme toggle far-right. `Link` component uses `next/link` for all internal routes (including `unstyled`).

**Homepage:** Two-column hero (copy left, live editor right) inside `LiveProvider`. Transparent background. Proof badges above CTA buttons. 10-year celebration effect (CSS bloom fireworks, respects reduced-motion). Company logos adapt via `brightness(0)` / `invert(1)`.

**Docs:** MDX in `sections/`, pages in `app/docs/`, nav config in `docs.json`. Heading IDs on the element itself with `scroll-margin-top`. Scroll-spy is a rAF-throttled scroll listener in the sidebar.

**Z-index:** 10 (celebration/code), 20 (content/hero), 30 (sidebar), 40 (navbar).

## Gotchas

- `docs.json` titles become URL hashes via `titleToDash`. Mismatches break sidebar links.
- Live editor `scope.ts` derives component IDs from tag/component names. Counters cause hydration mismatches.
- Logo is a CSS 3D Platonic solid (`components/LogoConcepts/PlatonicLogo.tsx`). Cycles through 5 solids with chain-matched face transitions, OKLCH spatial coloring, and hover face-highlight effect.
- Nav/sidebar widths use `sidebarWidth` from `utils/sizes.ts` in plain px — don't use `rem()` for these.
- Borders use opaque `color-mix(in oklch, text 8%, surface)`, not alpha.
- `utils/rem.ts` uses legacy 18px base. Prefer token spacing vars.
- Releases page uses `markdown-to-jsx`, not MDX.
