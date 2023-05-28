import { LiveEditor, LiveError, LivePreview, LiveProvider, LiveProviderProps } from 'react-live-runner';
import styled, { css } from 'styled-components';
import { darkGrey, red } from '../utils/colors';
import { headerFont, monospace } from '../utils/fonts';
import { phone } from '../utils/media';
import rem from '../utils/rem';
import baseScope from '../utils/scope';

export interface LiveEditProps extends Pick<LiveProviderProps, 'code' | 'scope'> {}

export default function LiveEdit({ code, scope = {} }: LiveEditProps) {
  return (
    <StyledProvider
      code={code}
      scope={{
        ...baseScope,
        ...scope,
      }}
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
  background: ${darkGrey};
  font-size: 0.8rem;
  font-family: ${monospace};
  font-weight: 300;
  min-height: ${rem(400)};
  overflow-y: auto !important;
  overflow-x: hidden;
  cursor: text;
  color: white;
  white-space: pre-wrap;
  position: relative;
`;

const StyledEditor = styled(LiveEditor)`
  ${editorMixin};
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
