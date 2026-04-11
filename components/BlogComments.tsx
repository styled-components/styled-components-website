'use client';

import styled from 'styled-components';
import { BlueskyComments } from 'bluesky-comments';
import 'bluesky-comments/bluesky-comments.css';
import { theme } from '../utils/theme';
import rem from '../utils/rem';
import { ColophonRule } from './BlogMeta';

const BLUESKY_BLUE = '#0285FF';
const BLUESKY_BLUE_HOVER = '#006BD6';

function BlueskyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026" />
    </svg>
  );
}

export default function BlogComments({ blueskyPostUrl }: { blueskyPostUrl: string }) {
  return (
    <Wrapper id="comments">
      <ColophonRule aria-hidden="true" />
      <ReplyButton href={blueskyPostUrl} target="_blank" rel="noopener">
        <BlueskyIcon />
        Reply on Bluesky
      </ReplyButton>
      <BlueskyComments uri={blueskyPostUrl} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: ${theme.space[16]};
  scroll-margin-top: ${theme.space[16]};

  [class*='_container_'] {
    max-width: none;
  }

  /* Hide the "Comments" heading when there's no reply list to head —
     the package renders it unconditionally. onEmpty() can't be used because
     it only fires on errors, not on empty-reply threads. */
  [class*='_container_']:not(:has([class*='_commentsList_'])) [class*='_commentsTitle_'] {
    display: none;
  }

  [class*='_replyText_'] {
    display: none;
  }

  [class*='_statsBar_'] {
    gap: ${theme.space[5]};
  }

  [class*='_container_'] a,
  [class*='_container_'] a[class*='_link_'],
  [class*='_container_'] a[class*='_link_']:hover {
    text-decoration: none;
    font-weight: ${theme.fontWeight.medium};
  }

  /* Heart (likes) → red */
  [class*='_icon_'][fill='pink'] {
    fill: ${theme.palette[0]};
  }
  [class*='_icon_'][stroke='pink'] {
    stroke: ${theme.palette[0]};
  }

  /* Recycle (reposts) → green. fill stays "none" to preserve outline */
  [class*='_icon_'][stroke='green'] {
    stroke: ${theme.palette[7]};
  }

  /* Speech bubble (replies) → blue */
  [class*='_icon_'][fill='#7FBADC'] {
    fill: ${theme.palette[12]};
  }
  [class*='_icon_'][stroke='#7FBADC'] {
    stroke: ${theme.palette[12]};
  }
`;

const ReplyButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${rem(8)};
  padding: ${rem(10)} ${rem(18)};
  margin-bottom: ${theme.space[6]};
  border-radius: 9999px;
  background: ${BLUESKY_BLUE};
  color: #ffffff;
  font-family: inherit;
  font-size: ${theme.text.sm};
  font-weight: ${theme.fontWeight.semibold};
  text-decoration: none;
  transition: background ${theme.duration.fast};

  &:hover,
  &:focus-visible {
    background: ${BLUESKY_BLUE_HOVER};
    color: #ffffff;
    text-decoration: none;
  }

  svg {
    width: ${rem(16)};
    height: ${rem(16)};
  }
`;
