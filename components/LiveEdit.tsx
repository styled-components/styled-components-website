import {
  LiveEditor,
  LiveEditorProps,
  LiveError,
  LivePreview,
  LiveProvider,
  LiveProviderProps,
} from 'react-live-runner';
import styled, { css } from 'styled-components';
import { red } from '../utils/colors';
import { headerFont, monospace } from '../utils/fonts';
import { phone } from '../utils/media';
import rem from '../utils/rem';
import baseScope from '../utils/scope';
import theme from './prismTheme';

export interface LiveEditProps extends Pick<LiveProviderProps, 'code' | 'scope'> {}

export default function LiveEdit({ code, scope = {} }: LiveEditProps) {
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
        <Code>
          <StyledEditor />
        </Code>
        <StyledPreview className="notranslate" />
      </Row>

      <StyledError />
    </StyledProvider>
  );
}

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

const Code = styled.code`
  ${columnMixin};
`;

export const editorMixin = `
  border-radius: 3px;
  color: white;
  cursor: text;
  font-family: ${monospace};
  font-size: 0.8rem;
  font-weight: 300;
  min-height: ${rem(400)};
  overflow-x: hidden;
  overflow-y: auto !important;
  position: relative;
  white-space: pre-wrap;
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
    padding: 1.5em 1.5em !important;
  }
`;

const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  white-space: normal;

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
