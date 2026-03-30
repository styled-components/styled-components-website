'use client';

import { usePathname } from 'next/navigation';
import styled, { css } from 'styled-components';
import { sidebarLinkStyle } from '../../utils/linkStyles';
import { formatDate } from '../../utils/formatDate';
import { postsByYear, years } from '../../utils/blog';
import { theme, font } from '../../utils/theme';
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
  padding: ${theme.space[5]} 0 ${theme.space[10]};
`;

const BackLink = styled(Link)`
  display: block;
  margin: ${theme.space[2]} ${theme.space[6]} ${theme.space[4]};
  font-size: ${theme.text.sm};
  color: ${theme.color.textSecondary};
  ${sidebarLinkStyle}
`;

const YearSection = styled.div`
  margin-bottom: ${theme.space[4]};
`;

const YearHeading = styled.h4`
  display: block;
  margin: ${theme.space[4]} ${theme.space[6]} ${theme.space[2]};
  padding-bottom: ${theme.space[1]};
  font-family: ${font.sans};
  font-size: ${theme.text.xs};
  font-weight: ${theme.fontWeight.semibold};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${theme.color.textMuted};
  border-bottom: 1px solid ${theme.color.border};
`;

const PostItem = styled.div<{ $active?: boolean }>`
  position: relative;
  margin: 0;
  padding: ${theme.space[1]} ${theme.space[6]} ${theme.space[1]} ${theme.space[8]};
  transition: background-color ${theme.duration.normal};
  border-radius: 0 ${theme.radius.md} ${theme.radius.md} 0;

  ${p =>
    p.$active &&
    css`
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: ${theme.space[1]};
        bottom: ${theme.space[1]};
        width: 2px;
        background: ${theme.color.accent};
        border-radius: ${theme.radius.full};
      }
    `}

  &:hover {
    background: ${theme.color.accentSubtle};
  }
`;

const PostLink = styled(Link)`
  display: block;
  font-family: ${font.display};
  font-size: ${theme.text.sm};
  font-weight: 500;
  color: inherit;
  ${sidebarLinkStyle}
`;

const PostDate = styled.div`
  font-family: ${font.sans};
  font-size: ${theme.text.xs};
  color: ${theme.color.textMuted};
  margin-top: 1px;
`;
