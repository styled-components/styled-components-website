import { css } from 'styled-components';
import { color, duration } from './tokens';

export const sidebarLinkStyle = css`
  transition: color ${duration.fast};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: ${color.accentLight};
  }

  &:active {
    opacity: 0.8;
  }
`;
