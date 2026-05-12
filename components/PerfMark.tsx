'use client';

import styled from 'styled-components';
import { theme } from '../utils/theme';

export const Fast = styled.span`
  color: color-mix(in oklch, ${theme.palette[7]} 70%, black);
  font-weight: ${theme.fontWeight.bold};
`;
