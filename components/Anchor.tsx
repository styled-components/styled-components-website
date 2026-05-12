'use client';

import { Link as LinkIcon } from '@styled-icons/material';
import styled, { css } from 'styled-components';
import { mobile } from '../utils/media';
import rem from '../utils/rem';
import { Header, SubHeader, TertiaryHeader } from './Layout';

export interface AnchorProps {
  id?: string;
  level?: number;
}

const HEADING_BY_LEVEL: Record<number, typeof Header> = {
  3: SubHeader,
  4: TertiaryHeader,
};

export default function Anchor({ children, level, id, ...props }: React.PropsWithChildren<AnchorProps>) {
  const Heading = (level !== undefined && HEADING_BY_LEVEL[level]) || Header;

  return (
    <AnchorHeader {...props} as={Heading} id={id}>
      {children}

      <AnchorPrimitive href={`#${id}`} aria-label={id}>
        <AnchorIcon />
      </AnchorPrimitive>
    </AnchorHeader>
  );
}

const AnchorPrimitive = styled.a`
  display: inline-block;
  color: inherit;
  margin-left: ${rem(10)};
  opacity: 0;
  transition: opacity 150ms ease-out;

  &:focus-visible {
    opacity: 1;
    outline-offset: 2px;
  }
`;

const AnchorIcon = styled(LinkIcon).attrs(() => ({
  width: undefined,
  height: undefined,
}))`
  width: ${rem(20)};
  opacity: 0.7;
  margin-top: ${rem(-5)};

  &:hover {
    opacity: 0.9;
  }
`;

const AnchorHeader = styled.div`
  position: relative;
  scroll-margin-top: ${rem(80)};

  ${mobile(css`
    scroll-margin-top: ${rem(100)};
  `)}

  &:hover ${AnchorPrimitive},
  &:focus-within ${AnchorPrimitive} {
    opacity: 1;
  }

  @media (hover: none) {
    ${AnchorPrimitive} {
      opacity: 1;
    }
  }
`;
