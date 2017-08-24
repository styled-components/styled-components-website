import React from 'react'

import md from '../../md'
import Styled from './styled'
import TaggedTemplateLiteral from './tagged-template-literal'
import StyledComponent from './styled-component'
import ThemeProvider from './theme-provider'

const Primary = () => md`
  ## Primary

  ${<Styled />}

  ${<TaggedTemplateLiteral />}

  ${<StyledComponent />}

  ${<ThemeProvider />}
`

export default Primary
