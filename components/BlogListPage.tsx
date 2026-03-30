'use client';

import styled from 'styled-components';
import DocsLayout from './DocsLayout';
import Link from './Link';
import rem from '../utils/rem';
import { theme, font } from '../utils/theme';
import { linkStyle } from './Link';
import { formatDate } from '../utils/formatDate';
import { postsByYear, years } from '../utils/blog';

export default function BlogListPage() {
  return (
    <DocsLayout title="Blog" description="Articles and announcements from the styled-components team">
      <p>
        Articles, tutorials, and announcements from the styled-components community. Originally published on{' '}
        <Link href="https://medium.com/styled-components" inline>
          Medium
        </Link>
        .
      </p>

      {years.map(year => (
        <YearSection key={year}>
          <YearHeading id={year}>{year}</YearHeading>
          <PostList>
            {postsByYear[year].map(post => (
              <PostItem key={post.slug}>
                <PostLink href={`/blog/${post.slug}`} unstyled>
                  <PostTitle>{post.title}</PostTitle>
                </PostLink>
                <PostMeta>
                  <Author>{post.author}</Author>
                  <Sep />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </PostMeta>
                {post.description && <PostDescription>{post.description}</PostDescription>}
              </PostItem>
            ))}
          </PostList>
        </YearSection>
      ))}
    </DocsLayout>
  );
}

const YearSection = styled.section`
  margin-top: ${theme.space[8]};
`;

const YearHeading = styled.h2`
  font-size: ${theme.text.xl};
  font-weight: ${theme.fontWeight.bold};
  margin: 0 0 ${rem(8)} 0;
  padding-bottom: ${rem(8)};
  border-bottom: 1px solid ${theme.color.border};
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostItem = styled.div`
  padding: ${rem(20)} 0;
  border-bottom: 1px solid ${theme.color.border};

  &:last-child {
    border-bottom: none;
  }
`;

const PostLink = styled(Link)`
  ${linkStyle}
`;

const PostTitle = styled.h3`
  font-family: ${font.display};
  font-size: ${theme.text.xl};
  font-weight: ${theme.fontWeight.medium};
  margin: 0 0 ${rem(6)} 0;
  color: inherit;
  transition: color ${theme.duration.normal};

  ${PostLink}:hover & {
    opacity: 0.8;
  }

  @container content (max-width: 600px) {
    font-size: ${theme.text.lg};
  }
`;

const PostMeta = styled.div`
  font-family: ${font.sans};
  font-size: ${theme.text.sm};
  color: ${theme.color.textSecondary};
  display: flex;
  flex-wrap: wrap;
  gap: ${rem(8)};
  align-items: center;
`;

const Author = styled.span`
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.color.textMuted};
`;

const Sep = styled.span`
  &::before {
    content: '·';
  }
`;

const PostDescription = styled.p`
  font-family: ${font.sans};
  font-size: ${theme.text.base};
  margin: ${rem(8)} 0 0;
  line-height: 1.5;
  color: ${theme.color.textSecondary};

  @container content (max-width: 500px) {
    display: none;
  }
`;
