import { Close } from '@styled-icons/material';
import { PureComponent, createRef } from 'react';
import styled, { css } from 'styled-components';
import { blmGrey, paleGrey } from '../../utils/colors';
import { headerFont } from '../../utils/fonts';
import { mobile } from '../../utils/media';
import rem from '../../utils/rem';
import { navbarHeight } from '../../utils/sizes';
import Link from '../Link';
import Logo from './Logo';
import MobileNavbar from './MobileNavbar';
import NavLinks from './NavLinks';
import SearchWithAlgolia from './SearchWithAlgolia';
import Social from './Social';

const Wrapper = styled.nav<{ $transparent?: boolean }>`
  align-items: center;
  background-color: rgba(12, 13, 15, 0.7);
  backdrop-filter: blur(5px);
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-wrap: wrap;
  font-family: ${headerFont};
  font-size: ${rem(15)};
  font-weight: 500;
  justify-content: center;
  height: ${rem(navbarHeight)};
  left: 0;
  padding: 0;
  position: fixed;
  transition: background 300ms ease-out;
  width: 100%;
  z-index: 3;
`;

const StartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const EndWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
/* stylelint-disable */
const StyledSocial = styled(Social)``;
/* stylelint-enable */

const NormalNavbar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${rem(20)};
  justify-content: space-between;

  ${StartWrapper}, ${EndWrapper} ${StyledSocial} {
    ${mobile(css`
      display: none;
    `)};
  }
`;

const StyledModalCloseIcon = styled(Close)`
  width: ${rem(26)};
  height: ${rem(26)};
  color: white;
`;

const AlgoliaModal = styled.div`
  ${mobile(css`
    background: currentColor;
    overflow: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  `)};
`;

const baseZ = 1;

const AlgoliaModalHeader = styled.div<{ $isOpen?: boolean }>`
  display: none;
  color: currentColor;

  ${mobile(css<{ $isOpen?: boolean }>`
    display: ${props => (props.$isOpen ? 'block' : 'none')};

    button {
      cursor: pointer;
      padding: 0;
      position: fixed;
      right: ${rem(10)};
      top: ${rem(11)};
      border: none;
      z-index: ${baseZ + 1};
    }
  `)};
`;

const AlgoliaModalOverlay = styled.div<{ $isOpen?: boolean }>`
  margin-right: ${rem(10)};

  ${mobile(css<{ $isOpen?: boolean }>`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${baseZ};
    left: 0;
    display: ${props => (props.$isOpen ? 'block' : 'none')};
    background: ${paleGrey};
    overflow-y: auto;
    margin: 0;

    .algolia-autocomplete .ds-dropdown-menu {
      position: static !important;
      display: block;
      max-width: 100%;
      min-width: 0;
    }
  `)};
`;

class ModalContainer extends PureComponent<{ isOpen?: boolean; requestModalClose: () => void }> {
  modalElement = createRef<HTMLDivElement>();

  onModalOverlayClick = (e: React.MouseEvent) => {
    if (!this.modalElement.current?.contains(e.target as Node)) {
      this.props.requestModalClose();
    }
  };

  onCloseButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.props.requestModalClose();
  };

  render() {
    return (
      <>
        <AlgoliaModalHeader $isOpen={this.props.isOpen}>
          <button onClick={this.onCloseButtonClick}>
            <StyledModalCloseIcon />
          </button>
        </AlgoliaModalHeader>
        <AlgoliaModalOverlay onClick={this.onModalOverlayClick} $isOpen={this.props.isOpen}>
          <AlgoliaModal ref={this.modalElement}>
            <div>{this.props.children}</div>
          </AlgoliaModal>
        </AlgoliaModalOverlay>
      </>
    );
  }
}

const LogoLink = styled(Link).attrs((/* props */) => ({
  unstyled: true,
  href: '/',
}))`
  display: inline-block;
  vertical-align: center;
  margin-right: ${rem(35)};
`;

export interface NavbarProps {
  onSideToggle?: () => void;
  onMobileNavToggle?: () => void;
  isSideFolded?: boolean;
  isMobileNavFolded?: boolean;
  showSideNav?: boolean;
}

function Navbar({ onSideToggle, onMobileNavToggle, isSideFolded, isMobileNavFolded, showSideNav }: NavbarProps) {
  return (
    <Wrapper>
      <MobileNavbar
        isSideFolded={isSideFolded}
        isMobileNavFolded={isMobileNavFolded}
        onSideToggle={onSideToggle}
        onMobileNavToggle={onMobileNavToggle}
        showSideNav={showSideNav}
      />

      <NormalNavbar>
        <StartWrapper>
          <LogoLink aria-label="Styled-components logo">
            <Logo />
          </LogoLink>
          <NavLinks />
        </StartWrapper>
      </NormalNavbar>

      <EndWrapper
        css={css`
          margin-left: auto;
          margin-right: 16px;

          ${mobile(css`
            margin-right: 48px;
          `)}
        `}
      >
        <SearchWithAlgolia />
        <StyledSocial style={{ marginLeft: 16 }} />
      </EndWrapper>
    </Wrapper>
  );
}

export default Navbar;
