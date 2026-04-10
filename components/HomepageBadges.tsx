'use client';

import styled from 'styled-components';
import { theme } from '../utils/theme';

const BADGES = [
  {
    href: 'https://github.com/styled-components/styled-components',
    src: '/api/proxy/stars.svg',
    alt: 'Stars on GitHub',
  },
  {
    href: 'https://www.npmjs.com/package/styled-components',
    src: '/api/proxy/npm-v.svg',
    alt: 'Current version',
  },
  {
    href: 'https://npm-stat.com/charts.html?package=styled-components',
    src: '/api/proxy/downloads.svg',
    alt: 'Monthly downloads',
  },
];

export default function HomepageBadges() {
  return (
    <Wrapper>
      {BADGES.map(({ href, src, alt }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer nofollow">
          <Badge src={src} alt={alt} />
        </a>
      ))}
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
