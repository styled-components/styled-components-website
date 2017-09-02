import styled, { css } from 'styled-components'

import rem from '../../utils/rem'
import { mobile } from '../../utils/media'
import { paleGrey } from '../../utils/colors'
import { headerFont } from '../../utils/fonts'
import captureScroll from '../CaptureScroll'

const Sidebar = styled.nav`
  position: fixed;
  transform: translateZ(0);
  display: block;
  z-index: 5;
  font-family: ${headerFont};

  left: 0;
  top: 0;
  bottom: 0;
  right: auto;

  width: ${rem(300)};
  height: 100%;
  background: ${paleGrey};
  box-sizing: border-box;
  color: inherit;
  overflow-y: scroll;
  transition: transform 150ms ease-out;

  ${mobile(css`
    ${p => p.isFolded ? css`
      transform: translateX(${rem(-300)});
    `: ``}
  `)}
`

export default captureScroll(Sidebar)
