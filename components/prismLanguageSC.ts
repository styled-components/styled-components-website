/**
 * CSS grammar enrichment for Prism.
 *
 * Prism's default CSS grammar structure is minimal, it tokenizes selectors,
 * properties, `:`, values inside `url()`/`var()`, and strings, but leaves
 * the value keywords (layout, positioning, timing, borders, etc.) as raw
 * text nodes inside a `language-css` wrapper. In a styled-components code
 * sample that means `display: inline-block; transition: all 200ms ease-in-out;`
 * renders most of its identifiers as plain white.
 *
 * This module extends `Prism.languages.css` with a `value-keyword` rule
 * aliased to `constant`, so the existing theme's `constant` color picks
 * them up automatically (no edits to `prismTheme.ts`).
 *
 * Side effect: mutates the Prism bundled by `prism-react-renderer`. Import
 * it once, ordering is guaranteed by ES module caching.
 */

import { Prism } from 'prism-react-renderer';

// `insertBefore` is a runtime method on `Prism.languages` that the
// `prism-react-renderer` public types model as a plain dict. Give it a
// narrow type here rather than reaching for `as any`.
type PrismLanguagesWithInsertBefore = typeof Prism.languages & {
  insertBefore(inside: string, before: string, grammar: Record<string, unknown>): void;
};

const CSS_VALUE_KEYWORDS = [
  // display / layout
  'inline-block',
  'inline-flex',
  'inline-grid',
  'flow-root',
  'list-item',
  'contents',
  'block',
  'inline',
  'flex',
  'grid',
  'table',
  'none',

  // position
  'static',
  'relative',
  'absolute',
  'fixed',
  'sticky',

  // flex / grid alignment
  'flex-start',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
  'row-reverse',
  'column-reverse',
  'row',
  'column',
  'wrap',
  'nowrap',
  'center',
  'stretch',
  'baseline',
  'start',
  'end',

  // box-sizing / sizing
  'border-box',
  'content-box',
  'padding-box',
  'min-content',
  'max-content',
  'fit-content',

  // overflow
  'visible',
  'hidden',
  'scroll',
  'clip',
  'auto',

  // border style
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',

  // text / font
  'uppercase',
  'lowercase',
  'capitalize',
  'left',
  'right',
  'justify',
  'underline',
  'overline',
  'line-through',
  'small-caps',
  'italic',
  'oblique',
  'bolder',
  'lighter',
  'bold',
  'normal',
  'sans-serif',
  'monospace',
  'system-ui',
  'serif',
  'cursive',
  'fantasy',

  // transition / animation
  'cubic-bezier',
  'ease-in-out',
  'ease-in',
  'ease-out',
  'step-start',
  'step-end',
  'linear',
  'ease',
  'alternate-reverse',
  'alternate',
  'reverse',
  'forwards',
  'backwards',
  'infinite',
  'running',
  'paused',
  'both',
  'all',

  // global keywords
  'inherit',
  'initial',
  'revert-layer',
  'revert',
  'unset',

  // cursor / interaction
  'not-allowed',
  'pointer',
  'default',
  'grab',
  'grabbing',
  'crosshair',
  'text',
  'move',
  'wait',
  'help',

  // color keywords that Prism's CSS grammar doesn't already capture
  'currentColor',
];

// Sort by length descending so longer matches win over shorter prefixes
// (e.g. `inline-block` before `inline`). Prism's regex engine is greedy
// with alternation order, not string length.
const sortedKeywords = CSS_VALUE_KEYWORDS.toSorted((a, b) => b.length - a.length);

// Lookbehind scopes the match to CSS value positions: after a `:` (property
// value), whitespace, comma, or `(`. Prevents matching inside selectors or
// identifiers.
const valueKeywordPattern = new RegExp(`(?<=[:\\s,(])(?:${sortedKeywords.join('|')})\\b`);

// Insert before `function` so the value-keyword rule matches before CSS
// function tokenization (which handles `var()`, `calc()`, etc.).
(Prism.languages as PrismLanguagesWithInsertBefore).insertBefore('css', 'function', {
  'value-keyword': {
    pattern: valueKeywordPattern,
    alias: 'constant',
  },
});

// ---------------------------------------------------------------------------
// TSX grammar extension: tokenize the contents of `__html: `...`` template
// literals (as used by React's `dangerouslySetInnerHTML`) as JavaScript.
// Without this, the template literal renders as one flat string, loses
// keyword/number/function/punctuation coloring for often-hundreds of lines
// of bootstrapping JS embedded in theme toggles, analytics snippets, etc.
//
// Prism's tsx grammar has its own `template-string` rule that shadows the
// javascript one, so we have to patch tsx specifically (not javascript).
// The `rest` grammar used inside the nested template-string is a copy of
// tsx WITHOUT its `template-string` rule, this keeps the sub-tokenizer
// from recursing infinitely on nested backticks.
// ---------------------------------------------------------------------------

const tsxWithoutTemplateString: Record<string, unknown> = {};
for (const key of Object.keys(Prism.languages.tsx)) {
  if (key !== 'template-string') {
    tsxWithoutTemplateString[key] = (Prism.languages.tsx as Record<string, unknown>)[key];
  }
}

(Prism.languages as PrismLanguagesWithInsertBefore).insertBefore('tsx', 'template-string', {
  'html-content': {
    pattern: /__html\s*:\s*`(?:[^`\\]|\\[\s\S])*`/,
    greedy: true,
    inside: {
      property: /^__html/,
      punctuation: /:/,
      'template-string': {
        pattern: /`[\s\S]*`/,
        greedy: true,
        inside: {
          'template-punctuation': /^`|`$/,
          rest: tsxWithoutTemplateString,
        },
      },
    },
  },
});

// ---------------------------------------------------------------------------
// Extend the existing styled-components template-string recognizer to also
// match when a TypeScript generic annotation sits between the method name
// and the backtick:
//
//   const X = styled.div<{ $x: number }>`color: red;`
//
// Prism's default regex only matches `styled.div\`...\`` directly, so the
// generic-annotated form falls through to the generic template-string rule
// and loses its CSS sub-grammar. We clone the existing styled rule (index 0
// in the `template-string` array) with an extended pattern that allows an
// optional balanced-bracket generic before the backtick, and inject it at
// the head of the array so it wins.
// ---------------------------------------------------------------------------

type PatternObject = {
  pattern: RegExp;
  lookbehind?: boolean;
  greedy?: boolean;
  inside?: Record<string, unknown>;
  alias?: string | string[];
};

const tsxTemplateStrings = (Prism.languages.tsx as Record<string, unknown>)['template-string'] as PatternObject[];
const existingStyledRule = tsxTemplateStrings[0];
if (existingStyledRule && existingStyledRule.pattern) {
  // Original lookbehind source: the styled tag regex followed by \s*
  // We splice in an optional `<...>` type-arg segment after the tag.
  // Balanced-bracket pattern: `<(?:[^<>]|<[^<>]*>)*>` handles one level of
  // nested generics (e.g. `Array<number>`).
  const originalSource = existingStyledRule.pattern.source;
  const withGenerics = originalSource.replace(/\\s\*\)`/, '(?:\\s*<(?:[^<>]|<[^<>]*>)*>)?\\s*)`');
  const styledWithGenericsRule: PatternObject = {
    ...existingStyledRule,
    pattern: new RegExp(withGenerics),
  };
  tsxTemplateStrings.unshift(styledWithGenericsRule);
}
