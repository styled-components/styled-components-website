import { I18n } from 'react-i18next'
import React from 'react'

import {
  DOCS_API_TRANSLATION,
} from '../../../constants/i18n'


import md from 'components/md'
import Styled from './styled'
import TaggedTemplateLiteral from './tagged-template-literal'
import StyledComponent from './styled-component'
import ThemeProvider from './theme-provider'

const Primary = () => (
  <I18n ns={DOCS_API_TRANSLATION}>
    {(translate, { i18n }) => (
      <div>
        {md(i18n)(translate('primary'))}
        <Styled />
        <TaggedTemplateLiteral />
        <StyledComponent />
        <ThemeProvider />
      </div>
    )}
  </I18n>
)

export default Primary
