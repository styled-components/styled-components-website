import React from 'react'

import md from 'components/md'
import CSS from './css'
import Keyframes from './keyframes'
import InjectGlobal from './inject-global'
import IsStyledComponent from './is-styled-component'
import WithTheme from './with-theme'

const Helpers = () => md`
  ## Helpers

  ${<CSS />}

  ${<Keyframes />}

  ${<InjectGlobal />}

  ${<IsStyledComponent />}

  ${<WithTheme />}
`

export default Helpers
