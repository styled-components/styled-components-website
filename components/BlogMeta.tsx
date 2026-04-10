'use client';

import styled from 'styled-components';
import { Github, Twitter } from '@styled-icons/fa-brands';
import { Globe } from '@styled-icons/boxicons-regular';
import { theme, font } from '../utils/theme';
import rem from '../utils/rem';
import { formatDate } from '../utils/formatDate';
import { getAuthor } from '../utils/authors';
import Link from './Link';

export function BlogByline({ author, date }: { author: string; date: string }) {
  return (
    <Byline>
      <AuthorName>{author}</AuthorName>
      <BlogDivider />
      <time dateTime={date}>{formatDate(date)}</time>
    </Byline>
  );
}

export function BlogColophon({ author, originalUrl }: { author: string; originalUrl: string }) {
  const authorData = getAuthor(author);
  const websiteIsGithub = authorData.website?.includes('github.com');
  const showGithub = authorData.github && !websiteIsGithub;

  const hasLinks = authorData.website || showGithub || authorData.twitter;

  return (
    <Colophon>
      <ColophonRule aria-hidden="true" />
      <ColophonRow>
        <ColophonLabel>About the author</ColophonLabel>
        <ColophonAuthor>{author}</ColophonAuthor>
      </ColophonRow>
      {hasLinks && (
        <ColophonLinks>
          {authorData.website && (
            <IconLink href={authorData.website} variant="inline">
              <Globe />
              {authorData.websiteHost}
            </IconLink>
          )}
          {showGithub && (
            <IconLink
              href={`https://github.com/${authorData.github}`}
              variant="inline"
              aria-label={`${author} on GitHub`}
            >
              <Github />
              {authorData.github}
            </IconLink>
          )}
          {authorData.twitter && (
            <IconLink href={`https://x.com/${authorData.twitter}`} variant="inline" aria-label={`${author} on X`}>
              <Twitter />
              {authorData.twitter}
            </IconLink>
          )}
        </ColophonLinks>
      )}
      {originalUrl && new URL(originalUrl).hostname !== 'styled-components.com' && (
        <ColophonNote>
          Originally published on{' '}
          <Link href={originalUrl} variant="inline">
            {new URL(originalUrl).hostname.replace('www.', '')}
          </Link>
          .
        </ColophonNote>
      )}
    </Colophon>
  );
}

const Byline = styled.div`
  font-family: ${font.sans};
  font-size: ${theme.text.md};
  color: ${theme.color.textMuted};
  margin-bottom: ${theme.space[12]};
  display: flex;
  flex-wrap: wrap;
  gap: ${rem(10)};
  align-items: baseline;
`;

const AuthorName = styled.span`
  font-family: ${font.display};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.text};
  font-size: ${theme.text.lg};
  letter-spacing: -0.01em;
`;

export const BlogDivider = styled.span.attrs({ 'aria-hidden': 'true', children: '—' })`
  color: ${theme.color.blogAccentMuted};
`;

const Colophon = styled.footer`
  margin-top: ${theme.space[16]};
  padding-top: ${theme.space[10]};
  font-family: ${font.sans};
`;

const ColophonRule = styled.div`
  width: ${rem(64)};
  height: 2px;
  background: ${theme.color.blogAccent};
  opacity: 0.6;
  margin-bottom: ${theme.space[8]};
`;

const ColophonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(4)};
  margin-bottom: ${theme.space[4]};
`;

const ColophonLabel = styled.span`
  font-size: ${theme.text.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.color.blogAccent};
  font-weight: ${theme.fontWeight.semibold};
`;

const ColophonAuthor = styled.span`
  font-family: ${font.display};
  font-size: ${theme.text.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.text};
  letter-spacing: -0.01em;
`;

const ColophonLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${rem(16)};
  margin-bottom: ${theme.space[6]};
`;

const IconLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${rem(6)};
  font-size: ${theme.text.sm};
  color: ${theme.color.textSecondary};
  transition: color ${theme.duration.normal};

  &:hover {
    color: ${theme.color.blogAccent};
  }

  svg {
    width: ${rem(14)};
    height: ${rem(14)};
  }
`;

const ColophonNote = styled.p`
  font-size: ${theme.text.sm};
  color: ${theme.color.textMuted};
  margin: 0;
`;
