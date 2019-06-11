import React from 'react';
import styled, { createGlobalStyle, css, keyframes, withTheme, ThemeProvider } from 'styled-components';
import rem from '../utils/rem';
import { darkGrey, red } from '../utils/colors';
import { phone } from '../utils/media';
import { headerFont, monospace } from '../utils/fonts';

import '../utils/prismTemplateString';

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const StyledProvider = styled(LiveProvider)`
  box-shadow: ${rem(1)} ${rem(1)} ${rem(20)} rgba(20, 20, 20, 0.27);
  overflow: hidden;
  margin: ${rem(35)} 0;
  text-align: left;
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

export const editorMixin = `
  background: ${darkGrey};
  font-size: 0.8rem;
  font-family: ${monospace};
  font-weight: 300;
  height: ${rem(400)};
  overflow-y: auto !important;
  overflow-x: hidden;
  cursor: text;
  white-space: pre-wrap;
  position: relative;
`;

const StyledEditor = styled(LiveEditor)`
  ${editorMixin};
  ${columnMixin};
`;

const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;

  ${columnMixin};
`;

export const StyledError = styled(LiveError)`
  display: block;
  width: 100%;
  padding: ${rem(8)};
  background: ${red};
  color: white;
  font-size: 0.8rem;
  font-family: ${headerFont};
  white-space: pre;
`;

const LiveEdit = ({ noInline, code, scope = {} }) => (
  <StyledProvider
    code={code}
    noInline={noInline}
    mountStylesheet={false}
    scope={{
      ...scope,
      createGlobalStyle,
      css,
      keyframes,
      styled,
      ThemeProvider,
      withTheme,
    }}
  >
    <Row>
      <StyledEditor />
      <StyledPreview />
    </Row>

    <StyledError />
  </StyledProvider>
);

export default LiveEdit;
