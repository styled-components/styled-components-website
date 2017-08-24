import React from 'react'

import md from 'components/md'
import CSS from './css'
import Keyframes from './keyframes'
import InjectGlobal from './inject-global'
import WithTheme from './with-theme'

const Helpers = () => md`
  <SectionLayout title="Helpers">
  ## Helpers

  ${<CSS />}

  ${<Keyframes />}

  ${<InjectGlobal />}

  ${<WithTheme />}
`

export default Helpers
