import styled, { css } from 'styled-components';
import { color, font } from '../../utils/tokens';
import { mobile } from '../../utils/media';
import rem from '../../utils/rem';
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
  top: ${rem(navbarHeight)};
  bottom: 0;
  right: auto;
  width: ${rem(sidebarWidth)};
  background: ${color.surface};
  border-right: 1px solid color-mix(in oklch, ${color.text} 8%, ${color.surface});
  box-sizing: border-box;
  color: ${color.text};
  overflow-y: auto;
  transition: transform 150ms ease-out;

  ${mobile(css<SidebarProps>`
    ${p =>
      p.$isFolded
        ? css`
            transform: translateX(${rem(-sidebarWidth)});
          `
        : ``};
  `)};
`;

export default captureScroll(Sidebar);
