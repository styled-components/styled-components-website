'use client';

import { usePathname } from 'next/navigation';
import styled, { css } from 'styled-components';
import { sidebarLinkStyle } from '../../utils/linkStyles';
import { formatDate } from '../../utils/formatDate';
import { postsByYear, years } from '../../utils/blog';
import { color, duration, font, text, space, radius, fontWeight } from '../../utils/tokens';
import Link from '../Link';

export default function BlogSidebarMenu() {
  const pathname = usePathname();
  const isIndex = pathname === '/blog';

  return (
    <MenuInner>
      {!isIndex && (
        <BackLink href="/blog" unstyled>
          &larr; All Posts
        </BackLink>
      )}

      {years.map(year => (
        <YearSection key={year}>
          <YearHeading>{year}</YearHeading>
          {postsByYear[year].map(post => {
            const isActive = pathname === `/blog/${post.slug}`;
            return (
              <PostItem key={post.slug} $active={isActive} aria-current={isActive ? 'page' : undefined}>
                <PostLink href={`/blog/${post.slug}`} unstyled>
                  {post.title}
                </PostLink>
                <PostDate>{formatDate(post.date, 'short')}</PostDate>
              </PostItem>
            );
          })}
        </YearSection>
      ))}
    </MenuInner>
  );
}

const MenuInner = styled.div`
  display: block;
  box-sizing: border-box;
  padding: ${space[5]} 0 ${space[10]};
`;

const BackLink = styled(Link)`
  display: block;
  margin: ${space[2]} ${space[6]} ${space[4]};
  font-size: ${text.sm};
  color: ${color.textSecondary};
  ${sidebarLinkStyle}
`;

const YearSection = styled.div`
  margin-bottom: ${space[4]};
`;

const YearHeading = styled.h4`
  display: block;
  margin: ${space[4]} ${space[6]} ${space[2]};
  padding-bottom: ${space[1]};
  font-family: ${font.sans};
  font-size: ${text.xs};
  font-weight: ${fontWeight.semibold};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${color.textMuted};
  border-bottom: 1px solid ${color.border};
`;

const PostItem = styled.div<{ $active?: boolean }>`
  position: relative;
  margin: 0;
  padding: ${space[1]} ${space[6]} ${space[1]} ${space[8]};
  transition: background-color ${duration.normal};
  border-radius: 0 ${radius.md} ${radius.md} 0;

  ${p =>
    p.$active &&
    css`
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: ${space[1]};
        bottom: ${space[1]};
        width: 2px;
        background: ${color.accent};
        border-radius: ${radius.full};
      }
    `}

  &:hover {
    background: ${color.accentSubtle};
  }
`;

const PostLink = styled(Link)`
  display: block;
  font-family: ${font.display};
  font-size: ${text.sm};
  font-weight: 500;
  color: inherit;
  ${sidebarLinkStyle}
`;

const PostDate = styled.div`
  font-family: ${font.sans};
  font-size: ${text.xs};
  color: ${color.textMuted};
  margin-top: 1px;
`;
