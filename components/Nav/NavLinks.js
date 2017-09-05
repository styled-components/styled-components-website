import React from 'react'
import styled from 'styled-components'

import rem from '../../utils/rem'
import { navbarHeight } from '../../utils/sizes'
import NavSeparator from './NavSeparator'
import Link from '../Link'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
`

const NavLink = styled(Link).attrs({
  unstyled: true,
})`
  display: inline-block;
  line-height: ${rem(navbarHeight)};
  transition: opacity 200ms, transfrom 200ms;
  cursor: pointer;

  letter-spacing: ${rem(.4)}
  color: currentColor;

  &:hover,
  &:focus {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }
`

const NavLinks = () => (
  <Wrapper>
    <NavLink>Concepts</NavLink>
    <NavSeparator />
    <NavLink>Try it out</NavLink>
    <NavSeparator />
    <NavLink>Documentation</NavLink>
  </Wrapper>
)

export default NavLinks
