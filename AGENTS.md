Note: CLAUDE.md is a symlink to this file. Edit AGENTS.md directly.

styled-components documentation website. Next.js 16.1.7, MDX, styled-components 6.4.0-prerelease.8.

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

**Tokens:** OKLCH CSS custom properties in `GlobalStyles.tsx`. Light/dark values are `css` partials (`lightColors`, `darkColors`) composed under `:root`, `html.light`, `html.dark`, and the dark media query. Syntax highlighting has 9 adaptive `--color-code-*` tokens. JS refs in `utils/tokens.ts`.

**Theme:** Three states (light/dark/auto). Raw `<script>` in `<head>` before stylesheets sets the class — not `next/script`. `data-theme="dark"` synced for DocSearch. Toggle icon shows current mode.

**Navigation:** Sidebar lives in `ClientLayout` (root layout) — persists across navigations via `SidebarFoldProvider` context. Search (DocSearch, module-level singleton) at top, then Documentation (expands to categories → sections with scroll-spy), Blog, Ecosystem, Releases, Fundraising. Navbar is just logo + social + theme toggle. Mobile: hamburger for sidebar, theme toggle far-right. `Link` component uses `next/link` for all internal routes (including `unstyled`).

**Homepage:** Two-column hero (copy left, live editor right) inside `LiveProvider`. Transparent background. Proof badges above CTA buttons. 10-year celebration effect (CSS bloom fireworks, respects reduced-motion). Company logos adapt via `brightness(0)` / `invert(1)`.

**Docs:** MDX in `sections/`, pages in `app/docs/`, nav config in `docs.json`. Heading IDs on the element itself with `scroll-margin-top`. Scroll-spy is a rAF-throttled scroll listener in the sidebar.

**Z-index:** 10 (celebration/code), 20 (content/hero), 30 (sidebar), 40 (navbar).

## Gotchas

- `docs.json` titles become URL hashes via `titleToDash`. Mismatches break sidebar links.
- Live editor `scope.ts` derives component IDs from tag/component names. Counters cause hydration mismatches.
- SC 6.4.0-prerelease.8 may cause HMR staleness — the rearchitected `createGlobalStyle` is suspected.
- Logo is HTML (💅 emoji + `color.text` text). Don't use PNG or CSS `filter: invert()`.
- Borders use opaque `color-mix(in oklch, text 8%, surface)`, not alpha.
- `utils/rem.ts` uses legacy 18px base. Prefer token spacing vars.
- Releases page uses `markdown-to-jsx`, not MDX.
