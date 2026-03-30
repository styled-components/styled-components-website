'use client';

import {
  LiveEditor,
  LiveEditorProps,
  LiveError,
  LivePreview,
  LiveProvider,
  LiveProviderProps,
} from 'react-live-runner';
import React, { useEffect, useId, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import { theme, font } from '../utils/theme';
import { phone } from '../utils/media';
import rem from '../utils/rem';
import { createScope } from '../utils/scope';
import prismTheme from './prismTheme';

export interface LiveEditProps extends Pick<LiveProviderProps, 'code' | 'scope'> {}

export default function LiveEdit({ code, scope = {} }: LiveEditProps) {
  const id = useId();
  const liveScope = useMemo(() => createScope(id), [id]);
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
        ...liveScope,
        ...scope,
      }}
      theme={prismTheme}
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
  border: 1px solid ${theme.color.border};
  box-shadow: 0 1px 3px ${theme.color.shadow};
  overflow: hidden;
  margin: ${theme.space[8]} 0;
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
  border-radius: ${theme.radius.md};
  color: ${theme.color.codeText};
  cursor: text;
  font-family: ${font.mono};
  font-size: ${theme.text.sm};
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: -0.025em;
  min-height: ${rem(400)};
  overflow-x: hidden;
  overflow-y: auto !important;
  position: relative;
  white-space: pre-wrap;
  tab-size: 2;

  /* Fallback token colors for compound types (e.g. template-string css tokens)
     that the theme resolver can't match */
  .token.comment { color: ${theme.color.codeComment}; }
  .token.punctuation { color: ${theme.color.codePunctuation}; }
  .token.constant, .token.boolean, .token.builtin { color: ${theme.color.codeConstant}; }
  .token.number { color: ${theme.color.codeNumber}; }
  .token.keyword, .token.property, .token.atrule { color: ${theme.color.codeKeyword}; }
  .token.tag, .token.operator, .token.class-name, .token.symbol { color: ${theme.color.codeTag}; }
  .token.function, .token.attr-name, .token.selector { color: ${theme.color.codeFunction}; }
  .token.string, .token.attr-value, .token.regex, .token.char { color: ${theme.color.codeString}; }
  .token.variable, .token.url, .token.entity { color: ${theme.color.codeVariable}; }

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

  .token-line {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .token-line,
  .token {
    font-family: ${font.mono};
    font-size: 1em;
    font-weight: 300;
    letter-spacing: -0.025em;
  }
`;

const StyledEditor = styled((props: Partial<LiveEditorProps>) => (
  <LiveEditor
    {...props}
    // @ts-expect-error clashing types
    theme={prismTheme}
  />
))`
  ${editorMixin};
`;

const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: ${theme.color.bg};
  color: ${theme.color.text};
  height: auto;
  overflow: hidden;
  white-space: normal;

  ${columnMixin};
`;

export const StyledError = styled(LiveError)`
  display: block;
  width: 100%;
  padding: ${rem(8)};
  background: ${theme.color.error};
  color: white;
  font-size: 0.8rem;
  font-family: ${font.sans};
  white-space: pre;
`;
