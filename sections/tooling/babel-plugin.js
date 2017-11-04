import { I18n } from 'react-i18next'
import md from 'components/md'

import {
  DOCS_TOOLING_TRANSLATION,
} from '../../constants/i18n'

const BabelPlugin = () => (
  <I18n ns={DOCS_TOOLING_TRANSLATION}>
    {(translate, { i18n }) => md(i18n)(translate('babelPlugin'))}
  </I18n>
)

export default BabelPlugin
