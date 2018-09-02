import React from 'react'

import md from 'components/md'
import Extend from './extend'
import InjectGlobal from './inject-global'
import InnerRef from './inner-ref'

export default () => md`
  ## Previous APIs

  ${<Extend />}

  ${<InjectGlobal />}

  ${<InnerRef />}

`
