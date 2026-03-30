'use client';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';
import Nav from './Nav';
import { Container } from './Layout';
import { SidebarFoldProvider, useSidebarFold } from '../utils/useSidebarFold';
import { theme, lightTheme } from '../utils/theme';

function ClientLayoutInner({ children }: { children: React.ReactNode }) {
  const { isSideFolded, onSideToggle } = useSidebarFold();

  return (
    <>
      <Nav isSideFolded={isSideFolded} onSideToggle={onSideToggle} />
      <Container>{children}</Container>
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <theme.GlobalStyle />
      <GlobalStyles />
      <div className="root">
        <SidebarFoldProvider>
          <ClientLayoutInner>{children}</ClientLayoutInner>
        </SidebarFoldProvider>
      </div>
    </ThemeProvider>
  );
}
