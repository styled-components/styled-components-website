import styled, { css } from 'styled-components';
import { mobile } from '../../utils/media';
import rem from '../../utils/rem';
import { navbarHeight } from '../../utils/sizes';
import Link from '../Link';
import Logo from './Logo';
import NavButton from './NavButton';
import { CloseIcon, FoldIcon } from './NavIcons';
import ThemeToggle from '../ThemeToggle';

export interface MobileNavbarProps {
  isSideFolded?: boolean;
  onSideToggle?: () => void;
  showSideNav?: boolean;
}

export default function MobileNavbar({ isSideFolded, onSideToggle, showSideNav }: MobileNavbarProps) {
  return (
    <Wrapper>
      {showSideNav !== false && (
        <NavButton aria-label={isSideFolded ? 'Open sidebar' : 'Close sidebar'} onClick={onSideToggle}>
          {isSideFolded ? <FoldIcon /> : <CloseIcon />}
        </NavButton>
      )}

      <LogoLink href="/">
        <Logo />
      </LogoLink>

      <ThemeToggle style={{ marginLeft: 'auto' }} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: none;

  ${mobile(css`
    align-items: center;
    display: flex;
    flex-grow: 1;
    height: ${rem(navbarHeight)};
    justify-content: space-between;
    margin-left: 16px;
    margin-right: 8px;

    > ${NavButton} {
      margin-left: -8px;
    }
  `)};
`;

const LogoLink = styled(Link).attrs(() => ({
  unstyled: true,
  href: '/',
  'aria-label': 'styled components',
}))`
  display: inline-flex;
  align-items: center;
`;
