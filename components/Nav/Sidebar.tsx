import styled, { css } from 'styled-components';
import { theme, font } from '../../utils/theme';
import { mobile } from '../../utils/media';
import { navbarHeight, sidebarWidth } from '../../utils/sizes';
import captureScroll from '../CaptureScroll';

export interface SidebarProps {
  $isFolded?: boolean;
  children?: React.ReactNode;
}

const Sidebar = styled.nav.attrs({ 'aria-label': 'Documentation sidebar' })<SidebarProps>`
  position: fixed;
  transform: translateZ(0);
  display: block;
  z-index: 30;
  font-family: ${font.sans};

  left: 0;
  top: ${navbarHeight}px;
  bottom: 0;
  right: auto;
  width: ${sidebarWidth}px;
  background: ${theme.color.surface};
  border-right: 1px solid color-mix(in oklch, ${theme.color.text} 8%, ${theme.color.surface});
  box-sizing: border-box;
  color: ${theme.color.text};
  overflow-y: auto;
  transition: transform 150ms ease-out;

  ${mobile(css<SidebarProps>`
    ${p =>
      p.$isFolded
        ? css`
            transform: translateX(${-sidebarWidth}px);
          `
        : ``};
  `)};
`;

export default captureScroll(Sidebar);
