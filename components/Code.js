import styled from 'styled-components';
import { monospace } from '../utils/fonts';

const Code = styled.span`
  display: inline-block;
  font-family: ${monospace};
  font-size: 90%;
  line-height: 1.4;
  text-decoration: inherit;
  vertical-align: baseline;
`;

export default Code;
