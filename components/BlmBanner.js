import React from 'react';

import styled from 'styled-components';
import rem from '../utils/rem';
import { navbarHeight } from '../utils/sizes';

const Banner = styled.a`
  top: 0;
  height: ${rem(navbarHeight)};
  background: black;
  width: 100%;
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BlmBanner = () => {
  return (
    <Banner href="https://support.eji.org/give/153413/#!/donation/checkout">
      #BlackLivesMatter ✊🏿 <span style={{ textDecoration: `underline` }}>Support the Equal Justice Initiative</span>
    </Banner>
  );
};
