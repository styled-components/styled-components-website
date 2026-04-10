'use client';

import styled from 'styled-components';
import { theme, font } from '../utils/theme';

const Code = styled.code`
  border-radius: ${theme.radius.sm};
  background: ${theme.color.accentSubtle};
  display: inline-block;
  font-family: ${font.mono};
  font-size: 90%;
  line-height: 1;
  padding: 0.3em 0.25em;
  text-decoration: inherit;
  vertical-align: baseline;
`;

export default Code;
