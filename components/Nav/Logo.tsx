import styled, { css } from 'styled-components';

import rem from '../../utils/rem';

const Logo = styled.div<{ $compact?: boolean }>`
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;

  background-position: center;
  background-size: contain;

  ${p =>
    p.$compact
      ? css`
          background-image: url(/icon.png);
          width: ${rem(100)};
          height: ${rem(30)};
        `
      : css`
          background-image: url(/nav-logo.png);
          width: ${rem(164)};
          height: ${rem(40)};
        `};
`;

export default Logo;
