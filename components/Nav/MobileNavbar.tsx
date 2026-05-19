import styled, { css } from 'styled-components';
import { mobile } from '../../utils/media';
import { navbarHeight } from '../../utils/sizes';
import { theme } from '../../utils/theme';
import Link from '../Link';
import Logo from './Logo';
import NavButton from './NavButton';
import { CloseIcon, FoldIcon } from './NavIcons';
import ThemeToggle from '../ThemeToggle';

// The hamburger NavButton has 10px horizontal padding and the
// ThemeToggle button centers an 18px icon in a 40px box (11px inset).
// Subtracting these from the wrapper padding aligns each icon's visual
// edge with the content gutter line, not the button's tap target edge.
const NAV_BUTTON_ICON_INSET = 10;
const THEME_TOGGLE_ICON_INSET = 11;

export interface MobileNavbarProps {
  isSideFolded?: boolean;
  onSideToggle?: () => void;
}

export default function MobileNavbar({ isSideFolded, onSideToggle }: MobileNavbarProps) {
  return (
    <Wrapper>
      <NavButton aria-label={isSideFolded ? 'Open sidebar' : 'Close sidebar'} onClick={onSideToggle}>
        {isSideFolded ? <FoldIcon /> : <CloseIcon />}
      </NavButton>

      <LogoLink>
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
    height: ${navbarHeight}px;
    justify-content: space-between;
    padding-left: calc(${theme.layout.gutter} - ${NAV_BUTTON_ICON_INSET}px);
    padding-right: calc(${theme.layout.gutter} - ${THEME_TOGGLE_ICON_INSET}px);
  `)};
`;

const LogoLink = styled(Link).attrs({
  variant: 'unstyled' as const,
  href: '/',
  'aria-label': 'styled components',
})`
  display: inline-flex;
  align-items: center;
`;
