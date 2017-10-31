import { I18n } from 'react-i18next'
import React from 'react'

import {
  DOCS_API_TRANSLATION,
} from '../../../constants/i18n'

import md from 'components/md'
import CSS from './css'
import Keyframes from './keyframes'
import InjectGlobal from './inject-global'
import WithTheme from './with-theme'

const Helpers = () => (
  <I18n ns={DOCS_API_TRANSLATION}>
    {(translate, { i18n }) => (
      <div>
        {md(i18n)(translate('helpers'))}
        <CSS />
        <Keyframes />
        <InjectGlobal />
        <WithTheme />
      </div>
    )}
  </I18n>
)

export default Helpers
