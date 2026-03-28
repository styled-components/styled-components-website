'use client';

import styled, { css } from 'styled-components';
import Link from './Link';
import rem from '../utils/rem';
import { color, font, text, fontWeight, radius, duration, space } from '../utils/tokens';
import { mobile } from '../utils/media';
import { formatDate } from '../utils/formatDate';
import posts from '@/sections/blog/posts.json';

const latestPost = posts[0];

const Card = styled(Link)`
  display: inline-flex;
  gap: ${space[5]};
  align-items: flex-start;
  max-width: max-content;
  margin: ${space[6]} 0;
  padding: ${space[4]} ${space[5]};
  border-radius: ${radius.lg};
  border: 1px solid ${color.border};
  background: ${color.surfaceRaised};
  position: relative;
  z-index: 20;
  text-decoration: none;
  text-align: left;
  color: inherit;
  font-family: ${font.sans};
  transition: background ${duration.normal}, border-color ${duration.normal}, transform ${duration.fast};

  &:hover {
    background: ${color.accentSubtle};
    border-color: ${color.accent};
    transform: translateY(-1px);
  }

  ${mobile(css`
    margin: ${space[4]} 0;
    padding: ${space[3]} ${space[4]};
    gap: ${space[3]};
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
  font-weight: ${fontWeight.bold};
  font-size: ${text.xs};
  text-transform: uppercase;
  letter-spacing: ${rem(0.8)};
  color: ${color.blogAccent};
  background: ${color.blogAccentSubtle};
  padding: ${rem(3)} ${rem(8)} ${rem(1)};
  border-radius: ${radius.sm};
`;

const DateText = styled.time`
  font-size: ${text.xs};
  color: ${color.textSecondary};
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
  font-size: ${text.base};
  font-weight: ${fontWeight.medium};
  color: ${color.text};
`;

const Description = styled.span`
  font-size: ${text.xs};
  color: ${color.textMuted};
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
