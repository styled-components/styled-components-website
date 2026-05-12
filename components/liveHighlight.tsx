'use client';

/**
 * Custom highlight function for the live editors that post-processes Prism's
 * flat token stream to assign JSX nesting depth to tag tokens.
 *
 * Prism tokenizes `<Wrapper><Title>` as a flat sequence of `tag`-typed
 * spans, `<`, `Wrapper`, `>`, `<`, `Title`, `>`. There's no native nesting
 * awareness in a regex grammar. We walk the stream, watch for bracket
 * direction (`<`, `</`, `/>`, `>`), track an integer depth counter, and
 * stamp a `tag-depth-N` class on each tag token. `prismTheme.ts` has rules
 * for `tag-depth-1..3` that override the base `tag` color with hue-shifted
 * variants so each nesting level reads distinctly.
 *
 * Integration: `<LiveEditor highlight={highlightTSXWithTagDepth} />` on every
 * live editor on the site. Static `<CodeBlock>` uses a different rendering
 * path and is unaffected.
 */

import * as React from 'react';
import Highlight, { Prism } from 'prism-react-renderer';
import type { Language } from 'prism-react-renderer';
import prismTheme from './prismTheme';

const MAX_DEPTH = 4;

// Token types that have their own semantic color and should not receive
// interpolation-depth or tagged-template-function annotations.
const HAS_OWN_COLOR = new Set([
  'string',
  'number',
  'function',
  'keyword',
  'tag',
  'class-name',
  'attr-name',
  'attr-value',
  'constant',
  'boolean',
  'builtin',
  'selector',
  'atrule',
  'color',
  'comment',
  'arrow',
  'operator',
  'unit',
  'regex',
  'char',
  'important',
]);

// Shape of the normalized token object that `<Highlight>` passes to its
// render prop. `prism-react-renderer` doesn't re-export this type so we
// redeclare the minimal surface we touch.
type MutableToken = {
  types: string[];
  content: string;
  empty?: boolean;
};

/**
 * Tokens inside a JSX attribute expression `theme={expr}` carry the
 * ancestor `tag` type (Prism propagates it downward) but also carry
 * `script` and `language-javascript` markers from the embedded-language
 * wrapper. We want the JS expression to render with its native JS colors,
 * not inherit the tag-depth color, so we skip any token whose type list
 * hits one of these "we're actually in a different language now" markers.
 *
 * Additionally, `attr-name` and `attr-value` tokens should retain their
 * natural semantic colors (attr-name via `codeFunction` pink, attr-value
 * via `codeString` green) so JSX attributes stay visually distinct from
 * the tag brackets and names they belong to.
 */
function isEmbeddedLanguageToken(types: string[]): boolean {
  for (const t of types) {
    if (t === 'script' || t === 'attr-name' || t === 'attr-value') return true;
    if (t.startsWith('language-')) return true;
  }
  return false;
}

/**
 * Walks a flat line-of-tokens stream, mutating `types` on `tag`-classed
 * tokens to append a `tag-depth-N` class. The depth counter persists across
 * lines because JSX elements can span multiple lines.
 */
function annotateTagDepth(lines: MutableToken[][]): void {
  let depth = 0;
  // Tracks the depth to stamp on every tag-typed token until the current
  // tag's closing `>` is seen. Null outside any tag.
  let currentTagDepth: number | null = null;
  // Tracks the state of the current tag: 'open' increments depth after `>`,
  // 'close' already decremented before entering, 'self' leaves depth alone.
  let tagState: 'open' | 'close' | 'self' | null = null;

  for (const line of lines) {
    for (const token of line) {
      if (!token.types.includes('tag')) {
        // Any non-tag token outside our state machine is a no-op.
        continue;
      }

      // Skip JSX attribute expressions like `theme={theme}`. They have
      // `tag` + `script language-javascript` on every span, they're
      // nominally inside a tag but semantically JS that should render
      // with JS syntax colors. Neither drives the state machine nor
      // receives a depth stamp.
      if (isEmbeddedLanguageToken(token.types)) {
        continue;
      }

      const content = token.content;

      if (content === '<') {
        tagState = 'open';
        currentTagDepth = depth;
      } else if (content === '</') {
        tagState = 'close';
        depth = Math.max(0, depth - 1);
        currentTagDepth = depth;
      } else if (content === '/>') {
        tagState = 'self';
        // Depth unchanged; reuse whatever currentTagDepth was set for this
        // tag's opening `<`.
      } else if (content === '>') {
        // Close out the current tag. If it was an opener, bump depth for
        // the NEXT tag.
        if (tagState === 'open') {
          depth += 1;
        }
        tagState = null;
      }
      // Else: this is an interior tag token (class-name, attr-name, etc.)
      // with the ancestor `tag` type propagated. It stays within the
      // current tag's depth.

      if (currentTagDepth !== null && !token.types.includes('punctuation')) {
        const assigned = currentTagDepth % MAX_DEPTH;
        // Skip depth 0, the base `tag` rule already covers it.
        if (assigned > 0) {
          token.types = [...token.types, `tag-depth-${assigned}`];
        }
      }

      // Reset currentTagDepth after the closing bracket is processed.
      if (content === '>' || content === '/>') {
        currentTagDepth = null;
      }
    }
  }
}

