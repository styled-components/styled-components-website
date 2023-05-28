import styled, { css } from 'styled-components';
import { palepink } from '../../utils/colors';

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
  color: ${palepink};
  border: 2px solid ${palepink};

  ${p =>
    p.$primary &&
    css`
      background: ${palepink};
      color: white;
    `};
`;

export const SecondButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  background: transparent;
  color: ${palepink};
  border: 2px solid ${palepink};
`;
