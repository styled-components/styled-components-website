Note: AGENTS.md is a symlink to this file.

styled-components documentation website. Next.js 16 App Router, MDX content, styled-components v6.

## Principles

1. Verify before building -- Read the file before editing it. Read the nav config before adding pages. Read the live code scope before using hooks. Assumptions cause build failures.

2. Wire completely -- Adding a docs page requires three changes in one commit: the MDX file, the page component import/render, and the `app/docs.json` nav entry. Missing any one breaks navigation or leaves orphaned content.

3. Snapshot tests are fragile by design -- They capture rendered CSS including generated class hashes. Any change to styled-components version, font constants, or style values will break snapshots. Run `npx jest -c .jest.config.js --updateSnapshot` and commit the result.

4. The SSR registry is load-bearing -- `lib/registry.tsx` wraps the root layout. It looks like a v6.3.0+ RSC artifact that can be removed, but most components use `'use client'`. Removing it causes FOUC. Do not remove without migrating components to server components first.

5. Live code blocks are not regular code blocks -- Examples using ` ```react ` run in the site's live editor with `React`, `styled`, `css`, `keyframes`, `ThemeProvider`, `createGlobalStyle`, and `render()` in scope. Hooks must be qualified: `React.useRef()`, `React.useState()`. Imports are not supported.

## Commands

- `yarn` -- install (Yarn PnP, no package-lock.json)
- `npx next build` -- build and verify all pages (static generation)
- `npx jest -c .jest.config.js` -- run tests
- `npx jest -c .jest.config.js --updateSnapshot` -- update snapshots after style changes
- Pre-commit hooks run jest on related files + prettier via lint-staged

## Documentation Structure

- MDX content: `sections/{category}/{topic}.mdx`
- Page components: `app/docs/{category}/page.tsx` (import MDX, render in order)
- Nav config: `app/docs.json` (section titles must exactly match `##` headings in MDX for anchor generation)
- `##` = top-level section heading, `###` = subsection
- Path alias `@/` maps to project root

## Key Files

- `app/layout.tsx` -- root layout with next/font (Karla + JetBrains Mono via CSS vars `--font-body`, `--font-mono`)
- `lib/registry.tsx` -- SSR style collection for client components (ServerStyleSheet + useServerInsertedHTML)
- `utils/fonts.ts` -- font-family constants referencing CSS variables
- `components/Anchor.tsx` -- section heading with anchor link, used by all doc pages
- `components/ReleaseAnchor.tsx` -- release page heading with date pseudo-element
- `app/releases/page.tsx` -- fetches GitHub API releases, renders with markdown-to-jsx
- `utils/scope.ts` -- defines the scope (available globals) for live code editor blocks

## Gotchas

- `app/docs.json` titles are converted to URL hashes via `titleToDash`. Mismatched titles = broken sidebar links.
- The releases page uses `markdown-to-jsx` (not MDX). Compatibility issues with React 19 dev mode are tracked upstream.
- `next.config.mjs` has `compiler: { styledComponents: true }` for SWC transform. This is separate from RSC support.
- Font changes require updating `utils/fonts.ts`, `app/layout.tsx` (next/font config), and all test snapshots.
