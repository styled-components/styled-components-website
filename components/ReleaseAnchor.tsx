'use client';

import styled from 'styled-components';
import Anchor from './Anchor';
import rem from '../utils/rem';

const ReleaseAnchor = styled(Anchor)`
  margin-bottom: 0;

  &::after {
    color: rosybrown;
    content: attr(data-created-at);
    display: block;
    font-size: 16px;
    margin-top: ${rem(-5)};
  }
`;

export default ReleaseAnchor;
