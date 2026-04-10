'use client';

import styled from 'styled-components';
import DocsLayout from './DocsLayout';
import Link from './Link';
import { BlogDivider } from './BlogMeta';
import rem from '../utils/rem';
import { theme, font } from '../utils/theme';
import { formatDate } from '../utils/formatDate';
import { type Post, groupPostsByYear } from '../utils/blog';

export default function BlogListPage({ posts }: { posts: Post[] }) {
  const { postsByYear, years } = groupPostsByYear(posts);

  return (
    <DocsLayout title="Blog">
      <Lede>
        Articles, tutorials, and announcements from the styled-components community. Originally published on{' '}
        <Link href="https://medium.com/styled-components" variant="inline">
          Medium
        </Link>
        .
      </Lede>

      {years.map(year => (
        <YearSection key={year}>
          <Year id={year} aria-label={`Posts from ${year}`}>
            {year}
          </Year>
          <PostList>
            {postsByYear[year].map(post => (
              <PostItem key={post.slug}>
                <PostLink href={`/blog/${post.slug}`} variant="unstyled">
                  <PostTitle>{post.title}</PostTitle>
                  {post.description && <PostDescription>{post.description}</PostDescription>}
                  <PostMeta>
                    <Author>{post.author}</Author>
                    <BlogDivider />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </PostMeta>
                </PostLink>
              </PostItem>
            ))}
          </PostList>
        </YearSection>
      ))}
    </DocsLayout>
  );
}

const Lede = styled.p`
  font-family: ${font.sans};
  font-size: ${theme.text.md};
  color: ${theme.color.textSecondary};
  max-width: 60ch;
  margin-bottom: ${theme.space[16]};
`;

const YearSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 13rem) minmax(0, 1fr);
  gap: ${rem(48)};
  margin-bottom: ${theme.space[16]};

  @container content (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: ${rem(12)};
  }
`;

const Year = styled.h2`
  font-family: ${font.display};
  font-size: clamp(3rem, 7vw, 4.5rem);
  font-weight: ${theme.fontWeight.display};
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: ${theme.color.blogAccent};
  margin: 0;
  position: sticky;
  top: ${rem(90)};
  align-self: start;
  font-variant-numeric: tabular-nums;

  @container content (max-width: 700px) {
    position: static;
    font-size: clamp(2.5rem, 12vw, 3.5rem);
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostItem = styled.article`
  padding: ${rem(24)} 0;

  & + & {
    border-top: 1px solid ${theme.color.blogAccentMuted};
  }

  &:first-child {
    padding-top: ${rem(8)};
  }
`;

const PostLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const PostTitle = styled.h3`
  font-family: ${font.display};
  font-size: ${theme.text['2xl']};
  font-weight: ${theme.fontWeight.display};
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin: 0 0 ${rem(10)} 0;
  color: ${theme.color.text};
  transition: color ${theme.duration.normal} ${theme.ease.out};

  ${PostLink}:hover & {
    color: ${theme.color.blogAccent};
  }

  @container content (max-width: 600px) {
    font-size: ${theme.text.xl};
  }
`;

const PostDescription = styled.p`
  font-family: ${font.sans};
  font-size: ${theme.text.base};
  line-height: 1.55;
  margin: 0 0 ${rem(12)};
  color: ${theme.color.textSecondary};
  max-width: 62ch;
`;

const PostMeta = styled.div`
  font-family: ${font.sans};
  font-size: ${theme.text.sm};
  color: ${theme.color.textMuted};
  display: flex;
  flex-wrap: wrap;
  gap: ${rem(10)};
  align-items: baseline;
`;

const Author = styled.span`
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.color.textSecondary};
`;
