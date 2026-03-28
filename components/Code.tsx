'use client';

import styled from 'styled-components';
import { color, font, radius } from '../utils/tokens';

const Code = styled.code`
  border-radius: ${radius.sm};
  background: ${color.accentSubtle};
  display: inline-block;
  font-family: ${font.mono};
  font-size: 90%;
  line-height: 1;
  padding: 0.3em 0.25em;
  text-decoration: inherit;
  vertical-align: baseline;
`;

export default Code;
