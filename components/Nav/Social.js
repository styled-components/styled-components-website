import React from 'react'
import styled from 'styled-components'

import rem from '../../utils/rem'
import { navbarHeight } from '../../utils/sizes'
import Link from '../Link'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
`

const SocialLink = styled(Link).attrs({
  unstyled: true,
})`
  display: inline-block;
  margin-right: ${rem(20)};
  line-height: ${rem(navbarHeight)};
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:hover,
  &:focus {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }

  svg {
    path {
      fill: currentColor;
    }
  }
`

const Svg = styled.svg`
  width: ${p => rem(Number(p.width))};
  height: ${p => rem(Number(p.height))};
`

const Github = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>github-logo</title>
    <use fill="#FFF" xlinkHref="#a"/>
    <defs>
      <path id="a" d="M15.86 4.34c-.76-1.335-1.79-2.392-3.093-3.17C11.463.39 10.042 0 8.5 0 6.958 0 5.536.39 4.233 1.17 2.93 1.947 1.9 3.004 1.14 4.34.38 5.674 0 7.132 0 8.713c0 1.898.54 3.606 1.62 5.122 1.082 1.517 2.48 2.566 4.19 3.148.2.038.347.01.443-.08.096-.09.144-.203.144-.34l-.006-.612v-1l-.25.05c-.16.03-.36.05-.61.04-.24 0-.5-.03-.77-.08-.26-.05-.51-.16-.74-.34-.23-.18-.39-.41-.49-.7l-.11-.26c-.07-.17-.19-.36-.35-.58-.16-.21-.32-.35-.48-.43l-.08-.05c-.05-.04-.09-.08-.14-.132-.04-.053-.08-.106-.1-.16-.02-.053 0-.097.06-.13.06-.035.17-.052.32-.052l.22.036c.15.03.33.12.55.27.22.154.4.35.54.59.17.31.375.55.615.71.24.164.484.245.727.245s.456-.02.63-.056c.18-.037.346-.094.5-.17.067-.507.248-.896.54-1.17-.42-.043-.795-.112-1.13-.203-.34-.09-.685-.24-1.04-.44-.36-.2-.657-.455-.894-.76-.234-.3-.43-.7-.58-1.19-.15-.49-.225-1.06-.225-1.7 0-.917.29-1.695.875-2.34-.27-.69-.244-1.46.08-2.313.214-.07.53-.015.95.155.42.17.73.314.926.435.195.12.35.225.47.308.684-.2 1.394-.3 2.124-.3s1.44.1 2.124.297l.42-.27c.288-.184.628-.35 1.02-.5.39-.15.69-.195.895-.126.334.857.364 1.63.09 2.317.584.645.875 1.42.875 2.34 0 .64-.072 1.21-.223 1.707-.15.5-.343.897-.583 1.196-.24.298-.54.55-.896.754-.355.202-.702.35-1.04.44-.334.09-.712.16-1.132.205.38.34.57.875.57 1.61v2.39c0 .136.045.25.137.34.096.09.24.118.44.08 1.71-.582 3.11-1.632 4.19-3.15 1.06-1.525 1.6-3.235 1.6-5.13 0-1.58-.38-3.04-1.14-4.37z"/>
    </defs>
  </Svg>
)

const Twitter = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>twitter-logo</title>
    <use fill="#FFF" xlinkHref="#b"/>
    <defs>
      <path id="b" d="M18.2 1.8l-2 .6c.6-.5 1.2-1.2 1.5-2l-2.4.8C14.7.5 13.7 0 12.6 0 10.6 0 9 1.7 9 3.8v1C6 4.4 3 3 1.3.8 1 1 .8 1.8.8 2.4c0 1.3.6 2.5 1.6 3-.6 0-1.2 0-1.7-.3 0 2 1.3 3.7 3 4H2c.5 1.6 2 2.7 3.5 2.7-1.2 1-3 1.6-4.6 1.6H0c1.7 1 3.6 1.7 5.7 1.7 7 0 10.7-6 10.7-11v-.5c.7-.5 1.3-1.2 1.8-2z"/>
    </defs>
  </Svg>
)

const Spectrum = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 15 15" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>spectrum-logo</title>
    <use fill="#FFF" xlinkHref="#spectrum"/>
    <defs>
      <path id="spectrum" d="M0 6.5V1c0-.6.4-1 1-1 9 .3 13.7 5 14 14 0 .6-.4 1-1 1H8.5c-.6 0-1-.4-1-1-.3-4.4-2-6.2-6.5-6.5-.6 0-1-.4-1-1z"/>
    </defs>
  </Svg>
)

const Social = () => (
  <Wrapper>
    <SocialLink href="https://spectrum.chat/styled-components/">
      <Spectrum />
    </SocialLink>
    <SocialLink href="https://twitter.com/someone">
      <Twitter />
    </SocialLink>
    <SocialLink href="https://github.com/styled-components">
      <Github />
    </SocialLink>
  </Wrapper>
)

export default Social
