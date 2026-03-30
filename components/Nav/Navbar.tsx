import styled, { css } from 'styled-components';
import { mobile } from '../../utils/media';
import { navbarHeight, sidebarWidth } from '../../utils/sizes';
import { theme, font } from '../../utils/theme';
import Link from '../Link';
import ThemeToggle from '../ThemeToggle';
import Logo from './Logo';
import MobileNavbar from './MobileNavbar';
import Social from './Social';

export interface NavbarProps {
  onSideToggle?: () => void;
  isSideFolded?: boolean;
  showSideNav?: boolean;
}

export default function Navbar({ onSideToggle, isSideFolded, showSideNav }: NavbarProps) {
  return (
    <Wrapper>
      <MobileNavbar isSideFolded={isSideFolded} onSideToggle={onSideToggle} showSideNav={showSideNav} />

      <NormalNavbar>
        <LogoZone>
          <LogoLink href="/" aria-label="Styled-components home">
            <Logo />
          </LogoLink>
        </LogoZone>

        <ContentZone>
          <Social />
          <ThemeToggle />
        </ContentZone>
      </NormalNavbar>
    </Wrapper>
  );
}

const Wrapper = styled.nav.attrs({ 'aria-label': 'Main' })<{ children?: React.ReactNode }>`
  align-items: center;
  background-color: ${theme.color.navBg};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-sizing: border-box;
  color: ${theme.color.navText};
  display: flex;
  font-family: ${font.sans};
  height: ${navbarHeight}px;
  left: 0;
  padding: 0;
  position: fixed;
  transition: background ${theme.duration.slow} ease-out, color ${theme.duration.slow} ease-out;
  width: 100%;
  z-index: 40;
  border-bottom: 1px solid color-mix(in oklch, ${theme.color.text} 8%, ${theme.color.surface});
`;

const LogoZone = styled.div`
  display: flex;
  align-items: center;
  width: ${sidebarWidth}px;
  flex-shrink: 0;
  height: 100%;
  padding-left: 16px;
  box-sizing: border-box;
  border-right: 1px solid color-mix(in oklch, ${theme.color.text} 8%, ${theme.color.surface});
`;

const ContentZone = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  padding: 0 32px;
  gap: 8px;
  justify-content: flex-end;
`;

const NormalNavbar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  ${mobile(css`
    display: none;
  `)}
`;

const LogoLink = styled(Link).attrs(() => ({
  unstyled: true,
}))`
  display: inline-flex;
  align-items: center;
`;
