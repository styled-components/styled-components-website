'use client';

import { createGlobalStyle, css } from 'styled-components';
import { font } from '../utils/tokens';

// ---------------------------------------------------------------------------
// Color mode partials — single source of truth, composed under each selector
// ---------------------------------------------------------------------------

const lightColors = css`
  --color-bg: oklch(0.99 0 0);
  --color-surface: oklch(0.97 0 0);
  --color-surface-raised: oklch(0.95 0 0);
  --color-text: oklch(0.2 0.01 270);
  --color-text-secondary: oklch(0.45 0 0);
  --color-text-muted: oklch(0.58 0 0);
  --color-accent-subtle: oklch(0.5 0.16 290 / 0.08);
  --color-border: oklch(0 0 0 / 0.1);
  --color-border-strong: oklch(0 0 0 / 0.2);
  --color-shadow: oklch(0 0 0 / 0.12);
  --color-selection: oklch(0.8 0.12 85 / 0.3);
  --color-link-underline: oklch(0 0 0 / 0.15);
  --color-link-underline-hover: oklch(0 0 0 / 0.4);
  --color-blog-accent-subtle: oklch(0.72 0.1 60 / 0.08);
  --color-blog-accent-muted: oklch(0.72 0.1 60 / 0.2);
  --color-nav-bg: oklch(1 0 0 / 0.85);
  --color-nav-text: oklch(0.2 0.01 270);
  --color-code-bg: oklch(0.97 0 0);
  --color-code-text: oklch(0.2 0.01 270);
  --color-code-comment: oklch(0.55 0.02 290);
  --color-code-punctuation: oklch(0.5 0.04 290);
  --color-code-constant: oklch(0.5 0.04 290);
  --color-code-number: oklch(0.52 0.18 310);
  --color-code-keyword: oklch(0.45 0.14 240);
  --color-code-tag: oklch(0.42 0.14 160);
  --color-code-function: oklch(0.5 0.2 350);
  --color-code-string: oklch(0.45 0.12 200);
  --color-code-variable: oklch(0.2 0.01 270);
`;

const darkColors = css`
  --color-bg: oklch(0.13 0.01 270);
  --color-surface: oklch(0.18 0.01 270);
  --color-surface-raised: oklch(0.22 0.01 270);
  --color-text: oklch(0.93 0 0);
  --color-text-secondary: oklch(0.75 0 0);
  --color-text-muted: oklch(0.5 0 0);
  --color-accent-subtle: oklch(0.62 0.16 290 / 0.12);
  --color-border: oklch(1 0 0 / 0.1);
  --color-border-strong: oklch(1 0 0 / 0.15);
  --color-shadow: oklch(0 0 0 / 0.4);
  --color-selection: oklch(0.6 0.12 290 / 0.3);
  --color-link-underline: oklch(1 0 0 / 0.2);
  --color-link-underline-hover: oklch(1 0 0 / 0.45);
  --color-blog-accent-subtle: oklch(0.72 0.1 60 / 0.12);
  --color-blog-accent-muted: oklch(0.72 0.1 60 / 0.25);
  --color-nav-bg: oklch(0.1 0.01 270 / 0.85);
  --color-nav-text: oklch(0.95 0 0);
  --color-code-bg: oklch(0.18 0.02 290);
  --color-code-text: oklch(0.95 0 0);
  --color-code-comment: oklch(0.62 0.03 290);
  --color-code-punctuation: oklch(0.55 0.08 290);
  --color-code-constant: oklch(0.55 0.08 290);
  --color-code-number: oklch(0.72 0.12 310);
  --color-code-keyword: oklch(0.72 0.12 200);
  --color-code-tag: oklch(0.78 0.1 160);
  --color-code-function: oklch(0.72 0.16 350);
  --color-code-string: oklch(0.78 0.08 200);
  --color-code-variable: oklch(0.95 0 0);
`;

// ---------------------------------------------------------------------------

