import React from 'react';
import styled from 'styled-components';
import { Github, MediumM } from '@styled-icons/fa-brands';
import rem from '../../utils/rem';
import { navbarHeight } from '../../utils/sizes';
import Link from '../Link';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
`;

const SocialLink = styled(Link).attrs((/* props */) => ({
  unstyled: true,
}))`
  display: flex;
  margin-right: ${rem(20)};
  line-height: ${rem(navbarHeight)};
  transition: opacity 0.2s, transform 0.2s;
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
`;

const Svg = styled.svg`
  width: ${p => rem(Number(p.width))};
  height: ${p => rem(Number(p.height))};
`;

const StyledIcon = styled.div`
  && {
    width: ${p => rem(Number(p.width))};
    height: ${p => rem(Number(p.height))};
  }
`;

// const Twitter = () => (
//   <Svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" xmlnsXlink="http://www.w3.org/1999/xlink">
//     <title>twitter-logo</title>
//     <use fill="#FFF" xlinkHref="#b"/>
//     <defs>
//       <path id="b" d="M18.2 1.8l-2 .6c.6-.5 1.2-1.2 1.5-2l-2.4.8C14.7.5 13.7 0 12.6 0 10.6 0 9 1.7 9 3.8v1C6 4.4 3 3 1.3.8 1 1 .8 1.8.8 2.4c0 1.3.6 2.5 1.6 3-.6 0-1.2 0-1.7-.3 0 2 1.3 3.7 3 4H2c.5 1.6 2 2.7 3.5 2.7-1.2 1-3 1.6-4.6 1.6H0c1.7 1 3.6 1.7 5.7 1.7 7 0 10.7-6 10.7-11v-.5c.7-.5 1.3-1.2 1.8-2z"/>
//     </defs>
//   </Svg>
// )

const Spectrum = () => (
  <Svg width="14" height="14" viewBox="0 0 15 15">
    <title>spectrum</title>
    <path
      fill="#FFF"
      d="M0 6.5V1c0-.6.4-1 1-1 9 .3 13.7 5 14 14 0 .6-.4 1-1 1H8.5c-.6 0-1-.4-1-1-.3-4.4-2-6.2-6.5-6.5-.6 0-1-.4-1-1z"
    />
  </Svg>
);

const Social = props => (
  <Wrapper {...props}>
    <SocialLink href="https://spectrum.chat/styled-components/">
      <Spectrum />
    </SocialLink>
    {/* <SocialLink href="https://twitter.com/someone">
      <Twitter />
    </SocialLink> */}
    <SocialLink href="https://github.com/styled-components">
      <StyledIcon as={Github} height="18" />
    </SocialLink>
    <SocialLink href="https://medium.com/styled-components">
      <StyledIcon as={MediumM} height="18" />
    </SocialLink>
  </Wrapper>
);

export default Social;
