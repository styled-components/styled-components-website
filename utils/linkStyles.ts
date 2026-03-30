import { css } from 'styled-components';
import { theme } from './theme';

export const sidebarLinkStyle = css`
  transition: color ${theme.duration.fast};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: ${theme.color.accentLight};
  }

  &:active {
    opacity: 0.8;
  }
`;
