'use client';

import React from 'react';
import { Content, Title } from './Layout';
import styled from 'styled-components';
import { RssFeed as FeedIcon } from '@styled-icons/material';
import Breadcrumbs from './Breadcrumbs';
import Link from './Link';
import { VisuallyHidden } from './VisuallyHidden';
import { getReleasesAtomFeedURI } from '../utils/githubApi';
import { useSidebarFold } from '../utils/useSidebarFold';

export interface DocsLayoutProps {
  title: string;
}

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  ${() => FeedLink} {
    flex-shrink: 0;
  }
`;

const FeedLink = styled(Link)`
  width: 1.5em;
`;

export default function DocsLayout({ children, title = '' }: React.PropsWithChildren<DocsLayoutProps>) {
  const { isSideFolded } = useSidebarFold();

  const feedLink = title === 'Releases' ? getReleasesAtomFeedURI() : null;

  return (
    <Content $moveRight={!isSideFolded} data-e2e-id="content">
      <Breadcrumbs title={title} />
      <TitleRow>
        <Title>{title}</Title>
        {feedLink && (
          <FeedLink inline href={feedLink} target="_blank">
            <FeedIcon />
            <VisuallyHidden>RSS feed</VisuallyHidden>
          </FeedLink>
        )}
      </TitleRow>

      {children}
    </Content>
  );
}
