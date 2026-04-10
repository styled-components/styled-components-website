'use client';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';
import Nav from './Nav';
import { Container } from './Layout';
import { SidebarFoldProvider, useSidebarFold } from '../utils/useSidebarFold';
import { theme, lightTheme } from '../utils/theme';
import type { LatestPost } from '../utils/blog';

function ClientLayoutInner({ children, latestPost }: { children: React.ReactNode; latestPost: LatestPost }) {
  const { isSideFolded, onSideToggle } = useSidebarFold();

  return (
    <>
      <Nav isSideFolded={isSideFolded} onSideToggle={onSideToggle} latestPost={latestPost} />
      <Container>{children}</Container>
    </>
  );
}

export default function ClientLayout({ children, latestPost }: { children: React.ReactNode; latestPost: LatestPost }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <theme.GlobalStyle />
      <GlobalStyles />
      <div className="root">
        <SidebarFoldProvider>
          <ClientLayoutInner latestPost={latestPost}>{children}</ClientLayoutInner>
        </SidebarFoldProvider>
      </div>
    </ThemeProvider>
  );
}
