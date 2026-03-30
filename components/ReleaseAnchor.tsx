'use client';

import styled from 'styled-components';
import Anchor from './Anchor';
import rem from '../utils/rem';
import { theme } from '../utils/theme';

const ReleaseAnchor = styled(Anchor)`
  && {
    margin-bottom: ${rem(5)};
  }

  & + * {
    margin-top: 0;

    > h3 {
      margin-top: ${rem(5)};
    }
  }

  &::after {
    color: ${theme.color.textMuted};
    content: attr(data-created-at);
    display: block;
    font-size: ${theme.text.base};
    margin-top: ${rem(-5)};
  }
`;

export default ReleaseAnchor;
