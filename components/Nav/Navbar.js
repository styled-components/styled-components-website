import React, { PureComponent, createRef } from 'react';
import styled, { css } from 'styled-components';
import { Close } from '@styled-icons/material';
import rem from '../../utils/rem';
import { blmGrey, paleGrey } from '../../utils/colors';
import { navbarHeight } from '../../utils/sizes';
import { headerFont } from '../../utils/fonts';
import { mobile } from '../../utils/media';
import Link from '../Link';
import NavLinks from './NavLinks';
import Social from './Social';
import Logo from './Logo';
import MobileNavbar from './MobileNavbar';
import SearchWithAlgolia from './SearchWithAlgolia';
import { BlmBanner } from '../BlmBanner';

const Wrapper = styled.nav`
  position: fixed;
  left: 0;
  box-sizing: border-box;
  z-index: 3;

  width: 100%;
  height: ${rem(navbarHeight * 2)};

  font-family: ${headerFont};
  font-size: ${rem(15)};
  font-weight: 500;
  background: ${props => (props.transparent ? 'transparent' : blmGrey)};
  transition: background 300ms ease-out;
  color: white;
  padding: 0;
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

const AlgoliaModalHeader = styled.div`
  display: none;
  color: currentColor;

  ${mobile(css`
    display: ${props => (props.isOpen ? 'block' : 'none')};

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

const AlgoliaModalOverlay = styled.div`
  margin-right: ${rem(10)};

  ${mobile(css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${baseZ};
    left: 0;
    display: ${props => (props.isOpen ? 'block' : 'none')};
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

class ModalContainer extends PureComponent {
  modalElement = createRef();
  onModalOverlayClick = e => {
    if (!this.modalElement.current.contains(e.target)) {
      this.props.requestModalClose();
    }
  };
  onCloseButtonClick = e => {
    e.stopPropagation();
    this.props.requestModalClose();
  };
  render() {
    return (
      <>
        <AlgoliaModalHeader isOpen={this.props.isOpen}>
          <button onClick={this.onCloseButtonClick}>
            <StyledModalCloseIcon />
          </button>
        </AlgoliaModalHeader>
        <AlgoliaModalOverlay onClick={this.onModalOverlayClick} isOpen={this.props.isOpen}>
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

class Navbar extends PureComponent {
  state = {
    isOpen: false,
  };
  openModal = () => this.setState(() => ({ isOpen: true }));
  closeModal = () => this.setState(({ isOpen }) => (isOpen ? { isOpen: false } : null));
  render() {
    const { onSideToggle, onMobileNavToggle, isSideFolded, isMobileNavFolded, showSideNav, transparent } = this.props;

    return (
      <Wrapper transparent={transparent}>
        <BlmBanner />
        <NormalNavbar>
          <StartWrapper>
            <LogoLink>
              <Logo />
            </LogoLink>
            <NavLinks />
          </StartWrapper>
          <EndWrapper>
            <ModalContainer isOpen={this.state.isOpen} requestModalClose={this.closeModal}>
              <SearchWithAlgolia requestModalClose={this.closeModal} />
            </ModalContainer>
            <StyledSocial />
          </EndWrapper>
        </NormalNavbar>
        <MobileNavbar
          isSideFolded={isSideFolded}
          onSearchButtonClick={this.openModal}
          isMobileNavFolded={isMobileNavFolded}
          onSideToggle={onSideToggle}
          onMobileNavToggle={onMobileNavToggle}
          showSideNav={showSideNav}
        />
      </Wrapper>
    );
  }
}

export default Navbar;
