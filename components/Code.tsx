import styled from 'styled-components';
import { monospace } from '../utils/fonts';

const Code = styled.code`
  border-radius: 3px;
  background: rgba(10, 10, 10, 0.1);
  display: inline-block;
  font-family: ${monospace};
  font-size: 90%;
  line-height: 1;
  padding: 0.3em 0.25em;
  text-decoration: inherit;
  vertical-align: baseline;
`;

export default Code;
