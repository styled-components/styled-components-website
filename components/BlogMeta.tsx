'use client';

import styled from 'styled-components';
import { Github } from '@styled-icons/fa-brands';
import { ChevronDown, Globe } from '@styled-icons/boxicons-regular';
import { theme, font } from '../utils/theme';
import rem from '../utils/rem';
import { formatDate } from '../utils/formatDate';
import { getAuthor } from '../utils/authors';

export function BlogByline({
  author,
  date,
  originalUrl,
  showJumpToComments = false,
}: {
  author: string;
  date: string;
  originalUrl?: string;
  showJumpToComments?: boolean;
}) {
  const authorData = getAuthor(author);
  const websiteIsGithub = authorData.website?.includes('github.com');
  const showGithub = authorData.github && !websiteIsGithub;
  const crossPosted = originalUrl && new URL(originalUrl).hostname !== 'styled-components.com';

  return (
    <Byline>
      <AuthorName>{author}</AuthorName>
      {(authorData.website || showGithub || authorData.twitter) && (
        <SocialLinks>
          {authorData.website && (
            <SocialIcon href={authorData.website} target="_blank" rel="noopener" aria-label={`${author} website`}>
              <Globe />
            </SocialIcon>
          )}
          {showGithub && (
            <SocialIcon
              href={`https://github.com/${authorData.github}`}
              target="_blank"
              rel="noopener"
              aria-label={`${author} on GitHub`}
            >
              <Github />
            </SocialIcon>
          )}
          {authorData.twitter && (
            <SocialIcon
              href={`https://x.com/${authorData.twitter}`}
              target="_blank"
              rel="noopener"
              aria-label={`${author} on X`}
            >
              <XLogo />
            </SocialIcon>
          )}
        </SocialLinks>
      )}
      <BlogDivider />
      <time dateTime={date}>{formatDate(date)}</time>
      {crossPosted && (
        <>
          <BlogDivider />
          <CrossPostNote>
            Originally on{' '}
            <CrossPostLink href={originalUrl} target="_blank" rel="noopener">
              {new URL(originalUrl).hostname.replace('www.', '')}
            </CrossPostLink>
          </CrossPostNote>
        </>
      )}
      {showJumpToComments && (
        <JumpToComments href="#comments">
          Jump to comments
          <ChevronDown />
        </JumpToComments>
      )}
    </Byline>
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

const SocialLinks = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${rem(8)};
  align-self: center;
`;

const SocialIcon = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${theme.color.textMuted};
  transition: color ${theme.duration.fast};

  &:hover,
  &:focus-visible {
    color: ${theme.color.blogAccent};
  }

  svg {
    width: ${rem(18)};
    height: ${rem(18)};
  }
`;

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const CrossPostNote = styled.span`
  font-size: ${theme.text.sm};
  color: ${theme.color.textMuted};
`;

const CrossPostLink = styled.a`
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dotted ${theme.color.textMuted};
  transition:
    color ${theme.duration.fast},
    border-color ${theme.duration.fast};

  &:hover,
  &:focus-visible {
    color: ${theme.color.blogAccent};
    border-bottom-color: ${theme.color.blogAccent};
  }
`;

const JumpToComments = styled.a`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: ${rem(4)};
  font-size: ${theme.text.sm};
  color: ${theme.color.textMuted};
  text-decoration: none;
  transition: color ${theme.duration.fast};

  &:hover,
  &:focus-visible {
    color: ${theme.color.blogAccent};
  }

  svg {
    width: ${rem(14)};
    height: ${rem(14)};
  }
`;

export const BlogDivider = styled.span.attrs({ 'aria-hidden': 'true', children: '·' })`
  color: ${theme.color.blogAccentMuted};
`;

export const ColophonRule = styled.div`
  width: ${rem(64)};
  height: 2px;
  background: ${theme.color.blogAccent};
  opacity: 0.6;
  margin-bottom: ${theme.space[8]};
`;