const GlobalStyles = createGlobalStyle`
  /* ===================================================================
   * @property — register tokens as typed so they're animatable.
   * =================================================================== */
  @property --color-bg {
    syntax: '<color>';
    inherits: true;
    initial-value: oklch(0.99 0 0);
  }
  @property --color-text {
    syntax: '<color>';
    inherits: true;
    initial-value: oklch(0.20 0.01 270);
  }
  @property --color-accent {
    syntax: '<color>';
    inherits: true;
    initial-value: oklch(0.50 0.16 290);
  }
  @property --color-surface {
    syntax: '<color>';
    inherits: true;
    initial-value: oklch(0.97 0 0);
  }
  @property --color-surface-raised {
    syntax: '<color>';
    inherits: true;
    initial-value: oklch(0.95 0 0);
  }
  @property --border-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  /* ===================================================================
   * Reset (sanitize.css-style)
   * =================================================================== */
  *,::after,::before{background-repeat:no-repeat;box-sizing:inherit}::after,::before{text-decoration:inherit;vertical-align:inherit}html{box-sizing:border-box;cursor:default;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}article,aside,footer,header,nav,section{display:block}body{margin:0}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}nav ol,nav ul{list-style:none}pre{font-family:monospace,monospace;font-size:1em}a{text-decoration:none;color:inherit;background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,canvas,iframe,img,svg,video{vertical-align:middle}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}table{border-collapse:collapse}button,input,optgroup,select,textarea{margin:0}button,input,select,textarea{background-color:transparent;color:inherit;font-size:inherit;line-height:inherit}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button;cursor:pointer}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto;resize:vertical}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[tabindex],a,area,button,input,label,select,summary,textarea{-ms-touch-action:manipulation;touch-action:manipulation}[hidden]{display:none}[aria-busy=true]{cursor:progress}[aria-controls]{cursor:pointer}[aria-hidden=false][hidden]:not(:focus){clip:rect(0,0,0,0);display:inherit;position:absolute}[aria-disabled]{cursor:default}

  /* ===================================================================
   * Color mode partials — single source of truth for light/dark tokens.
   * Composed below under :root, html.light, html.dark, and @media.
   * =================================================================== */

  /* ===================================================================
   * Tokens — defaults (:root) include light colors + static tokens
   * =================================================================== */
  :root {
    ${lightColors}

    /* ── Accent (purple, shared across modes) ────────────────── */
    --color-accent:         oklch(0.50 0.16 290);
    --color-accent-light:   oklch(0.62 0.16 290);
    --color-accent-lighter: oklch(0.75 0.12 290);
    --color-accent-dark:    oklch(0.42 0.16 290);

    /* ── Semantic (shared across modes) ──────────────────────── */
    --color-error:          oklch(0.63 0.24 25);
    --color-brand-pink:     oklch(0.62 0.14 350);
    --color-blog-accent:    oklch(0.72 0.10 60);

    /* ── Hero (always light-on-dark) ────────────────────────── */
    --color-hero-text:      oklch(0.95 0 0);

    /* ── Typography ───────────────────────────────────────────── */
    --text-xs:    0.75rem;
    --text-sm:    0.875rem;
    --text-base:  1rem;
    --text-md:    1.125rem;
    --text-lg:    1.25rem;
    --text-xl:    1.5rem;
    --text-2xl:   2rem;
    --text-3xl:   2.5rem;

    --font-weight-normal:   400;
    --font-weight-medium:   500;
    --font-weight-semibold: 600;
    --font-weight-bold:     700;

    --leading-tight:   1.15;
    --leading-snug:    1.4;
    --leading-normal:  1.6;
    --leading-relaxed: 1.7;

    /* ── Spacing (4px base) ───────────────────────────────────── */
    --space-1:   0.25rem;
    --space-2:   0.5rem;
    --space-3:   0.75rem;
    --space-4:   1rem;
    --space-5:   1.25rem;
    --space-6:   1.5rem;
    --space-8:   2rem;
    --space-10:  2.5rem;
    --space-12:  3rem;
    --space-16:  4rem;
    --space-20:  5rem;
    --space-24:  6rem;

    /* ── Border radius ────────────────────────────────────────── */
    --radius-sm:   2px;
    --radius-md:   4px;
    --radius-lg:   8px;
    --radius-xl:   12px;
    --radius-full: 9999px;

    /* ── Transitions ──────────────────────────────────────────── */
    --duration-fast:   100ms;
    --duration-normal: 200ms;
    --duration-slow:   300ms;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

    /* ── Layout ───────────────────────────────────────────────── */
    --sidebar-width: 18.75rem;
    --navbar-height: 3.75rem;

    /* ── Native form styling ──────────────────────────────────── */
    accent-color: var(--color-accent);
  }

  /* ===================================================================
   * Dark/light overrides — composed from partials
   * =================================================================== */
  @media (prefers-color-scheme: dark) {
    html:not(.light) { ${darkColors} color-scheme: dark; }
  }

  html.light { ${lightColors} color-scheme: light; }
  html.dark { ${darkColors}
    color-scheme: dark;
  }

  /* ===================================================================
   * Base — global element styles referencing tokens.
   * =================================================================== */
  html, body {
    font-size: 16px;
    line-height: var(--leading-normal);
    font-family: ${font.sans};
    font-variant-ligatures: common-ligatures;
    font-style: normal;
    padding: 0;
    margin: 0;
    color: var(--color-text);
    background-color: var(--color-bg);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #__next {
    overflow-x: hidden;
  }

  body.sticky {
    overflow: hidden;
  }

  .root {
    position: relative;
    overflow: auto;
    scroll-behavior: smooth;
  }

  .small {
    color: white;
    font-size: 0.5em;
  }

  .big {
    color: white;
    font-size: 1.4em;
  }

  /* ── Typography ───────────────────────────────────────────── */
  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;

    /* Links inside headings inherit text color — but only plain anchors,
       not styled-components links which have their own class-based styles */
    a:not([class]) {
      color: inherit;
      text-decoration: none;
      transition: text-decoration-color var(--duration-fast);

      &:hover,
      &:focus-visible {
        text-decoration: underline;
        text-decoration-color: var(--color-link-underline-hover);
        text-underline-offset: 3px;
      }
    }
  }

  p {
    text-wrap: pretty;
  }

  strong {
    font-weight: var(--font-weight-semibold);
  }

  code {
    background: var(--color-accent-subtle);
    border-radius: var(--radius-sm);
    font-family: ${font.mono};
    padding: 0.15em 0.3em;
  }

  /* ── Lists ────────────────────────────────────────────────── */
  ul, ol {
    padding-left: 0;
  }

  ul ul, ul ol, ol ol, ol ul {
    padding-left: 1.5em;
  }

  ul li, ol li {
    margin-bottom: 0.75em;
    margin-left: 1em;
    line-height: var(--leading-normal);
  }

  /* ── Tables ───────────────────────────────────────────────── */
  table {
    width: 100%;
    margin: var(--space-10) 0;
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    font-size: var(--text-sm);
  }

  thead {
    font-family: ${font.sans};
  }

  thead tr {
    border-bottom: 2px solid var(--color-border-strong);
  }

  thead th {
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    font-size: var(--text-xs);
    letter-spacing: 0.02em;
    opacity: 0.7;
    padding: var(--space-2) var(--space-4) var(--space-3);
    vertical-align: top;
  }

  thead th:first-child,
  tbody td:first-child {
    padding-left: 0;
  }

  tbody td {
    padding: var(--space-4) var(--space-4);
    vertical-align: top;
    line-height: var(--leading-relaxed);
  }

  tbody tr {
    transition: background-color var(--duration-fast) ease;
  }

  tbody tr:not(:last-child) td {
    border-bottom: 1px solid var(--color-border);
  }

  tbody tr:hover {
    background-color: var(--color-accent-subtle);
  }

  /* ── Selection ────────────────────────────────────────────── */
  ::selection {
    background: var(--color-selection);
  }

  /* ── Focus ────────────────────────────────────────────────── */
  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  /* ── Responsive ───────────────────────────────────────────── */
  @media all and (max-width: 1000px) {
    li {
      list-style-position: outside;
      margin-left: 1em;
    }
  }

  /* ===================================================================
   * DocSearch theming — CSS variables for light/dark mode.
   * =================================================================== */
  :root {
    --docsearch-primary-color: var(--color-accent);
    --docsearch-text-color: var(--color-text);
    --docsearch-muted-color: var(--color-text-muted);
    --docsearch-container-background: oklch(0 0 0 / 0.5);
    --docsearch-modal-background: var(--color-surface);
    --docsearch-modal-shadow: 0 4px 24px var(--color-shadow);
    --docsearch-searchbox-background: var(--color-bg);
    --docsearch-searchbox-focus-background: var(--color-bg);
    --docsearch-searchbox-shadow: none;
    --docsearch-hit-color: var(--color-text);
    --docsearch-hit-background: var(--color-surface);
    --docsearch-hit-shadow: none;
    --docsearch-hit-active-color: oklch(0.98 0 0);
    --docsearch-footer-background: var(--color-surface);
    --docsearch-footer-shadow: 0 -1px 0 var(--color-border);
    --docsearch-key-gradient: linear-gradient(-225deg, var(--color-surface-raised), var(--color-surface));
    --docsearch-key-shadow: inset 0 -2px 0 0 var(--color-border), inset 0 0 1px 1px var(--color-surface-raised), 0 1px 2px 1px var(--color-shadow);
    --docsearch-key-pressed-shadow: inset 0 -2px 0 0 var(--color-border);
    --docsearch-icon-color: var(--color-text-muted);
    --docsearch-highlight-color: var(--color-accent);
    --docsearch-logo-color: var(--color-text-muted);
  }

  .DocSearch-Container {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .DocSearch-Input {
    outline: none !important;
    box-shadow: none !important;
  }

  .DocSearch-Form {
    box-shadow: none !important;
    border: 1px solid var(--color-border) !important;
    border-radius: var(--radius-md) !important;

    &:focus-within {
      border-color: var(--color-accent) !important;
    }
  }

  .DocSearch-StartScreen-Suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4) var(--space-4);
  }

  .DocSearch-StartScreen-Suggestions-Card {
    display: inline-flex;
    align-items: center;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    text-decoration: none;
    font-size: var(--text-sm);
    transition: border-color 0.15s, background 0.15s, color 0.15s;

    &:hover {
      border-color: var(--color-accent);
      background: var(--color-accent-subtle);
      color: var(--color-accent);
    }
  }

  .DocSearch-StartScreen-LatestBlog {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    margin: var(--space-2) var(--space-4) var(--space-4);
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;

    &:hover {
      border-color: var(--color-accent);
      background: var(--color-accent-subtle);
    }
  }

  .DocSearch-StartScreen-LatestBlog-Label {
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
  }

  .DocSearch-StartScreen-LatestBlog-Title {
    font-size: var(--text-sm);
    color: var(--color-text);
    line-height: 1.4;
  }

  @media (prefers-contrast: more) {
    :root {
      --color-border:               oklch(0 0 0 / 0.30);
      --color-border-strong:        oklch(0 0 0 / 0.50);
      --color-text-secondary:       oklch(0.30 0 0);
      --color-text-muted:           oklch(0.38 0 0);
      --color-shadow:               oklch(0 0 0 / 0.25);
      --color-link-underline:       oklch(0 0 0 / 0.40);
      --color-link-underline-hover: oklch(0 0 0 / 0.70);
      --color-accent-subtle:        oklch(0.50 0.16 290 / 0.15);
    }
    html.dark {
      --color-border:               oklch(1 0 0 / 0.30);
      --color-border-strong:        oklch(1 0 0 / 0.40);
      --color-text-secondary:       oklch(0.80 0 0);
      --color-text-muted:           oklch(0.72 0 0);
      --color-shadow:               oklch(0 0 0 / 0.60);
      --color-link-underline:       oklch(1 0 0 / 0.40);
      --color-link-underline-hover: oklch(1 0 0 / 0.70);
      --color-accent-subtle:        oklch(0.62 0.16 290 / 0.20);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles;