/**
 * Fixes up Prism's tokenization of optional chaining (`?.`). Prism's TSX
 * grammar doesn't tag identifiers after `?.` with `property-access`, it
 * only tags the ones after regular `.`. This walks the stream, detects
 * `?.` operator tokens, and stamps `property-access` on the next
 * identifier-like token so the rest of the pipeline (color cascade,
 * depth counter) treats them the same as regular member access.
 */
function annotateOptionalChain(lines: MutableToken[][]): void {
  let expectsPropertyAccess = false;
  for (const line of lines) {
    for (const token of line) {
      const content = typeof token.content === 'string' ? token.content.trim() : '';

      // `?.` optional chaining operator, the next identifier is a member
      // access that Prism failed to classify.
      if (token.types.includes('operator') && content === '?.') {
        expectsPropertyAccess = true;
        continue;
      }

      // Skip pure whitespace, the chain continues through it.
      if (content === '') continue;

      if (expectsPropertyAccess) {
        // Stamp as property-access unless it's already structural (a dot,
        // bracket, or operator itself).
        if (
          !token.types.includes('punctuation') &&
          !token.types.includes('operator') &&
          !token.types.includes('property-access')
        ) {
          token.types = [...token.types, 'property-access'];
        }
        expectsPropertyAccess = false;
      }
    }
  }
}

/**
 * Walks the flat token stream and stamps `property-access-deep` on
 * property-access tokens at the 2nd+ position in a chain. Counting the
 * root identifier as level 1, this gives:
 *   props.theme.fg    → theme(L2, normal), fg(L3, DEEP)
 *   theme.colors.darker → colors(L2, normal), darker(L3, DEEP)
 *
 * The counter tracks consecutive property-access tokens separated only by
 * chain operators (`.` or `?.`); any other token type resets it.
 */
function annotatePropertyAccessDepth(lines: MutableToken[][]): void {
  let chainDepth = 0;

  for (const line of lines) {
    for (const token of line) {
      const content = typeof token.content === 'string' ? token.content.trim() : '';

      if (token.types.includes('property-access')) {
        chainDepth += 1;
        if (chainDepth >= 2) {
          token.types = [...token.types, 'property-access-deep'];
        }
      } else if (token.types.includes('punctuation') && content === '.') {
        // Dots between chain members don't reset the counter.
      } else if (token.types.includes('operator') && content === '?.') {
        // Optional chaining also preserves the chain.
      } else if (content === '') {
        // Pure whitespace doesn't break the chain.
      } else {
        chainDepth = 0;
      }
    }
  }
}

/**
 * Stamps `interpolation-depth-N` on non-punctuation tokens inside `${...}`
 * interpolations. Depth 0 is the outermost interpolation; nested
 * interpolations increment. Punctuation tokens (`${`, `}`) are left
 * untagged so they stay comment-neutral.
 */
function annotateInterpolationDepth(lines: MutableToken[][]): void {
  let inInterpolation = false;
  let chainPos = 0; // position in the current member-access chain

  for (const line of lines) {
    for (const token of line) {
      const content = typeof token.content === 'string' ? token.content.trim() : '';
      const types = token.types;

      // Track interpolation boundaries
      const isPunct = types.includes('interpolation-punctuation') || types.includes('template-punctuation');
      if (isPunct) {
        if (content.includes('${')) {
          inInterpolation = true;
          chainPos = 0;
        } else if (content === '}' || content === '`') {
          inInterpolation = false;
          chainPos = 0;
        }
        continue;
      }

      if (!inInterpolation) continue;

      // Dots advance the chain position
      if (types.includes('punctuation') && content === '.') {
        chainPos++;
        continue;
      }

      if (types.includes('punctuation')) continue;

      if (!types.some(t => HAS_OWN_COLOR.has(t))) {
        const clamped = Math.min(chainPos, 2);
        token.types = [...types, `interpolation-depth-${clamped}`];
      }
    }
  }
}

/**
 * Stamps `function` on imported binding names, the identifiers between
 * `import` and `from` keywords. This gives `styled` and `css` in
 * `import styled, { css } from '...'` the function (purple) color.
 */
function annotateImportBindings(lines: MutableToken[][]): void {
  for (const line of lines) {
    let inImport = false;
    for (const token of line) {
      const content = token.content.trim();
      if (token.types.includes('keyword') && content === 'import') {
        inImport = true;
        continue;
      }
      if (token.types.includes('keyword') && content === 'from') {
        inImport = false;
        continue;
      }
      if (!inImport) continue;
      if (content === '') continue;
      if (token.types.includes('punctuation') || token.types.includes('operator')) continue;
      if (token.types.includes('keyword') || token.types.includes('string')) continue;

      token.types = [...token.types, 'function'];
    }
  }
}

