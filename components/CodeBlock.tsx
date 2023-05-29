import { Language, CodeBlock as RLR, CodeBlockProps as RLRProps } from 'react-live-runner';
import styled from 'styled-components';
import { monospace } from '../utils/fonts';
import rem from '../utils/rem';
import { Note } from './Note';
import theme from './prismTheme';

export interface CodeBlockProps extends RLRProps {
  code: string;
}

const CodeBlock = styled(({ code, ...rest }: CodeBlockProps) => {
  const language = (rest.language || 'clike').toLowerCase().trim() as Language;

  return (
    <RLR {...rest} language={language} theme={theme}>
      {code}
    </RLR>
  );
})`
  border-radius: ${rem(3)};
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  font-family: ${monospace};
  font-size: 0.8rem;
  font-weight: 300;
  margin: ${rem(35)} 0;
  padding: 1.5em !important;
  overflow-x: hidden;
  white-space: pre-wrap;
  width: 100%;

  ${Note} & {
    margin: ${rem(20)} 0;
  }
`;

export default CodeBlock;
