import React from 'react'

import md from 'components/md'
import Extend from './extend'
import InjectGlobal from './inject-global'

export default () => md`
  ## Previous APIs

  ${<Extend />}

  ${<InjectGlobal />}

`
