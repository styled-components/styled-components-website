'use client';

import styled, { css } from 'styled-components';
import Link from './Link';
import rem from '../utils/rem';
import { theme, font } from '../utils/theme';
import { mobile } from '../utils/media';
import { formatDate } from '../utils/formatDate';
import posts from '@/sections/blog/posts.json';

const latestPost = posts[0];

const Card = styled(Link)`
  display: inline-flex;
  gap: ${theme.space[5]};
  align-items: flex-start;
  max-width: max-content;
  margin: ${theme.space[6]} 0;
  padding: ${theme.space[4]} ${theme.space[5]};
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.color.border};
  background: ${theme.color.surfaceRaised};
  position: relative;
  z-index: 20;
  text-decoration: none;
  text-align: left;
  color: inherit;
  font-family: ${font.sans};
  transition: background ${theme.duration.normal}, border-color ${theme.duration.normal},
    transform ${theme.duration.fast};

  &:hover {
    background: ${theme.color.accentSubtle};
    border-color: ${theme.color.accent};
    transform: translateY(-1px);
  }

  ${mobile(css`
    margin: ${theme.space[4]} 0;
    padding: ${theme.space[3]} ${theme.space[4]};
    gap: ${theme.space[3]};
  `)}
`;

const LabelColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${rem(4)};
  flex-shrink: 0;
  padding-top: 2px;
`;

const Label = styled.span`
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.text.xs};
  text-transform: uppercase;
  letter-spacing: ${rem(0.8)};
  color: ${theme.color.blogAccent};
  background: ${theme.color.blogAccentSubtle};
  padding: ${rem(3)} ${rem(8)} ${rem(1)};
  border-radius: ${theme.radius.sm};
`;

const DateText = styled.time`
  font-size: ${theme.text.xs};
  color: ${theme.color.textSecondary};
  margin-top: 2px;
  padding: 0 ${rem(2)};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(4)};
  min-width: 0;
  padding-left: ${rem(8)};
`;

const Title = styled.span`
  font-family: ${font.display};
  font-size: ${theme.text.base};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.color.text};
`;

const Description = styled.span`
  font-size: ${theme.text.xs};
  color: ${theme.color.textMuted};
  line-height: 1.4;
  max-width: 52ch;
  text-wrap: balance;
`;

export default function LatestBlogPost() {
  const formattedDate = formatDate(latestPost.date, 'short');

  return (
    <Card href={`/blog/${latestPost.slug}`} unstyled>
      <LabelColumn>
        <Label>Latest Post</Label>
        <DateText dateTime={latestPost.date}>{formattedDate}</DateText>
      </LabelColumn>
      <Body>
        <Title>{latestPost.title}</Title>
        {'description' in latestPost && <Description>{latestPost.description}</Description>}
      </Body>
    </Card>
  );
}
