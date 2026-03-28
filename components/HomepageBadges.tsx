'use client';

import styled from 'styled-components';
import { space } from '../utils/tokens';

export default function HomepageBadges() {
  return (
    <Wrapper>
      <a href="https://github.com/styled-components/styled-components">
        <Badge src="/api/proxy/stars.svg" alt="Stars on GitHub" />
      </a>
      <a href="https://www.npmjs.com/package/styled-components">
        <Badge src="/api/proxy/npm-v.svg" alt="Current version" />
      </a>
      <Badge src="/api/proxy/downloads.svg" alt="Monthly downloads" />
      <Badge src="/api/proxy/size.svg" alt="Gzipped size" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${space[4]};
  margin-top: ${space[6]};
  opacity: 0.85;
`;

const Badge = styled.img`
  height: 1.25em;
  vertical-align: middle;
`;
