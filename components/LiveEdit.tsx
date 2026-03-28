'use client';

import {
  LiveEditor,
  LiveEditorProps,
  LiveError,
  LivePreview,
  LiveProvider,
  LiveProviderProps,
} from 'react-live-runner';
import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { color } from '../utils/tokens';
import { headerFont, monospace } from '../utils/fonts';
import { phone } from '../utils/media';
import rem from '../utils/rem';
import baseScope from '../utils/scope';
import theme from './prismTheme';

export interface LiveEditProps extends Pick<LiveProviderProps, 'code' | 'scope'> {}

export default function LiveEdit({ code, scope = {} }: LiveEditProps) {
  const editorRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textarea = editorRegionRef.current?.querySelector<HTMLTextAreaElement>(
      'textarea.npm__react-simple-code-editor__textarea'
    );

    if (!textarea) return;

    const hasName = textarea.hasAttribute('aria-label') || textarea.hasAttribute('aria-labelledby');
    if (!hasName) textarea.setAttribute('aria-label', 'Live code editor');
  }, []);

  return (
    <StyledProvider
      code={code}
      language="tsx"
      scope={{
        ...baseScope,
        ...scope,
      }}
      theme={theme}
    >
      <Row>
        <Code ref={editorRegionRef}>
          <StyledEditor />
        </Code>
        <StyledPreview className="notranslate" />
      </Row>

      <StyledError />
    </StyledProvider>
  );
}

const StyledProvider = styled(LiveProvider)`
  box-shadow: 1px 1px 20px var(--color-shadow);
  overflow: hidden;
  margin: var(--space-8) 0;
  text-align: left;
  position: relative;
  z-index: 10;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;

  ${phone(css`
    flex-direction: column;
  `)};
`;

const columnMixin = css`
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;

  ${phone(css`
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
    height: auto;
  `)};
`;

const Code = styled.code`
  ${columnMixin};
`;

export const editorMixin = `
  border-radius: var(--radius-md);
  color: var(--color-code-text);
  cursor: text;
  font-family: ${monospace};
  font-size: var(--text-sm);
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: normal;
  min-height: ${rem(400)};
  overflow-x: hidden;
  overflow-y: auto !important;
  position: relative;
  white-space: pre-wrap;
  tab-size: 2;

  /* Fallback token colors for compound types (e.g. template-string css tokens)
     that the theme resolver can't match */
  .token.comment { color: var(--color-code-comment); }
  .token.punctuation { color: var(--color-code-punctuation); }
  .token.constant, .token.boolean, .token.builtin { color: var(--color-code-constant); }
  .token.number { color: var(--color-code-number); }
  .token.keyword, .token.property, .token.atrule { color: var(--color-code-keyword); }
  .token.tag, .token.operator, .token.class-name, .token.symbol { color: var(--color-code-tag); }
  .token.function, .token.attr-name, .token.selector { color: var(--color-code-function); }
  .token.string, .token.attr-value, .token.regex, .token.char { color: var(--color-code-string); }
  .token.variable, .token.url, .token.entity { color: var(--color-code-variable); }
`;

const StyledEditor = styled((props: Partial<LiveEditorProps>) => (
  <LiveEditor
    {...props}
    // @ts-expect-error clashing types
    theme={theme}
  />
))`
  ${editorMixin};

  pre,
  textarea {
    font-family: ${monospace} !important;
    font-size: inherit !important;
    font-variant-ligatures: none !important;
    line-height: inherit !important;
    letter-spacing: inherit !important;
    padding: 1.5em !important;
    margin: 0 !important;
    border: 0 !important;
    outline: 0 !important;
    tab-size: 2;
    box-sizing: border-box !important;
  }

  .token-line {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;

const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: ${color.bg};
  color: ${color.text};
  height: auto;
  overflow: hidden;
  white-space: normal;

  ${columnMixin};
`;

export const StyledError = styled(LiveError)`
  display: block;
  width: 100%;
  padding: ${rem(8)};
  background: ${color.error};
  color: white;
  font-size: 0.8rem;
  font-family: ${headerFont};
  white-space: pre;
`;
