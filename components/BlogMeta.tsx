'use client';

import styled from 'styled-components';
import { Github, Twitter } from '@styled-icons/fa-brands';
import { Globe } from '@styled-icons/boxicons-regular';
import { color, font, text, fontWeight, duration, space } from '../utils/tokens';
import rem from '../utils/rem';
import { formatDate } from '../utils/formatDate';
import { getAuthor } from '../utils/authors';
import Link from './Link';

const MetaWrapper = styled.div`
  font-family: ${font.sans};
  font-size: ${text.sm};
  color: ${color.textSecondary};
  margin-bottom: ${space[6]};
  display: flex;
  flex-wrap: wrap;
  gap: ${rem(8)};
  align-items: center;
`;

const AuthorName = styled.span`
  font-weight: ${fontWeight.bold};
  color: ${color.textMuted};
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
  font-size: ${text.xs};
  color: ${color.accentLight};
  transition: color ${duration.normal};

  &:hover {
    color: ${color.accentLighter};
  }

  svg {
    width: ${rem(14)};
    height: ${rem(14)};
  }
`;

const OriginalLink = styled(Link)`
  font-size: ${text.xs};
  color: ${color.accentLight};
  transition: color ${duration.normal};

  &:hover {
    color: ${color.accentLighter};
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
