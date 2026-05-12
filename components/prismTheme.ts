import { Theme } from 'react-live-runner';
import { theme } from '../utils/theme';
// Side effect: enriches Prism's CSS grammar with value-keyword tokenization
// so `inline-block`, `center`, `solid`, `ease-in-out`, etc. get colored.
// Must import before any call to Prism.highlight() / tokenize().
import './prismLanguageSC';

// Chromatic roles switch per mode via theme tokens:
//   Light (warm): red declarations, orange functions, purple variables, warm interpolation
//   Dark (cool):  violet declarations, green functions, lime variables, purple interpolation
//
// Token style ordering is LOAD-BEARING. react-live-runner cascades style
// matches — when a span has multiple class names that each match a rule, the
// LAST matching rule wins. Punctuation rules go LAST so compound-class spans
// resolve to punctuation color, not the color of an earlier-matched type.

export default {
  plain: {
    backgroundColor: theme.color.codeBg,
    color: theme.color.codeText,
  },
  styles: [
    // --- Neutral (comment-level) ---
    {
      types: ['prolog', 'comment', 'cdata'],
      style: { color: theme.color.codeComment },
    },
    {
      types: ['important', 'keyword'],
      style: { color: theme.color.codeComment },
    },

    // --- Variables/entities ---
    {
      types: ['entity', 'url', 'variable', 'interpolation'],
      style: { color: theme.color.codeValue },
    },
    {
      types: ['property-access'],
      style: { color: theme.color.codeAccess },
    },
    {
      types: ['property-access-deep'],
      style: { color: theme.color.codeAccess },
    },

    // --- Bright neutral (text-level) ---
    {
      types: ['doctype', 'class-name', 'maybe-class-name', 'symbol'],
      style: { color: theme.color.codeText },
    },

    // --- Diff additions ---
    {
      types: ['inserted'],
      style: { color: theme.color.codeInserted },
    },
    {
      types: ['tag-depth-0'],
      style: { color: theme.color.codeText },
    },
    {
      types: ['tag-depth-1'],
      style: { color: theme.color.codeText },
    },
    {
      types: ['tag-depth-2'],
      style: { color: theme.color.codeText },
    },
    {
      types: ['tag-depth-3'],
      style: { color: theme.color.codeText },
    },
    {
      types: ['number', 'unit'],
      style: { color: theme.color.codeText },
    },

    // --- Declarations ---
    {
      types: ['property', 'atrule'],
      style: { color: theme.color.codeDeclaration },
    },
    {
      types: ['attr-name', 'selector', 'parameter'],
      style: { color: theme.color.codeDeclaration },
    },

    // --- Value keywords ---
    {
      types: ['builtin', 'constant', 'boolean', 'color'],
      style: { color: theme.color.codeText },
    },

    // --- Function calls ---
    {
      types: ['function'],
      style: { color: theme.color.codeFunction },
    },

    // --- Diff removals ---
    {
      types: ['deleted'],
      style: { color: theme.color.codeDeleted },
    },

    // --- Strings ---
    {
      types: ['attr-value', 'regex', 'char', 'string'],
      style: { color: theme.color.codeString },
    },

    // --- Interpolation depth ---
    {
      types: ['interpolation-depth-0'],
      style: { color: theme.color.codeInterp0 },
    },
    {
      types: ['interpolation-depth-1'],
      style: { color: theme.color.codeInterp1 },
    },
    {
      types: ['interpolation-depth-2'],
      style: { color: theme.color.codeInterp2 },
    },

    // --- Punctuation (LAST — wins cascade) ---
    {
      types: ['punctuation', 'template-punctuation', 'operator', 'arrow'],
      style: { color: theme.color.codeComment },
    },

    // --- Formatting ---
    {
      types: ['bold'],
      style: { fontWeight: 'bold' },
    },
    {
      types: ['italic'],
      style: { fontStyle: 'italic' },
    },
    {
      types: ['entity'],
      style: { cursor: 'help' },
    },
    {
      types: ['namespace'],
      style: { opacity: 0.7 },
    },
  ],
} as Theme;
