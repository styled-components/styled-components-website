import { KeyboardArrowDown } from '@styled-icons/material';
import styled, { css } from 'styled-components';
import { blmGrey } from '../../utils/colors';
import { mobile } from '../../utils/media';
import rem from '../../utils/rem';
import { navbarHeight } from '../../utils/sizes';
import Link from '../Link';
import Logo from './Logo';
import NavButton from './NavButton';
import { CloseIcon, FoldIcon } from './NavIcons';
import NavLinks from './NavLinks';

export interface MobileNavbarProps {
  isMobileNavFolded?: boolean;
  isSideFolded?: boolean;
  onMobileNavToggle?: () => void;
  onSideToggle?: () => void;
  showSideNav?: boolean;
}

export default function MobileNavbar({
  children,
  isMobileNavFolded,
  isSideFolded,
  onMobileNavToggle,
  onSideToggle,
  showSideNav,
}: React.PropsWithChildren<MobileNavbarProps>) {
  return (
    <Wrapper>
      {showSideNav !== false && (
        <NavButton onClick={onSideToggle}>{isSideFolded ? <FoldIcon /> : <CloseIcon />}</NavButton>
      )}

      <LogoLink>
        <Logo />
      </LogoLink>

      {children}

      <NavButton onClick={onMobileNavToggle} style={{ position: 'absolute', right: 0 }}>
        <ArrowWrapper $shouldRotate={!isMobileNavFolded}>
          <StyledIcon as={KeyboardArrowDown} $size={36} />
        </ArrowWrapper>
      </NavButton>

      <SecondaryMenu $isOpen={!isMobileNavFolded}>
        <NavLinks />
      </SecondaryMenu>
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
  `)};
`;

const SecondaryMenu = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  top: ${rem(navbarHeight)};
  left: 0;
  right: 0;

  ${p =>
    p.$isOpen
      ? css`
          height: ${rem(navbarHeight)};
        `
      : css`
          height: 0;
        `} display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${rem(20)};
  transition: height 0.1s;

  user-select: none;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;

  background: ${blmGrey};
  color: #fff;
`;

const LogoLink = styled(Link).attrs((/* props */) => ({
  unstyled: true,
  href: '/',
  'aria-label': 'styled components',
}))`
  margin-right: auto;
  transform: translateY(-1px);
`;

const ArrowWrapper = styled.div<{ $shouldRotate?: boolean }>`
  transition: transform 0.2s;

  ${p =>
    p.$shouldRotate &&
    css`
      transform-origin: center center;
      transform: rotate(180deg);
    `};
`;

const StyledIcon = styled.div<{ $size?: number }>`
  && {
    width: ${p => rem(p.$size || 20)};
    height: ${p => rem(p.$size || 20)};
  }
`;
