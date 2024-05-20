import React from 'react';
import { Container, Content, Title } from './Layout';
import Nav, { NavProps } from './Nav';
import Head from './SeoHead';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { RssFeed as FeedIcon } from '@styled-icons/material';
import Link from './Link';
import { VisuallyHidden } from './VisuallyHidden';
import { getReleasesAtomFeedURI } from '../utils/githubApi';

export interface DocsLayoutProps {
  description?: string;
  pages?: NavProps['pages'];
  title?: string;
  useDocsSidebarMenu?: boolean;
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

export default function DocsLayout({
  children,
  title = '',
  description = '',
  useDocsSidebarMenu = true,
  pages,
}: React.PropsWithChildren<DocsLayoutProps>) {
  const router = useRouter();
  const [isSideFolded, setIsSideFolded] = React.useState(true);
  const [isMobileNavFolded, setIsMobileNavFolded] = React.useState(true);

  const feedLink = getReleasesAtomFeedURI();
  const prefixedTitle = `styled-components${title ? `: ${title}` : ''}`;

  const onSideToggle = React.useCallback(() => {
    setIsMobileNavFolded(true);
    setIsSideFolded(x => !x);
  }, []);

  const onMobileNavToggle = React.useCallback(() => {
    setIsMobileNavFolded(x => !x);
    setIsSideFolded(true);
  }, []);

  React.useEffect(() => {
    setIsMobileNavFolded(true);
    setIsSideFolded(true);
  }, [router.asPath]);

  return (
    <Container>
      <Head title={prefixedTitle} description={description}>
        <meta name="robots" content="noodp" />
        {feedLink && <link rel="alternate" type="application/atom+xml" title={prefixedTitle} href={feedLink} />}
      </Head>

      <Nav
        useDocsSidebarMenu={useDocsSidebarMenu}
        isSideFolded={isSideFolded}
        isMobileNavFolded={isMobileNavFolded}
        pages={pages}
        onSideToggle={onSideToggle}
        onMobileNavToggle={onMobileNavToggle}
      />

      <Content $moveRight={!isSideFolded} data-e2e-id="content">
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
    </Container>
  );
}
