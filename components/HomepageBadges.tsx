'use client';

import styled from 'styled-components';
import { theme } from '../utils/theme';

export default function HomepageBadges() {
  return (
    <Wrapper>
      <a
        href="https://github.com/styled-components/styled-components"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Badge src="/api/proxy/stars.svg" alt="Stars on GitHub" />
      </a>
      <a href="https://www.npmjs.com/package/styled-components" target="_blank" rel="noopener noreferrer nofollow">
        <Badge src="/api/proxy/npm-v.svg" alt="Current version" />
      </a>
      <a
        href="https://npm-stat.com/charts.html?package=styled-components"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Badge src="/api/proxy/downloads.svg" alt="Monthly downloads" />
      </a>
      <Badge src="/api/proxy/size.svg" alt="Gzipped size" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${theme.space[3]};
  margin-top: ${theme.space[6]};
  opacity: 0.85;
`;

const Badge = styled.img`
  height: 1.25em;
  vertical-align: middle;
`;
