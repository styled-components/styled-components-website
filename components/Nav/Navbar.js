import React, { PureComponent } from 'react'
import styled from 'styled-components'

import rem from '../../utils/rem'
import { violetRed } from '../../utils/colors'
import { navbarHeight } from '../../utils/sizes'
import Link from '../Link'
import Logo from './Logo'

const Wrapper = styled.nav`
  position: fixed;
  left: 0;
  box-sizing: border-box;
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${rem(navbarHeight)};
  padding: 0 ${rem(20)};

  background: ${violetRed};
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
`

class Navbar extends PureComponent {
  render() {
    return (
      <Wrapper>
        <StartWrapper>
          <LogoLink>
            <Logo />
          </LogoLink>
        </StartWrapper>

        <EndWrapper>
          ss
        </EndWrapper>
      </Wrapper>
    )
  }
}

export default Navbar
