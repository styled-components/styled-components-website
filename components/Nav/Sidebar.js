import styled, { css } from 'styled-components';

import rem from '../../utils/rem';
import { mobile } from '../../utils/media';
import { paleGrey } from '../../utils/colors';
import { sidebarWidth, navbarHeight } from '../../utils/sizes';
import { headerFont } from '../../utils/fonts';
import captureScroll from '../CaptureScroll';

const Sidebar = styled.nav`
  position: fixed;
  transform: translateZ(0);
  display: block;
  z-index: 1;
  font-family: ${headerFont};

  left: 0;
  top: ${rem(navbarHeight)};
  bottom: 0;
  right: auto;
  width: ${rem(sidebarWidth)};
  background: ${paleGrey};
  box-sizing: border-box;
  color: inherit;
  overflow-y: auto;
  transition: transform 150ms ease-out;

  ${mobile(css`
    ${p =>
      p.isFolded
        ? css`
            transform: translateX(${rem(-sidebarWidth)});
          `
        : ``};
  `)};
`;

export default captureScroll(Sidebar);
