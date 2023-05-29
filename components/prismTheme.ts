import { Theme } from 'react-live-runner';

export default {
  plain: {
    backgroundColor: '#27212e',
    color: '#ffffff',
    padding: '0.25em',
  },
  styles: [
    {
      types: ['prolog', 'comment', 'cdata'],
      style: {
        color: '#91889b',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#7b6995',
      },
    },
    {
      types: ['builtin', 'constant', 'boolean'],
      style: {
        color: '#7b6995',
      },
    },
    {
      types: ['number'],
      style: {
        color: '#b381c5',
      },
    },
    {
      types: ['important', 'atrule', 'property', 'keyword'],
      style: {
        color: '#40b4c4',
      },
    },
    {
      types: ['doctype', 'operator', 'inserted', 'tag', 'class-name', 'symbol'],
      style: {
        color: '#74dfc4',
      },
    },
    {
      types: ['attr-name', 'function', 'deleted', 'selector'],
      style: {
        color: '#eb64b9',
      },
    },
    {
      types: ['attr-value', 'regex', 'char', 'string'],
      style: {
        color: '#b4dce7',
      },
    },
    {
      types: ['entity', 'url', 'variable'],
      style: {
        color: '#ffffff',
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
