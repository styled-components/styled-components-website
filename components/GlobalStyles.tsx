'use client';

import { createGlobalStyle } from 'styled-components';
import { theme, font, darkColors } from '../utils/theme';

// Dark color overrides as raw CSS — applied via class and media query
// for flash-free dark mode (CSS-first, before JS hydrates).
const darkColorCSS = Object.entries(darkColors)
  .map(([key, val]) => `--sc-color-${key}:${val};`)
  .join('');

// ---------------------------------------------------------------------------

const GlobalStyles = createGlobalStyle`
  /* ===================================================================
   * @property — register tokens as typed so they're animatable.
   * =================================================================== */
  @property --sc-color-bg {
    syntax: '<color>';
    inherits: true;
    initial-value: oklch(0.99 0 0);
  }
  @property --sc-color-text {
    syntax: '<color>';
    inherits: true;
    initial-value: oklch(0.20 0.01 270);
  }
  @property --sc-color-accent {
    syntax: '<color>';
    inherits: true;
    initial-value: oklch(0.50 0.16 290);
  }
  @property --sc-color-surface {
    syntax: '<color>';
    inherits: true;
    initial-value: oklch(0.97 0 0);
  }
  @property --sc-color-surfaceRaised {
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
   * Dark/light overrides — CSS-first for flash-free dark mode.
   * theme.GlobalStyle emits :root vars from ThemeProvider on hydration;
   * these class/media overrides have higher specificity and win.
   * =================================================================== */
  @media (prefers-color-scheme: dark) {
    html:not(.light) { ${darkColorCSS} color-scheme: dark; }
  }

  html.light { color-scheme: light; }
  html.dark { ${darkColorCSS} color-scheme: dark; }

  /* ===================================================================
   * Additional :root tokens not managed by createTheme
   * =================================================================== */
  :root {
    accent-color: ${theme.color.accent};
  }

  /* ===================================================================
   * Base — global element styles referencing tokens.
   * =================================================================== */
  html, body {
    font-size: 16px;
    line-height: ${theme.leading.normal};
    font-family: ${font.sans};
    letter-spacing: -0.01em;
    font-variant-ligatures: common-ligatures;
    font-style: normal;
    padding: 0;
    margin: 0;
    color: ${theme.color.text};
    background-color: ${theme.color.bg};
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
  h1 {
    font-family: ${font.display};
    font-weight: ${theme.fontWeight.display};
    letter-spacing: -0.02em;
    font-size: 110%;
  }

  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;

    a:not([class]) {
      color: inherit;
      text-decoration: none;
      transition: text-decoration-color ${theme.duration.fast};

      &:hover,
      &:focus-visible {
        text-decoration: underline;
        text-decoration-color: ${theme.color.linkUnderlineHover};
        text-underline-offset: 3px;
      }
    }
  }

  p {
    text-wrap: pretty;
    margin-bottom: 1.75em;
  }

  pre, blockquote {
    margin-bottom: 2em;
  }

  ul, ol {
    margin-bottom: 1.75em;
  }

  strong {
    font-weight: ${theme.fontWeight.semibold};
  }

  code {
    background: ${theme.color.accentSubtle};
    border-radius: ${theme.radius.sm};
    font-family: ${font.mono};
    letter-spacing: -0.025em;
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
    line-height: ${theme.leading.normal};
  }

  /* ── Tables ───────────────────────────────────────────────── */
  table {
    width: 100%;
    margin: ${theme.space[10]} 0;
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    font-size: ${theme.text.sm};
  }

  thead {
    font-family: ${font.sans};
  }

  thead tr {
    border-bottom: 2px solid ${theme.color.borderStrong};
  }

  thead th {
    font-weight: ${theme.fontWeight.semibold};
    text-transform: uppercase;
    font-size: ${theme.text.xs};
    letter-spacing: 0.02em;
    opacity: 0.7;
    padding: ${theme.space[2]} ${theme.space[4]} ${theme.space[3]};
    vertical-align: top;
  }

  thead th:first-child,
  tbody td:first-child {
    padding-left: 0;
  }

  tbody td {
    padding: ${theme.space[4]} ${theme.space[4]};
    vertical-align: top;
    line-height: ${theme.leading.relaxed};
  }

  tbody tr {
    transition: background-color ${theme.duration.fast} ease;
  }

  tbody tr:not(:last-child) td {
    border-bottom: 1px solid ${theme.color.border};
  }

  tbody tr:hover {
    background-color: ${theme.color.accentSubtle};
  }

  /* ── Selection ────────────────────────────────────────────── */
  ::selection {
    background: ${theme.color.selection};
  }

  /* ── Focus ────────────────────────────────────────────────── */
  :focus-visible {
    outline: 2px solid ${theme.color.accent};
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
    --docsearch-primary-color: ${theme.color.accent};
    --docsearch-text-color: ${theme.color.text};
    --docsearch-muted-color: ${theme.color.textMuted};
    --docsearch-container-background: oklch(0 0 0 / 0.5);
    --docsearch-modal-background: ${theme.color.surface};
    --docsearch-modal-shadow: 0 4px 24px ${theme.color.shadow};
    --docsearch-searchbox-background: ${theme.color.bg};
    --docsearch-searchbox-focus-background: ${theme.color.bg};
    --docsearch-searchbox-shadow: none;
    --docsearch-hit-color: ${theme.color.text};
    --docsearch-hit-background: ${theme.color.surface};
    --docsearch-hit-shadow: none;
    --docsearch-hit-active-color: oklch(0.98 0 0);
    --docsearch-footer-background: ${theme.color.surface};
    --docsearch-footer-shadow: 0 -1px 0 ${theme.color.border};
    --docsearch-key-gradient: linear-gradient(-225deg, ${theme.color.surfaceRaised}, ${theme.color.surface});
    --docsearch-key-shadow: inset 0 -2px 0 0 ${theme.color.border}, inset 0 0 1px 1px ${theme.color.surfaceRaised}, 0 1px 2px 1px ${theme.color.shadow};
    --docsearch-key-pressed-shadow: inset 0 -2px 0 0 ${theme.color.border};
    --docsearch-icon-color: ${theme.color.textMuted};
    --docsearch-highlight-color: ${theme.color.accent};
    --docsearch-logo-color: ${theme.color.textMuted};
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
    border: 1px solid ${theme.color.border} !important;
    border-radius: ${theme.radius.md} !important;

    &:focus-within {
      border-color: ${theme.color.accent} !important;
    }
  }

  .DocSearch-StartScreen-Suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.space[2]};
    padding: ${theme.space[2]} ${theme.space[4]} ${theme.space[4]};
  }

  .DocSearch-StartScreen-Suggestions-Card {
    display: inline-flex;
    align-items: center;
    padding: ${theme.space[2]} ${theme.space[3]};
    border-radius: ${theme.radius.md};
    border: 1px solid ${theme.color.border};
    background: ${theme.color.surface};
    color: ${theme.color.text};
    text-decoration: none;
    font-size: ${theme.text.sm};
    transition: border-color 0.15s, background 0.15s, color 0.15s;

    &:hover {
      border-color: ${theme.color.accent};
      background: ${theme.color.accentSubtle};
      color: ${theme.color.accent};
    }
  }

  .DocSearch-StartScreen-LatestBlog {
    display: flex;
    flex-direction: column;
    gap: ${theme.space[1]};
    margin: ${theme.space[2]} ${theme.space[4]} ${theme.space[4]};
    padding: ${theme.space[3]} ${theme.space[4]};
    border-radius: ${theme.radius.md};
    border: 1px solid ${theme.color.border};
    background: ${theme.color.surface};
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;

    &:hover {
      border-color: ${theme.color.accent};
      background: ${theme.color.accentSubtle};
    }
  }

  .DocSearch-StartScreen-LatestBlog-Label {
    font-size: ${theme.text.xs};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${theme.color.textMuted};
  }

  .DocSearch-StartScreen-LatestBlog-Title {
    font-size: ${theme.text.sm};
    color: ${theme.color.text};
    line-height: 1.4;
  }

  @media (prefers-contrast: more) {
    :root {
      --sc-color-border:               oklch(0 0 0 / 0.30);
      --sc-color-borderStrong:         oklch(0 0 0 / 0.50);
      --sc-color-textSecondary:        oklch(0.30 0 0);
      --sc-color-textMuted:            oklch(0.38 0 0);
      --sc-color-shadow:               oklch(0 0 0 / 0.25);
      --sc-color-linkUnderline:        oklch(0 0 0 / 0.40);
      --sc-color-linkUnderlineHover:   oklch(0 0 0 / 0.70);
      --sc-color-accentSubtle:         oklch(0.50 0.16 290 / 0.15);
    }
    html.dark {
      --sc-color-border:               oklch(1 0 0 / 0.30);
      --sc-color-borderStrong:         oklch(1 0 0 / 0.40);
      --sc-color-textSecondary:        oklch(0.80 0 0);
      --sc-color-textMuted:            oklch(0.72 0 0);
      --sc-color-shadow:               oklch(0 0 0 / 0.60);
      --sc-color-linkUnderline:        oklch(1 0 0 / 0.40);
      --sc-color-linkUnderlineHover:   oklch(1 0 0 / 0.70);
      --sc-color-accentSubtle:         oklch(0.62 0.16 290 / 0.20);
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
