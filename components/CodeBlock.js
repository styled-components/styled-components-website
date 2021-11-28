import React from 'react';
import { Editor } from 'react-live';
import styled from 'styled-components';
import { darkGrey } from '../utils/colors';
import { monospace } from '../utils/fonts';
import rem from '../utils/rem';
import { Note } from './Note';

const CodeBlock = styled((props) => {
  const language = (props.language || 'clike').toLowerCase().trim();

  return <Editor {...props} disabled language={language} />;
})`
  background: ${darkGrey};
  font-size: 0.8rem;
  font-family: ${monospace};
  font-weight: 300;
  white-space: pre-wrap;

  border-radius: ${rem(3)};
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  margin: ${rem(35)} 0;

  overflow-x: hidden;

  ${Note} & {
    margin: ${rem(20)} 0;
  }
`;

export default CodeBlock;
