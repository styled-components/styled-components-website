'use client';

import styled from 'styled-components';
import { Github, Twitter } from '@styled-icons/fa-brands';
import { Globe } from '@styled-icons/boxicons-regular';
import { theme, font } from '../utils/theme';
import rem from '../utils/rem';
import { formatDate } from '../utils/formatDate';
import { getAuthor } from '../utils/authors';
import Link from './Link';

const MetaWrapper = styled.div`
  font-family: ${font.sans};
  font-size: ${theme.text.sm};
  color: ${theme.color.textSecondary};
  margin-bottom: ${theme.space[6]};
  display: flex;
  flex-wrap: wrap;
  gap: ${rem(8)};
  align-items: center;
`;

const AuthorName = styled.span`
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.textMuted};
`;

const Separator = styled.span`
  &::before {
    content: '·';
  }
`;

const IconLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${rem(5)};
  font-size: ${theme.text.xs};
  color: ${theme.color.accentLight};
  transition: color ${theme.duration.normal};

  &:hover {
    color: ${theme.color.accentLighter};
  }

  svg {
    width: ${rem(14)};
    height: ${rem(14)};
  }
`;

const OriginalLink = styled(Link)`
  font-size: ${theme.text.xs};
  color: ${theme.color.accentLight};
  transition: color ${theme.duration.normal};

  &:hover {
    color: ${theme.color.accentLighter};
  }
`;

export default function BlogMeta({ author, date, originalUrl }: { author: string; date: string; originalUrl: string }) {
  const formattedDate = formatDate(date);
  const authorData = getAuthor(author);

  const websiteIsGithub = authorData.website?.includes('github.com');
  const showGithub = authorData.github && !websiteIsGithub;

  return (
    <MetaWrapper>
      <time dateTime={date}>{formattedDate}</time>
      <Separator />
      <AuthorName>{author}</AuthorName>
      {authorData.website && (
        <IconLink href={authorData.website} inline>
          <Globe />
          {authorData.websiteHost}
        </IconLink>
      )}
      {showGithub && (
        <IconLink href={`https://github.com/${authorData.github}`} inline aria-label={`${author} on GitHub`}>
          <Github />
        </IconLink>
      )}
      {authorData.twitter && (
        <IconLink href={`https://x.com/${authorData.twitter}`} inline aria-label={`${author} on X`}>
          <Twitter />
        </IconLink>
      )}
      <Separator />
      <OriginalLink href={originalUrl} inline>
        Originally published on Medium
      </OriginalLink>
    </MetaWrapper>
  );
}
