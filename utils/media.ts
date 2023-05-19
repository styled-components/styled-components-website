import { css } from 'styled-components';
import { RuleSet } from 'styled-components/dist/types';

export const mobile = (inner: ReturnType<typeof css>): RuleSet<object> => css`
  @media (max-width: ${1000 / 16}em) {
    ${inner};
  }
`;

export const phone = (inner: RuleSet<object>): RuleSet<object> => css`
  @media (max-width: ${650 / 16}em) {
    ${inner};
  }
`;
