import styled, { css } from 'styled-components';
import { blmMetal } from '../utils/colors';
import { bodyFont, headerFont } from '../utils/fonts';
import { mobile } from '../utils/media';
import rem from '../utils/rem';
import { sidebarWidth } from '../utils/sizes';

export const Container = styled.div`
  padding-left: ${rem(sidebarWidth)};

  ${mobile(css`
    padding-left: 0;
  `)};
`;

export const Content = styled.div<{ $hero?: boolean; $moveRight?: boolean }>`
  max-width: 100ch;
  margin: 0 auto;
  padding: ${rem(90)} ${rem(60)} 0 ${rem(60)};
  box-sizing: border-box;
  font-family: ${bodyFont};
  transition: transform 150ms ease-out;

  @layer base {
    p,
    li {
      max-width: 80ch;
    }
  }

  ${p =>
    mobile(css`
      padding: ${rem(100)} ${rem(20)} ${rem(30)} ${rem(20)};
      transform: translateX(${p.$moveRight ? rem(sidebarWidth) : 0});
    `)};

  ${p =>
    p.$hero &&
    css`
      font-family: ${headerFont};
      width: 75rem;
    `};
`;

export const Title = styled.h1`
  text-align: left;
  width: 100%;
  color: ${blmMetal};
  font-size: ${rem(42)};
  font-weight: bold;
  font-family: ${headerFont};
`;

export const Header = styled.h2`
  font-size: ${rem(32)};
  font-weight: 600;
  font-family: ${headerFont};
  margin: 1.5em 0 0.5em;
`;

export const SubHeader = styled.h3`
  margin: 1.5em 0 0.5em;
  font-size: ${rem(24)};
  font-weight: 600;
  font-family: ${headerFont};
`;

export const TertiaryHeader = styled.h4`
  margin: 1.5em 0 0.5em;
  font-size: ${rem(18)};
  font-weight: 600;
  font-family: ${headerFont};
`;
