import styled, { css } from 'styled-components';
import { theme } from '../../utils/theme';

export const AlignCenter = styled.div`
  text-align: center;
`;

export const Badge = styled.img`
  margin: 0 0.5em 1em;
  height: 1.5em;
`;

export const ExampleButton = styled.button<{ $primary?: boolean }>`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0.5em 1em;
  background: transparent;
  color: ${theme.color.brandPink};
  border: 2px solid ${theme.color.brandPink};

  ${p =>
    p.$primary &&
    css`
      background: ${theme.color.brandPink};
      color: ${theme.color.heroText};
    `};
`;

export const SecondButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  background: transparent;
  color: ${theme.color.brandPink};
  border: 2px solid ${theme.color.brandPink};
`;