/**
 * Stamps `function` on plain identifiers used as tagged template literal
 * names (e.g. `css\`...\``). Prism only detects functions via the `name(`
 * pattern, tagged templates get no special type, so `css` inside an
 * interpolation renders as neutral text instead of function-colored.
 */
function annotateTaggedTemplateFunctions(lines: MutableToken[][]): void {
  const flat: MutableToken[] = [];
  for (const line of lines) {
    for (const token of line) flat.push(token);
  }

  for (let i = 0; i < flat.length - 1; i++) {
    const token = flat[i];
    const content = token.content.trim();
    if (content === '') continue;

    if (token.types.some(t => HAS_OWN_COLOR.has(t) || t === 'punctuation')) continue;

    // Find next non-empty token
    for (let j = i + 1; j < flat.length; j++) {
      const next = flat[j];
      if (next.content.trim() === '') continue;
      if (next.content.trim() === '`' || next.types.includes('template-punctuation')) {
        token.types = [...token.types, 'function'];
      }
      break;
    }
  }
}

/**
 * Reclassifies the `&` nesting selector as punctuation so it renders
 * neutral rather than declaration-colored.
 */
function neutralizeAmpersandSelector(lines: MutableToken[][]): void {
  for (const line of lines) {
    for (const token of line) {
      if (token.types.includes('selector') && token.content.trim() === '&') {
        token.types = token.types.filter(t => t !== 'selector').concat('punctuation');
      }
    }
  }
}

/**
 * Ensures template-punctuation tokens (backticks, `${`, `}`) resolve to
 * punctuation color. prism-react-renderer's `getStyleForToken` merges
 * styles via `Object.assign(...types.map(t => dict[t]))`, the last
 * type wins. Move `punctuation` to the end so it overrides `string`.
 */
function neutralizeTemplatePunctuation(lines: MutableToken[][]): void {
  for (const line of lines) {
    for (const token of line) {
      if (token.types.includes('template-punctuation')) {
        token.types = [
          ...token.types.filter(t => t !== 'punctuation' && t !== 'template-punctuation'),
          'template-punctuation',
          'punctuation',
        ];
      }
    }
  }
}

/**
 * Unified code rendering component. Wraps `prism-react-renderer`'s
 * `<Highlight>` with the full annotation pipeline (tag depth, optional
 * chain, property access depth) and the token-rendering loop. This is
 * THE single source of truth for what a highlighted code block looks
 * like on the site, both static docs blocks (`CodeBlock.tsx`) and
 * interactive live editors (`LiveEdit.tsx`, `HomepageHeroEditor.tsx`)
 * delegate here.
 */
export function HighlightedCode({ code, language = 'tsx' }: { code: string; language?: string }): React.ReactNode {
  return (
    <Highlight
      Prism={Prism}
      code={code}
      // The `Language` union doesn't include every Prism grammar we
      // might want to pass (`text` fallback, custom grammars, etc.);
      // cast through to keep the public API flexible.
      language={language as Language}
      theme={prismTheme}
    >
      {({ tokens, getLineProps, getTokenProps }) => {
        annotateImportBindings(tokens as MutableToken[][]);
        annotateTagDepth(tokens as MutableToken[][]);
        annotateOptionalChain(tokens as MutableToken[][]);
        annotatePropertyAccessDepth(tokens as MutableToken[][]);
        annotateTaggedTemplateFunctions(tokens as MutableToken[][]);
        annotateInterpolationDepth(tokens as MutableToken[][]);
        neutralizeAmpersandSelector(tokens as MutableToken[][]);
        neutralizeTemplatePunctuation(tokens as MutableToken[][]);
        return (
          <>
            {tokens.map((line, i) => {
              // React 19 disallows `key` in spread props. `getLineProps`
              // returns an object with a `key` field, destructure it out
              // and pass to JSX directly.
              const { key: _lineKey, ...lineProps } = getLineProps({ line });
              return (
                <span key={i} {...lineProps}>
                  {line.map((token, j) => {
                    const { key: _tokenKey, ...tokenProps } = getTokenProps({ token });
                    return <span key={j} {...tokenProps} />;
                  })}
                  {'\n'}
                </span>
              );
            })}
          </>
        );
      }}
    </Highlight>
  );
}

/**
 * Adapter for `react-simple-code-editor`'s `highlight` prop, which
 * expects a `(code: string) => React.ReactNode` function. Hard-codes
 * language to `tsx` because every live editor on the site uses TSX.
 */
export function highlightTSXWithTagDepth(code: string): React.ReactNode {
  return <HighlightedCode code={code} language="tsx" />;
}
