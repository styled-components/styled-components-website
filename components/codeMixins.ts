import { theme, font } from '../utils/theme';
import rem from '../utils/rem';

/**
 * Shared text/color styling for any rendered code block on the site —
 * static `CodeBlock` and interactive `LiveEditor` alike. Defines the
 * `--code-fw` custom property (medium in light mode, light in dark) and
 * applies the theme's token color fallbacks for compound Prism classes
 * that the theme resolver can't match by type-key alone.
 *
 * Split into its own module so `CodeBlock` (server-renderable) can share
 * it with `LiveEdit` without dragging react-live-runner + sucrase into
 * every docs-page client bundle.
 */
export const codeTextMixin = `
  --code-fw: 500;

  html.dark & { --code-fw: 300; }
  @media (prefers-color-scheme: dark) {
    html:not(.light) & { --code-fw: 300; }
  }

  color: ${theme.color.codeText};
  font-family: ${font.mono};
  font-size: ${theme.text.sm};
  font-weight: var(--code-fw);
  line-height: 1.5;
  letter-spacing: -0.025em;
  tab-size: 2;

  /* Fallback token colors for compound types (e.g. template-string css tokens)
     that the theme resolver can't match */
  .token.comment { color: ${theme.color.codeComment}; }
  .token.punctuation { color: ${theme.color.codeComment}; }
  .token.keyword { color: ${theme.color.codeComment}; }
  .token.constant, .token.boolean, .token.builtin { color: ${theme.color.codeText}; }
  .token.number { color: ${theme.color.codeText}; }
  .token.property, .token.atrule { color: ${theme.color.codeDeclaration}; }
  .token.tag, .token.class-name, .token.symbol { color: ${theme.color.codeText}; }
  .token.function { color: ${theme.color.codeFunction}; }
  .token.attr-name, .token.selector { color: ${theme.color.codeDeclaration}; }
  .token.string, .token.attr-value, .token.regex, .token.char { color: ${theme.color.codeString}; }
  .token.variable, .token.url, .token.entity { color: ${theme.color.codeValue}; }
  .token-line,
  .token {
    font-family: ${font.mono};
    font-size: 1em;
    font-weight: var(--code-fw);
    letter-spacing: -0.025em;
  }
`;

/**
 * Interactive-editor-specific styling. Builds on `codeTextMixin` and
 * adds the pieces that only make sense when the code is editable:
 * textarea padding overrides, `cursor: text`, scrollable min-height.
 */
export const editorMixin = `
  ${codeTextMixin}

  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.lg};
  box-shadow: 0 1px 3px ${theme.color.shadow};
  cursor: text;
  min-height: ${rem(400)};
  overflow-x: hidden;
  overflow-y: auto !important;
  position: relative;
  white-space: pre-wrap;

  pre,
  textarea {
    font-variant-ligatures: none !important;
    line-height: inherit !important;
    padding: 1.5em !important;
    margin: 0 !important;
    border: 0 !important;
    outline: 0 !important;
    tab-size: 2;
    box-sizing: border-box !important;
  }

  textarea::selection {
    background: color-mix(in oklch, ${theme.color.text} 10%, transparent) !important;
    color: transparent !important;
  }

  .token-line {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;
