import React from 'react'
import styled, { css } from 'styled-components'
import SearchWithAlgolia from './SearchWithAlgolia'
import rem from '../../utils/rem'
import { navbarHeight } from '../../utils/sizes'
import { paleGrey } from '../../utils/colors'
import { mobile } from '../../utils/media'
import { CloseIcon, FoldIcon, ArrowIcon } from './NavIcons'
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

const MobileNavbar = props => {
  const {
    isSideFolded,
    isMobileNavFolded,
    onSideToggle,
    onMobileNavToggle,
    showSideNav,
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

      <NavButton onClick={onMobileNavToggle} active={!isMobileNavFolded}>
        <ArrowWrapper shouldRotate={!isMobileNavFolded}>
          <ArrowIcon />
        </ArrowWrapper>
      </NavButton>

      <SecondaryMenu isOpen={!isMobileNavFolded}>
        <NavLinks />
        <NavSeparator />
        <SecondaryMenuItem>
          <SearchWithAlgolia />
          <Social />
        </SecondaryMenuItem>
      </SecondaryMenu>
    </Wrapper>
  )
}

export default MobileNavbar
