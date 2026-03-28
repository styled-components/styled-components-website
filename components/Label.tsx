'use client';

import styled from 'styled-components';
import { color, font, radius, text } from '../utils/tokens';
import rem from '../utils/rem';

export const LabelGroup = styled.div`
  display: inline-block;
  margin-left: 0.5rem;
  position: relative;
  bottom: ${rem(3)};
`;

const Label = styled.small<{ $isVersion?: boolean; children?: React.ReactNode }>`
  display: inline-block;
  background: ${p => (p.$isVersion ? color.accent : color.surfaceRaised)};
  color: ${p => (p.$isVersion ? 'white' : color.text)};
  font-size: ${text.xs};
  font-family: ${font.sans};
  border-radius: ${radius.md};
  padding: ${rem(1)} ${rem(5)};
  vertical-align: middle;
`;

export default Label;
