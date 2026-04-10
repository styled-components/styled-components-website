'use client';

import {
  LiveEditor,
  LiveEditorProps,
  LiveError,
  LivePreview,
  LiveProvider,
  LiveProviderProps,
} from 'react-live-runner';
import React, { useId, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import { theme, font } from '../utils/theme';
import { phone } from '../utils/media';
import rem from '../utils/rem';
import { createScope } from '../utils/scope';
import { useCodeEditorAriaLabel } from '../utils/useCodeEditorAriaLabel';
import prismTheme from './prismTheme';
import { highlightTSXWithTagDepth } from './liveHighlight';
import { editorMixin } from './codeMixins';

export { codeTextMixin, editorMixin } from './codeMixins';

export interface LiveEditProps extends Pick<LiveProviderProps, 'code' | 'scope'> {}

export default function LiveEdit({ code, scope = {} }: LiveEditProps) {
  const id = useId();
  const liveScope = useMemo(() => createScope(id), [id]);
  const editorRegionRef = useRef<HTMLDivElement>(null);
  useCodeEditorAriaLabel(editorRegionRef, 'Live code editor');

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

const StyledEditor = styled((props: Partial<LiveEditorProps>) => (
  <LiveEditor
    {...props}
    // prism-react-renderer's PrismTheme shape (plain-styles + token-styles
    // arrays) is structurally incompatible with react-live-runner's internal
    // theme prop — the libraries evolved independently. Runtime is fine.
    // @ts-expect-error see note above
    theme={prismTheme}
    highlight={highlightTSXWithTagDepth}
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
