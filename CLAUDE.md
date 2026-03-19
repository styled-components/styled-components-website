# styled-components Documentation Website

## Build & Test
- `yarn` to install (Yarn PnP, no package-lock.json)
- `npx next build` to verify — all pages are statically generated
- `npx jest -c .jest.config.js` to run tests
- `npx jest -c .jest.config.js --updateSnapshot` after font/style changes
- Pre-commit hooks run jest on related files + prettier via lint-staged

## Documentation Structure
- MDX content lives in `sections/{category}/{topic}.mdx`
- Each docs page is wired in 3 places: the MDX file, `app/docs/{category}/page.tsx` (import + render), and `app/docs.json` (nav sidebar)
- Live code examples use ```react blocks (not ```tsx). They have `React`, `styled`, `css`, `keyframes`, `ThemeProvider`, and `render()` in scope. Use `React.useRef()` not `useRef()`.
- The `components` import path alias `@/` maps to project root

## Key Architecture
- `lib/registry.tsx` — SSR style registry wrapping root layout. Still needed despite v6.3.0+ RSC support because most components are `'use client'`
- `utils/fonts.ts` — font family constants using CSS variables `--font-body` and `--font-mono` set via next/font in root layout
- `components/Anchor.tsx` — renders section headings with anchor links, used across all doc pages
- Releases page (`app/releases/page.tsx`) fetches from GitHub API and renders with `markdown-to-jsx`

## Gotchas
- Removing the SSR registry causes FOUC — the site has heavy `'use client'` usage
- `app/docs.json` section titles must exactly match the `##` heading in the MDX file (used for anchor link generation)
- Snapshot tests include rendered CSS — any font, style constant, or styled-components version change requires snapshot updates
