import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'

import rem from '../../utils/rem'
import { navbarHeight } from '../../utils/sizes'
import { paleGrey } from '../../utils/colors'
import { mobile } from '../../utils/media'
import Link from '../Link'
import NavLinks from './NavLinks'
import Social from './Social'
import Search from './Search'
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
  `)}
`

const SecondaryMenu = styled.div`
  position: absolute;
  top: ${rem(navbarHeight)};
  left: 0;
  right: 0;

  ${p => p.open ? css`
    height: ${rem(navbarHeight)};
  ` : css`
    height: 0;
  `}

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${rem(20)};
  transition: height 0.1s;

  -webkit-user-select: none;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;

  background: ${paleGrey};
  color: #868686;
`

const LogoLink = styled(Link).attrs({
  unstyled: true,
  href: '/',
})`
  display: inline-block;
  vertical-align: center;
  margin-right: ${rem(35)};
`

const ArrowWrapper = styled.div`
  transition: transform 0.1s;

  ${p => p.rotate && css`
    transform-origin: 50% 55%;
    transform: rotate(180deg);
  `}
`

const PaddedSocial = styled(Social)`
  padding-right: ${rem(20)};
`

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>close</title>
    <use fill="#FFF" xlinkHref="#close" transform="translate(1 1)" />
    <defs>
      <path id="close" d="M-.7.7l13 13 1.4-1.4-13-13L-.7.7zm13-1.4l-13 13 1.4 1.4 13-13-1.4-1.4z"/>
    </defs>
  </svg>
)

const FoldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>fold</title>
    <use fill="#FFF" xlinkHref="#fold" transform="translate(0 1)"/>
    <defs>
      <path id="fold" d="M0 1h17v-2H0v2zm17 4H0v2h17V5zM0 13h17v-2H0v2z"/>
    </defs>
  </svg>
)

const ArrowIcon = props => (
  <ArrowWrapper {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>arrow down</title>
      <use fill="#FFF" xlinkHref="#menuArrow" transform="translate(1 1)"/>
      <defs>
        <path id="menuArrow" d="M5 5l-.7.7.7.7.7-.7L5 5zM9.3-.7l-5 5 1.4 1.4 5-5L9.3-.7zm-3.6 5l-5-5L-.7.7l5 5 1.4-1.4z"/>
      </defs>
    </svg>
  </ArrowWrapper>
)

class MobileNavbar extends PureComponent {
  state = {
    isMenuOpen: false,
  }

  render() {
    const { isMenuOpen } = this.state
    const { isFolded, onFold } = this.props

    return (
      <Wrapper>
        <NavButton
          active={!isFolded}
          onClick={onFold}
        >
          {isFolded ? <FoldIcon /> : <CloseIcon />}
        </NavButton>

        <LogoLink>
          <Logo compact />
        </LogoLink>

        <NavButton
          onClick={this.toggleMenu}
          active={isMenuOpen}
        >
          <ArrowIcon rotate={isMenuOpen} />
        </NavButton>

        <SecondaryMenu open={isMenuOpen}>
          <NavLinks />
          <NavSeparator />
          <Search />
          <NavSeparator />
          <PaddedSocial />
        </SecondaryMenu>
      </Wrapper>
    )
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen })
  }
}

export default MobileNavbar
