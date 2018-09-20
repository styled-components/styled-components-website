import React from 'react'
import styled, { css } from 'styled-components'
import SearchWithAlgolia from './SearchWithAlgolia'
import rem from '../../utils/rem'
import { navbarHeight } from '../../utils/sizes'
import { paleGrey } from '../../utils/colors'
import { mobile } from '../../utils/media'
import { CloseIcon, FoldIcon, ArrowIcon, SearchIcon } from './NavIcons'
import Link from '../Link'
import NavLinks from './NavLinks'
import Social from './Social'
import Logo from './Logo'
import NavSeparator from './NavSeparator'
import NavButton from './NavButton'

const Wrapper = styled.div`
  display: none;

  ${mobile(css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${rem(navbarHeight)};
  `)};
`

const SecondaryMenu = styled.div`
  position: absolute;
  top: ${rem(navbarHeight)};
  left: 0;
  right: 0;

  ${p =>
    p.isOpen
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

  background: ${paleGrey};
  color: #868686;
`

const LogoLink = styled(Link).attrs({
  unstyled: true,
  href: '/',
  'aria-label': 'styled components',
})`
  display: inline-block;
  vertical-align: center;
`

const ArrowWrapper = styled.div`
  transition: transform 0.1s;

  ${p =>
    p.shouldRotate &&
    css`
      transform-origin: 50% 55%;
      transform: rotate(180deg);
    `};
`

const SecondaryMenuItem = styled.div`
  padding-right: ${rem(20)};
`

const SearchModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  padding: ${rem(15)};
`

const SearchModalContent = styled.div`
  background: black;
`

const SearchModal = props => {
  const { onRequestClose } = props
  return (
    <SearchModalOverlay>
      <SearchModalContent>
        <SearchWithAlgolia />
      </SearchModalContent>
    </SearchModalOverlay>
  )
}

const MobileNavbar = props => {
  const {
    isSideFolded,
    isMobileNavFolded,
    onSideToggle,
    onMobileNavToggle,
    showSideNav,
    onSearchButtonClick,
  } = props

  return (
    <Wrapper>
      {showSideNav !== false && (
        <NavButton active={!isSideFolded} onClick={onSideToggle}>
          {isSideFolded ? <FoldIcon /> : <CloseIcon />}
        </NavButton>
      )}

      <LogoLink>
        <Logo compact />
      </LogoLink>
      <div>
        <NavButton onClick={onSearchButtonClick}>
          <SearchIcon />
        </NavButton>

        <NavButton onClick={onMobileNavToggle} active={!isMobileNavFolded}>
          <ArrowWrapper shouldRotate={!isMobileNavFolded}>
            <ArrowIcon />
          </ArrowWrapper>
        </NavButton>
      </div>

      <SecondaryMenu isOpen={!isMobileNavFolded}>
        <NavLinks />
        <NavSeparator />
        <SecondaryMenuItem>
          <Social />
        </SecondaryMenuItem>
      </SecondaryMenu>
      {/* <SearchModal /> */}
    </Wrapper>
  )
}

export default MobileNavbar
