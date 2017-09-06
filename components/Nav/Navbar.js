import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'

import rem from '../../utils/rem'
import { violetRed } from '../../utils/colors'
import { navbarHeight } from '../../utils/sizes'
import { headerFont } from '../../utils/fonts'
import { mobile } from '../../utils/media'
import Link from '../Link'
import NavLinks from './NavLinks'
// import Social from './Social'
import Search from './Search'
import Logo from './Logo'
import NavSeparator from './NavSeparator'
import MobileNavbar from './MobileNavbar'

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
  background: ${violetRed};
  color: white;
`

const NormalNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${rem(20)};

  ${mobile(css`
    display: none;
  `)}
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

const LogoLink = styled(Link).attrs({
  unstyled: true,
  href: '/',
})`
  display: inline-block;
  vertical-align: center;
  margin-right: ${rem(35)};
`

class Navbar extends PureComponent {
  render() {
    const { onFold, isFolded } = this.props

    return (
      <Wrapper>
        <NormalNavbar>
          <StartWrapper>
            <LogoLink>
              <Logo />
            </LogoLink>

            <NavLinks />
          </StartWrapper>

          <EndWrapper>
            <Search />
            <NavSeparator />
            {/* <Social /> */}
          </EndWrapper>
        </NormalNavbar>

        <MobileNavbar
          isFolded={isFolded}
          onFold={onFold}
        />
      </Wrapper>
    )
  }
}

export default Navbar
