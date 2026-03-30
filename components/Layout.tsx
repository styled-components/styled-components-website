'use client';

import styled, { css } from 'styled-components';
import { theme, font } from '../utils/theme';
import { mobile } from '../utils/media';

export const Container = styled.div`
  padding-left: ${theme.layout.sidebar};

  ${mobile(css`
    padding-left: 0;
  `)};
`;

export const Content = styled.div<{ $hero?: boolean; $moveRight?: boolean; children?: React.ReactNode }>`
  box-sizing: border-box;
  font-family: ${font.sans};
  margin: 0 auto;
  max-width: 120ch;
  padding: ${theme.space[16]} ${theme.layout.gutter} 0 ${theme.layout.gutter};
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
      padding: ${theme.space[20]} ${theme.layout.gutter} ${theme.space[6]} ${theme.layout.gutter};
      transform: translateX(${p.$moveRight ? theme.layout.sidebar : '0'});
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
  color: ${theme.color.text};
  font-size: ${theme.text['3xl']};
  font-weight: ${theme.fontWeight.display};
  font-family: ${font.display};
  line-height: ${theme.leading.tight};
  margin-bottom: 0.4em;

  + h2 {
    margin-top: -0.5em;
  }
`;

export const Header = styled.h2`
  font-size: ${theme.text.xl};
  font-weight: ${theme.fontWeight.bold};
  font-family: ${font.display};
  margin: 2em 0 0.75em;

  + h2,
  + h3,
  + h4 {
    margin-top: 0.5em;
  }
`;

export const SubHeader = styled.h3`
  margin: 1.75em 0 0.75em;
  font-size: ${theme.text.lg};
  font-weight: ${theme.fontWeight.semibold};
  font-family: ${font.sans};

  + h3,
  + h4 {
    margin-top: 0.5em;
  }
`;

export const TertiaryHeader = styled.h4`
  margin: 1.5em 0 0.5em;
  font-size: ${theme.text.md};
  font-weight: ${theme.fontWeight.semibold};
  font-family: ${font.sans};
`;
