import React from 'react'

import md from 'components/md'
import CSS from './css'
import Keyframes from './keyframes'
import IsStyledComponent from './is-styled-component'
import WithTheme from './with-theme'
import CreateGlobalStyle from './create-global-style'

const Helpers = () => md`
  ## Helpers

  ${<CreateGlobalStyle />}

  ${<CSS />}

  ${<Keyframes />}

  ${<IsStyledComponent />}

  ${<WithTheme />}
`

export default Helpers
