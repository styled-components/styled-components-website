import React from 'react'
import styled from 'styled-components'
import { I18n } from 'react-i18next'

import rem from '../../utils/rem'
import { navbarHeight } from '../../utils/sizes'
import NavSeparator from './NavSeparator'
import Link from '../Link'

import {
  DEFAULT_TRANSLATION,
} from '../../constants/i18n'

import {
  addLanguageToPath,
} from '../../utils/translations'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`

const NavLink = styled(Link).attrs({
  unstyled: true
})`
  flex: 0 0 auto;
  display: inline-block;
  line-height: ${rem(navbarHeight)};
  transition: opacity 0.2s, transform 0.2s;
  cursor: pointer;

  letter-spacing: ${rem(0.4)};
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
  <I18n ns={DEFAULT_TRANSLATION}>
    {(translate, { i18n }) => (
      <Wrapper>
        <NavLink
          href="/"
          as={addLanguageToPath(i18n, '/')}
          >
            {translate('homepage')}
          </NavLink>
          <NavSeparator />
          <NavLink
            href="/docs"
            as={addLanguageToPath(i18n, '/docs')}
          >
            {translate('documentation')}
          </NavLink>
          <NavSeparator />
          <NavLink
            href="/ecosystem"
            as={addLanguageToPath(i18n, '/ecosystem')}
          >
            {translate('ecosystem')}
          </NavLink>
        </Wrapper>
    )}
  </I18n>
)

export default NavLinks
