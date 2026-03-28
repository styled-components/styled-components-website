import styled, { css } from 'styled-components';
import { mobile } from '../../utils/media';
import rem from '../../utils/rem';
import { navbarHeight, sidebarWidth } from '../../utils/sizes';
import { color, duration, font } from '../../utils/tokens';
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
          <StyledSocial />
          <ThemeToggle />
        </ContentZone>
      </NormalNavbar>
    </Wrapper>
  );
}

const Wrapper = styled.nav.attrs({ 'aria-label': 'Main' })<{ children?: React.ReactNode }>`
  align-items: center;
  background-color: ${color.navBg};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-sizing: border-box;
  color: ${color.navText};
  display: flex;
  font-family: ${font.sans};
  font-size: ${rem(15)};
  font-weight: 500;
  height: ${rem(navbarHeight)};
  left: 0;
  padding: 0;
  position: fixed;
  transition: background ${duration.slow} ease-out, color ${duration.slow} ease-out;
  width: 100%;
  z-index: 40;
  border-bottom: 1px solid color-mix(in oklch, ${color.text} 8%, ${color.surface});
`;

const LogoZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: ${rem(sidebarWidth)};
  flex-shrink: 0;
  height: 100%;
  padding-left: ${rem(24)};
  box-sizing: border-box;
  border-right: 1px solid color-mix(in oklch, ${color.text} 8%, ${color.surface});
`;

const ContentZone = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  padding: 0 ${rem(20)};
  gap: ${rem(8)};
  justify-content: flex-end;
`;

/* stylelint-disable */
const StyledSocial = styled(Social)``;
/* stylelint-enable */

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
