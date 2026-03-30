import { Theme } from 'react-live-runner';
import { theme } from '../utils/theme';

export default {
  plain: {
    backgroundColor: theme.color.codeBg,
    color: theme.color.codeText,
  },
  styles: [
    {
      types: ['prolog', 'comment', 'cdata'],
      style: {
        color: theme.color.codeComment,
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: theme.color.codePunctuation,
      },
    },
    {
      types: ['builtin', 'constant', 'boolean'],
      style: {
        color: theme.color.codeConstant,
      },
    },
    {
      types: ['number'],
      style: {
        color: theme.color.codeNumber,
      },
    },
    {
      types: ['important', 'atrule', 'property', 'keyword'],
      style: {
        color: theme.color.codeKeyword,
      },
    },
    {
      types: ['doctype', 'operator', 'inserted', 'tag', 'class-name', 'symbol'],
      style: {
        color: theme.color.codeTag,
      },
    },
    {
      types: ['attr-name', 'function', 'deleted', 'selector'],
      style: {
        color: theme.color.codeFunction,
      },
    },
    {
      types: ['attr-value', 'regex', 'char', 'string'],
      style: {
        color: theme.color.codeString,
      },
    },
    {
      types: ['entity', 'url', 'variable'],
      style: {
        color: theme.color.codeVariable,
      },
    },
    {
      types: ['bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
  ],
} as Theme;
