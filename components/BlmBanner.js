import React from 'react';

import styled from 'styled-components';
import rem from '../utils/rem';
import { navbarHeight } from '../utils/sizes';

const Banner = styled.a`
  align-items: center;
  background: black;
  color: white;
  display: flex;
  font-size: ${rem(15)};
  font-weight: 500;
  height: ${rem(navbarHeight)};
  justify-content: center;
  padding: 1rem 0.5rem;
  width: 100%;
`;

export const BlmBanner = () => {
  return (
    <Banner href="https://support.eji.org/give/153413/#!/donation/checkout">
      #BlackLivesMatter ✊🏿 <span style={{ textDecoration: `underline` }}>Support the Equal Justice Initiative</span>
    </Banner>
  );
};
