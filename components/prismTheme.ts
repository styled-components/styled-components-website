import { Theme } from 'react-live-runner';

export default {
  plain: {
    backgroundColor: 'var(--color-code-bg)',
    color: 'var(--color-code-text)',
  },
  styles: [
    {
      types: ['prolog', 'comment', 'cdata'],
      style: {
        color: 'var(--color-code-comment)',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'var(--color-code-punctuation)',
      },
    },
    {
      types: ['builtin', 'constant', 'boolean'],
      style: {
        color: 'var(--color-code-constant)',
      },
    },
    {
      types: ['number'],
      style: {
        color: 'var(--color-code-number)',
      },
    },
    {
      types: ['important', 'atrule', 'property', 'keyword'],
      style: {
        color: 'var(--color-code-keyword)',
      },
    },
    {
      types: ['doctype', 'operator', 'inserted', 'tag', 'class-name', 'symbol'],
      style: {
        color: 'var(--color-code-tag)',
      },
    },
    {
      types: ['attr-name', 'function', 'deleted', 'selector'],
      style: {
        color: 'var(--color-code-function)',
      },
    },
    {
      types: ['attr-value', 'regex', 'char', 'string'],
      style: {
        color: 'var(--color-code-string)',
      },
    },
    {
      types: ['entity', 'url', 'variable'],
      style: {
        color: 'var(--color-code-variable)',
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
