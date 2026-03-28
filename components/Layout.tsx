'use client';

import styled, { css } from 'styled-components';
import { color, font, text, fontWeight, leading, layout, space } from '../utils/tokens';
import { mobile } from '../utils/media';

export const Container = styled.div`
  padding-left: ${layout.sidebarWidth};

  ${mobile(css`
    padding-left: 0;
  `)};
`;

export const Content = styled.div<{ $hero?: boolean; $moveRight?: boolean; children?: React.ReactNode }>`
  box-sizing: border-box;
  font-family: ${font.sans};
  margin: 0 auto;
  max-width: 120ch;
  padding: ${space[16]} ${space[16]} 0 ${space[16]};
  transition: transform 150ms ease-out;
  width: 100%;
  container-type: inline-size;
  container-name: content;

  @layer base {
    p,
    li {
      max-width: 100ch;
    }
  }

  ${p =>
    mobile(css`
      padding: ${space[20]} ${space[4]} ${space[6]} ${space[4]};
      transform: translateX(${p.$moveRight ? layout.sidebarWidth : '0'});
    `)};

  ${p =>
    p.$hero
      ? css`
          width: auto;
          container-type: normal;
        `
      : ''};
`;

export const Title = styled.h1`
  text-align: left;
  width: 100%;
  color: ${color.text};
  font-size: ${text['3xl']};
  font-weight: 800;
  font-family: ${font.display};
  line-height: ${leading.tight};
  margin-bottom: 0.4em;

  + h2 {
    margin-top: -0.5em;
  }
`;

export const Header = styled.h2`
  font-size: ${text.xl};
  font-weight: ${fontWeight.semibold};
  font-family: ${font.sans};
  margin: 2em 0 0.75em;

  + h2,
  + h3,
  + h4 {
    margin-top: 0.5em;
  }
`;

export const SubHeader = styled.h3`
  margin: 1.75em 0 0.75em;
  font-size: ${text.lg};
  font-weight: ${fontWeight.semibold};
  font-family: ${font.sans};

  + h3,
  + h4 {
    margin-top: 0.5em;
  }
`;

export const TertiaryHeader = styled.h4`
  margin: 1.5em 0 0.5em;
  font-size: ${text.md};
  font-weight: ${fontWeight.semibold};
  font-family: ${font.sans};
`;
