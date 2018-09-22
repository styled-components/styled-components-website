import React, { PureComponent, createRef } from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import rem from '../../utils/rem'
import { violetRed, paleGrey, gold } from '../../utils/colors'
import { navbarHeight, searchModalWidth } from '../../utils/sizes'
import { headerFont } from '../../utils/fonts'
import { mobile } from '../../utils/media'
import Link from '../Link'
import NavLinks from './NavLinks'
import Social from './Social'
import Logo from './Logo'
import MobileNavbar from './MobileNavbar'
import SearchWithAlgolia from './SearchWithAlgolia'

const Wrapper = styled.nav`
  position: fixed;
  left: 0;
  box-sizing: border-box;
  z-index: 3;

  width: 100%;
  height: ${rem(navbarHeight)};

  font-family: ${headerFont};
  font-size: ${rem(15)};
  font-weight: 500;
  background: ${props => (props.transparent ? 'transparent' : violetRed)};
  transition: background 300ms ease-out;
  color: white;
`

const StartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const EndWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
/* stylelint-disable */
const StyledSocial = styled(Social)``
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
`

const StyledModalCloseIcon = styled(FontAwesomeIcon).attrs({
  icon: faTimes,
})`
  width: ${rem(20)};
  height: ${rem(20)};
  color: ${violetRed};
`

const AlgoliaModal = styled.div`
  ${mobile(css`
    background: currentColor;
    box-shadow: 0 1px 6px -2px black;
    position: absolute;
    top: ${rem(20)};
    left: 50%;
    border-radius: ${rem(3)};
    transform: translate(-50%, 0);
    width: ${rem(searchModalWidth)};
  `)};
`

const AlgoliaModalHeader = styled.div`
  display: none;
  color: currentColor;
  ${mobile(css`
    display: block;
    button {
      position: absolute;
      left: 100%;
      top: 0;
      border: none;
      cursor: pointer;
      box-shadow: 0 1px 6px -2px black;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      color: ${gold};
      display: flex;
      background: #fff;
    }
  `)};
`

const AlgoliaModalOverlay = styled.div`
  ${mobile(css`
    position: fixed;
    top: 0;
    z-index: 1;
    left: 0;
    display: ${props => (props.isOpen ? 'block' : 'none')};
    height: 100%;
    width: 100%;
    background: ${paleGrey};

    .algolia-autocomplete .ds-dropdown-menu {
      position: static !important;
      display: block;
      max-width: 100%;
      min-width: 0;
    }
  `)};
`

class ModalContainer extends PureComponent {
  modalElement = createRef()
  onModalOverlayClick = e => {
    if (!this.modalElement.current.contains(e.target)) {
      this.props.requestModalClose()
    }
  }
  onCloseButtonClick = e => {
    e.stopPropagation()
    this.props.requestModalClose()
  }
  render() {
    return (
      <AlgoliaModalOverlay
        onClick={this.onModalOverlayClick}
        isOpen={this.props.isOpen}
      >
        <AlgoliaModal ref={this.modalElement}>
          <AlgoliaModalHeader>
            <button onClick={this.onCloseButtonClick}>
              <StyledModalCloseIcon />
            </button>
          </AlgoliaModalHeader>
          <div>{this.props.children}</div>
        </AlgoliaModal>
      </AlgoliaModalOverlay>
    )
  }
}

const LogoLink = styled(Link).attrs({
  unstyled: true,
  href: '/',
})`
  display: inline-block;
  vertical-align: center;
  margin-right: ${rem(35)};
`

class Navbar extends PureComponent {
  state = {
    isOpen: false,
  }
  openModal = () => this.setState(() => ({ isOpen: true }))
  closeModal = () =>
    this.setState(({ isOpen }) => (isOpen ? { isOpen: false } : null))
  render() {
    const {
      onSideToggle,
      onMobileNavToggle,
      isSideFolded,
      isMobileNavFolded,
      showSideNav,
      transparent,
    } = this.props

    return (
      <Wrapper transparent={transparent}>
        <NormalNavbar>
          <StartWrapper>
            <LogoLink>
              <Logo />
            </LogoLink>
            <NavLinks />
          </StartWrapper>
          <EndWrapper>
            <ModalContainer
              isOpen={this.state.isOpen}
              requestModalClose={this.closeModal}
            >
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
    )
  }
}

export default Navbar
